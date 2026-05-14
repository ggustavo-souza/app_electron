interface ModalExcluirProps {
    idTarefa: number;
    modalExcluir: boolean;
    setModalExcluir: (status: boolean) => void;
    puxarTarefas: () => void;
}

export default function ModalExcluir({ idTarefa, modalExcluir, setModalExcluir, puxarTarefas }: ModalExcluirProps) {
    return (
        <>
            {modalExcluir && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="p-8 fundoPrimary rounded-lg shadow-lg max-w-md w-full">
                        <h2 className="text-2xl font-bold mb-4">Excluir Tarefa</h2>
                        <p className="text-gray-600 mb-6">Tem certeza que deseja excluir esta tarefa?</p>
                        <div className="flex justify-end gap-4">
                            <button
                                className="px-6 py-2 rounded-lg ring-2 primaryBackground transition-all duration-150"
                                onClick={() => setModalExcluir(false)}
                            >
                                Cancelar
                            </button>
                            <button
                                className="px-6 py-2 rounded-lg bg-rose-700 hover:bg-rose-800 text-white transition-all duration-150"
                                onClick={async () => {
                                    await window.api.excluirTarefa(idTarefa);
                                    setModalExcluir(false);
                                    puxarTarefas();
                                }}
                            >
                                Excluir
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}   