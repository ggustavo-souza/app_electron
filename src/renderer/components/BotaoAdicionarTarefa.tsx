interface BotaoAdicionarTarefaProps {
    semPedidos: boolean;
}

export default function BotaoAdicionarTarefa(semPedidos: BotaoAdicionarTarefaProps) {
    return (
        <>
            {semPedidos && (
                <div className="ring-2 w-1/3 p-8 rounded-md shadow-md">
                    <div className="flex gap-2">
                        <i className="bi bi-emoji-frown secondaryIcon"></i>
                        <p className="">Nenhum pedido foi encontrado...</p>
                    </div>
                </div>
            )}
        </>
    )
}