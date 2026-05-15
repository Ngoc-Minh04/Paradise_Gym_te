
import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, '../database/paradise_gym.db');

const db = new Database(DB_PATH);

console.log('--- Seeding March 2026 Revenue Data ---');

const insert = db.prepare(`
  INSERT OR IGNORE INTO doanh_thu (ngay, tong_tien, tong_don, tien_goi_tap, tien_goi_pt)
  VALUES (?, ?, ?, ?, ?)
`);

db.transaction(() => {
  for (let day = 1; day <= 31; day++) {
    const dateStr = `2026-03-${day.toString().padStart(2, '0')}`;
    
    // Generate some random data for March (lower than April/May for demo)
    const tongDon = Math.floor(Math.random() * 4) + 1; // 1 to 5 orders
    const tienGoiTap = (Math.floor(Math.random() * 4) + 2) * 500000; // 1M to 3M
    const tienGoiPT = (Math.floor(Math.random() * 3) + 1) * 400000; // 0.4M to 1.6M
    const tongTien = tienGoiTap + tienGoiPT;

    insert.run(dateStr, tongTien, tongDon, tienGoiTap, tienGoiPT);
  }
})();

console.log('✅ March 2026 data seeded successfully.');

// Check total for March
const marchTotal = db.prepare(`
  SELECT SUM(tong_tien) as total_revenue, COUNT(*) as total_days
  FROM doanh_thu
  WHERE ngay LIKE '2026-03-%'
`).get();

console.log(`Summary March 2026: Total Revenue = ${marchTotal.total_revenue.toLocaleString()} VND, Days = ${marchTotal.total_days}`);

db.close();
