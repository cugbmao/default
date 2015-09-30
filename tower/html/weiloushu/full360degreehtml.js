var ctx = null; // global variable 2d context
var frame = 1; // 23
var width = 0;
var height = 0;
var started = false;
var images = new Array();
var startedX = -1;
var imagePoss = new Array();
var vertSquashRatio = -1;
var shiftDrawingInterval = null;
var forward = 1;// the index of the right image in the imagePoss equals to
				// (forward + 1)/2
// var imgIndexArray = new Array(); // the index of the images showing in the
// monitor in the imgages
window.onload = function() {
//	var canvas = document.getElementById("fullview_canvas");
//	canvas.width = 1000;// window.innerWidth;
//	canvas.height = 591;// window.innerHeight;
//	width = canvas.width;
//	height = canvas.height;
	var page = $.mobile.activePage;
	var headerHeight = page.find(":jqmData(role='header')").outerHeight();
//	var headerHeight = 0;
//	var mainHeight = window.screen.height- headerHeight;
	var mainHeight = window.innerHeight - headerHeight;
	var canvas = $("#fullview_canvas")[0];
	canvas.width = window.innerWidth;// window.screen.width;
	canvas.height = mainHeight;// window.innerHeight;
	canvas.left = 0;
	canvas.top = headerHeight;
	width = canvas.width;
	height = mainHeight;
	for ( var i = 0; i <= frame; i++) {
		images[i] = new Image();
		images[i].src = "../../images/360degree/360.jpg";
	}

	ctx = canvas.getContext("2d");

	// mouse event
//	canvas.addEventListener("mousedown", doMouseDown, false);
//	canvas.addEventListener('mousemove', doMouseMove, false);
//	canvas.addEventListener('mouseup', doMouseUp, false);
//	$("#fullview_canvas").bind("vmousedown", function(event){doMouseDown(event);}, false);
//	$("#fullview_canvas").bind("vmouseup", function(event){doMouseUp(event);}, false);
//	$("#fullview_canvas").bind("vmousemove", function(event){doMouseMove(event);}, false);
	
	$("#fullview_canvas").bind("vmousedown", function(event){doMouseDown(event);});
	$("#fullview_canvas").bind("vmouseup", function(event){doMouseUp(event);});
	$("#fullview_canvas").bind("vmousemove", function(event){doMouseMove(event);});
	// loaded();

	// frame = 1
	images[0].onload = function() {
		var totalWidth = 0;
		for ( var i = 0, j = 0; true; i++, j++) {
			if(i > frame){
				i = 0;
			}
			var image = images[i];
			imagePoss[i] = [ totalWidth, 0, i ];
			totalWidth += getWidth(image);
			if (totalWidth > width) {
				break;
			}
		}
		redraw();
		
		shiftDrawingInterval = setInterval("autoShift()",50);
	};
};
function doMouseDown(event) {
	var x = event.pageX;
	var y = event.pageY;
	var canvas = event.target;
	var loc = getPointOnCanvas(canvas, x, y);
	startedX = loc.x;
	started = true;
	if(shiftDrawingInterval != null){
		clearInterval(shiftDrawingInterval);
		shiftDrawingInterval = null;
	}
}

function doMouseMove(event) {
	console.log("mouse move now");
//	if(shiftDrawingInterval != null){
//		clearInterval(shiftDrawingInterval);
//		shiftDrawingInterval = null;
//	}
	var x = event.pageX;
	var y = event.pageY;
	var canvas = event.target;
	var loc = getPointOnCanvas(canvas, x, y);
	if (started) {
		var count = Math.floor(Math.abs((startedX - loc.x))/6);
//		console.debug(images[0]);
		var radioValue = detectVerticalSquash(images[0]);
//		console.debug(radioValue);
		if(radioValue == 1){
//			count = count * 5;
		} else if (radioValue < 1){
			
		} else if (radioValue > 1){
			
		}
		
		var direction = loc.x - startedX > 0 ? 1 : -1;
		while (count > 0) {
			doDrawImage(direction);
			count--;
		}
//		shiftDrawingInterval = setInterval("autoShift()",50);
	}
}

