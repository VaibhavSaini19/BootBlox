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

	// ----------------------------------     Code Preview     -----------------------------------------
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
		$("#copy-btn").toggleClass("d-none");
		ele.toggleClass("active");
		showHideCode(ele);
	})

	var codeCopytext;

	function showHideCode(ele){
		let iframe = $("#blocks-iframe");
		let codeDiv = $("#blocks-code");
		let pre = document.querySelector('pre');
		if(ele.hasClass("active")){
			let srcCode = iframe.contents().find("section").get(0).outerHTML;
			// console.log(srcCode);
			codeCopytext = srcCode;
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

	// ----------------------------------     Copy Button     -----------------------------------------	
	$("#copy-btn").on("click", (e) => {
		// console.log(codeCopytext);
		$("#copy-btn").html("<span>Copied!</span>");
		let textArea = document.createElement("textarea");
		textArea.value = codeCopytext;
		document.body.appendChild(textArea);
		textArea.select();
		document.execCommand("Copy");
		textArea.remove();
		setTimeout(() => {
			$("#copy-btn").html('<i class="fas fa-copy"></i>&nbsp; <span>Copy</span>');
		}, 1000);
	})

	// ----------------------------------     Theme selector     -----------------------------------------
	let prevColor = "primary";
	$(`.btn-theme-sel.btn-${prevColor}`).addClass("active");
	$(".btn-theme-sel").on("click", (e) => {
		let newThemeBtn = e.target;
		$(".btn-theme-sel").not(newThemeBtn).removeClass("active");
		$(newThemeBtn).addClass("active");
		let newColor = $(newThemeBtn).attr("data-color");
		$("iframe").contents().find(`.btn-${prevColor}`).each((idx, ele) => {
			$(ele).removeClass(`btn-${prevColor}`).addClass(`btn-${newColor}`);
		})
		$("iframe").contents().find(`.btn-outline-${prevColor}`).each((idx, ele) => {
			$(ele).removeClass(`btn-outline-${prevColor}`).addClass(`btn-outline-${newColor}`);
		})
		prevColor = newColor;
	});

	// ----------------------------------     Device selector     -----------------------------------------
	let ele = $("[data-device='desktop']");
	let widthMap = {
		"desktop" : "1200px",
		"tablet" : "768px",
		"mobile" : "375px"
	}
	ele.removeClass("text-muted");
	$(".btn-device-sel").on("click", (e) => {
		let targetDevice = $(e.target).attr("data-device");
		$(`.btn-device-sel:not([data-device='${targetDevice}'])`).addClass("text-muted");
		$(`.btn-device-sel[data-device='${targetDevice}']`).removeClass("text-muted");
		let newWidth = widthMap[targetDevice];
		$("iframe").width(newWidth);
	})
});
