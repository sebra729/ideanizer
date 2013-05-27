define(function (require) {
    var $ = require('jquery');
	var CardEventHandler = require('CardEventHandler');
	

	
	//The initial html creation variable from where the Card is going to grow from
	var _createHtml = function() {
		//Creates the initial html root
		var html = $('<div>', {
			id: 'foo',
			'class': 'box ui-widget-content ui-draggable'
		}).draggable({
			stop: function(event, ui){},
			start: function( event, ui ) {}
		});//.appendTo('body');
		return html;
	};
	

		

	
	
	//Construkktorr
	var Card = function Card(_data){
		var self = this;
		//root reference of the Card object
		this.root = _createHtml();
		//Sets the instansiated data
		this.data = _data;

		
		
		this.eventHandler = new CardEventHandler(this.root,this.data);
		
		
		
		//_initCardFromData(_data);
		//_eventhandler(_data);
		console.log("creating node " + _data.id);
		
		
		
		var cardElements = {
			$id : _data.id,
			$cardName : $('#cardName'),
			$text : $('#text'),
			$image : $('#image'),
			$title : $('#title')
		};
		
		var serverSpeaker = {
			update: function(toChange, nodeId, newValue){
					$.ajax({
					   url: '/card/update/'+ nodeId,
					   type: 'PUT',
					   data: { changePar: toChange, updatePar: newValue},
					   success: function(response) {
						
						 console.log(response);
					   }
					})},
			create: function(data,callback){
				
					$.ajax({
					   url: '/card',
					   type: 'POST',
					   data: data,
					   success: function(response) {
						 //self.data = response;
						 
						 callback(response);
					   }
					})}
		};
		
		
		
		
		
		//	Functions for the card
		this.cardFunctions = {
			addImg: function(img){
				self.root.append('<img src="'+img+'" />');
			},
			addTitle: function(title,id){
				var title = $('<h3 class="title'+id+'">'+title+'</h3>');
				var input = $("<input type='text'></input>").hide();
				cardElements.$title = $('<div class="tittle"></div>').append(title).append(input);
				
				cardElements.$title.dblclick(function () {
						var el = $(this);
						var input = el.children("input");
						var title = el.children("h3");
						input.val(el.text());
						
						el.children().toggle();
						input.keypress(function(e) {
														if(e.which == 13) {
															title.text(input.val()).show();
															input.hide();
															//property to update, node id, new property value
															serverSpeaker.update('cardName',id,input.val());
															
														}})
						
						//var newInput = $("<input type='text'></input>").val(el.text());
						// el.prepend(newInput.on("blur", function(event){
													// alert($(this).text());
												// }));
						//el.children("h3").hide();
						console.log("Kommer hit och kortet har id "+JSON.stringify(cardElements.$title.html()));
						//el.replaceWith(newInput);
						//el.hide();
						//el.prepend(newInput);
						
					});
				
				self.root.prepend(cardElements.$title);
			},
			
			addText: function( text ){
				self.root.append('<p>'+text+'</p>');
			},
			
			addWeb: function( src ){
				self.root.append($("<iframe width='540' height='350' src="+src+"></iframe>") );
				
			}
		};
		
		
		//
		var initCardFromData = function(data){
			
			if(!(typeof data.web === "undefined"))
				self.cardFunctions.addWeb(data.web);
			

			if(!(typeof data.imageUrl === "undefined"))
				self.cardFunctions.addImg(data.imageUrl);
				
				
			if(!(typeof data.cardName === "undefined"))
				self.cardFunctions.addTitle(data.cardName,data.id);
			
		};
		
		//doesnt exist in databas call create
		if((typeof this.data.id === "undefined")){
			serverSpeaker.create(this.data, function(data){
				console.log(data);
				initCardFromData(data.Card);
				//self.addImg(data.Card.imageUrl);
			});
		}else{
			initCardFromData(this.data);
		}
		
		
		
		
		
		
		
		//Adds the html to body
		this.root.appendTo('body');

	};
	
	

	

	//Public exposed functions 
	Card.prototype.addImg = function(imgUrl){
				this.root.append('<img src="'+imgUrl+'" />');
			};
	
	// Card.prototype.addText = _cardFunctions.addText;
	// Card.prototype.addWeb = _cardFunctions.addWeb;
	// Card.prototype.addTitle = _cardFunctions.addTitle;
	

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