var pipe = require('../entities/pipe');

var PipeSystem = function(entities) {
    this.entities = entities;
};

PipeSystem.prototype.run = function(){
    window.setInterval(this.tick.bind(this), 2000);
    // console.log("pipe run");
};

PipeSystem.prototype.tick = function(){
    // console.log("pipe tick");
    // new pipe.Pipe({x: 0.5, y: 0}), new pipe.Pipe({x: 0.5, y: 0.6})
    var randomNum = ((Math.random() * 0.8) - 0.4);
    this.entities.push(new pipe.Pipe({x: 0.5, y: randomNum - 0.8}), new pipe.Pipe({x: 0.5, y: (randomNum + 0.8)}));
};


exports.PipeSystem = PipeSystem;