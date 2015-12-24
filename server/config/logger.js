
module.exports = {

	'appenders':[
		{'type': 'console','category':'console'},
		{
			'type': 'dateFile',
			'filename':'/root/root/upopen/log/server/',
			'pattern':'yyyyMMdd.log',
			'absolute':true,
			'alwaysIncludePattern':true,
			'category':'logInfo'
		}
	],
	'levels':{'logInfo':'DEBUG'}

}
