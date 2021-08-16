
import { X_Bot } from './X_Bot.js'
import { Linear_animation } from './Linear_animation.js'
import { X_Bot_Walk_Animation } from './X_bot_Walk_Animation.js'
import { X_bot_Interpolation_Configuartions } from './X_bot_Interpolation_Configuartions.js'
import * as THREE from '../build/three.module.js';


class X_bot_Walk {

    constructor(x_bot){
        this.x_bot = x_bot;
        
        this.left_key_pressing = false;
        this.right_key_pressing = false;

        this.move_x_bot_started = {z_pos:false, z_neg:false, x_pos:false, x_neg:false};
        this.move_x_bot_running = {z_pos:false, z_neg:false, x_pos:false, x_neg:false};
        this.move_x_bot_linear = {z_pos: new Linear_animation(), 
                                z_neg: new Linear_animation(), 
                                x_pos: new Linear_animation(), 
                                x_neg: new Linear_animation()};

        this.walking = false;

        this.walk_animation = new X_Bot_Walk_Animation(this.x_bot);
        
        this.going_to_rest = false;
        this.going_to_rest_started = false;
        this.going_to_rest_animation_walk_animation = null;

        this.clock_to_rest = new THREE.Clock();
        this.start_time_to_rest;

        this.walk_animation_started = false;
    }
  
    init(){
        const speed = 83;
        this.move_x_bot_linear.z_pos.init(speed, this.x_bot.parts.armature.position, 'z');
        this.move_x_bot_linear.z_neg.init(-speed, this.x_bot.parts.armature.position, 'z');
        this.move_x_bot_linear.x_pos.init(speed, this.x_bot.parts.armature.position, 'x');
        this.move_x_bot_linear.x_neg.init(-speed, this.x_bot.parts.armature.position, 'x');

        this.walk_animation.init();
    }




    keydown_dispatcher(name){
        let rotation_y = this.x_bot.parts.armature.rotation.y;
        if(name == 'ArrowUp'){
            this._start_linear(rotation_y);
            this.walking = true;
        }
        else if(name == 'ArrowLeft'){
            if(!this.left_key_pressing){
                this.left_key_pressing = true;
                this._reset_linear(rotation_y);
                const tmp = this.x_bot.parts.armature.rotation.y + Math.PI/2;
                if(tmp > Math.PI){
                    this.x_bot.parts.armature.rotation.y = -Math.PI/2;
                }
                else{
                    this.x_bot.parts.armature.rotation.y = tmp;
                }
                if(this.walking){
                    this._start_linear(this.x_bot.parts.armature.rotation.y);
                }
            }
        }
        else if(name == 'ArrowRight'){
            if(!this.right_key_pressing){
                this.right_key_pressing = true;
                this._reset_linear(rotation_y);
                const tmp = this.x_bot.parts.armature.rotation.y - Math.PI/2;
                if(tmp < -Math.PI/2){
                    this.x_bot.parts.armature.rotation.y = Math.PI;
                }
                else{
                    this.x_bot.parts.armature.rotation.y = tmp;
                }
                if(this.walking){
                    this._start_linear(this.x_bot.parts.armature.rotation.y);
                }
            }
        }
    }

    keyup_dispatcher(name){
        let rotation_y = this.x_bot.parts.armature.rotation.y;
        if(name == 'ArrowUp'){
            this._reset_linear(rotation_y);
            this.walking = false;
            this.walk_animation_started = false;
            this.going_to_rest = true;

            this.walk_animation.reset();

        }
        else if(name == 'ArrowLeft'){
            this.left_key_pressing = false;
        }
        else if(name == 'ArrowRight'){
            this.right_key_pressing = false;
        }
    }

    update(){
        if(this.walking){
            if(!this.walk_animation_started){
                this.walk_animation_started = true;
                this.walk_animation.start();
            }
    
            this.walk_animation.update();
            this._move_forward(this.x_bot.parts.armature.rotation.y);
            this.going_to_rest = false;
            this.going_to_rest_started = false;
        }
        else if(this.going_to_rest){
            if(!this.going_to_rest_started){
                const current_config = this.x_bot.get_current_configuration();
                const rest_conf = this.x_bot.rest_configuration;
    
                this.going_to_rest_animation_walk_animation = new X_bot_Interpolation_Configuartions(this.x_bot);
                this.going_to_rest_animation_walk_animation.init(current_config, rest_conf, 400);
                this.going_to_rest_animation_walk_animation.start();
                this.going_to_rest_started = true;

                this.clock_to_rest.start();
                this.start_time_to_rest = this.clock_to_rest.getElapsedTime();
            }
            if(this.clock_to_rest.getElapsedTime()- this.start_time_to_rest > 2000){
                this.going_to_rest = false;
                this.going_to_rest_started = false;
            }
            this.going_to_rest_animation_walk_animation.update();
        }
        else{
            this.x_bot.set_rest_configuration();
        }
    }



    _move_forward(rotation_y){
        if(rotation_y == 0){
            this.move_x_bot_linear.z_pos.update();
        }
        else if(rotation_y == Math.PI/2){
            this.move_x_bot_linear.x_pos.update();
        }
        else if(rotation_y == -Math.PI/2){
            this.move_x_bot_linear.x_neg.update();
        }
        else if(rotation_y == Math.PI){
            this.move_x_bot_linear.z_neg.update();
        }
    }

    _start_linear(rotation_y){
        if(rotation_y == 0){
            this._start_linear_by_name('z_pos');
        }
        else if(rotation_y == Math.PI/2){
            this._start_linear_by_name('x_pos');
        }
        else if(rotation_y == -Math.PI/2){
            this._start_linear_by_name('x_neg');
        }
        else if(rotation_y == Math.PI){
            this._start_linear_by_name('z_neg');
        }
    }

    _start_linear_by_name(x_z_pos_neg){
        if(!this.move_x_bot_started[x_z_pos_neg]){
            this.move_x_bot_linear[x_z_pos_neg].start();
            this.move_x_bot_started[x_z_pos_neg] = true;
        }
        this.move_x_bot_running[x_z_pos_neg] = true;
    }



    _reset_linear(rotation_y){
        if(rotation_y == 0){
            this._reset_linear_by_name('z_pos');
        }
        else if(rotation_y == Math.PI/2){
            this._reset_linear_by_name('x_pos');
        }
        else if(rotation_y == -Math.PI/2){
            this._reset_linear_by_name('x_neg');
        }
        else if(rotation_y == Math.PI){
            this._reset_linear_by_name('z_neg');
        }
    }

    _reset_linear_by_name(x_z_pos_neg){
        this.move_x_bot_started[x_z_pos_neg] = false;
        this.move_x_bot_running[x_z_pos_neg] = false;
        this.move_x_bot_linear[x_z_pos_neg].reset();
    }
};
export { X_bot_Walk };