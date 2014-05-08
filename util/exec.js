var Promise = require('es6-promise').Promise,
    waitFor = require('./waitFor').waitFor;
function execSteps(funcs, endFunction) {
    funcs.reverse();
    var promises = [];
    endFunction = endFunction || function () {console.log('Queue is over');};

    //recursive function for executing async function orderly
    var execCore = function (n) {
        promises[n] = new Promise(function (resolve, reject) {
            waitFor(funcs[n].condition, function () {
                funcs[n].nextStep();
                resolve();
            });
        });
        promises[n].then(function () {
            if (funcs[n - 1]) {
                execCore(n - 1);
            } else {
                endFunction();
                phantom.exit();
            }
        });
    };

    execCore(funcs.length - 1);
}


exports.execSteps = execSteps;