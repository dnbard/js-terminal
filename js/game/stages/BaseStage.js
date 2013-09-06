var BaseStage = function(){
	this.components = [];

	this.update = function(time, flags){
		var length = this.components.length;
    	var component = null;
		
		for (var i = 0; i < length; i++) {
  			component = this.components[i];  			
  			component.update(time, flags);
  		}  		
	};

	this.draw = function(){
		var length = this.components.length;
    	var component = null;
		
		for (var i = 0; i < length; i++) {
  			component = this.components[i];
  			component.draw(this.time, null);
  		}
	};

	this.add = function(component){
		this.components.push(component);
	};

	this.remove = function(component){
		var i = this.components.indexOf(component);
		if(i != -1) array.splice(i, 1);
	};
}

BaseStage.prototype = new BaseComponent();