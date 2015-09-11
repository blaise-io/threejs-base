// SOURCE OF TRUTH: http://threejs.org/docs
// INSPIRATION: http://threejs.org/examples

// Global variables that you can access from anywhere in the code.
var scene, renderer, camera, controls, renderCallbacks = [];
var loop = true;

// Set up a new scene with a little ambient light.
// Without lighting, nothing is visible.
scene = new THREE.Scene();
scene.add(new THREE.AmbientLight(0x999999));

// http://threejs.org/docs/#Reference/Renderers/WebGLRenderer
// The renderer renders the scene onto a WebGL canvas.
renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('canvas'),
    antialias: true
});

// http://threejs.org/docs/#Reference/Renderers/WebGLRenderer
// The camera defines from where and how you will be looking at the scene.
// Parameters: field-of-view, aspect, near view, far view.
// Everything outside near view and far view will not be visible, so make sure
// that any geometries you add are sized in this range.
camera = new THREE.PerspectiveCamera(50, 0, 1, 1200);
camera.position.set(0, -100, -550);
//camera.lookAt(new THREE.Vector3(0, 0, 0));

// Add controls to the canvas. This allows you to drag to rotate the camera,
// mousewheel to zoom, and arrow keys to pan.
controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.noKeys = true;

// Whenever the camera is changed or window is resized, we need to update
// the projection, or the scene will look stretched.
controls.addEventListener('change', setProjection);
window.addEventListener('resize', setProjection);
// Set initial projection.
setProjection();

function setProjection() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Start render loop.
renderLoop();

function renderLoop() {
    if (loop) {
        requestAnimationFrame(renderLoop);
    }
    // When you add a function to the renderCallbacks array, it will be
    // executed before each render. This is a simple way to create animations.
    for (var i = 0, m = renderCallbacks.length; i < m; i++) {
        renderCallbacks[i]();
    }
    // Draw the updated scene onto the canvas.
    renderer.render(scene, camera);
}
