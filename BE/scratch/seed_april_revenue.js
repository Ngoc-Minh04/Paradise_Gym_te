
import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, '../database/paradise_gym.db');

const db = new Database(DB_PATH);

console.log('--- Seeding April 2026 Revenue Data ---');

const insert = db.prepare(`
  INSERT OR IGNORE INTO doanh_thu (ngay, tong_tien, tong_don, tien_goi_tap, tien_goi_pt)
  VALUES (?, ?, ?, ?, ?)
`);

db.transaction(() => {
  for (let day = 1; day <= 30; day++) {
    const dateStr = `2026-04-${day.toString().padStart(2, '0')}`;
    
    // Generate some random data
    const tongDon = Math.floor(Math.random() * 5) + 2; // 2 to 6 orders
    const tienGoiTap = (Math.floor(Math.random() * 5) + 3) * 500000; // 1.5M to 3.5M
    const tienGoiPT = (Math.floor(Math.random() * 4) + 2) * 400000; // 0.8M to 2M
    const tongTien = tienGoiTap + tienGoiPT;

    insert.run(dateStr, tongTien, tongDon, tienGoiTap, tienGoiPT);
  }
})();

console.log('✅ April 2026 data seeded successfully.');

// Check total for April
const aprilTotal = db.prepare(`
  SELECT SUM(tong_tien) as total_revenue, COUNT(*) as total_days
  FROM doanh_thu
  WHERE ngay LIKE '2026-04-%'
`).get();

console.log(`Summary April 2026: Total Revenue = ${aprilTotal.total_revenue.toLocaleString()} VND, Days = ${aprilTotal.total_days}`);

db.close();
