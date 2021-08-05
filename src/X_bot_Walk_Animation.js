import { Vector4 } from '../build/three.module.js';
import * as TWEEN from '../build/tween.esm.js';
import * as THREE from '../build/three.module.js';

import { Tween_spline } from './Tween_spline.js'

class X_Bot_Walk_Animation{
    
    constructor(_x_bot){

        this.x_bot = _x_bot
    
        this.array_animation = {
            // HIPS (position) ---------------------------------
            hips_position: {
                func: null,
                tween: null,

                animation: {
                    times: [0, 500, 1000, 1500, 2000],
                    values: [{x: 2.38, y: 99.44, z:83.63}, 
                        {x: 1.28, y: 95.57, z:127.49}, 
                        {x: 0.33, y: 99.54, z:169.39}, 
                        {x: 1.72, y: 96.49, z:209.17}, 
                        {x: 2.38, y: 99.44, z:251.51}]
                },

                start_y: null,
                start_x: null
            },

            hips_quat: {
                func: null,
                tween: null,

                animation: {
                    times: [0, 500, 1000, 1500, 2000],
                    values: [{x: -0.03, y: -0.04, z:0.04, w: 1.0}, 
                        {x: -0.01, y: 0.06, z:-0.02, w: 1.0}, 
                        {x: -0.02, y: 0.02, z:-0.03, w: 1.0}, 
                        {x: -0.01, y: -0.05, z:0.01, w: 1.0}, 
                        {x: -0.03, y: -0.04, z:0.04, w: 1.0}]
                }
            },
            //____________________________________________________________

            // SPINE -----------------------------------------------------
            spine_quat: {
                func: null,
                tween: null,

                animation: {
                    times: [0, 500, 1000, 1500, 2000],
                    values: [{x: 0.03, y: 0.0, z:-0.05, w: 1.0}, 
                        {x: 0.02, y: -0.03, z:0.02, w: 1.0}, 
                        {x: 0.03, y: 0.02, z:0.03, w: 1.0}, 
                        {x: 0.03, y: 0.04, z:-0.01, w: 1.0}, 
                        {x: 0.03, y: 0.0, z:-0.05, w: 1.0}]
                }
            }
            // ____________________________________________________________
        }

        

    }


    _init_default(component, x_bot_part){
        if(x_bot_part.hasOwnProperty("_w")){
            component.func = (object) => {
                x_bot_part.set(object.x, object.y, object.z, object.w);
            } 
        }
        else if(x_bot_part.hasOwnProperty("x")){
            component.func = (object) => {
                x_bot_part.set(object.x, object.y, object.z);
            }
        }
        else{
            console.log("ERROR")
        }

        component.tween = new Tween_spline(component.animation['times'], component.animation['values'], component.func, TWEEN.Easing.Quadratic.Out, TWEEN.Interpolation.CatmullRom);
        component.tween.init(true);
    }

    init(){

        // HIPS -------------------------------------------------------------------------------------------------
        this.array_animation.hips_position.start_y = this.x_bot.parts.hips.position.y;
        this.array_animation.hips_position.start_x = this.x_bot.parts.hips.position.x;

        this._init_default(this.array_animation.hips_position, this.x_bot.parts.hips.position)
        // ____________________________________________________________________________________________________
    
        // HIPS QUAT -----------------------------------------------
        this._init_default(this.array_animation.hips_quat, this.x_bot.parts.hips.quaternion)
        // __________________________________________________________
    
        // SPINE QUAT -----------------------------------------------
        this._init_default(this.array_animation.spine_quat, this.x_bot.parts.spine.quaternion)
        // __________________________________________________________
    }

    start(){
        // this.array_animation.hips_position.tween.start();
        // this.array_animation.hips_quat.tween.start();
        // this.array_animation.spine_quat.tween.start();

        for (const [key, value] of Object.entries(this.array_animation)) {
            //console.log(key, value);
            value.tween.start();
        }
    }

    update(){
        // this.array_animation.hips_position.tween.update();
        // this.array_animation.hips_quat.tween.update();
        // this.array_animation.spine_quat.tween.update();
        for (const [key, value] of Object.entries(this.array_animation)) {
            //console.log(key, value);
            value.tween.update();
        }

    }
}
export { X_Bot_Walk_Animation };
