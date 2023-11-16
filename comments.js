//create web server and listen to port 3000
const express = require('express');
const app = express();
const port = 3000;

//connect to database
const db = require('./config/mongoose');

//use express router
app.use(express.urlencoded());

//use express router
app.use('/',require('./routes'));

//set up the view engine
app.set('view engine','ejs');
app.set('views','./views');

//listen to port
app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});
