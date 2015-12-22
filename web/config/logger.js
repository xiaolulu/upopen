
module.exports = {

	'appenders':[
		{'type': 'console','category':'console'},
		{
			'type': 'dateFile',
			'filename':'/home/cc/Work/upopen/log/web/',
			'pattern':'yyyyMMdd.log',
			'absolute':true,
			'alwaysIncludePattern':true,
			'category':'logInfo'
		}
	],
	'levels':{'logInfo':'DEBUG'}

}
