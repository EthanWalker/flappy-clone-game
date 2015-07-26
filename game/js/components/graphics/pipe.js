var PipeGraphicsComponent = function(entity) {
    this.entity = entity;
};

PipeGraphicsComponent.prototype.draw = function(context) {
    var position = this.entity.components.physics.position;

    context.save();
    context.translate(position.x, position.y);
    context.fillRect(0, 0, 0.1, 1);
    context.restore();
};

exports.PipeGraphicsComponent = PipeGraphicsComponent;