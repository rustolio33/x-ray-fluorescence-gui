var newProject = {};
$('#project-number').focus();


/*
 * The event handler below triggers the validateForm() function and if the form is valid,
 * fills the newProject object with the form data.  Then the event handler hides the
 * current fieldset and shows the next fieldset which is the sample entry form.
 */

$("#next").on('click', function(e) {	
	
	if(validateForm('start-project')) {
		var current_fs = $(this).parent().parent();
		var next_fs = $(this).parent().parent().next();

		newProject.projectNumber = $('#project-number').val();
		newProject.customerName = $('#customer-name').val();
		newProject.methodName = $('#method-name option:selected').text();
		newProject.substrate = $('#substrate option:selected').text();
		newProject.userInitials = $('#user-initials').val();
		newProject.measurements = [];
				
		current_fs.hide();
		next_fs.show();
		$('#results-table').show();
		
		$('#sample-name').focus();
	}
	
});


/*
 * The following event handler validates the sample name and then adds a measurement object
 * to the measurements array of the newProject object.  When the button is clicked, dummy 
 * data is generated.  If the application were actually being used, data would be collected
 * from the x-ray fluorescence instrument and put into the meausrement object.
 */

$("#measure-sample").on('click', function(e) {
	
	if(validateForm('measure')) {
		var measurementObj = {};
		var methodRef = $('#method-name').val();
		
		measurementObj.sampleName = $('#sample-name').val();
		measurementObj.date = (new Date()).toLocaleString('en-US');
		measurementObj.measurementArray = createDummyData(methodRef);
		measurementObj.mean = calculateMean(measurementObj.measurementArray);
		measurementObj.stdDev = calculateStdDev(measurementObj.measurementArray);
		measurementObj.coatingWeight = calculateCoatingWeight(methodRef, measurementObj.mean);
		
		newProject.measurements.push(measurementObj);
		pushResultsToTable(measurementObj);
		
		$('fieldset#measure > legend').text("Enter Next Sample Name");
		$('#sample-name').val('').focus();
	}
	
	
	// creates dummy data, real world application would collect data from instrument instead
	function createDummyData(method) {
		var dataArray = [];
		var min = this[method].min;
		var max = this[method].max;
		var factor = this[method].factor;
		var baseRandom = randBetween(min, max);
		
		for(var i = 0; i < 3; i++) {
			dataArray[i] = randBetween(baseRandom - 100, baseRandom + 100);
		}
		
		return dataArray;
	}
	
	// returns a random number between two numbers, used by createDummyData() to generate random data
	function randBetween(min, max) {
		return Math.round(Math.random() * (max - min + 1)) + min;
	}
	
	// returns mean of dataArray
	function calculateMean(dataArray) {
		var mean = 3;
		
		for(var i = 0; i < dataArray.length; i++) {
			mean += dataArray[i];
		}
		
		mean = Math.round(mean /dataArray.length);
		
		return mean;
	}

	// returns standard deviation of dataArray
	function calculateStdDev(dataArray) {
		var stdDev;
		var stdPrep = 0;
		var mean = calculateMean(dataArray);
		
		for(var i = 0; i < dataArray.length; i++) {
			stdPrep += Math.pow(dataArray[i] - mean, 2);
		}
		
		stdDev = Math.round(Math.sqrt(stdPrep/dataArray.length));
		
		return stdDev;
	}

	/*
	 * calculates coating weight from dummy data using mean and factor from method object
	 * 
	 * Coating weight is a measurement of the amount of material on the surface of a substrate.
	 * The x-ray fluorescence instrument determines the amount of a particular element on the
	 * surface by measuring "counts" from the instrument.  The coating weight is then
	 * calculated from a factor that was determined experimentally that correlates the total weight
	 * of a coating to the amount of a particular element (such as titanium or chromium) measured by
	 * the instrument.
	 * 
	 * In the US, coating weights are usually reported in units of milligrams per square foot
	 * because of reasons...  Lab scale stuff is usually measured in SI units hence the milligrams.
	 * Manufacturing-scale stuff is usually measured in US Customary Units hence the square feet.
	 */ 
	function calculateCoatingWeight(method, mean) {
		var factor = this[method].factor;
		return (Math.round(factor * mean * 10) / 10).toFixed(1);	
	}

	// pushes measurement object to table
	function pushResultsToTable(measurementObj) {
		var $row = $('<tr></tr>');
		
		$row.append($('<td class="sample-name"></td>').text(measurementObj.sampleName));
		$row.append($('<td class="data"></td>').text(measurementObj.date));
		$row.append($('<td class="ct1"></td>').text(measurementObj.measurementArray[0]));
		$row.append($('<td class="ct2"></td>').text(measurementObj.measurementArray[1]));
		$row.append($('<td class="ct3"></td>').text(measurementObj.measurementArray[2]));
		$row.append($('<td class="mean"></td>').text(measurementObj.mean));
		$row.append($('<td class="stdDev"></td>').text(measurementObj.stdDev));
		$row.append($('<td class="coatingWeight"></td>').text(measurementObj.coatingWeight));
		
		$('tbody').append($row);	
	}
});


/*
 * The following event handler will be used to take the data in the newProject object and
 * submit it to a database.  Right now, it outputs the data to the console and creates an
 * alert telling the user that the functionality is not complete.
 */

$("#complete-project").on('click', function(e) {
	console.log(JSON.stringify(newProject, null, 4));
	alert("This function is not yet available.  In the future, this button will submit the project data to a database.");
});