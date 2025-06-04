const express = require("express"); // installing the required module

const app = express(); // initializing the app with express server

// Request handlers
app.get((req, res)=>{
    res.send('Listening at home page');

});

app.get("/aboutus",(req, res)=>{
    res.send('Listening at about us page');
  
});

// listening various request at port
app.listen(4567,()=>{
    console.log("success listening at 4567!");
});