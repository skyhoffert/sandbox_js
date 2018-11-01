// Sky Hoffert
// November 1, 2018

const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu, remote} = electron;

let mainWindow;

// listen for app to be ready
app.on('ready', function(){
    // create the main window
    mainWindow = new BrowserWindow({
        minWidth: 960,
        minHeight: 540,
        width: 1024,
        height: 576,
        icon: path.join(__dirname, 'gfx/logo.png')
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
