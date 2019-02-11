
// Initial Setup
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;



var colorArray=[];
    for (var j=1;j<600;j++){
        
        const values=[1,2,3,4,5,6,7,8,9,"A","B","C","D","E","F"];
        var hexColor="#";
        for (let i=0;i<6;i++){
            var random=Math.floor(Math.random()*values.length);
            hexColor+=values[random];
        }
        colorArray.push(hexColor);
    }
    
const gravity = 0.2;
const friction = 0.88;


// Event Listeners
addEventListener("mousemove", function(event) {
	mouse.x = event.clientX;
	mouse.y = event.clientY;
});

addEventListener("resize", function() {
	canvas.width = innerWidth;	
	canvas.height = innerHeight;
  init();
});

addEventListener("click", function(event) {
	init();
});


// Utility Functions
function randomIntFromRange(min,max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

// function randomColor(colors) {
// 	return colors[Math.floor(Math.random() * colors.length)];
// }


// Objects
function Ball(x, y, dx, dy, radius) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
    this.color = colorArray[Math.floor(Math.random()*colorArray.length)];
   

	this.update = function() {
        //his.y + this.radius + this.dy prevents ball getting caught at the bottom
		if (this.y + this.radius + this.dy> canvas.height) {
			this.dy = -this.dy;
			this.dy = this.dy * friction;
			this.dx = this.dx * friction;
		} else {
			this.dy += gravity;
		}

		if (this.x + this.radius >= canvas.width || this.x - this.radius <= 0) {
			this.dx = -this.dx * friction;
		}

		this.x += this.dx;
		this.y += this.dy;
		this.draw();
	};

	this.draw = function() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);	
		c.fillStyle = this.color;
		c.fill();
		c.stroke();
		c.closePath();
	};
}


// Implementation
var ballArray = [];

function init() {
	ballArray = [];

	for (let i = 0; i < 600; i++) {
        var radius = randomIntFromRange(8, 20);
        //range from 0 will prevent pawning at the age
		var x = randomIntFromRange(radius, canvas.width - radius);//(-radius)will prevent balls being caught
		var y = randomIntFromRange(0, canvas.height - radius);
		var dx = randomIntFromRange(-3, 3)
		var dy = randomIntFromRange(-2, 2)
	    ballArray.push(new Ball(x, y, dx, dy, radius));
	}
}

// Animation Loop
function animate() {
	requestAnimationFrame(animate);

	c.clearRect(0, 0, canvas.width, canvas.height);

	for (let i = 0; i < ballArray.length; i++) {
		ballArray[i].update();
	}
}

init();
animate();
