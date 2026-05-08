import { app, BrowserWindow, ipcMain } from 'electron'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { db } from './db'
import { tarefas } from './schema'
import { desc, eq } from 'drizzle-orm'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const colorScheme = ["#212842", "#fffce4"]

process.env.APP_ROOT = path.join(__dirname, '..')


export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

// pega as tarefas e ordena pela mais recente
ipcMain.handle('get-tarefas', async () => {
  return await db.select().from(tarefas).orderBy(desc(tarefas.criada_em));
})

// cria uma tarefa
// ipcMain.handle("criar-tarefa", async (_, titulo: string, descricao: string) => {
//   if (!titulo) return;

//   return await db.insert(tarefas).values({
//     titulo: titulo,
//     descricao: descricao,
//     concluida: false,
//     criada_em: new Date().getTime(),
//     concluida_em: null
//   });
// })

// //marca uma tarefa como concluida
ipcMain.handle('marcar-como-concluida', async (_, id: number, concluida: boolean) => {
  return await db.update(tarefas).set({ concluida }).where(eq(tarefas.id, id))
})

let win: BrowserWindow | null

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    backgroundColor: colorScheme[0],
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: colorScheme[0],
      symbolColor: colorScheme[1],
      height: 32
    },
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },
  })

  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(createWindow)
