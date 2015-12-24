
require( '../../public/js/common.js' );
var Hint = require( '../../widget/hint/hint.js' );

var ActionParam = React.createClass({
	addItem: function(){
		this.props.addActionItem( this.props.index );
	},
	delItem: function(){
		this.props.delActionItem( this.props.index );
	},
	changeValue: function(event){
		console.log( 1 );
		this.props.changeState( this.props.index, {field: this.refs.field.value, value: this.refs.value.value });
	},
	render: function(){
		return (
			<label className="filedset clearfix">
				<input type="text" placeholder="param key" onChange={this.changeValue} value={this.props.data.field} ref="field" className="field" />：
				<input type="text" placeholder="param value" onChange={this.changeValue} defaultValue={this.props.data.value} ref="value" className="value" />
				<button type="button" onClick={this.addItem} className="itemEdit add">+</button>
				<button type="button" onClick={this.delItem} className="itemEdit del">-</button>
			</label>
		)
	}
})

var ActionBox = React.createClass({
	handleState: function(index, data){
		this.state.data.splice( index, 1, data );
		this.setState({data: this.state.data });
	},
	remove: function(){
		this.props.handleRemove( this.props.index );
	},
	save: function(){
		var data = {
			name: this.refs.name.value,
			kind: this.refs.kind.value,
			description: this.refs.description.value,
			url: this.refs.url.value,
			method: this.refs.method.value
		};
		var params = {};
		for( var i = 0; i < this.state.data.length; i++ ){
			params[ this.state.data[i].field ] = this.state.data[i].value;
		}
		data.params = JSON.stringify( params );
		this.props.handleSave( this.props.index, data );
		return false;
	},
	test: function(){
		var data = {
			name: this.refs.name.value,
			kind: this.refs.kind.value,
			description: this.refs.description.value,
			url: this.refs.url.value,
			id: this.props.data.id,
			method: this.refs.method.value
		};
		var params = {};
		for( var i = 0; i < this.state.data.length; i++ ){
			params[ this.state.data[i].field ] = this.state.data[i].value;
		}
		data.params = JSON.stringify( params );
		this.props.handleTest( this.props.index, data );
		return false;
	},
	getInitialState: function(){
		var params = JSON.parse( this.props.data.params ),
			data = [];
		for( var field in params ){
			data.push({field: field, value: params[field]});
		}
		return { data: data }
	},
	conponentDidMount: function(){
		this.setState({data: [{name:1},{name:2}]})
	},
	addActionItem: function( index ){	
		console.log( 'addActionItem :' + index )
		this.state.data.splice( index+1, 0, {field: ' ', value: ' ' } );
		this.setState({data: this.state.data });
	},
	delActionItem: function( index ){
		console.log( 'delActionItem :' + index );
		this.state.data.splice( index, 1 );
		this.setState({data: this.state.data });
	},
	render: function(){
		var me = this;
		var ActionParams = this.state.data.map( function( item, index ){
			return (
				<ActionParam key={index} index={index} changeState={me.handleState} addActionItem={me.addActionItem} data={item} delActionItem={me.delActionItem} />
			)
		})
	
		return  (
			<section className="clearfix">
				<h2>
					<input type="text" placeholder="action name" ref="name" defaultValue={this.props.data.name} className="name" />
					<select defaultValue={this.props.data.kind} ref="kind">
						<option value="0">choose system</option>
						<option value="1">user system</option>
					</select>
					<a href="javascript:void(0)" onClick={this.remove} className="itemEdit del remove">-</a>
				</h2>
				<form onSubmit={this.save}>
					<textarea placeholder="action description" ref="description" defaultValue={this.props.data.description}></textarea>
					<label className="clearfix">
						<input type="text" placeholder="action url" ref="url" defaultValue={this.props.data.url} className="url" />
						<select className="type" ref="method" defaultValue={this.props.data.method}>
							<option value="POST">POST</option>
							<option value="GET">GET</option>
							<option value="DELETE">DELETE</option>					
						</select>
					</label>
					{ActionParams}
					<button type="button" onClick={this.test} className="test">test</button>
					<button type="button" onClick={this.save} className="save">save</button>
				</form>
				<pre refs="result">{this.props.data.result}</pre>
			</section>
		)
	}
})

var ActionWrap = React.createClass({

	defaults: {
		id: '',
		name: '',
		kind: '0',
		description: '',
		url: '',
		method: 'POST',
		params: '{"":""}',
		result: ''
	},

	getInitialState: function(){
	
		return {data:[{
				id: '',
				name: '',
				kind: '0',
				description: '',
				url: '',
				method: 'POST',
				params: '{"":""}',
				result: ''
			}]}	
	},
	remove: function( index ){
		var id = this.state.data[index]._id;
		$.ajax({
			url: '/action/remove',
			type: 'delete',
			dataType: 'json',
			data: { 'id': id },
			success: function( ret ){
				if( ret.code == 0 ){
	            	this.state.data.splice( index, 1 );
					this.setState( { data: this.state.data } );
	            }
			}.bind( this ),
			error: function( e ){
				console.log( e )
			},
			failed: function( e ){
				console.log( e )
			}
		});
	},
	
	save: function( index, data ){
		var url = '/action/create';
		if( index ){
			url = '/action/update';
			data._id = this.state.data[index]._id;
		}
		$.ajax({
			url: url,
			type: 'post',
			dataType: 'json',
			data: data,
			success: function( ret ){
				//me.result.html( JSON.stringify( ret, null, 8 ) );
				//new Demo( ret.data, function( el ){ $( 'section' ).first().after( el )} );
				data.result = '';
				if( ret.code === 0 ){
					if( index ){
						this.state.data.splice( index, 1, data )
					} else {
						this.state.data.splice( index+1, 0, data )
					}
					this.setState( { data: this.state.data } );
				}
				Hint.show( ret.msg );
			}.bind( this )
		});
		return false;
	},
	check: function( index, data ){
		debugger
		/*
		var data = [].concat( this.state.data );
		data = data[index];
		if( typeof data.params == 'string' ){
			data.params = JSON.parse( data.params )
		}
		*/
		data.params = JSON.parse( data.params )
		data.actionConfig = {
			host: $('.host').val(),
			path: data.url,
			method: data.type
		}

		$.ajax({
			url: '/action/check',
			type: 'post',
			dataType: 'json',
			data: data,
			success: function( ret ){
				data.result = JSON.stringify(ret.data,null,8);
				delete data.actionConfig;
				data.params = JSON.stringify( data.params );
				this.state.data.splice( index, 1, data );
				this.setState( { data: this.state.data } );
				console.log( ret );
			}.bind( this )
		});
	},
	fetchData: function(){
		$.ajax({
			url: '/action/fetch',
			type: 'get',
			data: {},
			dataType: 'json',
			success: function( ret ){
				if( ret.code == 0 ){
					this.setState( {data: [this.defaults].concat( ret.data )} );
				}
			}.bind(this)
		});
	},
	componentDidMount: function(){
		this.fetchData();
	},
	render: function(){
		var me = this;
		var ActionBoxs = this.state.data.map( function( item, index ){
			return (
				<ActionBox key={index} handleTest={me.check} handleSave={me.save} handleRemove={me.remove} index={index} data={item} />
			)
		});
		return (
			<div className="actionWrap">
				{ActionBoxs}
			</div>
		)
	}
});

ReactDOM.render(
	<ActionWrap />,
	document.getElementById( 'wrapper' )
);
