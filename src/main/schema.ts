import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const tarefas = sqliteTable("tarefas", {
    id: integer("id").primaryKey({
        autoIncrement: true
    }),
    titulo: text("titulo").notNull(),
    descricao: text("descricao").notNull(),
    concluida: integer("concluida", { mode: 'boolean' }).notNull().default(false),
    criado_em: integer("criada_em", { mode: 'timestamp_ms' }),
    concluido_em: integer("concluida_em", { mode: 'timestamp_ms' })
});