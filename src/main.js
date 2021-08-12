import * as THREE from '../build/three.module.js';

import * as TWEEN from '../build/tween.esm.js';


import { Utils } from './Utils.js'

import { X_Bot } from './X_Bot.js'
import { Linear_animation } from './Linear_animation.js'

import { Environment } from './Environment.js'

import { Tween_spline } from './Tween_spline.js'
import { X_Bot_Walk_Animation } from './X_bot_Walk_Animation.js'


import Stats from './jsm/libs/stats.module.js';

import { OrbitControls } from './jsm/controls/OrbitControls.js';
//import { FBXLoader } from './jsm/loaders/FBXLoader.js';

import { GLTFLoader } from './jsm/loaders/GLTFLoader.js';


let camera, scene, renderer, stats;

const clock = new THREE.Clock();
const utils = new Utils();

const X_BOT_PATH_MODEL = './models/x_bot_rotated.glb';//'./models/x_bot_T_pose.glb';

const ENV_PATH_MODEL = './models/cube.glb';

let mixer;

let x_bot;
let env;

function add_lights(){


    
}

async function load_models(){
    //X_BOT
    x_bot = new X_Bot();
    await x_bot.load(X_BOT_PATH_MODEL);

    //ROOM
    env = new Environment();
    await env.load(ENV_PATH_MODEL);

}





let start_x;
let start_z;

let tween_spline;

let obj;
function test(){
    obj = new X_Bot_Walk_Animation(x_bot);
    obj.init();
    obj.start();
}
 function test_tween_spline(){
 }

//     let times = [0, 500, 1000, 1500, 2000];
//     let values = [
//         {x: 2.38, y: 1.34, z:0}, 
// 		{x: 1.28, y: -2.53, z:2}, 
// 		{x: 0.32, y: 1.45, z:1.5}, 
// 		{x: 1.72, y: -1.60, z:1.7}, 
// 		{x: 2.37, y: 1.34, z:2}];


//         // {x: 0.7596, z: 99.43753051757812, y:0}, 
// 		// {x: -0.3358, z: 95.5666275024414, y:2}, 
// 		// {x: -1.2901, z: 99.54318237304688, y:1.5}, 
// 		// {x: 0.1066, z: 96.48882293701172, y:1.7}, 
// 		// {x: 0.7595, z: 99.43751525878906, y:2}];

//         // let values = [
//         //     {x: 2.3769922256469727, z: 99.43753051757812, y:83.62864685058594}, 
//         //     {x: 1.2815183401107788, z: 95.5666275024414, y:127.48887634277344}, 
//         //     {x: 0.3272812068462372, z: 99.54318237304688, y:169.3924560546875}, 
//         //     {x: 1.7239420413970947, z: 96.48882293701172, y:209.16741943359375}, 
//         //     {x: 2.376992702484131, z: 99.43751525878906, y:251.5056915283203}];

//         console.log(JSON.stringify(x_bot.model.position))
//         console.log(JSON.stringify(x_bot.parts.hips.position))
    
//         //.set(0,0,-104);
//         let func_handler = (object) => {
//         // Called after tween.js updates 'coords'.
//         // Move 'box' to the position described by 'coords' with a CSS translation.
//         let old_y = x_bot.parts.hips.position.z; 
//        x_bot.parts.hips.position.set(object.x,  start_z + object.y,old_y +object.z);//position.set(object.x, object.y, object.z);
//        //x_bot.parts.hips.position.set(object.x, object.y, object.z);//position.set(object.x, object.y, object.z);

//     }

//     start_z = x_bot.parts.hips.position.z;
//         tween_spline = new Tween_spline(times, values, func_handler, TWEEN.Easing.Quadratic.Out, TWEEN.Interpolation.CatmullRom);
//         tween_spline.init(true);
//         tween_spline.start();

// }
let z;
let linear_x;
let linear_z;
let on = false;
let run = false;
let rotate = false;
let lin = {z:0};
let on_x = false;

