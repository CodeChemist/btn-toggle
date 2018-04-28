/**
 *	JavaScript for btn-toggle
 *
 *	@author		Chris Finley
 *	@version	1.0.0
 *	@date		2018-04-27
 *	@requires	jquery 1.7+
 */

 // requires jquery
$(document).ready(function()
{
	// register click event handler
	$(document).on('click', '.btn-toggle', function()
	{
		// parse the current value and use modulus to toggle between 0 and 1
		// trigger change event to fire an event handler to respond to value change
		$(this).val( ( parseInt( $(this).val() ) + 1 ) % 2 ).trigger('change');
	});
});