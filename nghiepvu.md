# 📋 NGHIỆP VỤ HỆ THỐNG — PARADISE GYM

> **Tài liệu này mô tả chi tiết nghiệp vụ của từng vai trò người dùng trong hệ thống Paradise GYM**
---

## 👑 1. QUẢN TRỊ VIÊN (ADMIN)

Người có **quyền cao nhất**, truy cập và thao tác được toàn bộ hệ thống.

### 1.1 Quản Lý Hồ Sơ
- Thêm mới hồ sơ cho **tất cả loại**: hội viên, PT, nhân viên
- Xóa hồ sơ bất kỳ (2 cách)
- Phân loại hồ sơ đúng vai trò khi tạo

### 1.2 Quản Lý Gói Tập
- Thêm mới gói tập cho phòng gym
- Chỉnh sửa gói tập (tên, số tháng, số ngày, giá)
- Xóa gói tập *(chỉ xóa được gói chưa có ai đăng ký)*
- Đăng ký gói tập cho hội viên
- Xem lịch sử đăng ký gói tập của hội viên

### 1.3 Quản Lý PT & Lịch Tập
- Đăng ký PT cho hội viên
- Đăng ký buổi tập PT cho hội viên (cả 2 cách)
- Xem **toàn bộ** lịch tập của phòng gym
- Thay đổi PT của hội viên
- Thay đổi ngày tập / giờ tập
- Xác nhận buổi đã tập hay chưa
- Hủy buổi tập
- **Hoàn tác** xác nhận buổi tập do hệ thống tự xác nhận (trong vòng 1 ngày)

### 1.4 Theo Dõi & Thống Kê
- Xem doanh thu hôm nay (tổng tiền, chi tiết, gói cao nhất)
- So sánh doanh thu với tháng trước
- Xem lượng khách vào/ra phòng tập theo từng thời điểm
- Xem danh sách hội viên **sắp hết hạn** (2 cách)
- Xem danh sách hội viên **đã hết hạn** (2 cách)

### 1.5 Chấm Công & Nhân Sự
- Cấu hình kết nối máy chấm công
- Xem giờ công toàn bộ nhân viên / PT
- Lọc xem theo loại hồ sơ: PT / nhân viên / hội viên
- Chọn khoảng thời gian xem công tùy ý

### 1.6 Tài Khoản & Phân Quyền
- Đổi mật khẩu tài khoản của mình
- Tạo tài khoản đăng nhập cho bất kỳ hồ sơ nào (hội viên, PT, nhân viên) — username mặc định = số điện thoại
- **Khóa/Mở khóa** tài khoản khi cần thiết

### 1.7 Nhật Ký & Bảo Mật (Mới)
- Xem **Audit Log** (nhật ký hệ thống): ai đã làm gì, lúc nào, từ IP nào
- Truy vết các thay đổi nhạy cảm (sửa giá gói, xóa hồ sơ, thay đổi lịch tập)
- Hệ thống tự động khóa tài khoản sau **5 lần đăng nhập sai** liên tiếp

### 1.8 Check-in QR
- Mở trang quét QR (`scan.html`) để xác nhận hội viên vào phòng tập
- Xem kết quả check-in ngay sau khi quét (thông tin hội viên, ngày hết hạn gói)

---

## 👩‍💼 2. NHÂN VIÊN LỄ TÂN

Người **trực tiếp tiếp nhận hội viên**, xử lý đăng ký và theo dõi hàng ngày.

> ⚠️ Tài liệu gốc không phân quyền tường minh cho lễ tân. Nghiệp vụ dưới đây được suy luận dựa trên đặc thù công việc thực tế tại phòng gym. Cần xác nhận lại với chủ phòng gym khi triển khai thực tế.

### 2.1 Quản Lý Hồ Sơ
- Thêm mới hồ sơ hội viên
- Xem danh sách hội viên và trạng thái (màu sắc)
- Xem chi tiết hồ sơ từng hội viên

### 2.2 Quản Lý Gói Tập
- Đăng ký gói tập cho hội viên
- Xem lịch sử đăng ký gói tập của hội viên
- Xem danh sách hội viên sắp hết hạn → để nhắc gia hạn
- Xem danh sách hội viên đã hết hạn → để liên hệ

### 2.3 Quản Lý PT & Lịch Tập
- Đăng ký PT cho hội viên
- Đăng ký buổi tập PT cho hội viên
- Xem lịch tập (phạm vi tùy phân quyền admin cấp)
- **Hoàn tác** xác nhận buổi tập do hệ thống tự xác nhận (trong vòng 1 ngày)

