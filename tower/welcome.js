

function stopPlay(){
var audio = document.getElementById("bgm");
	if(!audio.paused){
		audio.pause();
$("#playcontrol").removeClass("playcontrol").addClass("playcontrolpause");
	}
}

function playAudio(){
var audio = document.getElementById("bgm");
	if(audio.paused){
		audio.play();
$("#playcontrol").removeClass("playcontrolpause").addClass("playcontrol");
	}
}

function controlplaying(){
var audio = document.getElementById("bgm");
if(audio.paused){
	audio.play();
$("#playcontrol").removeClass("playcontrolpause").addClass("playcontrol");
}else{
audio.pause();
$("#playcontrol").removeClass("playcontrol").addClass("playcontrolpause");
}
}

(function($, win, undefined){
	win.WelcomePage = {
		imgArray: new Array(),
		welcomeArray: [],
		dayNightArray: [],
		naviArray:[],
		gifArray:[],
		otherImageArray:[],
//		imgArray: {},
		init: function(){

			this.render();
			this.bindEvents();
		},
		bindEvents: function(){
			var self = this;
			$(".welcome").show();
//			setTimeout(function(){
//				$(".welcome").fadeOut(0);
//				$(".pointing").fadeIn(0);
//			}, 200);
//			$(document).delegate("#tower_mask1", "swipe", function(evt){
//				$("#tower_mask1").fadeOut(500);
//				$("#tower_mask2").fadeIn(500);
//				evt.stopPropagation();
//				evt.preventDefault();
//			});
//			$(document).delegate("#tower_mask2", "swipe", function(evt){
//				$("#tower_mask2").fadeOut(500);
//				$("#tower_mask3").fadeIn(500);
//				evt.stopPropagation();
//				evt.preventDefault();
//			});
//			$(document).delegate("#tower_mask3", "swipe", function(evt){
//				$("#tower_mask3").fadeOut(500);
//				$("#tower_mask4").fadeIn(500);
//				evt.stopPropagation();
//				evt.preventDefault();
//			});
			$(document).delegate("#pointing", "vmousedown", function(evt){
				$("#handL2R").hide();
				$("#pointing").fadeOut(500);
//				$("#pointing").css({display: "none"});
				$("#tower_mask1").fadeIn(500);
				
				setTimeout(function(){
					$("#tower_mask1").fadeOut(500);
					$("#tower_mask2").fadeIn(500);
				}, 700);
				
				setTimeout(function(){
					$("#tower_mask2").fadeOut(500);
					$("#tower_mask3").fadeIn(500);
				}, 1400);
				
				setTimeout(function(){
					$("#tower_mask3").fadeOut(500);
					$("#tower_mask4").fadeIn(500);
				}, 2100);
				
//				var towerImgArray = [];
//				for(var i = 3; i < 6; i++){
//					var tempImg = new Image();
//					var size = $.Util.getSize();
//					tempImg.src = "./images/" + size + "/0" + i + ".jpg";
//					towerImgArray.push(tempImg);
//				}
//				$.Util.drawAnim("welcome",towerImgArray,500,function(){
////					$("#tower").remove();
////					$.mobile.changePage("#IndexPage");
//					$("#tower_mask4").fadeIn(500);
//				});
				
				evt.stopPropagation();
				evt.preventDefault();
			});
//			$(document).delegate("#tower_mask1", "swipe", function(evt){
//				$("#tower_mask1").fadeOut(500);
//				$("#tower_mask2").fadeIn(500);
//				evt.stopPropagation();
//				evt.preventDefault();
//			});
//			$(document).delegate("#tower_mask2", "swipe", function(evt){
//				$("#tower_mask2").fadeOut(500);
//				$("#tower_mask3").fadeIn(500);
//				evt.stopPropagation();
//				evt.preventDefault();
//			});
//			$(document).delegate("#tower_mask3", "swipe", function(evt){
//				$("#tower_mask3").fadeOut(500);
//				$("#tower_mask4").fadeIn(500);
//				evt.stopPropagation();
//				evt.preventDefault();
//			});
			$.mobile.activePage.delegate("#tower_mask4", "vclick", function(evt){
				$("#tower_mask4").hide();
				var imgDom = document.getElementById('tower');
				var page = $.mobile.activePage;
				var headerHeight = page.find(":jqmData(role='header')").outerHeight();
				var mainHeight = $(window).height() - headerHeight;
        		imgDom.height = mainHeight;
        		imgDom.width = window.screen.width;
        		imgDom.style.position = "absolute";
        		imgDom.style.top = "0px";
				$.Util.drawAnim("tower",self.imgArray,200,function(){
//					$("#tower").remove();
					$.mobile.changePage("#IndexPage");
				});
				evt.stopPropagation();
				evt.preventDefault();
			});
		},
		preloadImg: function(callback){
			var the_images = [];

			$("img").each(function(){
				the_images.push(this);
			});
			the_images = the_images.concat(this.imgArray);
			the_images = the_images.concat(this.welcomeArray);
			the_images = the_images.concat(this.dayNightArray);
			//the_images = the_images.concat(this.naviArray);
			the_images = the_images.concat(this.gifArray);
			the_images = the_images.concat(this.otherImageArray);
			
var audio = document.getElementById("bgm");
var audioready = false;

			var imgNum = 0;
			$("#status").progressbar();   
			var tempImageArray = [].concat(the_images);
			jQuery.imgpreload(the_images,
			{
				each: function()
				{
					var status = $(this).data('loaded') ? 'success' : 'error';
		            if (status == "success") {                
		                var v = (parseFloat(++imgNum)*100 / the_images.length).toFixed(2);
		                $("#status").progressbar('value',Math.round(v)); 
		                $("#status span").text("正在加载 " + Math.round(v) + "%/100%");
		            }else {
		            	var v = (parseFloat(++imgNum)*100 / the_images.length).toFixed(2);
		                $("#status").progressbar('value',Math.round(v)); 
		                $("#status span").text("正在加载 " + Math.round(v) + "%/100%");
		            }
					for(var t = 0; t < tempImageArray.length;t++){
						if(tempImageArray[t] == this){
							tempImageArray.splice(t,1);
break;
						}
					}
				},
				all: function()
				{
//					 $("#status").progressbar('value',100);  
					$('#status').css('display','none');
					$('#welcomeContent').css('display','block');
					if(typeof callback == "function"){
						callback();
					}
				}
			});
		},
		render: function(data){
			var self = this;
			//设置页面高度
			var page = $.mobile.activePage;
			var headerHeight = page.find(":jqmData(role='header')").outerHeight();
			var mainHeight = $(window).height() - headerHeight;
			$("#pointing").css({height: mainHeight, top: headerHeight, left: 0});
			$("#tower_mask1").css({height: mainHeight, top: headerHeight, left: 0});
			$("#tower_mask2").css({height: mainHeight, top: headerHeight, left: 0});
			$("#tower_mask3").css({height: mainHeight, top: headerHeight, left: 0});
			$("#tower_mask4").css({height: mainHeight, top: headerHeight, left: 0});
			var relativeHeight = window.screen.height;
			if(window.devicePixelRatio != undefined && window.devicePixelRatio != null){
				relativeHeight = relativeHeight * window.devicePixelRatio;
			}
			
			var sizeOfCss = "1080x1707";
			if(relativeHeight <= 960){
				sizeOfCss = "640x854";
			} else if(relativeHeight > 960 && relativeHeight <= 1136){
				sizeOfCss = "640x1010";
			} else if(relativeHeight > 1136 && relativeHeight <= 1280){
				sizeOfCss = "800x1138";
			} else if(relativeHeight > 1280){
				sizeOfCss = "1080x1707";
			}
			
			// 为统一样式选择添加 开始
			var oCss = document.createElement("link"); 
	        oCss.setAttribute("rel", "stylesheet"); 
	        oCss.setAttribute("type", "text/css");  
	        oCss.setAttribute("href", "./css/" + sizeOfCss +".css");
	        document.getElementsByTagName("head")[0].appendChild(oCss);//绑定
	        
			$("#bigmapImg").attr("src", "./images/" + sizeOfCss +"/21.jpg");
			for(var i =  1; i <= 28; i++){
				var element = new Image();
				element.src = "./images/" + sizeOfCss +"/01_" + i + ".jpg";
				this.welcomeArray.push(element);
			}
			for(var imgC = 1; imgC <= 7; imgC++){
				var imgArrayElement = new Image();
				imgArrayElement.src = './images/' + sizeOfCss +'/07_' + imgC + '.jpg';
				this.imgArray.push(imgArrayElement); 
			}
			var imgArray02 = new Image();
			imgArray02.src = './images/' + sizeOfCss +'/02.jpg';
			this.otherImageArray.push(imgArray02);
			
			for(var imgC = 1; imgC <= 6; imgC++){
				var imgArrayElement = new Image();
				imgArrayElement.src = './images/' + sizeOfCss +'/35_' + imgC + '.jpg';
				this.dayNightArray.push(imgArrayElement); 
			}
			var imgArrayElement = new Image();
			imgArrayElement.src = './images/' + sizeOfCss +'/08.jpg';
			this.dayNightArray.push(imgArrayElement); 
			var imgArrayElement = new Image();
			imgArrayElement.src = './images/' + sizeOfCss +'/34.jpg';
			this.dayNightArray.push(imgArrayElement);
			
				// 加入导航三联页及光标首页的图片
			for(var naviStart = 10; naviStart <= 18; naviStart = naviStart + 2){
				// 酒店不加载
				if(naviStart == 12){
					continue;
				}
				var naviArrayElement = new Image();
				naviArrayElement.src = './images/' + sizeOfCss + '/' + naviStart + '.jpg';
				this.naviArray.push(naviArrayElement);
				for(var naviCounter = 1; naviCounter <= 3; naviCounter++){
					var naviArrayElement = new Image();
					naviArrayElement.src = './images/' + sizeOfCss + '/' + naviStart + '_' + naviCounter + '.jpg';
					this.naviArray.push(naviArrayElement);
				}
			}
			// 为统一样式选择添加 结束
			var gifArrayElement02 = new Image();
			gifArrayElement02.src = './images/gif-icons/02.gif';
			this.gifArray.push(gifArrayElement02);
			
			$("#handL2R").attr("src", "./images/gif-icons/02.gif");
			this.preloadImg(function(){
playAudio();
				var imgDom = document.getElementById('welcome');
			//	var page = $.mobile.activePage;
			//	var headerHeight = page.find(":jqmData(role='header')").outerHeight();
			//	var mainHeight = $(window).height() - headerHeight;
        		//imgDom.height = mainHeight;
        		//imgDom.width = window.screen.width;
        		imgDom.style.position = "absolute";
        		imgDom.style.top = "0px";
        		$("#pointing").css({display: "none"});
        		$().css({display: "none"});
				$.Util.drawAnim("welcome",self.welcomeArray,200,function(){
//					$("#pointing").css({display: "block"});
//					$("#tower_mask1").css({display: "block"});
//					$("#tower_mask2").css({display: "block"});
//					$("#tower_mask3").css({display: "block"});
//					$("#tower_mask4").css({display: "block"});
//					setTimeout(function(){
						$(".welcome").fadeOut(0);
						$(".pointing").fadeIn(0);
//					}, 200);
					$("#handL2R").css({display: "block"});
				});
			});
			
		},
		renderTpl: function(id, data){
			return $(id).render(data);
		},
		pageChg: function( toPage, options ){
			
		},
		destroy: function(){
			$.mobile.activePage.undelegate();
			$(document).undelegate();
		}
	};
})(jQuery, window);

