var screen_width,screen_height;
var circle;
var lines;
var pos;
var bg_color;


var numX = 14;
var numY = 3;

function setup(){

	screen_width  = window.outerWidth;
	screen_height = window.innerHeight;
	createCanvas(screen_width, screen_height);
	smooth();
	colorMode(HSB);

	bg_color = color('rgb(4,19,57)');

	lines = new Lines();


	circle = new Array(numY);
	pos  = new Array(numY);
	for(var j=0; j<circle.length; j++){
		circle[j] = new Array(numX);
		pos[j] = new Array(numX);
	}

	for(var i=0; i<circle.length; i++){
		for(var j=0; j<circle[i].length; j++){
			circle[i][j] = new Circle(j*110-20,i*110+75,160+j*10);
			pos[i][j] = createVector(j*110-20, i*110+75);
		}
	}

}

function draw(){

	background(bg_color);

	for(var i=0; i<circle.length; i++){
		for(var j=0; j<circle[i].length; j++){
			circle[i][j].update();
			circle[i][j].display();
		}
	}


	lines.display();
	lines.update();

}


function mousePressed(){
}

function Lines(){

	this.selected = [];
	for(var i=0; i< numX ; i++){
		this.selected[i] = floor( random(0,3) ); 
	}

	this.count = 0;
	this.visible=[];
	for(var i=0; i< numX ; i++){
		this.visible[i] = false;
	}

	this.update = function(){
		if(frameCount %30 == 0){
			this.visible[this.count] = true;
			this.count++;
		}
	}



	this.display = function(){

		for(var j=0 ; j<numX ; j++){
			if(this.visible[j] == false) return;

			var p = this.selected[j];
			var q = this.selected[j-1];

			stroke(255);
			if(j!=0)
				line(pos[p][j].x,pos[p][j].y,pos[q][j-1].x,pos[q][j-1].y);
			fill(255);
			ellipse(pos[p][j].x,pos[p][j].y,10,10);

		}

	}

}


function Circle(x_,y_,c_){

	this.x = x_;
	this.y = y_;

	this.w = 50;
	this.dw =random(0,1);
	this.count = true;

	this.h = c_;
	this.alpha = 0.5;

	this.update = function(){

		this.alpha = map(this.w, 50, 80, 0.8, 0.4);

		if(this.w >= 75) this.w = 75;
		if(this.w <= 50) this.w = 50;

		if(this.dw >= 1){
			this.count = !this.count;
			this.dw = 0;
		}

		if(this.count) {
			this.dw += 0.0025;
			this.w = 25 * easingOut(this.dw) + 50;
		}else if(!this.count){
			this.dw += 0.0075;
			this.w = 75 - 25 * easingOut(this.dw);
		}

	}

	this.display = function(){

		var c = color('hsba('+this.h+',30%,50%,'+this.alpha+')');

				fill(c);
				noStroke();
				ellipse(this.x,this.y,100,100);

				fill(bg_color);
				ellipse(this.x,this.y,this.w,this.w);

				}
				}


				function easingOut(t_){

					var t = --t_;
					var s = 1.70158;
					return t * t * ((s + 1.0) * t + s) + 1.0;

				}
