import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Headers CORS bắt buộc cho trình duyệt Client-side gọi trực tiếp
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req) => {
  // Xử lý OPTIONS request (CORS preflight) từ trình duyệt
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // 1. Nhận dữ liệu gửi lên từ Client
    const { name, email, responses } = await req.json();

    if (!name || !email) {
      return new Response(JSON.stringify({ error: "Thiếu thông tin Tên hoặc Email của người gửi" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Kiểm tra định dạng email cơ bản
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: "Địa chỉ Email không hợp lệ" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 2. Khởi tạo Supabase Client an toàn phía Backend
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

    if (!supabaseUrl || !supabaseServiceKey) {
      return new Response(JSON.stringify({ error: "Lỗi cấu hình biến môi trường trên Supabase" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // 3. Ghi trực tiếp khảo sát vào bảng `surveys` sử dụng Service Role Key (bỏ qua RLS)
    console.log(`[Supabase Edge Function] Đang ghi nhận khảo sát từ khách hàng: ${name} (${email})`);
    const { data, error } = await supabase
      .from("surveys")
      .insert({
        name,
        email,
        responses: responses || {}
      })
      .select();

    if (error) {
      throw new Error(`Lỗi chèn khảo sát vào database: ${error.message}`);
    }

    // 4. Trả kết quả thành công về cho Trình duyệt
    return new Response(
      JSON.stringify({
        success: true,
        id: data[0].id,
        message: "Cảm ơn bạn đã gửi khảo sát ý kiến đóng góp cho tiệm tạp hóa!"
      }),
      {
        status: 201,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );

  } catch (error: any) {
    console.error(`[Supabase Edge Function] Lỗi xử lý gửi khảo sát: ${error.message}`);
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
