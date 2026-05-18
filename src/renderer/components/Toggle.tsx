import { useState, useEffect } from "react"

export default function ToggleButton() {
    // estado do dark mode
    const [darkMode, setDarkMode] = useState(false)

    useEffect(() => {
        // verifica o estado inicial do dark mode
        const getInitialTheme = async () => {
            const isDark = await window.darkMode.isDark()
            setDarkMode(isDark)
        }
        getInitialTheme()

        // se o dark mode mudar no arquivo principal ele atualiza aqui, e executa o callback
        const removeListener = window.api.onThemeChange((isDark) => {
            setDarkMode(isDark)
        })
        return () => removeListener()
    }, [])

    // função que alterna o dark mode
    const handleDarkMode = async () => {
        const result = await window.darkMode.toggle()
        setDarkMode(result)
    }
    // aqui ele renderiza o botão com base no estado do dark mode, se estiver ativo ele mostra o lado direito como preto e o esquerdo como cinza, se estiver desativado ele mostra o lado esquerdo como preto e o direito como cinza
    return (
        <>
            <div className="fundoPrimaryLeve rounded-3xl " onClick={handleDarkMode}>
                <div className="flex my-2 mx-3">
                    {darkMode ? (
                        <>
                            <div className='bg-green-500 px-5 rounded-l'></div>
                            <div className="p-3 bg-black rounded-r"></div>
                        </>
                    ) : (
                        <>
                            <div className="p-3 bg-black rounded-l"></div>
                            <div className='bg-gray-500 px-5 rounded-r'></div>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}