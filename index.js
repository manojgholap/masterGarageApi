require('dotenv').config({ path: "./.env" })
const express = require('express');
var compression = require('compression');
const cors = require('cors');
const app = express();
const Database = require('./main/database');
global.__baseDir = __dirname;
const user = require('./routes/user');
const login = require('./routes/login');
const garage = require('./routes/garage');
const car = require('./routes/cars');
const service = require('./routes/services');
const order = require('./routes/order')
const PORT = process.env.port || 3200
// Database.loadDB((err, res) => {
//     if (err) {
//         console.log(err);
//     }
//     else {
//         console.log(res);
//     }
// })

app.set('view engine', 'ejs');
app.use(cors())
// app.use(express.Router())
// app.use('/user', user);
// app.use('/login', login);
// app.use('/garage', garage);
// app.use('/car', car);
// app.use('/service', service);
// app.use('/order',order);
app.use(compression())
app.use(express.static(__dirname + '/uploads'));
app.use(express.static(__dirname + '/brands'));
app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 90000 }));

app.get('/', function(req, res) {
    res.render('pages/index');
  });

app.listen(PORT,() => {
    console.log(`app is starting on port ${ PORT }`);
})