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
        console.log("Disaster averted...");
    }
};


exports.Floor = Floor;