
import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, '../database/paradise_gym.db');

const db = new Database(DB_PATH);

const accounts = db.prepare('SELECT id, ten_dang_nhap, trang_thai, so_lan_dang_nhap_sai FROM tai_khoan').all();
console.log('--- Account Status ---');
console.table(accounts);

const roles = db.prepare('SELECT * FROM vai_tro').all();
console.log('\n--- Roles ---');
console.table(roles);

db.close();
