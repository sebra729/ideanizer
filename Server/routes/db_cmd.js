var Card = require('../models/Card');


/*
 * POST /card 
 * Creates a node.
 */
 exports.create = function (req, res, next) {
	Card.create(
		{cardname: req.body['cardname']},
		{username: req.body['username']},
		function (err, card) {
        if (err) return next(err);
        res.send('succsess!, new node created '+ req.body['cardname'] + req.body['username']);
    });
 }
 
 /*
 * GET /cards 
 * get cards from a user. 
 */
 exports.getAllCards = function(req, res, next) {
	Card.getAll(req.params.user, function (err, cards) {
        if (err) return next(err);
        res.send('Cards', {
				Card: cards
        })
    });  
 }
 
 