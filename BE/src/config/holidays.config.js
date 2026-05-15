/**
 * Cấu hình danh sách các ngày nghỉ lễ cố định và quy tắc thông báo
 */

export const HOLIDAYS = [
  { month: 1, day: 1, name: 'Tết Dương Lịch', days_off: 1 },
  { month: 4, day: 30, name: 'Giải phóng Miền Nam', days_off: 1 },
  { month: 5, day: 1, name: 'Quốc tế Lao động', days_off: 1 },
  { month: 9, day: 2, name: 'Quốc khánh', days_off: 1 },
  // Bạn có thể thêm các ngày nghỉ đặc biệt khác tại đây
];

export const NOTIFICATION_CONFIG = {
  notify_before_days: 1, // Thông báo trước 1 ngày
  notify_time: '07:00',  // Thời điểm gửi thông báo hàng ngày
};
