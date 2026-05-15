
import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, '../database/paradise_gym.db');

const db = new Database(DB_PATH);

function testRevenue(month, year) {
  console.log(`\n--- Testing Revenue Comparison for ${month}/${year} ---`);
  
  const targetDate = `${year}-${month.toString().padStart(2, '0')}-01`;
  const currentMonthStart = db.prepare(`SELECT date(?, 'start of month') AS d`).get(targetDate).d;
  const nextMonthStart = db.prepare(`SELECT date(?, 'start of month', '+1 month') AS d`).get(targetDate).d;
  const previousMonthStart = db.prepare(`SELECT date(?, 'start of month', '-1 month') AS d`).get(targetDate).d;

  console.log(`Current Month Start: ${currentMonthStart}`);
  console.log(`Previous Month Start: ${previousMonthStart}`);

  const currentTotal = db.prepare(`
    SELECT SUM(tong_tien) AS total FROM doanh_thu WHERE ngay >= ? AND ngay < ?
  `).get(currentMonthStart, nextMonthStart).total || 0;

  const previousTotal = db.prepare(`
    SELECT SUM(tong_tien) AS total FROM doanh_thu WHERE ngay >= ? AND ngay < ?
  `).get(previousMonthStart, currentMonthStart).total || 0;

  console.log(`Total Revenue (${currentMonthStart}): ${currentTotal.toLocaleString()} VND`);
  console.log(`Total Revenue (${previousMonthStart}): ${previousTotal.toLocaleString()} VND`);
  
  if (previousTotal > 0) {
    const diff = currentTotal - previousTotal;
    const pct = Math.round((diff / previousTotal) * 100);
    console.log(`Growth: ${pct}%`);
  }
}

testRevenue(5, 2026); // May vs April
testRevenue(4, 2026); // April vs March

db.close();
