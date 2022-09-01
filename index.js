const express = require('express')
const path = require('path')
const app = express()
const request = require("request")
const {engine} = require('express-handlebars');
const api_key = 'pk_4beb39e861eb40038f0c17ced3431b88'
let port = process.env.PORT || 3000

const api = require('./requestapi')
const bodyparser = require("body-parser")
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set("views", "./views");
const constants = require('./constant')

// API KEY : 

// use body parser middleware
app.use(bodyparser.urlencoded({extended:false}))

function call_api(finishedAPI,ticker){
  request(constants.base_URL+ticker+constants.api_key_URL+constants.api_key, {json:true},(err,res,body)=>{
      if(err){
          console.log(err);
      }
      if(res.statusCode === 200){
          //console.log(body);
          finishedAPI(body)

      }else {
        console.log('No Connectionc');
      }        
  })

}

api.call_api(null,null)
// Set handlebars route
app.get('/', (req, res) => {
     call_api((doneAPI)=>{      
        res.render('home',{stock:doneAPI})
        console.log(doneAPI);
     },"fb")   
     //res.render('home')
  })
app.get('/about',  (req,res)=>{
  res.render('about')
})
app.post('/', (req, res) => {
  call_api((doneAPI)=>{    
      //posted_stuff = req.body.stock_ticker  
     res.render('home',{stock:doneAPI      
    })
     console.log(doneAPI);
  },req.body.stock_ticker)   
  //res.render('home')
})
app.use(express.static(path.join(__dirname,'public')))
  
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
  })