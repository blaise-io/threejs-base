'use strict';

function Spawn(location, points) {
    this.location = location;
    this.points = points;
}

Spawn.prototype = {

    draw: function(context, s) {
        var loc = this.location;
        context.beginPath();
        context.arc((loc[0] * s) + (s / 2), (loc[1] * s) + (s / 2), s / 2, 0, 2 * Math.PI);
        context.fillStyle = '#000';
        context.fill();
    }

};
