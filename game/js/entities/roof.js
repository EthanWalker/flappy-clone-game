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