var PipeGarbageComponent = function(entity) {
    this.entity = entity;
};

PipeGarbageComponent.prototype.deleteNow = false;

exports.PipeGarbageComponent = PipeGarbageComponent;