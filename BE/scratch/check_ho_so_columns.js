import Database from 'better-sqlite3';
import path from 'path';
const db = new Database('BE/database/paradise_gym.db');
const columns = db.prepare("PRAGMA table_info(ho_so)").all();
console.log(JSON.stringify(columns, null, 2));
db.close();
