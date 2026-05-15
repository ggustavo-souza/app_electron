import { useState } from "react";
import JanelaTarefa from "./JanelaTarefa";

interface BotaoAdicionarTarefaProps {
    semPedidos: boolean;
    puxarTarefas: () => void;
}

export default function BotaoAdicionarTarefa({ semPedidos, puxarTarefas }: BotaoAdicionarTarefaProps) {

    const [janelaTarefa, setJanelaTarefa] = useState(false);

    return (
        <>
            {semPedidos && (
                <div className="ring-2 w-full ring-gray-100 shadow-md shadow-blue-950 px-8 py-16 rounded-md">
                    <div className="flex gap-2 mb-5 items-center flex-col justify-center">
                        <i className="bi bi-emoji-frown text-5xl secondaryIcon"></i>
                        <p className="text-xl font-semibold">Nenhum pedido foi encontrado...</p>
                    </div>
                    <div className="w-full flex items-center justify-center">
                        <button className="px-8 py-3 rounded-lg secondaryBackground font-bold text-lg" onClick={() => setJanelaTarefa(true)}>
                            Adicionar tarefa
                        </button>
                    </div>
                </div>
            )}
            {!semPedidos && (
                <div className="w-full flex items-center">
                    <button className="ring-2 flex flex-col items-center justify-center ring-gray-700 shadow-md shadow-blue-950 rounded-md w-50 h-50 px-8 py-3 rounded-lg secondaryBackground font-bold text-lg" onClick={() => setJanelaTarefa(true)}>
                        <i className="bi bi-plus-lg text-3xl"></i>
                        Adicionar tarefa
                    </button>
                </div>
            )}

            {janelaTarefa && (
                <JanelaTarefa setJanelaTarefa={setJanelaTarefa} puxarTarefas={puxarTarefas} />
            )}
        </>
    )
}