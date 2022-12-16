import './style.css'
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { ParametricGeometries } from "three/examples/jsm/geometries/ParametricGeometries.js";
import { ParametricGeometry } from 'three/examples/jsm/geometries/ParametricGeometry.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});


//Renderer
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
renderer.render(scene, camera);

const map = new THREE.TextureLoader().load( 'textures/uv_grid_opengl.jpg' );
map.wrapS = map.wrapT = THREE.RepeatWrapping;
map.anisotropy = 16;
const materialNew = new THREE.MeshPhongMaterial( { color: 0x00FF00, side: THREE.DoubleSide } );

const material = new THREE.MeshStandardMaterial( {color: 0x00FF00 })

/*
const mobiusgeometry = new ParametricGeometry( ParametricGeometries.mobius, 50, 50 );
const Strip = new THREE.Mesh( mobiusgeometry, materialNew );
Strip.position.set( 12.5, 2.5, 0 );
Strip.scale.multiplyScalar( 6 );
Strip.rotation.x += Math.PI * 0.33;
scene.add( Strip );
*/

//Star Geometry
function addStar(){
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({color : 0xFFFFFF});
    const star = new THREE.Mesh(geometry, material);
    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
    star.position.set(x, y, z);
    scene.add(star);
}
let stars = new Array(200).fill().forEach(addStar)

//Light
const pointLight = new THREE.PointLight(0xFFFFFF)
pointLight.position.set( 12.5, 2.5, 0)
const ambientLight = new THREE.AmbientLight(0xcccccc, 0.4)
scene.add(pointLight, ambientLight)

//Helpers
/*
const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper)
scene.add(gridHelper)
const controls = new OrbitControls(camera, renderer.domElement);
const helper = new THREE.CameraHelper( camera );
scene.add( helper );
*/


//Scene Updater
/*
function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
    Strip.rotation.z += 0.15;
}

document.body.onscroll = moveCamera;
moveCamera();
*/
function animate() {
    //controls.update();
    //Strip.rotation.z += 0.05;
    renderer.render(scene, camera)
    requestAnimationFrame(animate);
    
}
animate();


