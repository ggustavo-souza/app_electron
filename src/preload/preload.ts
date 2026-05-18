import { ipcRenderer, contextBridge } from 'electron'

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('ipcRenderer', {
  on(...args: Parameters<typeof ipcRenderer.on>) {
    const [channel, listener] = args
    return ipcRenderer.on(channel, (event, ...args) => listener(event, ...args))
  },
  off(...args: Parameters<typeof ipcRenderer.off>) {
    const [channel, ...omit] = args
    return ipcRenderer.off(channel, ...omit)
  },
  send(...args: Parameters<typeof ipcRenderer.send>) {
    const [channel, ...omit] = args
    return ipcRenderer.send(channel, ...omit)
  },
  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    const [channel, ...omit] = args
    return ipcRenderer.invoke(channel, ...omit)
  },
})

contextBridge.exposeInMainWorld('api', {
  getTarefas: () => ipcRenderer.invoke('get-tarefas'),
  criarTarefa: (titulo: string, descricao: string) => ipcRenderer.invoke('criar-tarefa', titulo, descricao),
  marcarComoConcluida: (id: number, concluida: boolean) => ipcRenderer.invoke('marcar-como-concluida', id, concluida),
  excluirTarefa: (id: number) => ipcRenderer.invoke('excluir-tarefa', id),
  // recebe a informação do dark mode do front-end para atualizar o tema
  onThemeChange: (callback: (isDark: boolean) => void) => {
    // aqui o listener é uma função que recebe o evento e o callback, e retorna o callback que no caso é o isDark(função responsável por atualizar o tema do front-end)
    // o _event é uma variável que não será usada
    const listener = (_event: Electron.IpcRendererEvent, isDark: boolean) => callback(isDark)
    ipcRenderer.on('theme-changed', listener)
    //remove o listener quando o componente for desmontado
    return () => ipcRenderer.removeListener('theme-changed', listener)
  }
})
// expoe um objeto que possui duas funções, uma para alternar o dark mode e outra para verificar se o dark mode está ativado
// ambas as funções são chamadas pelo front-end
contextBridge.exposeInMainWorld('darkMode', {
  toggle: () => ipcRenderer.invoke('dark-mode:toggle'),
  isDark: () => ipcRenderer.invoke('dark-mode:is-dark')
})
