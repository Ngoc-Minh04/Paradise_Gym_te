
import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, '../database/paradise_gym.db');

const db = new Database(DB_PATH);

const password = '123456';
const hash = bcrypt.hashSync(password, 12);

try {
    const result = db.prepare(`
        UPDATE tai_khoan 
        SET trang_thai = 'hoat_dong', 
            so_lan_dang_nhap_sai = 0, 
            mat_khau_hash = ? 
        WHERE ten_dang_nhap = 'admin'
    `).run(hash);

    if (result.changes > 0) {
        console.log('✅ Success: Admin account has been unlocked and password reset to "123456".');
    } else {
        console.log('❌ Error: Admin account not found.');
    }
} catch (err) {
    console.error('❌ Error updating database:', err.message);
} finally {
    db.close();
}
