require('dotenv').config()
const { prompt } = require("../src/services/Prompt");

const text =  prompt('kể cho tôi nghe về trận điện biên phủ trên không')

console.log(text)