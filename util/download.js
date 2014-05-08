var http = require('http'),
	https = require('https'),
    fs = require('fs'),
    paths = process.argv.splice(2),
    imgIndex = 0;

var getFileName = function (path) {
	var sections = path.toString().replace('//', '/').split('/');
	var fileName = sections[(sections.length-1)];
	return fileName;
};

var downloadImage = function (res) {
	var imageData = '';
	res.setEncoding('binary');

	res.on('data', function (chunk) {
		imageData += chunk;
	});

	//getFileName(res.req.path)
	res.on('end', function () {
		fs.writeFile(imgIndex + '.jpg', imageData, 'binary', function (err) {
			if (err) throw err;
			console.log('File saved');
			imgIndex++;
		});
	});
};


for (var i=0; i<paths.length; ++i) {
    (function (index) {
    	var path = paths[index];
    	if (path.toString().indexOf('https') >-1 ) {
    		//https
    		https.get(path, downloadImage);
    	} else {
    		//http
    		http.get(path, downloadImage);
    	}
    }(i));
}