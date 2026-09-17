<div align="center">

# Kiami Châu Portal

Website cá nhân và trung tâm kết nối cộng đồng của content creator, Vtuber Kiami Châu (Châu Hoàng Long).

[![Svelte 5](https://img.shields.io/badge/Svelte-5.56-FF3E00?style=flat&logo=svelte&logoColor=white)](https://svelte.dev/)
[![SvelteKit](https://img.shields.io/badge/SvelteKit-2.63-FF3E00?style=flat&logo=svelte&logoColor=white)](https://kit.svelte.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4.3-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=flat&logo=vercel&logoColor=white)](https://vercel.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat)](LICENSE)

[Triển khai lên Vercel](#trien-khai-len-vercel) • [Kiến trúc & Tiêu chuẩn thiết kế](#kien-truc--tieu-chuan-thiet-ke) • [Cài đặt Local](#cai-dat-va-phat-trien-local) • [Cấu trúc dự án](#cau-truc-du-an)

</div>

---

## Giới thiệu

Trang portal cá nhân hiệu năng cao, xây dựng theo tiêu chuẩn anti-slop: thanh điều hướng phẳng, không lạm dụng hiệu ứng ánh sáng gradient nhân tạo, typography cân bằng và bố cục đáp ứng linh hoạt cho Desktop, Tablet (1024px) và Mobile (390px).

Dự án sử dụng Svelte 5 (Runes mode), Tailwind CSS v4, tối ưu sẵn sàng để triển khai trực tiếp lên Vercel với cấu hình tự động.

---

## Kiến trúc & Tiêu chuẩn thiết kế

- Nhận diện thương hiệu: Biểu trưng đôi tai mèo vector riêng của Kiami Châu kết hợp font chữ Plus Jakarta Sans. Không sử dụng icon emoji rập khuôn.
- Bảng màu có kiểm soát: Tông màu burgundy và hồng phấn (`#944c68` ở light mode, `#e5a4bd` ở dark mode) trên nền trung tính ấm (`#faf6f3` / `#1b171c`).
- Chống giật layout (Zero CLS): Hộp thoại popup QR Vietcombank được tách biệt hoàn toàn khỏi các container layout `.space-y-*`, đảm bảo độ dịch chuyển của Footer luôn bằng đúng 0px khi đóng mở modal.
- Bộ nhớ đệm chỉ số realtime: Endpoint máy chủ (`/api/stats`) cập nhật số liệu theo dõi trực tiếp từ TokCounter (TikTok) và YouTube, lưu cache trong bộ nhớ 30 phút đi kèm header `Cache-Control: public, s-maxage=1800` để tránh bị giới hạn tần suất (rate limit).
- Chuyển đổi theme không chớp nháy (0ms FOUC): Script đồng bộ chạy chặn trong thẻ `app.html` đọc trạng thái theme hệ thống và `localStorage` trước khi trình duyệt vẽ DOM, triệt tiêu hiện tượng chớp sáng.
- Tối ưu chi phí băng thông: Video demo cộng đồng 1080p được stream trực tiếp từ Cloudflare R2 với chi phí egress 0 đồng, tránh chạm giới hạn băng thông serverless của Vercel.

---

## Thành phần giao diện chính

| Thành phần | Vai trò |
| :--- | :--- |
| `Header.svelte` | Thanh điều hướng phẳng cố định trên cùng, biểu trưng thương hiệu và nút đổi giao diện |
| `Hero.svelte` | Khung hiển thị mở đầu bất đối xứng với nội dung giới thiệu, các nút thao tác và ảnh minh họa nhân vật |
| `AboutSection.svelte` | Thông tin cá nhân, tiểu sử tóm tắt và danh sách thông số ngăn cách bằng dấu gạch chéo |
| `SanctuarySection.svelte` | Giới thiệu máy chủ Discord Thánh đường, thông tin kênh và video loop chất lượng cao từ Cloudflare R2 |
| `SocialSection.svelte` | Danh sách liên kết mạng xã hội chính thức (YouTube, Discord, TikTok, Facebook, X) |
| `DonationSection.svelte` | Cổng ủng hộ (WESCAN, Sociabuzz, PayPal, Gank) và popup Vietcombank QR chống sụt layout |
| `ProfileSidebar.svelte` | Cột thông tin gắn cạnh bên trên Desktop với bộ đếm chỉ số thời gian thực và thẻ lời chào |
| `MobileNav.svelte` | Thanh menu điều hướng chạm đáy trên điện thoại với tính năng scrollspy và viên nang chọn mục |

---

## Triển khai lên Vercel

Dự án cấu hình sẵn `@sveltejs/adapter-auto`. Khi được đưa lên Vercel, hệ thống build tự động nhận diện SvelteKit, chuyển đổi các route API thành Serverless Functions và phân phối toàn bộ tài nguyên tĩnh lên mạng lưới Edge CDN toàn cầu.

### Cách 1: Sử dụng GitHub CLI và Vercel Dashboard (Nhanh nhất)

Nếu máy đã cài sẵn GitHub CLI (`gh`):

1. Khởi tạo Git và tạo kho lưu trữ GitHub bằng `gh`:
   ```bash
   git init
   git add .
   git commit -m "chore: initial commit"
   gh repo create kiamichau-portfolio --public --source=. --remote=origin --push
   ```

2. Đăng nhập vào [vercel.com/new](https://vercel.com/new) bằng tài khoản GitHub.

3. Chọn **Import** tại repository `kiamichau-portfolio`.

4. Giữ nguyên các thiết lập mặc định (Vercel tự động nhận diện):
   - Framework Preset: `SvelteKit`
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.svelte-kit`
   - Install Command: `npm install`

5. (Tùy chọn) Biến môi trường:
   - Endpoint `/api/stats` hoạt động mặc định qua TokCounter mà không bắt buộc có API key.
   - Nếu muốn dùng YouTube Data API v3 chính thức, thêm biến:
     - `YOUTUBE_API_KEY`: khóa API Google Cloud của bạn.

6. Bấm **Deploy**. Trang web sẽ được đóng gói và phát hành trực tuyến trong vòng chưa tới 60 giây.

7. (Tùy chọn) Cài đặt tên miền riêng:
   - Vào **Project Settings** -> **Domains**.
   - Nhập tên miền của bạn (ví dụ: `kiamichau.com`).
   - Cập nhật bản ghi `A` (`76.76.21.21`) hoặc `CNAME` (`cname.vercel-dns.com`) tại nhà cung cấp DNS.

### Cách 2: Triển khai bằng Vercel CLI

```bash
# Cài đặt Vercel CLI nếu chưa có
npm install -g vercel

# Đăng nhập tài khoản
vercel login

# Triển khai bản xem trước
vercel

# Triển khai bản chính thức lên Production
vercel --prod
```

---

## Cài đặt và phát triển Local

### Yêu cầu hệ thống

- Node.js phiên bản `18.x` hoặc `20.x` trở lên
- npm, pnpm hoặc yarn
- GitHub CLI `gh` (tùy chọn)

### Các bước cài đặt

```bash
# Clone repository về máy
git clone https://github.com/<tai-khoan>/kiamichau-portfolio.git
cd kiamichau-portfolio

# Cài đặt các gói phụ thuộc
npm install

# Khởi động máy chủ phát triển
npm run dev
```

Truy cập trang web tại địa chỉ: [http://localhost:5173](http://localhost:5173)

### Kiểm tra chất lượng mã nguồn

```bash
# Kiểm tra kiểu dữ liệu Svelte và TypeScript
npm run check

# Kiểm tra quy chuẩn linter và formatting
npm run lint

# Tự động định dạng toàn bộ mã nguồn
npm run format

# Đóng gói và chạy thử bản build production ở local
npm run build
npm run preview
```

---

## Cấu trúc dự án

```text
kiamichau-portfolio/
├── static/
│   ├── icons/                  # Logo các nền tảng ủng hộ (SVG và ảnh)
│   └── donations/              # Hoạt ảnh gif trong modal ngân hàng
├── src/
│   ├── lib/
│   │   ├── components/         # Các thành phần giao diện Svelte 5
│   │   │   ├── Header.svelte
│   │   │   ├── Hero.svelte
│   │   │   ├── AboutSection.svelte
│   │   │   ├── SanctuarySection.svelte
│   │   │   ├── SocialSection.svelte
│   │   │   ├── DonationSection.svelte
│   │   │   ├── ProfileSidebar.svelte
│   │   │   ├── MobileNav.svelte
│   │   │   └── Footer.svelte
│   │   ├── data.ts             # Dữ liệu nội dung, liên kết và thông tin cá nhân
│   │   └── theme.svelte.ts     # Quản lý trạng thái giao diện Dark/Light
│   ├── routes/
│   │   ├── api/stats/          # Endpoint tính số liệu live (TikTok, YouTube)
│   │   │   └── +server.ts
│   │   ├── +page.svelte        # Trang portal chính
│   │   ├── +layout.svelte      # Bố cục gốc
│   │   └── layout.css          # Token màu sắc và thiết lập CSS toàn cục
│   └── app.html                # File HTML gốc chứa script chặn FOUC
├── LICENSE                     # Giấy phép mã nguồn mở MIT
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## Token thiết kế

Các biến CSS định nghĩa tại `src/routes/layout.css`:

| Biến | Giá trị Light Mode | Giá trị Dark Mode | Mục đích |
| :--- | :--- | :--- | :--- |
| `--page` | `#faf6f3` | `#1b171c` | Nền toàn trang |
| `--surface` | `#fffcfa` | `#262027` | Nền thẻ card và container |
| `--surface-hover` | `#f5ecec` | `#302630` | Nền khi hover vào thẻ |
| `--ink` | `#382d37` | `#f0e5eb` | Màu chữ chính |
| `--ink-muted` | `#73616b` | `#bdaab5` | Màu chữ phụ và mô tả |
| `--accent` | `#944c68` | `#e5a4bd` | Màu điểm nhấn thương hiệu |
| `--line` | `#e4d7dc` | `#443540` | Đường kẻ phân cách và viền thẻ |

---

## Bản quyền & Giấy phép

- Nhân vật và nội dung: [Kiami Châu (Châu Hoàng Long)](https://www.youtube.com/@KiamiChau)
- Xây dựng bằng SvelteKit, Tailwind CSS v4 và Phosphor Icons
- Phát hành theo giấy phép [MIT License](LICENSE).

---

<div align="center">
Toàn bộ source code này dành tặng cho **Kiami Châu**.
</div>