jQuery(document).ready(function(){
	Galleria.loadTheme('/galleria/themes/fullscreen/galleria.fullscreen.min.js');
	Galleria.run('.galleria', {
		//15 min// autoplay: 900000,
		autoplay: 7000,
		fullscreenTransition: 'fade',
		transitionSpeed:3000,
		showImagenav: false
	});
});
