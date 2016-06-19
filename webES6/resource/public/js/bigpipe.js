var Bigpipe = function(){
    this.events = {};
}

Bigpipe.prototype.on = function(name,event){
	this.events[ name ] = this.events[ name ] || [];
    this.events[ name ].push( event );
}

Bigpipe.prototype.fire = function(name,data){
    var events = this.events[ name ] || [],
    	event;
    while( event = events.shift() ){
	    event.call( this, data )
    }
}

module.exports = Bigpipe