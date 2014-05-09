RoadMap-JS
==========

A tool for easily web crawling the websites that using AJAX to load data.

Depends on more and more web applications come out, there are many web page built by JavaScript and using AJAX to load data. If you use traditional crawling way you may only get the based html file with no dynamic contents. You need to analyze the JavaScript code and trace the data to find where them come from. It works, but not so easy. So how about using PhantomJS to load the web applicaitons and executes the JavaScript code automatically as browsers do?

RoadMap.js provide a way to easily crawl the applications that you only need to tell it every step you want it to do, like human manipulate the browsers. ```ex. load page -> click button -> get callback data -> click another button....```

##Requirements
- Nodejs 
- PhantomJS 1.9.x up

##Usage

###Include library
```JavaScript
var RoadMap = require('RoadMap').RoadMap;
```

### Set steps
For every step, there are two function you need to specify: ```condition``` and ```nextStep```.
- ```condition``` is use for setting the situation that you think this step is ready. ex. when the loading image is ```display: none```, I think this page is ready.
- ```nextStep``` is use for when page is ready what you are going to do. ex. the page is ready, then I click the button and wait for the data appear. Then you may set the second step with condition to confirm the data appearing. 

##Example

Let's load the w3schools ajax example page and get the data from back-end after pressing the button.
The website URL: http://www.w3schools.com/ajax/tryit.asp?filename=tryajax_first

Here is our plan:
- Confirm root URL has loaded, so does the inside iframe contents by checking the #myDiv is exiseted or not.
- Click the button.
- Confirm the data has loaded from back-end by checking ```<p>``` tag is existed or not.
- Output the data inside #myDiv which loaded from back-end.

### 1. Set target root url
```RoadMap.setConfig({root: 'http://www.w3schools.com/ajax/tryit.asp?filename=tryajax_first'});```

### 2. Define the steps 
```JavaScript
var steps = [];

//step1: Confirm load root page and iframe is also ready, then push the button.
steps.push({
    condition: function () {
        //ensure the iframe is ready by checking the #myDiv is existed
        return RoadMap.domHandle(function () {
            return ($('iframe').contents().find('#myDiv').length > 0);
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
            return ($('iframe').contents().find('#myDiv').find('p').length > 0);
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
```

### 3. Set ending callback function (Optional)
this function will be called when all processes have done
```JavaScript
//Set callback function when all things are done.
RoadMap.setEndFunction(function () {
    console.log('All things done.');
});
```

### 4. Rock RoadMap
```JavaScript
//Rock the RoadMap!
RoadMap.run();
```

### 5. Save the file and Run
save as ```example.js```
then

```$ Phantomjs example.js```

You can get this example code at ```examples/pressButton.js```
