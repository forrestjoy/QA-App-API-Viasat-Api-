var express =require("express"),
    app = express(),
    Db = require('mongodb').Db,
    MongoClient = require('mongodb').MongoClient,
    ObjectId = require('mongodb').ObjectID,
    bodyParser = require('body-parser'),
    gurl = "mongodb://localhost:27017/";
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post("/partialobj", (req, res, next) => {
    console.log('body: ', req.body);
    var query=req.body;//search by all parameters given in                                                                                            \
                                                                                                                                                       
    MongoClient.connect(gurl,{useNewUrlParser: true }, function(err, db) {
             if (err)
                     throw err;
             var dbo = db.db("mockdb");
             dbo.collection("forms").find(query,{projection:{_id:1,description:1,part_type:1,item_number:1}}).toArray(function(err, result) {
                     if (err) throw err;
                     res.json(result);
                     db.close();
                 });
         });
});
/////                                                                                                                                                  
app.post("/searchbyid", (req, res, next) => {
    console.log('Query: ', req.query);
    var key=ObjectId(req.body._id);
    MongoClient.connect(gurl,{useNewUrlParser: true }, function(err, db) {
            if (err)
                    throw err;
            var dbo = db.db("mockdb");
            dbo.collection("forms").find(key).toArray(function(err, result){
                    if (err) throw err;
                    res.json(result);
                    db.close();
                });
        });
});
//////
app.post("/contains", (req, res, next) => {
    console.log('Query: ', req.query);
    var num=req.body.item_number;
    MongoClient.connect(gurl,{useNewUrlParser: true }, function(err, db) {
            if (err)
                    throw err;
            var dbo = db.db("mockdb");
            dbo.collection("forms").find(num).toArray(function(err, result){
                    if (err) throw err;
                    res.json(result);
                    db.close();
                });
        });
});
//////
app.post("/addnoteitem", (req, res, next) => {
    console.log('body: ', req.body);
    var query=req.body;//search by all parameters given in                                                                                            \
                                                                                                                                                       
    var searchId=ObjectId(req.body._id);
    //                                                                                                                                                \
                                                                                                                                                       
    var auth=req.body.author;
    var dat=new Date();
    var date = dat.getFullYear()+'-'+(dat.getMonth()+1)+'-'+dat.getDate();
    var time = dat.getHours()+":"+dat.getMinutes()+":"+dat.getSeconds();
    var date_time=date+' '+time;
    var no=req.body.note;
    var temp=0;
    //                                                                                                                                                 
    MongoClient.connect(gurl,{useNewUrlParser: true }, function(err, db) {
                if (err)
                    throw err;
                var dbo = db.db("mockdb");
                dbo.collection("notes").insertOne({"author":req.body.author,"note":req.body.note,"belongs_to":req.body.belongs_to,"date":date_time}, f\
unction(err, result) {
                        if (err) throw err;
                        console.log("1 document inserted");
                    db.close();
                });
        });
    });
