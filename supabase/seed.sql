-- =============================================================
-- SEED DATA - Tiệm Tạp Hóa MNP
-- Dữ liệu mẫu tương thích với SCHEMA JSONB
-- =============================================================

-- Xóa dữ liệu cũ (nếu có) để tránh trùng lặp
TRUNCATE TABLE products CASCADE;

-- Insert dữ liệu mẫu vào bảng products
INSERT INTO products (slug, status, info, variants, tags)
VALUES
  ('bk-sumika', 'active', 
    '{"title": "Kẹo Sữa Mềm SUMiKA", "description": "Kẹo sữa mềm béo ngậy ngọt lịm từ sữa tươi nguyên chất với vỏ bọc hình chú bò siêu dễ thương.", "emoji": "🍬"}',
    '[{"sku": "bk-sumika", "price": 32000, "unit": "gói 350g"}]',
    '["banh-keo", "Bán chạy nhất"]'
  ),
  ('bk-tai-heo', 'active', 
    '{"title": "Bánh Tai Heo Nhỏ", "description": "Bánh tai heo giòn tan thơm béo cốt dừa, món ăn vặt quốc dân cực kỳ vui miệng.", "emoji": "🐷"}',
    '[{"sku": "bk-tai-heo", "price": 15000, "unit": "bịch 200g"}]',
    '["banh-keo", "Giòn béo"]'
  ),
  ('bk-keo-dua', 'active', 
    '{"title": "Kẹo Dừa Bến Tre", "description": "Kẹo dừa dẻo béo ngậy ngọt lịm từ dừa nguyên chất xứ dừa Bến Tre.", "emoji": "🥥"}',
    '[{"sku": "bk-keo-dua", "price": 25000, "unit": "hộp 300g"}]',
    '["banh-keo", "Đặc sản"]'
  ),
  ('bk-banh-gau', 'active', 
    '{"title": "Bánh Gấu Nhân Kem", "description": "Bánh gấu giòn tan lớp vỏ ngoài, béo ngậy phần kem sữa đặc bên trong.", "emoji": "🐻"}',
    '[{"sku": "bk-banh-gau", "price": 22000, "unit": "bịch 150g"}]',
    '["banh-keo", "Yêu thích"]'
  ),
  ('nu-sa-xi', 'active', 
    '{"title": "Sá Xị Chương Dương", "description": "Nước uống sá xị nồng nàn hương bạc hà và thảo mộc thanh mát sảng khoái.", "emoji": "🥤"}',
    '[{"sku": "nu-sa-xi", "price": 12000, "unit": "lon 330ml"}]',
    '["nuoc-uong", "Huyền thoại"]'
  ),
  ('nu-nuoc-sam', 'active', 
    '{"title": "Nước Sâm Bí Đao", "description": "Nước sâm thanh nhiệt tự nhiên giải nhiệt sảng khoái những trưa oi bức.", "emoji": "🍵"}',
    '[{"sku": "nu-nuoc-sam", "price": 10000, "unit": "lon"}]',
    '["nuoc-uong", "Thanh mát"]'
  ),
  ('nu-sting-dau', 'active', 
    '{"title": "Sting Dâu Đỏ", "description": "Nước giải khát tăng lực Sting dâu, tiếp thêm năng lượng sảng khoái tức thì.", "emoji": "🍓"}',
    '[{"sku": "nu-sting-dau", "price": 14000, "unit": "chai 390ml"}]',
    '["nuoc-uong", "Yêu thích"]'
  ),
  ('mi-miliket', 'active', 
    '{"title": "Mì Giấy Miliket Hai Tôm", "description": "Mì hai tôm gói giấy sáp vàng huyền thoại, sợi mì thơm dai đặc trưng.", "emoji": "🍜"}',
    '[{"sku": "mi-miliket", "price": 5000, "unit": "gói giấy"}]',
    '["mi-goi", "Quen thuộc"]'
  ),
  ('mi-hao-hao', 'active', 
    '{"title": "Mì Hảo Hảo Sa Tế", "description": "Mì tôm chua cay Hảo Hảo đậm vị chua cay, lựa chọn quốc dân không thể thiếu.", "emoji": "🌶️"}',
    '[{"sku": "mi-hao-hao", "price": 4500, "unit": "gói"}]',
    '["mi-goi", "Quốc dân"]'
  ),
  ('gv-dau-an', 'active', 
    '{"title": "Dầu Ăn Tường An", "description": "Dầu thực vật tinh luyện Tường An mang lại món chiên xào giòn rụm thơm ngon.", "emoji": "🧴"}',
    '[{"sku": "gv-dau-an", "price": 48000, "unit": "chai 1L"}]',
    '["gia-vi", "Nhà bếp"]'
  ),
  ('gv-nuoc-mam', 'active', 
    '{"title": "Nước Mắm Nam Ngư", "description": "Nước mắm Nam Ngư thơm ngon dịu ngọt, cho bữa cơm gia đình tròn vị ấm áp.", "emoji": "🐟"}',
    '[{"sku": "gv-nuoc-mam", "price": 42000, "unit": "chai 500ml"}]',
    '["gia-vi", "Đậm đà"]'
  );

-- Khởi tạo khách hàng mẫu (để lúc mua hàng gắn mã customer_id nếu cần)
INSERT INTO customers (email, phone, profile)
VALUES
  ('khachhang1@example.com', '0901234567', '{"name": "Nguyễn Văn A"}'),
  ('khachhang2@example.com', '0987654321', '{"name": "Trần Thị B"}');
