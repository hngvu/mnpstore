---
version: alpha
name: MNP-Store-design
description: MNP Store tái hiện không khí tiệm tạp hóa Việt Nam truyền thống, thân thiện, gần gũi và hoài niệm. Phong cách Retro-Nostalgic kết hợp vui tươi, bình dân. Sử dụng tông màu xanh lá mít, vàng cam ấm, kết hợp emoji và ngôn ngữ đời thường. Thiết kế tối ưu mobile-first, tạo cảm giác ấm áp như ghé tiệm quen.
---

colors:
  # Màu chủ đạo
  primary: "#4ade80"           # Xanh lá mít chính (Sumika vibe)
  primary-hover: "#22c55e"
  primary-pressed: "#16a34a"
  
  accent: "#fbbf24"            # Vàng cam ấm
  accent-hover: "#f59e0b"
  
  secondary: "#f97316"         # Cam nổi bật cho CTA
  danger: "#ef4444"
  
  # Nền & Surface
  background: "#fffbeb"        # Beige nhạt ấm
  surface: "#fefce8"
  surface-alt: "#f1f5f9"
  card: "#ffffff"
  
  # Text
  text-primary: "#1f2937"
  text-secondary: "#4b5563"
  text-muted: "#78716c"
  text-on-primary: "#ffffff"
  
  # Border & Line
  border: "#e7e5e4"
  border-strong: "#d6d3d1"
  
  # Special
  success: "#4ade80"
  warning: "#fbbf24"
  nostalgic-yellow: "#fef08c"
  retro-red: "#f43f5e"

typography:
  font-family:
    heading: "Rounded Sans, system-ui, sans-serif"   # Font bo tròn, vui tươi
    body: "Inter, system-ui, sans-serif"
    accent: "Comic Sans MS, cursive"                 # Dùng hạn chế cho tiêu đề vui

  scale:
    hero: 48px / 1.1
    h1: 32px / 1.15
    h2: 24px / 1.2
    h3: 20px / 1.3
    body: 16px / 1.5
    small: 14px / 1.4

  style:
    headings: "bold, slightly rounded, generous letter-spacing"
    body: "normal weight, friendly tone"

spacing:
  base: 8px
  section-gap: 48px
  card-padding: 20px

border-radius:
  default: 16px
  button: 9999px          # Pill shape
  card: 20px

shadows:
  soft: "0 4px 12px -2px rgb(0 0 0 / 0.08)"
  medium: "0 10px 20px -4px rgb(0 0 0 / 0.1)"

components:
  button:
    primary: "bg-primary text-white font-bold rounded-full px-8 py-3 shadow-soft hover:scale-105 transition"
    secondary: "bg-white border-2 border-primary text-primary font-bold rounded-full"
  
  card:
    style: "border border-border bg-card rounded-3xl overflow-hidden hover:shadow-medium transition-all"
  
  header:
    style: "sticky top-0 bg-white/95 backdrop-blur-md border-b border-border z-50"

branding:
  tone: "Thân thiện, gần gũi, vui vẻ, hơi hoài niệm, dùng ngôn ngữ đời thường như 'bạn ơi', 'ghé lựa', 'dọn giỏ sạch trơn'"
  emoji: "heavy use of food & shopping emojis (🍬, 🛒, 🥤, 🍜, ✨)"
  imagery: "product photos kiểu tiệm tạp hóa thật, warm lighting, props lá chuối, túi ni lông, kệ sắt cũ"

visual-style:
  overall: "Nostalgic Vietnamese Grocery Store"
  hero: "Large title with warm illustration or product collage, strong call-to-action"
  product-grid: "Clean cards with large images, price in bold, old-school price tag style"
