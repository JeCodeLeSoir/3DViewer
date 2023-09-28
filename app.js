
import * as THREE from 'three';

import Stats from 'three/addons/libs/stats.module.js';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

let container, stats;

let camera, controls, scene, renderer;

//let mesh;
//let helper;

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

init("3DViewer/map/map.glb", 100);

animate();

function init(url, scale) {

  container = document.getElementById('container');
  container.innerHTML = '';

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xbfd1e5);

  var loader = new GLTFLoader();
  loader.load(
    url,
    function (gltf) {
      console.log(gltf);
      gltf.scene.scale.set(scale, scale, scale);
      scene.add(gltf.scene);
    },
  );

  // Lights

  const dirLight1 = new THREE.DirectionalLight(0xffffff);
  dirLight1.position.set(1, 1, 1);
  scene.add(dirLight1);

  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 10, 20000);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 1000;
  controls.maxDistance = 10000;
  controls.maxPolarAngle = Math.PI / 2;


  controls.target.y = 100;
  camera.position.y = controls.target.y + 2000;
  camera.position.x = 4000;

  controls.update();
  container.addEventListener('pointermove', onPointerMove);

  stats = new Stats();
  container.appendChild(stats.dom);
  window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);

  render();
  stats.update();
}

function render() {
  renderer.render(scene, camera);
}

function onPointerMove(event) {

  pointer.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
  pointer.y = - (event.clientY / renderer.domElement.clientHeight) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);

  // See if the ray from the camera into the world hits one of our meshes

  /* if (mesh !== undefined && mesh !== null) {
     const intersects = raycaster.intersectObject(mesh);
 
     // Toggle rotation bool for meshes that we clicked
     if (intersects.length > 0) {
 
       helper.position.set(0, 0, 0);
       helper.lookAt(intersects[0].face.normal);
 
       helper.position.copy(intersects[0].point);
 
     }
   }*/

}
