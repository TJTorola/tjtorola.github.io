$(function() {
	$(".menu-link").click(function(e) {
		e.preventDefault();
		$("#portfolio").toggleClass("open");
		$(".menu").toggleClass("open");
	});
});
