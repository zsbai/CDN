function iOSVersion() {
	var match = (navigator.appVersion).split('OS ');
	if (match.length > 1) {
		return match[1].split(' ')[0].split('_').join('.');
	}
	return false;
}
//检测是不是在cydia里打开
function loadPackageInfo() {
	if (navigator.userAgent.search(/Cydia/) == -1) {
		$("#showAddRepo_").show();
		$("#showAddRepoUrl_").show();
	}
    //检测地址栏由description.html?id=分为两部分
	var urlSelfParts = window.location.href.split('cydia.html?id=');
	//前部分加 msxq/ 加后部分
	var form_url = urlSelfParts[0]+"msxq/"+urlSelfParts[1];
	$.ajax({
		url: form_url,
		type: "GET",
		cache: false,
		crossDomain: true,
		success: function (returnhtml) {
			//隐藏“加载描述文件中”
			$("#tweakStatusInfo").hide();
			var decodeResp = eval('('+returnhtml+')');
			//展示插件名字
			if(decodeResp.name) {
				document.title = decodeResp.name;
				$("#name").html(decodeResp.name);
				$("#name").show();
			}
			//展示描述
			if(decodeResp.desc_short) {
				//将描述文件转入html
				$("#desc_short").html(decodeResp.desc_short);
				//展示
				$("#desc_short_").show();
			}
			//版本 
           if(decodeResp.desc_version) {
           $("#vision").html(decodeResp.desc_version);
           //$("#version_").show();
           }
			if(decodeResp.warning) {
				$("#warning").html(decodeResp.warning);
				$("#warning_").show();
			}
			//历史版本
			if(decodeResp.desc_version) {
				$("#desc_version").html(decodeResp.desc_version);
				$("#desc_version_").show();
			}
			//作者名字
			if(decodeResp.author) {
				$("#author").html(decodeResp.author);
			}
			//更新时间
			if(decodeResp.updatetime) {
				$("#updatetime").html(decodeResp.updatetime);
			}
			//支持版本
			if(decodeResp.compatitle) {
				$("#compatitle").html(decodeResp.compatitle);
				$("#compatitle_").show();
				//检测系统型号
				var ios_ver = iOSVersion();
				if(ios_ver) {
					$("#your_ios").show();
					$("#your_ios").html("您的系统为 "+ios_ver);
				}
			}
			//更新记录
			if(decodeResp.changelog) {
				$("#changelog").html(decodeResp.changelog);
				$("#changelog_").show();
			}
			//屏幕截图
			if(decodeResp.screenshot) {
				$("#screenshot").html(decodeResp.screenshot);
				$("#screenshot_").show();
			}
			//不知道干啥
			if(decodeResp.open == true) {
				$("#is_open_source_").show();
			}
			
		},
		//报错提示 id后面
		error: function (err) {
			$("#errorInfo").html("<strong>请联系管理员上传描述文件</strong><br>缺少相关文件<br>"+urlSelfParts[1]);
		}
	});
}
//不知道有啥用
function loadRecentUpdates() {
	var form_url = window.location.protocol+"//"+window.location.hostname+"/last.updates";
	$.ajax({
		url: form_url,
		type: "GET",
		cache: false,
		crossDomain: true,
		success: function (returnhtml) {
			var decodeResp = eval('('+returnhtml+')');
			var htmlnews = "";
			for (var dicNow in decodeResp) {
				var urlOpen = "cydia://package/"+decodeResp[dicNow].package;
				if (navigator.userAgent.search(/Cydia/) == -1) {
					urlOpen = window.location.protocol+"//"+window.location.hostname+"/description.html?id="+decodeResp[dicNow].package;
				}
				htmlnews +=  "<li><a href='"+urlOpen+"' target='_blank'><img class='icon' src='tweak.png'/><label>"+decodeResp[dicNow].name+" v"+decodeResp[dicNow].version+"</label></a></li>";
			}
			$("#updates").html(htmlnews);
			$("#updates_").show();			
        },
		error: function (err) {
			$("#updates_").hide();	
		}
	});
}
