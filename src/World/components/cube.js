import { 
    BoxGeometry, 
    MeshStandardMaterial, 
    Mesh, 
    MathUtils, 
    TextureLoader,
    // LoadingManager 
} from 'three';

function createCube () {
    function createMaterial () {

        // Create loading manager to manage loading textures.
        // const loadingManager = new LoadingManager();
        // loadingManager.onStart = () => {
        //     console.log('on Start');
        // }
        // loadingManager.onLoad = () => {
        //     console.log('on Load');
        // }
        // loadingManager.onProgress = () => {
        //     console.log('on Progress');
        // }
        // loadingManager.onError = () => {
        //     console.log('on Error');
        // }

        // Create and texture loader and load the texture
        const textureLoader = new TextureLoader();
        const textureBaseColor = textureLoader.load('/assets/textures/woodendoor/color.jpg');
        const textureNormalMap = textureLoader.load('/assets/textures/woodendoor/normal.jpg');
        const textureHeightMap = textureLoader.load('/assets/textures/woodendoor/height.jpg');
        const textureRoughessMap = textureLoader.load('/assets/textures/woodendoor/roughness.jpg');
        const textureAmbientOcclusionMap = textureLoader.load('/assets/textures/woodendoor/ambientOcclusion.jpg');
        const textureMetallic = textureLoader.load('/assets/textures/woodendoor/metalness.jpg');
        const textureAlpha = textureLoader.load('/assets/textures/woodendoor/alpha.jpg')

        // Create a material using the loaded texture as a color map.
        const material = new MeshStandardMaterial({ 
            map: textureBaseColor,
            normalMap: textureNormalMap,
            displacementMap: textureHeightMap,
            displacementScale: 0.1,
            roughnessMap: textureRoughessMap,
            roughness: 0.5,
            aoMap: textureAmbientOcclusionMap,
            aoMapIntensity: 1,
            metalnessMap: textureMetallic,
            alphaMap: textureAlpha,
            transparent: false,
        });

        return material;
    }

    const geometry = new BoxGeometry(3, 3, 3);
    const material = createMaterial();
    const cube = new Mesh(geometry, material);


    cube.rotation.set(-0.5, -0.1, 0.8);
    cube.position.x = -9;

    const radiansPerSecond = MathUtils.degToRad(30);
    cube.tick = (delta) => {
        cube.rotation.z += radiansPerSecond * delta;
        cube.rotation.x += radiansPerSecond * delta;
        cube.rotation.y += radiansPerSecond * delta;
    };
    
    return cube;
}

export { createCube }