### 2.4 Theo Dõi Hàng Ngày
- Xem lượng khách vào/ra phòng tập
- Xem biểu đồ thống kê khách theo thời điểm trong ngày
- Theo dõi **Recent Check-ins** (danh sách khách vừa vào) trên Dashboard để kiểm soát cửa

### 2.5 Thông Báo & Nhắc Nhở (Mới)
- Nhận thông báo "Bell icon" khi: hội viên sắp hết hạn (7 ngày), hết buổi PT, hoặc đã hết hạn
- Đánh dấu đã đọc/xóa thông báo sau khi xử lý

### 2.5 Tài Khoản & Phân Quyền
- Đổi mật khẩu tài khoản của mình
- Tạo tài khoản đăng nhập cho hội viên và PT — username mặc định = số điện thoại

### 2.6 Check-in QR
- Mở trang quét QR (`scan.html`) để xác nhận hội viên vào phòng tập bằng camera điện thoại hoặc nhập thủ công
- Xem kết quả check-in ngay sau khi quét (thông tin hội viên, gói tập, ngày hết hạn)

### ⛔ Giới Hạn So Với Admin
- **Không** được thêm/sửa/xóa gói tập của phòng gym
- **Không** xem được báo cáo doanh thu
- **Không** cấu hình máy chấm công
- **Không** xem giờ công nhân viên tổng thể
- **Không** xóa hồ sơ *(khả năng cao cần quyền admin)*

---

## 🏃 3. HỘI VIÊN (NGƯỜI DÙNG)

Người **tự theo dõi quá trình tập luyện** của bản thân. Quyền hạn hẹp nhất, chỉ xem thông tin của chính mình.

### 3.1 Hồ Sơ Cá Nhân
- Xem thông tin hồ sơ cá nhân của mình
- Xem gói tập đang đăng ký (tên gói, ngày bắt đầu, ngày hết hạn, số ngày còn lại)
- Xem tên PT đang đăng ký (ảnh, chuyên môn, số buổi còn lại)
- Nhận cảnh báo khi gói tập còn ≤ 7 ngày

### 3.2 Lịch Tập
- Xem lịch tập với PT của **chính mình**
- Xem các buổi tập đã đăng ký (khung giờ, ngày tập)
- Xem trạng thái buổi tập (đã tập / chưa tập / đã hủy)
- Lọc lịch theo trạng thái và ngày cụ thể

### 3.3 Check-in QR
- Xem mã QR cá nhân trong tab "QR Check-in" trên Member Portal
- Mã QR có hiệu lực **5 phút**, tự động làm mới (hoặc bấm làm mới thủ công)
- Đưa mã cho lễ tân quét để xác nhận vào phòng tập *(thay thế thẻ từ)*

### 3.4 Lịch Sử Vào/Ra
- Xem chi tiết **giờ vào** của chính mình
- Theo dõi lịch sử vào phòng tập của bản thân (kể cả check-in qua QR)

### 3.5 Tài Khoản
- Đổi mật khẩu tài khoản của mình

### ⛔ Giới Hạn
- **Không** thấy lịch tập của hội viên khác
- **Không** tự đăng ký gói tập (phải qua lễ tân / admin)
- **Không** tự đăng ký PT (phải qua lễ tân / admin)
- **Không** xem doanh thu
- **Không** xem danh sách hội viên khác
- **Không** chỉnh sửa bất kỳ thông tin nào của hệ thống

---

## 💪 4. PT (HUẤN LUYỆN VIÊN)

Người **quản lý lịch dạy và học viên** của mình. Quyền hạn giới hạn trong phạm vi công việc cá nhân.

### 4.1 Lịch Tập
- Xem lịch tập **của chính mình** với các học viên
- Xem danh sách học viên đang tập với mình
- Xem khung giờ tập của từng học viên

### 4.2 Buổi Tập
- Xem trạng thái từng buổi tập (đã tập / chờ tập / đã hủy)
- Phân loại loại hình tập: **Cá nhân (1-1)** hoặc **Tập nhóm (Group training)**
- Xem lịch sử buổi tập với từng học viên (lọc theo trạng thái, ngày)
- Xem check-in của học viên trước buổi tập (`da_checkin`)

### 4.3 Chấm Công / Vào-Ra
- Xem chi tiết **giờ vào** của chính mình
- Theo dõi lịch sử ra vào phòng tập của bản thân

### 4.4 Tài Khoản
- Đổi mật khẩu tài khoản của mình

### ⛔ Giới Hạn
- **Không** thấy lịch tập của PT khác
- **Không** tự thêm/xóa học viên vào danh sách của mình
- **Không** tự đăng ký buổi tập (phải qua lễ tân / admin)
- **Không** xem doanh thu
- **Không** xem danh sách hội viên toàn phòng
- **Không** chỉnh sửa thông tin gói tập
- **Không** quét QR check-in (chỉ lễ tân mới được quét)