let move_x_bot_linear = {z_pos: new Linear_animation(), 
                        z_neg: new Linear_animation(), 
                        x_pos: new Linear_animation(), 
                        x_neg: new Linear_animation()}

let move_x_bot_started = {z_pos:false, z_neg:false, x_pos:false, x_neg:false};
let move_x_bot_running = {z_pos:false, z_neg:false, x_pos:false, x_neg:false};

let move_x_bot_orientation = 0;

let walking = false;
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
    //scene.fog = new THREE.Fog( 0xa0a0a0, 200, 1000 );

    // scene.add( new THREE.CameraHelper( dirLight.shadow.camera ) );

    const axesHelper = new THREE.AxesHelper( 500 );
    //axesHelper.position.set(-500, 0, -500)
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



    x_bot.model.scale.x = 1;
    x_bot.model.scale.y = 1;
    x_bot.model.scale.z = 1;

    console.log(x_bot.parts.hips.position.y)
    x_bot.materials.surface.material = new THREE.MeshPhongMaterial({color: 0xd6d6d6});  // greenish blue
    x_bot.materials.joints.material = new THREE.MeshPhongMaterial({color: 0x010014});
    

    //x_bot.parts.hips.add( new THREE.AxesHelper( 500 ));
    
    //console.log(utils.dumpObject(x_bot.scene).join('\n'));

    test();
    //test_tween_spline();
    const axesHelper02 = new THREE.AxesHelper( 500 );
    //axesHelper2.position.set(-200, 0, -200)
    scene.add( axesHelper02 );

    const axesHelper2 = new THREE.AxesHelper( 500 );
    //axesHelper2.position.set(-200, 0, -200)
    x_bot.scene.add( axesHelper2 );


    // scene.add(x_bot.model)
    scene.add(x_bot.scene)
    //console.log(x_bot.scene.position)

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
    //x_bot.parts.hips.position.set(80,80,80);//2.37, -83.62, 99.43);
    //console.log(x_bot.parts.hips.position)
    //x_bot.model.position.set(100, 100, 100)
    //x_bot.parts.hips.position.set(100, 100, 100)
    
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

    
    //x_bot.parts.armature.position
    z = 0;
 

    move_x_bot_linear.z_pos.init(83, x_bot.parts.armature.position, 'z');
    move_x_bot_linear.z_neg.init(-83, x_bot.parts.armature.position, 'z');
    move_x_bot_linear.x_pos.init(83, x_bot.parts.armature.position, 'x');
    move_x_bot_linear.x_neg.init(-83, x_bot.parts.armature.position, 'x');
    


    document.addEventListener('keydown', (event) => {
        var name = event.key;
        var code = event.code;

        move_x_bot_keydown_dispatcher(name, move_x_bot_orientation);
    }, false)

    document.addEventListener('keyup', (event) => {
        var name = event.key;
        var code = event.code;

        move_x_bot_keyup_dispatcher(name, move_x_bot_orientation);
        move_x_bot_orientation = x_bot.parts.armature.rotation.y


    }, false)

}


function move_x_bot_keydown(x_z_pos_neg){
    if(!move_x_bot_started[x_z_pos_neg]){
        move_x_bot_linear[x_z_pos_neg].start();
        move_x_bot_started[x_z_pos_neg] = true;
    }
    move_x_bot_running[x_z_pos_neg] = true;
}

function move_x_bot_keyup(x_z_pos_neg){
    move_x_bot_started[x_z_pos_neg] = false;
    move_x_bot_running[x_z_pos_neg] = false;
    move_x_bot_linear[x_z_pos_neg].reset();
}




