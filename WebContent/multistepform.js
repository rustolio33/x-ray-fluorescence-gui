var newProject = {};

$("#next").on('click', function(e) {	
	
	if(validateForm('start-project')) {
		var current_fs = $(this).parent().parent();
		var next_fs = $(this).parent().parent().next();

		newProject.projectNumber = $('#project-number').val();
		newProject.customerName = $('#customer-name').val();
		newProject.methodName = $('#method-name').val();
		newProject.substrate = $('#substrate').val();
		newProject.userInitials = $('#user-initials').val();
		newProject.measurements = [];
				
		current_fs.hide();
		next_fs.show();
	}
	
});

$("#measure-sample").on('click', function(e) {
	
	if(validateForm('measure')) {
		var measurementObj = {};
		
		measurementObj.sampleName = $('#sample-name').val();
		measurementObj.date = new Date();
		measurementObj.measurementArray = [3454, 3567, 3673];
		measurementObj.mean = 3452;
		measurementObj.stdDev = 45;
		
		newProject.measurements.push(measurementObj);
	}
});