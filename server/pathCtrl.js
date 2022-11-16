const path = require('path')

module.exports = {
    home: (req, res) => {
        res.sendFile(path.join(__dirname, '../index.html'))
    },
    gallery: (req, res) => {
        res.sendFile(path.join(__dirname, '../gallery.html'))
    },
    dashboard: (req, res) => {
        res.sendFile(path.join(__dirname, '../dashboard.html'))
    },
    favorites: (req, res) => {
        res.sendFile(path.join(__dirname, '../favorites.html'))
    },
    styles: (req, res) => {
        res.sendFile(path.join(__dirname, '../styles.css'))
    },
    mainJs: (req, res) => {
        res.sendFile(path.join(__dirname, '../main.js'))
    },
    favJs: (req, res) => {
        res.sendFile(path.join(__dirname, '../favorites.js'))
    }
}