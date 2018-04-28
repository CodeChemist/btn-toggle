/**
 *	JavaScript for btn-toggle
 *
 *	@author		Chris Finley
 *	@version	1.1.0
 *	@date		2018-04-27
 *	@requires	jquery 1.7+
 */

 // requires jquery to be loaded
$(document).ready(function()
{
	// set initial values, defaults to off unless element has .on class
	$('.btn-toggle').attr({ value: 0 });
	$('.btn-toggle.on').attr({ value: 1 });
		
	// register click event handler
	$(document).on('click', '.btn-toggle', function()
	{
		// parse the current value and use modulus to toggle between 0 and 1
		// trigger change event to fire an event handler to respond to value change
		// using .attr(value) because .val() does not work on non-input elements like tr, td, li, etc
		$(this).attr({ value: ( parseInt( $(this).attr('value') ) + 1 ) % 2 });
		
		// if button is a parent controlling a toggle_group, toggle the children in the toggle_group
		if($(this).hasClass('btn-toggle-parent'))
			btnToggleChildren($(this));
		
		// if button is a child button in a toggle_group, toggle the status of the controlling parent
		if(typeof $(this).attr('toggle_group') != typeof undefined && $(this).attr('toggle_group') != false)
			btnToggleParent($(this));
		
		// trigger change after parent/child calls, so that if the element is in a toggle_group
		// changes to other parent or children will have happened prior to change being called.
		$(this).trigger('change');
	});
});

/**
 *	Toggle the status of children when a parent is clicked
 *	
 *	@param	jQuery obejct	parent				Parent toggle element
 */
function btnToggleChildren(toggle_parent)
{
	// get all buttons in the toggle_group
	$('.btn-toggle[toggle_group="' + $(toggle_parent).attr('toggle_group') + '"]')
	
	// exclude the parent to get just the children
	.not('.btn-toggle-parent')
	
	// set the child value to match the parent value
	.attr({ value: $(toggle_parent).attr('value')});
}

/**
 *	Toggle the status of parent when a child is clicked
 */
function btnToggleParent(toggle_child)
{
	// get name of toggle_group
	var group		= $(toggle_child).attr('toggle_group');

	// get all child buttons in the same toggle_group
	var allButtons	= $('.btn-toggle[toggle_group="' + group + '"]').not('.btn-toggle-parent');

	// get just the unchecked buttons in the toggle_group
	var unchecked	= allButtons.not('[value="1"]');
	
	// toggle_group parent button
	var parent		= $('.btn-toggle-parent[toggle_group="' + group + '"]');
	
	// all buttons are checked, show on status
	if(unchecked.length == 0)
		parent.attr({value: 1}).removeClass('partial');
		
	// no buttons are checked, show off status
	else if(unchecked.length == allButtons.length)
		parent.attr({value: 0}).removeClass('partial');
		
	// not all buttons are complete on or off, show partial status
	else
		parent.attr({value: 0}).addClass('partial');
}