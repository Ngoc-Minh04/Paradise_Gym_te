
import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, '../database/paradise_gym.db');

const db = new Database(DB_PATH);

const tableInfo = db.prepare("PRAGMA table_info(ho_so)").all();
console.log('--- ho_so Table Info ---');
console.table(tableInfo);

db.close();
