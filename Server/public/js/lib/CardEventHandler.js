define(['jquery', 'jquery-ui'], function($){


	var CardEventHandler = function(root,data){
	

		dragstop : root.on( "dragstop", function( event, ui ) {
			console.log(JSON.stringify(ui.position  + " elementet " + JSON.stringify(data.id)));

		})
		
		dragstart : root.on( "dragstart", function( event, ui ) {
			console.log(JSON.stringify(ui.position));
		})

	}
	
	return CardEventHandler;
});