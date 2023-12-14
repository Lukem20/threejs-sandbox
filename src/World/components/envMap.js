import { 
    BoxGeometry, 
    MeshStandardMaterial, 
    Mesh, 
    MathUtils, 
    CubeTextureLoader,
} from 'three';

function createEnvMap () {

    function createMaterial () {
        // Create cube texture loader and load the textures for each side.
        const cubeTextureLoader = new CubeTextureLoader();

        const envMapTexture = cubeTextureLoader.load([
            '/assets/textures/environmentMaps/0/px.jpg',
            '/assets/textures/environmentMaps/0/nx.jpg',
            '/assets/textures/environmentMaps/0/py.jpg',
            '/assets/textures/environmentMaps/0/ny.jpg',
            '/assets/textures/environmentMaps/0/pz.jpg',
            '/assets/textures/environmentMaps/0/nz.jpg',
        ]);

        const material = new MeshStandardMaterial({ 
            metalness: 0.7,
            roughness: 0.2,
            envMap: envMapTexture
        });

        return material;
    }

    const geometry = new BoxGeometry(3, 3, 3);
    const material = createMaterial();
    const envMap = new Mesh(geometry, material);

    envMap.position.y = 5;

    const radiansPerSecond = MathUtils.degToRad(30);
    envMap.tick = (delta) => {
        envMap.rotation.z += radiansPerSecond * delta;
        envMap.rotation.x += radiansPerSecond * delta;
        envMap.rotation.y += radiansPerSecond * delta;
    };
    
    return envMap;
}

export { createEnvMap }