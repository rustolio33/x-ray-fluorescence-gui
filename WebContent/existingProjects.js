var url = 'http://localhost:8080/X-Ray_Fluorescence/data.json';
var j = [];

$.ajax({
  type: 'GET',
  url: url,
  dataType: 'json',
  success: function(data) { j = data;},
  async: false
});

alert(j[0].projectNumber);

var items = [];
$.each( j[0], function( key, val ) {
items.push( "<li id='" + key + "'>" + val + "</li>" );
  });
 
  $( "<ul/>", {
"class": "my-new-list",
html: items.join( "" )
  }).appendTo( "body" );