var canvasGrid = {

	draw: function (canvas, lineDistance, color) {
		var c = canvas.getContext("2d");

		c.beginPath();
		c.lineWidth = 1;
		c.strokeStyle = color;

		var currentX = 0;

		while(currentX < canvas.width + lineDistance){
			c.moveTo(currentX, 0);
			c.lineTo(currentX, canvas.height);
			currentX += lineDistance;
		}

		var currentY = 0;

		while(currentY < canvas.height + lineDistance){
			c.moveTo(0, currentY);
			c.lineTo(canvas.width, currentY);
			currentY += lineDistance;
		}

		c.closePath();
		c.stroke();

		c.font="20px Arial";
		c.fillStyle = "#000000"
		c.fillText("0,0",7,28);

		c.fillText(canvas.width + "px", canvas.width-70, 28);
		c.fillText(canvas.height + "px", 10, canvas.height-28);
		c.fillStyle = "#909090"
		c.arc(canvas.width/2, canvas.height/2,5,0,Math.PI*2,false);
		c.fill();
	}
}