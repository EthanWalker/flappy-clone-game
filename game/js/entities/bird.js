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