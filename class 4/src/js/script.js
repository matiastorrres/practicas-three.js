import * as THREE from "three"
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js"  // Control de orbita
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js" // Los modelos que importamos son de tipo GLFT,
// dependiendo del tipo de modelo es el tipo de cargador que vamos a usar.
import {RGBELoader} from "three/examples/jsm/loaders/RGBELoader.js" // Este es para carga HDRI que descargamos


// 
const scene = new THREE.Scene()

//
const camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,1000)
camera.position.set(6,6,6)


//
const renderer = new THREE.WebGLRenderer({antialias:true}) // El antialiasing suaviza estos bordes, haciendo que los gráficos se vean más suaves y realistas.
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor(0xA3A3A3)
document.body.appendChild(renderer.domElement)
// configurar el render para un mejor renderizado
// definimos en el render el Encoding que vamos a estar utilizando
// para hacer la codificacion en funcion RGBE que descargamos y que el rederizado de la texturas, colores,etc se hagan de forma correcta
renderer.outputEncoding = THREE.sRGBEncoding
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure =4

//
const orbit = new OrbitControls(camera,renderer.domElement)
orbit.update() // actulizar la posicion del elemento en funcion del uso del orbit 

//
const grid = new THREE.GridHelper(30,30)
scene.add(grid)

// creamos los loader
const gltfLoader = new GLTFLoader()
const rgbeLoader = new RGBELoader()

let myModel
rgbeLoader.load("./assets/MR_INT-001_NaturalStudio_NAD.hdr",(texture)=>{
    texture.mapping =THREE.EquirectangularReflectionMapping;
    scene.environment= texture
    gltfLoader.load("./assets/scene.gltf",(gltf)=>{
         const model = gltf.scene
         scene.add(model)
         myModel = model
    })
})

function animate(time) {
      if(myModel)
           myModel.rotation.y = - time / 2000
       renderer.render(scene, camera)
}
   
   renderer.setAnimationLoop(animate);

window.addEventListener("resize",()=>{
    camera.aspect=window.innerWidth/window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth/window.innerHeight)
})