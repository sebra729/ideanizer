var neo4j = require('neo4j');
var db = new neo4j.GraphDatabase(process.env.NEO4J_URL || 'http://localhost:7474');

//Constants

//Index Node
var INDEX_NAME = 'user';
var INDEX_KEY = 'name';
var INDEX_VALUE = 'username';

//Relation
var REL_Fol = 'follow'; 


/*
*Private Constructor 
*Stores the node of the card
*/
var Card = module.exports = function Card(_node){
	this._node = _node;
}

// public instance properties:
Object.defineProperty(Card.prototype, 'id', {
    get: function () { return this._node.id; }
});

Object.defineProperty(Card.prototype, 'exists', {
    get: function () { return this._node.exists; }
});

Object.defineProperty(Card.prototype, 'cardname', {
    get: function () {
        return this._node.data['cardname'];
    },
    set: function (cardname) {
        this._node.data['cardname'] = cardname;
    }
});


// public instance methods:

//Uses thingdoms libary to save node 
Card.prototype.save = function (callback) {
    this._node.save(function (err) {
        callback(err);
    });
};

//Get all cards from a specific user.
Card.getAll = function (user, callback) {
    db.getIndexedNodes(INDEX_NAME, INDEX_KEY, user, function (err, nodes) {
        // if (err) return callback(err);
        // XXX FIXME the index might not exist in the beginning, so special-case
        // this error detection. warning: this is super brittle!!
        if (err) return callback(null, []);
        var cards = nodes.map(function (node) {
            return new Card(node);
        });
        callback(null, cards);
    });
};

// creates the card and persists (saves) it to the db, incl. indexing it after the user:
// Username should be sent from client 
Card.create = function (data, username, callback) {
    var node = db.createNode(data);
    var card = new Card(node);
    node.save(function (err) {
        if (err) return callback(err);
		//Indexate node to the user
        node.index(INDEX_NAME, INDEX_KEY, username['username'], function (err) {
            if (err) return callback(err);
            callback(null, card);
        });
    });
};



