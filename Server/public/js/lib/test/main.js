define(function (require) {
    var $ = require('jquery');
	

     // dependency2 = require('jquery-ui');
	//$( "#draggable" ).draggable({ handle: "p" });
		$( "#draggable" ).draggable({ handle: "p" });
		$( "#draggable2" ).draggable({ cancel: "p.ui-widget-header" });
		$( "div, p" ).disableSelection();
	
	var Test = function(selector){
		this.target = document.getElementById(selector);
	};
	
	Test.prototype.run = function(){
		alert('halo');
	};
	
	return function(selector) {
		return new Test(selector);
	}
	
	
    

		
});