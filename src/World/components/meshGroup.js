import {
    SphereGeometry,
    Group,
    MathUtils,
    Mesh,
    TextureLoader,
    MeshMatcapMaterial,
} from 'three'

function createMeshGroup() {
    // Loading texture for matcap material
    const textureLoader = new TextureLoader();
    const matcapTexture = textureLoader.load('/assets/textures/matcaps/8.png')

    // Creating a group with a sphere and its clones.
    const group = new Group();
    const geometry = new SphereGeometry(0.3, 14, 10);
    const material = new MeshMatcapMaterial();
    material.matcap = matcapTexture;
    const protoSphere = new Mesh(geometry, material);

    group.add(protoSphere);

    // 10 spheres with each clone positioned using its loop iteration number.
    for (let i = 0; i < 1; i+= 0.1) {
        const sphere = protoSphere.clone();
        // Position the spheres around a circle
        sphere.position.x = Math.cos((2 * Math.PI * i));
        sphere.position.y = Math.sin((2 * Math.PI * i));
        sphere.position.z = (-i * 3) * i;
        sphere.scale.multiplyScalar(0.01 + i);

        group.add(sphere);
    }
    // Scales all vectors
    group.scale.multiplyScalar(3);
    group.position.set(5, -10, 0)

    // Rotate group
    const radiansPerSecond = MathUtils.degToRad(10);
    group.tick = (delta) => {
        group.rotation.z += delta * radiansPerSecond;
        group.position.x = Math.cos((Math.PI * delta));

        protoSphere.rotation.x += radiansPerSecond * delta;
    };

    return group;
}

export { createMeshGroup }