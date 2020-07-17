$(document).ready(function() {
	$('.overlay').on('click', function () {
		$('#sidebar').removeClass('active');
		$('.overlay').removeClass('active');
	});

	$('#sidebarCollapse').on('click', function () {
		$('#sidebar').toggleClass('active');
		$('.overlay').toggleClass('active');
		$('.collapse.in').toggleClass('in');
		$('a[aria-expanded=true]').attr('aria-expanded', 'false');
	});

	$("#sidebar .nav .nav-link").on("click", (e) => {
		let ele = e.target.closest("a");
		let type = $(ele).attr("data-block-type");
		let num = $(ele).attr("data-block-num");
		let newSrc = `../blocks/${type}/${type}_${num}.html`;
		let iframe = $("#blocks-container iframe");
		iframe.fadeOut(200, () => {
			iframe.attr("src", newSrc);
			iframe.fadeIn(200);
		});
	})
});
