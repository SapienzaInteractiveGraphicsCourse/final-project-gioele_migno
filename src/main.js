import * as THREE from '../build/three.module.js';
import { Environment } from './Environment.js'

import { X_Bot } from './X_Bot.js'

import { X_bot_Walk } from './X_bot_Walk.js'

import { X_Bot_Cube_Animation } from './X_Bot_Cube_Animation.js'



import Stats from './jsm/libs/stats.module.js';
import { GUI } from './jsm/libs/dat.gui.module.js';

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

    x_bot_walk.parts.armature.position.x = -200;
    x_bot_walk.parts.armature.position.z = -100;
    //ROOM
    env = new Environment();
    await env.load(ENV_PATH_MODEL);

}


class ColorGUIHelper {
    constructor(object, prop) {
      this.object = object;
      this.prop = prop;
    }
    get value() {
      return `#${this.object[this.prop].getHexString()}`;
    }
    set value(hexString) {
      this.object[this.prop].set(hexString);
    }
  }

function GUI_init(){
    const gui = new GUI()
    gui.addColor(new ColorGUIHelper(x_bot_walk.materials.surface.material, 'color'), 'value').name('Color');
    gui.addColor(new ColorGUIHelper(x_bot_walk.materials.surface.material, 'specular'), 'value').name('Specular');


}



