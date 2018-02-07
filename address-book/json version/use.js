
// extract modules
var fs = require('fs');  // file system module
var express = require('express');  // express module
var mysql = require('mysql');  // mysql module
var bodyParser = require('body-parser');  // body parser middleware : POST 요청 데이터를 추출, request 객체에 body 속성이 부여된다.
var ejs = require('ejs');

// create the server
var app = express();

// connect the database
var client = mysql.createConnection({
    user : 'root',
    password : 'tkdgus10!',
    port : '52222',
    database : 'book'
});

// use the body parser middleware
app.use(bodyParser.urlencoded({extended: false}));  // url encoding 기능을 확장하지 않음.
app.use(bodyParser.json());

// execute the server
app.listen(52273,function() {
    console.log('server running at http://127.0.0.1:52273');
});

// first cover page
app.get('/',function(request,response) {
    // read the file
   fs.readFile('cover.html','utf8',function(error,data) {
           if(error){
               console.log("/ get error");
               throw error;
           } else {
               response.send(data);
               console.log("/ get success");
           }});
});

// perform the routing service
// page cover list 1
app.get('/list1', function(request,response) {
        // connect the database query
        client.query('SELECT * FROM address', function(error,results) {
            if(error){
                console.log("list1 get error");
                throw error;
            } else {
                response.send(JSON.stringify(results));
                console.log(JSON.stringify(results));
                console.log("list1 get success");
            }});
});

// page cover list 2
app.get('/list2', function(request,response) {
    // connect the database query
    client.query('SELECT * FROM privacy', function(error,results) {
        if(error){
            console.log("list2 get error");
            throw error;
        } else {
            response.send(JSON.stringify(results));
            console.log(JSON.stringify(results));
            console.log("list2 get success");
        }});
});

// '/insert1' , data inserting
app.get('/insert1',function(request,response) {
    // read file
    fs.readFile('insert1.html','utf8', function(error,data) {
        //response
        response.send(data);
        console.log("insert1 get success");
    });
});

app.post('/insert1',function(request,response) {
    // declare the variable
    var body = request.body;

    // connect the database query
    client.query('INSERT INTO address (rank,name,addre,phon) VALUES (?,?,?,?)', [
        body.rank, body.name, body.addre, body.phon
    ], function(error,results) {
        if(error){
            console.log("query address error");
            throw error;
        } else {
            console.log("query address success");
        }});

    // show the result by json format
    client.query('SELECT * FROM address', function(error,results) {
        if(error){
            console.log("insert1 error");
            throw error;
        } else {
            response.send(JSON.stringify(results));
            console.log(JSON.stringify(results));
            console.log("insert1 success");
        }});
});

// '/insert2' , data inserting
app.get('/insert2',function(request,response) {
    // read file
    fs.readFile('insert2.html','utf8', function(error,data) {
        //response
        response.send(data);
        console.log("insert2 get success");
    });
});

app.post('/insert2',function(request,response) {
    // declare the variable
    var body = request.body;

    // connect the database query
    client.query('INSERT INTO privacy (rank,name,age,number) VALUES (?,?,?,?)', [
        body.rank, body.name, body.age, body.number
    ], function(error,results) {
        if(error){
            console.log("query address error");
            throw error;
        } else {
            console.log("query address success");
        }});

    // show the result by json format
    client.query('SELECT * FROM privacy', function(error,results) {
        if(error){
            console.log("insert2 error");
            throw error;
        } else {
            response.send(JSON.stringify(results));
            console.log(JSON.stringify(results));
            console.log("insert2 success");
        }});
});

// '/delete' , data deleting
app.get('/delete1/:id',function(request,response) {
    client.query('DELETE FROM address WHERE id?', [request.params.id], function(error,results) {
        response.send(JSON.stringify(results));
        console.log("delete1 success");
    });
});

app.get('/delete2/:id',function(request,response) {
    client.query('DELETE FROM privacy WHERE id', [request.params.id], function(error,results) {
        response.send(JSON.stringify(results));
        console.log("delete2 success");
    });
});
