// import  {BrowserWindow,app} from "electron"
// import path from "path"
 
// const createWindow = () => {
//     const win = new BrowserWindow({
//         width: 800,
//         height: 600,
//         webPreferences: {
//             nodeIntegration: true,
//           },
//     })
//     win.loadFile(path.join(app.getAppPath(),'/dist-react/index.html'))
// }

// app.whenReady().then(createWindow)  









import { app, BrowserWindow, Menu } from "electron"
import path from "path"
import { fileURLToPath } from "url"

// 👇 Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, '../public/icon1.ico'), // ✅ Use fixed __dirname
    webPreferences: {
      nodeIntegration: true
    }
  })
    // 👇 Remove default menu
  Menu.setApplicationMenu(null);

  const indexPath = path.resolve(app.getAppPath(), 'dist-react', 'index.html')
  win.loadFile(indexPath)
}

app.whenReady().then(createWindow).catch(console.error)
