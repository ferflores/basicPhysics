
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
	this.drawParticle(this.particle);
}

Main.prototype.linearMovementConfig = function(){
	this.particle = {
		x:0,
		y:this.cy
	}
}

Main.prototype.linearMovement = function(){
	this.drawParticle(this.particle);

	this.particle.x++;
}

Main.prototype.directionAngleConfig = function(){

	var velocity = {
		angle: 45 * Math.PI/180,
		length: 5
	}

	this.particle = {
		x:this.cx,
		y:this.cy,
		vx: Math.cos(velocity.angle) * velocity.length,
		vy: Math.sin(velocity.angle) * velocity.length
	}
}

Main.prototype.directionAngle = function(){

	this.drawParticle(this.particle);

	this.particle.x += this.particle.vx;
	this.particle.y += this.particle.vy;

}

Main.prototype.accelerationConfig = function(){
	var velocity = {
		angle: 45 * Math.PI/180,
		length: 5
	}

	this.particle = {
		x:0,
		y:this.cy,
		vx: Math.cos(velocity.angle) * velocity.length,
		vy: 0,
		acceleration: 1
	}
}

Main.prototype.acceleration = function(){

	this.drawParticle(this.particle);

	this.particle.x += this.particle.vx;

	this.particle.vx += this.particle.acceleration;
}

Main.prototype.gravityConfig = function(){
	var velocity = {
		angle: 270 * Math.PI/180,
		length: 10
	}

	this.particle = {
		x:this.cx,
		y:this.cy,
		vx: 0,
		vy: Math.sin(velocity.angle) * velocity.length,
		gravity: .2
	}
}

Main.prototype.gravity = function(){

	this.drawParticle(this.particle);

	this.particle.y += this.particle.vy;

	this.particle.vy += this.particle.gravity;
}

Main.prototype.fireworksConfig = function(){

	this['particles'] = [];

	for (var i = 0; i < 100; i++) {
		var velocity = {
			randomAngle : Math.random()*Math.PI*2,
			randomSpeed : Math.random()*10
		}

		this.particles.push({
			x:this.cx,
			y:this.cy,
			vx: Math.cos(velocity.randomAngle)*velocity.randomSpeed,
			vy: Math.sin(velocity.randomAngle)*velocity.randomSpeed,
			gravity:.2
		})
	}
}

Main.prototype.fireworks = function(){

	for (var i = 0; i < this.particles.length; i++) {
		this.drawParticle(this.particles[i], 5);
		this.particles[i].x += this.particles[i].vx;
		this.particles[i].y += this.particles[i].vy;
		this.particles[i].vy += this.particles[i].gravity;
	};
}