function doDrawImage(direction){
	if(direction == undefined || direction == null){
		direction = -1;
	}

	// if any pic is in the end
	var rightestImageInfo = getRightestEndX();
	if (imagePoss[0][0] == 0 && direction > 0) {
		var leftImageIndex = imagePoss[0][2] - 1;
		if (leftImageIndex < 0) {
			leftImageIndex = frame;
		}
		var leftImage = images[leftImageIndex];
		imagePoss
				.unshift([ -1 * getWidth(leftImage), 0, leftImageIndex ]);
	} else if (rightestImageInfo == width && direction < 0) {
		var rightImageIndex = imagePoss[imagePoss.length - 1][2] + 1;
		if (rightImageIndex >= frame) {
			rightImageIndex = 0;
		}
		imagePoss.push([ width, 0, rightImageIndex ]);
	}

	for ( var i = 0; i < imagePoss.length; i++) {
		var imagePosX = imagePoss[i][0];
		var imagePosY = imagePoss[i][1];
		imagePosX = imagePosX + direction;
		if (imagePosX >= width) {
			imagePoss.splice(i, 1);
			// moves towards right
			break;
		} else if (imagePosX <= (-1 * images[imagePoss[0][2]])) {
			imagePoss.splice(i, 1);
			// moves towards left
			i--;
		} else {
			imagePoss[i][0] = imagePosX;
			imagePoss[i][1] = imagePosY;
		}
	}
//	count--;
	redraw();
}

function doMouseUp(event) {
	console.log("mouse up now");
	if (started) {
		doMouseMove(event);
		startedX = -1;
		started = false;
	}
	shiftDrawingInterval = setInterval("autoShift()",50);
}

function getPointOnCanvas(canvas, x, y) {
	var bbox = canvas.getBoundingClientRect();
	return {
		x : x - bbox.left * (canvas.width / bbox.width),
		y : y - bbox.top * (canvas.height / bbox.height)
	};
}

function redraw() {
	// var imageObj = document.createElement("img");
	// var imageObj = new Image();
//	var resCanvas = $("#fullview_canvas")[0];
//	for ( var i = 0; i < 1; i++) {
	for ( var i = 0; i < imagePoss.length; i++) {
		var imageObj = images[imagePoss[i][2]];
//		ctx.drawImage(imageObj, imagePoss[i][0], imagePoss[i][1],
//				imageObj.width * height / imageObj.height , height);
//		ctx.drawImage(imageObj, imagePoss[i][0], imagePoss[i][1],
//				getWidth(imageObj), height);
//		alert($.meagepix.detectVerticalSquash(imageObj,imageObj.width * height / imageObj.height , height));
//		var mpImg = new MegaPixImage(imageObj.src);
//		alert(detectVerticalSquash(imageObj));
//	    mpImg.render(resCanvas, { maxWidth: getWidth(imageObj), maxHeight: height });
		
		drawImageIOSFix(ctx,imageObj,imagePoss[i][0], imagePoss[i][1],getWidth(imageObj), height);
	}
}

/**
 * Detecting vertical squash in loaded image.
 * Fixes a bug which squash image vertically while drawing into canvas for some images.
 * This is a bug in iOS6 devices. This function from https://github.com/stomita/ios-imagefile-megapixel
 * 
 */
function detectVerticalSquash(img) {
    var iw = img.naturalWidth, ih = img.naturalHeight;
    var canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = ih;
    var ctxTemp = canvas.getContext('2d');
    ctxTemp.drawImage(img, 0, 0);
    var data = ctxTemp.getImageData(0, 0, 1, ih).data;
    // search image edge pixel position in case it is squashed vertically.
    var sy = 0;
    var ey = ih;
    var py = ih;
    while (py > sy) {
        var alpha = data[(py - 1) * 4 + 3];
        if (alpha === 0) {
            ey = py;
        } else {
            sy = py;
        }
        py = (ey + sy) >> 1;
    }
    var ratio = (py / ih);
    return (ratio===0)?1:ratio;
}

/**
 * A replacement for context.drawImage
 * (args are for source and destination).
 */
function drawImageIOSFix(ctx, img, sx, sy, sw, sh) {
	if(vertSquashRatio == -1){
		vertSquashRatio = detectVerticalSquash(img);
	}
 // Works only if whole image is displayed:
 // ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh / vertSquashRatio);
 // The following works correct also when only a part of the image is displayed:
    ctx.drawImage(img, sx , sy, 
                       sw, Math.floor(sh / vertSquashRatio));
}

// get the rightest image's X of starting point
function getRightestEndX() {
	return imagePoss[imagePoss.length - 1][0]
			+ getWidth(images[imagePoss[imagePoss.length - 1][2]]);
}

function getWidth(imageObject) {
	return Math.floor(imageObject.width * height / imageObject.height);
}

function autoShift(){
	doDrawImage(-1);
}