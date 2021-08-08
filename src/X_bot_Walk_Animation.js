import { Vector4 } from '../build/three.module.js';
import * as TWEEN from '../build/tween.esm.js';
import * as THREE from '../build/three.module.js';

import { Tween_spline } from './Tween_spline.js'

class X_Bot_Walk_Animation{
    
    constructor(_x_bot){

        this.x_bot = _x_bot;
    
        this.hips_position_start = null;
        
        this.array_animation = {
            // HIPS --------------------------------------------
            hips_position: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0, 500.0, 1000, 1500.0, 2000], 
                    // values: [{x: 2.38, y: 99.44, z:83.63}, 
                    //     {x: 1.28, y: 95.57, z:127.49}, 
                    //     {x: 0.33, y: 99.54, z:169.39}, 
                    //     {x: 1.72, y: 96.49, z:209.17}, 
                    //     {x: 2.38, y: 99.44, z:251.51}]
                    values: [{x: 2.38, y: 99.44}, 
                        {x: 1.28, y: 95.57}, //44
                        {x: 0.33, y: 99.54}, //42
                        {x: 1.72, y: 96.49}, //40
                        {x: 2.38, y: 99.44}] //42
                }
            },
            
            hips_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0, 500.0, 1000, 1500.0, 2000], 
                    values: [{x: -0.03, y: -0.04, z:0.04, w: 1.0}, 
                        {x: -0.01, y: 0.06, z:-0.02, w: 1.0}, 
                        {x: -0.02, y: 0.02, z:-0.03, w: 1.0}, 
                        {x: -0.01, y: -0.05, z:0.01, w: 1.0}, 
                        {x: -0.03, y: -0.04, z:0.04, w: 1.0}]
                }
            },
            //_________________________________________________________

            // SPINES ----------------------------------------------------
            spine_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0, 500.0, 1000, 1500.0, 2000], 
                    values: [{x: 0.03, y: 0.0, z:-0.05, w: 1.0}, 
                        {x: 0.02, y: -0.03, z:0.02, w: 1.0}, 
                        {x: 0.03, y: 0.02, z:0.03, w: 1.0}, 
                        {x: 0.03, y: 0.04, z:-0.01, w: 1.0}, 
                        {x: 0.03, y: 0.0, z:-0.05, w: 1.0}]
                }
            },

            spine1_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0, 500.0, 1000, 1500.0, 2000], 
                    values: [{x: 0.02, y: 0.0, z:-0.0, w: 1.0}, 
                        {x: 0.01, y: -0.0, z:0.0, w: 1.0}, 
                        {x: 0.02, y: 0.0, z:0.0, w: 1.0}, 
                        {x: 0.01, y: 0.01, z:-0.0, w: 1.0}, 
                        {x: 0.02, y: 0.0, z:-0.0, w: 1.0}]
                }
            },
            
            spine2_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0, 500.0, 1000, 1500.0, 2000], 
                    values: [{x: 0.02, y: -0.0, z:-0.0, w: 1.0}, 
                        {x: 0.01, y: -0.0, z:0.0, w: 1.0}, 
                        {x: 0.02, y: 0.0, z:0.0, w: 1.0}, 
                        {x: 0.01, y: 0.01, z:-0.0, w: 1.0}, 
                        {x: 0.02, y: -0.0, z:-0.0, w: 1.0}]
                }
            },
            // __________________________________________________________

            // NECK -----------------------------------------------------
            neck_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0, 500.0, 1000, 1500.0, 2000], 
                    values: [{x: -0.01, y: 0.01, z:-0.0, w: 1.0}, 
                        {x: -0.01, y: 0.0, z:-0.01, w: 1.0}, 
                        {x: -0.0, y: 0.0, z:-0.0, w: 1.0}, 
                        {x: -0.01, y: 0.01, z:-0.0, w: 1.0}, 
                        {x: -0.01, y: 0.01, z:-0.0, w: 1.0}]
                }
            },
            // _________________________________________________________

            // HEAD ---------------------------------------------------
            head_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0, 500.0, 1000, 1500.0, 2000], 
                    values: [{x: -0.05, y: -0.0, z:0.0, w: 1.0}, 
                        {x: -0.06, y: -0.04, z:0.0, w: 1.0}, 
                        {x: -0.04, y: -0.05, z:0.01, w: 1.0}, 
                        {x: -0.06, y: -0.03, z:0.0, w: 1.0}, 
                        {x: -0.05, y: -0.0, z:0.0, w: 1.0}]
                }
            },
            // _______________________________________________________

            // LEFT UPPER LIMBS ------------------------------------
            leftshoulder_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0, 500.0, 1000, 1500.0, 2000], 
                    values: [{x: 0.01, y: -0.02, z:-0.06, w: 1.0}, 
                        {x: 0.01, y: -0.04, z:-0.06, w: 1.0}, 
                        {x: 0.01, y: -0.03, z:-0.05, w: 1.0}, 
                        {x: 0.01, y: -0.01, z:-0.06, w: 1.0}, 
                        {x: 0.01, y: -0.02, z:-0.06, w: 1.0}]
                }
            },
            
            leftarm_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0, 500.0, 1000, 1500.0, 2000], 
                    values: [{x: 0.12, y: -0.19, z:-0.51, w: 0.83}, 
                        {x: 0.04, y: -0.3, z:-0.4, w: 0.84}, 
                        {x: 0.1, y: -0.18, z:-0.54, w: 0.84}, 
                        {x: 0.16, y: 0.02, z:-0.59, w: 0.84}, 
                        {x: 0.12, y: -0.19, z:-0.51, w: 0.85}]
                }
            },
            
            leftforearm_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0, 500.0, 1000, 1500.0, 2000], 
                    values: [{x: -0.01, y: -0.06, z:-0.0, w: 1.0}, 
                        {x: -0.02, y: -0.27, z:-0.0, w: 1.0}, 
                        {x: -0.01, y: -0.08, z:-0.0, w: 1.0}, 
                        {x: -0.01, y: -0.07, z:-0.0, w: 1.0}, 
                        {x: -0.01, y: -0.06, z:-0.0, w: 1.0}]
                }
            },
            // ______________________________________________________

            // LEFT HAND --------------------------------------------
            lefthand_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0, 500.0, 1000, 1500.0, 2000], 
                    values: [{x: -0.18, y: 0.06, z:0.17, w: 0.97}, 
                        {x: -0.26, y: 0.0, z:0.23, w: 0.97}, 
                        {x: -0.21, y: 0.05, z:0.16, w: 0.96}, 
                        {x: -0.16, y: 0.1, z:0.14, w: 0.96}, 
                        {x: -0.18, y: 0.06, z:0.17, w: 0.96}]
                }
            },

            // thumb
            lefthandthumb1_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0], 
                    values: [{x: 0.05, y: -0.01, z:0.08, w: 1.0}]
                }
            },
            lefthandthumb2_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0], 
                    values: [{x: 0.05, y: 0.23, z:0.04, w: 0.97}]
                }
            },
            lefthandthumb3_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0], 
                    values: [{x: 0.05, y: 0.13, z:0.01, w: 0.99}]
                }
            },
            
            // index
            lefthandindex1_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0], 
                    values: [{x: -0.02, y: 0.01, z:-0.17, w: 0.99}]
                }
            },
            lefthandindex2_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0], 
                    values: [{x: -0.0, y: 0.03, z:-0.18, w: 0.98}]
                }
            },
            lefthandindex3_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0], 
                    values: [{x: -0.0, y: -0.01, z:0.03, w: 1.0}]
                }
            },
            
            //middle
            lefthandmiddle1_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0], 
                    values: [{x: -0.01, y: 0.06, z:-0.22, w: 0.97}]
                }
            },
            lefthandmiddle2_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0], 
                    values: [{x: -0.0, y: 0.03, z:-0.19, w: 0.98}]
                }
            },
            lefthandmiddle3_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0], 
                    values: [{x: 0.0, y: -0.0, z:0.03, w: 1.0}]
                }
            },
            
            //ring
            lefthandring1_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0], 
                    values: [{x: -0.0, y: 0.09, z:-0.28, w: 0.96}]
                }
            },
            lefthandring2_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0], 
                    values: [{x: 0.0, y: 0.02, z:-0.16, w: 0.99}]
                }
            },
            lefthandring3_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0], 
                    values: [{x: 0.0, y: 0.0, z:-0.02, w: 1.0}]
                }
            },
            
            //pinky
            lefthandpinky1_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0], 
                    values: [{x: -0.01, y: 0.12, z:-0.31, w: 0.94}]
                }
            },
            lefthandpinky2_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0], 
                    values: [{x: -0.0, y: 0.01, z:-0.16, w: 0.99}]
                }
            },
            lefthandpinky3_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0], 
                    values: [{x: -0.0, y: 0.01, z:0.01, w: 1.0}]
                }
            },
            // ______________________________________________________

            // RIGHT UPPER LIMBS ------------------------------------
            rightshoulder_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0, 500.0, 1000, 1500.0, 2000], 
                    values: [{x: 0.01, y: 0.05, z:0.06, w: 1.0}, 
                        {x: 0.01, y: 0.01, z:0.07, w: 1.0}, 
                        {x: 0.01, y: 0.04, z:0.07, w: 1.0}, 
                        {x: 0.01, y: 0.06, z:0.06, w: 1.0}, 
                        {x: 0.01, y: 0.05, z:0.06, w: 1.0}]
                }
            },
            
            rightarm_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0, 500.0, 1000, 1500.0, 2000], 
                    values: [{x: 0.1, y: 0.08, z:0.55, w: 0.83}, 
                        {x: 0.11, y: -0.1, z:0.56, w: 0.83}, 
                        {x: 0.07, y: 0.12, z:0.52, w: 0.83}, 
                        {x: 0.06, y: 0.22, z:0.47, w: 0.83}, 
                        {x: 0.1, y: 0.08, z:0.55, w: 0.83}]
                }
            },
            
            //fore arm
            rightforearm_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0, 500.0, 1000, 1500.0, 2000], 
                    values: [{x: -0.01, y: 0.11, z:-0.0, w: 0.99}, 
                        {x: -0.01, y: 0.06, z:0.0, w: 0.99}, 
                        {x: -0.01, y: 0.14, z:0.0, w: 0.99}, 
                        {x: -0.02, y: 0.22, z:-0.0, w: 1.0}, 
                        {x: -0.01, y: 0.11, z:-0.0, w: 1.0}]
                }
            },
            // _____________________________________________________

            // RIGHT HAND --------------------------------------------
            righthand_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0, 500.0, 1000, 1500.0, 2000], 
                    values: [{x: -0.07, y: 0.06, z:-0.09, w: 0.99}, 
                        {x: -0.07, y: 0.01, z:-0.1, w: 0.99}, 
                        {x: -0.11, y: 0.06, z:-0.12, w: 0.99}, 
                        {x: -0.14, y: 0.1, z:-0.14, w: 0.99}, 
                        {x: -0.07, y: 0.06, z:-0.09, w: 0.99}]
                }
            },
            
            //pinky
            righthandpinky1_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0], 
                    values: [{x: -0.0, y: -0.15, z:0.29, w: 0.95}]
                }
            },
            righthandpinky2_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0], 
                    values: [{x: -0.0, y: -0.01, z:0.16, w: 0.99}]
                }
            },
            righthandpinky3_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0], 
                    values: [{x: -0.0, y: 0.01, z:0.09, w: 1.0}]
                }
            },
            
            //ring
            righthandring1_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0], 
                    values: [{x: -0.0, y: -0.1, z:0.27, w: 0.96}]
                }
            },
            righthandring2_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0], 
                    values: [{x: 0.0, y: -0.02, z:0.16, w: 0.99}]
                }
            },
            righthandring3_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0], 
                    values: [{x: -0.0, y: 0.01, z:0.08, w: 1.0}]
                }
            },
            
            // middle
            righthandmiddle1_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0], 
                    values: [{x: -0.01, y: -0.06, z:0.23, w: 0.97}]
                }
            },
            righthandmiddle2_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0], 
                    values: [{x: -0.0, y: -0.03, z:0.19, w: 0.98}]
                }
            },
            righthandmiddle3_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0], 
                    values: [{x: -0.0, y: -0.01, z:0.09, w: 1.0}]
                }
            },
            
            //index
            righthandindex1_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0], 
                    values: [{x: -0.02, y: -0.02, z:0.15, w: 0.99}]
                }
            },
            righthandindex2_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0], 
                    values: [{x: -0.0, y: -0.03, z:0.18, w: 0.98}]
                }
            },
            righthandindex3_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0], 
                    values: [{x: -0.0, y: 0.0, z:0.08, w: 1.0}]
                }
            },
            
            // thumb
            righthandthumb1_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0], 
                    values: [{x: 0.02, y: -0.07, z:-0.04, w: 1.0}]
                }
            },
            righthandthumb2_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0], 
                    values: [{x: 0.01, y: -0.12, z:-0.08, w: 0.99}]
                }
            },
            righthandthumb3_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0], 
                    values: [{x: 0.05, y: -0.13, z:-0.0, w: 0.99}]
                }
            },
            // _____________________________________________________

            // LEFT DOWN LIMBS ------------------------------------
            leftupleg_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0, 500.0, 1000, 1500.0, 2000], 
                    values: [{x: -0.12, y: 0.05, z:-0.08, w: 0.99}, 
                        {x: 0.07, y: 0.05, z:0.04, w: 0.99}, 
                        {x: -0.29, y: 0.0, z:0.03, w: 0.99}, 
                        {x: -0.28, y: 0.01, z:-0.02, w: 0.99}, 
                        {x: -0.12, y: 0.05, z:-0.08, w: 1.0}]
                }
            },
            
            leftleg_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0, 500.0, 1000, 1500.0, 2000], 
                    values: [{x: 0.26, y: 0.02, z:0.01, w: 0.96}, 
                        {x: 0.3, y: -0.03, z:-0.01, w: 0.97}, 
                        {x: 0.51, y: 0.06, z:0.04, w: 0.97}, 
                        {x: 0.1, y: 0.07, z:0.01, w: 0.97}, 
                        {x: 0.26, y: 0.02, z:0.01, w: 0.97}]
                }
            },
            // ________________________________________________________

            // LEFT FOOT -----------------------------------------------
            leftfoot_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0, 500.0, 1000, 1500.0, 2000], 
                    values: [{x: -0.12, y: -0.01, z:0.03, w: 0.99}, 
                        {x: -0.07, y: -0.01, z:0.04, w: 0.99}, 
                        {x: 0.03, y: 0.0, z:0.05, w: 0.99}, 
                        {x: 0.0, y: -0.02, z:0.03, w: 0.99}, 
                        {x: -0.12, y: -0.01, z:0.03, w: 0.98}]
                }
            },
            
            lefttoebase_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0, 500.0, 1000, 1500.0, 2000], 
                    values: [{x: -0.03, y: 0.0, z:0.0, w: 1.0}, 
                        {x: -0.31, y: -0.0, z:-0.02, w: 1.0}, 
                        {x: -0.02, y: 0.0, z:-0.0, w: 1.0}, 
                        {x: -0.04, y: 0.0, z:0.0, w: 1.0}, 
                        {x: -0.03, y: 0.0, z:0.0, w: 1.0}]
                }
            },
            //__________________________________________________________

            // RIGHT DOWN LIMBS ------------------------------------
            rightupleg_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0, 500.0, 1000, 1500.0, 2000], 
                    values: [{x: -0.27, y: 0.02, z:-0.05, w: 0.96}, 
                        {x: -0.31, y: -0.02, z:0.02, w: 0.96}, 
                        {x: -0.12, y: -0.07, z:0.06, w: 0.95}, 
                        {x: 0.1, y: -0.06, z:-0.03, w: 0.95}, 
                        {x: -0.27, y: 0.02, z:-0.05, w: 0.95}]
                }
            },
            
            rightleg_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0, 500.0, 1000, 1500.0, 2000], 
                    values: [{x: 0.51, y: -0.05, z:-0.04, w: 0.86}, 
                        {x: 0.15, y: -0.02, z:-0.0, w: 0.88}, 
                        {x: 0.26, y: 0.06, z:0.02, w: 0.9}, 
                        {x: 0.23, y: 0.07, z:0.02, w: 0.92}, 
                        {x: 0.51, y: -0.05, z:-0.04, w: 0.94}]
                }
            },
            // _________________________________________________________

            // RIGHT FOOT -------------------------------------------------
            rightfoot_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0, 500.0, 1000, 1500.0, 2000], 
                    values: [{x: 0.03, y: 0.0, z:-0.08, w: 1.0}, 
                        {x: 0.02, y: 0.0, z:-0.02, w: 1.0}, 
                        {x: -0.12, y: -0.0, z:-0.05, w: 1.0}, 
                        {x: -0.14, y: 0.05, z:-0.05, w: 1.0}, 
                        {x: 0.03, y: 0.0, z:-0.08, w: 1.0}]
                }
            },
            
            righttoebase_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0, 500.0, 1000, 1500.0, 2000], 
                    values: [{x: -0.05, y: 0.0, z:0.03, w: 1.0}, 
                        {x: -0.07, y: -0.0, z:0.0, w: 1.0}, 
                        {x: -0.04, y: -0.0, z:0.0, w: 1.0}, 
                        {x: -0.21, y: 0.0, z:0.0, w: 1.0}, 
                        {x: -0.05, y: 0.0, z:0.03, w: 1.0}]
                }
            },
            // ___________________________________________________________
        }

        

    }

    _init_fix_component(component, x_bot_part){
        const value = component.animation.values[0];
        if(x_bot_part.hasOwnProperty("_w")){
            x_bot_part.set(value.x, value.y, value.z, value.w);
        }
        else if(x_bot_part.hasOwnProperty("x")){
            x_bot_part.set(value.x, value.y, value.z);
        }
        else{
            console.log("ERROR")
        }
    }

    _init_default_tween(component, x_bot_part){
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
        component.enable = true;
        component.tween = new Tween_spline(component.animation['times'], component.animation['values'], 
                                            component.func, 
                                            TWEEN.Easing.Quadratic.None, 
                                            TWEEN.Interpolation.CatmullRom);
        component.tween.init(true);
    }

    _init_default(component, x_bot_part){
        const num_key_frames = component.animation.times.length;

        if(num_key_frames == 1){
            this._init_fix_component(component, x_bot_part);
        }
        else{
            this._init_default_tween(component, x_bot_part);
        }
    }

    _init_hips_position(component, x_bot_part){
        this.hips_position_start_z = this.x_bot.parts.hips.position.z;

        // const component = this.array_animation.hips_position;
        // const x_bot_part = this.x_bot.parts.hips.position;

        component.func = (object) => {
            //const old_z = x_bot_part.z;
            x_bot_part.x = object.x;
            x_bot_part.y = object.y;
            //x_bot_part.set(object.x, object.y, old_z+object.z);
            //console.log(object.z);
        }
        component.enable = true;
        component.tween = new Tween_spline(component.animation['times'], component.animation['values'], 
                                            component.func, 
                                            TWEEN.Easing.Quadratic.None, 
                                            TWEEN.Interpolation.CatmullRom);
        component.tween.init(true);


        
    }


    init(){

        // HIPS -------------------------------------------------------------------------------------------------
        //this._init_default(this.array_animation.hips_position, this.x_bot.parts.hips.position)
        this._init_hips_position(this.array_animation.hips_position, this.x_bot.parts.hips.position);
        // ____________________________________________________________________________________________________
    
        // HIPS -----------------------------------------------
        this._init_default(this.array_animation.hips_quaternion, this.x_bot.parts.hips.quaternion)
        // __________________________________________________________
    
        // SPINE -----------------------------------------------
        this._init_default(this.array_animation.spine_quaternion, this.x_bot.parts.spine.quaternion)
        this._init_default(this.array_animation.spine1_quaternion, this.x_bot.parts.spine_1.quaternion)
        this._init_default(this.array_animation.spine2_quaternion, this.x_bot.parts.spine_2.quaternion)
        // __________________________________________________________

        // NECK ----------------------------------------------------
        this._init_default(this.array_animation.neck_quaternion, this.x_bot.parts.neck.quaternion)
        // _________________________________________________________

        // HEAD -----------------------------------------------------
        this._init_default(this.array_animation.head_quaternion, this.x_bot.parts.head.quaternion)
        // __________________________________________________________

        // LEFT UPPER LIMBS ------------------------------------
        this._init_default(this.array_animation.leftshoulder_quaternion, this.x_bot.parts.left_shoulder.quaternion)
        this._init_default(this.array_animation.leftarm_quaternion, this.x_bot.parts.left_arm.quaternion)
        this._init_default(this.array_animation.leftforearm_quaternion, this.x_bot.parts.left_fore_arm.quaternion)
        // ______________________________________________________


        // LEFT HAND --------------------------------------------
        this._init_default(this.array_animation.lefthand_quaternion, this.x_bot.parts.left_hand.quaternion)

        // thumb
        this._init_default(this.array_animation.lefthandthumb1_quaternion, this.x_bot.parts.left_hand_thumb_1.quaternion)
        this._init_default(this.array_animation.lefthandthumb2_quaternion, this.x_bot.parts.left_hand_thumb_2.quaternion)
        this._init_default(this.array_animation.lefthandthumb3_quaternion, this.x_bot.parts.left_hand_thumb_3.quaternion)

        // index
        this._init_default(this.array_animation.lefthandindex1_quaternion, this.x_bot.parts.left_hand_index_1.quaternion)
        this._init_default(this.array_animation.lefthandindex2_quaternion, this.x_bot.parts.left_hand_index_2.quaternion)
        this._init_default(this.array_animation.lefthandindex3_quaternion, this.x_bot.parts.left_hand_index_3.quaternion)

        //middle
        this._init_default(this.array_animation.lefthandmiddle1_quaternion, this.x_bot.parts.left_hand_middle_1.quaternion)
        this._init_default(this.array_animation.lefthandmiddle2_quaternion, this.x_bot.parts.left_hand_middle_2.quaternion)
        this._init_default(this.array_animation.lefthandmiddle3_quaternion, this.x_bot.parts.left_hand_middle_3.quaternion)

        //ring
        this._init_default(this.array_animation.lefthandring1_quaternion, this.x_bot.parts.left_hand_ring_1.quaternion)
        this._init_default(this.array_animation.lefthandring2_quaternion, this.x_bot.parts.left_hand_ring_2.quaternion)
        this._init_default(this.array_animation.lefthandring3_quaternion, this.x_bot.parts.left_hand_ring_3.quaternion)

        //pinky
        this._init_default(this.array_animation.lefthandpinky1_quaternion, this.x_bot.parts.left_hand_pinky_1.quaternion)
        this._init_default(this.array_animation.lefthandpinky2_quaternion, this.x_bot.parts.left_hand_pinky_2.quaternion)
        this._init_default(this.array_animation.lefthandpinky3_quaternion, this.x_bot.parts.left_hand_pinky_3.quaternion)
        // ______________________________________________________


        // RIGHT UPPER LIMBS ------------------------------------
        this._init_default(this.array_animation.rightshoulder_quaternion, this.x_bot.parts.right_shoulder.quaternion)
        this._init_default(this.array_animation.rightarm_quaternion, this.x_bot.parts.right_arm.quaternion)
        this._init_default(this.array_animation.rightforearm_quaternion, this.x_bot.parts.right_fore_arm.quaternion)
        // ______________________________________________________

        // RIGHT HAND --------------------------------------------
        this._init_default(this.array_animation.righthand_quaternion, this.x_bot.parts.right_hand.quaternion)

        // thumb
        this._init_default(this.array_animation.righthandthumb1_quaternion, this.x_bot.parts.right_hand_thumb_1.quaternion)
        this._init_default(this.array_animation.righthandthumb2_quaternion, this.x_bot.parts.right_hand_thumb_2.quaternion)
        this._init_default(this.array_animation.righthandthumb3_quaternion, this.x_bot.parts.right_hand_thumb_3.quaternion)

        // index
        this._init_default(this.array_animation.righthandindex1_quaternion, this.x_bot.parts.right_hand_index_1.quaternion)
        this._init_default(this.array_animation.righthandindex2_quaternion, this.x_bot.parts.right_hand_index_2.quaternion)
        this._init_default(this.array_animation.righthandindex3_quaternion, this.x_bot.parts.right_hand_index_3.quaternion)

        //middle
        this._init_default(this.array_animation.righthandmiddle1_quaternion, this.x_bot.parts.right_hand_middle_1.quaternion)
        this._init_default(this.array_animation.righthandmiddle2_quaternion, this.x_bot.parts.right_hand_middle_2.quaternion)
        this._init_default(this.array_animation.righthandmiddle3_quaternion, this.x_bot.parts.right_hand_middle_3.quaternion)

        //ring
        this._init_default(this.array_animation.righthandring1_quaternion, this.x_bot.parts.right_hand_ring_1.quaternion)
        this._init_default(this.array_animation.righthandring2_quaternion, this.x_bot.parts.right_hand_ring_2.quaternion)
        this._init_default(this.array_animation.righthandring3_quaternion, this.x_bot.parts.right_hand_ring_3.quaternion)

        //pinky
        this._init_default(this.array_animation.righthandpinky1_quaternion, this.x_bot.parts.right_hand_pinky_1.quaternion)
        this._init_default(this.array_animation.righthandpinky2_quaternion, this.x_bot.parts.right_hand_pinky_2.quaternion)
        this._init_default(this.array_animation.righthandpinky3_quaternion, this.x_bot.parts.right_hand_pinky_3.quaternion)
        // ______________________________________________________
    

        // LEFT DOWN LIMBS ------------------------------------
        this._init_default(this.array_animation.leftupleg_quaternion, this.x_bot.parts.left_up_leg.quaternion)
        this._init_default(this.array_animation.leftleg_quaternion, this.x_bot.parts.left_leg.quaternion)
        // ________________________________________________________

        // LEFT FOOT -----------------------------------------------
        this._init_default(this.array_animation.leftfoot_quaternion, this.x_bot.parts.left_foot.quaternion)
        this._init_default(this.array_animation.lefttoebase_quaternion, this.x_bot.parts.left_toe_base.quaternion)
        // _____________________________________________________

        // RIGHT DOWN LIMBS ------------------------------------
        this._init_default(this.array_animation.rightupleg_quaternion, this.x_bot.parts.right_up_leg.quaternion)
        this._init_default(this.array_animation.rightleg_quaternion, this.x_bot.parts.right_leg.quaternion)
        // ________________________________________________________

        // RIGHT FOOT -----------------------------------------------
        this._init_default(this.array_animation.rightfoot_quaternion, this.x_bot.parts.right_foot.quaternion)
        this._init_default(this.array_animation.righttoebase_quaternion, this.x_bot.parts.right_toe_base.quaternion)
        // _____________________________________________________
    }

    start(){
        // this.array_animation.hips_position.tween.start();
        // this.array_animation.hips_quat.tween.start();
        // this.array_animation.spine_quat.tween.start();

        for (const [key, value] of Object.entries(this.array_animation)) {
            //console.log(key, value);
            if(value.enable){
                value.tween.start();
            }
        }
    }

    update(){
        // this.array_animation.hips_position.tween.update();
        // this.array_animation.hips_quat.tween.update();
        // this.array_animation.spine_quat.tween.update();
        for (const [key, value] of Object.entries(this.array_animation)) {
            //console.log(key, value);
            if(value.enable){
                value.tween.update();
            }
        }

    }
}
export { X_Bot_Walk_Animation };
