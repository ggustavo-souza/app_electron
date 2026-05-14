import { useState, Suspense } from 'react'
import Tarefas from './components/Tarefas'
import Configs from './components/Configs'
import '../assets/index.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const [currentView, setCurrentView] = useState('tasks')
  // const [loading, setLoading] = useState('true');
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <main className='m-12'>
          <div className='flex gap-2'>
            <button className='secondaryBackground border-none font-bold py-2 px-6 rounded' onClick={() => setCurrentView('tasks')}>Tarefas</button>
            <button className='secondaryBackground border-none font-bold py-2 px-6 rounded mx-4 gap-2 flex gap-2' onClick={() => setCurrentView('settings')}><i className='bi bi-gear-fill font-bold'></i>Configurações</button>
          </div>
          <div>
            {currentView === 'tasks' && <Tarefas />}
            {currentView === 'settings' && <Configs />}
          </div>
        </main>
      </Suspense>
    </>
  )
}

export default App;
