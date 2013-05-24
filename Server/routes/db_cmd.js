var Card = require('../models/Card');


/*
 * POST /card 
 * Creates a node.
 */
 exports.create = function (req, res, next) {
	Card.create(
		{cardName: req.body['cardName'],
		text: req.body['text'], 
		imageUrl: req.body['imageUrl'], 
		position: req.body['position'],
		orientation: req.body['orientation']
		},
		{userName: req.body['userName']},
		function (err, card) {
        if (err) return next(err);
        res.send('succsess!, new node created! \n'+ 
		req.body['userName'] 	+ '\n' + 
		req.body['cardName'] 	+ '\n' +
		req.body['text'] 		+ '\n' +
		req.body['imageUrl'] 	+ '\n' +
		req.body['position'] 	+ '\n' +
		req.body['orientation']);
    });
 }
 
 /*
 * GET /cards 
 * get cards from a user. 
 */
 exports.getAllCards = function(req, res, next) {
	Card.getAll(req.params.user, function (err, cards) {
        if (err) return next(err);
		var cardarray =[];
		for(var i =0; i<cards.length;i++){
			cardarray.push( cards[i].data );
		}
        res.send('Cards', {
				// Card: cards
				Card: cardarray
        })
    });  
 }
 
  /*
 *DELETE /node
 *Deletes a node on node id
 */
 exports.del = function(req, res, next) {
	Card.get(req.params.nodeId, function (err, card) {
        if (err) return next(err);
        card.del(function (err) {
            if (err) return next(err);
            res.send('Deleted node:' + req.params.nodeId);
        });
    });
 }
 
 