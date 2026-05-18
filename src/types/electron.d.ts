export { };

declare global {
    interface Window {
        api: {
            getTarefas: () => Promise<Tarefa[]>;
            criarTarefa: (titulo: string, descricao: string) => Promise<void>;
            marcarComoConcluida: (id: number, concluida: boolean) => Promise<void>;
            excluirTarefa: (id: number) => Promise<void>;
            onThemeChange: (callback: (isDark: boolean) => void) => () => void; // responsavel por atualizar o tema do front-end
        }
        darkMode: {
            toggle: () => Promise<boolean>; // responsavel por alternar o dark mode
            isDark: () => Promise<boolean>; // responsavel por verificar se o dark mode está ativado
        }
    }
}

export type Tarefa = {
    id: number;
    titulo: string;
    descricao: string;
    concluida: boolean;
    criado_em: string;
    concluido_em: string | null;
}