(function($, win, undefined){
	win.IndexPage = {
		init: function(){
			this.render();
			this.bindEvents();
		},
		bindEvents: function(){
			var self = this;
			$.mobile.activePage.delegate(".circle", "vclick", function(evt){
				$(".liner_r2l, .liner_l2r,.span").css({"display": "none"});
				if(this.id == "circle1"){
					$("#tower1").show(500);
				} else if(this.id == "circle2"){
					$("#tower2").show(500);
				} else if(this.id == "circle3"){
					$("#tower3").show(500);
				} else if(this.id == "circle4"){
					$("#tower4").show(500);
				} else if(this.id == "circle5"){
					$("#tower5").show(500);
				}
				evt.stopPropagation();
				evt.preventDefault();
			});
			$.mobile.activePage.delegate("#tower1", "vclick", function(evt){
				$("#part2").removeClass("part1_2").removeClass("part2_2").removeClass("part3_2").removeClass("part4_2").removeClass("part5_2");
				$("#part2").addClass("part1_2");
				$(".circle,.view360,.phone,#tip,.liner_r2l,.liner_l2r,#shake").hide();
				$.mobile.changePage("#Part2Page?index=1", {transition: "fadeIn"});
				evt.stopPropagation();
				evt.preventDefault();
			});
			$.mobile.activePage.delegate("#tower2", "vclick", function(evt){
				$("#part2").removeClass("part1_2").removeClass("part2_2").removeClass("part3_2").removeClass("part4_2").removeClass("part5_2");
				$("#part2").addClass("part2_2");
				$(".circle,.view360,.phone,#tip,.liner_r2l,.liner_l2r,#shake").hide();
				$.mobile.changePage("#Part2Page?index=2", {transition: "fadeIn"});
				evt.stopPropagation();
				evt.preventDefault();
			});
			$.mobile.activePage.delegate("#tower3", "vclick", function(evt){
				$("#part2").removeClass("part1_2").removeClass("part2_2").removeClass("part3_2").removeClass("part4_2").removeClass("part5_2");
				$("#part2").addClass("part3_2");
				$(".circle,.view360,.phone,#tip,.liner_r2l,.liner_l2r,#shake").hide();
				$.mobile.changePage("#Part2Page?index=3", {transition: "fadeIn"});
				evt.stopPropagation();
				evt.preventDefault();
			});
			$.mobile.activePage.delegate("#tower4", "vclick", function(evt){
				$("#part2").removeClass("part1_2").removeClass("part2_2").removeClass("part3_2").removeClass("part4_2").removeClass("part5_2");
				$("#part2").addClass("part4_2");
				$(".circle,#view360,#phone,#tip,.liner_r2l,.liner_l2r,#shake").hide();
				$.mobile.changePage("#Part2Page?index=4", {transition: "fadeIn"});
				evt.stopPropagation();
				evt.preventDefault();
			});
			$.mobile.activePage.delegate("#tower5", "vclick", function(evt){
				$("#part2").removeClass("part1_2").removeClass("part2_2").removeClass("part3_2").removeClass("part4_2").removeClass("part5_2");
				$("#part2").addClass("part5_2");
				$(".circle,#view360,#phone,#tip,.liner_r2l,.liner_l2r,#shake").hide();
				$.mobile.changePage("#Part2Page?index=5", {transition: "fadeIn"});
				evt.stopPropagation();
				evt.preventDefault();
			});
			//全景图
			$.mobile.activePage.delegate("#view360", "vclick", function(evt){
				$(".circle,#view360,#phone,#tip,.liner_r2l,.liner_l2r,#shake").hide();
//				var url = "http://a4.s1.gexia.com/SiteFiles/services/weixin/view360/index.html?publishmentSystemID=18320&view360ID=42&wxOpenID=";
				var url = "full360degree.html";
				window.location.href = url;
				//$.mobile.changePage(url, {transition: "none"});
				evt.stopPropagation();
				evt.preventDefault();
			});
			//图片上下切换
			$.mobile.activePage.delegate("#phone", "vclick", function(evt){
				self.toPic2();
				/*$.mobile.changePage("#ContactPage", {transition: "slideup"});*/
				evt.stopPropagation();
				evt.preventDefault();
			});
			$.mobile.activePage.delegate("#topback", "vclick", function(evt){
				self.toPic1();
				/*$.mobile.changePage("#ContactPage", {transition: "slideup"});*/
				evt.stopPropagation();
				evt.preventDefault();
			});
			//查看地图
			$.mobile.activePage.delegate( "#contact #viewmap", "click", function( evt ) {
				$.mobile.changePage("#SmallmapPage", {transition: "slideup"});
				$("#index").css({"height": $(window).height()+"px"});
				$("#contact").css({"height": "0px"});
				evt.stopPropagation();
				evt.preventDefault();
		    });
//摇一摇
			$.mobile.activePage.delegate( "#shake", "vclick", function( evt ) {
				var relativeHeight = window.screen.height;
    			if(window.devicePixelRatio != undefined && window.devicePixelRatio != null){
    				relativeHeight = relativeHeight * window.devicePixelRatio;
    			}
    			
    			var sizeOfCss = "1080x1707";
    			if(relativeHeight <= 960){
    				sizeOfCss = "640x854";
    			} else if(relativeHeight > 960 && relativeHeight <= 1136){
    				sizeOfCss = "640x1010";
    			} else if(relativeHeight > 1136 && relativeHeight <= 1280){
    				sizeOfCss = "800x1138";
    			} else if(relativeHeight > 1280){
    				sizeOfCss = "1080x1707";
    			}
				var page = $.mobile.activePage;
				var headerHeight = page.find(":jqmData(role='header')").outerHeight();
				var mainHeight = $(window).height() - headerHeight;
				if($("#index").hasClass("index_night")){
					var imgArray = new Array();
					for(var imgC = 6; imgC >= 1; imgC--){
						var imgArrayElement = new Image();
						imgArrayElement.src = './images/' + sizeOfCss + '/35_' + imgC + '.jpg';
						imgArray.push(imgArrayElement); 
					}
	        		$.Util.drawAnim("indexCanvas",imgArray,200,function(){
	        			$("#index").removeClass("index_night").addClass("index");
					});
            	} else {
    				var imgArray = new Array();
    				for(var imgC = 1; imgC <= 6; imgC++){
    					var imgArrayElement = new Image();
    					imgArrayElement.src = './images/' + sizeOfCss + '/35_' + imgC + '.jpg';
    					imgArray.push(imgArrayElement); 
    				}
            		$.Util.drawAnim("indexCanvas",imgArray,200,function(){
//            			$("#index").removeClass("index").addClass("index_night");
            			$("#index").removeClass("index").addClass("index_night");
//            			$("#index").attr("className","index_night");
    				});
            	}
		    });
			//摇一摇
			this.shake();
		},
		render: function(data){
			//设置页面高度
			var page = $.mobile.activePage;
			var headerHeight = page.find(":jqmData(role='header')").outerHeight();
			var mainHeight = $(window).height() - headerHeight;
			$("#contact").css({"height": "0px"});
			$("#index").css({height: mainHeight});
			$("#indexBackgroundGif").css({height: mainHeight, width: "100%"});
			$("#topback,#viewmap").hide();
			var relativeHeight = window.screen.height;
			if(window.devicePixelRatio != undefined && window.devicePixelRatio != null){
				relativeHeight = relativeHeight * window.devicePixelRatio;
			}
			var sizeOfCss = "1080x1707";
			if(relativeHeight <= 960){
				sizeOfCss = "640x854";
			} else if(relativeHeight > 960 && relativeHeight <= 1136){
				sizeOfCss = "640x1010";
			} else if(relativeHeight > 1136 && relativeHeight <= 1280){
				sizeOfCss = "800x1138";
			} else if(relativeHeight > 1280){
				sizeOfCss = "1080x1707";
			}
			
			// 为统一样式选择添加 开始
			if($("link[href = './css/" + sizeOfCss + ".css']").length < 1){
				var oCss = document.createElement("link"); 
		        oCss.setAttribute("rel", "stylesheet"); 
		        oCss.setAttribute("type", "text/css");  
		        oCss.setAttribute("href", "./css/" + sizeOfCss + ".css");
		        document.getElementsByTagName("head")[0].appendChild(oCss);//绑定
			}
			page.css('visibility','visible');
			$("#part2").css("visibility",'visible');
			// 为统一样式选择添加 结束
//			page.css('visibility','visible');
			$(".circle,#view360,#phone,#tip,#shake").show();
//			$(".circle,#view360,#phone,#tip,#shake").show();
//			setTimeout(function(){
//				page.css('visibility','visible');
//			},1000);
			
		},
		renderTpl: function(id, data){
			return $(id).render(data);
		},
		pageChg: function( toPage, options ){
			
		},
		destroy: function(){
			$.mobile.activePage.undelegate();
			window.removeEventListener('devicemotion');
		},
		toPic1: function(){
			$("#index").css({"height": $(window).height()+"px"});
			$("#contact").css({"height": "0px"});
			$("#topback,#viewmap").hide(500);
			setTimeout(function(){
				$(".circle,.view360,.phone,#tip,#shake").show(500);
			}, 1000);
		},
		toPic2: function(){
			$("#contact").css({"height": $(window).height()+"px"});
			$("#index").css({"height": "0px"});
			$(".circle,#view360,#phone,#tip,.liner_r2l,.liner_l2r,#shake").hide(500);
			$("#topback,#viewmap").show(500);
		},
		shake: function(){
			var SHAKE_THRESHOLD = 3000;
	        var last_update = 0;
	        var x = y = z = last_x = last_y = last_z = 0;
            if (window.DeviceMotionEvent) {
                window.addEventListener(
                	'devicemotion', 
                	function(eventData){
        	            var acceleration = eventData.accelerationIncludingGravity;
        	            var curTime = new Date().getTime();
        	            if ((curTime - last_update) > 100) {
        	                var diffTime = curTime - last_update;
        	                last_update = curTime;
        	                x = acceleration.x;
        	                y = acceleration.y;
        	                z = acceleration.z;
        	                var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;

        	                var relativeHeight = window.screen.height;
        	    			if(window.devicePixelRatio != undefined && window.devicePixelRatio != null){
        	    				relativeHeight = relativeHeight * window.devicePixelRatio;
        	    			}
        	    			
        	    			var sizeOfCss = "1080x1707";
        	    			if(relativeHeight <= 960){
        	    				sizeOfCss = "640x854";
        	    			} else if(relativeHeight > 960 && relativeHeight <= 1136){
        	    				sizeOfCss = "640x1010";
        	    			} else if(relativeHeight > 1136 && relativeHeight <= 1280){
        	    				sizeOfCss = "800x1138";
        	    			} else if(relativeHeight > 1280){
        	    				sizeOfCss = "1080x1707";
        	    			}
        	                
        	                if (speed > SHAKE_THRESHOLD) {
        	                	var page = $.mobile.activePage;
        	    				var headerHeight = page.find(":jqmData(role='header')").outerHeight();
        	    				var mainHeight = $(window).height() - headerHeight;
        	    				if($("#index").hasClass("index_night")){
        	    					var imgArray = new Array();
        	    					for(var imgC = 6; imgC >= 1; imgC--){
        	    						var imgArrayElement = new Image();
        	    						imgArrayElement.src = './images/' + sizeOfCss + '/35_' + imgC + '.jpg';
        	    						imgArray.push(imgArrayElement); 
        	    					}
        	    	        		$.Util.drawAnim("indexCanvas",imgArray,200,function(){
        	    	        			$("#index").removeClass("index_night").addClass("index");
        	    					});
        	                	} else {
        	        				var imgArray = new Array();
        	        				for(var imgC = 1; imgC <= 6; imgC++){
        	        					var imgArrayElement = new Image();
        	        					imgArrayElement.src = './images/' + sizeOfCss + '/35_' + imgC + '.jpg';
        	        					imgArray.push(imgArrayElement); 
        	        				}
        	                		$.Util.drawAnim("indexCanvas",imgArray,200,function(){
//        	                			$("#index").removeClass("index").addClass("index_night");
        	                			$("#index").removeClass("index").addClass("index_night");
//        	                			$("#index").attr("className","index_night");
        	        				});
        	                	}
        	                }
        	                last_x = x;
        	                last_y = y;
        	                last_z = z;
        	            }
                	}, false);
            } else {
                alert('not support mobile event');
            }
		}
	};
})(jQuery, window);

