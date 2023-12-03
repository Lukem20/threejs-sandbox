import * as lilgui from 'lil-gui'

function createGUI (ambientLight) {

    const gui = new lilgui.GUI();
    gui
        .add(ambientLight, 'intensity')
        .min(0)
        .max(5)
        .step(0.01)
}

export { createGUI }