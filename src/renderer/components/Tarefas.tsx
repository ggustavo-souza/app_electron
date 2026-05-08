import "../../assets/index.css"
import { useEffect, useState } from "react"
import { Tarefa } from "../../types/electron";
import BotaoAdicionarTarefa from "./BotaoAdicionarTarefa";

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
            <main>
                <div className="mt-10">
                    {tarefas.length === 0 && (
                        <BotaoAdicionarTarefa semPedidos={false} />
                    )}
                    {tarefas.map(tarefa => (
                        <div key={tarefa.id} className="flex justify-between items-center">
                            <p>{tarefa.titulo}</p>
                            <p>{tarefa.status}</p>
                        </div>
                    ))}
                </div>
            </main>
        </>
    )
}