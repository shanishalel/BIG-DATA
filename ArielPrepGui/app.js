const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'))
app.set('view engine', 'ejs')

app.get('/dashboard', (req, res) => {
    var cards=["Borrowed","Annual Profit","Lead Conversion","Average Income",];
  res.render("./pages/index",{cards:cards});
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})