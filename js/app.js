$(document).ready(function() {

	url = "http://spottd.herokuapp.com/images/all";

	/* * * * * * * * * * * * * * *
	*
	*  Creating Gallery Modals
	*
	* * * * * * * * * * * * * * */

	console.log("Bout to play");	
    $.ajax({		
        url: "http://spottd.herokuapp.com/images/all",
        dataType: 'jsonp',
        type: "GET",
        success: function(data) {
        	console.log("In data");
	    	console.log(data);		
	    	for (var i = 0; i < 24; i++) {		
	    		if (i%4 == 0) {		
	    			if (i != 0) $('.gallery').append('</div>');
	    			$('.gallery').append('<div class="row">');			
	    		}				
	    		console.log(String(data[i].s3Url));

	    		var $item_div = $('<div class="col-lg-3" data-content="' + formatDate(data[i].createdAt) + '"></div>');	
	    		var $item_image = $('<img src="' + data[i].s3Url + '" onerror="imgError(this);" />');
	    		$item_div.append($item_image);	
	    		$('.row:last').append($item_div);	
	    	}		
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
        	console.log(textStatus);
        	console.log(errorThrown);
        	console.log("there was an error ");
        }		
    });		
});

function imgError(image) {
	image.closest('div').remove();
	image.remove();
	console.log("img error");
}

function formatDate(dateString) {
	var date = new Date(dateString);
	var hours = (date.getHours() == 0) ? 1 : date.getHours();
	var mins = (date.getMinutes() > 9) ? date.getMinutes() : '0' + date.getMinutes();
	var am_or_pm = (hours > 12) ? ' pm' : ' am';
	return hours%13 + ':' + mins + am_or_pm;
}