import { useState } from 'react'
import Tarefas from './components/Tarefas'
import Configs from './components/Configs'

function App() {
  const [currentView, setCurrentView] = useState('tasks')
  return (
    <>
      <div className='flex gap-2'>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={() => setCurrentView('tasks')}>Tarefas</button>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={() => setCurrentView('settings')}>Configurações</button>
      </div>
      <div>
        {currentView === 'tasks' && <Tarefas />}
        {currentView === 'settings' && <Configs />}
      </div>
    </>
  )
}

export default App
