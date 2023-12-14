/**
 * Components import
*/
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
import { loadBirds } from './components/Birds/birds.js';
/**
 * Helpers import
*/
import { createGUI } from './components/lilgui.js'
/**
 * Systems import
*/
import { createControls } from './systems/controls.js';
import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { Loop } from './systems/Loop.js';
/**
 * Three
*/
import { 
    AdditiveBlending,
    BufferAttribute,
    BufferGeometry,
    Color,
    PointsMaterial,
    Points,
} from 'three';

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
            pointLight,
            spotLight,
        } = createLights();
        const envMap = createEnvMap();
        const sphereMeshGroup = createMeshGroup();
        const gui = createGUI();  

        /**
         * Galaxy
        */
        const galaxyParams = {}
        galaxyParams.count = 11600;
        galaxyParams.size = 0.04;
        galaxyParams.radius = 5;
        galaxyParams.branches = 3;
        galaxyParams.spin = 1;
        galaxyParams.randomSpread = 0.2;
        galaxyParams.randomPower = 3;
        galaxyParams.outsideColor = '#cf00eb';
        galaxyParams.insideColor = '#fff04d';

        let galaxyGeometry = null;
        let galaxyMaterial = null;
        let points = null;

        const generateGalaxy = () => {
            /**
             * Destroy old galaxy;
            */
            if (points !== null) { 
                galaxyGeometry.dispose(); 
                galaxyMaterial.dispose();
                scene.remove(points);
            }

            /**
             * Galaxy geometry;
            */
            galaxyGeometry = new BufferGeometry();
            const positions = new Float32Array(galaxyParams.count * 3);
            const colors = new Float32Array(galaxyParams.count * 3);

            const colorInside = new Color(galaxyParams.insideColor);
            const colorOutside = new Color(galaxyParams.outsideColor);


            for (let i = 0; i < galaxyParams.count; i++) {
                const i3 = i * 3;

                // Position
                const radius = Math.random() * galaxyParams.radius;
                const arcBranchAngle = radius * galaxyParams.spin;
                const branchAngle = i % galaxyParams.branches / galaxyParams.branches * Math.PI * 2;
                
                const randomY = Math.pow(Math.random(), galaxyParams.randomPower) * (Math.random() < 0.5 ? 1 : -1);
                const randomZ = Math.pow(Math.random(), galaxyParams.randomPower) * (Math.random() < 0.5 ? 1 : -1);
                const randomX = Math.pow(Math.random(), galaxyParams.randomPower) * (Math.random() < 0.5 ? 1 : -1);

                positions[i3    ] = Math.cos(branchAngle + arcBranchAngle) * radius + randomX;
                positions[i3 + 1] = randomY;
                positions[i3 + 2] = Math.sin(branchAngle + arcBranchAngle) * radius + randomZ;
            
                // Color
                const mixedColor = colorInside.clone().lerp(colorOutside, radius / galaxyParams.radius)

                colors[i3    ] = mixedColor.r;
                colors[i3 + 1] = mixedColor.g;
                colors[i3 + 2] = mixedColor.b;
            }

            // Set attributes
            galaxyGeometry.setAttribute(
                'position',
                new BufferAttribute(positions, 3),
            );
            galaxyGeometry.setAttribute(
                'color',
                new BufferAttribute(colors, 3),
            );

            /**
             * Galaxy material;
            */
            galaxyMaterial = new PointsMaterial({
                size: galaxyParams.size,
                sizeAttenuation: true,
                depthWrite: false,
                blending: AdditiveBlending,
                vertexColors: true,
            });

            /**
             * Galaxy points;
             */
            points = new Points(galaxyGeometry, galaxyMaterial);
            scene.add(points);
        }
        generateGalaxy();
        gui.add(galaxyParams, 'count', 100, 100000, 100);
        gui.add(galaxyParams, 'size', 0.0001, 0.1, 0.001);
        gui.add(galaxyParams, 'radius', 0.1, 20, 0.1);
        gui.add(galaxyParams, 'branches', 2, 10, 1);
        gui.add(galaxyParams, 'spin', -5, 5, 0.001);
        gui.add(galaxyParams, 'randomSpread', 0, 2, 0.001);
        gui.add(galaxyParams, 'randomPower', 1, 10, 0.001);
        gui.addColor(galaxyParams, 'outsideColor');
        gui.addColor(galaxyParams, 'insideColor');

        gui.onFinishChange(generateGalaxy);
        
        /**
         * Animated objects and camera
         */
        loop.updatables.push(sphere);
        loop.updatables.push(cube);
        loop.updatables.push(controls);
        loop.updatables.push(shapes);
        loop.updatables.push(sphereMeshGroup);

        controls.addEventListener('change', () => {
            this.render();
        });

        /**
         * Add to scene
         */
        scene.add(
            shapes,
            directionalLight,
            pointLight,
            spotLight,
            sphere,
            cube,
            plane,
            envMap,
            sphereMeshGroup,
        );

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