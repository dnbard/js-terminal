var Cell = function(elem){
	this.elem = elem;

	this.css = function(selector, value){
		this.elem.css(selector, value);
	};

	this.text = function(string){
		if (string == null || string === 'undefined')
			return this.elem.text();
		this.elem.text(string);
	};

	this.addClass = function(cssClass){
		this.elem.addClass(cssClass);
	};

	this.removeClass = function(cssClass){
		this.elem.removeClass(cssClass);
	};

	this.setColor = function(color){
		this.elem.css('color', color);
	};

	this.setBackgroundColor = function(color){
		this.elem.css('background-color', color);
	};
}