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