require('dotenv').config();
const express  = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/" , function(req ,res)
{
    res.sendFile(__dirname + "/signup.html");
});

app.post("/" ,function(req ,res)
{
    var Email = req.body.Email;
    var firstName  =req.body.firstName;
    var lastName  = req.body.lastName;
    
   var data  = {
       members : [{
           email_address : Email,
           status : "subscribed",
           merge_fields : {
               FNAME : firstName,
               LNAME : lastName
           }
       }]
   };

   var JsonData = JSON.stringify(data);
   var options = {
       url :  "https://us7.api.mailchimp.com/3.0/lists/" + process.env.LIST_ID,
       method : "POST", 
       headers : {
           "Authorization" : process.env.USER_NAME + " " + process.env.API_KEY
       },
       body : JsonData
   };
   request(options , function(error , response, body ){
       if(error)
       {
           res.sendFile(__dirname + "/fail.html");
       }else{
           
        if(response.statusCode === 200){
        res.sendFile(__dirname + "/success.html");
       }
        else{
            res.sendFile(__dirname + "/fail.html");
        }
    }
});

});
app.post("/failiure" , function(req ,res)
{
    res.redirect("/");
})

app.listen(3000 , function(req, res)
{
    console.log("Server is running");
});
