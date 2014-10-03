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

	var particle = p || this.particle;

	c.beginPath();
	c.fillStyle = "#000";
	//c.arc(x, y, radious, sAngle,eAngle,clockwise);
	c.arc(particle.x, particle.y, r || 20, 0, Math.PI*2, false);
	c.closePath();
	c.fill();
}

Main.prototype.commonCoordsConfig = function(){
}

Main.prototype.commonCoords = function(){
	var context = this.context;

	context.fillStyle = "#000000";
	context.fillText(this.cx + "px,"+this.cy+"px", this.cx-50, this.cy+20);

	context.beginPath();
	context.lineWidth = 5;
	context.strokeStyle = "#000000"
	context.moveTo(this.cx, this.cy);
	context.lineTo(this.cx,this.cy-250);
	context.moveTo(this.cx, this.cy);
	context.lineTo(this.cx + 250, this.cy);
	context.closePath();
	context.stroke();


	context.fillText("x", this.cx+260, this.cy);
	context.fillText("y", this.cx, this.cy-260);

}

Main.prototype.particleCenterConfig = function(){
	this.particle = {
		x:this.cx,
		y:this.cy
	}
}

Main.prototype.particleCenter = function(){
	this.drawParticle();
}

Main.prototype.linearMovementConfig = function(){
	this.particle = {
		x:0,
		y:this.cy
	}
}

Main.prototype.linearMovement = function(){
	this.drawParticle();

	this.particle.x++;
}

Main.prototype.directionAngleConfig = function(){
	var angle = 45 * Math.PI/180;
	var speed = 5;

	this.particle = {
		x:this.cx,
		y:this.cy,
		vx: Math.cos(angle) * speed,
		vy: Math.sin(angle) * speed
	}
}

Main.prototype.directionAngle = function(){

	this.drawParticle();

	this.particle.x += this.particle.vx;
	this.particle.y += this.particle.vy;

}

Main.prototype.accelerationConfig = function(){
	var angle = 0;
	var speed = 5;

	this.particle = {
		x:100,
		y:this.cy,
		vx: Math.cos(angle) * speed,
		vy: 0,
		acceleration: .5
	}
}

Main.prototype.acceleration = function(){

	this.drawParticle();

	this.particle.x += this.particle.vx;

	this.particle.vx += this.particle.acceleration;
}

Main.prototype.gravityConfig = function(){
	var angle = 270;
	var speed = 50;

	this.particle = {
		x:this.cx,
		y:this.cy,
		vx: 0,
		vy: Math.sin(angle) * speed,
		gravity: .2
	}
}

Main.prototype.gravity = function(){

	this.drawParticle();

	this.particle.y += this.particle.vy;

	this.particle.vy += this.particle.gravity;
}

Main.prototype.fireworksConfig = function(){

	this['particles'] = [];

	for (var i = 0; i < 100; i++) {
		var randomAngle = Math.random()*Math.PI*2;
		var randomSpeed = Math.random()*10;
		this.particles.push({
			x:this.cx,
			y:this.cy,
			vx: Math.cos(randomAngle)*randomSpeed,
			vy: Math.sin(randomAngle)*randomSpeed,
			gravity:.2
		})
	}
}

Main.prototype.fireworks = function(){

	for (var i = 0; i < this.particles.length; i++) {

		this.particles[i].x += this.particles[i].vx;
		this.particles[i].y += this.particles[i].vy;
		this.particles[i].vy += this.particles[i].gravity;
		this.drawParticle(this.particles[i], 5);
	};
}

window.onload = function(){
	require(["canvasGrid"], function(required) {

		var main = new Main();
		main.configure();
		main.anim();
	});
}