var RoadMap = require('../RoadMap').RoadMap;

//Set target root url.
RoadMap.setConfig({root: 'http://www.w3schools.com/ajax/tryit.asp?filename=tryajax_first'});

var steps = [];

//step1: Confirm load root page and iframe is also ready, then push the button.
steps.push({
    condition: function () {
        //ensure the iframe is ready by checking the #myDiv is existed
        return RoadMap.domHandle(function () {
            return ($('iframe').contents().find('#myDiv') !== null);
        });
    },
    nextStep: function () {
        RoadMap.domHandle(function () {
            $('iframe').contents().find('button').click();
        });
    }
});

//step2: Confirm data has loaded by ajax after pushing the button, then get the data in #myDiv.
steps.push({
    condition: function () {
        return RoadMap.domHandle(function () {
            return ($('iframe').contents().find('#myDiv').find('p') !== null);
        });
    },
    nextStep: function () {
        var html = RoadMap.domHandle(function () {
            return $('iframe').contents().find('#myDiv').html();
        });
        console.log(html);
    }
});

//Set steps
RoadMap.setSteps(steps);

//Set callback function when all things are done.
RoadMap.setEndFunction(function () {
    console.log('All things done.');
});

//Rock the RoadMap!
RoadMap.run();

