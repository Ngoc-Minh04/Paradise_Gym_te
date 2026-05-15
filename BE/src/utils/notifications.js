/**
 * Helper tạo thông báo — dùng chung cho cron và realtime
 */

import db from '../config/db.js';

const insertNotification = db.prepare(`
  INSERT INTO thong_bao (loai, tieu_de, noi_dung, doi_tuong_id, doi_tuong, danh_cho, nguoi_nhan_id)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`);

/**
 * Tạo 1 thông báo mới
 * @param {string} loai       - Loại thông báo
 * @param {string} tieu_de    - Tiêu đề ngắn gọn
 * @param {string} noi_dung   - Nội dung chi tiết
 * @param {number|null} doi_tuong_id - ID đối tượng liên quan
 * @param {string|null} doi_tuong   - Loại đối tượng
 * @param {string} danh_cho   - 'admin' | 'le_tan' | 'ca_hai' | 'hoi_vien' | 'pt'
 * @param {number|null} nguoi_nhan_id - ID hồ sơ người nhận (nếu gửi đích danh)
 */
export function createNotification(loai, tieu_de, noi_dung, doi_tuong_id = null, doi_tuong = null, danh_cho = 'ca_hai', nguoi_nhan_id = null) {
  try {
    insertNotification.run(loai, tieu_de, noi_dung, doi_tuong_id, doi_tuong, danh_cho, nguoi_nhan_id);
  } catch (err) {
    console.error(`[NOTIFICATION] Lỗi tạo thông báo loại "${loai}":`, err.message);
  }
}
