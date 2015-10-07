// Rotating Rectangle
//===================
paper.project.clear();

var path = new paper.Path.Rectangle(new paper.Point(50, 50), new paper.Size(500, 50));
path.style = {
	fillColor: 'orange',
	strokeColor: 'blue'
};
function update (event) {
  var bounds = sampler.bounds,
      cx = bounds.x + bounds.width / 2,
      cy = bounds.y + bounds.height / 2;

path.rotate(1);
  path.position = [cx, cy];
}

// Color Phasing Rectangle
//========================

paper.project.clear();

  var c = new paper.Path.Rectangle({
    width: 600,
    height: 800,
    fillColor: {
      hue: (0.1) * 360.0,
      saturation: 1.0,
      brightness: 0.5
    }
  });


function update (event) {
  var bounds = sampler.bounds,
      cx = bounds.x + bounds.width / 2,
      cy = bounds.y + bounds.height / 2;

  c.position = [cx, cy];
  c.fillColor.hue = Math.abs(Math.sin(event.time/3)) * 30 + 10;

}


// Speed Text
//============
paper.project.clear();

var bounds = sampler.bounds,
    scale = Math.floor(bounds.width / config.width),
    start_pos = bounds.x + bounds.width;
// make text global for future tweaks
speed = new paper.Point([-20.0, 0.0]);
text = new paper.PointText({
  point: [0, 0],
  content: "____________________,,,,,,,,,,,,,,,,.................----------------=============='''''''''```````````''''''''''''===========-----------................___________________",
  fillColor: "#09F",
  fontFamily: "LoResNineNarrowSC",
  fontSize: 9,
});

group = new paper.Group(text);

function startPosition() {
  return bounds.x + bounds.width + text.bounds.width / 2.0;
}

text.scale(scale);
text.position = [startPosition(), bounds.y + bounds.height / 2];

function update (event) {
  text.position.x += speed.x;
  text.position.y += speed.y;
  if(text.position.x < - text.bounds.width / 2.0) {
    text.position.x = startPosition();
  }
  text.fillColor.hue = Math.abs(Math.sin(event.time))*360;
}


// Spastic Text
//============
paper.project.clear();

  var c = new paper.Path.Rectangle({
    width: 600,
    height: 800,
    fillColor: {
      hue: (0.1) * 360.0,
      saturation: 1.0,
      brightness: 0.5
    }
  });

var bounds = sampler.bounds,
    scale = Math.floor(bounds.width / config.width),
    start_pos = bounds.x + bounds.width;
// make text global for future tweaks
speed = new paper.Point([-10.0, 0.0]);
text = new paper.PointText({
  point: [0, 0],
  content: "Good Morning",
  fillColor: "#09F",
  fontFamily: "LoResNineNarrowSC",
  fontSize: 12,
});

group = new paper.Group(text);

function startPosition() {
  return bounds.x + bounds.width + text.bounds.width / 2.0;
}

text.scale(scale);
text.position = [startPosition(), bounds.y + bounds.height / 2];

function update (event) {
  var bounds = sampler.bounds,
      cx = bounds.x + bounds.width / 2,
      cy = bounds.y + bounds.height / 2;
  
  c.position = [cx, cy];
  c.fillColor.hue = 180 + Math.abs(Math.sin(event.time/2)) * 120;
  
  text.position.x += speed.x;
  text.position.y += speed.y;
  if(text.position.x < - text.bounds.width / 2.0) {
    text.position.x = startPosition();
  }
  text.fillColor.hue = Math.abs(Math.sin(event.time/2))*120;

  
}


// Undulation - CURRENTLY NOT WORKING
//========================

paper.project.clear();

var width, height, center;
var points = 10;
var smooth = true;
var path = new Path();
var mousePos = view.center / 2;
var pathHeight = mousePos.y;
path.fillColor = 'black';
initializePath();

function initializePath() {
  center = view.center;
  width = view.size.width;
  height = view.size.height / 2;
  path.segments = [];
  path.add(view.bounds.bottomLeft);
  for (var i = 1; i < points; i++) {
    var point = new Point(width / points * i, center.y);
    path.add(point);
  }
  path.add(view.bounds.bottomRight);
  path.fullySelected = true;
}

function onFrame(event) {
  pathHeight += (center.y - mousePos.y - pathHeight) / 10;
  for (var i = 1; i < points; i++) {
    var sinSeed = event.count + (i + i % 10) * 100;
    var sinHeight = Math.sin(sinSeed / 200) * pathHeight;
    var yPos = Math.sin(sinSeed / 100) * sinHeight + height;
    path.segments[i].point.y = yPos;
  }
  if (smooth)
    path.smooth();
}

