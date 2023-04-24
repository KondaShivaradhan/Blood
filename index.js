var express = require('express');
var app = express();
var path = require('path');
var mongo = require('mongodb');
var data = require('./Events.json')
const MongoClient = require('mongodb').MongoClient;
var bodyParser = require("body-parser");
// stats require
// const fetch = require("node-fetch");
const https = require('https');
const axios = require('axios')
    // process.env.URI ||

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.use("/public", express.static(path.join(__dirname, "/public")));
app.get('/', function(req, res) {
    // const uri = "mongodb://127.0.0.1:27017/";
    // MongoClient.connect(uri, (err, db) => {
    //     if (err) throw err;
    //     var dbo = db.db("EventManager");
    //     dbo.collection("Events").find({}).toArray(function(err, result) {
    //         if (err) throw err;
    //         console.log(result);
    //         db.close();
    //         res.render("Admin")
    //     });
    // });
    res.render("index")

})
app.get('/dash', function(req, res) {
    const array = data
    res.render("Dashboard", { array })
})
app.get('/public', function(req, res) {
    const array = data
    res.render("public", { array })
})
app.get('/private', function(req, res) {
    const array = data
    res.render("private", { array })
})
app.get('/create', function(req, res) {
    res.render("create")
})
app.get('/update/:index', function(req, res) {
    var index = req.params.index
    console.log(index);
    var data = require('./Events.json')
    var c = 1
    data.forEach(event => {
        if (c == 1) {
            var uevent = event
            res.render("update", { uevent })
        }
    })
})
app.get('/events', function(req, res) {
    const array = data
    res.render("events", { array })
})
app.get('/gen', function(req, res) {
    const array = data
    res.render("gen", { array })
})
app.get('/settings', function(req, res) {
    const array = data
    res.render("settings")
})
app.post('/', function(req, res) {
    console.log(req.body);
    var username = req.body.username
    var pass = req.body.pass
    if (username == "919616886" && pass == "1234") {

        const array = data
        console.log(array);
        res.render("Dashboard", { array })

    } else {
        res.render("index")
    }
    console.log(username);
})
app.post('/create', function(req, res) {

    var temp = JSON.parse(req.body.name)
    console.log(temp.rec);
    let jsonObject = {
        "name": temp.name,
        "location": temp.location,
        "type": temp.type,
        "ESdate": temp.ESdate,
        "EEdate": temp.EEdate,
        "EStime": temp.EStime,
        "EEtime": temp.EEtime,
        "rec": temp.rec,
        "capacity": temp.capacity,
    };
    final = data.concat(jsonObject);
    console.log(final)
    const fs = require('fs')
    finals = JSON.stringify(final)
    fs.writeFile("Events.json", finals, function(err, result) {
        if (err) console.log('error', err);
    });
    res.render("success")
})
app.post('/delete/:index', function(req, res) {
    var index = req.params.index
    console.log(index);
    var c = 1;
    var final = []
    data.forEach(event => {
        if (c == index) {
            console.log(`matched here at this event ${event}`);
        } else {

            final.push(event);
        }
        c++;

    })

    const fs = require('fs')
    var finals = JSON.stringify(final)
    fs.writeFile("Events.json", finals, function(err, result) {
        if (err) console.log('error', err);
    })
    res.render('success');
})
app.listen(process.env.PORT || 5000)
console.log('====================================');
console.log('Site launched at http://localhost:5000');