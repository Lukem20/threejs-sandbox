import { 
    SphereGeometry, 
    MeshStandardMaterial, 
    Mesh, 
    MathUtils, 
    TextureLoader 
} from 'three';

function createSphere () {
    function createMaterial () {
        // Create and texture loader and load the texture
        const textureLoader = new TextureLoader();
        const textureNormalMap = textureLoader.load('/assets/textures/planetsurface/planet-surface-normal-dx.png');
        const textureHeightMap = textureLoader.load('/assets/textures/planetsurface/planet-surface-height.png');
        const textureRoughessMap = textureLoader.load('/assets/textures/planetsurface/planet-surface-roughness.png');
        const textureAmbientOcclusionMap = textureLoader.load('/assets/textures/planetsurface/planet-surface-ao.png');
        const textureMetallic = textureLoader.load('/assets/textures/planetsurface/planet-surface-metallic.png');

        // Create a material using the loaded texture as a color map.
        const material = new MeshStandardMaterial({ 
            normalMap: textureNormalMap,
            displacementMap: textureHeightMap,
            displacementScale: 0.05,
            roughnessMap: textureRoughessMap,
            roughness: 0.5,
            aoMap: textureAmbientOcclusionMap,
            metalnessMap: textureMetallic,
            
        });

        return material;
    }

    const geometry = new SphereGeometry(2, 64, 32, 0, Math.PI*2, 0, Math.PI);
    const material = createMaterial();
    const sphere = new Mesh(geometry, material);

    sphere.position.set(9, 0, 0);
    sphere.castShadow = true;

    const radiansPerSecond = MathUtils.degToRad(30);
    sphere.tick = (delta) => {
        sphere.rotation.z += radiansPerSecond * delta;
        sphere.rotation.x += radiansPerSecond * delta;
        sphere.rotation.y += radiansPerSecond * delta;
        
    };
    
    return sphere;
}

export { createSphere }