(function($, win, undefined){
	win.Part1Page = {
		index: 1,
		init: function(){
			this.render();
			this.bindEvents();
		},
		bindEvents: function(){
			var self = this;
			$.mobile.activePage.delegate( "#part1", "swipeleft", function( evt ) {
				$("#part1").removeClass("part1_1").removeClass("part2_1").removeClass("part3_1").removeClass("part4_1").removeClass("part5_1");
				$.mobile.changePage("#Part2Page?index="+self.index, {transition: "fadeIn"});
		    });
		},
		render: function(data){
			//设置页面高度
			var page = $.mobile.activePage;
			var headerHeight = page.find(":jqmData(role='header')").outerHeight();
			var mainHeight = $(window).height() - headerHeight;
			var relativeHeight = window.screen.height;
			if(window.devicePixelRatio != undefined && window.devicePixelRatio != null){
				relativeHeight = relativeHeight * window.devicePixelRatio;
			}
			
			var sizeOfCss = "1080x1707";
			if(relativeHeight <= 960){
				sizeOfCss = "640x854";
			} else if(relativeHeight > 960 && relativeHeight <= 1136){
				sizeOfCss = "640x1010";
			} else if(relativeHeight > 1136 && relativeHeight <= 1280){
				sizeOfCss = "800x1138";
			} else if(relativeHeight > 1280){
				sizeOfCss = "1080x1707";
			}
			
			// 为统一样式选择添加 开始
			if($("link[href = './css/" + sizeOfCss + ".css']").length < 1){
				var oCss = document.createElement("link"); 
		        oCss.setAttribute("rel", "stylesheet"); 
		        oCss.setAttribute("type", "text/css");  
		        oCss.setAttribute("href", "./css/" + sizeOfCss + ".css");
		        document.getElementsByTagName("head")[0].appendChild(oCss);//绑定
			}
			$("#part1").css({height: mainHeight, top: headerHeight, left: 0});
			$("#slideBox").addClass("show");
			page.css('visibility','visible');
		},
		renderTpl: function(id, data){
			return $(id).render(data);
		},
		pageChg: function( toPage, options ){
			if(typeof(options.pageData) != "undefined"){
				this.index = options.pageData.index;
				$("#part1").removeClass("part1_1").removeClass("part2_1").removeClass("part3_1").removeClass("part4_1").removeClass("part5_1").addClass("part"+this.index+"_1");
			}
		},
		destroy: function(){
			$.mobile.activePage.undelegate();
		}
	};
})(jQuery, window);

