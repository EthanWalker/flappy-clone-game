var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/rect");
var garbageComponent = require("../components/garbage/pipe");

var StageLeft = function() {
    var physics = new physicsComponent.PhysicsComponent(this);
    physics.position.x = -50;
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