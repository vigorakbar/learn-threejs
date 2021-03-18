import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js";

import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js";

function main() {
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const fov = 75;
  const aspect = 2;
  const near = 0.1;
  const far = 5;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 3;

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  const scene = new THREE.Scene();

  // Geometry
  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

  // Material
  const color = 0x44aa88;
  const color2 = 0x884911;
  const material = new THREE.MeshPhongMaterial({ color });
  const material2 = new THREE.MeshPhongMaterial({ color: color2 });

  // Mesh
  const cube1 = new THREE.Mesh(geometry, material);
  const cube2 = new THREE.Mesh(geometry, material2);
  cube2.position.x = 2;

  //  light
  const lightColor = 0xffffff;
  const lightIntensity = 1;
  const light = new THREE.DirectionalLight(lightColor, lightIntensity);
  light.position.set(-1, 2, 4);

  //  add elements to scene
  scene.add(cube1);
  scene.add(cube2);
  scene.add(light);

  function render(time) {
    time *= 0.001; // convert time to seconds

    cube1.rotation.x = time;
    cube1.rotation.y = time;
    cube2.rotation.y = time;

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

main();
