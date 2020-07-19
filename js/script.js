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
		let iframe = $("#blocks-iframe");
		iframe.fadeOut(200, () => {
			iframe.attr("src", newSrc);
			iframe.fadeIn(200);
		});
		let previewBtn = $("#code-preview");
		previewBtn.removeClass("active");
		showHideCode(previewBtn);
	})

	$("#blocks-code").hide();
	$("#code-preview").on("click", (e) => {
		let ele = $(e.target);
		ele.toggleClass("active");
		showHideCode(ele);
	})

	function showHideCode(ele){
		let iframe = $("#blocks-iframe");
		let codeDiv = $("#blocks-code");
		let pre = document.querySelector('pre');
		if(ele.hasClass("active")){
			let srcCode = iframe.contents().find("section").get(0).outerHTML;
			// console.log(srcCode);
			var mapObj = {
				"<":"&lt;",
				">":"&gt;",
				"&":"&amp;"
			 };
			srcCode = srcCode.replace(/\<|\>|&/gi, function(matched){
				return mapObj[matched];
			});
			// console.log(srcCode);
			iframe.fadeOut(100, () => {
				codeDiv.find("code").html(srcCode);
				ele.find("span").html("Preview");
				ele.find("i.fas").removeClass("fa-code").addClass("fa-eye");
				codeDiv.fadeIn(100);	
				document.querySelectorAll('pre code').forEach((block) => {
					hljs.highlightBlock(block);
				});
				let num = pre.innerHTML.split(/\n/).length;
				let line_num = pre.getElementsByTagName('span')[0];
				line_num.innerHTML = "";
				for (let j = 0; j < num; j++) {
					line_num.innerHTML += '<span>' + (j + 1) + '</span>';
				}
			});
		}else{
			codeDiv.fadeOut(100, () => {
				ele.find("span").html("View Code");
				ele.find("i.fas").removeClass("fa-eye").addClass("fa-code");
				iframe.fadeIn(100);
			});
		}
	}
});
