import { app } from 'electron';
import path from 'path';
import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from './schema';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// salvar a database no appData do usuário
const dbPath = path.join(app.getPath('userData'), 'database.sqlite');
console.log("banco criado em: " + dbPath);
// cria a conexao com o banco de dados
const sqlite = new Database(dbPath);
// exporta o banco de dados
export const db = drizzle(sqlite, { schema });

migrate(db, { migrationsFolder: path.join(__dirname, '../drizzle') })




