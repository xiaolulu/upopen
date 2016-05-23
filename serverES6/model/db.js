/**
	模块引入
*/
import mongoose from 'mongoose';
import { mongodb as mongodbConfig } from '../config/config';

/**
	数据库连接
*/
mongoose.connect( `mongodb://${mongodbConfig.host}:${mongodbConfig.port}/${mongodbConfig.name}`);

const db = mongoose.connection;
db.on( 'error', function( err ){
	console.log( `mongodb connect err ${err}` );
}).on( 'open', function( err ){
	console.log( `mongodb connect success` );
})

/**
	数据存储规范化	
*/
function initData( Schema, Data ){
	let data = {};
	for( var key in Schema.tree ){
		console.log( key )
		if( key === '_id' || key === '_v' ) break;
		data[key] = Data[key];
	}
	return data;
}

/**
	数据插入
*/
const savedb = ( Model, Schema, Data, cb ) => {
		new Model( initData( Schema, Data )).save( ( err, docs ) => {					
			if( err ){
				cb( {code: -1, data: [], msg: err } );
			} else {
				cb( {code: 0, data: docs, msg: `save success`})
			}
		} );
	};

/**
	数据更新
*/	
const updatedb = ( Model, id, data, cb ) => {	
		Model.findByIdAndUpdate( id, data, ( err, docs ) => {
			if( err ){
				cb( {code: -1, data: [], msg: err } );
			} else {
				cb( {code: 0, data: docs, msg: `update success`})
			}
		} );
	};

/**
	数据查询
*/
const fetchdb = ( Model, data, cb ) => {
		if( data.id ) data._id = data.id;
		delete data.id;
		Model.find( data, ( err, docs ) => {
			if( err ){
				cb( {code: -1, data: [], msg: err } );
			} else {
				cb( {code: 0, data: docs, msg: `fetch success`})
			}
		} ).sort({date: -1});
	};

/**
	数据删除
*/
const removedb = ( Model, id, cb ) => {
		Model.remove( {_id: id}, ( err, docs ) => {
			if( err ){
				cb( {code: -1, data: [], msg: err } );
			} else {
				cb( {code: 0, data: docs, msg: `fetch success`})
			}
		} );
	};

export {
	mongoose,
	savedb,
	updatedb,
	fetchdb,
	removedb
}