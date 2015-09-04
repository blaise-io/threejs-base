// Useful util function. Returns float between min and max.
function randBetween(min, max) {
    return min + (max - min) * Math.random();
}

// Add a red cube.
// Named function that is invoked immediately.
(function addRedCube() {

    var geometry, material, cube;

    // http://threejs.org/docs/#Reference/Extras.Geometries/BoxGeometry
    // When you add an object, start with its geometry.
    geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);

    // http://threejs.org/docs/#Reference/Materials/MeshPhongMaterial
    // Then create a material. Materials can have textures.
    material = new THREE.MeshPhongMaterial({
        shininess: 5,
        map: THREE.ImageUtils.loadTexture('app/crate.jpg')
    });

    // http://threejs.org/docs/#Reference/Objects/Mesh
    // Then set up a new mesh (3d object) with the geometry and material and
    // set the position, roration, etc. Defaults position is 0,0,0.
    cube = new THREE.Mesh(geometry, material);
    cube.rotation.set(0, Math.PI/6, 0);

    // Just creating the mesh is not enough,
    // you also have to add it to the scene.
    scene.add(cube);

    // Every time we render (60fps hopefully), we want to increase the y
    // rotation a little bit to create an animation.
    renderCallbacks.push(function rotateCube() {
        cube.rotation.y += Math.PI / 1000;
    });

})();


(function createFallingSpheres() {

    for (var i = 0; i < 20; i++) {
        createFallingSphere();
    }

    function createFallingSphere() {
        var objectParent, geometry, material, sphere;

        // http://threejs.org/docs/#Reference/Core/Object3D
        // You can also group 3D objects.
        // Any child you add to the object will then be relative to this parent.
        objectParent = new THREE.Object3D();

        // Define a speed. In "userData" you can dump any metadata.
        objectParent.userData.speed = randBetween(0.005, 0.02);

        // http://threejs.org/docs/#Reference/Lights/PointLight
        // Create a light that emits light in all directions,
        // and add it to our parent.
        var light = new THREE.PointLight('lightyellow', 1.5, 0.5);
        light.position.set( 0, 0, 0 );
        objectParent.add(light);

        // http://threejs.org/docs/#Reference/Extras.Geometries/SphereGeometry
        // Create a new sphere (ball) and add it to our parent.
        geometry = new THREE.SphereGeometry(0.02, 50, 50);
        material = new THREE.MeshPhongMaterial({
            color: 'lightyellow',
            transparent: true,
            opacity: 0.55,
            side: THREE.DoubleSide
        });
        sphere = new THREE.Mesh(geometry, material);
        sphere.rotation.set(0, Math.PI/2, 0);
        objectParent.add(sphere);

        // Add the parent to the scene.
        scene.add(objectParent);

        // Every time we render, drop it down a little. When it's too low,
        // reposition at the top.
        renderCallbacks.push(function dropSphere() {
            objectParent.position.y -= objectParent.userData.speed;
            if (objectParent.position.y < -1) {
                positionSomewhereAtTop();
            }
        });

        function positionSomewhereAtTop() {
            objectParent.position.x = randBetween(-0.2, 0.2);
            objectParent.position.y = randBetween(1, 4);
            objectParent.position.z = randBetween(-0.2, 0.2);
        }

        // Set the initial position.
        positionSomewhereAtTop();
    }

})();
