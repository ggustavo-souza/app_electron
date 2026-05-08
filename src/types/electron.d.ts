export { };

declare global {
    interface Window {
        api: {
            getTarefas: () => Promise<Tarefa[]>;
        }
    }
}

export type Tarefa = {
    id: number;
    titulo: string;
    status: 'pendente' | 'concluida';
    criado_em: string;
    concluido_em: string | null;
}