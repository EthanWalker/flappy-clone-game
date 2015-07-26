var graphicsComponent = require("../components/graphics/pipe");
var physicsComponent = require("../components/physics/physics");

var Pipe = function(pos) {
    var physics = new physicsComponent.PhysicsComponent(this);
    physics.position.x = pos.x;
    physics.position.y = pos.y;
    physics.velocity.x = -0.3;

    var graphics = new graphicsComponent.PipeGraphicsComponent(this);
    this.components = {
        graphics: graphics,
        physics: physics
    };
};

exports.Pipe = Pipe;