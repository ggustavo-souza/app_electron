import "../../assets/index.css"
import { useEffect, useState } from "react"
import { Tarefa } from "../../types/electron";
import CompAdicionarTarefa from "./CompAdicionarTarefa";

export default function Tarefas() {
    const [tarefas, setTarefas] = useState<Tarefa[]>([]);

    const puxarTarefas = async () => {
        const response = await window.api.getTarefas()
        setTarefas(response);
    }

    useEffect(() => {
        puxarTarefas();
    }, [])

    return (
        <>
            <header>
                <h1 className="text-3xl mt-10">Tarefas</h1>
            </header>
            <main className="mt-10 flex flex-col">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {tarefas.length === 0 && (
                        <CompAdicionarTarefa semPedidos={true} puxarTarefas={puxarTarefas} />
                    )}
                    {tarefas.map(tarefa => (
                        <div key={tarefa.id} className="border-2 border-red-400 p-5 rounded-md w-full">
                            <div className="flex items-center justify-between">
                                <p>{tarefa.titulo}</p>
                                <p>{tarefa.status}</p>
                            </div>
                            <p>{tarefa.descricao}</p>
                        </div>
                    ))}
                    {tarefas.length > 0 && (
                        <CompAdicionarTarefa semPedidos={false} puxarTarefas={puxarTarefas} />
                    )}
                </div>
            </main>
        </>
    )
}