var page = require('webpage').create();
var execFile = require("child_process").execFile;
var execSteps = require('./util/exec').execSteps;

page.viewportSize = {
  width: 1024,
  height: 768
};

page.settings.webSecurityEnabled = false;

var RoadMap = {};
RoadMap.core = {};
RoadMap.core.timeout = 3000;

RoadMap.setConfig = function (config) {
    if (typeof config !== 'object' && config.length !== undefined) {
        console.log('config data should be an object');
        return;
    }

    config.viewportSize && (page.viewportSize = config.viewportSize);
    config.root && (this.core.root = config.root);
    config.timeout && (this.core.timeout = config.timeout);
};

RoadMap.setSteps = function (steps) {
    if (!Array.isArray(steps)) {
        console.log('steps should be a array');
        return;
    }
    this.core.steps = steps;
};

RoadMap.domHandle = function (handleEvent) {
    return page.evaluate(handleEvent);
};

RoadMap.setEndFunction = function (func) {
    RoadMap.core.endFunction = func;
}

RoadMap.run = function () {
    var self = this,
        target;
    if (this.core.root && this.core.root !== '') {
        console.log('Fetching: ' + this.core.root + ' ...');
        target = this.core.root;
    } else {
        //console.log('You did not specify root, fetching default root: www.example.com....');
        //target = 'http://www.example.com';
        console.log('You did not specify root.');
        phantom.exit();
    }
    
    page.open(this.core.root, function (status) {
        if (window.$ === undefined) {
            page.includeJs('//code.jquery.com/jquery-1.11.0.min.js', function () {
                execSteps(self.core.steps, self.core.endFunction, self.core.timeout);
            });
        } else {
            execSteps(self.core.steps, self.core.endFunction, self.core.timeout);
        }
    }); 
};

RoadMap.downloadImg = function (src) {
    execFile('node', ['util/download.js', src], null, function (err, stdout, stderr) {
        console.log('image downloaded!!');
    });
};

page.onConsoleMessage = function (msg) {
    console.log(msg);
};

  
exports.RoadMap = RoadMap;

/*
    execFile('node', ['util/download.js', src], null, function (err, stdout, stderr) {
        console.log('image downloaded!!');
        phantom.exit();
    });
*/


