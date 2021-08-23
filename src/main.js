import * as THREE from '../build/three.module.js';
import { Environment } from './Environment.js'

import { X_Bot } from './X_Bot.js'

import { X_bot_Walk } from './X_bot_Walk.js'

import { X_Bot_Cube_Animation } from './X_Bot_Cube_Animation.js'



import Stats from './jsm/libs/stats.module.js';

import { OrbitControls } from './jsm/controls/OrbitControls.js';
import { Utils } from './Utils.js'


let anim_test;

const utils = new Utils();
let camera, scene, renderer, stats;

const clock = new THREE.Clock();


const X_BOT_PATH_MODEL = './models/x_bot_rotated.glb';//'./models/x_bot_T_pose.glb';

const ENV_PATH_MODEL = './models/room_s.glb';//'./models/test.glb';//'./models/scene_cube.glb'; //'./models/cube.glb';


let x_bot;

let x_bot_walk;

let env;
let walk_animation;

function add_axes_helper(scene, x_bot){
    const axesHelper = new THREE.AxesHelper( 500 );
 
    scene.add( axesHelper );

    const axesHelper02 = new THREE.AxesHelper( 500 );
    scene.add( axesHelper02 );

    const axesHelper2 = new THREE.AxesHelper( 500 );
 
    x_bot.scene.add( axesHelper2 );

    
   

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

    x_bot_walk = new X_Bot();
    await x_bot_walk.load(X_BOT_PATH_MODEL);

    //ROOM
    env = new Environment();
    await env.load(ENV_PATH_MODEL);

}








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

    // ground
    const mesh = new THREE.Mesh( new THREE.PlaneGeometry( 4000, 4000 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
    mesh.rotation.x = - Math.PI / 2;
    mesh.receiveShadow = true;
    //scene.add( mesh );

    const grid = new THREE.GridHelper( 4000, 20, 0x000000, 0x000000 );
    grid.material.opacity = 0.2;
    grid.material.transparent = true;
    //scene.add( grid );

    add_axes_helper(scene, x_bot);


    const color = 0xFFFFFF;
    const intensity = 0.5;
    
    const ambient_light = new THREE.AmbientLight(color, intensity);
    scene.add(ambient_light)

    env.init();
    scene.add(env.scene);


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




    walk_animation = new X_bot_Walk(x_bot_walk);
    
    let box_1 = walk_animation.get_box_template();
    let box_2 = walk_animation.get_box_template();

    box_1.left_up.x = 585;
    box_1.left_up.z = 715;
    
    box_1.right_bottom.x = -575;
    box_1.right_bottom.z = -715;

    box_2.left_up.x = 100;
    box_2.left_up.z = 100;
    
    box_2.right_bottom.x = -100;
    box_2.right_bottom.z = -1015;

    let boxes = [];
    boxes.push(box_1);
    boxes.push(box_2);

    walk_animation.init(boxes);

    const surface_color = x_bot.COLORS.WHITE;
    const joints_color = x_bot.COLORS.BLUE;
    x_bot.set_color(surface_color, joints_color);
    
    scene.add(x_bot.model)
    x_bot.set_rest_configuration();


    
    scene.add(x_bot_walk.model)
    x_bot_walk.set_rest_configuration();


    document.addEventListener('keydown', (event) => {
        var name = event.key;
        var code = event.code;

        walk_animation.keydown_dispatcher(name);
        
        //console.log(JSON.stringify(x_bot.parts.hips.position))
    }, false)

    document.addEventListener('keyup', (event) => {
        var name = event.key;
        var code = event.code;

        walk_animation.keyup_dispatcher(name);

    }, false)


    anim_test = new X_Bot_Cube_Animation(x_bot, env);
    anim_test.init();

    //utils.print_dump_object(scene);
}







function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}


function animate() {

    requestAnimationFrame( animate );

    renderer.render( scene, camera );
    stats.update();
    walk_animation.update();

    anim_test.update();
}

await load_models();
init();
animate();