function init() {

    const container = document.createElement( 'div' );
    document.body.appendChild( container );

    const fov = 45;
    const aspect = window.innerWidth / window.innerHeight;  // the canvas default
    const near = 0.1;
    const far = 8000;
  
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set( 0, 200, 1150 );

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

    //add_axes_helper(scene, x_bot);



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
    
    // let box_1 = walk_animation.get_box_template();
    // let box_2 = walk_animation.get_box_template();

    // box_1.left_up.x = 585;
    // box_1.left_up.z = 715;
    
    // box_1.right_bottom.x = -575;
    // box_1.right_bottom.z = -715;

    // box_2.left_up.x = 100;
    // box_2.left_up.z = 100;
    
    // box_2.right_bottom.x = -100;
    // box_2.right_bottom.z = -1015;



    let boxes = [];
    
    let box_1 = walk_animation.get_box_template();
    
    box_1.right_bottom.x = -469;
    box_1.right_bottom.z = -318;
    
    box_1.left_up.x = 489;
    box_1.left_up.z = -244;
    
    
    let box_2 = walk_animation.get_box_template();
    
    box_2.right_bottom.x = -469;
    box_2.right_bottom.z = 574;
    
    box_2.left_up.x = 489;
    box_2.left_up.z = 705;


    let box_3 = walk_animation.get_box_template();
    
    box_3.right_bottom.x = -469;
    box_3.right_bottom.z = 55;
    
    box_3.left_up.x = -200;
    box_3.left_up.z = 274;


    let box_4 = walk_animation.get_box_template();
    
    box_4.right_bottom.x = 200;
    box_4.right_bottom.z = 55;
    
    box_4.left_up.x = 489;
    box_4.left_up.z = 274;


    let box_5 = walk_animation.get_box_template();
    
    box_5.right_bottom.x = -360;
    box_5.right_bottom.z = -300;
    
    box_5.left_up.x = 360;
    box_5.left_up.z = -87;


    let box_6 = walk_animation.get_box_template();
    
    box_6.right_bottom.x = -200;
    box_6.right_bottom.z = 352;
    
    box_6.left_up.x = 360;
    box_6.left_up.z = 600;


    let box_7 = walk_animation.get_box_template();
    
    box_7.right_bottom.x = -360;
    box_7.right_bottom.z = -100;
    
    box_7.left_up.x = -139;
    box_7.left_up.z = 574;


    let box_8 = walk_animation.get_box_template();

    box_8.right_bottom.x = 139;
    box_8.right_bottom.z = -100;
    
    box_8.left_up.x = 360;
    box_8.left_up.z = 574;



    boxes.push(box_1);
    boxes.push(box_2);
    boxes.push(box_3);
    boxes.push(box_4);
    boxes.push(box_5);
    boxes.push(box_6);
    boxes.push(box_7);
    boxes.push(box_8);


    walk_animation.init(boxes);

    const surface_color = x_bot.COLORS.WHITE;
    const joints_color = x_bot.COLORS.BLUE;
    x_bot.set_color(surface_color, joints_color);
    
    x_bot_walk.set_color(surface_color, 0x8B0000);

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


    init_lights();

    texture_init();

    GUI_init();
    
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

function init_lights(){
    // AMBIENT LIGHT ------------------------------------------------------------------------------
    const AMBIENT_LIGHT_COLOR = 0xFFFFFF;
    const AMBIENT_LIGHT_INTENSITY = 0.5;
    
    const ambient_light = new THREE.AmbientLight(AMBIENT_LIGHT_COLOR, AMBIENT_LIGHT_INTENSITY);
    scene.add(ambient_light)
    // ---------------------------------------------------------------------------------------------

    // CEILING LIGHTS ------------------------------------------------------------------------------
    const CEILING_LIGHT_COLOR = 0xFFFFFF;
    const CEILING_LIGHT_INTENSITY = 0.3;

    let ceiling_light_1 = new THREE.PointLight(CEILING_LIGHT_COLOR, CEILING_LIGHT_INTENSITY);
    env.light_1.getWorldPosition(ceiling_light_1.position); // set position of ceiling_light_1
    scene.add(ceiling_light_1);

    let ceiling_light_2 = new THREE.PointLight(CEILING_LIGHT_COLOR, CEILING_LIGHT_INTENSITY);
    env.light_2.getWorldPosition(ceiling_light_2.position); // set position of ceiling_light_2
    scene.add(ceiling_light_2);

    // const size_help = 10;
    // let ceiling_light_1_help = new THREE.PointLightHelper(ceiling_light_1, size_help);
    // scene.add(ceiling_light_1_help);
    // let ceiling_light_2_help = new THREE.PointLightHelper(ceiling_light_2, size_help);
    // scene.add(ceiling_light_2_help);
    // ---------------------------------------------------------------------------------------
 

    // PLATFORM'S LIGHTS ------------------------------------------------------------------------------
    const PLATFORMS_LIGHT_COLOR = 0xffffff;
    const PLATFORMS_LIGHT_INTENSITY = 2.0;
    const PLATFORMS_LIGHT_DISTANCE = 800;
    const PLATFORMS_LIGHT_ANGLE = 0.2;

    const platform_light_1 = new THREE.SpotLight(PLATFORMS_LIGHT_COLOR, PLATFORMS_LIGHT_INTENSITY);
    platform_light_1.distance = PLATFORMS_LIGHT_DISTANCE;
    platform_light_1.angle = PLATFORMS_LIGHT_ANGLE;
    env.platform_light_1.getWorldPosition(platform_light_1.position);
    env.platform_light_1.getWorldPosition(platform_light_1.target.position);
    platform_light_1.target.position.y=0;
    scene.add(platform_light_1)
    scene.add(platform_light_1.target)

    const platform_light_2 = new THREE.SpotLight(PLATFORMS_LIGHT_COLOR, PLATFORMS_LIGHT_INTENSITY);
    platform_light_2.distance = PLATFORMS_LIGHT_DISTANCE;
    platform_light_2.angle = PLATFORMS_LIGHT_ANGLE;
    env.platform_light_2.getWorldPosition(platform_light_2.position);
    env.platform_light_2.getWorldPosition(platform_light_2.target.position);
    platform_light_2.target.position.y=0;
    scene.add(platform_light_2)
    scene.add(platform_light_2.target)

    const platform_light_3 = new THREE.SpotLight(PLATFORMS_LIGHT_COLOR, PLATFORMS_LIGHT_INTENSITY);
    platform_light_3.distance = PLATFORMS_LIGHT_DISTANCE;
    platform_light_3.angle = PLATFORMS_LIGHT_ANGLE;
    env.platform_light_3.getWorldPosition(platform_light_3.position);
    env.platform_light_3.getWorldPosition(platform_light_3.target.position);
    platform_light_3.target.position.y=0;
    scene.add(platform_light_3)
    scene.add(platform_light_3.target)

    const platform_light_4 = new THREE.SpotLight(PLATFORMS_LIGHT_COLOR, PLATFORMS_LIGHT_INTENSITY);
    platform_light_4.distance = PLATFORMS_LIGHT_DISTANCE;
    platform_light_4.angle = PLATFORMS_LIGHT_ANGLE;
    env.platform_light_4.getWorldPosition(platform_light_4.position);
    env.platform_light_4.getWorldPosition(platform_light_4.target.position);
    platform_light_4.target.position.y=0;
    scene.add(platform_light_4)
    scene.add(platform_light_4.target)
    // ---------------------------------------------------------------------------------------------------
}

function texture_init(){
    const loader = new THREE.TextureLoader();
    //const materials = new THREE.MeshBasicMaterial({map: loader.load('./images_texture/LOGO.png')});
    
    const boxWidth = 1966*0.2;
    const boxHeight = 500*0.2;
    const boxDepth = 10;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
   
    const materials = [
        new THREE.MeshPhongMaterial({color: 0xF0F8FF}),

        new THREE.MeshPhongMaterial({color: 0xF0F8FF}),

        new THREE.MeshPhongMaterial({color: 0xF0F8FF}),

        new THREE.MeshPhongMaterial({color: 0xF0F8FF}),
        // source gear https://www.subpng.com/png-2onktf/download.html
        new THREE.MeshPhongMaterial({map: loader.load('./images_texture/logo.png')}),

        new THREE.MeshPhongMaterial({color: 0xF0F8FF}),

    ];
    const cube = new THREE.Mesh(geometry, materials);
    cube.position.set(0, 300, -380)
    scene.add(cube);

    text_2();
}

function set_repeat_texture(texture){
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(3,3);
}

function text_2(){
    const loader = new THREE.TextureLoader();
    
    const base_color_map = loader.load('./images_texture/carpet/Fabric_Knitted_004_basecolor.jpg')
    set_repeat_texture(base_color_map)

    const normal_map = loader.load('./images_texture/carpet/Fabric_Knitted_004_normal.jpg')
    set_repeat_texture(normal_map)

    const height_map = loader.load('./images_texture/carpet/Fabric_Knitted_004_height.png')
    set_repeat_texture(height_map)

    const roughness_map = loader.load('./images_texture/carpet/Fabric_Knitted_004_roughness.jpg')
    set_repeat_texture(roughness_map)


    const ambent_occlusion = loader.load('./images_texture/carpet/Fabric_Knitted_004_ambientOcclusion.jpg')
    set_repeat_texture(ambent_occlusion)

    

    const geometry =  new THREE.PlaneGeometry( 600, 900 );
   
    const materials = new THREE.MeshStandardMaterial(
        {
            map: base_color_map,
            normalMap: normal_map,
            displacementMap: height_map,
            //displacementScale:10,
            roughnessMap: roughness_map,
            //roughness:1,
            aoMap: ambent_occlusion

        });
    const cube = new THREE.Mesh(geometry, materials);
    cube.rotation.x = -Math.PI/2;
    cube.position.set(0, 1, 150)
    scene.add(cube);
}