(function($, win, undefined){
	win.Part2Page = {
		index: 1,
		init: function(){
			this.render();
			this.bindEvents();
		},
		bindEvents: function(){
			var self = this;
			$.mobile.activePage.delegate( "#part2", "click", function( evt ) {
//				$("#part2").removeClass("part1_2").removeClass("part2_2").removeClass("part3_2").removeClass("part4_2").removeClass("part5_2");
//				$("#part2").css("visibility","hidden");
				$("#slideBox").removeClass("show");
				if(self.index == "1"){
					$.mobile.changePage("#Part1_1Page");
				} else if(self.index == "2"){
					$.mobile.changePage("#Part2_1Page");
				} else if(self.index == "3"){
					$.mobile.changePage("#Part3_1Page");
				}  else if(self.index == "4"){
					$.mobile.changePage("#Part4_1Page");
				}  else if(self.index == "5"){
					$.mobile.changePage("#Part5_1Page");
				}
		    });
			$.mobile.activePage.delegate( "#slideBox", "click", function( evt ) {
//				$("#part2").removeClass("part1_2").removeClass("part2_2").removeClass("part3_2").removeClass("part4_2").removeClass("part5_2");
				$("#slideBox").removeClass("show");
				$("#part2").css("visibility","hidden");
				if(self.index == "1"){
					$.mobile.changePage("#Part1_1Page");
				} else if(self.index == "2"){
					$.mobile.changePage("#Part2_1Page");
				} else if(self.index == "3"){
					$.mobile.changePage("#Part3_1Page");
				}  else if(self.index == "4"){
					$.mobile.changePage("#Part4_1Page");
				}  else if(self.index == "5"){
					$.mobile.changePage("#Part5_1Page");
				}    
		    });
		},
		render: function(data){
			//设置页面高度
			var page = $.mobile.activePage;
			var headerHeight = page.find(":jqmData(role='header')").outerHeight();
			var mainHeight = $(window).height() - headerHeight;
			$("#part2").css({height: mainHeight, top: headerHeight, left: 0});
			
			page.css('visibility','visible');
			$("#part2").css("visibility","visible");
		},
		renderTpl: function(id, data){
			return $(id).render(data);
		},
		pageChg: function( toPage, options ){
			if(typeof(options.pageData) != "undefined"){
				this.index = options.pageData.index;
//				$("#part2").removeClass("part1_2").removeClass("part2_2").removeClass("part3_2").removeClass("part4_2").removeClass("part5_2").addClass("part"+this.index+"_2");
				$("#part2").addClass("part"+this.index+"_2");
			}
		},
		destroy: function(){
//			$.mobile.activePage.undelegate();
			$("#part2").removeClass("part1_2").removeClass("part2_2").removeClass("part3_2").removeClass("part4_2").removeClass("part5_2");
		}
	};
})(jQuery, window);

