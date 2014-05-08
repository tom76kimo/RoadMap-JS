RoadMap-JS
==========

A tool for easily web crawling the websites which using AJAX to load data.

Depends on more and more web applications come out, there are many web page built by JavaScript and using AJAX to load data. If you use traditional crawling way you may only get the based html file with no dynamic contents. You need to analyze the JavaScript code and trace the data to find where them come from. It works, but not so easy. So how about using PhantomJS to load the web applicaitons and executes the JavaScript code automatically as browsers do?

RoadMap.js provide a way to easily crawl the applications that you only need to tell it every step you want it to do, like human manipulate the browsers. ```ex. load page -> click button -> get callback data -> click another button....```

##Requirements
- Nodejs 
- PhantomJS 1.9.x up

##Usage

```JavaScript
var RoadMap = require('RoadMap').RoadMap;
```
