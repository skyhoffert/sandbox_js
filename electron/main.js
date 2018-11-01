// Sky Hoffert
// November 1, 2018

const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu} = electron;

let mainWindow;

// listen for app to be ready
app.on('ready', function(){
    // create the main window
    mainWindow = new BrowserWindow({
        width: 1024,
        height: 720
    });

    // load html into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file:',
        slashes: true
    }));

    // remove the default menu
    Menu.setApplicationMenu(null);
});