function Spawner(gameArea, draw) {
    this.gameArea = gameArea;
    this.draw = draw;
    this.spawnFoodAfterDelay();
    this.spawns = [];
}

Spawner.prototype = {

    randomBetween: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },

    spawnFoodAfterDelay: function() {
        // Should be 4 10, but thats boring.
        var secondsDelay = this.randomBetween(2, 6);
        setTimeout(this.spawnFood.bind(this), secondsDelay * 1000);
    },

    spawnFood: function() {
        var location = this.getLocation();
        var spawn = new Spawn(location, 1);
        this.spawns.push(spawn);
        this.draw.register(spawn);
        this.spawnFoodAfterDelay();
    },

    getLocation: function() {
        var wo = this.gameArea.wallOffsets;
        var randomX = this.randomBetween(wo.left, CONST.WIDTH - wo.left - wo.right);
        var randomY = this.randomBetween(wo.top, CONST.HEIGHT - wo.top - wo.bottom);
        // TODO: Check if spawn does not overlap existing spawns or snake.
        return [randomX, randomY];
    },

    getSpawnAt: function(loc) {
        for (var i = 0, m = this.spawns.length; i < m; i++) {
            if (this.spawns[i].location[0] === loc[0] && this.spawns[i].location[1] === loc[1]) {
                return this.spawns[i];
            }
        }
        return null;
    },

    removeSpawn: function(spawn) {
        var index = this.spawns.indexOf(spawn);
        this.spawns.splice(index, 1);
        this.draw.unregister(spawn);
    }

};
