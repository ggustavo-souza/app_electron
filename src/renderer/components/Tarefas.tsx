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
                                <p className="text-2xl font-bold">{tarefa.titulo}</p>
                                <p className="text-md">{formatarData(tarefa.criado_em)}</p>
                            </div>
                            <p className="text-md mt-2">{tarefa.descricao}</p>
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