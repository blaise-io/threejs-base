'use strict';

function ContextDummy() {

}

ContextDummy.prototype = {
    fillRect: function(x, y, w, h) {

        var geometry, material, cube;

        geometry = new THREE.BoxGeometry(w, h, CONST.TILE_SIZE);
        material = new THREE.MeshPhongMaterial({
            shininess: 5,
            color: 0xff0000,
            opacity: 0.5,
            transparent: true,
            side: THREE.DoubleSide
        });

        cube = new THREE.Mesh(geometry, material);
        cube.position.set(
            (-x - (w / 2)) + (CONST.WIDTH * CONST.TILE_SIZE / 2) ,
            (-y - (h / 2)) + (CONST.HEIGHT * CONST.TILE_SIZE / 2),
            0
        );

        cube.userData.rm = true;
        scene.add(cube);
    },
    arc: function(x, y, radius) {
        var geometry, material, cube;

        geometry = new THREE.SphereGeometry(radius);
        material = new THREE.MeshPhongMaterial({
            shininess: 5,
            color: 0xffffff
        });

        cube = new THREE.Mesh(geometry, material);
        cube.position.set(
            (-x - (radius / 2)) + (CONST.WIDTH * CONST.TILE_SIZE / 2) ,
            (-y - (radius / 2)) + (CONST.HEIGHT * CONST.TILE_SIZE / 2),
            0
        );

        cube.userData.rm = true;
        scene.add(cube);
    },
    beginPath: function() {

    },
    fill: function() {

    }
};



function Draw() {
    this.drawList = [];

    this.context = new ContextDummy();
}

Draw.prototype = {

    register: function(thing) {
        this.drawList.push(thing);
    },

    unregister: function(thing) {
        var index = this.drawList.indexOf(thing);
        this.drawList.splice(index, 1);
    },

    clearScene: function() {
        for (var i = 0; i < scene.children.length; i++) {
            if (scene.children[i].userData.rm) {
                scene.remove(scene.children[i]);
            }
        }
    },

    drawThings: function() {
        this.clearScene();
        for (var i = 0, m = this.drawList.length; i < m; i++) {
            this.drawList[i].draw(this.context, CONST.TILE_SIZE, CONST.WIDTH, CONST.HEIGHT);
        }
    }

};
