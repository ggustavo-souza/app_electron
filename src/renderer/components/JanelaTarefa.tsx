
interface JanelaTarefaProps {
    setJanelaTarefa: (value: boolean) => void;
}

export default function JanelaTarefa({ setJanelaTarefa }: JanelaTarefaProps) {

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold">Adicionar Tarefa</h2>
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Título da Tarefa</label>
                    <input
                        type="text"
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        placeholder="Digite o título da tarefa"
                    />
                </div>
                <div className="mt-6 flex justify-end gap-2">
                    <button
                        className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                        onClick={() => setJanelaTarefa(false)}
                    >
                        Cancelar
                    </button>
                    <button
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        onClick={() => setJanelaTarefa(false)}
                    >
                        Salvar
                    </button>
                </div>
            </div>
        </div>
    );
}