// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

var GarbageSystem = function(entities) {
    this.entities = entities;
};

GarbageSystem.prototype.run = function() {
    window.setInterval(this.tick.bind(this), 4000);
};

GarbageSystem.prototype.tick = function() {
    for (var i=0; i<this.entities.length; i++) {
        var entity = this.entities[i];
        if (!entity.components.garbage) {
            continue;
        }
        if (entity.components.garbage.deleteNow) {
            console.log(this.entities.length);
            
            this.entities.remove(i);
            i--;
        }

    }
};
exports.GarbageSystem = GarbageSystem;