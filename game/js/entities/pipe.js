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