---

## 📊 5. BẢNG SO SÁNH PHÂN QUYỀN TỔNG HỢP

| Chức Năng | Admin | Lễ Tân | Hội Viên | PT |
|---|:---:|:---:|:---:|:---:|
| Thêm / xóa hồ sơ | ✅ | ✅ | ❌ | ❌ |
| Xem danh sách toàn bộ hội viên | ✅ | ✅ | ❌ | ❌ |
| Đăng ký gói tập cho hội viên | ✅ | ✅ | ❌ | ❌ |
| Quản lý gói tập (thêm/sửa/xóa) | ✅ | ❌ | ❌ | ❌ |
| Đăng ký PT cho hội viên | ✅ | ✅ | ❌ | ❌ |
| Đăng ký buổi tập PT | ✅ | ✅ | ❌ | ❌ |
| Xem lịch tập toàn phòng gym | ✅ | ❌ | ❌ | ❌ |
| Xem lịch tập của chính mình | ✅ | ❌ | ✅ | ✅ |
| Thay đổi lịch tập / PT / giờ | ✅ | ❌ | ❌ | ❌ |
| Xác nhận / hủy buổi tập | ✅ | ✅ | ❌ | ❌ |
| **Hoàn tác** buổi tập (chỉ auto_cron, trong 1 ngày) | ✅ | ✅ | ❌ | ❌ |
| Xem doanh thu | ✅ | ❌ | ❌ | ❌ |
| Xem khách vào / ra phòng tập | ✅ | ✅ | ❌ | ❌ |
| Xem danh sách sắp / hết hạn | ✅ | ✅ | ❌ | ❌ |
| Cấu hình máy chấm công | ✅ | ❌ | ❌ | ❌ |
| Xem giờ công toàn bộ nhân viên | ✅ | ❌ | ❌ | ❌ |
| Xem giờ công / lịch sử vào–ra của chính mình | ✅ | ✅ | ✅ | ✅ |
| Đổi mật khẩu tài khoản | ✅ | ✅ | ✅ | ✅ |
| **Tạo tài khoản đăng nhập** cho hồ sơ | ✅ | ✅ | ❌ | ❌ |
| **Quét QR** để check-in hội viên (`scan.html`) | ❌ | ✅ | ❌ | ❌ |
| **Lấy mã QR** cá nhân để check-in | ❌ | ❌ | ✅ | ❌ |
| **Xem Audit Log** (nhật ký hệ thống) | ✅ | ❌ | ❌ | ❌ |
| **Quản lý thông báo** (đọc/xóa) | ✅ | ✅ | ❌ | ❌ |

---

## 📌 6. GHI CHÚ QUAN TRỌNG

- Phân quyền của **Admin** và **PT / Hội viên** được mô tả rõ trong tài liệu gốc.
- Phân quyền của **Lễ tân** được suy luận từ nghiệp vụ thực tế — cần xác nhận lại với chủ phòng gym trước khi triển khai.
- Hệ thống hỗ trợ **đa chi nhánh** — dữ liệu tập trung từ nhiều chi nhánh về một nơi.
- Hội viên, PT, nhân viên đều có thể sử dụng app **Paradise HR** trên điện thoại để theo dõi thông tin của mình.

---

## 🔄 7. LUỒNG NGHIỆP VỤ CHECK-IN QR

> Thay thế hoàn toàn thẻ từ. Không cần máy quét thẻ vật lý.

```
[Hội viên]
  → Mở Member Portal → Tab "QR Check-in"
  → Hệ thống sinh JWT token 5 phút, hiển thị QR code

[Lễ tân]
  → Mở scan.html trên điện thoại hoặc máy tính bảng tại quầy
  → Bật camera → Quét mã QR của hội viên
  → Hệ thống kiểm tra: token hợp lệ? gói tập còn hạn? đã check-in hôm nay chưa?
  → Ghi nhận vào bảng luot_vao_ra (phuong_thuc = 'qr_code')
  → Hiển thị tên + ảnh hội viên → xác nhận thành công

[Tự động cuối ngày — 22:00]
  → Cron job quét toàn bộ lich_tap hôm nay có da_checkin = 1
  → Tự xác nhận trang_thai = 'da_tap', ghi_chu = 'auto_cron'
  → Trigger DB tự động trừ buổi trong dang_ky_pt

[Trường hợp cần hoàn tác]
  → Admin / Lễ tân vào màn hình PT Training
  → Tìm card buổi tập có badge "auto_cron" → bấm nút "Hoàn tác"
  → Nhập lý do → hệ thống đặt lại trang_thai = 'cho_tap', hoàn lại buổi trong dang_ky_pt
```

