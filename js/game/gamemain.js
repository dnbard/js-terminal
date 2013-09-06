var GameMain = function(){
	this.components = [];
	this.time = 0;
	this.timestep = 100;

	this.inUpdateCycle = false;

	this.currentUpdateFlags = {};
	this.futureUpdateFlags = {};

	this.framesPerSecond = function(){
		return 1000 / this.timestep;
	};

	this.maincycle = function(){
		//skip this update cycle if previous isn't completed
		if (this.inUpdateCycle) return;

		this.inUpdateCycle = true;
		this.time += this.timestep;
		this.update();
		this.draw();
		this.inUpdateCycle = false;;
	}; 

	this.update = function(){
		var length = this.components.length;
    	var component = null;
		
		for (var i = 0; i < length; i++) {
  			component = this.components[i];  			
  			component.update(this.time, this.currentUpdateFlags);
  		}

  		this.clearUpdateflags();
	};	

	this.clearUpdateflags = function(){
		var temp = this.currentUpdateFlags;
		this.currentUpdateFlags = this.futureUpdateFlags;
		this.futureUpdateFlags = temp;
		for (var flag in this.futureUpdateFlags) delete this.futureUpdateFlags[flag];
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
	}

	//start main game cycle
	setInterval(this.maincycle.bind(this), this.timestep);

	this.components.push(new BaseStage());
}