(function($, win, undefined){
	win.ContactPage = {
		init: function(){
			this.render();
			this.bindEvents();
		},
		bindEvents: function(){
			$.mobile.activePage.delegate( ".topback", "click", function( evt ) {
				$.mobile.changePage("#IndexPage", {transition: "slidedown"});
		    });
		},
		render: function(data){
			//设置页面高度
			var page = $.mobile.activePage;
			var headerHeight = page.find(":jqmData(role='header')").outerHeight();
			var mainHeight = $(window).height() - headerHeight;
			$(".contact").css({height: mainHeight, width: $(window).width(), top: headerHeight, left: 0});
			page.css('visibility','visible');
		},
		renderTpl: function(id, data){
			return $(id).render(data);
		},
		pageChg: function( toPage, options ){
			
		},
		destroy: function(){
			$.mobile.activePage.undelegate();
		}
	};
})(jQuery, window);

(function($, win, undefined){
	win.SmallmapPage = {
		init: function(){
			this.render();
			this.bindEvents();
		},
		bindEvents: function(){
			$.mobile.activePage.delegate( "#mapTopback", "vclick", function( evt ) {
				$.mobile.changePage("#IndexPage", {transition: "pop"});
		    });
		},
		render: function(data){
			//设置页面高度
			var page = $.mobile.activePage;
			var headerHeight = page.find(":jqmData(role='header')").outerHeight();
			var mainHeight = $(window).height() - headerHeight;
			
			var relativeHeight = window.screen.height;
			if(window.devicePixelRatio != undefined && window.devicePixelRatio != null){
				relativeHeight = relativeHeight * window.devicePixelRatio;
			}
			
			var sizeOfCss = "1080x1707";
			if(relativeHeight <= 960){
				sizeOfCss = "640x854";
			} else if(relativeHeight > 960 && relativeHeight <= 1136){
				sizeOfCss = "640x1010";
			} else if(relativeHeight > 1136 && relativeHeight <= 1280){
				sizeOfCss = "800x1138";
			} else if(relativeHeight > 1280){
				sizeOfCss = "1080x1707";
			}
			
			// 为统一样式选择添加 开始
			if($("link[href = './css/" + sizeOfCss + ".css']").length < 1){
				var oCss = document.createElement("link"); 
		        oCss.setAttribute("rel", "stylesheet"); 
		        oCss.setAttribute("type", "text/css");  
		        oCss.setAttribute("href", "./css/" + sizeOfCss + ".css");
		        document.getElementsByTagName("head")[0].appendChild(oCss);//绑定
			}
			
			$(".smallmap").css({height: mainHeight, top: headerHeight, left: 0});
			page.css('visibility','visible');
		},
		renderTpl: function(id, data){
			return $(id).render(data);
		},
		pageChg: function( toPage, options ){
			
		},
		destroy: function(){
			$.mobile.activePage.undelegate();
		}
	};
})(jQuery, window);

