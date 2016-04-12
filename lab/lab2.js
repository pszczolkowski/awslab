var AWS = require('aws-sdk');

module.exports = {
	info: info
};


AWS.config.loadFromPath('./config.json');

function info(request, callback) {
	var ec2 = new AWS.EC2();
	var params = {
		DryRun: false,
		MaxResults: 10
	};
	
	ec2.describeInstances(params, function(err, data) {
		if (err) callback(err); // an error occurred err.stack
		else     callback(data);           // successful response
	});
}