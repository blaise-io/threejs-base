'use strict';

var GameArea = function() {


    var geometry = new THREE.PlaneGeometry(
        CONST.TILE_SIZE * CONST.WIDTH,
        CONST.TILE_SIZE * CONST.WIDTH,
        CONST.WIDTH,
        CONST.HEIGHT
    );


    var material = new THREE.MeshBasicMaterial({
        color: 0x333333,
        side: THREE.DoubleSide,
        wireframe: true
    });
    var plane = new THREE.Mesh(geometry, material);
    plane.position.z = CONST.TILE_SIZE / 2;
    scene.add(plane);

    this.wallOffsets = {
        left: 0,
        top: 0,
        bottom: 0,
        right: 0
    };
};

GameArea.prototype = {

    /**
     * @param {CanvasRenderingContext2D} context
     * @param {number} s
     * @param {number} w
     * @param {number} h
     */
    draw: function(context, s, w, h) {
        var wo = this.wallOffsets;

        context.fillStyle = '#000';

        // Top
        context.fillRect(
            wo.left * s,
            wo.top * s,
            (w - wo.left - wo.right) * s,
            s
        );

        // Right
        context.fillRect(
            (w - wo.right - 1) * s,
            wo.top * s,
            s,
            (h - wo.top - wo.bottom) * s
        );

        // Bottom
        context.fillRect(
            wo.left * s,
            (h - wo.bottom - 1) * s,
            (w - wo.left - wo.right) * s,
            s
        );

        // Left
        context.fillRect(
            wo.left * s,
            wo.top * s,
            s,
            (h - wo.top - wo.bottom) * s
        );
    }
};
