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
		//Success respons 
        res.send('succsess!, new node created! \n'+ 
			req.body['userName'] 	+ '\n' + 
			req.body['cardName'] 	+ '\n' +
			req.body['text'] 		+ '\n' +
			req.body['imageUrl'] 	+ '\n' +
			req.body['position'] 	+ '\n' +
			req.body['orientation']
		);
    });
 }
 
 /*
 * GET /cards 
 * get cards from a userName. 
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
 * POST /card/:nodeId
 * Updates a node on node id 
 */
exports.update = function (req, res, next) {
    Card.get(req.params.nodeId, function (err, card) {
        if (err) return next(err);
        card.data = 
		{cardName: req.body['cardName'],
		text: req.body['text'], 
		imageUrl: req.body['imageUrl'], 
		position: req.body['position'],
		orientation: req.body['orientation']
		};
        card.save(function (err) {
            if (err) return next(err);
			//Success respons 
            res.send('succsess!, new node updated! \n'+ 
				req.body['userName'] 	+ '\n' + 
				req.body['cardName'] 	+ '\n' +
				req.body['text'] 		+ '\n' +
				req.body['imageUrl'] 	+ '\n' +
				req.body['position'] 	+ '\n' +
				req.body['orientation']);
			});
    });
};
 
 /*
 *DELETE /card/:nodeId
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
 
 
 
 