// From http://www.javascriptkit.com/javatutors/requestanimationframe.shtml
// ensures availability of requestAnimationFrame function for smooth animation rendering

window.requestAnimationFrame = window.requestAnimationFrame
	|| window.mozRequestAnimationFrame
	|| window.webkitRequestAnimationFrame
	|| window.msRequestAnimationFrame
	|| function(f) { return setTimeout( f, 1000/60 ) }
