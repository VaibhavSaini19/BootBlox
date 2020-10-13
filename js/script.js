$(() => {
	// ----------------------------------     Create Sidebar links     -----------------------------------------
	let blocks = {
		Blog: 3,
		Contact: 2,
		Feature: 1,
		Footer: 1,
		Gallery: 1,
		Header: 1,
		Hero: 2,
		pricing:2
	};

	let navContent = "";
	Object.entries(blocks).forEach(([block, types], index) => {
		navContent += `<div class="block-type ${index ? "mt-3" : ""}">${block}</div>`;
		for (let num = 1; num <= types; num++) {
			navContent += `
			<a class="nav-link ${
				!index && num == 1 ? "active" : ""
			}" id="blocks-${block.toLowerCase()}-${num}-link" data-block-type="${block.toLowerCase()}" data-block-num="${num}" data-toggle="pill" role="tab">
				<li class="block-thumb">
					<img src="./assets/thumbs/thumb_temp.PNG" alt="">
				</li>
			</a>
			`;
		}
	});
	// console.log(navContent);
	$("#blocks-tab").html(navContent);

	// ----------------------------------     Create Advance Color Palette     -----------------------------------------

	advColors = ["blue", "indigo", "purple", "pink", "red", "orange", "yellow", "green", "teal", "cyan"];

	let paletteContent = ''
	for(color of advColors){
		paletteContent += '<li class="d-flex justify-content-around align-items-center px-1">';
		for(let colorShade=100; colorShade<=900; colorShade+=100){
			paletteContent += `<div class="p-0 m-0"><button data-color="${color}-${colorShade}" class="btn btn-${color}-${colorShade} btn-theme-sel ptr-events-none"><i class="fas"></i></button></div>`;
		}
		paletteContent += '</li>';
	}
	paletteContent += `
		<li><hr class="my-2"></li>
		<li>
			<span class="px-2 dropdown-item-text">
				<small>
					<b>Note:</b> This color palette requires some extra stuff. 
					<span><a href="https://github.com/VaibhavSaini19/BootBlox#">Read more here</a></span>
				</small>
			</span>
		</li>
	`;
	$('#adv-color-palette').html(paletteContent);

	// ----------------------------------     Sidebar collapse     -----------------------------------------

	$("#sidebarCollapse").on("click", function () {
		$("#sidebar").toggleClass("active");
		$(".overlay").toggleClass("active");
		$(".collapse.in").toggleClass("in");
		$("a[aria-expanded=true]").attr("aria-expanded", "false");
	});

	// ----------------------------------     Iframe src & Code Preview     -----------------------------------------

	let fadeDelay = 200;
	let previewBtn = $("#code-preview");

	$("#sidebar .nav .nav-link").on("click", (e) => {
		let ele = e.target.closest("a");
		let type = $(ele).attr("data-block-type");
		let num = $(ele).attr("data-block-num");
		let newSrc = `./blocks/${type}/${type}_${num}.html`;
		let iframe = $("#blocks-iframe");
		iframe.animate({ opacity: 0 }, fadeDelay, () => {
			iframe.attr("src", newSrc);
			setTimeout(() => {
				showHideCode();
				updateTheme();
				previewBtn.removeClass("active");
				setTimeout(() => {
					iframe.animate({ opacity: 1 }, fadeDelay);
				}, fadeDelay);
			}, fadeDelay * 2);
		});
	});

	$("#blocks-code").hide();
	$("#code-preview").on("click", (e) => {
		$("#copy-btn").toggleClass("d-none");
		$("#device-sel-container").toggleClass("d-none");
		previewBtn.toggleClass("active");
		showHideCode();
	});

	var codeCopytext;

	function showHideCode(reset = false) {
		let iframe = $("#blocks-iframe");
		let codeDiv = $("#blocks-code");
		let pre = document.querySelector("pre");
		if (previewBtn.hasClass("active") && !reset) {
			$(`.device-svg`).addClass("d-none");
			let srcCode = iframe.contents().find("section").get(0).outerHTML;
			// console.log(srcCode);
			codeCopytext = srcCode;
			var mapObj = {
				"<": "&lt;",
				">": "&gt;",
				"&": "&amp;",
			};
			srcCode = srcCode.replace(/\<|\>|&/gi, function (matched) {
				return mapObj[matched];
			});
			// console.log(srcCode);
			iframe.fadeOut(100, () => {
				codeDiv.find("code").html(srcCode);
				previewBtn.find("span").html("Preview");
				previewBtn.find("i.fas").removeClass("fa-code").addClass("fa-eye");
				codeDiv.fadeIn(100);
				document.querySelectorAll("pre code").forEach((block) => {
					hljs.highlightBlock(block);
				});
				let num = pre.innerHTML.split(/\n/).length;
				let line_num = pre.getElementsByTagName("span")[0];
				line_num.innerHTML = "";
				for (let j = 0; j < num; j++) {
					line_num.innerHTML += "<span>" + (j + 1) + "</span>";
				}
			});
		} else {
			if (targetDevice != "desktop") {
				$(`#${targetDevice}-svg`).removeClass("d-none");
			}
			previewBtn.removeClass("active");
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
	});

	// ----------------------------------     Theme selector     -----------------------------------------

	let baseColor = "primary",
		prevColor = "primary",
		newColor = "primary";
	let defaultColors = ["primary", "secondary", "success", "danger", "warning", "info"];
	let newThemeBtn;
	$(`.btn-theme-sel.btn-${prevColor}`).addClass("active");
	$(".btn-theme-sel").on("click", (e) => {
		newThemeBtn = e.target;
		$(".btn-theme-sel").not(newThemeBtn).removeClass("active");
		$(newThemeBtn).addClass("active");
		newColor = $(newThemeBtn).attr("data-color") || newColor;
		updateTheme();
		$("#copy-btn").addClass("d-none");
		$("#device-sel-container").removeClass("d-none");
		showHideCode((reset = true));
	});

	function updateTheme() {
		$("#blocks-iframe")
			.contents()
			.find(
				`.btn-${prevColor}, .btn-${baseColor}, .btn-outline-${prevColor}, .btn-outline-${baseColor},
			.bg-${prevColor}, .bg-${baseColor},
			.text-${prevColor}, .text-${baseColor}`
			)
			.each((idx, tag) => {
				let ele = $(tag);
				if (ele.hasClass(`btn-${prevColor}`) || ele.hasClass(`btn-${baseColor}`)) {
					ele.removeClass(`btn-${prevColor} btn-${baseColor}`);
					ele.addClass(`btn-${newColor}`);
				} else if (ele.hasClass(`btn-outline-${prevColor}`) || ele.hasClass(`btn-outline-${baseColor}`)) {
					ele.removeClass(`btn-outline-${prevColor} btn-outline-${baseColor}`);
					ele.addClass(`btn-outline-${newColor}`);
				} else if (ele.hasClass(`bg-${prevColor}`) || ele.hasClass(`bg-${baseColor}`)) {
					ele.removeClass(`bg-${prevColor} bg-${baseColor}`);
					ele.addClass(`bg-${newColor}`);
				} else {
					ele.removeClass(`text-${prevColor} text-${baseColor}`);
					ele.addClass(`text-${newColor}`);
				}
			});
		prevColor = newColor;
	}

	// ----------------------------------     Device selector     -----------------------------------------

	let targetDevice;
	let ele = $("[data-device='desktop']");
	let widthMap = {
		desktop: "100%",
		tablet: "768px",
		mobile: "375px",
	};
	let heightMap = {
		tablet: "1024px",
		mobile: "730px",
	};
	ele.removeClass("text-muted");
	$(".btn-device-sel").on("click", (e) => {
		targetDevice = $(e.target).attr("data-device");
		if (targetDevice != "desktop") {
			$(`#${targetDevice}-svg`).removeClass("d-none");
		}
		$(`.device-svg:not(#${targetDevice}-svg)`).addClass("d-none");
		$(`.btn-device-sel:not([data-device='${targetDevice}'])`).addClass("text-muted");
		$(`.btn-device-sel[data-device='${targetDevice}']`).removeClass("text-muted");
		let newWidth = widthMap[targetDevice];
		let newHeight = heightMap[targetDevice] ? heightMap[targetDevice] : "100%";
		$("#blocks-iframe").css({
			width: newWidth,
			height: newHeight,
		});
	});
});
