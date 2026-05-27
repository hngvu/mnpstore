import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Headers CORS bắt buộc để trình duyệt Client-side gọi được API trực tiếp từ tên miền khác
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// Hàm sinh mã đơn hàng ORD-YYYYMMDD-XXXX
const generateOrderNumber = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const rand = Math.floor(10000 + Math.random() * 90000);
  return `ORD-${year}${month}${day}-${rand}`;
};

serve(async (req) => {
  // Xử lý tiền kiểm tra CORS (OPTIONS request từ trình duyệt)
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // 1. Phân tách dữ liệu nhận được từ Client
    const { customerName, customerPhone, items, purchasedCandyCount, activeDiscount, subtotal } = await req.json();

    if (!customerName || !customerPhone) {
      return new Response(JSON.stringify({ error: "Thiếu thông tin Tên hoặc SĐT của khách hàng" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 2. Khởi tạo Supabase Client an toàn phía Backend
    // Deno.env.get tự động lấy biến môi trường hệ thống được Supabase tiêm vào Edge Function
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

    if (!supabaseUrl || !supabaseServiceKey) {
      return new Response(JSON.stringify({ error: "Lỗi cấu hình biến môi trường trên Supabase" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // 3. Chuẩn bị thông tin đơn hàng
    const orderNumber = generateOrderNumber();
    const customerSnapshot = { name: customerName, phone: customerPhone };

    const lineItems = items.map((item: any) => ({
      line_id: `li_${Math.random().toString(36).substr(2, 9)}`,
      product_id: item.id,
      sku: item.id,
      title: item.name,
      quantity: item.quantity,
      unit_price: item.price,
      final_price: item.price * item.quantity,
      currency: "VND",
    }));

    // Cộng kẹo lẻ
    if (purchasedCandyCount > 0) {
      lineItems.push({
        line_id: "li_candy_sub",
        product_id: "candy-reveal",
        sku: "CANDY-REV",
        title: "Kẹo sữa Sumika bóc lẻ dò số",
        quantity: purchasedCandyCount,
        unit_price: 1000,
        final_price: purchasedCandyCount * 1000,
        currency: "VND",
      });
    }

    // Cộng quà tặng trúng thưởng
    if (activeDiscount) {
      lineItems.push({
        line_id: "li_gift_won",
        product_id: "gift-item",
        sku: "GIFT-WON",
        title: `[Trúng thưởng] ${activeDiscount.gift}`,
        quantity: 1,
        unit_price: 0,
        final_price: 0,
        currency: "VND",
      });
    }

    const pricing = {
      currency: "VND",
      subtotal: subtotal,
      discount_total: 0,
      total: subtotal,
    };

    // 4. Ghi trực tiếp vào Database thông qua quyền SERVICE_ROLE (bỏ qua mọi quy tắc chặn RLS một cách an toàn)
    console.log(`[Supabase Edge Function] Đang tạo đơn hàng ${orderNumber}`);
    const { data: orderData, error: orderError } = await supabase
      .from("orders")
      .insert({
        order_number: orderNumber,
        status: "pending",
        customer_snapshot: customerSnapshot,
        line_items: lineItems,
        shipping_address: { recipient: customerName, phone: customerPhone },
        pricing: pricing,
        notes: { customer_note: "Đặt hàng trực tiếp qua Supabase Edge Function" }
      })
      .select();

    if (orderError) {
      throw new Error(`Lỗi chèn đơn hàng: ${orderError.message}`);
    }

    // 5. Ghi hóa đơn thanh toán tương ứng
    const orderId = orderData[0].id;
    const { error: paymentError } = await supabase
      .from("payments")
      .insert({
        order_id: orderId,
        status: "pending",
        method: { type: "cod", provider: "tiem_tap_hoa" },
        amount: { value: subtotal, currency: "VND" }
      });

    if (paymentError) {
      console.error(`[Supabase Edge Function] Cảnh báo lỗi tạo payment: ${paymentError.message}`);
    }

    // 6. Trả kết quả thành công về cho Trình duyệt
    return new Response(
      JSON.stringify({
        success: true,
        orderNumber,
        isSimulated: false,
        message: "Đơn hàng đã được lưu trữ thành công trên Supabase Edge Function!"
      }),
      {
        status: 201,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );

  } catch (error: any) {
    console.error(`[Supabase Edge Function] Lỗi xử lý đặt hàng: ${error.message}`);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || "Lỗi xử lý hệ thống phía Serverless Edge"
      }),
      {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
