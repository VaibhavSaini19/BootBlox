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


	let fadeDelay = 200;

	// ----------------------------------     Iframe src & Code Preview     -----------------------------------------
	let previewBtn = $("#code-preview");

	$("#sidebar .nav .nav-link").on("click", (e) => {
		let ele = e.target.closest("a");
		let type = $(ele).attr("data-block-type");
		let num = $(ele).attr("data-block-num");
		let newSrc = `../blocks/${type}/${type}_${num}.html`;
		let iframe = $("#blocks-iframe");
		iframe.fadeOut(fadeDelay, () => {
			iframe.attr("src", newSrc);
			setTimeout(() => {
				previewBtn.removeClass("active");
				showHideCode();
				updateTheme();
				iframe.fadeIn(fadeDelay);
			}, 100);
		});
	})

	
	$("#blocks-code").hide();
	$("#code-preview").on("click", (e) => {
		$("#copy-btn").toggleClass("d-none");
		$("#device-sel-container").toggleClass("d-none");
		previewBtn.toggleClass("active");
		showHideCode();
	})

	var codeCopytext;

	function showHideCode(reset=false){
		let iframe = $("#blocks-iframe");
		let codeDiv = $("#blocks-code");
		let pre = document.querySelector('pre');
		if(previewBtn.hasClass("active") && !reset){
			$(`.device-svg`).addClass("d-none");
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
				previewBtn.find("span").html("Preview");
				previewBtn.find("i.fas").removeClass("fa-code").addClass("fa-eye");
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
			if (targetDevice != "desktop"){
				$(`#${targetDevice}-svg`).removeClass("d-none");
			}
			previewBtn.removeClass("active")
			codeDiv.fadeOut(100, () => {
				previewBtn.find("span").html("View Code");
				previewBtn.find("i.fas").removeClass("fa-eye").addClass("fa-code");
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
			$("#copy-btn").html('<i class="fas fa-copy"></i>&nbsp; <span>Copy source code</span>');
		}, 1000);
	})

	// ----------------------------------     Theme selector     -----------------------------------------
	let baseColor = "primary", prevColor = "primary", newColor = "primary";
	let newThemeBtn;
	$(`.btn-theme-sel.btn-${prevColor}`).addClass("active");
	$(".btn-theme-sel").on("click", (e) => {
		newThemeBtn = e.target;
		$(".btn-theme-sel").not(newThemeBtn).removeClass("active");
		$(newThemeBtn).addClass("active");
		newColor = $(newThemeBtn).attr("data-color") || newColor;
		updateTheme();
		showHideCode(true);
	});

	function updateTheme(){
		$("#blocks-iframe").contents().find(`.btn-${prevColor}, .btn-${baseColor}`).each((idx, ele) => {
			$(ele).removeClass(`btn-${prevColor} btn-primary`).addClass(`btn-${newColor}`);
		})
		prevColor = newColor;
	}

	// ----------------------------------     Device selector     -----------------------------------------
	let targetDevice;
	let ele = $("[data-device='desktop']");
	let widthMap = {
		"desktop" : "1200px",
		"tablet" : "768px",
		"mobile" : "375px"
	}
	let heightMap = {
		"tablet" : "1024px",
		"mobile" : "730px"
	}
	ele.removeClass("text-muted");
	$(".btn-device-sel").on("click", (e) => {
		targetDevice = $(e.target).attr("data-device");
		if (targetDevice != "desktop"){
			$(`#${targetDevice}-svg`).removeClass("d-none");
		}
		$(`.device-svg:not(#${targetDevice}-svg)`).addClass("d-none");
		$(`.btn-device-sel:not([data-device='${targetDevice}'])`).addClass("text-muted");
		$(`.btn-device-sel[data-device='${targetDevice}']`).removeClass("text-muted");
		let newWidth = widthMap[targetDevice];
		let newHeight = heightMap[targetDevice] ? heightMap[targetDevice] : "100%";
		$("#blocks-iframe").css({
			"width": newWidth,
			"height": newHeight
		});
	})
});
