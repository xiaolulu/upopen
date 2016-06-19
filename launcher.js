var _ = require('underscore');
var pm2 = require('pm2');
var pmid = process.env.pm_id;
var settings = require('./common/settings');
require('./common/msg').contact('launcher', pmid, {
	contact : function( data, res ){
		console.log(data.name+'-'+data.pmid+' started');
		res();
	}
});

// ================================================================================
// server start
// ================================================================================
var serverList = {
	'data' : {
	    "name"        		: "data",
    	"script"      		: "product/server/process/data/master.js",
        "log_date_format"   : "YYYY-MM-DD HH:mm:ss",
	    "out_file"  		: "./logs/data_out.log",
	    "error_file"   		: "./logs/data_err.log",
	    "log_file"   		: "./logs/data_log.log"
	},
	'account' : {
	    "name"        		: "account",
    	"script"      		: "./product/server/process/account/master.js",
        "log_date_format"   : "YYYY-MM-DD HH:mm:ss",
	    "out_file"  		: "./logs/account_out.log",
	    "error_file"   		: "./logs/account_err.log",
	    "log_file"   		: "./logs/account_log.log"
	},
    'purview' : {
        "name"              : "purview",
        "script"            : "./product/server/process/purview/master.js",
        "out_file"          : "./logs/purview_out.log",
        "error_file"        : "./logs/purview_err.log",
        "log_file"          : "./logs/purview_log.log"
    },
	'socket' : {
	    "name"        		: "socket",
    	"script"      		: "./product/server/process/socket/master.js",
        "log_date_format"   : "YYYY-MM-DD HH:mm:ss",
	    "out_file"  		: "./logs/socket_out.log",
	    "error_file"   		: "./logs/socket_err.log",
	    "log_file"   		: "./logs/socket_log.log"
	},
	'task' : {
		"name"        		: "task",
    	"script"      		: "./product/server/process/task/master.js",
        "log_date_format"   : "YYYY-MM-DD HH:mm:ss",
	    "out_file"  		: "./logs/task_out.log",
	    "error_file"   		: "./logs/task_err.log",
	    "log_file"   		: "./logs/task_log.log"
	},
	'vm' : {
		"name" 				: "vm",
    	"script"      		: "./product/server/process/vm/master.js",
        "log_date_format"   : "YYYY-MM-DD HH:mm:ss",
    	"exec_mode"			: "cluster",
    	"instances"			: 1,
	    "out_file"  		: "./logs/vm_out.log",
	    "error_file"   		: "./logs/vm_err.log",
	    "log_file"   		: "./logs/vm_log.log",
	    "max_memory_restart" : "500M"
	},
	'vm-dc' : {
		"name" 				: "vm-dc",
    	"script"      		: "./product/server/process/vm/master.js",
        "log_date_format"   : "YYYY-MM-DD HH:mm:ss",
    	"exec_mode"			: "cluster",
    	"instances"			: 1,
	    "out_file"  		: "./logs/vm-dc_out.log",
	    "error_file"   		: "./logs/vm-dc_err.log",
	    "log_file"   		: "./logs/vm-dc_log.log",
		"node_args"   		: "--max-old-space-size=150"
	},
	'api' : {
		"name"        		: "api",
    	"script"      		: "./product/server/process/api/master.js",
        "log_date_format"   : "YYYY-MM-DD HH:mm:ss",
    	"exec_mode"			: "cluster",
    	"instances"			: 1,
	    "out_file"  		: "./logs/api_out.log",
	    "error_file"   		: "./logs/api_err.log",
	    "log_file"   		: "./logs/api_log.log",
		"node_args"   		: "--max-old-space-size=150 --harmony"
	},
	'web' : {
		"name"        		: "web",
    	"script"      		: "./product/server/process/web/master.js",
        "log_date_format"   : "YYYY-MM-DD HH:mm:ss",
    	"exec_mode"			: "cluster",
    	"instances"			: 1,
	    "out_file"  		: "./logs/web_out.log",
	    "error_file"   		: "./logs/web_err.log",
	    "log_file"   		: "./logs/web_log.log",
		"node_args"   		: "--harmony",
		"max_memory_restart" : "300M"
	},
	'open' : {
		"name"        		: "open",
    	"script"      		: "./product/server/process/open/master.js",
        "log_date_format"   : "YYYY-MM-DD HH:mm:ss",
    	"exec_mode"			: "cluster",
    	"instances"			: 1,
	    "out_file"  		: "./logs/open_out.log",
	    "error_file"   		: "./logs/open_err.log",
	    "log_file"   		: "./logs/open_log.log",
		"node_args"   		: "--harmony",
		"max_memory_restart" : "1200M"
	}
};

// ================================================================================
// start
// ================================================================================
var start = function(){

	console.log('>>>>>>>>>> NEREUS <<<<<<<<<<');
	console.log('Launch services...');

	// 连接pm2
	pm2.connect(function(){

		var already = [], serverKeys = _.keys(serverList);
		var startOne = function( key ) {
			if ( key === undefined ) {return;}
			console.log(`launch ${key}`);
			if ( already.indexOf(key) === -1 ) {
				pm2.start( serverList[key], function(){
					startOne(serverKeys.shift());
				});
			} else {
				pm2.restart(key, function(){
					startOne(serverKeys.shift());
				});
			}
		};

		pm2.list(function(err, list){

			_.each(list, (app)=>{
				already.push(app.name);
			});

			startOne(serverKeys.shift());

		});

	});

};
start();

