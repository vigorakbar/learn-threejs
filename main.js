import * as THREE from "https://threejsfundamentals.org/threejs/resources/threejs/r125/build/three.module.js";
import { GUI } from "https://threejsfundamentals.org/threejs/../3rdparty/dat.gui.module.js";

function main() {
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  const gui = new GUI();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const fov = 40;
  const aspect = window.innerWidth / window.innerHeight;
  const near = 0.1;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 100, 0);
  camera.up.set(0, 0, 1);
  camera.lookAt(0, 0, 0);

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  const scene = new THREE.Scene();

  // Geometry
  const radius = 1;
  const widthSegment = 6;
  const heightSegment = 6;
  const sphereGeometry = new THREE.SphereGeometry(
    radius,
    widthSegment,
    heightSegment
  );

  // Material
  const sunMaterial = new THREE.MeshPhongMaterial({ emissive: 0xffff00 });
  const earthMaterial = new THREE.MeshPhongMaterial({
    color: 0x2233ff,
    emissive: 0x112244,
  });
  const moonMaterial = new THREE.MeshPhongMaterial({
    color: 0x888888,
    emissive: 0x222222,
  });

  // Mesh
  const solarSystem = new THREE.Object3D();
  const earthOrbit = new THREE.Object3D();
  const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
  sunMesh.scale.set(5, 5, 5);
  const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
  earthOrbit.position.x = 10;
  const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
  moonMesh.position.x = 2;
  moonMesh.scale.set(0.5, 0.5, 0.5);

  const objects = [];

  //  light
  const lightColor = 0xffffff;
  const lightIntensity = 3;
  const light = new THREE.PointLight(lightColor, lightIntensity);

  //  add elements to scene
  scene.add(light);
  scene.add(solarSystem);
  solarSystem.add(sunMesh);
  solarSystem.add(earthOrbit);
  earthOrbit.add(earthMesh);
  earthOrbit.add(moonMesh);

  objects.push(solarSystem);
  objects.push(earthOrbit);
  objects.push(sunMesh);
  objects.push(earthMesh);
  objects.push(moonMesh);

  objects.forEach((node) => {
    const axes = new THREE.AxesHelper();
    axes.material.depthTest = false;
    axes.renderOrder = 1;
    node.add(axes);
  });

  class AxisGridHelper {
    constructor(node, units = 10) {
      const axes = new THREE.AxesHelper();
      axes.material.depthTest = false;
      axes.renderOrder = 2;
      node.add(axes);

      const grid = new THREE.GridHelper(units, units);
      grid.material.depthTest = false;
      grid.renderOrder = 1;
      node.add(grid);

      this.grid = grid;
      this.axes = axes;
      this.visible = false;
    }

    get visible() {
      return this._visible;
    }

    set visible(v) {
      this._visible = v;
      this.grid.visible = v;
      this.axes.visible = v;
    }
  }

  function makeAxisGrid(node, label, units) {
    const helper = new AxisGridHelper(node, units);
    gui.add(helper, "visible").name(label);
  }

  makeAxisGrid(solarSystem, 'Solar System', 25)
  makeAxisGrid(sunMesh, 'Sun Mesh')
  makeAxisGrid(earthOrbit, 'Earth Orbit')
  makeAxisGrid(earthMesh, 'Earth Mesh')
  makeAxisGrid(moonMesh, 'Moon Mesh')

  function render(time) {
    time *= 0.001;
    objects.forEach((obj) => {
      obj.rotation.y = time;
    });
    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

main();
