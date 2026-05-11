interface JanelaTarefaProps {
    setJanelaTarefa: (value: boolean) => void;
    puxarTarefas: () => void;
}

export default function JanelaTarefa({ setJanelaTarefa, puxarTarefas }: JanelaTarefaProps) {

    const handleSalvar = async (e: React.FormEvent) => {
        e.preventDefault();
        const titulo = document.querySelector('input[name="titulo"]') as HTMLInputElement;
        const descricao = document.querySelector('input[name="descricao"]') as HTMLInputElement;
        await window.api.criarTarefa(titulo.value, descricao.value)
        puxarTarefas()
        setJanelaTarefa(false)
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
            <div className="fundoPrimary p-6 rounded-lg shadow-lg w-1/2 h-1/2">
                <h2 className="text-2xl font-bold secondaryText">Adicionar Tarefa</h2>
                <form>
                    <div className="mt-8">
                        <label className="block text-sm font-medium secondaryText">Título da Tarefa</label>
                        <input
                            type="text"
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            placeholder="Digite o título da tarefa"
                            name="titulo"
                        />
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-medium secondaryText">Descrição da Tarefa</label>
                        <input
                            type="text"
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            placeholder="Digite a descrição da tarefa"
                            name="descricao"
                        />
                    </div>
                    <div className="mt-10 flex justify-end gap-5">
                        <button
                            type="button"
                            className="primaryBackground px-4 py-2 ring-2 ring-gray-400 rounded-md"
                            onClick={() => setJanelaTarefa(false)}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 secondaryBackground ring-2 ring-gray-400 rounded-md"
                            onClick={(e) => handleSalvar(e)}
                        >
                            Salvar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}