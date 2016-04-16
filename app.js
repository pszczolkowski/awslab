var example_1 = require("./example_1").lab,
	lab1_1 = require("./lab/lab1_1").lab,
	lab2 = require("./lab/lab2"),
	service = require("./lib/service");

var PORT = 8080;

var urlMap = [
	{path: "/", action:__dirname + "/static/index.html"},	 
	{path: "/digest", action: lab1_1},	
	{path: "/example_1", action: example_1}, 
	{path: "/instance-info", action: lab2.info},
	{path: "/run-instance", action: lab2.runInstance}
	];

var httpService = service.http(urlMap);
httpService(PORT);

