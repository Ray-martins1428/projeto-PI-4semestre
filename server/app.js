const express = require('express');
const app = express();
const path = require('path');
const PORT = 4040; 
const dashboardRoutes = require('./routes/routes'); 


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'../renderer/views'));
app.use(express.static(path.join(__dirname,'..', 'public'))); 
app.use(express.urlencoded({extended: false}));

app.use(dashboardRoutes); 



app.get('/', (req, res) => {
    res.render('index');
});


app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});