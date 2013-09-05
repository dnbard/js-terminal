var Terminal = function (elem, size){
	this.elem = $(elem);
	this.size = size;

	this.rows = [];
	this.cells = [];

	this.init = function(){
		this.elem.css('width', this.size.cols * this.size.width);
		this.elem.css('height', this.size.rows * this.size.height);
	};

	this.generateGrid = function(){
		for (i = 0; i < this.size.rows; i++){
			var row = $('<div class="row"></div>');
			row.css('height', this.size.height);

			for (j = 0; j < this.size.cols; j++){
				var cell = $('<div class="cell"></div>');
				cell.css('width', this.size.width);
				cell.css('height', this.size.height);

				this.cells.push(cell);
				row.append(cell);
			}

			this.rows.push(row);
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

	this.init();
	this.setBackground('black');
	this.generateGrid();	
}