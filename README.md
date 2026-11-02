# ENGLISH 6 – FAST EXAM TRAINER

Ứng dụng ôn thi cấp tốc dựa trên 100 dòng STT đầu tiên trong bảng Word và 10 tranh tổng hợp của cuộc trò chuyện.

## Cách sử dụng

- Giải nén toàn bộ thư mục ZIP, giữ nguyên cấu trúc `images/`.
- Mở `index.html` bằng Chrome hoặc Edge. Website thuần HTML/CSS/JS, không yêu cầu máy chủ.
- Nhập họ tên (không bắt buộc), chọn “Học có hướng dẫn” hoặc một chặng 10 câu.
- Xem hình, nghe từ, bấm “ĐÃ HỌC – LÀM BÀI NGAY”, trả lời và xem phản hồi rồi chuyển câu tiếp.
- Tiến độ lưu trong localStorage của trình duyệt trên chính thiết bị đó.
- Nút ⚙ cho phép đổi tốc độ và giọng phát âm, tùy khả năng trình duyệt/hệ điều hành; một số giọng có thể cần mạng.

## Giới hạn dữ liệu nguồn

100 câu hỏi được trích từ file Word nhưng **không phải tất cả đều là câu hỏi độc lập có thể chấm chính xác**. Chỉ những mục có thể xác định tương đối vững từ nội dung Word được chấm tự động. Các câu dẫn, câu đúng/sai phụ thuộc bài đọc không có đủ ngữ cảnh, và trắc nghiệm cần văn bản đọc gốc đều được đánh dấu chưa xác minh. Không tạo đoạn văn/đáp án giả.

**Cần lưu ý:** Một số đáp án sửa lỗi và viết lại câu dùng quy tắc so khớp văn bản đơn giản, nên có thể bỏ sót các cách trả lời đúng khác. Giáo viên cần duyệt file `data-audit.json` và nội dung trong `data.js` trước khi dùng làm kết quả chính thức. Một số câu có dấu hiệu lỗi nguồn hoặc nhiều phương án hợp lý (ví dụ câu 31 có vẻ không sai). Các ảnh có thể chứa chữ AI chưa chuẩn; văn bản Word được hiển thị độc lập để tránh nhầm nguồn.

## Tệp

- `index.html` – giao diện
- `style.css` – thiết kế responsive
- `app.js` – học, nghe, chấm, lưu tiến độ
- `data.js` – 100 mục gốc
- `images/001.webp` ... `100.webp` – 100 ô hình
- `data-audit.json` – mục cần xác minh

## Âm thanh

Ứng dụng sử dụng Web Speech API, không đi kèm tệp MP3. Tốc độ nói và giọng nói khả dụng phụ thuộc hệ điều hành. Các tệp ảnh và dữ liệu có sẵn offline; âm thanh offline phụ thuộc giọng TTS đã cài.


## Phiên bản giao diện nhỏ và âm thanh dự phòng
- Giao diện được giới hạn chiều rộng 430px tương tự mẫu `u1l1.html`.
- Có 200 tệp MP3 dự phòng (100 từ vựng + 100 câu hỏi), tạo bằng giọng tổng hợp offline eSpeak tiếng Anh. Giọng MP3 mang tính máy móc, không giống giọng người bản ngữ tự nhiên.
- Khi có giọng tiếng Anh của thiết bị, ứng dụng ưu tiên giọng hệ thống. Nếu không có hoặc giọng không phát, ứng dụng chuyển sang MP3.
- Để nghe MP3, giải nén toàn bộ ZIP, giữ thư mục `audio` bên cạnh `index.html`.
- Nếu không nghe, mở phần **Giọng đọc** và bấm **Thử MP3**. Kiểm tra âm lượng và quyền phát âm thanh của trình duyệt.
