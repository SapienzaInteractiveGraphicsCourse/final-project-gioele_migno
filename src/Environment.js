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
         
        let floor = this.scene.getObjectByName('Floor');
        floor.material = new THREE.MeshPhongMaterial({color: 0xF0F8FF, specular:0xF0F8FF, shininess:1});
    

        let ceiling = this.scene.getObjectByName('Ceiling');
        ceiling.material = new THREE.MeshPhongMaterial({color: 0x1E90FF}); 



        let wall_nord = this.scene.getObjectByName('Wall_nord');
        wall_nord.material = new THREE.MeshPhongMaterial({color: 0x1E90FF}); 

        let wall_est = this.scene.getObjectByName('Wall_est');
        wall_est.material = new THREE.MeshPhongMaterial({color: 0x1E90FF}); 

        let wall_west = this.scene.getObjectByName('Wall_west');
        wall_west.material = new THREE.MeshPhongMaterial({color: 0x1E90FF}); 




        let base_dx = this.scene.getObjectByName('Base_dx');
        base_dx.material = new THREE.MeshPhongMaterial({color: 0xFFFAF0, specular:0xFFFAF0, shininess:40}); 

        let base_sx = this.scene.getObjectByName('Base_sx');
        base_sx.material = new THREE.MeshPhongMaterial({color: 0xFFFAF0, specular:0xFFFAF0, shininess:40}); 


        this.chair = this.scene.getObjectByName('Chair');
        this.chair.material = new THREE.MeshPhongMaterial({color: 0x2F4F4F, specular:0x2F4F4F, shininess:30}); 


        this.light_1 = this.scene.getObjectByName('Light_1');
        this.light_1.material = new THREE.MeshPhongMaterial({emissive: 0xFFFAF0}); 

        this.light_2 = this.scene.getObjectByName('Light_2');
        this.light_2.material = new THREE.MeshPhongMaterial({emissive: 0xFFFAF0}); 


        this.platform_light_1 = this.scene.getObjectByName('Platform_light_1');
        this.platform_light_1.material = new THREE.MeshPhongMaterial({emissive: 0xFFFAF0}); 

        this.platform_base_1 = this.scene.getObjectByName('Platform_base_1');
        this.platform_base_1.material = new THREE.MeshPhongMaterial({color: 0x333333, specular:0x333333, shininess:30}); 

        this.platform_top_1 = this.scene.getObjectByName('Platform_top_1');
        this.platform_top_1.material = new THREE.MeshPhongMaterial({color: 0x333333, specular:0x333333, shininess:30}); 
        


        this.platform_light_2 = this.scene.getObjectByName('Platform_light_2');
        this.platform_light_2.material = new THREE.MeshPhongMaterial({emissive: 0xFFFAF0}); 
        
        this.platform_base_2 = this.scene.getObjectByName('Platform_base_2');
        this.platform_base_2.material = new THREE.MeshPhongMaterial({color: 0x333333, specular:0x333333, shininess:30}); 
        
        this.platform_top_2 = this.scene.getObjectByName('Platform_top_2');
        this.platform_top_2.material = new THREE.MeshPhongMaterial({color: 0x333333, specular:0x333333, shininess:30}); 


        this.platform_light_3 = this.scene.getObjectByName('Platform_light_3');
this.platform_light_3.material = new THREE.MeshPhongMaterial({emissive: 0xFFFAF0}); 

this.platform_base_3 = this.scene.getObjectByName('Platform_base_3');
this.platform_base_3.material = new THREE.MeshPhongMaterial({color: 0x333333, specular:0x333333, shininess:30}); 

this.platform_top_3 = this.scene.getObjectByName('Platform_top_3');
this.platform_top_3.material = new THREE.MeshPhongMaterial({color: 0x333333, specular:0x333333, shininess:30}); 


this.platform_light_4 = this.scene.getObjectByName('Platform_light_4');
this.platform_light_4.material = new THREE.MeshPhongMaterial({emissive: 0xFFFAF0}); 

this.platform_base_4 = this.scene.getObjectByName('Platform_base_4');
this.platform_base_4.material = new THREE.MeshPhongMaterial({color: 0x333333, specular:0x333333, shininess:30}); 

this.platform_top_4 = this.scene.getObjectByName('Platform_top_4');
this.platform_top_4.material = new THREE.MeshPhongMaterial({color: 0x333333, specular:0x333333, shininess:30}); 



        this.object_to_move = this.scene.getObjectByName('Sphere');
        this.object_to_move.material = new THREE.MeshPhongMaterial({color: 0xDC143C, specular:0xDC143C, shininess:5}); 

        this.set_texture_table();
        //utils.print_dump_object(this.scene);
    }

    _get_my_light_helper(light, size){
        const radius = size;
        const widthSegments = 10;
        const heightSegments = 10;

        const sphereGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
         
        const material = new THREE.MeshPhongMaterial({emissive: 0xFFFF00});
        const mesh = new THREE.Mesh(sphereGeometry, material);

        mesh.position.set(light.position.x, light.position.y, light.position.z);
        return mesh;
    }

    init(){
        // const color = 0xFFFFFF;
        // const intensity = 0.5;

        // this.light = new THREE.PointLight(color, intensity);
        // this.light.position.set(0, 2.5, 0);
    
        // const size = 0.1;
        // this.light_helper = this._get_my_light_helper(this.light, size)


        // this.scene.add(this.light);
        // this.scene.add(this.light_helper);

        // const ambient_light = new THREE.AmbientLight(color, intensity);
        // this.scene.add(ambient_light)

        

        utils.print_dump_object(this.scene);
        //plane.material.color = color;
    }


    set_texture_table(){
        const texture_loader = new THREE.TextureLoader();
        const base_color = texture_loader.load('./images_texture/metal/Metal_scratched_008_basecolor.jpg');
        
        base_color.wrapS = THREE.RepeatWrapping;
        base_color.wrapT = THREE.RepeatWrapping;

        base_color.repeat.set(8, 8)

        const normal_map = texture_loader.load('./images_texture/metal/Metal_scratched_008_normal.jpg');
        const height_map = texture_loader.load('./images_texture/metal/Metal_scratched_008_height.png');

        const roughness_map = texture_loader.load('./images_texture/metal/Metal_scratched_008_roughness.jpg');
        const ambient_occlusion_map = texture_loader.load('./images_texture/metal/Metal_scratched_008_ambientOcclusion.jpg');
        const metallic_map = texture_loader.load('./images_texture/metal/Metal_scratched_008_metallic.jpg');


        let table_base = this.scene.getObjectByName('Table_base');
        table_base.material = new THREE.MeshPhongMaterial({color: 0x2F4F4F, specular:0x2F4F4F, shininess:40}); 

        let table_top = this.scene.getObjectByName('Table_top');
        table_top.material = new THREE.MeshPhongMaterial({color: 0x2F4F4F, specular:0x2F4F4F, shininess:40}); 

    }
}

export { Environment };

