import Database from 'better-sqlite3';
const db = new Database('BE/paradise_gym.db');

const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table';").all();

console.log("Tables in database:");
tables.forEach(row => console.log("- " + row.name));
db.close();
