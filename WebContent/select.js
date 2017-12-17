/*
 * The next three objects are the method objects.  They contain the substrate list
 * as well as the min, max, and factor for calculating the coating weight.  In a real-world
 * application, these objects would have to be more complicated because the selection
 * would have to pass off some parameters to the instrument.
 */

var chromePhosphate = {
		min : 1500,
		max : 3000,
		factor : 0.033,
		substrateList : {
			alcl: 'Aluminum Coil Stock',
			alex: 'Aluminum Extrusion'
		}
};
var chromeOnSteel = {
		min : 500,
		max : 5000,
		factor : 0.002,
		substrateList : {
			crs: 'CRS',
			galv: 'Galvanized Steel',
			glum: 'Galvalume',
			hrs: 'HRS'
		}
};
var chromeFree = {
		min : 300,
		max : 1500,
		factor : 0.0166,
		substrateList : {
			alcl: 'Aluminum Coil Stock',
			alex: 'Aluminum Extrusion',
			crs: 'CRS',
			galv: 'Galvanized Steel',
			glum: 'Galvalume',
			hrs: 'HRS'
		}
};

/*
 * This function creates the drop down selections for the substrate based on the method
 * selection made by the user.  I got the gist of this function either from the book, or
 * Stack Overfow.
 */
(function() {
	var method = document.getElementById('method-name');
	var substrate = document.getElementById('substrate');
	
	// changes substrate dropdown based on method selection
	addEvent(method, 'change', function() {
		if(this.value === 'choose') {
			substrate.innerHTML = '<option>Please choose a method first</option>';
			return;
		}
		var substrates = getSubstrate(this.value);
		
		var options = '<option>Please choose a substrate</option>';
		for(var key in substrates) {
			options += '<option value="' + key + '">' + substrates[key] + '</option>';
		}
		substrate.innerHTML = options;
	});
	
	// returns list of substrates to put into substrate selection
	function getSubstrate(methodName) {
		if(methodName === 'chromePhosphate') {
			return chromePhosphate.substrateList;
		}
		else if(methodName === 'chromeOnSteel') {
			return chromeOnSteel.substrateList;
		}
		else if(methodName === 'chromeFree') {
			return chromeFree.substrateList;
		}
	}
	
}());