function interceptRequest(request) {
	if (request && request.url) {
		var sanitizedResult = sanitizeURL(request.url);
		if (sanitizedResult.match) {
			return { redirectUrl: sanitizedResult.url };
		}
	}
}

function sanitizeURL(urlString) {
	var rawURL = decodeURIComponent(urlString);
	// URL does not contain a valid query parameter, patch it
	if (!rawURL.includes('?') && rawURL.includes('&')) {
		rawURL = replaceAt(rawURL, rawURL.lastIndexOf('/'), '?');
	}
	var url = new URL(rawURL);
	var match = false;
	var searchParams = url.searchParams;
	if (searchParams.has('tag')) {
		console.log("Removing affiliate tag=" + searchParams.get('tag'));
		match = true;
	}
	if (searchParams.has('ascsubtag')) {
		console.log("Removing affiliate ascsubtag=" + searchParams.get('ascsubtag'));
		match = true;
	}
	searchParams.delete('tag');
	searchParams.delete('ascsubtag');
	return { match, url: url.toString() };
}

chrome.webRequest.onBeforeRequest.addListener( interceptRequest, { urls: [
	'*://*.amazon.ae/*',
	'*://*.amazon.at/*',
	'*://*.amazon.ca/*',
	'*://*.amazon.cn/*',
	'*://*.amazon.co.jp/*',
	'*://*.amazon.co.uk/*',
	'*://*.amazon.com.au/*',
	'*://*.amazon.com.br/*',
	'*://*.amazon.com.mx/*',
	'*://*.amazon.com.sg/*',
	'*://*.amazon.com.tr/*',
	'*://*.amazon.com/*',
	'*://*.amazon.de/*',
	'*://*.amazon.es/*',
	'*://*.amazon.fr/*',
	'*://*.amazon.ie/*',
	'*://*.amazon.in/*',
	'*://*.amazon.it/*',
	'*://*.amazon.nl/*'
] }, ["blocking"] );
