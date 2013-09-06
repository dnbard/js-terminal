var BaseComponent = function(){
	this.draw = function(time, flags){

	};

	this.update = function(time, flags){

	};

	this.makeID = function()
	{
    	var text = "id:";
    	var possible = "abcdefghijklmnopqrstuvwxyz0123456789-";

    	for( var i = 0; i < 12; i++ )
        	text += possible.charAt(Math.floor(Math.random() * possible.length));

    	return text;
	}

	this.findFlag = function(flags, name){
		for(var i in flags)
			if (flags[i].name == name) return flags[i];
		return null;
	};

	this.ID = this.makeID();
	this.name = "";
}