define(function(require) {
	var $ = require("jquery");
	
	var Card = require("card");
	
	//To load packages (folders with files)
	requirejs.config({
			"packages": ["test"]
		});
		
	//jquery dom ready function
    $(function() {
        
		//Loading nodes from server
		$.get('http://localhost:3000/card/Anders', function(data) {
			data.Card.map(function(card){
				new Card(card);
			});
			console.log('Load was performed.');
		});
		
		var nodeData = {
							img: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTItbWKon_I94Tj2MXWLPkIxM_wRpZoDE60vOgiNnzFtG-qWETxrg",
							cardname: "Hund",
							id: 11,
							//web: "http://sv.wikipedia.org/wiki/Anus"
						};
		
		
		var myCard = new Card(nodeData);

		//myCard.addImg("https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTItbWKon_I94Tj2MXWLPkIxM_wRpZoDE60vOgiNnzFtG-qWETxrg");
		//myCard.addText("Gullig hund det där!");
		myCard.onClick( function(message) {
			console.log("callbakc sa " + message);
		});
	
		
    });
});