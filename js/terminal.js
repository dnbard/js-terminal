var Terminal = function (elem, size){
	this.elem = $(elem);
	this.size = size;

	//this.rows = [];
	this.cells = [];

	this.cursor = null;

	this.init = function(){
		this.elem.css('width', this.size.cols * this.size.width);
		this.elem.css('height', this.size.rows * this.size.height);
	};

	this.width = function(){
		return this.size.width;
	};

	this.height = function(){
		return this.size.height;
	};

	this.generateGrid = function(){
		for (i = 0; i < this.size.rows; i++){
			var row = $('<div class="row"></div>');
			row.css('height', this.size.height);

			for (j = 0; j < this.size.cols; j++){
				var cell = new Cell($('<div class="cell"></div>'));
				cell.css('width', this.size.width);
				cell.css('height', this.size.height);

				this.cells.push(cell);
				row.append(cell.elem);
			}

			//this.rows.push(row);
			this.elem.append(row);
		}
	};

	this.setBackground = function(color){
		this.elem.css('background-color', color);
	};

	this.putChar = function(position, char){
		cell = this.cells[position.x + position.y * this.size.cols];
		cell.text(char);
		cell.css('color', 'white');
	};

	this.clearChar = function(position){
		cell = this.cells[position.x + position.y * this.size.cols];
		cell.text('');
		cell.css('color', 'black');
	};

	this.getRowWidth = function(rowId){
		var startIndex = (rowId + 1) * this.size.cols - 1;
		var finishIndex = rowId * this.size.cols;
		for (i = startIndex; i >= finishIndex; i--){
			var char = this.cells[i].text();
			if (char != '' && char != ' ') return i - finishIndex + 1;
		}
		return 0;
	};

	this.deleteRow = function(rowId){
		var startIndex = (rowId + 1) * this.size.cols - 1;
		var finishIndex = rowId * this.size.cols;
		for (i = startIndex; i >= finishIndex; i--)
			this.cells[i].text('');
	};

	this.writeLine = function(string){
		var position = {x:0, y:0};
		if (this.cursor) position = this.cursor.position;
		for ( var i = 0; i < string.length; i++ ){
			var char = string.charAt(i);
			this.putChar(position, char);

			position.x += 1;
			if (position.x >= this.size.cols){
				position.x = 0;
				position.y ++;
				if (position.y >= this.size.rows){				
					this.lineUp();
					position.y-=2;
				}
			}
		}

		if (this.cursor){			
			this.cursor.skipToNextLine();			
			this.cursor.moveTo(position);
		}
	};

	this.lineUp = function(){
		for (i = 0; i < this.size.rows - 1; i ++){
			for (j = 0; j < this.size.cols; j ++){
				var thisCell = this.cells[i * this.size.cols + j].text(
					this.cells[(i + 1) * this.size.cols + j].text());
			}
		}
		this.deleteRow(this.size.rows-1);
		if (this.cursor){
			this.cursor.position.y --;
			this.cursor.moveTo();
		}
	};

	this.getCell = function(position){
		return this.cells[position.x + position.y * this.width];
	}

	this.init();
	this.setBackground('black');
	this.generateGrid();	
}