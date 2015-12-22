
module.exports = {

	'appenders':[
		{
			'type': 'console',
			'category':'console'
		},
		{
			'type': 'dateFile',
			'category':'info',
			'filename':'/home/cc/Work/upopen/log/check/',
			'pattern':'yyyyMMdd_info.log',
			'alwaysIncludePattern':true
		},
		{
			'type': 'dateFile',
			'category':'warn',
			'filename':'/home/cc/Work/upopen/log/check/',
			'pattern':'yyyyMMdd_warn.log',
			'alwaysIncludePattern':true
		},
		{
			'type': 'file',
			'category': 'file',
			'filename': '/home/cc/Work/upopen/log/check/file.log',
			'maxLogSize': 1024*1028*10,		
			'backups': 2
		}
	],
	replaceConsole: true,
	'levels':{
		'console':'all',
		'file': 'all',
		'info': 'all',
		'warn': 'warn'
	}

}
