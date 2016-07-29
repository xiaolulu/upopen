import blog from './blog';
import comment from './comment';
import issue from './issue';
import {site} from '../config/config';
import {logFile} from '../lib/loger';

const Routes = {
	blog,
	comment,
	issue
}

const pipe = function( req, res, next ){
	return function( res ){
		res.end();
	}
}

const Router = ( router ) => {
	
	router.use((req, res, next) => {
		if( req.path === '/favicon.ico' ){
			res.end();
			return;
		}
		logFile.info(`${req.method}==${req.path}`);
		console.log(`${req.method}==${req.path}`);
		next();
	})
	
	router.get( '/', ( req, res, next ) => {
		res.redirect( '/blog/list' );
	});
	
	for( let model in Routes ){
		Routes[model].map( item => {
			router.route(`/${model}${item.path}`)[item.method](( req, res, next ) => {
				
				if( item.render ){
					const path = `${typeof item.render === 'string' ? item.render : item.render( req.query.id )}`;
					console.log( item.path );
					if( item.path === '/list' ){
						res.render( path, Object.assign( item.config, site ), ( err, str ) => { res.write(str) } );
					//( item.pipe && item.pipe( req, res, next ) ) || res.end();
						item.pipe( req, res, next )
					} else {
						res.render( path, Object.assign( item.config, site ));
					}
					
				} else {
					item.request( req, res );
				}
			});
		});
	}
	
	router.use( ( req, res, next ) => {
		console.log(`${req.method}==${req.path}`)
		res.status( 404 );
		res.render( 'noFound.ejs' );
	});
	return router
	
}


export default Router