var counter = 0;
(function($, win, undefined){
	win.Part1_1Page = {
		index: 1,
		init: function(){
			this.render();
			this.bindEvents();
		},
		bindEvents: function(){
			var self = this;
			$.mobile.activePage.delegate( ".bottom_back", "click", function( evt ) {
				$.mobile.changePage("#IndexPage", {transition: "slidedown"});
		    });
		},
		render: function(data){
			
			document.getElementById("Part1_1Page").innerHTML = '<div data-role="main" class="ui-content"><div class="bottom_back"></div><div class="container part_bottom" id="part1Slides"><div class="part_slide_picture11"></div><div class="part_slide_picture12"></div><div class="part_slide_picture13"></div></div></div>';
			
				//设置页面高度
				var page = $.mobile.activePage;
				var headerHeight = page.find(":jqmData(role='header')").outerHeight();
				var mainHeight = $(window).height() - headerHeight;
				
				var relativeHeight = window.screen.height;
				if(window.devicePixelRatio != undefined && window.devicePixelRatio != null){
					relativeHeight = relativeHeight * window.devicePixelRatio;
				}
				
				var sizeOfCss = "1080x1707";
				if(relativeHeight <= 960){
					sizeOfCss = "640x854";
				} else if(relativeHeight > 960 && relativeHeight <= 1136){
					sizeOfCss = "640x1010";
				} else if(relativeHeight > 1136 && relativeHeight <= 1280){
					sizeOfCss = "800x1138";
				} else if(relativeHeight > 1280){
					sizeOfCss = "1080x1707";
				}
				
				// 为统一样式选择添加 开始
				if($("link[href = './css/" + sizeOfCss + ".css']").length < 1){
					var oCss = document.createElement("link"); 
			        oCss.setAttribute("rel", "stylesheet"); 
			        oCss.setAttribute("type", "text/css");  
			        oCss.setAttribute("href", "./css/" + sizeOfCss + ".css");
			        document.getElementsByTagName("head")[0].appendChild(oCss);//绑定
				}
				$("#part1").css({height: mainHeight, top: 0, left: 0});
				$('#part1Slides').slidesjs({
			        width: window.screen.width,
			        height: mainHeight,
			        start:1,
			        play: {
			        	auto: true
			        }
			    });
				page.css('visibility','visible');
		},
		renderTpl: function(id, data){
			return $(id).render(data);
		},
		pageChg: function( toPage, options ){
			
		},
		destroy: function(){
			document.getElementById("Part1_1Page").innerHTML = "";
			$("#part2").addClass("part1_2");
			$.mobile.activePage.undelegate();
		}
	};
})(jQuery, window);

