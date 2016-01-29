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