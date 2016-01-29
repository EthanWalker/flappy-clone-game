(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var CircleCollisionComponent = function(entity, radius) {
    this.entity = entity;
    this.radius = radius;
    this.type = 'circle';
};

CircleCollisionComponent.prototype.collidesWith = function(entity) {
    if (entity.components.collision.type == 'circle') {
        return this.collideCircle(entity);
    }
    else if (entity.components.collision.type == 'rect') {
        if(this.collideRect(entity))
        {
            var a = 1;
        }
        return this.collideRect(entity);
    }
    return false;
};

CircleCollisionComponent.prototype.collideCircle = function(entity) {
    var positionA = this.entity.components.physics.position;
    var positionB = entity.components.physics.position;

    var radiusA = this.radius;
    var radiusB = entity.components.collision.radius;

    var diff = {x: positionA.x - positionB.x,
                y: positionA.y - positionB.y};

    var distanceSquared = diff.x * diff.x + diff.y * diff.y;
    var radiusSum = radiusA + radiusB;

    return distanceSquared < radiusSum * radiusSum;
};

CircleCollisionComponent.prototype.collideRect = function(entity) {
    var clamp = function(value, low, high) {
        if (value < low) {
            return low;
        }
        if (value > high) {
            return high;
        }
        return value;
    };

    var positionA = this.entity.components.physics.position;
    var positionB = entity.components.physics.position;
    var sizeB = entity.components.collision.size;

    var closest = {
        x: clamp(positionA.x, positionB.x - sizeB.x / 2,
                 positionB.x + sizeB.x / 2),
        y: clamp(positionA.y, positionB.y - sizeB.y / 2,
                 positionB.y + sizeB.y / 2)
    };


    var radiusA = this.radius;

    var diff = {x: positionA.x - closest.x,
                y: positionA.y - closest.y};

    var distanceSquared = diff.x * diff.x + diff.y * diff.y;
    return distanceSquared < radiusA * radiusA;
};

exports.CircleCollisionComponent = CircleCollisionComponent;
},{}],2:[function(require,module,exports){
var RectCollisionComponent = function(entity, size) {
    this.entity = entity;
    this.size = size;
    this.type = 'rect';
};

RectCollisionComponent.prototype.collidesWith = function(entity) {
    if (entity.components.collision.type == 'circle') {
        return this.collideCircle(entity);
    }
    else if (entity.components.collision.type == 'rect') {
        return this.collideRect(entity);
    }
    return false;
};

RectCollisionComponent.prototype.collideCircle = function(entity) {
    return entity.components.collision.collideRect(this.entity);
};

RectCollisionComponent.prototype.collideRect = function(entity) {
    var positionA = this.entity.components.physics.position;
    var positionB = entity.components.physics.position;

    var sizeA = this.size;
    var sizeB = entity.components.collision.size;

    var leftA = positionA.x - sizeA.x / 2;
    var rightA = positionA.x + sizeA.x / 2;
    var bottomA = positionA.y - sizeA.y / 2;
    var topA = positionA.y + sizeA.y / 2;

    var leftB = positionB.x - sizeB.x / 2;
    var rightB = positionB.x + sizeB.x / 2;
    var bottomB = positionB.y - sizeB.y / 2;
    var topB = positionB.y + sizeB.y / 2;

    return !(leftA > rightB || leftB > rightA ||
             bottomA > topB || bottomB > topA);
};
exports.RectCollisionComponent = RectCollisionComponent;
},{}],3:[function(require,module,exports){
var PipeGarbageComponent = function(entity) {
    this.entity = entity;
};

PipeGarbageComponent.prototype.deleteNow = false;

exports.PipeGarbageComponent = PipeGarbageComponent;
},{}],4:[function(require,module,exports){
var BirdGraphicsComponent = function(entity) {
    this.entity = entity;
};

BirdGraphicsComponent.prototype.draw = function(context) {
    var position = this.entity.components.physics.position;

    context.save();
    context.translate(position.x, position.y);
    context.beginPath();
    context.arc(0, 0, 0.02, 0, 2 * Math.PI);
    context.fill();
    context.closePath();
    context.restore();
};
exports.BirdGraphicsComponent = BirdGraphicsComponent;
},{}],5:[function(require,module,exports){
var PipeGraphicsComponent = function(entity) {
    this.entity = entity;
};

PipeGraphicsComponent.prototype.draw = function(context) {
    var position = this.entity.components.physics.position;
    var size = this.entity.components.size;
    context.save();
    //context.translate(position.x, position.y);
    context.fillRect((position.x-0.05), (position.y-0.5), 0.1, 1);
    context.restore();
};

exports.PipeGraphicsComponent = PipeGraphicsComponent;
},{}],6:[function(require,module,exports){
var PhysicsComponent = function(entity) {
    this.entity = entity;

    this.position = {
        x: 0,
        y: 0
    };
    this.velocity = {
        x: 0,
        y: 0
    };
    this.acceleration = {
        x: 0,
        y: 0
    };
};

PhysicsComponent.prototype.update = function(delta) {
    this.velocity.x += this.acceleration.x * delta;
    this.velocity.y += this.acceleration.y * delta;

    this.position.x += this.velocity.x * delta;
    this.position.y += this.velocity.y * delta;
};

exports.PhysicsComponent = PhysicsComponent;
},{}],7:[function(require,module,exports){
var physicsComponent = require("../components/physics/physics");
var graphicsComponent = require("../components/graphics/bird");
var collisionComponent = require("../components/collision/circle");

var floor = require('./floor');
var roof = require('./roof');
var stageLeft = require('./stageLeft');

var Bird = function() {
    this.isBird = true;
    var physics = new physicsComponent.PhysicsComponent(this);
    physics.position.y = 0.5;
    physics.acceleration.y = -0.2;

    var graphics = new graphicsComponent.BirdGraphicsComponent(this);
    var collision = new collisionComponent.CircleCollisionComponent(this, 0.002);
    collision.onCollision = this.onCollision.bind(this);

    this.components = {
        graphics: graphics,
        physics: physics,
        collision: collision
    };
};

Bird.prototype.onCollision = function(entity, entities) {
    console.log("bird");
    entities.length = 0;
    entities.push(new Bird(), new floor.Floor(), new roof.Roof(), new stageLeft.StageLeft());
};


exports.Bird = Bird;
},{"../components/collision/circle":1,"../components/graphics/bird":4,"../components/physics/physics":6,"./floor":8,"./roof":10,"./stageLeft":11}],8:[function(require,module,exports){
var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/rect");

var bird = require('./bird');
var roof = require('./roof');
var stageLeft = require('./stageLeft');

var Floor = function() {
    //console.log(bird.Bird.prototype.onCollision);
   // this.onCollision = bird.Bird.prototype.onCollision;
    var physics = new physicsComponent.PhysicsComponent(this);
    physics.position.x = -2.5;
    physics.position.y = -0.5;

    var collision = new collisionComponent.RectCollisionComponent(this, {x: 5, y: 0.5});
    collision.onCollision = this.onCollision.bind(this);

    this.components = {
        physics: physics,
        collision: collision
        
    };
};

Floor.prototype.onCollision = function(entity, entities) {
    if(entity.isBird){
        console.log("floor");
        entities.length = 0;
        entities.push(new bird.Bird(), new Floor(), new roof.Roof(), new stageLeft.StageLeft());
    }
    else{
        //console.log("Disaster averted...");
    }
};


exports.Floor = Floor;
},{"../components/collision/rect":2,"../components/physics/physics":6,"./bird":7,"./roof":10,"./stageLeft":11}],9:[function(require,module,exports){
var physicsComponent = require("../components/physics/physics");
var graphicsComponent = require("../components/graphics/pipe");
var collisionComponent = require("../components/collision/rect");

var Pipe = function(pos) {
    this.isPipe = true;
    var physics = new physicsComponent.PhysicsComponent(this);
    physics.position.x = pos.x;
    physics.position.y = pos.y;
    physics.velocity.x = -0.3;

    var graphics = new graphicsComponent.PipeGraphicsComponent(this);
    var collision = new collisionComponent.RectCollisionComponent(this, {x: 0.1, y: 1});

    this.components = {
        physics: physics,
        graphics: graphics,
        collision: collision
        
    };
};

exports.Pipe = Pipe;
},{"../components/collision/rect":2,"../components/graphics/pipe":5,"../components/physics/physics":6}],10:[function(require,module,exports){
var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/rect");

var bird = require('./bird');
var floor = require('./floor');
var stageLeft = require('./stageLeft');

var Roof = function() {
    //this.onCollision = bird.Bird.prototype.onCollision;

    var physics = new physicsComponent.PhysicsComponent(this);
    physics.position.x = -2.5;
    physics.position.y = 1.4;

    var collision = new collisionComponent.RectCollisionComponent(this, {x: 5, y: 0.5});
    collision.onCollision = this.onCollision.bind(this);

    this.components = {
        physics: physics,
        collision: collision
        
    };
};

Roof.prototype.onCollision = function(entity, entities) {
    if(entity.isBird){
        console.log("roof");
        entities.length = 0;
        entities.push(new bird.Bird(), new floor.Floor(), new Roof(), new stageLeft.StageLeft());
    }
    else{
        //console.log("Disaster averted...");
    }
};


exports.Roof = Roof;
},{"../components/collision/rect":2,"../components/physics/physics":6,"./bird":7,"./floor":8,"./stageLeft":11}],11:[function(require,module,exports){
var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/rect");
var garbageComponent = require("../components/garbage/pipe");

var StageLeft = function() {
    var physics = new physicsComponent.PhysicsComponent(this);
    physics.position.x = -1.5;
    physics.position.y = -0.5;

    var collision = new collisionComponent.RectCollisionComponent(this, {x: 0.5, y: 1});
    collision.onCollision = this.onCollision.bind(this);
    var garbage = new garbageComponent.PipeGarbageComponent();

    this.components = {
        physics: physics,
        collision: collision,
        garbage: garbage
    };
};

StageLeft.prototype.onCollision = function(entity) {
    console.log("Pipe has exited stage left.");
    if(entity.components.garbage){
        entity.components.garbage.deleteNow = true;
    }
    
};

exports.StageLeft = StageLeft;
},{"../components/collision/rect":2,"../components/garbage/pipe":3,"../components/physics/physics":6}],12:[function(require,module,exports){
var graphicsSystem = require('./systems/graphics');
var physicsSystem = require('./systems/physics');
var inputSystem = require('./systems/input');
var pipeSystem = require('./systems/pipe');
var garbageSystem = require('./systems/garbage');

var bird = require('./entities/bird');
var pipe = require('./entities/pipe');
var roof = require('./entities/roof');
var floor = require('./entities/floor');
var stageLeft = require('./entities/stageLeft');


var FlappyBird = function() {
    this.entities = [new bird.Bird(), new floor.Floor(), new roof.Roof(), new stageLeft.StageLeft()];
    this.graphics = new graphicsSystem.GraphicsSystem(this.entities);
    this.physics = new physicsSystem.PhysicsSystem(this.entities);
    this.input = new inputSystem.InputSystem(this.entities);
    this.pipe = new pipeSystem.PipeSystem(this.entities);
    this.garbage = new garbageSystem.GarbageSystem(this.entities);
};

FlappyBird.prototype.run = function() {
    this.graphics.run();
    this.physics.run();
    this.input.run();
    this.pipe.run();
    this.garbage.run();
};

exports.FlappyBird = FlappyBird;
},{"./entities/bird":7,"./entities/floor":8,"./entities/pipe":9,"./entities/roof":10,"./entities/stageLeft":11,"./systems/garbage":15,"./systems/graphics":16,"./systems/input":17,"./systems/physics":18,"./systems/pipe":19}],13:[function(require,module,exports){
var flappyBird = require('./flappy_bird');

document.addEventListener('DOMContentLoaded', function() {    
    var app = new flappyBird.FlappyBird();
    app.run();
});
},{"./flappy_bird":12}],14:[function(require,module,exports){
var CollisionSystem = function(entities) {
    this.entities = entities;
};

CollisionSystem.prototype.tick = function() {
    for (var i=0; i<this.entities.length; i++) {
        var entityA = this.entities[i];
        if (!entityA.components.collision) {
            continue;
        }

        for (var j=i+1; j<this.entities.length; j++) {
            var entityB = this.entities[j];
            if (!entityB.components.collision) {
                continue;
            }

            if (!entityA.components.collision.collidesWith(entityB)) {
                continue;
            }

            if (entityA.components.collision.onCollision) {
                entityA.components.collision.onCollision(entityB, this.entities);
            }

            if (entityB.components.collision.onCollision) {
                entityB.components.collision.onCollision(entityA, this.entities);
            }
        }
    }
};

exports.CollisionSystem = CollisionSystem;
},{}],15:[function(require,module,exports){
// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

var GarbageSystem = function(entities) {
    this.entities = entities;
};

GarbageSystem.prototype.run = function() {
    window.setInterval(this.tick.bind(this), 4000);
};

GarbageSystem.prototype.tick = function() {
    for (var i=0; i<this.entities.length; i++) {
        var entity = this.entities[i];
        if (!entity.components.garbage) {
            continue;
        }
        if (entity.components.garbage.deleteNow) {
            console.log(this.entities.length);
            
            this.entities.remove(i);
            i--;
        }

    }
};
exports.GarbageSystem = GarbageSystem;
},{}],16:[function(require,module,exports){
var GraphicsSystem = function(entities) {
    this.entities = entities;
    this.canvas = document.getElementById('main-canvas');
    // Context is what we draw to
    this.context = this.canvas.getContext('2d');
};

GraphicsSystem.prototype.run = function() {
    // Run the render loop
    window.requestAnimationFrame(this.tick.bind(this));
};

GraphicsSystem.prototype.tick = function() {
    // Set the canvas to the correct size if the window is resized
    if (this.canvas.width != this.canvas.offsetWidth ||
        this.canvas.height != this.canvas.offsetHeight) {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.context.save();
    this.context.translate(this.canvas.width / 2, this.canvas.height);
    this.context.scale(this.canvas.height, -this.canvas.height);

    for (var i=0; i<this.entities.length; i++) {
        var entity = this.entities[i];
        if (!entity.components.graphics) {
            continue;
        }

        entity.components.graphics.draw(this.context);
    }

    this.context.restore();

    window.requestAnimationFrame(this.tick.bind(this));
};

exports.GraphicsSystem = GraphicsSystem;
},{}],17:[function(require,module,exports){
var InputSystem = function(entities) {
    this.entities = entities;

    // Canvas is where we get input from
    this.canvas = document.getElementById('main-canvas');
};

InputSystem.prototype.run = function() {
    this.canvas.addEventListener('click', this.onClick.bind(this));
    this.canvas.addEventListener('touchstart', this.onClick.bind(this));
};

InputSystem.prototype.onClick = function(e) {
    e.preventDefault();
    var bird = this.entities[0];
    bird.components.physics.velocity.y = 0.2;
};

exports.InputSystem = InputSystem;
},{}],18:[function(require,module,exports){
var collisionSystem = require("./collision");
var scoringSystem = require("./scoring");

var PhysicsSystem = function(entities) {
    this.entities = entities;
    this.collisionSystem = new collisionSystem.CollisionSystem(entities);
    this.scoringSystem = new scoringSystem.ScoringSystem(entities);
};

PhysicsSystem.prototype.run = function() {
    // Run the update loop
    window.setInterval(this.tick.bind(this), 1000 /60);
};

PhysicsSystem.prototype.tick = function() {
    for (var i=0; i<this.entities.length; i++) {
        var entity = this.entities[i];
        if (!entity.components.physics) {
            continue;
        }

        entity.components.physics.update(1/60);
    }
    this.collisionSystem.tick();
    this.scoringSystem.tick();
};

exports.PhysicsSystem = PhysicsSystem;
},{"./collision":14,"./scoring":20}],19:[function(require,module,exports){
var pipe = require('../entities/pipe');

var PipeSystem = function(entities) {
    this.entities = entities;
};

PipeSystem.prototype.run = function(){
    window.setInterval(this.tick.bind(this), 2000);
    // console.log("pipe run");
};

PipeSystem.prototype.tick = function(){
    // console.log("pipe tick");
    // new pipe.Pipe({x: 0.5, y: 0}), new pipe.Pipe({x: 0.5, y: 0.6})
    var randomNum = ((Math.random() * 0.8) - 0.4);
    this.entities.push(new pipe.Pipe({x: 0.5, y: randomNum - 0.8}), new pipe.Pipe({x: 0.5, y: (randomNum + 0.8)}));
};


exports.PipeSystem = PipeSystem;
},{"../entities/pipe":9}],20:[function(require,module,exports){
var ScoringSystem = function(entities) {
    this.entities = entities;
};

ScoringSystem.prototype.tick = function(){
    //birdX - birdRadius > pipeX+ .5pipeSizeX
};


exports.ScoringSystem = ScoringSystem;
},{}]},{},[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]);
