const express = require('express')
var bodyParser = require('body-parser')
const app = express()
var path = require('path')

var passwords = {}

passwords['krtek'] = "noname"

app.use(express.static('.'))
//app.use('/img', express.static(__dirname + '/img'));
app.use(bodyParser.json());

app.get('/', function(req,res){
    console.log("cookies: " + req.get('cookie'))
     res.sendFile(path.join(__dirname + '/index.html'))
})

app.get('/login', function(req, res){
   res.sendFile(path.join(__dirname + '/login.html'))
})


app.post('/login', function(req, res){

    //console.log(req.body())
    var bodyStr = '';
    var username;
    var password;
    var params;

    req.on("data", function(chunk){
        bodyStr += chunk.toString();
    })

    req.on('end', function(){
        console.log("bodyStr: #" + bodyStr + "#")

        params = bodyStr.split('&');
        params.forEach((param) => {
            console.log(param.split('=')[0])
            switch(param.split('=')[0]){
                case 'username':
                    username = param.split('=')[1];
                    break;
                case 'password':
                    password = param.split('=')[1]
                    break;
                default:
                    console.log("unknown param " + param);
                    break;
            }


        })


        while(!params){} //wait until params are filled which happes after request.on above

        console.log("username: " + username)
        console.log("password: " + password)


        res.cookie('username', username)

        if(passwords[username] == password){
        //if(username == 'krtek' && password == 'noname') {
            console.log("Got credentials: " + username + ":" + passwords[username])
            res.cookie('id_token', 'OK', {expires: new Date(Date.now() + 9000000)})
            res.redirect('/treasure')
            //res.sendFile("./poklad.html")
        }else{
            res.redirect('/')
        }


    })




})

app.get('/treasure', function(req, res){
    console.log(req.headers)

    //console.log("DEBUG req " + JSON.stringify(req))

    if(req.get('cookie').indexOf('id_token=OK') !== -1) {
        res.sendFile(path.join(__dirname + '/poklad.html'))
    }else{
        res.status(401).send("Unauthorized")
    }
})

app.get('/logout', function(req, res){

    res.cookie('id_token', 'BAD', {expires: new Date('Thu, 01 Jan 1970 00:00:00 UTC')})
    res.cookie('username', 'neznamy', {expires: new Date('Thu, 01 Jan 1970 00:00:00 UTC')})
    res.redirect('/')

})

app.post('/accounts', function(req, res) {

    console.log("reached accounts " + JSON.stringify(req.body));

    passwords[req.body.name] = req.body.password

    for (var key in passwords) {
        console.log("pwd: " + key + ":" + passwords[key])
    }

    res.send("success! " + req.body.name)

})

app.delete('/accounts', function(req,res){

    delete passwords[req.body.name];

    console.log("Deleting " + req.body.name)
    for (var key in passwords) {
        console.log("pwd: " + key + ":" + passwords[key])
    }

    res.send("deleted " + req.body.name)

})


app.listen(3000, function(){
    console.log('Example app listening on port 3000')
})
