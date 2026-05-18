import ToggleButton from "./Toggle";

export default function Configs() {
    return (
        <>
            <header>
                <h1 className="text-3xl mt-10 mb-10">Configurações</h1>
            </header>
            <main>
                <div className="flex text-center">
                    <ToggleButton />
                </div>
            </main>
        </>
    )
}