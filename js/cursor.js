var Cursor = function(terminal, position){
	this.terminal = terminal;		
	this.elem = null;
	this.keyCapture = true;
	this.keyDelegate = null;

	this.mult = false;
	this.prev = 0;

	this.moveTo = function(position){
		if (!position) position = this.position;
		if (this.elem != null) this.elem.removeClass('cursor');
		this.position = position;
		this.elem = terminal.cells[position.x + position.y * terminal.size.cols];
		this.elem.addClass('cursor');
	};

	$(document).keyup(function(event){
		var key = event.which || event.keyCode;
		switch (key){
 			case 16: //SHIFT
 				this.pressed.shift = false;
 			break;
 			case 17: //CTRL
 				this.pressed.ctrl = false;
 			break;
 			case 18: //ALT
 				this.pressed.alt = false;
 			break;
 		}
	}.bind(this));

 	$(document).keydown(function(event){		
 		var key = event.which || event.keyCode;
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

				if (sender.position.y >= terminal.size.rows){
					terminal.lineUp();
				}

				sender.moveTo(sender.position);				
			break;

			case 8: //BACKSPACE 
				if (!sender.pressed.shift) {
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
				}
				else { //shift is pressed 
					terminal.deleteRow(sender.position.y);
					sender.position.x = 0;
					sender.moveTo(sender.position);
				}
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
				this.pressed.shift = true;
			break;

			case 17: //CTRL
 				this.pressed.ctrl = true;
 			break;

 			case 18: //ALT
 				this.pressed.alt = true;
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

	this.skipToNextLine = function(){
		this.position.y ++;
		this.position.x = 0;
		if (this.position.y >= this.terminal.size.rows){
			this.position.y --;
			this.terminal.lineUp();
		}		
	}

 	this.moveTo(position);
}