(function($, win, undefined){
	win.Part2_1Page = {
		index: 1,
		init: function(){
			this.render();
			this.bindEvents();
		},
		bindEvents: function(){
			var self = this;
			$.mobile.activePage.delegate( ".bottom_back", "click", function( evt ) {
				$.mobile.changePage("#IndexPage", {transition: "slidedown"});
		    });
		},
		render: function(data){
			document.getElementById("Part2_1Page").innerHTML = '<div data-role="main" class="ui-content"><div class="bottom_back"></div><div class="container part_bottom" id="part2Slides"><div class="part_slide_picture21"></div><div class="part_slide_picture22"></div><div class="part_slide_picture23"></div></div></div>';
			
			//设置页面高度
			var page = $.mobile.activePage;
			var headerHeight = page.find(":jqmData(role='header')").outerHeight();
			var mainHeight = $(window).height() - headerHeight;
			
			var relativeHeight = window.screen.height;
			if(window.devicePixelRatio != undefined && window.devicePixelRatio != null){
				relativeHeight = relativeHeight * window.devicePixelRatio;
			}
			
			var sizeOfCss = "1080x1707";
			if(relativeHeight <= 960){
				sizeOfCss = "640x854";
			} else if(relativeHeight > 960 && relativeHeight <= 1136){
				sizeOfCss = "640x1010";
			} else if(relativeHeight > 1136 && relativeHeight <= 1280){
				sizeOfCss = "800x1138";
			} else if(relativeHeight > 1280){
				sizeOfCss = "1080x1707";
			}
			
			// 为统一样式选择添加 开始
			if($("link[href = './css/" + sizeOfCss + ".css']").length < 1){
				var oCss = document.createElement("link"); 
		        oCss.setAttribute("rel", "stylesheet"); 
		        oCss.setAttribute("type", "text/css");  
		        oCss.setAttribute("href", "./css/" + sizeOfCss + ".css");
		        document.getElementsByTagName("head")[0].appendChild(oCss);//绑定
			}
			
			$("#part2").css({height: mainHeight, top: 0, left: 0});
			$('#part2Slides').slidesjs({
		        width: window.screen.width,
		        height: mainHeight,
		        play: {
		        	auto: true
		        }
		    });
			page.css('visibility','visible');
		},
		renderTpl: function(id, data){
			return $(id).render(data);
		},
		pageChg: function( toPage, options ){
			
		},
		destroy: function(){
			document.getElementById("Part2_1Page").innerHTML = "";
			$("#part2").addClass("part2_2");
			$.mobile.activePage.undelegate();
		}
	};
})(jQuery, window);

(function($, win, undefined){
	win.Part3_1Page = {
		index: 1,
		init: function(){
			this.render();
			this.bindEvents();
		},
		bindEvents: function(){
			var self = this;
			$.mobile.activePage.delegate( ".bottom_back", "click", function( evt ) {
				$.mobile.changePage("#IndexPage", {transition: "slidedown"});
		    });
		},
		render: function(data){
			document.getElementById("Part3_1Page").innerHTML = '<div data-role="main" class="ui-content"><div class="bottom_back"></div><div class="container part_bottom" id="part3Slides"><div class="part_slide_picture31"></div><div class="part_slide_picture32"></div><div class="part_slide_picture33"></div><div class="part_slide_picture34"></div></div></div>';
			//设置页面高度
			var page = $.mobile.activePage;
			var headerHeight = page.find(":jqmData(role='header')").outerHeight();
			var mainHeight = $(window).height() - headerHeight;
			
			var relativeHeight = window.screen.height;
			if(window.devicePixelRatio != undefined && window.devicePixelRatio != null){
				relativeHeight = relativeHeight * window.devicePixelRatio;
			}
			
			var sizeOfCss = "1080x1707";
			if(relativeHeight <= 960){
				sizeOfCss = "640x854";
			} else if(relativeHeight > 960 && relativeHeight <= 1136){
				sizeOfCss = "640x1010";
			} else if(relativeHeight > 1136 && relativeHeight <= 1280){
				sizeOfCss = "800x1138";
			} else if(relativeHeight > 1280){
				sizeOfCss = "1080x1707";
			}
			
			// 为统一样式选择添加 开始
			if($("link[href = './css/" + sizeOfCss + ".css']").length < 1){
				var oCss = document.createElement("link"); 
		        oCss.setAttribute("rel", "stylesheet"); 
		        oCss.setAttribute("type", "text/css");  
		        oCss.setAttribute("href", "./css/" + sizeOfCss + ".css");
		        document.getElementsByTagName("head")[0].appendChild(oCss);//绑定
			}
			
			$("#part3").css({height: mainHeight, top: 0, left: 0});
			$('#part3Slides').slidesjs({
		        width: window.screen.width,
		        height: mainHeight,
		        play: {
		        	auto: true
		        }
		    });
			page.css('visibility','visible');
		},
		renderTpl: function(id, data){
			return $(id).render(data);
		},
		pageChg: function( toPage, options ){
			
		},
		destroy: function(){
			document.getElementById("Part3_1Page").innerHTML = "";
			$("#part2").addClass("part3_2");
			$.mobile.activePage.undelegate();
		}
	};
})(jQuery, window);

