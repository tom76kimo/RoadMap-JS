var Promise = require('es6-promise').Promise,
    waitFor = require('./waitFor').waitFor;
function execSteps(funcs, endFunction, timeout) {
    //funcs.reverse();
    var promises = [];
    endFunction = endFunction || function () {console.log('All things done');};

    //recursive function for executing async function orderly
    var execCore = function (n) {
        promises[n] = new Promise(function (resolve, reject) {
            waitFor(funcs[n].condition, function () {
                funcs[n].nextStep();
                resolve();
            }, timeout);
        });
        promises[n].then(function () {
            if (funcs[(n + 1)]) {
                execCore(n + 1);
            } else {
                endFunction();
                phantom.exit();
            }
        });
    };

    execCore(0);
}


exports.execSteps = execSteps;