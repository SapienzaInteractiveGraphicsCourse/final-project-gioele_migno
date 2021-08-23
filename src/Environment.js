import * as THREE from '../build/three.module.js';
import { GLTFLoader } from './jsm/loaders/GLTFLoader.js';
import { Utils } from './Utils.js'

const utils = new Utils();

class Environment{
    
    constructor(){
        this.gltfLoader = null;
        this.data_loaded = null;
        // this.model_room = null;
        // this.scene_room = null;

        this.scene = null;
        this.light = null;
    }

    async load(model_path){
        this.gltfLoader = new GLTFLoader();
        this.data_loaded = await this.gltfLoader.loadAsync(model_path);
        
        this.scene = this.data_loaded.scene; 
        this.scene.scale.set(100, 100, 100);


        // let plane = this.scene.getObjectByName('Plane');
        // console.log(JSON.stringify(plane));
        // plane.material = new THREE.MeshPhongMaterial({color: 0x97D2FB}); 
         
        let cube = this.scene.getObjectByName('Cube');
        cube.material = new THREE.MeshPhongMaterial({color: 0x80FFE8, emissive: 0x80FFE8}); 

        
        this.object_to_move = this.scene.getObjectByName('Sphere');
        this.object_to_move.material = new THREE.MeshPhongMaterial({color: 0xDC143C}); 


        //utils.print_dump_object(this.scene);
    }

    init(){
        const color = 0xFFFFFF;
        const intensity = 0.5;

        this.light = new THREE.PointLight(color, intensity);
        this.light.position.set(0,500, 0);
    
        const size = 10;
        this.light_helper = new THREE.PointLightHelper(this.light, size);

        this.scene.add(this.light);
        this.scene.add(this.light_helper);

        // const ambient_light = new THREE.AmbientLight(color, intensity);
        // this.scene.add(ambient_light)

        

        utils.print_dump_object(this.scene);
        //plane.material.color = color;
    }
}

export { Environment };

