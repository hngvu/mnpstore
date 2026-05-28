import { supabase, isSupabaseConfigured } from './supabase';

// Danh sách sản phẩm tạp hóa mẫu truyền thống Việt Nam (Fallback khi Supabase chưa cấu hình hoặc trống)
export const FALLBACK_PRODUCTS = [
  {
    id: "bk-sumika",
    name: "Kẹo Sữa Mềm SUMiKA",
    category: "banh-keo",
    price: 32000,
    unit: "gói 350g",
    emoji: "🍬",
    desc: "Kẹo sữa mềm béo ngậy ngọt lịm từ sữa tươi nguyên chất với vỏ bọc hình chú bò siêu dễ thương.",
    tag: "Bán chạy nhất",
  },
  {
    id: "bk-tai-heo",
    name: "Bánh Tai Heo Nhỏ",
    category: "banh-keo",
    price: 15000,
    unit: "bịch 200g",
    emoji: "🐷",
    desc: "Bánh tai heo giòn tan thơm béo cốt dừa, món ăn vặt quốc dân cực kỳ vui miệng.",
    tag: "Giòn béo",
  },
  {
    id: "bk-keo-dua",
    name: "Kẹo Dừa Bến Tre",
    category: "banh-keo",
    price: 25000,
    unit: "hộp 300g",
    emoji: "🥥",
    desc: "Kẹo dừa dẻo béo ngậy ngọt lịm từ dừa nguyên chất xứ dừa Bến Tre.",
    tag: "Đặc sản",
  },
  {
    id: "bk-banh-gau",
    name: "Bánh Gấu Nhân Kem",
    category: "banh-keo",
    price: 22000,
    unit: "bịch 150g",
    emoji: "🐻",
    desc: "Bánh gấu giòn tan lớp vỏ ngoài, béo ngậy phần kem sữa đặc bên trong.",
    tag: "Yêu thích",
  },
  {
    id: "nu-sa-xi",
    name: "Sá Xị Chương Dương",
    category: "nuoc-uong",
    price: 12000,
    unit: "lon 330ml",
    emoji: "🥤",
    desc: "Nước uống sá xị nồng nàn hương bạc hà và thảo mộc thanh mát sảng khoái.",
    tag: "Huyền thoại",
  },
  {
    id: "nu-nuoc-sam",
    name: "Nước Sâm Bí Đao",
    category: "nuoc-uong",
    price: 10000,
    unit: "lon",
    emoji: "🍵",
    desc: "Nước sâm thanh nhiệt tự nhiên giải nhiệt sảng khoái những trưa oi bức.",
    tag: "Thanh mát",
  },
  {
    id: "nu-sting-dau",
    name: "Sting Dâu Đỏ",
    category: "nuoc-uong",
    price: 14000,
    unit: "chai 390ml",
    emoji: "🍓",
    desc: "Nước giải khát tăng lực Sting dâu, tiếp thêm năng lượng sảng khoái tức thì.",
    tag: "Yêu thích",
  },
  {
    id: "mi-miliket",
    name: "Mì Giấy Miliket Hai Tôm",
    category: "mi-goi",
    price: 5000,
    unit: "gói giấy",
    emoji: "🍜",
    desc: "Mì hai tôm gói giấy sáp vàng huyền thoại, sợi mì thơm dai đặc trưng.",
    tag: "Quen thuộc",
  },
  {
    id: "mi-hao-hao",
    name: "Mì Hảo Hảo Sa Tế",
    category: "mi-goi",
    price: 4500,
    unit: "gói",
    emoji: "🌶️",
    desc: "Mì tôm chua cay Hảo Hảo đậm vị chua cay, lựa chọn quốc dân không thể thiếu.",
    tag: "Quốc dân",
  },
  {
    id: "mi-ba-mien",
    name: "Mì Ba Miền Đậm Đà",
    category: "mi-goi",
    price: 4000,
    unit: "gói",
    emoji: "🍜",
    desc: "Sợi mì vàng óng dai giòn kết hợp gói nước súp tôm hùm chua cay thơm ngon đậm đà.",
    tag: "Bình dân",
  },
  {
    id: "gv-dau-an",
    name: "Dầu Ăn Tường An",
    category: "gia-vi",
    price: 48000,
    unit: "chai 1L",
    emoji: "🧴",
    desc: "Dầu thực vật tinh luyện Tường An mang lại món chiên xào giòn rụm thơm ngon.",
    tag: "Nhà bếp",
  },
  {
    id: "gv-nuoc-mam",
    name: "Nước Mắm Nam Ngư",
    category: "gia-vi",
    price: 42000,
    unit: "chai 500ml",
    emoji: "🐟",
    desc: "Nước mắm Nam Ngư thơm ngon dịu ngọt, cho bữa cơm gia đình tròn vị ấm áp.",
    tag: "Đậm đà",
  },
  {
    id: "gv-nuoc-tuong",
    name: "Nước Tương Tam Thái Tử",
    category: "gia-vi",
    price: 18000,
    unit: "chai 500ml",
    emoji: "🧪",
    desc: "Nước tương đậu nành thanh vị tỏi ớt, chấm món luộc hay kho đều ngon miệng.",
    tag: "Tiện lợi",
  },
  {
    id: "gv-muoi-ot",
    name: "Muối Sấy Ngọc Yến Tây Ninh",
    category: "gia-vi",
    price: 15000,
    unit: "hũ 150g",
    emoji: "🧂",
    desc: "Muối ớt sấy thơm nức mũi, chấm trái cây chua cay kích thích vị giác cực kỳ.",
    tag: "Cay ngon",
  },
];

