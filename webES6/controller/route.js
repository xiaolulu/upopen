import blog from './blog';
import comment from './comment';
import {site} from '../config/config';
import {logFile} from '../lib/loger';
//import gen from '../lib/utils';

//gen();


const Routes = {
	blog,
	comment
}

const Router = ( router ) => {
	
	router.use((req, res, next) => {
		if( req.path === '/favicon.ico' ){
			res.end();
		}
		logFile.info(`${req.method}==${req.path}`);
		next();
	})
	
	router.get( '/', ( req, res, next ) => {
		res.redirect( '/blog/list' );
	});
	
	for( let model in Routes ){
		Routes[model].map( item => {
			router.route(`/${model}${item.path}`)[item.method](( req, res, next ) => {
				if( item.render ){
					const path = `${typeof item.render === 'string' ? item.render : item.render( req.query.id )}`
					res.render( path, Object.assign( item.config, site ));
				} else {
					item.request( req, res );
				}
			});
		});
	}
	
	router.use( ( req, res, next ) => {
		res.status( 404 );
		res.render( 'noFound.ejs' );
	});
	return router
	
}

export default Router