// Place third party dependencies in the lib folder
//
// Configure loading modules from the lib directory,
// except 'app' ones,
requirejs.config({
    "baseUrl": "js/lib",
    "paths": {
		  "jquery": "jquery-ui-1.10.3/jquery-1.9.1"
        , "jquery-ui": "jquery-ui-1.10.3/ui/jquery-ui"
		, "app": "../app"
    },
    "shim": {
		//As jquery-ui is not an amd module we have to explicittly 
		//set the dependency
		"jquery-ui": ["jquery"],
		"card": ["jquery-ui"],
		"test": ["jquery-ui"],
		"jquery-ui-1.10.3/ui/jquery.ui": ["jquery"],
		"jquery-ui-1.10.3/ui/jquery.ui.core": ["jquery"],
		"jquery-ui-1.10.3/ui/jquery.ui.widget": ["jquery"],
		"jquery-ui-1.10.3/ui/jquery.ui.mouse": ["jquery"],
		"jquery-ui-1.10.3/ui/jquery.ui.draggable": ["jquery"]
    }
});

// Load the main app module to start the app
requirejs(["app/main"]);