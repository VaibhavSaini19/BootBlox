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
		if(ele.hasClass("active")){
			// let srcCode = iframe.contents()[0];
			let srcCode = iframe.contents().find("section")[0].outerHTML;
			srcCode = srcCode.replace(/[\u00A0-\u9999<>\&]/gim, (i) => {
				return '&#'+i.charCodeAt(0)+';';
			});
			// console.log(srcCode);
			iframe.fadeOut(100, () => {
				codeDiv.find("code").html(srcCode);
				ele.find("span").html("Preview");
				ele.find("i.fas").removeClass("fa-code").addClass("fa-eye");
				codeDiv.fadeIn(100);	
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
