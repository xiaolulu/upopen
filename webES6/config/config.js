import path from 'path';

const server = {
	host: 'http://127.0.0.1',
	port: 3003
}

const site = {
	siteTitle: '优品开源'
}


const logDir = path.normalize(`${__dirname}/../../log`);

export {
	server,
	site,
	logDir
}