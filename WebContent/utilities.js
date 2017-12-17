/*
 *  Helper function to add an event listener.  This is copied directly from the files 
 *  in the book (page 571)
 */

function addEvent(ev, event, callback) {
	if('addEventListener' in ev) {
		ev. addEventListener(event, callback, false);
	}
	else {
		ev['e' + event + callback] = callback;
		ev[event + callback] = function () {
			ev['e' + event + callback](window.event);
		};
		ev.attachEvent('on' + event, el[event + callback]);
	}
}

// Helper function to remove an event listener

function remvoveEvent(ev, event, callback) {
	if('removeEventListener' in ev) {
		ev.removeEventListener(event, callback, false);
	}
	else {
		ev.detachEvent('on' + event, ev[event + callback]);
		ev[event + callback] = null;
		ev['e' + event + callback] = null;
	}
}