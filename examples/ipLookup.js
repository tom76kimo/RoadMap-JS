/*
 * Author: tom76kimo
 * Date: May 9th 2014
 * Description: Load 'http://mxtoolbox.com/SuperTool.aspx' and give the web application an IP 202.43.192.109, then push the button and get result address. 
 */

var RoadMap = require('../RoadMap').RoadMap;

//Set config
RoadMap.setConfig({
	root: 'http://mxtoolbox.com/SuperTool.aspx',
	timeout: 6000   //set a longer timeoue interval with 6s
});


//Set steps
var steps = [];

steps.push({
	condition: function	() {
		return RoadMap.domHandle(function () {
			return ($('#txtInput2').length > 0);
		});
	},
	nextStep: function () {
		RoadMap.domHandle(function () {
			$('#txtInput2').val('202.43.192.109');
			$('#btnAction3').click();
		});
	}
});

steps.push({
	condition: function	() {
		return RoadMap.domHandle(function () {
			return ($('.tool-result-table').length > 0);
		});
	},
	nextStep: function () {
		var address = RoadMap.domHandle(function () {
			return $('.tool-result-table tbody tr td:nth-child(3) a').html();
		});

		console.log('The address of 202.43.192.109: ' + address);
	}
});

RoadMap.setSteps(steps);

//Rock RoadMap!
RoadMap.run();