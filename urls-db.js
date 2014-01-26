var Mongolian = require('mongolian');

// Make BSON play nicely with us.
var ObjectId = Mongolian.ObjectId;
ObjectId.prototype.toJSON = ObjectId.prototype.toString;
//MONGOHQ_URL used to be MONGO_SITES 
if (process.env.MONGOHQ_URL){
    // Set MONGO_SITES as a Heroku environmental variable.
    // Something like $ heroku config:set MONGO_SITES=myaccesstokeninformationhere
    db = new Mongolian(process.env.MONGOHQ_URL);
} else {
    var server = new Mongolian;
    // Mongo doesn't return the db proper when connected without
    // authentication (as in local).
    //this used to be pantheon-app
    db = server.db('faceflip');
}

exports.list = function(isGod, callback){
    var collection = (isGod) ? 'godsites' : 'demisites';
    var sites = db.collection(collection);
    sites.find().limit(10).sort({time: -1}).toArray(function(err, array){
        callback(array);
    });
};

exports.add = function(isGod, data){
    var collection = (isGod) ? 'godsites' : 'demisites';
    var sites = db.collection(collection);
    sites.insert(data);
};