function move_x_bot_keydown_dispatcher(name, rot){
    if(rot == 0){
        if(name == 'ArrowUp'){
            move_x_bot_keydown('z_pos');
            walking = true;
        }
        else if(name == 'ArrowDown'){
            move_x_bot_keydown('z_neg');
        }
        else if(name == 'ArrowLeft'){
            move_x_bot_keydown('x_pos');
        }
        else if(name == 'ArrowRight'){
            move_x_bot_keydown('x_neg');
        }
    }
    else if(rot == Math.PI/2){
        if(name == 'ArrowUp'){
            move_x_bot_keydown('x_pos');
        }
        else if(name == 'ArrowDown'){
            move_x_bot_keydown('x_neg');
        }
        else if(name == 'ArrowLeft'){
            move_x_bot_keydown('z_neg');
        }
        else if(name == 'ArrowRight'){
            move_x_bot_keydown('z_pos');
        }
    }
    else if(rot == Math.PI){
        if(name == 'ArrowUp'){
            move_x_bot_keydown('z_neg');
        }
        else if(name == 'ArrowDown'){
            move_x_bot_keydown('z_pos');
        }
        else if(name == 'ArrowLeft'){
            move_x_bot_keydown('x_neg');
        }
        else if(name == 'ArrowRight'){
            move_x_bot_keydown('x_pos');
        }
    }
    else if(rot == -Math.PI/2){
        if(name == 'ArrowUp'){
            move_x_bot_keydown('x_neg');
        }
        else if(name == 'ArrowDown'){
            move_x_bot_keydown('x_pos');
        }
        else if(name == 'ArrowLeft'){
            move_x_bot_keydown('z_pos');
        }
        else if(name == 'ArrowRight'){
            move_x_bot_keydown('z_neg');
        }
    }
}
function move_x_bot_keyup_dispatcher(name, rot){
    if(rot == 0){
        if(name == 'ArrowUp'){
            move_x_bot_keyup('z_pos');
            walking=false;
        }
        else if(name == 'ArrowDown'){
            move_x_bot_keyup('z_neg');
        }
        else if(name == 'ArrowLeft'){
            move_x_bot_keyup('x_pos');
        }
        else if(name == 'ArrowRight'){
            move_x_bot_keyup('x_neg');
        }
    }
    else if(rot == Math.PI/2){
        if(name == 'ArrowUp'){
            move_x_bot_keyup('x_pos');
        }
        else if(name == 'ArrowDown'){
            move_x_bot_keyup('x_neg');
        }
        else if(name == 'ArrowLeft'){
            move_x_bot_keyup('z_neg');
        }
        else if(name == 'ArrowRight'){
            move_x_bot_keyup('z_pos');
        }
    }
    else if(rot == Math.PI){
        if(name == 'ArrowUp'){
            move_x_bot_keyup('z_neg');
        }
        else if(name == 'ArrowDown'){
            move_x_bot_keyup('z_pos');
        }
        else if(name == 'ArrowLeft'){
            move_x_bot_keyup('x_neg');
        }
        else if(name == 'ArrowRight'){
            move_x_bot_keyup('x_pos');
        }
    }
    else if(rot == -Math.PI/2){
        if(name == 'ArrowUp'){
            move_x_bot_keyup('x_neg');
        }
        else if(name == 'ArrowDown'){
            move_x_bot_keyup('x_pos');
        }
        else if(name == 'ArrowLeft'){
            move_x_bot_keyup('z_pos');
        }
        else if(name == 'ArrowRight'){
            move_x_bot_keyup('z_neg');
        }
    }
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
    if(walking){
        obj.update();
    }
    if (move_x_bot_running.z_pos){
        move_x_bot_linear.z_pos.update();
        x_bot.parts.armature.rotation.y = 0;
        
    }
    if(move_x_bot_running.x_pos){
        move_x_bot_linear.x_pos.update();
        x_bot.parts.armature.rotation.y = Math.PI/2;
    }

    if (move_x_bot_running.x_neg){
        move_x_bot_linear.x_neg.update();
        x_bot.parts.armature.rotation.y = -Math.PI/2;
    }
    if(move_x_bot_running.z_neg){
        move_x_bot_linear.z_neg.update();
        x_bot.parts.armature.rotation.y = Math.PI;
    }

    console.log( x_bot.parts.armature.rotation.y)
}

await load_models();
init();
animate();

