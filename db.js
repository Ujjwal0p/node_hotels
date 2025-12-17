const mongoose = require('mongoose');

//defining mogodb onnection URL

const mongoURL = 'mongodb://localhost:27017/hotel' //replace hotel with your database name

mongoose.connect(mongoURL)

const db = mongoose.connection;

db.on('connected', ()=>{
    console.log("connected Successfully!")
})

db.on('error', (err)=>{
    console.log("mongo connection error", err);
})

db.on('disconnected', ()=>{
    console.log("connection lost or disconnected!")
})

module.exports = db;