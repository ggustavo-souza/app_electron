import { useState } from "react";
import JanelaTarefa from "./JanelaTarefa";

interface BotaoAdicionarTarefaProps {
    semPedidos: boolean;
}

export default function BotaoAdicionarTarefa({ semPedidos }: BotaoAdicionarTarefaProps) {

    const [janelaTarefa, setJanelaTarefa] = useState(false);

    return (
        <>
            {semPedidos && (
                <div className="ring-2 w-1/3 ring-gray-500 shadow-md shadow-blue-950 px-8 py-16 rounded-md">
                    <div className="flex gap-2 mb-5 items-center flex-col justify-center">
                        <i className="bi bi-emoji-frown text-5xl secondaryIcon"></i>
                        <p className="text-xl font-semibold">Nenhum pedido foi encontrado...</p>
                    </div>
                    <div className="w-full flex items-center justify-center">
                        <button className="px-8 py-3 rounded-lg primaryBackground font-bold text-lg" onClick={() => setJanelaTarefa(true)}>
                            Adicionar tarefa
                        </button>
                    </div>
                </div>
            )}
            {!semPedidos && (
                <div className="ring-2 w-1/3 ring-gray-500 shadow-md shadow-blue-950 px-8 py-16 rounded-md">
                    <div className="w-full flex items-center justify-center">
                        <button className="px-8 py-3 rounded-lg primaryBackground font-bold text-lg" onClick={() => setJanelaTarefa(true)}>
                            Adicionar tarefa
                        </button>
                    </div>
                </div>
            )}

            {janelaTarefa && (
                <JanelaTarefa setJanelaTarefa={setJanelaTarefa} />
            )}
        </>
    )
}