function onMouseMove(event) {
  mousePos = event.point;
}

function onMouseDown(event) {
  smooth = !smooth;
  if (!smooth) {
    // If smooth has been turned off, we need to reset
    // the handles of the path:
    for (var i = 0, l = path.segments.length; i < l; i++) {
      var segment = path.segments[i];
      segment.handleIn = segment.handleOut = null;
    }
  }
}

// Reposition the path whenever the window is resized:
function onResize(event) {
  initializePath();
}


// Animation


paper.project.clear();

// Animation
var mario,
  marioImage,
  canvas;         

function sprite (options) {

  var that = {},
    frameIndex = 0,
    tickCount = 0,
    ticksPerFrame = options.ticksPerFrame || 0,
    numberOfFrames = options.numberOfFrames || 1;
  
  that.context = options.context;
  that.width = options.width;
  that.height = options.height;
  that.image = options.image;
  
  that.update = function () {

          tickCount += 1;

          if (tickCount > ticksPerFrame) {

      tickCount = 0;
      
              // If the current frame index is in range
              if (frameIndex < numberOfFrames - 1) {  
                  // Go to the next frame
                  frameIndex += 1;
              } else {
                  frameIndex = 0;
              }
          }
      };
  
  that.render = function () {
  
    // Clear the canvas
    that.context.clearRect(0, 0, that.width, that.height);
    
    // Draw the animation
    that.context.drawImage(
      that.image,
      frameIndex * that.width / numberOfFrames,
      0,
      that.width / numberOfFrames,
      that.height,
      1360,
      50,
      that.width / numberOfFrames *4.5,
      that.height * 4.5);
  };
  
  return that;
}

// Get canvas
canvas = document.getElementById("paper_canvas");

// Create sprite sheet
marioImage = new Image();  

// Create sprite
mario = sprite({
  context: canvas.getContext("2d"),
  width: 270,
  height: 160,
  image: marioImage,
  numberOfFrames: 3,
  ticksPerFrame: 4
});

// Load sprite sheet
marioImage.src = "data:image/png;base64,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";

function update (event) {
  var bounds = sampler.bounds,
      cx = bounds.x + bounds.width / 2,
      cy = bounds.y + bounds.height / 2;

  mario.update();
  mario.render();

}


///RANDO

paper.project.clear();

function createCircle(time, iPosition) {
  var c = new paper.Path.Circle({
    radius: 100,
    position: iPosition,
    fillColor: {
      hue: (Math.sin(time)) * 360.0,
      saturation: 1.0,
      brightness: 1.0
    }
  });
  return c;
}

//var myCircle = createCircle();

var circles = [];


function update (event) {
  var bounds = sampler.bounds,
      cx = bounds.x + bounds.width / 2,
      cy = bounds.y + bounds.height / 2;

  circles.push( createCircle(event.time, [cx, cy]) )

  
  for (var i in circles) {
    var c = circles[i];
    c.fillColor.brightness -= 0.1; 
  }

}

///Movement

if (window.location.hash && window.location.hash == '#san') {
  var points = { 'x': 6, 'y': 8 };
} else {
  var points = { 'x': 10, 'y': 15 };
}

paper.project.clear();

var bounds = sampler.bounds,
      cx = bounds.x + bounds.width / 2,
      cy = bounds.y + bounds.height / 2;

var w = bounds.width/points.x;
var h = bounds.height/points.y;


function Crawler () {
  var r = 35
  this.object = new paper.Path.Circle({
      radius: r,
      position: [w/2+w + bounds.x, r + h/2+h+bounds.y],
      fillColor: {
        hue: 360.0,
          saturation: 1.0,
        brightness: 0.5
      }
    });

  this.currentPosition = this.object.position;
  this.direction = [0,0];
  this.steps = 40;

  this.findNextPosition = function () {
    var distance = Math.round(Math.random() * 15)+1;

    var direction = Math.random();
    if (direction >= 0.75) {
      // go left
      var increment = distance * w / this.steps;
      this.direction = [-increment,0];
    } else if ( direction >= 0.5) {
      //go down
      var increment = distance * h / this.steps;
      this.direction = [0, increment];
    } else if ( direction >= 0.25) {
      //go right
      var increment = distance * w / this.steps;
      this.direction = [increment,0];
    } else {
      //go up
      var increment = distance * h / this.steps;
      this.direction = [0,-increment];
    }
  }

  this.move = function() {
    if (this.steps == 0) {
      this.steps = 80;
      //find next position
      this.direction = [0,0];
      this.findNextPosition();
    }

    var currentPosition = this.object.position;

    if (currentPosition.x <= bounds.x+r || currentPosition.x >= bounds.x+bounds.width-r || currentPosition.y <= bounds.y+r || currentPosition.y >= bounds.y+bounds.height-r) {
      this.direction = [this.direction[0] * -1, this.direction[1] * -1];
    }

    this.object.position = [currentPosition.x + this.direction[0], currentPosition.y + this.direction[1]];
    --this.steps;
  };
}


