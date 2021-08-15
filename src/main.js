import * as THREE from '../build/three.module.js';

import * as TWEEN from '../build/tween.esm.js';


import { Utils } from './Utils.js'

import { X_Bot } from './X_Bot.js'
import { Linear_animation } from './Linear_animation.js'

import { Environment } from './Environment.js'

import { Tween_spline } from './Tween_spline.js'
import { X_Bot_Walk_Animation } from './X_bot_Walk_Animation.js'

import { X_bot_Interpolation_Configuartions } from './X_bot_Interpolation_Configuartions.js'



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


let going_to_rest = false;
let going_to_rest_started = false;
let going_to_rest_animation_obj = null;

let going_to_walk = false;
let going_to_walk_started = false;
let going_to_walk_animation_obj = null;


let start_x;
let start_z;

let tween_spline;

let obj;
function test(){
    obj = new X_Bot_Walk_Animation(x_bot);
    obj.init();
    //obj.start();
}

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

let ooo;
function test_get_animation(){
    ooo = new X_bot_Interpolation_Configuartions(x_bot);

    ooo.init(x_bot.rest_configuration, x_bot.T_configuration, 2000);
    ooo.start();
}

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

        keydown_dispatcher(name, x_bot.parts.armature.rotation.y);
        //move_x_bot_keydown_dispatcher(name, move_x_bot_orientation);
    }, false)

    document.addEventListener('keyup', (event) => {
        var name = event.key;
        var code = event.code;

        keyup_dispatcher(name, x_bot.parts.armature.rotation.y);

    }, false)

    x_bot.set_rest_configuration();

   // test_get_animation();
}

let left_key_pressing = false;
let right_key_pressing = false;

function keydown_dispatcher(name, rotation_y){
    if(name == 'ArrowUp'){
        start_linear(rotation_y);
        walking = true;
    }
    else if(name == 'ArrowLeft'){
        if(!left_key_pressing){
            left_key_pressing = true;
            reset_linear(rotation_y);
            const tmp = x_bot.parts.armature.rotation.y + Math.PI/2;
            if(tmp > Math.PI){
                x_bot.parts.armature.rotation.y = -Math.PI/2;
            }
            else{
                x_bot.parts.armature.rotation.y = tmp;
            }

            if(walking){
                start_linear(x_bot.parts.armature.rotation.y);
            }
        }
    }
    else if(name == 'ArrowRight'){
        if(!right_key_pressing){
            right_key_pressing = true;
            reset_linear(rotation_y);
            const tmp = x_bot.parts.armature.rotation.y - Math.PI/2;
            if(tmp < -Math.PI/2){
                x_bot.parts.armature.rotation.y = Math.PI;
            }
            else{
                x_bot.parts.armature.rotation.y = tmp;
            }
            if(walking){
                start_linear(x_bot.parts.armature.rotation.y);
            }
        }
    }
}

function keyup_dispatcher(name, rotation_y){
    if(name == 'ArrowUp'){
        reset_linear(rotation_y);
        walking = false;
        walk_animation_started = false;
        going_to_rest = true;

        obj.reset();

    }
    else if(name == 'ArrowLeft'){
        left_key_pressing = false;
    }
    else if(name == 'ArrowRight'){
        right_key_pressing = false;
    }
}



function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}
let clock_22 = new THREE.Clock();
let start_time;

let walk_animation_started = false;

function animate() {

    requestAnimationFrame( animate );

    const delta = clock.getDelta();

    if ( mixer ) mixer.update( delta );

    renderer.render( scene, camera );

    stats.update();

    if(walking){
        if(!walk_animation_started){
            walk_animation_started = true;
            obj.start();
        }

        obj.update();
        move_forward(x_bot.parts.armature.rotation.y);
        going_to_rest = false;
        going_to_rest_started = false;
        //console.log(JSON.stringify(x_bot.get_current_configuration()));
    }
    else if(going_to_rest){
        if(!going_to_rest_started){
            const current_config = x_bot.get_current_configuration();
            const rest_conf = x_bot.rest_configuration;

            going_to_rest_animation_obj = new X_bot_Interpolation_Configuartions(x_bot);
            going_to_rest_animation_obj.init(current_config, rest_conf, 400);
            going_to_rest_animation_obj.start();
            going_to_rest_started = true;
            clock_22.start();
            start_time = clock_22.getElapsedTime();
        }
        if(clock_22.getElapsedTime()- start_time > 2000){
            going_to_rest = false;
            going_to_rest_started = false;
        }
        going_to_rest_animation_obj.update();
    }
    else{
        x_bot.set_rest_configuration();
    }

    //ooo.update();
}

await load_models();
init();
animate();


function move_forward(rotation_y){
    if(rotation_y == 0){
        move_x_bot_linear.z_pos.update();
        console.log('z_pos');
    }
    else if(rotation_y == Math.PI/2){
        move_x_bot_linear.x_pos.update();
        console.log('x_pos');
    }
    else if(rotation_y == -Math.PI/2){
        move_x_bot_linear.x_neg.update();
        console.log('x_neg');
    }
    else if(rotation_y == Math.PI){
        console.log('z_neg');
        move_x_bot_linear.z_neg.update();
    }
}

function start_linear(rotation_y){
   
    if(rotation_y == 0){
        start_linear_by_name('z_pos');
    }
    else if(rotation_y == Math.PI/2){
        start_linear_by_name('x_pos');
    }
    else if(rotation_y == -Math.PI/2){
        start_linear_by_name('x_neg');
    }
    else if(rotation_y == Math.PI){
        start_linear_by_name('z_neg');
    }
}

function start_linear_by_name(x_z_pos_neg){
    
    if(!move_x_bot_started[x_z_pos_neg]){
        move_x_bot_linear[x_z_pos_neg].start();
        move_x_bot_started[x_z_pos_neg] = true;

        console.log('started linear:'+ x_z_pos_neg);
    }
    move_x_bot_running[x_z_pos_neg] = true;
}



function reset_linear(rotation_y){
    
    if(rotation_y == 0){
        reset_linear_by_name('z_pos');
    }
    else if(rotation_y == Math.PI/2){
        reset_linear_by_name('x_pos');
    }
    else if(rotation_y == -Math.PI/2){
        reset_linear_by_name('x_neg');
    }
    else if(rotation_y == Math.PI){
        reset_linear_by_name('z_neg');
    }
}

function reset_linear_by_name(x_z_pos_neg){
    move_x_bot_started[x_z_pos_neg] = false;
    move_x_bot_running[x_z_pos_neg] = false;
    move_x_bot_linear[x_z_pos_neg].reset();

    console.log('reset linear:'+ x_z_pos_neg);
}