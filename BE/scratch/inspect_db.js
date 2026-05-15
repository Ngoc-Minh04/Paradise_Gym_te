import Database from 'better-sqlite3';
import path from 'path';

const db = new Database('database/paradise_gym.db');
const indexes = db.prepare("SELECT name, tbl_name FROM sqlite_master WHERE type='index'").all();
console.log('--- Database Indexes ---');
indexes.forEach(idx => console.log(`Index: ${idx.name} on Table: ${idx.tbl_name}`));

const tables = ['ho_so', 'tai_khoan', 'dang_ky_goi_tap', 'dang_ky_pt', 'lich_tap', 'thong_bao'];
tables.forEach(table => {
    const info = db.prepare(`PRAGMA table_info(${table})`).all();
    console.log(`\n--- Table: ${table} ---`);
    info.forEach(col => console.log(`${col.name} (${col.type})`));
});
db.close();
