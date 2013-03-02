var Mongolian = require('mongolian');
var Config = require('./config');

// Make BSON play nicely with us.
var ObjectId = Mongolian.ObjectId;
ObjectId.prototype.toJSON = ObjectId.prototype.toString;

function getSites(req, res){
    var connectionString =  process.env.MONGO_SITES; //Config.getConnectionString();
    var db = new Mongolian(connectionString);
    return db.collection('sites');
};

exports.list = function(req, res){
    var sites = getSites();
    sites.find().limit(10).toArray(function(err, array){
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(array));
        res.end();
    });
};

exports.add = function(req, res){
    var sites = getSites();
    sites.insert({
        url: req.body.url,
        cookie: req.body.cookie
    });
    res.send('OK');
};
