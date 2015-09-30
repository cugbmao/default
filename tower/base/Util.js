(function($,win,undefined){
	$.Util = {
		/* 数据请求公共方法
		*	params:
		*		data: 请求参数  
		*			url: 请求路径
		*			showLoading: 是否显示progress bar, true or false
		*			success: 成功回调函数
		*			error: 失败回调函数
		*		dc: datacenter数据对象
		*/	
		requestData: function(data, dc){
			var progressbar = $('<div style="display:none;"><div class="progress-label"><img src="'+ Constant.WEBPATH +'/pages/base/images/ajax-loader.gif">Loading...</div></div>');
			$("body").append(progressbar);
			try{
				$.ajax({
	                url: data.url,
	                type: 'POST',
	                data: typeof(dc)=="undefined" ? {} : {"requestDc": JSON.stringify(dc)},
	                timeout: 8000,
	                beforeSend: function(XMLHttpRequest){
	                	if(typeof(data.showLoading) == "undefined" || data.showLoading == true){
	                		progressbar.show();
	                	}
	                },
	                success: function(result){
	                	data.success(result);
	                },
	                error: function(err){
	                	data.error(err);
	                },
	                complete: function(XMLHttpRequest, textStatus){
	                	//关闭加载提示
	                	progressbar.hide();
	                }
	            });
			} catch(e){
				//关闭加载提示
				progressbar.hide();
			}
		},
		/* 表单数据自动绑定
		 * 
		 */
		formBinding: function(formId, row){
			var $input = $("#" + formId).find("input");
			var $combox = $("#" + formId).find("select");
			
			$input.each(function(index, obj){
				var $obj = $(obj);
				//转换代码值
				var store = $obj.attr("store");
				var value = (row == null || typeof(row) == "undefined") ? "" : row[$obj.attr("name")];
				if(store!=null){
					var ds = window.base.codelist[store].rowSet.primary;
					for(var i=0; i<ds.length; i++){
						var code = ds[i];
						if(value == code.CODE_VALUE){
							value = code.CODE_NAME;
							break;
						}
					}
				}
				$obj.val(value);
			});
			$combox.each(function(index, obj){
				var $obj = $(obj);
				//转换代码值
				var store = $obj.attr("store");
				var value = (row == null || typeof(row) == "undefined") ? "" : row[$obj.attr("name")];
				if(store!=null){
					var ds = window.base.codelist[store].rowSet.primary;
					$obj.empty();
					for(var i=0; i<ds.length; i++){
						var code = ds[i];
						$obj.append("<option value='" + code.CODE_VALUE + "'>" + code.CODE_NAME +  "</option>"); 
						if(value == code.CODE_VALUE){
							$obj.val(value);
						}
					}
				}
				$obj.val(value);
			});
		},
		/* 收集表单数据
		 * 
		 */
		collectData: function(formId){
			var row = {};
			
			var $input = $("#" + formId).find("input");
			var $combox = $("#" + formId).find("select");
			$input.each(function(index, obj){
				var $obj = $(obj);
				row[$obj.attr("name")] = $obj.val();
			});
			$combox.each(function(index, obj){
				var $obj = $(obj);
				row[$obj.attr("name")] = $obj.val();
			});
			return JSON.stringify(row);
		},
		/* 校验表单数据
		 * 
		 */
		checkValid: function(formId){
			var returnVal = {bValid:true, message:""};
    		
    		var $input = $("#" + formId).find("input");
			$input.each(function(index, obj){
				var $obj = $(obj);
				var pattern = $obj.attr("pattern");
				var minLength, maxLength;
					
				if(typeof($obj.attr("minlength"))!="undefined"){
					minLength = parseInt($obj.attr("minlength"));
					returnVal.bValid = $obj.val().length >= minLength;
					if(!returnVal.bValid){
						returnVal.message = $obj.attr("name") + "Field Length Must>=" + minLength;
						return false;
					}
				}
				if(typeof($obj.attr("maxlength"))!="undefined"){
					maxLength = parseInt($obj.attr("maxlength"));
					returnVal.bValid = $obj.val().length <= maxLength;
					if(!returnVal.bValid){
						returnVal.message = $obj.attr("name") + "Field Length Must<=" + maxLength;
						return false;
					}
				}
				if(typeof(pattern)!="undefined"){
					returnVal.bValid = new RegExp(pattern).test($obj.val());
					if(!returnVal.bValid){
						returnVal.message = $obj.attr("name") + " " + $obj.attr("message");
						return false;
					}
				}
			});
			return returnVal;
		},
		/* 表格数据自动绑定
		 * 
		 */
		gridBinding: function(gridId, store){
			var $header = $("#" + gridId + "Header").children(".gridHeader");
			var innerHtml = "";
			$(store.rowSet.primary).each(function(rowIndex, row){
				innerHtml += "<div id=\"" + rowIndex + "\" class=\"gridRow\">";
				innerHtml += "<table cellspacing=0 cellpadding=0><tr>";
				$header.each(function(index, header){
					for(var key in row){
						if(key == header.id){
							innerHtml += "<td class=\"gridColumn\" style=\"width:" + header.style.width + "\">";
							//转换代码值
							var store = $(header).attr("store");
							var value = row[key];
							if(store!=""){
								var ds = window.base.codelist[store].rowSet.primary;
								for(var i=0; i<ds.length; i++){
									var code = ds[i];
									if(value == code.CODE_VALUE){
										value = code.CODE_NAME;
										break;
									}
								}
							}
							
							innerHtml += value;
							innerHtml += "</td>";
						}
					}
				});
				innerHtml += "</tr></table>";
				innerHtml += "</div>";
			});
			$("#" + gridId + "Content").html(innerHtml);
		},
		/* 获取表格绑定的数据源
		 * 
		 */
		getBinding: function(gridId){
			var binding = eval("(" + $("#" + gridId).attr("binding") + ")");
			var store = dataCenter.getBody().getDataStore(binding.store);
			return store;
		},
		/* 分页页码处理函数
		 * 
		 */
		onBeforePage: function(btnIndex, binding){
			var dataStore = dataCenter.getBody().getDataStore(binding.store);
			var maxPageNo = Math.ceil(dataStore.recordCount/dataStore.pageSize);
			var pageNo = dataCenter.getBody().getDataStore(binding.store).pageNo;
			switch(btnIndex){
			case 0:
				dataStore.pageNo = 1;
				break;
			case 1:
				if(pageNo < maxPageNo){
					dataStore.pageNo += 1;
				}
				break;
			case -1:
				if(pageNo > 1){
					dataStore.pageNo -= 1;
				}
				break;
			case 2:
				dataStore.pageNo = maxPageNo;
				break;
			}
		},
		drawAnim: function(canvasId, array, duration, callback){
			var canvas = document.getElementById(canvasId);
			canvas.width = $(window).width();  
			canvas.height = $(window).height();
			var context = canvas.getContext("2d");
			var imgIndex = 0;
			var interval = setInterval(function(){
				if(imgIndex < array.length){
					var img = array[imgIndex];
//					img.src = array.source[array.current];
					img.width=canvas.width;
					img.height=canvas.height;
					context.drawImage(img, 0, 0, canvas.width, canvas.height);
					imgIndex++;
				} else {
					clearInterval(interval);
					context.clearRect(0, 0, canvas.width, canvas.height);
					if(typeof callback == "function"){
						callback();
					}
				}
			}, duration);
		},
		getSize: function(){
			if(window.screen.height <= 960){
				return "640x854";
			} else if(window.screen.height > 960 && window.screen.height <= 1136){
				return "640x1010";
			} else if(window.screen.height > 1136 && window.screen.height <= 1280){
				return "800x1138";
			} else if(window.screen.height > 1280){
				return "1080x1707";
			}
		}
	};
})(jQuery,window);

/** 分页工具栏点击事件
 * 
 */
$(document).delegate(".pagingToolbar a", "click", function(evt){
	var binding = eval("("+$(".grid").attr("binding")+")");
	var dataStore = dataCenter.getBody().getDataStore(binding.store);
	window.pageUtil.load(dataStore.pageNo);
	evt.stopPropagation();
    evt.preventDefault();
});