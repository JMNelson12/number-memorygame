const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const port = process.env.PORT || 8000;
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', exphbs({defaultLayout: 'master'}));
app.set('view engine', 'handlebars');

app.get('/', function(req, res){
  res.render('index');
})

app.listen(port, () => {
  console.log(`Connecting on port: ${port}`);
})