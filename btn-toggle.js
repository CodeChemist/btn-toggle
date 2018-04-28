/**
 *	JavaScript for btn-toggle
 *
 *	@author		Chris Finley
 *	@version	1.0.1
 *	@date		2018-04-27
 *	@requires	jquery 1.7+
 */

 // requires jquery
$(document).ready(function()
{
	// set initial values, defaults to off unless has .on class
	$('.btn-toggle').attr({ value: 0 });
	$('.btn-toggle.on').attr({ value: 1 });
		
	// register click event handler
	$(document).on('click', '.btn-toggle', function()
	{
		// parse the current value and use modulus to toggle between 0 and 1
		// trigger change event to fire an event handler to respond to value change
		// using .attr(value) because .val() does not work on non-input elements like tr, td, li, etc
		$(this).attr({ value: ( parseInt( $(this).attr('value') ) + 1 ) % 2 }).trigger('change');
	});
});