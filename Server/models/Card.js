var neo4j = require('neo4j');
var db = new neo4j.GraphDatabase(process.env.NEO4J_URL || 'http://localhost:7474');

//Constants

//Index Node
var INDEX_NAME = 'user';
var INDEX_KEY = 'name';
var INDEX_VALUE = 'username';

//Relation
var RELATION = 'related'; 


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

Object.defineProperty(Card.prototype, 'data', {
						//Creates node.data.id and sets node.id
    get: function () { 
	this._node.data.id = this._node.id; return this._node.data; 
	},
	set: function (data) {
        this._node.data = data;
    }
});

Object.defineProperty(Card.prototype, 'cardName', {
    get: function () {
        return this._node.data['cardName'];
    },
    set: function (cardName) {
        this._node.data['cardName'] = cardName;
    }
});

//Private  instance methods:
Card.prototype._getFollowingRel = function (otherCard, callback) {
    var query = [
        'START card=node({cardId}), otherCard=node({otherCardId})',
        'MATCH (card) -[rel?:RELATION]-> (otherCard)',
        'RETURN rel'
    ].join('\n')
        .replace('RELATION', RELATION);

    var params = {
        cardId: this.id,
        otherCardId: otherCard.id,
    };

    db.query(query, params, function (err, results) {
        if (err) return callback(err);
        var rel = results[0] && results[0]['rel'];
        callback(null, rel);
    });
};


// public instance methods:

//Uses thingdoms libary to save node 
Card.prototype.save = function (callback) {
    this._node.save(function (err) {
        callback(err);
    });
};

//Deletes a node
//TODO maybe should not force delete
Card.prototype.del = function (callback) {
    this._node.del(function (err) {
        callback(err);
    }, true);   // true = yes, force it (delete all relationships)
}

//Adds relation between this card and otherCard
Card.prototype.addRelation = function (otherCard, callback) {
    this._node.createRelationshipTo(otherCard._node, RELATION, {}, function (err, rel) {
        callback(err);
    });
};

//Removes relation between this card an otherCard 
Card.prototype.removeRelation = function (other, callback) {
    this._getFollowingRel(other, function (err, rel) {
        if (err) return callback(err);
        if (!rel) return callback(null);
        rel.del(function (err) {
            callback(err);
        });
    });
};

//Get node by id and sets it as the this._node.
Card.get = function(nodeID, callback) {
	db.getNodeById(nodeID, function (err, node) {
        if (err) return callback(err);
        callback(null, new Card(node));
    });
}

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
Card.create = function (data, userName, callback) {
    var node = db.createNode(data);
    var card = new Card(node);
    node.save(function (err) {
        if (err) return callback(err);
		//Indexate node to the user
        node.index(INDEX_NAME, INDEX_KEY, userName['userName'], function (err) {
            if (err) return callback(err);
            callback(null, card);
        });
    });
};



