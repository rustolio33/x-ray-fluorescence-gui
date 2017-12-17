/*
 * This function disables html5 validation, so custom validation can be used.
 */
(function () {
	document.forms.register.noValidate = true;  //disables HTML5 validation to use Javascript
}());
	

/*
 * This function is adapted from the validation file provided by the book on page 605.
 * Some things were eliminated, added, or changed to work for this application.
 * 
 * The function provides validation of the required form elements of the fieldset that is passed
 * into the function.  If the validation passes, the function returns true.  If not,
 * error messages are generated and the function returns false.
 */
function validateForm(fieldset) {
	var form = document.getElementById(fieldset);
	var elements = form.elements;
	var valid = {};
	var isValid;
	var isFormValid;
	
	var i;
	for(i = 0, l = elements.length; i < l; i++) {
		isValid = validateRequired(elements[i]) && validateTypes(elements[i]);
		
		if(!isValid) {
			showErrorMessage(elements[i]);
		}
		else {
			removeErrorMessage(elements[i]);
		}
		valid[elements[i].id] = isValid;
	}
	
	if(!validateUserInitials()) {
		showErrorMessage(document.getElementById('user-initials'));
	}
	else {
		removeErrorMessage(document.getElementById('user-initials'));
	}
	
	// did the form pass validation?
	
	for(var field in valid) {
		if(!valid[field]) {
			isFormValid = false;
			break;
		}
		isFormValid = true;
	}
	
	// if form is not valid, prevent it from being submitted
	return isFormValid;
	
}

/*
 * helper function for validate() to set error message for required fields
 */
function validateRequired(el) {
	if(isRequired(el)) {
		var valid = !isEmpty(el);
		if(!valid) {
			setErrorMessage(el, 'Field is required');
		}
		return valid;
	}
	return true;
}

/*
 * helper function to check if field is required for form
 */
function isRequired(el) {
	return ((typeof el.required === 'boolean') && el.required) || (typeof el.required === 'string');
}

/*
 * helper function to check if field is empty
 */
function isEmpty(el) {
	return !el.value || el.value === el.placeholder || el.selectedIndex === 0;
}

/*
 * helper function to validate data types for fields
 */
function validateTypes(el) {
	if(!el.value) return true;
	
	var type = $(el).data('type') || el.getAttribute('type');
	if(typeof validateType[type] === 'function') {
		return validateType[type](el);
	}
	else {
		return true;
	}
}

/*
 * validates user initals
 */
function validateUserInitials() {
	var userInitials = document.getElementById('user-initials');
	var length = userInitials.value.length;
	var valid = length <= 3 && length > 1;
	if(!valid) {
		setErrorMessage(userInitials, 'Please limit initials to two or three letters');
	}
	return valid;
}

// functions to set, get, show, and remove error messages
function setErrorMessage(el, message) {
	$(el).data('errorMessage', message);
}

function getErrorMessage(el) {
	return $(el).data('errorMessage') || el.title;
}

function showErrorMessage(el) {
	var $el = $(el);
	var errorContainer = $el.siblings('.error.message');
	
	if(!errorContainer.length) {
		errorContainer = $('<span class="error message"></span>').insertAfter($el);
	}
	errorContainer.text(getErrorMessage(el));
}

function removeErrorMessage(el) {
	var errorContainer = $(el).siblings('.error.message');
	errorContainer.remove();
}



// object for checking data types
var validateType = {
	number: function (el) {
		var valid = /\b\d{5}\b/g.test(el.value);
		if(!valid) {
			setErrorMessage(el, 'Please enter a 5 digit project number');
		}
		return valid;
	}
};

