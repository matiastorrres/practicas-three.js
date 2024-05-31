import * as THREE from "three";

// luces

/* 
-Tenemos luces de hemisferio, punto, direccionales, de foco, ambientales.
-Para construir esa luz tenemos que especificar el color e intensiadad 
-los materiales hechos con MeshBasicMaterial no generan sombras
*/

//*******Definimos la escena, camara y el render */
const scene = new THREE.Scene();
// agregar color a la ascena
// scene.background = new THREE.Color(0x666666)

const camera = new THREE.PerspectiveCamera(
  75, // Campo de visión en grados
  window.innerWidth / window.innerHeight, // Relación de aspecto de la cámara
  0.1, // Plano de recorte cercano
  1000 // Plano de recorte lejano
);

// para agregar color de fondo transparente tenemos que hacerlo en el render // {alpha:true}
const renderer = new THREE.WebGLRenderer({ alpha: true });

// agregarmos el tamaño del render y se lo agregamos al body
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

///****** */
// geometria
const geometry = new THREE.BoxGeometry(1, 1, 1);
// material
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });

// malla insetamos geoemtria y material
const cube = new THREE.Mesh(geometry, material);
cube.castShadow = true;
// cube.position.set(0,1,0)
cube.position.set(1, 2, 1);
scene.add(cube);

// crear plano
const planeGeometry = new THREE.PlaneGeometry(20, 20, 32, 32); // geometria
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 }); // material
const plane = new THREE.Mesh(planeGeometry, planeMaterial);

// el plano recibe las sombras
plane.receiveShadow = true;
plane.position.set(0, 0, 0);
scene.add(plane);

// agregar grilla (suelo) // los parametros son el tamaño y la cantidad de cuadrados
const grid = new THREE.GridHelper(100, 10);

// scene.add(grid)

// crear luz
const ligth = new THREE.DirectionalLight(0xffffff, 1, 10);
// posicion de la luz
ligth.position.set(-1, 1, 1);
// ligth.position.set(1,1,0) //
// ligth.lookAt(cube.position)
// casteamos las sombras
ligth.castShadow = true;
// añadimos la luz
scene.add(ligth);

camera.position.z = 5;
camera.position.y = -3;
camera.rotation.x = 0.5;
// camera.position.set(0,0,10)
// camera.lookAt(0,0,0)
// camera.lookAt(cube.position)

// camera.position.z = 5;
// camera.position.y = -3;
// camera.rotation.x = .5;

function animate() {
  requestAnimationFrame(animate); // se encarga de refrescar los fotogramas para darle el aspecto de animacion

  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}
animate();
