var win = window
	, doc = win.document
	, nav = navigator;

/**
 * Does platform support native video
 * @returns {Boolean}
 */
exports.hasVideo = function() {
	var hasVideo = !!doc.createElement('video').canPlayType;
	exports.hasVideo = function() { return hasVideo; };
	return hasVideo;
};

/**
 * Does platform support Flash plugin
 * @returns {Boolean}
 */
exports.hasFlash = function() {
	var desc, testObject, version;
	if (nav.plugins != null && nav.plugins['Shockwave Flash'] === 'object') {
		desc = nav.plugins['Shockwave Flash'].description;
		if (desc && !((nav.mimeTypes != null && nav.mimeTypes['application/x-shockwave-flash']) && !nav.mimeTypes['application/x-shockwave-flash'].enabledPlugin)) {
			version = parseInt(desc.match(/^.*\s+([^\s]+)\.[^\s]+\s+[^\s]+$/)[1], 10);
		}
	} else if (win.ActiveXObject != null) {
		try {
			testObject = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
			if (testObject) {
				version = parseInt(testObject.GetVariable('$version').match(/^[^\s]+\s(\d+)/)[1], 10);
			}
		} catch (e) { }
	}

	exports.flashVersion = version;
	exports.hasFlash = function() { return exports.flashVersion > 0; };
	return version > 0;
};

/**
 * Flash plugin version number
 */
exports.flashVersion = 0;

/**
 * Does platform support native full screen
 * @returns {Boolean}
 */
exports.hasNativeFullscreen = function() {
	var hasNativeFullscreen = typeof doc.createElement('video').webkitEnterFullScreen === 'function';
	exports.hasNativeFullscreen = function() { return hasNativeFullscreen; };
	return hasNativeFullscreen;
};

/**
 * Does platform support Canvas element
 * @returns {Boolean}
 */
exports.hasCanvas = function() {
	var elem = doc.createElement('canvas')
		, hasCanvas = !!(elem.getContext && elem.getContext('2d'));
	exports.hasCanvas = function() { return hasCanvas; };
	return hasCanvas;
};

/**
 * Does platform support Touch events
 * @returns {Boolean}
 */
exports.hasTouch = function() {
	var hasTouch = 'ontouchstart' in win || (win.DocumentTouch && doc instanceof DocumentTouch);
	exports.hasTouch = function() { return hasTouch; };
	return hasTouch;
};

/**
 * Does platform support inline svg
 * @returns {Boolean}
 */
exports.hasSVG = function(){
	var test = document.createElement('div');
	test.innerHTML = '<svg/>';
	var hasSVG = (test.firstChild && test.firstChild.namespaceURI) == 'http://www.w3.org/2000/svg';
	exports.hasSVG = function(){ return hasSVG; };
	return hasSVG;
}
