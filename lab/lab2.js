var AWS = require('aws-sdk');

module.exports = {
	info: info,
	runInstance: runInstance
};


var AMI_IMAGE_ID = 'ami-80f715e0';


AWS.config.loadFromPath('./config.json');
var ec2 = new AWS.EC2();

function info(request, callback) {
	var params = {
		DryRun: false,
		MaxResults: 10
	};
	
	ec2.describeInstances(params, function(err, data) {
		if (err) {
			callback(err); 
		}
		else {
			callback(null, data);
		}
	});
}

function runInstance(request, callback) {
	var params = {
		ImageId: AMI_IMAGE_ID,
		MaxCount: 1,
		MinCount: 1,
		Monitoring: {
			Enabled: false 
		},
		InstanceType: 't1.micro'
	};
	ec2.runInstances(params, function(err, data) {
		if (err) {
			callback(err);
		} else {
			var params = {
				DryRun: false,
				InstanceIds: [data.Instances[0].InstanceId]
			};
			
			ec2.describeInstances(params, function(err, data) {
				if (err) {
					callback(err); 
				}
				else {
					var createdInstance = data.Reservations[0].Instances[0];
					var response = 'DNS: ' + createdInstance.PublicDnsName +
						'<br />IP: ' + createdInstance.PublicIpAddress;

					callback(null, response);
				}
			});
		
		}
	});
}