// Lấy danh sách sản phẩm (sử dụng được ở cả Build-time tĩnh và Client-side)
export const fetchProducts = async () => {
  if (!isSupabaseConfigured()) {
    console.log("Supabase chưa được cấu hình. Sử dụng dữ liệu sản phẩm mẫu (fallback).");
    return FALLBACK_PRODUCTS;
  }

  try {
    console.log("Truy vấn sản phẩm từ bảng products của Supabase");
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('status', 'active');

    if (error) throw error;

    if (!data || data.length === 0) {
      console.log("Bảng products trống. Sử dụng dữ liệu sản phẩm mẫu (fallback).");
      return FALLBACK_PRODUCTS;
    }

    return data.map((product) => {
      const info = product.info || {};
      const firstVariant = (product.variants && product.variants[0]) || {};
      const firstImage = (product.images && product.images[0]) || {};
      const tags = Array.isArray(product.tags) ? product.tags : [];

      return {
        id: product.id,
        name: info.title || product.slug || "Sản phẩm không tên",
        category: tags[0] || "banh-keo",
        price: Number(firstVariant.price) || 0,
        unit: firstVariant.unit || (firstVariant.attributes && firstVariant.attributes.unit) || "đơn vị",
        emoji: info.emoji || (firstImage.url ? null : "📦"),
        imageUrl: firstImage.url || null,
        desc: info.description || info.short_description || "",
        tag: tags[1] || "Mới nhập",
      };
    });
  } catch (err) {
    console.error("Lỗi truy vấn sản phẩm, sử dụng dữ liệu mẫu:", err.message);
    return FALLBACK_PRODUCTS;
  }
};

