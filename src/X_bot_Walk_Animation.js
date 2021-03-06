import { X_Bot_Animation } from './X_Bot_Animation.js'

class X_Bot_Walk_Animation{
    
    constructor(_x_bot){

        this.x_bot = _x_bot;

        this.array_animation = {
            hips_position: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0, 500.0, 1000, 1500.0, 2000], 
                    values: [{x: 2.38, y: 102.44}, 
                        {x: 1.28, y: 98.57}, 
                        {x: 0.33, y: 102.54}, 
                        {x: 1.72, y: 99.49}, 
                        {x: 2.38, y: 102.44}] 
                }
            },
            
            hips_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0, 500.0, 1000, 1500.0, 2000], 
                    values: [{x: -0.02993868846867511, y: -0.039918251291566814, z:0.039918251291566814, w: 0.9979562822891704}, 
                        {x: -0.009979562822891704, y: 0.05987737693735022, z:-0.019959125645783407, w: 0.9979562822891704}, 
                        {x: -0.019983021644339353, y: 0.019983021644339353, z:-0.02997453246650903, w: 0.9991510822169677}, 
                        {x: -0.009986527276135589, y: -0.04993263638067795, z:0.009986527276135589, w: 0.9986527276135589}, 
                        {x: -0.02993868846867511, y: -0.039918251291566814, z:0.039918251291566814, w: 0.9979562822891704}]
                }
            },
            
            spine_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0, 500.0, 1000, 1500.0, 2000], 
                    values: [{x: 0.029949129682617866, y: 0.0, z:-0.04991521613769644, w: 0.9983043227539289}, 
                        {x: 0.019983021644339353, y: -0.02997453246650903, z:0.019983021644339353, w: 0.9991510822169677}, 
                        {x: 0.02996705435036678, y: 0.019978036233577856, z:0.02996705435036678, w: 0.9989018116788927}, 
                        {x: 0.029961075885598987, y: 0.039948101180798654, z:-0.009987025295199663, w: 0.9987025295199663}, 
                        {x: 0.029949129682617866, y: 0.0, z:-0.04991521613769644, w: 0.9983043227539289}]
                }
            },
            
            spine1_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0, 500.0, 1000, 1500.0, 2000], 
                    values: [{x: 0.01999600119960014, y: 0.0, z:-0.0, w: 0.9998000599800071}, 
                        {x: 0.009999500037496877, y: -0.0, z:0.0, w: 0.9999500037496877}, 
                        {x: 0.01999600119960014, y: 0.0, z:0.0, w: 0.9998000599800071}, 
                        {x: 0.009999000149975006, y: 0.009999000149975006, z:-0.0, w: 0.9999000149975006}, 
                        {x: 0.01999600119960014, y: 0.0, z:-0.0, w: 0.9998000599800071}]
                }
            },
            
            spine2_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0, 500.0, 1000, 1500.0, 2000], 
                    values: [{x: 0.01999600119960014, y: -0.0, z:-0.0, w: 0.9998000599800071}, 
                        {x: 0.009999500037496877, y: -0.0, z:0.0, w: 0.9999500037496877}, 
                        {x: 0.01999600119960014, y: 0.0, z:0.0, w: 0.9998000599800071}, 
                        {x: 0.009999000149975006, y: 0.009999000149975006, z:-0.0, w: 0.9999000149975006}, 
                        {x: 0.01999600119960014, y: -0.0, z:-0.0, w: 0.9998000599800071}]
                }
            },
            
            neck_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0, 500.0, 1000, 1500.0, 2000], 
                    values: [{x: -0.009999000149975006, y: 0.009999000149975006, z:-0.0, w: 0.9999000149975006}, 
                        {x: -0.009999000149975006, y: 0.0, z:-0.009999000149975006, w: 0.9999000149975006}, 
                        {x: -0.0, y: 0.0, z:-0.0, w: 1.0}, 
                        {x: -0.009999000149975006, y: 0.009999000149975006, z:-0.0, w: 0.9999000149975006}, 
                        {x: -0.009999000149975006, y: 0.009999000149975006, z:-0.0, w: 0.9999000149975006}]
                }
            },
            
            head_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0, 500.0, 1000, 1500.0, 2000], 
                    values: [{x: -0.04993761694389223, y: -0.0, z:0.0, w: 0.9987523388778446}, 
                        {x: -0.05984460577553974, y: -0.03989640385035983, z:0.0, w: 0.9974100962589957}, 
                        {x: -0.0399162636772906, y: -0.049895329596613254, z:0.00997906591932265, w: 0.9979065919322649}, 
                        {x: -0.05986545392310671, y: -0.029932726961553354, z:0.0, w: 0.9977575653851118}, 
                        {x: -0.04993761694389223, y: -0.0, z:0.0, w: 0.9987523388778446}]
                }
            },
            
            leftshoulder_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0, 500.0, 1000, 1500.0, 2000], 
                    values: [{x: 0.009979562822891704, y: -0.019959125645783407, z:-0.05987737693735022, w: 0.9979562822891704}, 
                        {x: 0.009973604874406686, y: -0.039894419497626746, z:-0.05984162924644011, w: 0.9973604874406685}, 
                        {x: 0.009982545803924664, y: -0.02994763741177399, z:-0.04991272901962332, w: 0.9982545803924663}, 
                        {x: 0.009981053979093211, y: -0.009981053979093211, z:-0.059886323874559264, w: 0.9981053979093211}, 
                        {x: 0.009979562822891704, y: -0.019959125645783407, z:-0.05987737693735022, w: 0.9979562822891704}]
                }
            },
            
            leftarm_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0, 500.0, 1000, 1500.0, 2000], 
                    values: [{x: 0.12003001125468955, y: -0.19004751781992513, z:-0.5101275478324306, w: 0.830207577844936}, 
                        {x: 0.040884495808224015, y: -0.3066337185616801, z:-0.4088449580822402, w: 0.8585744119727043}, 
                        {x: 0.0980769303311342, y: -0.17653847459604152, z:-0.5296154237881247, w: 0.8238462147815271}, 
                        {x: 0.1539814595830982, y: 0.019247682447887274, z:-0.5678066322126746, w: 0.8084026628112655}, 
                        {x: 0.118061980772147, y: -0.1869314695558994, z:-0.5017634182816247, w: 0.8362723638027079}]
                }
            },
            
            leftforearm_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0, 500.0, 1000, 1500.0, 2000], 
                    values: [{x: -0.00998155117972014, y: -0.05988930707832083, z:-0.0, w: 0.998155117972014}, 
                        {x: -0.01930498333178295, y: -0.26061727497906984, z:-0.0, w: 0.9652491665891474}, 
                        {x: -0.00996765758414952, y: -0.07974126067319616, z:-0.0, w: 0.9967657584149521}, 
                        {x: -0.00997509336107633, y: -0.06982565352753431, z:-0.0, w: 0.9975093361076329}, 
                        {x: -0.00998155117972014, y: -0.05988930707832083, z:-0.0, w: 0.998155117972014}]
                }
            },
            
            lefthand_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0, 500.0, 1000, 1500.0, 2000], 
                    values: [{x: -0.17948025978035917, y: 0.05982675326011972, z:0.1695091342370059, w: 0.9671991777052689}, 
                        {x: -0.25236772127599605, y: 0.0, z:0.22324836882107343, w: 0.9415257293758313}, 
                        {x: -0.21065404287559966, y: 0.050155724494190396, z:0.16049831838140927, w: 0.9629899102884556}, 
                        {x: -0.1618889317032706, y: 0.10118058231454412, z:0.14165281524036177, w: 0.9713335902196235}, 
                        {x: -0.1812274419260094, y: 0.0604091473086698, z:0.17115925070789778, w: 0.9665463569387168}]
                }
            },
            
            lefthandthumb1_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0], 
                    values: [{x: 0.049776507448355545, y: -0.009955301489671109, z:0.07964241191736887, w: 0.9955301489671109}]
                }
            },
            
            lefthandthumb2_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0], 
                    values: [{x: 0.05005258283246952, y: 0.2302418810293598, z:0.04004206626597562, w: 0.9710201069499086}]
                }
            },
            
            lefthandthumb3_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0], 
                    values: [{x: 0.05001000300100035, y: 0.1300260078026009, z:0.01000200060020007, w: 0.9901980594198069}]
                }
            },
            
            lefthandindex1_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0], 
                    values: [{x: -0.019905671560572002, y: 0.009952835780286001, z:-0.169198208264862, w: 0.9853307422483141}]
                }
            },
            
            lefthandindex2_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0], 
                    values: [{x: -0.0, y: 0.03009494886968667, z:-0.18056969321812003, w: 0.9831016630764313}]
                }
            },
            
            lefthandindex3_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0], 
                    values: [{x: -0.0, y: -0.009995003746877732, z:0.029985011240633196, w: 0.9995003746877732}]
                }
            },
            
            lefthandmiddle1_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0], 
                    values: [{x: -0.010035184828481862, y: 0.06021110897089117, z:-0.22077406622660098, w: 0.9734129283627406}]
                }
            },
            
            lefthandmiddle2_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0], 
                    values: [{x: -0.0, y: 0.030039076215150742, z:-0.1902474826959547, w: 0.9812764896949243}]
                }
            },
            
            lefthandmiddle3_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0], 
                    values: [{x: 0.0, y: -0.0, z:0.029986509105671005, w: 0.9995503035223668}]
                }
            },
            
            lefthandring1_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0], 
                    values: [{x: -0.0, y: 0.08963769949589058, z:-0.27887284287610403, w: 0.9561354612894994}]
                }
            },
            
            lefthandring2_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0], 
                    values: [{x: 0.0, y: 0.019939277663899354, z:-0.15951422131119483, w: 0.986994244363018}]
                }
            },
            
            lefthandring3_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0], 
                    values: [{x: 0.0, y: 0.0, z:-0.01999600119960014, w: 0.9998000599800071}]
                }
            },
            
            lefthandpinky1_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0], 
                    values: [{x: -0.010029126762835594, y: 0.12034952115402711, z:-0.3109029296479034, w: 0.9427379157065457}]
                }
            },
            
            lefthandpinky2_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0], 
                    values: [{x: -0.0, y: 0.009971125543353287, z:-0.1595380086936526, w: 0.9871414287919754}]
                }
            },
            
            lefthandpinky3_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0], 
                    values: [{x: -0.0, y: 0.009999000149975006, z:0.009999000149975006, w: 0.9999000149975006}]
                }
            },
            
            rightshoulder_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0, 500.0, 1000, 1500.0, 2000], 
                    values: [{x: 0.009969143409242986, y: 0.04984571704621494, z:0.05981486045545792, w: 0.9969143409242986}, 
                        {x: 0.009974597124807033, y: 0.009974597124807033, z:0.06982217987364923, w: 0.9974597124807033}, 
                        {x: 0.009967162456732771, y: 0.039868649826931085, z:0.0697701371971294, w: 0.9967162456732771}, 
                        {x: 0.00996369862953634, y: 0.05978219177721804, z:0.05978219177721804, w: 0.996369862953634}, 
                        {x: 0.009969143409242986, y: 0.04984571704621494, z:0.05981486045545792, w: 0.9969143409242986}]
                }
            },
            
            rightarm_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0, 500.0, 1000, 1500.0, 2000], 
                    values: [{x: 0.09961226677075757, y: 0.07968981341660605, z:0.5478674672391667, w: 0.8267818141972878}, 
                        {x: 0.10867146188824536, y: -0.09879223808022305, z:0.5532365332492492, w: 0.8199755760658513}, 
                        {x: 0.07076123992570088, y: 0.12130498272977293, z:0.5256549251623494, w: 0.839026130547596}, 
                        {x: 0.0611799142604889, y: 0.22432635228845932, z:0.47924266170716306, w: 0.8463221472700965}, 
                        {x: 0.09961226677075757, y: 0.07968981341660605, z:0.5478674672391667, w: 0.8267818141972878}]
                }
            },
            
            rightforearm_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0, 500.0, 1000, 1500.0, 2000], 
                    values: [{x: -0.010038723773844871, y: 0.11042596151229359, z:-0.0, w: 0.9938336536106422}, 
                        {x: -0.010081997627141646, y: 0.06049198576284987, z:0.0, w: 0.998117765087023}, 
                        {x: -0.010001000150025004, y: 0.14001400210035006, z:0.0, w: 0.9900990148524753}, 
                        {x: -0.019529164171612677, y: 0.21482080588773944, z:-0.0, w: 0.9764582085806338}, 
                        {x: -0.009939552535392792, y: 0.1093350778893207, z:-0.0, w: 0.993955253539279}]
                }
            },
            
            righthand_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0, 500.0, 1000, 1500.0, 2000], 
                    values: [{x: -0.07011578665089857, y: 0.0600992457007702, z:-0.0901488685511553, w: 0.9916375540627084}, 
                        {x: -0.07017213284715496, y: 0.01002459040673642, z:-0.10024590406736421, w: 0.9924344502669057}, 
                        {x: -0.1094432554935892, y: 0.059696321178321375, z:-0.11939264235664275, w: 0.9849892994423027}, 
                        {x: -0.1379929977370708, y: 0.09856642695505058, z:-0.1379929977370708, w: 0.9758076268550007}, 
                        {x: -0.07011578665089857, y: 0.0600992457007702, z:-0.0901488685511553, w: 0.9916375540627084}]
                }
            },
            
            righthandpinky1_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0], 
                    values: [{x: -0.0, y: -0.14932212301783937, z:0.28868943783448947, w: 0.9457067791129827}]
                }
            },
            
            righthandpinky2_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0], 
                    values: [{x: -0.0, y: -0.009971125543353287, z:0.1595380086936526, w: 0.9871414287919754}]
                }
            },
            
            righthandpinky3_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0], 
                    values: [{x: -0.0, y: 0.00995925043924715, z:0.08963325395322434, w: 0.9959250439247149}]
                }
            },
            
            righthandring1_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0], 
                    values: [{x: -0.0, y: -0.09977575653851119, z:0.2693945426539802, w: 0.9578472627697073}]
                }
            },
            
            righthandring2_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0], 
                    values: [{x: 0.0, y: -0.019939277663899354, z:0.15951422131119483, w: 0.986994244363018}]
                }
            },
            
            righthandring3_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0], 
                    values: [{x: -0.0, y: 0.00996765758414952, z:0.07974126067319616, w: 0.9967657584149521}]
                }
            },
            
            righthandmiddle1_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0], 
                    values: [{x: -0.010012523486435177, y: -0.06007514091861106, z:0.23028804018800908, w: 0.9712147781842122}]
                }
            },
            
            righthandmiddle2_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0], 
                    values: [{x: -0.0, y: -0.030039076215150742, z:0.1902474826959547, w: 0.9812764896949243}]
                }
            },
            
            righthandmiddle3_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0], 
                    values: [{x: -0.0, y: -0.00995925043924715, z:0.08963325395322434, w: 0.9959250439247149}]
                }
            },
            
            righthandindex1_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0], 
                    values: [{x: -0.019966086455078576, y: -0.019966086455078576, z:0.14974564841308932, w: 0.9883212795263896}]
                }
            },
            
            righthandindex2_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0], 
                    values: [{x: -0.0, y: -0.03009494886968667, z:0.18056969321812003, w: 0.9831016630764313}]
                }
            },
            
            righthandindex3_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0], 
                    values: [{x: -0.0, y: 0.0, z:0.07974522228289, w: 0.996815278536125}]
                }
            },
            
            righthandthumb1_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0], 
                    values: [{x: 0.019931355034138336, y: -0.06975974261948419, z:-0.03986271006827667, w: 0.9965677517069168}]
                }
            },
            
            righthandthumb2_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0], 
                    values: [{x: 0.009995003746877732, y: -0.11994004496253279, z:-0.07996002997502186, w: 0.9895053709408954}]
                }
            },
            
            righthandthumb3_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0], 
                    values: [{x: 0.050012504689453986, y: -0.13003251219258036, z:-0.0, w: 0.9902475928511888}]
                }
            },
            
            leftupleg_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0, 500.0, 1000, 1500.0, 2000], 
                    values: [{x: -0.11979651873047147, y: 0.04991521613769644, z:-0.0798643458203143, w: 0.9883212795263896}, 
                        {x: 0.0703846473641222, y: 0.050274748117230136, z:0.04021979849378411, w: 0.9954400127211567}, 
                        {x: -0.2809977261328325, y: 0.0, z:0.029068730289603367, w: 0.9592680995569111}, 
                        {x: -0.27208841533617545, y: 0.009717443404863408, z:-0.019434886809726815, w: 0.9620268970814773}, 
                        {x: -0.11862596517211865, y: 0.04942748548838277, z:-0.07908397678141244, w: 0.9885497097676554}]
                }
            },
            
            leftleg_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0, 500.0, 1000, 1500.0, 2000], 
                    values: [{x: 0.26134943336672345, y: 0.020103802566671033, z:0.010051901283335517, w: 0.9649825232002095}, 
                        {x: 0.29532652041139185, y: -0.029532652041139182, z:-0.009844217347046394, w: 0.9548890826635003}, 
                        {x: 0.46436610694585917, y: 0.05463130669951284, z:0.03642087113300856, w: 0.8832061249754576}, 
                        {x: 0.10228071826600217, y: 0.07159650278620153, z:0.010228071826600217, w: 0.9921229671802211}, 
                        {x: 0.25883783873144883, y: 0.019910602979342218, z:0.009955301489671109, w: 0.9656642444980975}]
                }
            },
            
            leftfoot_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0, 500.0, 1000, 1500.0, 2000], 
                    values: [{x: -0.1202709146806974, y: -0.01002257622339145, z:0.03006772867017435, w: 0.9922350461157535}, 
                        {x: -0.07047019543260338, y: -0.010067170776086197, z:0.04026868310434479, w: 0.9966499068325335}, 
                        {x: 0.030250605543355742, y: 0.0, z:0.05041767590559291, w: 0.9982699829307395}, 
                        {x: 0.0, y: -0.020188635583542704, z:0.030282953375314055, w: 0.9993374613853638}, 
                        {x: -0.12147889677281226, y: -0.010123241397734356, z:0.030369724193203065, w: 0.9920776569779668}]
                }
            },
            
            lefttoebase_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0, 500.0, 1000, 1500.0, 2000], 
                    values: [{x: -0.029986509105671005, y: 0.0, z:0.0, w: 0.9995503035223668}, 
                        {x: -0.2960447582039059, y: -0.0, z:-0.01909966181960683, w: 0.9549830909803416}, 
                        {x: -0.01999600119960014, y: 0.0, z:-0.0, w: 0.9998000599800071}, 
                        {x: -0.039968038348871575, y: 0.0, z:0.0, w: 0.9992009587217893}, 
                        {x: -0.029986509105671005, y: 0.0, z:0.0, w: 0.9995503035223668}]
                }
            },
            
            rightupleg_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0, 500.0, 1000, 1500.0, 2000], 
                    values: [{x: -0.2703516859363567, y: 0.020026050810100497, z:-0.05006512702525124, w: 0.9612504388848238}, 
                        {x: -0.3071716829527928, y: -0.019817527932438246, z:0.019817527932438246, w: 0.9512413407570357}, 
                        {x: -0.12474309021464867, y: -0.07276680262521174, z:0.06237154510732434, w: 0.987549464199302}, 
                        {x: 0.10442760846127908, y: -0.06265656507676744, z:-0.03132828253838372, w: 0.992062280382151}, 
                        {x: -0.2729780564793208, y: 0.02022059677624598, z:-0.05055149194061496, w: 0.9604783468716841}]
                }
            },
            
            rightleg_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0, 500.0, 1000, 1500.0, 2000], 
                    values: [{x: 0.5090337529337537, y: -0.04990526989546606, z:-0.039924215916372845, w: 0.8583706422020161}, 
                        {x: 0.16798881903629503, y: -0.022398509204839337, z:-0.0, w: 0.9855344050129309}, 
                        {x: 0.27690930984749823, y: 0.06390214842634574, z:0.02130071614211525, w: 0.9585322263951862}, 
                        {x: 0.24182408005683584, y: 0.07359863306077613, z:0.021028180874507463, w: 0.9672963202273434}, 
                        {x: 0.47603300609934074, y: -0.0466699025587589, z:-0.037335922047007114, w: 0.8773941681046672}]
                }
            },
            
            rightfoot_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0, 500.0, 1000, 1500.0, 2000], 
                    values: [{x: 0.02989109588860902, y: 0.0, z:-0.07970958903629072, w: 0.996369862953634}, 
                        {x: 0.01999200479680224, y: 0.0, z:-0.01999200479680224, w: 0.9996002398401119}, 
                        {x: -0.11899867408118853, y: -0.0, z:-0.04958278086716189, w: 0.9916556173432378}, 
                        {x: -0.1383091333123123, y: 0.04939611904011153, z:-0.04939611904011153, w: 0.9879223808022305}, 
                        {x: 0.02989109588860902, y: 0.0, z:-0.07970958903629072, w: 0.996369862953634}]
                }
            },
            
            righttoebase_quaternion: {
                enable: false,
                func: null,
                tween: null,
                animation: {
                    times: [0, 500.0, 1000, 1500.0, 2000], 
                    values: [{x: -0.04991521613769644, y: 0.0, z:0.029949129682617866, w: 0.9983043227539289}, 
                        {x: -0.06982912769991387, y: -0.0, z:0.0, w: 0.9975589671416266}, 
                        {x: -0.039968038348871575, y: -0.0, z:0.0, w: 0.9992009587217893}, 
                        {x: -0.2055172342864138, y: 0.0, z:0.0, w: 0.9786534966019705}, 
                        {x: -0.04991521613769644, y: 0.0, z:0.029949129682617866, w: 0.9983043227539289}]
                }
            }
        }
 
       this.x_bot_animation_obj = null;
    }


    init(){
        this.x_bot_animation_obj = new X_Bot_Animation(this.x_bot);

        const loop = true;
        this.x_bot_animation_obj.init(this.array_animation, loop);
    }

    start(){
        this.x_bot_animation_obj.start();
    }

    update(){
        this.x_bot_animation_obj.update();
    }

    reset(){
        this.x_bot_animation_obj.reset();
    }
}
export { X_Bot_Walk_Animation };
