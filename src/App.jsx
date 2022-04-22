import { useEffect, useState } from 'react';

import { GUI } from 'dat.gui';
import * as THREE from 'three';

import SceneInit from './lib/SceneInit';
import RubiksCube from './lib/RubiksCube';

function App() {
  const [showBtns, setShowBtns] = useState(false);
  const test = new SceneInit('myThreeJsCanvas');
  const r = new RubiksCube();
  useEffect(() => {
    test.initScene();
    test.animate();

    test.scene.add(r.rubiksCubeGroup);

    const mouse = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();

    function onMouseDown(event) {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, test.camera);
      const objects = raycaster.intersectObjects(r.rubiksCubeGroup.children);
      const cubeObjects = objects.filter((c) => {
        return c.object.type === 'Mesh';
      });
      if (cubeObjects.length > 0) {
        r.highlightCubes(cubeObjects[0].object);
      }
      let axisLabel = event.target.dataset.axis
      if(axisLabel) {
        r.onKeyDown({
          key: axisLabel
        })
      }
    }

    const onKeyDown = (event) => {
      if (event.repeat) {
        return;
      }
      r.onKeyDown(event);
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('mousedown', onMouseDown);

    // const planeGeometry = new THREE.PlaneGeometry(2, 2);
    // const planeMaterial = new THREE.MeshPhongMaterial({ color: '#ff0000' });
    // const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
    // planeMesh.position.z = -2;
    // group.add(planeMesh);

    // const gui = new GUI();
    // const folder = gui.addFolder("Rubik's Cube");
    // folder.add(r, 'epsilon', 0.5, 3.5, 0.5);
    // folder.add(r, 'consoleDebug');
    // folder.open();
  }, []);
  // const handleClickRotate = (axisLabel) => {
  //   // r.movingWorldCube(axisLabel)
  //   r.onKeyDown({
  //     key: 'w'
  //   })
  // }
  return (
    <div>
      <canvas id="myThreeJsCanvas"></canvas>
      {true && <div
        style={{
          position: 'absolute',
          left: 200,
          // background: 'white',
          zIndex: 100
        }}
      >
        <button data-axis="w" style={{marginLeft:'20px', background: 'white'}}>Rotate X</button>
        <button data-axis="s" style={{marginLeft:'20px', background: 'white'}}>Rotate X'</button>
        <button data-axis="a" style={{marginLeft:'20px', background: 'white'}}>Rotate Y</button>
        <button data-axis="d" style={{marginLeft:'20px', background: 'white'}}>Rotate Y'</button>
        <button data-axis="q" style={{marginLeft:'20px', background: 'white'}}>Rotate Z</button>
        <button data-axis="e" style={{marginLeft:'20px', background: 'white'}}>Rotate Z'</button>
        {/* <button >Rotate Y</button>
        <button >Rotate Z</button> */}
      </div>}
    </div>
  );
}

export default App;