// Gọi trực tiếp đến Supabase Edge Function 'create-order'
export const submitOrderToSupabase = async ({ customerName, customerPhone, items, purchasedCandyCount, activeDiscount, subtotal }) => {
  if (!isSupabaseConfigured()) {
    console.log("Supabase chưa được cấu hình. Giả lập đơn hàng thành công phía Client.");
    return { success: true, orderNumber: `ORD-${Date.now()}`, isSimulated: true };
  }

  try {
    console.log("Client-side: Đang gọi Supabase Edge Function 'create-order'...");
    
    // Gọi Supabase Edge Function chính chủ thông qua Client SDK
    const { data, error } = await supabase.functions.invoke('create-order', {
      body: {
        customerName,
        customerPhone,
        items,
        purchasedCandyCount,
        activeDiscount,
        subtotal
      }
    });

    if (error) {
      // Nếu lỗi là do chưa deploy function (Function not found hoặc tương tự)
      if (error.message && (error.message.toLowerCase().includes("not found") || error.message.includes("404"))) {
        console.warn("Supabase Edge Function chưa được deploy trên dự án của bạn. Tự động chuyển sang chế độ giả lập để chạy thử.");
        return { success: true, orderNumber: `ORD-${Date.now()}`, isSimulated: true };
      }
      throw new Error(error.message || "Lỗi gọi Edge Function");
    }

    if (data && data.success === false) {
      throw new Error(data.error || "Giao dịch thất bại tại Edge Server");
    }

    return {
      success: true,
      orderNumber: data.orderNumber,
      isSimulated: false,
      message: data.message
    };

  } catch (err) {
    console.error("Lỗi khi tạo đơn hàng qua Edge Function:", err.message);
    
    // Nếu lỗi là do chưa deploy hoặc chưa có kết nối mạng
    if (err.message && (
      err.message.toLowerCase().includes("not found") || 
      err.message.includes("404") || 
      err.message.toLowerCase().includes("failed to fetch")
    )) {
      console.warn("Tự động chuyển sang chế độ giả lập do Serverless Function chưa sẵn sàng:", err.message);
      return { success: true, orderNumber: `ORD-${Date.now()}`, isSimulated: true };
    }
    
    return {
      success: false,
      error: err.message || "Lỗi kết nối Serverless Edge"
    };
  }
};

// Gọi đến Supabase Edge Function 'submit-survey'
export const submitSurveyToSupabase = async ({ name, email, responses }) => {
  if (!isSupabaseConfigured()) {
    console.log("Supabase chưa được cấu hình. Giả lập gửi khảo sát thành công phía Client.");
    return { success: true, id: `SRV-SIM-${Date.now()}`, isSimulated: true };
  }

  try {
    console.log("Client-side: Đang gọi Supabase Edge Function 'submit-survey'...");
    
    // Gọi Supabase Edge Function thông qua Client SDK
    const { data, error } = await supabase.functions.invoke('submit-survey', {
      body: {
        name,
        email,
        responses
      }
    });

    if (error) {
      // Nếu lỗi là do chưa deploy function
      if (error.message && (error.message.toLowerCase().includes("not found") || error.message.includes("404"))) {
        console.warn("Supabase Edge Function 'submit-survey' chưa được deploy. Tự động chuyển sang chế độ giả lập.");
        return { success: true, id: `SRV-SIM-${Date.now()}`, isSimulated: true };
      }
      throw new Error(error.message || "Lỗi gọi Edge Function");
    }

    if (data && data.success === false) {
      throw new Error(data.error || "Gửi khảo sát thất bại tại Edge Server");
    }

    return {
      success: true,
      id: data.id,
      isSimulated: false,
      message: data.message
    };

  } catch (err) {
    console.error("Lỗi khi gửi khảo sát qua Edge Function:", err.message);
    
    // Nếu lỗi chưa deploy hoặc mất kết nối mạng
    if (err.message && (
      err.message.toLowerCase().includes("not found") || 
      err.message.includes("404") || 
      err.message.toLowerCase().includes("failed to fetch")
    )) {
      console.warn("Tự động chuyển sang chế độ giả lập do Serverless Function chưa sẵn sàng:", err.message);
      return { success: true, id: `SRV-SIM-${Date.now()}`, isSimulated: true };
    }
    
    return {
      success: false,
      error: err.message || "Lỗi kết nối Serverless Edge"
    };
  }
};
