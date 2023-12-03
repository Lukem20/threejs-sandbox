// Components
import { createSphere } from './components/sphere.js';
import { createCube } from './components/cube.js';
import { createPlane } from './components/plane.js';
import { createText } from './components/text.js';
import { createShapes } from './components/shapes.js';
import { createCamera } from './components/camera.js';
import { createLights } from './components/lights.js';
import { createScene } from './components/scene.js';
import { createEnvMap } from './components/envMap.js';
import { createMeshGroup } from './components/meshGroup.js';
// import { Train } from './components/Train/Train.js';
import { loadBirds } from './components/Birds/birds.js';
// Helpers
import { createGUI } from './components/lilgui.js'
import { createAxesHelper } from './components/helpers.js';
import { createGridHelper } from './components/helpers.js';

// Systems
import { createControls } from './systems/controls.js';
import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { Loop } from './systems/Loop.js'

let camera;
let controls;
let renderer;
let scene;
let loop;

class World {
    constructor(container) {
        camera = createCamera();
        renderer = createRenderer();
        controls = createControls(camera, renderer.domElement);
        scene = createScene();
        loop = new Loop(camera, scene, renderer);
        container.append(renderer.domElement);


        const sphere = createSphere();
        const cube = createCube();
        const plane = createPlane();
        const text = createText(scene);
        const shapes = createShapes();
        const { 
            directionalLight,
            ambientLight,
            pointLight,
            spotLight,
            pointLightHelper,
            spotLightHelper,
            directionalLightCameraHelper,
        } = createLights();
        const envMap = createEnvMap();
        const sphereMeshGroup = createMeshGroup();
        // const train = new Train();
        
        
        loop.updatables.push(sphere);
        loop.updatables.push(cube);
        loop.updatables.push(controls);
        loop.updatables.push(shapes);
        loop.updatables.push(sphereMeshGroup);
        // loop.updatables.push(train);


        const axesHelper = createAxesHelper();
        const gridHelper = createGridHelper();


        controls.addEventListener('change', () => {
            this.render();
        });


        scene.add(
            shapes,
            directionalLight,
            // ambientLight,
            pointLight,
            spotLight,
            // pointLightHelper,
            // spotLightHelper,
            // directionalLightCameraHelper,
            sphere,
            cube,
            plane,
        );
        scene.add(envMap, sphereMeshGroup, /*train*/);
        scene.add(axesHelper, gridHelper);


        const gui = createGUI(directionalLight);        
        const resizer = new Resizer(container, camera, renderer);
    }

    async init() {
        const { parrot, flamingo, stork } = await loadBirds();
        scene.add(parrot, flamingo, stork);
        loop.updatables.push(parrot, flamingo, stork);
    }

    render() {
        renderer.render(scene, camera);
    }

    start() {
        loop.start();
    }

    stop() {
        loop.stop();
    }
}
    
export { World };