---

## 🔄 8. LUỒNG NGHIỆP VỤ TẠO TÀI KHOẢN ĐĂNG NHẬP

```
[Cách 1 — Khi thêm mới hồ sơ]
  → Admin / Lễ tân điền form thêm hội viên / PT
  → Tick checkbox "Tạo tài khoản đăng nhập ngay"
  → Username tự điền = Số điện thoại (có thể sửa)
  → Nhập mật khẩu → Lưu hồ sơ → Tài khoản được tạo đồng thời

[Cách 2 — Từ modal chi tiết hội viên / PT]
  → Admin / Lễ tân mở modal chi tiết
  → Nếu chưa có tài khoản → hiển thị form tạo tài khoản
  → Username tự điền = Số điện thoại (có thể sửa)
  → Nhập mật khẩu → Bấm "Tạo tài khoản" → Tài khoản được tạo
  → Hội viên / PT dùng tài khoản này để đăng nhập đúng portal của mình
```

---

## 🔄 9. LUỒNG NGHIỆP VỤ THÔNG BÁO TỰ ĐỘNG

> Hệ thống tự động tạo thông báo để Admin/Lễ tân không bỏ lỡ khách hàng cần gia hạn.

```
[Kích hoạt — Cron Job hàng ngày]
  → Hệ thống quét toàn bộ dang_ky_goi_tap
  → Nếu ngày hết hạn cách hôm nay = 7 ngày → Tạo thông báo "Sắp hết hạn"
  → Nếu ngày hết hạn < hôm nay → Tạo thông báo "Đã hết hạn"
  → Quét dang_ky_pt: nếu số buổi còn lại <= 2 → Tạo thông báo "Sắp hết buổi PT"

[Hiển thị]
  → Header hiển thị Bell icon với số Badge màu đỏ
  → Click xem danh sách 20 thông báo mới nhất
  → Phân quyền: Thông báo admin chỉ admin thấy, thông báo lễ tân cả hai đều thấy

[Xử lý]
  → Click vào thông báo → Chuyển hướng tới trang chi tiết hội viên tương ứng
  → Bấm "Đã đọc" để ẩn badge
```

---

## 🔄 10. LUỒNG NGHIỆP VỤ CHẤM CÔNG & ĐỐI SOÁT

```
[Ghi nhận — Raw Data]
  → Máy chấm công gửi dữ liệu về Server (giờ vào, giờ ra, ID vân tay)
  → Server lưu vào bảng cham_cong đồng thời lưu JSON gốc vào trường raw_data
  → Dùng để đối soát khi nhân viên/PT thắc mắc về độ chính xác của giờ công

[Chỉnh sửa thủ công]
  → Nếu quên chấm công, Admin có quyền thêm/sửa giờ công
  → Bắt buộc nhập "Lý do chỉnh sửa"
  → Hệ thống ghi nhận nguoi_chinh_sua_id để phục vụ Audit Log
```

---

## 🔄 11. QUY TẮC DỮ LIỆU & BẢO MẬT (QUAN TRỌNG)

### 11.1 Chính Sách "Xóa Mềm" (Soft Delete)
- **Hồ sơ, Gói tập, Gói PT** tuyệt đối không xóa thật khỏi Database (để bảo vệ tính toàn vẹn của báo cáo doanh thu).
- Khi bấm "Xóa", hệ thống đặt `is_deleted = 1` và ghi nhận `ngay_xoa`, `ly_do_xoa`.
- Dữ liệu bị xóa sẽ ẩn khỏi các danh sách làm việc nhưng vẫn tồn tại trong Audit Log.

### 11.2 Phân Loại Trạng Thái Hội Viên Qua Màu Sắc
| Màu Sắc | Trạng Thái | Ý Nghĩa Nghiệp Vụ |
|---|---|---|
| **Xanh** | Còn hạn | Đang hoạt động bình thường |
| **Vàng** | Sắp hết hạn | Còn ≤ 7 ngày, cần nhắc gia hạn |
| **Đỏ** | Đã hết hạn | Không được vào tập (phải đăng ký mới) |
| **Trắng** | Chưa đăng ký | Hồ sơ mới tạo, chưa mua gói |

### 11.3 Chi Tiết Thanh Toán & Doanh Thu
- Mỗi giao dịch đăng ký gói đều phải ghi rõ: **Phương thức** (Momo, ZaloPay, Tiền mặt...), **Mã giao dịch** (nếu có), và **Người thu tiền**.
- Doanh thu được **tự động cộng dồn** vào bảng `doanh_thu` ngay khi lưu đăng ký (thông qua Database Triggers).

---

