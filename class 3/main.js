import * as THREE from "./three.module.js";
import { OrbitControls } from "./OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// CUBE
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
cube.castShadow = true;
cube.position.set(1,2,1);
scene.add(cube);

// LIGHT
const light = new THREE.DirectionalLight(0xffffff, 1, 10);
light.position.set(-1, 1, 1);
light.castShadow = true;
scene.add(light);

// PLANE
const planeGeometry = new THREE.PlaneGeometry(20, 20, 32, 32);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.receiveShadow = true;
plane.position.set(0, 0, 0);
scene.add(plane);

const controls= new OrbitControls(camera,renderer.domElement)

// controls.enableZoom =false
// controls.minDistance=1
// controls.maxDistance=5

// controls.screenSpacePanning = false // no me funciono
 
controls.enableDamping = false  // no me funciono
controls.dampingFactor = 0.001   // no me funciono

camera.position.z = 5;
camera.position.y = -3;
camera.rotation.x = .5;


function render() {
   /* cube.rotation.x += 0.01
    cube.rotation.y += 0.01*/
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}
render();