//var url = 'http://localhost:8080/X-Ray_Fluorescence/data.json';
var url = 'https://raw.githubusercontent.com/rustolio33/x-ray-fluorescence-gui/master/WebContent/data.json'
var j = [];

$.ajax({
  type: 'GET',
  url: url,
  dataType: 'json',
  success: function(data) { j = data;},
  async: false
});

$.each(j, function (i, element) {
	var items = [];
	
	$.each(element, function( key, val ) {
		items.push( "<td class='" + key + "'>" + val + "</td>" );		
	});
	 
	var tableRow = $( "<tr/>", {
		"class": "project-line",
		html: items.join( "" )
	});
	
	var rowForResultsTable = $("<tr></tr>").addClass("results");
	var cellForResultsTable = $("<td></td>").attr('colspan', 5).attr('class', 'results-cell');
	var resultsTable = $("<table></table>");
	var resultsTableHead = $("<thead>" +
			"<tr>" +
				"<th>Sample Name</th>" +
				"<th>Date/Time</th>" +
				"<th>Average Count</th>" +
				"<th>Standard Deviation</th>" +
				"<th>Coating Weight (mg/ft<sup>2</sup>)</th>" +
			"</tr>" +
			"</thead>");
	$(resultsTableHead).attr('id','measurements-table-head');
	
	var resultsTableBody = $("<tbody></tbody>").addClass("measurementTableBody");
	
	resultsTableHead.appendTo(resultsTable);
	
	$.each(element.measurements, function(i, measurementElement) {
		var measurementItems = [];
		
		$.each(measurementElement, function(key, val) {
			
			// need to remove this if statement once database is set up
			if(key === "coatingWeight") {
				val = val.toFixed(1);
			}
			measurementItems.push("<td class='" + key + "'>" + val + "</td>)");
		});
		
		var measurementTableRow = $("<tr/>", {
			"class" : "measurement-line",
			html : measurementItems.join("")
		});
		
		measurementTableRow.appendTo(resultsTableBody);
	});
	
	resultsTableBody.appendTo(resultsTable);
	
	resultsTable.appendTo(cellForResultsTable);
	cellForResultsTable.appendTo(rowForResultsTable);
	
	tableRow.appendTo( "tbody#project-table-body" );
	rowForResultsTable.appendTo("tbody#project-table-body");
});

$('.project-table').on('click', '.project-line', function(e) {
	e.preventDefault();
	$(this)
		.next('.results')
		.not(':animated')
		.slideToggle();
});