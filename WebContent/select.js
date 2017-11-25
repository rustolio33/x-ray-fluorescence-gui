(function() {
	var method = document.getElementById('methodName');
	var substrate = document.getElementById('substrate');
	var chromePhosphate = {
			alcl: 'Aluminum Coil Stock',
			alex: 'Aluminum Extrusion'
	}
	var chromeOnSteel = {
			crs: 'CRS',
			galv: 'Galvanized Steel',
			glum: 'Galvalume',
			hrs: 'HRS'
	}
	var chromeFree = {
			alcl: 'Aluminum Coil Stock',
			alex: 'Aluminum Extrusion',
			crs: 'CRS',
			galv: 'Galvanized Steel',
			glum: 'Galvalume',
			hrs: 'HRS'
	}
	
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
	
	function getSubstrate(methodName) {
		if(methodName === 'chromePhosphate') {
			return chromePhosphate;
		}
		else if(methodName === 'chromeOnSteel') {
			return chromeOnSteel;
		}
		else if(methodName === 'chromeFree') {
			return chromeFree;
		}
	}
	
}());