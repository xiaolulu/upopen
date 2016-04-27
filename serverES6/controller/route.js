import blog from './blog';
import comment from './comment';

const Routes = {
	blog,
	comment
}

const Router = ( router ) => {
	
	router.use(( req, res, next ) => {
		console.log( `${req.method}===${req.path}`);
		next();
	});
	
	router.get( '/', ( req, res, next ) => {
		res.redirect( '/blog/list' );
	});
	
	for( let model in Routes ){
		Routes[model].map( item => {
			router.route(`/${model}${item.path}`)[item.method](( req, res, next ) => {
				if( item.render ){
					const path = `${typeof item.render === 'string' ? item.render : item.render( req.query.id )}`
					res.render( path, item.config || {} )
				} else {
					item.request( req, res );
				}
			});
		});
	}
	
	router.use( ( req, res, next ) => {
		res.status( 404 );
		res.send( '404' );
	});
	return router
	
}

export {
	Router
}