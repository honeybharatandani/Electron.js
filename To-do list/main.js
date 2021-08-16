const url = require('url');
const path = require('path');
const electron = require('electron');
const { app, BrowserWindow, Menu, ipcMain } = electron;

let mainWindow;
let addWindow;

// listen for the app to be ready

app.on('ready', function () {
    
// create new window
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    // load html into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html '),
        protocol: 'file:',
        slashes: true,
    }));
  

// quit when app is closed

    mainWindow.on('closed', function () {
        app.quit();
    });

// build menu  from template

    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

// insert menu
    Menu.setApplicationMenu(mainMenu);
});

// handle create add window
function createAddWindow() {
    // create new window
    addWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title: 'Add Task',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
  
    // load html into window
    addWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'addWindow.html '),
        protocol: 'file:',
        slashes: true
    }));


    // garbage collection handle

    addWindow.on('close', function () {
        addWindow = null;
    });
}

// catch item:add

ipcMain.on('item:add', function (e, item) {
    // console.log(item);
    mainWindow.webContents.send('item:add', item);
    addWindow.close();
});



// create menu template
const mainMenuTemplate = [
    {
        label: 'File',
        submenu:[
            {
                label: 'Add Item',
                click() {
                    createAddWindow();
                }
            },
            {
                label: 'clear Items'
            },
            {
                label: 'Quit',
                // for shortcuts
                // darwin is for mac
                accelerator: process.platform == 'darwin' ? 'command+Q' :
                    'ctrl+Q',
                click() {
                    app.quit();
                }
            },
        ]
    }
];


// if matchMedia, add empty obj to menu

if (process.platform == 'darwin') {
    mainMenuTemplate.unshift({});
}

// add develpr tools item if not in production
if (process.env.NODE_ENV !== 'production') {
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu: [
            {
                label: 'Toggle DevTools',
                accelerator: process.platform == 'darwin' ? 'command+I' :
                'ctrl+I',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }
        ]
    });
}