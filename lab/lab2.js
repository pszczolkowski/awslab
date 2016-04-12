var AWS = require('aws-sdk');

module.exports = {
	info: info
};


AWS.config.loadFromPath('./config.json');
AWS.config.update({region:'us-west-2b'});

function info(request, callback) {
	var ec2 = new AWS.EC2();
	var params = {
		DryRun: false,
		InstanceIds: ['i-65b2ecbd'],
		MaxResults: 10
	};
	
	ec2.describeInstances(params, function(err, data) {
		if (err) callback(err); // an error occurred err.stack
		else     callback(data);           // successful response
	});
}