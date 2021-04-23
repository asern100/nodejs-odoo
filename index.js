// import cfg file 
const dotenv = require("dotenv");
// import express for server 
const express = require('express');
//import xmlrpc to connect to db
const odoo = require("odoo-xmlrpc")

const app = express();

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Listening on port ${port}`))

dotenv.config();

// Initialize odoo client

const oDoo = new odoo({
    url : "http://192.168.1.188:8069",
    db : "mydb",
    username : "saiefeddina@gmail.com",
    password : "azerty123"
  })

//Logging in


app.get('/getUsers', (req, res) => {
    oDoo.connect(function(err) {
      if (err) {
        return console.log(err)
      }
      console.log('Connected to Odoo server.')
      let inParams = []
      //let domain = [
     //   ['active', '=', true]
      //]
  
      //inParams.push(domain)
      let params = []
      params.push(inParams)
      params.push({ fields: ['username', 'firstName', 'lastName', 'email', 'descriminator', 'status', 'address', 'phoneNumber'], limit: 1 })
      oDoo.execute_kw('sib_logistic.sib_logistic', 'search_read', params, function(err, value) {
        if (err) {
          return console.log(err)
        }
        res.send({
          users: value
        })
      })
    })
  })

  app.get('/register', (req, res) => {
    oDoo.connect(function(err) {
        if (err) {
        return console.log(err)
        }
        console.log('Connected to Odoo server.')
     
        var inParams = [];
        inParams.push({
            'username': 'mahfoudh',
            'password' : 'azerty',
            'firstName' : 'Insen',
            'lastName' : 'Insen',
            'email' : 'insen@earth.live',
            'descriminator' : 'Humman',
            'status' : 0,
            'address': 'earth',
            'phoneNumber':'0000000000'
        })
        var params = [];
        params.push(inParams);
        oDoo.execute_kw('sib_logistic.sib_logistic', 'create', params, function (err, value) {
            if (err) { return console.log(err); }
            console.log('Result: ', value);
        });
    })
  })


  
  window.location.replace("http://example.com");




