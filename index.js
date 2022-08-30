const express = require('express')
const path = require('path')
const app = express()

const {engine} = require('express-handlebars');
const port = 3000

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set("views", "./views");
  
//
// Set handlebars route
app.get('/', (req, res) => {
    
    res.render('home',{stuff:'This is a stuff',
        stuff2:'dfdfdf'
  })
  })
  
  app.use(express.static(path.join(__dirname,'public')))
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })