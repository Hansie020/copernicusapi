var express = require("express");
var app = express();
var Web3 = require('web3');
var Axios = require('axios');

var rpcURL = 'https://mainnet.infura.io/v3/7bc9bb0fa3834df7b04489363689a10e'// Your RPC URL goes here
var myWeb3 = new Web3(rpcURL)
var address2 = '0x2842774a57B48ae2169Ef72eE96c04e71F599020' // Contract address
var address1 = '0x261DA2ec51C1e3c52222c61261Ee22E5166254de' // Contract wallet address


// Process the API call
app.get("/api/v1.0/price", (req, res, next) => {

var text;
var value;


    myWeb3.eth.getBalance(address2, function(err, result) {
    if (err) {
      console.log(err)
    } else {
      console.log(myWeb3.utils.fromWei(result, "ether") + " ETH");
      value = myWeb3.utils.fromWei(result, "ether");


      // fetch the ETHUSD rate and add it to the sun!
      Axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd,eur')
          .then(function (response) {
          console.log('Goed');

          //Get USD/ETH createElemen
          console.log('1 ETH in USD '+response.data.ethereum['usd']);
          let usdValue = (Math.round(value * response.data.ethereum['usd'] * 100)/100);
          console.log('USD '+usdValue);
          text = '{ "currency":"ETH" , "amount":"' + value +'"},'+
              ' { "currency":"USD" , "amount":"' + usdValue + '"}';
          console.log(text);

          console.log('1 ETH in EUR '+response.data.ethereum['eur']);
          let eurValue = (Math.round(value * response.data.ethereum['eur'] * 100)/100);
          console.log('EUR '+eurValue);
          text = text + ' ,{ "currency":"EUR" , "amount":"' + eurValue + '"}';
          console.log(text);

          text = '['+text + ']';
          obj = JSON.parse(text);
          res.json(obj);

        })
          .catch(function (error) {
              // handle error
              console.log('Fout!');
              console.log(error);
      });


    }
  })
});

app.listen(3000, () => {
 console.log("Server running on port 3000");
});
