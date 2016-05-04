import path from 'path';

const self = {
	port: 3003
}

const mongodb = {
	host: '127.0.0.1',
	port: 27017,
	name: 'upDB'
}

const logPath = path.normalize(`${__dirname}/../../log`)

export {
	self,
	mongodb,
	logPath
}