(function($, win, undefined){
	win.Part4_1Page = {
		index: 1,
		init: function(){
			this.render();
			this.bindEvents();
		},
		bindEvents: function(){
			var self = this;
			$.mobile.activePage.delegate( ".bottom_back", "click", function( evt ) {
				$.mobile.changePage("#IndexPage", {transition: "slidedown"});
		    });
		},
		render: function(data){
			document.getElementById("Part4_1Page").innerHTML = '<div data-role="main" class="ui-content"><div class="bottom_back"></div><div class="container part_bottom" id="part4Slides"><div class="part_slide_picture41"></div><div class="part_slide_picture42"></div><div class="part_slide_picture43"></div><div class="part_slide_picture44"></div></div></div>';
			
			//设置页面高度
			var page = $.mobile.activePage;
			var headerHeight = page.find(":jqmData(role='header')").outerHeight();
			var mainHeight = $(window).height() - headerHeight;
			
			var relativeHeight = window.screen.height;
			if(window.devicePixelRatio != undefined && window.devicePixelRatio != null){
				relativeHeight = relativeHeight * window.devicePixelRatio;
			}
			
			var sizeOfCss = "1080x1707";
			if(relativeHeight <= 960){
				sizeOfCss = "640x854";
			} else if(relativeHeight > 960 && relativeHeight <= 1136){
				sizeOfCss = "640x1010";
			} else if(relativeHeight > 1136 && relativeHeight <= 1280){
				sizeOfCss = "800x1138";
			} else if(relativeHeight > 1280){
				sizeOfCss = "1080x1707";
			}
			
			// 为统一样式选择添加 开始
			if($("link[href = './css/" + sizeOfCss + ".css']").length < 1){
				var oCss = document.createElement("link"); 
		        oCss.setAttribute("rel", "stylesheet"); 
		        oCss.setAttribute("type", "text/css");  
		        oCss.setAttribute("href", "./css/" + sizeOfCss + ".css");
		        document.getElementsByTagName("head")[0].appendChild(oCss);//绑定
			}
			
			$("#part4").css({height: mainHeight, top: 0, left: 0});
			$('#part4Slides').slidesjs({
		        width: window.screen.width,
		        height: mainHeight,
		        play: {
		        	auto: true
		        }
		    });
			page.css('visibility','visible');
		},
		renderTpl: function(id, data){
			return $(id).render(data);
		},
		pageChg: function( toPage, options ){
			
		},
		destroy: function(){
			document.getElementById("Part4_1Page").innerHTML = "";
			$("#part2").addClass("part4_2");
			$.mobile.activePage.undelegate();
		}
	};
})(jQuery, window);

(function($, win, undefined){
	win.Part5_1Page = {
		index: 1,
		init: function(){
			this.render();
			this.bindEvents();
		},
		bindEvents: function(){
			var self = this;
			$.mobile.activePage.delegate( ".bottom_back", "click", function( evt ) {
				$.mobile.changePage("#IndexPage", {transition: "slidedown"});
		    });
		},
		render: function(data){
			document.getElementById("Part5_1Page").innerHTML = '<div data-role="main" class="ui-content"><div class="bottom_back"></div><div class="container part_bottom" id="part5Slides"><div class="part_slide_picture51"></div><div class="part_slide_picture52"></div><div class="part_slide_picture53"></div></div></div>';
			
			//设置页面高度
			var page = $.mobile.activePage;
			var headerHeight = page.find(":jqmData(role='header')").outerHeight();
			var mainHeight = $(window).height() - headerHeight;
			
			var relativeHeight = window.screen.height;
			if(window.devicePixelRatio != undefined && window.devicePixelRatio != null){
				relativeHeight = relativeHeight * window.devicePixelRatio;
			}
			
			var sizeOfCss = "1080x1707";
			if(relativeHeight <= 960){
				sizeOfCss = "640x854";
			} else if(relativeHeight > 960 && relativeHeight <= 1136){
				sizeOfCss = "640x1010";
			} else if(relativeHeight > 1136 && relativeHeight <= 1280){
				sizeOfCss = "800x1138";
			} else if(relativeHeight > 1280){
				sizeOfCss = "1080x1707";
			}
			
			// 为统一样式选择添加 开始
			if($("link[href = './css/" + sizeOfCss + ".css']").length < 1){
				var oCss = document.createElement("link"); 
		        oCss.setAttribute("rel", "stylesheet"); 
		        oCss.setAttribute("type", "text/css");  
		        oCss.setAttribute("href", "./css/" + sizeOfCss + ".css");
		        document.getElementsByTagName("head")[0].appendChild(oCss);//绑定
			}
			
			$("#part5").css({height: mainHeight, top: 0, left: 0});
			$('#part5Slides').slidesjs({
		        width: window.screen.width,
		        height: mainHeight,
		        play: {
		        	auto: true
		        }
		    });
			page.css('visibility','visible');
		},
		renderTpl: function(id, data){
			return $(id).render(data);
		},
		pageChg: function( toPage, options ){
			
		},
		destroy: function(){
			document.getElementById("Part5_1Page").innerHTML = "";
			$("#part2").addClass("part5_2");
			$.mobile.activePage.undelegate();
		}
	};
})(jQuery, window);