var lights = [];

for (var i = 0; i < points.x; i++) {
  var row = [];
  for (var j = 0; j < points.y; j ++) {
    var c = new paper.Path.Circle({
      radius: 10,
      fillColor: {
        hue: (j/points.y) * 160.0,
          saturation: 1.0,
        brightness: 0.2
      }
    });
    c.position = [w/2 + bounds.x + w*i, h/2 + bounds.y + h*j];
    row.push(c);
  }
  lights.push(row);
}

var crawler = new Crawler();


function update (event) {

  for (var r in lights) {
    for (var l in lights[r]) {
      var light = lights[r][l];
      var timePhase = (Math.sin(event.time)+1)/2 * 160;
      var pPhase = l/points.y * 160;
      light.fillColor.hue = timePhase + pPhase;

    }
  }

  crawler.move();

}


/// sand 

if (window.location.hash && window.location.hash == '#san') {
  var points = { 'x': 6, 'y': 8 };
} else {
  var points = { 'x': 10, 'y': 15 };
}

paper.project.clear();

var bounds = sampler.bounds,
      cx = bounds.x + bounds.width / 2,
      cy = bounds.y + bounds.height / 2;

var w = bounds.width/points.x;
var h = bounds.height/points.y;


function Crawler () {
  var r = 65
  this.object = new paper.Path.Circle({
      radius: r,
      position: [w+w/2+bounds.x, h+h/2+bounds.y],
      fillColor: {
        hue: 360.0,
          saturation: 1.0,
        brightness: 0.5
      }
    });

  this.currentPosition = this.object.position;
  this.direction = [0,0];
  this.steps = 40;

  this.findNextPosition = function () {
    var distance = Math.floor(Math.random() * 12)+1;

    var direction = Math.random();
    if (direction >= 0.75) {
      // go left
      var increment = distance * w / this.steps;
      this.direction = [-increment,0];
    } else if ( direction >= 0.5) {
      //go down
      var increment = distance * h / this.steps;
      this.direction = [0, increment];
    } else if ( direction >= 0.25) {
      //go right
      var increment = distance * w / this.steps;
      this.direction = [increment,0];
    } else {
      //go up
      var increment = distance * h / this.steps;
      this.direction = [0,-increment];
    }
  }

  this.move = function() {
    if (this.steps == 0) {
      this.steps = 80;
      //find next position
      this.direction = [0,0];
      this.findNextPosition();
    }

    var currentPosition = this.object.position;

    if (currentPosition.x <= bounds.x || currentPosition.x >= bounds.x+bounds.width || currentPosition.y <= bounds.y || currentPosition.y >= bounds.y+bounds.height) {
      this.direction = [this.direction[0] * -1, this.direction[1] * -1];
    }

    this.object.position = [currentPosition.x + this.direction[0], currentPosition.y + this.direction[1]];
    --this.steps;
  };
}


var lights = [];

for (var i = 0; i < points.x; i++) {
  var row = [];
  for (var j = 0; j < points.y; j ++) {
    var c = new paper.Path.Circle({
      radius: 10,
      fillColor: {
        hue: (j/points.y) * 160.0,
          saturation: 1.0,
        brightness: 0.2
      }
    });
    c.position = [w/2 + bounds.x + w*i, h/2 + bounds.y + h*j];
    row.push(c);
  }
  lights.push(row);
}

var crawler = new Crawler();


function update (event) {

  for (var r in lights) {
    for (var l in lights[r]) {
      var light = lights[r][l];
      var timePhase = (Math.sin(event.time)+1)/2 * 160;
      var pPhase = l/points.y * 160;
      light.fillColor.hue = timePhase + pPhase;

    }
  }

  crawler.move();

}







