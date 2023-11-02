// const express = require('express');
// const app = express()

const arg = process.argv[2]

const axios = require('axios')

const term = 15 * 1000

const callback = async (ticker) => {
    const btcusdt = await axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${ticker}USDT`)
    console.log("Time :", new Date, `${ticker}USDT : `, btcusdt.data.price.substr(0, btcusdt.data.price.length-4))
}

callback(arg)

// setInterval(callback, term)

// app.get('/', (req, res) => {
//     req.send('훠어어')
// })

// app.listen(3000, () =>{
//     console.log('3000 run')
// })
