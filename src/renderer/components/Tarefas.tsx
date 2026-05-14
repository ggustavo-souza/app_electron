import "../../assets/index.css"
import { Suspense, useEffect, useState } from "react"
import { Tarefa } from "../../types/electron";
import CompAdicionarTarefa from "./CompAdicionarTarefa";
import LoadingSpinner from "./LoadingSpinner";
import ModalExcluir from "./ModalExcluir";

export default function Tarefas() {
    const [tarefas, setTarefas] = useState<Tarefa[]>([]);
    const [modalExcluir, setModalExcluir] = useState(false);
    const [idTarefa, setIdTarefa] = useState(0);

    const chamarModalExcluir = (id: number) => {
        setModalExcluir(true);
        setIdTarefa(id);
    }

    const puxarTarefas = async () => {
        const response = await window.api.getTarefas()
        setTarefas(response);
    }

    useEffect(() => {
        puxarTarefas();
    }, [])

    const formatarData = (data: string) => {
        const date = new Date(data);
        return date.toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    }

    return (
        <>
            <Suspense fallback={<LoadingSpinner />}>
                <header>
                    <h1 className="text-3xl mt-10">Tarefas</h1>
                </header>
                <main className="mt-10 flex flex-col">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        {tarefas.length === 0 && (
                            <CompAdicionarTarefa semPedidos={true} puxarTarefas={puxarTarefas} />
                        )}
                        {tarefas.map(tarefa => (
                            <div key={tarefa.id} className="border-2 border-gray-500 p-5 rounded-md w-full flex flex-col">
                                <div className="flex justify-between mb-3">
                                    <p className="text-2xl font-bold">{tarefa.titulo}</p>
                                    <button
                                        className="text-rose-700 transition-all duration-150 hover:text-rose-100 hover:bg-rose-700 ring-2 ring-rose-700 rounded-sm px-3 py-2"
                                        onClick={() => chamarModalExcluir(tarefa.id)}
                                    ><i className="bi bi-trash text-lg"></i></button>
                                </div>
                                <p className='text-md text-start'>{tarefa.concluida ? 'Concluída em:' : 'Pendente desde:'} {formatarData(tarefa.criado_em)}</p>
                                <p className="text-md mt-3 flex-grow">{tarefa.descricao}</p>
                                <div className="flex items-center justify-between mt-5">
                                    <button
                                        className="px-8 py-3 w-full rounded-lg secondaryBackground font-bold text-lg mt-5"
                                        onClick={() => {
                                            window.api.marcarComoConcluida(tarefa.id, !tarefa.concluida);
                                            puxarTarefas();
                                        }}
                                    >
                                        Concluir
                                    </button>
                                </div>
                            </div>
                        ))}
                        {tarefas.length > 0 && (
                            <CompAdicionarTarefa semPedidos={false} puxarTarefas={puxarTarefas} />
                        )}
                    </div>
                    {modalExcluir && (
                        <ModalExcluir idTarefa={idTarefa} modalExcluir={modalExcluir} setModalExcluir={setModalExcluir} puxarTarefas={puxarTarefas} />
                    )}
                </main>
            </Suspense>
        </>
    )
}