import { useState } from 'react'
import Tarefas from './components/Tarefas'
import Configs from './components/Configs'
import '../assets/index.css';

function App() {
  const [currentView, setCurrentView] = useState('tasks')
  return (
    <>
      <main className='m-12'>
        <div className='flex gap-2'>
          <button className='primaryBackground border-none font-bold py-2 px-6 rounded' onClick={() => setCurrentView('tasks')}>Tarefas</button>
          <button className='primaryBackground border-none font-bold py-2 px-6 rounded mx-4' onClick={() => setCurrentView('settings')}>Configurações</button>
        </div>
        <div>
          {currentView === 'tasks' && <Tarefas />}
          {currentView === 'settings' && <Configs />}
        </div>
      </main>
    </>
  )
}

export default App;
