'use strict';

function Snake(gameArea, spawner) {
    this.points = 0;
    this.maxSegments = 4;
    this.moveIntervalMs = 100;
    this.direction = CONST.UP;
    this.gameArea = gameArea;
    this.spawner = spawner;
    this.directionBuffer = [];

    // Head first. [X, Y]
    this.segments = [
        [25, 22],
        [25, 23],
        [25, 24],
        [25, 25]
    ];

    setInterval(this.update.bind(this), this.moveIntervalMs);
}

Snake.prototype = {

    update: function() {
        var wo = this.gameArea.wallOffsets;

        // Apply new direction
        if (this.directionBuffer.length) {
            var direction = this.directionBuffer.shift();
            var turn = Math.abs(direction - this.direction);
            console.log(turn);
            if ( turn !== 0 && turn !== 2) {
                this.direction = direction;
            }
        }

        // Walls too small:
        if (wo.top + wo.bottom > 50 ||
            wo.left + wo.right > 50) {
            this.gameover();
        }

        var loc = this.getNewHeadLocation();

        // Crash into wall?
        // Move opposite wall closer.
        if (loc[0] <= wo.left) {
            wo.right += 7;
            this.segments = this.segments.reverse();
            this.direction = CONST.RIGHT;
            return;
        }

        if (loc[1] <= wo.top) {
            wo.bottom += 7;
            this.segments = this.segments.reverse();
            this.direction = CONST.DOWN;
            return;
        }

        if (loc[0] >= CONST.WIDTH - 1 - wo.right) {
            wo.left += 7;
            this.segments = this.segments.reverse();
            this.direction = CONST.LEFT;
            return;
        }

        if (loc[1] >= CONST.HEIGHT - 1 - wo.bottom) {
            wo.top += 7;
            this.segments = this.segments.reverse();
            this.direction = CONST.UP;
            return;
        }

        var spawn = this.spawner.getSpawnAt(loc);
        if (spawn) {
            this.spawner.removeSpawn(spawn);
            this.maxSegments += 3;
            this.points += spawn.points;
            document.querySelector('var').innerHTML = this.points;
        }

        // Crash into self?
        for (var i = 1, m = this.segments.length; i < m; i++) {
            if (this.segments[i][0] === loc[0] && this.segments[i][1] === loc[1]) {
                this.gameover();
            }
        }

        // Prepend new head.
        this.segments.unshift(loc);

        // Trim the tail.
        if (this.maxSegments < this.segments.length) {
            this.segments.length = this.maxSegments;
        }
    },

    // Lazy.
    gameover: function() {
        alert('GAME OVER\nPlay again?');
        location.reload(false);
    },

    getNewHeadLocation: function() {
        var h = this.segments[0];

        // Up, Right, Down, Left = 0, 1, 2, 3.
        switch (this.direction) {
            case CONST.UP: return [h[0], h[1] - 1];
            case CONST.RIGHT: return [h[0] + 1, h[1]];
            case CONST.DOWN: return [h[0], h[1] + 1];
            case CONST.LEFT: return [h[0] - 1, h[1]];
        }
    },

    draw: function(context, s) {

        for (var i = 0, m = this.segments.length; i < m; i++) {
            var seg = this.segments[i];
            context.fillRect(seg[0]*s, seg[1]*s, s, s);
        }
    }


};