//////
app.post("/addnoteuser", (req, res, next) => {
    console.log('body: ', req.body);
    var query=req.body;//search by all parameters given in                                                                                             
    var searchId=ObjectId(req.body._id);
    var auth=req.body.author;
    var dat=new Date();
    var date = dat.getFullYear()+'-'+(dat.getMonth()+1)+'-'+dat.getDate();
    var time = dat.getHours()+":"+dat.getMinutes()+":"+dat.getSeconds();
    var date_time=date+' '+time;
    var no=req.body.note;
    var temp=0;
    MongoClient.connect(gurl,{useNewUrlParser: true }, function(err, db) {
        if (err)
            throw err;
        var dbo = db.db("mockdb");
        dbo.collection("notes").insertOne({"author":req.body.author,"note":req.body.note,"belongs_to":req.body.belongs_to,"date":date_time}, function(\
err, result) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
    });
});
//////
app.post("/getnotes", (req, res, next) => {
    console.log('body: ', req.body);
    var key=req.body.belongs_to;
    MongoClient.connect(gurl,{useNewUrlParser: true }, function(err, db) {
        if (err)
            throw err;
        var dbo = db.db("mockdb");
        dbo.collection("notes").find({"belongs_to":key}).toArray(function(err, result){
            if (err) throw err;
            res.json(result);
            db.close();
        });
    });
});
//////
app.post("/notebyid", (req, res, next) => {
    console.log('body: ', req.body);
    var key=ObjectId(req.body._id);
    MongoClient.connect(gurl,{useNewUrlParser: true }, function(err, db) {
        if (err)
            throw err;
        var dbo = db.db("mockdb");
        dbo.collection("notes").find(key).toArray(function(err, result) {
            if (err) throw err;
            res.json(result);
            db.close();
        });
    });

});
//////
app.post("/returnuser", (req, res, next) => {
    console.log('body: ', req.body);
    var key=ObjectId(req.body._id);
    MongoClient.connect(gurl,{useNewUrlParser: true }, function(err, db) {
        if (err)
            throw err;
        var dbo = db.db("mockdb");
        dbo.collection("users").find(key).toArray(function(err, result) {
            if (err) throw err;
            res.json(result);
            db.close();
        });
    });

});
//////
app.post("/addfavorite", (req, res, next) => {
    console.log('body: ', req.body);
    var query=req.body;//search by all parameters given in                                                                                             
    var searchId=ObjectId(req.body._id);
    //                                                                                                                                                 
    var item_id=req.body.item_id;
    //                                                                                                                                                 
    MongoClient.connect(gurl,{useNewUrlParser: true }, function(err, db) {
        if (err)
            throw err;
        var dbo = db.db("mockdb");
        dbo.collection("users").updateOne({"_id":searchId},{"$push":{"favorites":req.body.item_id}},function(err, result) {
            if (err) throw err;
            res.json("Your new favorite was added. It is: "+item_id);
            db.close();
        });
    });
});
//////
app.post("/removefavorite", (req, res, next) => {
    console.log('body: ', req.body);
    console.log('Favorite to be removed: ',req.body.item_id);
    var query=req.body;//search by all parameters given in                                                                                             
    var userId=ObjectId(req.body._id);
    var partId=req.body.item_id;
    //                                                                                                                                                 
    var auth=req.body.author;
    //  var newfav=req.body.new_fav;                                                                                                                   
    MongoClient.connect(gurl,{useNewUrlParser: true }, function(err, db) {
        if (err)
            throw err;
        var dbo = db.db("mockdb");
        dbo.collection("users").updateOne({"_id":userId},{"$pull":{"favorites":req.body.item_id}},function(err, result) {
            if (err) throw err;
            res.json("Favorite removed: ");
            db.close();
        });
    });
});
//////
app.post("/itemviewed", (req, res, next) => {
    console.log('body: ', req.body);
    var query=req.body;//search by all parameters given in                                                                                             
    var searchId=ObjectId(req.body._id);
    //                                                                                                                                                 
    var item_id=req.body.item_id;
    //                                                                                                                                                 
    MongoClient.connect(gurl,{useNewUrlParser: true }, function(err, db) {
        if (err)
            throw err;
        var dbo = db.db("mockdb");
        dbo.collection("users").updateOne({"_id":searchId},{"$push":{"recently_viewed":req.body.item_id}},function(err, result) {
            if (err) throw err;
            res.json("Your new item viewed was added. It is: "+item_id);
            db.close();
        });
    });
});
//////
app.post("/deletehistory", (req, res, next) => {
    console.log('body: ', req.body);
    console.log('Clear History from user: ',req.body._id);
    var userId=ObjectId(req.body._id);
    MongoClient.connect(gurl,{useNewUrlParser: true }, function(err, db) {
        if (err)
            throw err;
        var dbo = db.db("mockdb");
        dbo.collection("users").updateOne({"_id":userId},{"$set":{"recently_viewed":[]}},{multi:true},function(err, result) {
            if (err) throw err;
            res.json("History cleared!");
            db.close();
        });
    });
});
//////                                                                                                                                                 

var url = "mongodb://localhost:27017/";
app.listen(3000,() =>{
    console.log("Server running on port 3000");
});
