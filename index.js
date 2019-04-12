const express = require('express')
const app = express()

// SETTING THE SERVER PATH TO VIEW ENGINE  
app.use(express.static(__dirname))
// SETTING THE VIEW ENGINE
app.set('view engine', 'ejs')
// ROUTE - ACCESS INDEX WILL RETURN HTTP CODE 200 AND RENDER INDEX PAGE
app.get('/', (req, res) => res.status(200).render('index'))

app.listen(3000, () => console.log('Server working on port 3000'))