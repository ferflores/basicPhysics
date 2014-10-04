function Main(){

	this.canvas;
	this.context;
	this.mainMethods = ["commonCoords","particleCenter","linearMovement","directionAngle","acceleration","gravity","fireworks"];
	this.methodIndex = 0;
	this.currentMethod = this.mainMethods[this.methodIndex];
	this.particle = null;
	this.cx = 0;
	this.cy = 0;
	var _self;

	this.configure = function(){
		_self = this;
		this.canvas = document.getElementById("canvas");
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		this.context = this.canvas.getContext("2d");
		this.cx = this.canvas.width/2;
		this.cy = this.canvas.height/2;
		this.bindEvents();
	}

	this.previousMethod = function(){
		if(_self.methodIndex > 0){
			_self.particle = null;
			_self.methodIndex--;
			_self.currentMethod = _self.mainMethods[_self.methodIndex];
			_self[_self.currentMethod+"Config"]();
		}
	}

	this.nextMethod = function(){
		if(_self.methodIndex < _self.mainMethods.length - 1){
			_self.particle = null;
			_self.methodIndex++;
			_self.currentMethod = _self.mainMethods[_self.methodIndex];
			_self[_self.currentMethod+"Config"]();
		}
	}

	this.bindEvents = function(){
		document.body.addEventListener("keydown", function(e){
			switch(e.keyCode){
				case 37: //left
					_self.previousMethod();
					break;
				case 39: //right
					_self.nextMethod();
					break;
				case 38: //left
					_self.currentMethod = _self.mainMethods[_self.methodIndex];
					_self[_self.currentMethod+"Config"]();
					break;
				default: 
					break;
			}	
		});
	}

	this.anim = function(){
		_self.erase();
		_self[_self.currentMethod](_self.context);
		_self.context.fillText(_self.mainMethods[_self.methodIndex], 100,50);
		requestAnimationFrame(_self.anim);
	}
}

Main.prototype.erase = function(){
	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	canvasGrid.draw(this.canvas, 50, "#CCC")
}

Main.prototype.drawParticle = function(p, r){
	var c = this.context;

	c.beginPath();
	c.fillStyle = "#000";
	//c.arc(x, y, radious, sAngle,eAngle,clockwise);
	c.arc(p.x, p.y, r || 20, 0, Math.PI*2, false);
	c.closePath();
	c.fill();
}

window.onload = function(){
	require(["canvasGrid","slides"], function(required) {

		var main = new Main();
		main.configure();
		main.anim();
	});
}