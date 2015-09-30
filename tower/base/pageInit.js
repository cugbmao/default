(function($,win,undefined){
	$( document ).bind( "mobileinit", function() {
	    // Make your jQuery Mobile framework configuration changes here!
	    $.mobile.allowCrossDomainPages = true;
	    $.mobile.page.prototype.options.domCache = true;
	    pageContainerElement.page({domCache:true});
	    $.mobile.defaultPageTransition = "none";
		$.support.cors = true;
		$.mobile.pushStateEnabled = false;
		$.mobile.ajaxEnabled = false;
		$.mobile.buttonMarkup.hoverDelay = 100;
		$.mobile.loadPage();
	});
	
	$(document).bind("pageshow pagehide", function(e) {
		var target = e.target,
			id = target.id,
			util = window[id];
		if(!util){
			return;
		}
		e.type==="pageshow" ? util.init&&util.init() : util.destroy&&util.destroy();
	});
	
	function getPageData(url){
		var pageData={},params=((url||"").replace(/^\?/,"").split(/&/)),obj,key,value;
		for(var i=0;i<params.length;i++){
			var param=params[i];
			if(param){
				obj=param.split(/=/);
				key=obj[0];
				value=obj[1];
				if(pageData[key]===undefined){
					pageData[key]=value;
				}else{
					if(typeof pageData[key]!=="object"){
						pageData[key]=[pageData[key]];
					}
					pageData[key].push(value);
				}
			}
		}
		return pageData;
	}
	
	$(document).bind("pagebeforechange",function(e,data){
		if(typeof data.toPage==="string"){
			var toPage=$.mobile.path.parseUrl(data.toPage);
			if($.mobile.path.isEmbeddedPage(toPage)){
				var pageData=$.mobile.path.parseUrl(toPage.hash.replace(/^#/,""));
				if(pageData.search){
					data.options.pageData=getPageData(pageData.search);
					data.toPage=toPage.hrefNoHash+"#"+pageData.pathname
				}
			}else{
				if(toPage.search){
					data.options.pageData=getPageData(toPage.search);
					data.toPage=toPage.hrefNoSearch
				}
			}
		}
	});
	
	$(document).bind("pagechange",function(e,data){
		var toPage = data.toPage,
			options = data.options,
			id = toPage.attr("id"),
			util = window[id];
		var pageChg = $.mobile.pubsub&&$.mobile.pubsub.publish;
		util&&util.pageChg&&util.pageChg(toPage,options);
	});
})(jQuery,window);

/*$(document).bind("pageshow pagehide", function(e, data) {
	var toPage = data.toPage,
		options = data.options,
		pageId = toPage.attr("id");
	window[pageId].init();
	var j=h.target,i=j.id,pageData=c[b(i)+e];if(!toPage){return}h.type==="pageshow"?g.update&&g.update():g.destroy&&g.destroy()
});*/