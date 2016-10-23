$(function() {
	const toggleMenu = function(e) {
		e.preventDefault();
		$("#portfolio").toggleClass("open");
		$(".menu").toggleClass("open");
	};

	$(".menu-link").click(toggleMenu);
	$(".menu-title").click(toggleMenu);
});
