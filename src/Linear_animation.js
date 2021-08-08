import * as THREE from '../build/three.module.js';

class Linear_animation{
    
    constructor(){
        this.angular_coefficient = null;
        this.distance_traveled = null;
        this.clock = null;
        this.object_to_control = null;
        this.name_component_to_control = null;
        this.elapsed = null;
    }

    init(angular_coefficient, object_to_control, name_component_to_control){
        this.angular_coefficient = angular_coefficient;
        this.clock = new THREE.Clock();
        this.distance_traveled = 0;
        this.object_to_control = object_to_control;
        this.name_component_to_control = name_component_to_control;
        this.elapsed = 0;
    }

    start(){
        this.clock.start();
    }

    update(){
        this.elapsed = this.clock.getElapsedTime();
        const y = this.angular_coefficient * this.elapsed - this.distance_traveled;
        this.distance_traveled += y;

        this.object_to_control[this.name_component_to_control] += y;
    }
}

export { Linear_animation };
