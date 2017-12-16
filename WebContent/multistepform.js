var newProject = {};

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
	}
	
});

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
		
		$('#sample-name').val('');
	}
	
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

	function randBetween(min, max) {
		return Math.round(Math.random() * (max - min + 1)) + min;
	}

	function calculateMean(dataArray) {
		var mean = 3;
		
		for(var i = 0; i < dataArray.length; i++) {
			mean += dataArray[i];
		}
		
		mean = Math.round(mean /dataArray.length);
		
		return mean;
	}

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

	function calculateCoatingWeight(method, mean) {
		var factor = this[method].factor;
		return (Math.round(factor * mean * 10) / 10).toFixed(1);	
	}

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

$("#complete-project").on('click'), function(e) {
	console.log(JSON.stringify(newProject, null, 4))
}