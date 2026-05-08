import { app } from 'electron';
import path from 'path';
import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from './schema';

// salvar a database no appData do usuário
const dbPath = path.join(app.getPath('userData'), 'database.sqlite');
// cria a conexao com o banco de dados
const sqlite = new Database(dbPath);
// exporta o banco de dados
export const db = drizzle(sqlite, { schema });



