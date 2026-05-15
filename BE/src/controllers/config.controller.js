import db from '../config/db.js';
import { HOLIDAYS } from '../config/holidays.config.js';

export const getHolidays = (req, res) => {
  try {
    res.json({ success: true, data: HOLIDAYS });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getConfig = (req, res) => {
  try {
    const { key } = req.params;
    if (key) {
      const config = db.prepare('SELECT * FROM cau_hinh WHERE khoa = ?').get(key);
      if (!config) {
        return res.status(404).json({ success: false, message: 'Không tìm thấy cấu hình này.' });
      }
      return res.json({ success: true, data: config });
    }

    const configs = db.prepare('SELECT * FROM cau_hinh').all();
    res.json({ success: true, data: configs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateConfig = (req, res) => {
  try {
    const { key } = req.params;
    const { gia_tri, mo_ta } = req.body;

    if (!key || gia_tri === undefined) {
      return res.status(400).json({ success: false, message: 'Thiếu thông tin cập nhật.' });
    }

    const info = db.prepare(`
      UPDATE cau_hinh 
      SET gia_tri = ?, mo_ta = COALESCE(?, mo_ta), ngay_cap_nhat = datetime('now','localtime')
      WHERE khoa = ?
    `).run(gia_tri, mo_ta, key);

    if (info.changes === 0) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy cấu hình để cập nhật.' });
    }

    res.json({ success: true, message: 'Cập nhật cấu hình thành công.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
