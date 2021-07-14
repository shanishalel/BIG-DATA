const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'))
app.set('view engine', 'ejs')

app.get('/dashboard', (req, res) => {
  var cards=["Number of cars in section 1:","Number of cars in section 2:","Number of cars in section 3:","Number of cars in section 4:","Number of cars in section 5:"];
  res.render("./pages/index",{cards:cards});
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})