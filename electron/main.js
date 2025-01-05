import  {BrowserWindow,app} from "electron"
import path from "path"
 
const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
          },
    })
    win.loadFile(path.join(app.getAppPath(),'/dist-react/index.html'))
}

app.whenReady().then(createWindow)  