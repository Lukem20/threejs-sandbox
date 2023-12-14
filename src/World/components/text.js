import { 
    Mesh, 
    MeshMatcapMaterial,
    TextureLoader,

} from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

function createText(scene) {
    const textureLoader = new TextureLoader();
    const matcapTexture = textureLoader.load('/assets/textures/matcaps/4.png');
    
    const fontLoader = new FontLoader();
    fontLoader.load(
        '/assets/fonts/League Spartan_Bold.json',
        (font) => {
            const textMaterial = new MeshMatcapMaterial({ matcap: matcapTexture });
            const textGeometry = new TextGeometry(
                'Luke \nlearns \nThree.js',
                {
                    font,
                    size: 1,
                    height: 0.2,
                    curveSegments: 5,
                    bevelEnabled: true,
                    bevelThickness: 0.03,
                    bevelSize: 0.02,
                    bevelOffset: 0,
                    bevelSegments: 4,
                }
            );
            textGeometry.center();
            // Long way of centering text...
            // textGeometry.computeBoundingBox();
            // textGeometry.translate(
            //     - (textGeometry.boundingBox.max.x - 0.02) * 0.5,
            //     - (textGeometry.boundingBox.max.y - 0.02) * 0.5,
            //     - (textGeometry.boundingBox.max.z - 0.03) * 0.5

            // );

            const mesh = new Mesh(textGeometry, textMaterial);
            mesh.position.z = -7;
            scene.add(mesh);
        }
    )
}

export { createText }