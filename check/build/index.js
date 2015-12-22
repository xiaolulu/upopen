/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	
	var data = [
		{
			id: '123456',
			name: '注册',
			kind: 'user',
			description: '访客注册为站点会员',
			url: 'register',
			method: 0,
			params: ['username', 'password'],
			owner: 'visitor',
			date: '2015-11-15',
			sort: 1
			
		},
		{
			id: '1234567',
			name: '登录',
			kind: 'user',
			description: '会员登录站点',
			url: 'login',
			method: 1,
			params: ['username', 'password'],
			owner: 'visitor',
			date: '2015-11-15',
			sort: 1
			
		}
	];

	var ActionParam = React.createClass({displayName: "ActionParam",
		render: function(){
			return(
				React.createElement("div", {className: "param"}, 
					React.createElement("input", {type: "text", className: "props"}), 
					React.createElement("input", {type: "text", className: "value"}), 
					React.createElement("a", {href: "javascript:void(0)", className: "btn"}, "-"), 
					React.createElement("a", {href: "javascript:void(0)", className: "btn add"}, "+")
				)
			)
		}
	});

	var ActionItem = React.createClass({displayName: "ActionItem",
		handleSubmit: function( e ){
			console.log(222)
			e.preventDefault();
			
			var name = this.refs.name.value.trim(),
				kind = this.refs.kind.value,
				description = this.refs.description.value.trim(),
				url = this.refs.url.value.trim(),
				method = this.refs.method.value;
			this.props.onActionSubmit({
				name: name,
				kind: kind,
				description: description,
				url: url,
				method: method
			})
		},
		render: function(){
			var kinds = [
				{key: 'user', value: 'user'},
				{key: 'article', value: 'article'}
			];
			var options = kinds.map( function( item ){
				return(
					React.createElement("option", {value: item.key}, item.value)
				)
			});
			var actionItem = this.props.data.map( function( item ){
				return(
					React.createElement("form", {className: "item"}, 
						React.createElement("div", null, 
							React.createElement("input", {type: "text", className: "name", defaultValue: item.name, ref: "name"}), 
							React.createElement("select", {ref: "kind", defaultValue: item.kind}, 
								options		
							)
						), 
						React.createElement("label", null, 
							React.createElement("textarea", {ref: "description", defaultValue: item.name}
		
							)
						), 
						React.createElement("label", null, 
							React.createElement("input", {type: "text", className: "url", ref: "url", defaultValue: item.url}), 
							React.createElement("select", {refs: "method"})
						), 
						React.createElement(ActionParam, null), 
						React.createElement("div", null, 
							React.createElement("button", {type: "button", onClickCapture: this.handleSubmit}, "test"), 
							React.createElement("button", {type: "button"}, "save")
						)
					)
				)
			});

			return(
				React.createElement("div", {className: "actionItems"}, 
					actionItem
				)			
			)
		}
	});

	var ActionBox = React.createClass({displayName: "ActionBox",
		handleClick: function(){
			console.log(1);
		},
		actionSubmit: function( item ){
			data.push( item );
			this.setState( {data: data} );
		},
		getInitialState: function(){
			return { data: this.props.data };
		},
		render: function(){
			return(
				React.createElement("div", {className: "actionBox"}, 
					React.createElement(ActionItem, {data: this.state.data, onActionSubmit: this.actionSubmit})
				)
			)
		}
	});



	ReactDOM.render(
		React.createElement(ActionBox, {data: data}),
		document.getElementById( 'content' )
	)


/***/ }
/******/ ]);