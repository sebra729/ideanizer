define(function (require) {
    var $ = require('jquery');
	
	//jäkligt privat variabel!
	var _html ="";
	
	
	//The initial html creation variable from where the Card is going to grow from
	var _createHtml = function() {
		_html = $('<div>', {
			id: 'foo',
			'class': 'box ui-widget-content ui-draggable'
		}).draggable({
			stop: function(event, ui){},
			start: function( event, ui ) {}
		}).appendTo('body');
		
	};
	
	//
	var _initCardFromData = function(_data){
		if(_data.img != 'undefined')
			_cardFunctions.addImg(_data.img);
	};
	
	//Drag events 
	var _eventhandler = function() {
		dragstop : _html.on( "dragstop", function( event, ui ) {
			console.log(JSON.stringify(ui.position));
		})
		
		dragstart : _html.on( "dragstart", function( event, ui ) {
			console.log(JSON.stringify(ui.position));
		})
	};
	
	
	//Construkktorr
	var Card = function(_data){
		this._data = _data
		_createHtml();
		_initCardFromData(_data);
		_eventhandler();
	};
	
	
	
	//Functions for the card
	var _cardFunctions = {
		addImg: function(img){
			_html.append('<img src="'+img+'" />');
		},
		addTitle: function(title){
			_html.append('<img src="'+img+'" />');
		},
		
		addText: function( text ){
			_html.append('<p>'+text+'</p>');
		}
	};
	
	
	

	//Public exposed functions 
	Card.prototype.addImg = _cardFunctions.addImg;
	Card.prototype.addText = _cardFunctions.addText;
	

	Card.prototype.onClick = function(callback){
		callback("tjo");
	
	};
	
	
	
     // dependency2 = require('jquery-ui');
	//$( "#draggable" ).draggable({ handle: "p" });
		$( "#draggable" ).draggable({ handle: "p" });
		$( "#draggable2" ).draggable({ cancel: "p.ui-widget-header" });
		$( "div, p" ).disableSelection();
		
	//returns the Card
	return Card;
	 
    

		
});