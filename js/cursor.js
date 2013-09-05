var Cursor = function(terminal, position){
	this.terminal = terminal;		
	this.elem = null;
	this.keyCapture = true;
	this.keyDelegate = null;

	this.mult = false;
	this.prev = 0;

	this.moveTo = function(position){
		if (this.elem != null) this.elem.removeClass('cursor');
		this.position = position;
		this.elem = terminal.cells[position.x + position.y * terminal.size.cols];
		this.elem.addClass('cursor');
	};



 	$(document).keydown(function(event){
 		var key = event.which || event.keyCode;
		switch (key){
 			case 16: //SHIFT
 				this.pressed.shift = true;
 			break;
 		}

 		if (!this.mult) {
        	this.mult = true;
        	this.prev = key;
        	setTimeout(function() {
            	this.mult = false;
        	}.bind(this), 100)
    	}
    	else if (this.prev != key) {
        	this.mult = false;        	
    	}
    	else return;

 		if (!this.keyCapture) return;    	    	
    	if (this.keyDelegate != null)
    		this.keyDelegate(this, key); 		
 	}.bind(this));

	this.pressed = {
		shift: false,
		ctrl: false,
		alt: false
	};

	this.keyDelegate = function(sender, keyCode){
		var terminal = sender.terminal;
		var key = String.fromCharCode(keyCode);
		if (!sender.pressed.shift) key = key.toLowerCase();

		switch (keyCode){
			case 13: //ENTER
				sender.position.x = 0;
				sender.position.y += 1;
				sender.moveTo(sender.position);
			break;

			case 8: //BACKSPACE 
				if (sender.position.x > 0) {
					sender.position.x -= 1;
					terminal.clearChar(sender.position);
				}
				else if (sender.position.x <= 0 && sender.position.y > 0){
					sender.position.y -= 1;

					var prevRowWidth = terminal.getRowWidth(sender.position.y);
					if (prevRowWidth == terminal.size.cols) prevRowWidth --;
					sender.position.x = prevRowWidth;					
					terminal.clearChar(sender.position);
				} 
				
				sender.moveTo(sender.position);
			break;

			case 37: //LEFT
				if (sender.position.x > 0)
					sender.position.x --;
				sender.moveTo(sender.position);
			break;

			case 38: //UP
				if (sender.position.y > 0)
					sender.position.y -= 1;
				sender.moveTo(sender.position);
			break;

			case 39: //RIGHT
				if (sender.position.x < terminal.size.cols - 1)
					sender.position.x ++;
				sender.moveTo(sender.position);
			break;

			case 40: //DOWN
				if (sender.position.y < terminal.size.rows - 1)
					sender.position.y ++;
				sender.moveTo(sender.position);	
			break;

			case 16: //SHIFT
				this.pressed.shift = false;
			break;

			default: 
				if (key == '') break;
				terminal.putChar(sender.position, key);
				sender.position.x += 1;	
				if (sender.position.x >= terminal.size.cols){
					sender.position.x = 0;
					sender.position.y += 1;
				}
				sender.moveTo(sender.position);
			break;
		};		
	};

 	this.moveTo(position);
}