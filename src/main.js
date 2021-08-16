import * as THREE from '../build/three.module.js';
import { Environment } from './Environment.js'

import { X_Bot } from './X_Bot.js'

import { X_bot_Walk } from './X_bot_Walk.js'

import Stats from './jsm/libs/stats.module.js';

import { OrbitControls } from './jsm/controls/OrbitControls.js';



let camera, scene, renderer, stats;

const clock = new THREE.Clock();


const X_BOT_PATH_MODEL = './models/x_bot_rotated.glb';//'./models/x_bot_T_pose.glb';

const ENV_PATH_MODEL = './models/cube.glb';

let mixer;

let x_bot;
let env;

function add_axes_helper(scene, x_bot){

    const axesHelper02 = new THREE.AxesHelper( 500 );
    scene.add( axesHelper02 );

    const axesHelper2 = new THREE.AxesHelper( 500 );
 
    x_bot.scene.add( axesHelper2 );

    scene.add(x_bot.scene)
   

    let node;
    let axes;

    node = x_bot.model;
    axes = new THREE.AxesHelper(300);
    axes.material.depthTest = false;
    axes.renderOrder = 1;
    node.add(axes);


    node = x_bot.parts.hips;
    axes = new THREE.AxesHelper(50);
    axes.material.depthTest = false;
    axes.renderOrder = 1;
    node.add(axes);

}

async function load_models(){
    //X_BOT
    x_bot = new X_Bot();
    await x_bot.load(X_BOT_PATH_MODEL);

    //ROOM
    env = new Environment();
    await env.load(ENV_PATH_MODEL);

}



let walk_animation;




function init() {

    const container = document.createElement( 'div' );
    document.body.appendChild( container );

    const fov = 45;
    const aspect = window.innerWidth / window.innerHeight;  // the canvas default
    const near = 0.1;
    const far = 8000;
  
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set( 100, 200, 800 );

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xa0a0a0 );


    const axesHelper = new THREE.AxesHelper( 500 );
 
    scene.add( axesHelper );
    // ground
    const mesh = new THREE.Mesh( new THREE.PlaneGeometry( 2000, 2000 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
    mesh.rotation.x = - Math.PI / 2;
    mesh.receiveShadow = true;
    scene.add( mesh );

    const grid = new THREE.GridHelper( 2000, 20, 0x000000, 0x000000 );
    grid.material.opacity = 0.2;
    grid.material.transparent = true;
    scene.add( grid );


    add_axes_helper(scene, x_bot);

    const surface_color = x_bot.COLORS.WHITE;
    const joints_color = x_bot.COLORS.BLUE;
    x_bot.set_color(surface_color, joints_color);
    

    
    const color = 0xFFFFFF;
    const intensity = 0.5;
    
    const ambient_light = new THREE.AmbientLight(color, intensity);
    scene.add(ambient_light)

    env.init();
 
    scene.add(env.scene);

    //console.log(utils.dumpObject(env.scene).join('\n'));


    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMap.enabled = true;
    container.appendChild( renderer.domElement );

    const controls = new OrbitControls( camera, renderer.domElement );
    controls.target.set( 0, 100, 0 );
    controls.update();

    window.addEventListener( 'resize', onWindowResize );

    // stats
    stats = new Stats();
    container.appendChild( stats.dom );

    //console.log(utils.dumpObject(scene).join('\n'));

    

    walk_animation = new X_bot_Walk(x_bot);
    walk_animation.init();

    


    document.addEventListener('keydown', (event) => {
        var name = event.key;
        var code = event.code;

        walk_animation.keydown_dispatcher(name);
        
    }, false)

    document.addEventListener('keyup', (event) => {
        var name = event.key;
        var code = event.code;

        walk_animation.keyup_dispatcher(name);

    }, false)

    x_bot.set_rest_configuration();

}







function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}


function animate() {

    requestAnimationFrame( animate );

    const delta = clock.getDelta();

    if ( mixer ) mixer.update( delta );

    renderer.render( scene, camera );
    stats.update();
    walk_animation.update();

    //ooo.update();
}

await load_models();
init();
animate();

