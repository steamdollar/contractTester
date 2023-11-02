#!/bin/bash
# https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT
ticker=$1"USDT"

# echo $ticker
curl https://api.binance.com/api/v3/ticker?symbol=$ticker

echo ""

# node zz
