define(function (require) {
    var $ = require('jquery');
	
	//jäkligt privat variabel!
	var _html ="";
	var numberOfCards = 0;
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
		
		if(!(typeof _data.web === "undefined"))
			_cardFunctions.addWeb(_data.web);
		
		if(!(typeof _data.img === "undefined"))
			_cardFunctions.addImg(_data.img);
			
		if(!(typeof _data.cardname === "undefined"))
			_cardFunctions.addTitle(_data.cardname,_data.id);
		
	};
	
	
	
	//Construkktorr
	var Card = function Card(_data){
		numberOfCards++;
		this._CardData = _data;
		_CardData = _data;
		_createHtml();
		_initCardFromData(_data);
		_eventhandler(_data);
		console.log("creating node " + _data.id);
		
		
		

	};
	
	
	
	var cardElements = {
			$cardName : $('#cardName'),
			$text : $('#text'),
			$image : $('#image'),
			$title : $('#title')
		};
	
		//Drag events 
	var _eventhandler = function(_data) {
		dragstop : _html.on( "dragstop", function( event, ui ) {
			console.log(JSON.stringify(ui.position  + " elementet " + JSON.stringify(cardElements.$title)));
			// $.ajax({
			   // url: 'http://localhost:3000/card/update/'+ _CardData.id,
			   // type: 'PUT',
			   // data: { changePar:'cardname', updatePar: 'tyrty'},
			   // success: function(response) {
				
				 // console.log(response);
			   // }
			// });
		})
		
		dragstart : _html.on( "dragstart", function( event, ui ) {
			console.log(JSON.stringify(ui.position));
		})
	};
	
	//Functions for the card
	var _cardFunctions = {
		addImg: function(img){
			_html.append('<img src="'+img+'" />');
		},
		addTitle: function(title,id){
			// if(cardElements.$title.length) 
			// cardElements.$title.empty();
			cardElements.$title = $('<h3 class="title'+id+'">'+title+'</h3>');
			// cardElements.$title.html('<h3 class="title">'+title+'</h3>');
			_html.prepend(cardElements.$title);
		},
		
		addText: function( text ){
			_html.append('<p>'+text+'</p>');
		},
		
		addWeb: function( src ){
			_html.append($("<iframe width='540' height='350' src="+src+"></iframe>") );
			
		}
	};
	
	
	

	//Public exposed functions 
	Card.prototype.addImg = _cardFunctions.addImg;
	Card.prototype.addText = _cardFunctions.addText;
	Card.prototype.addWeb = _cardFunctions.addWeb;
	Card.prototype.addTitle = _cardFunctions.addTitle;
	

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