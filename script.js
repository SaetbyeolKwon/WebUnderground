var podtop, bottomc, bottomf, bottomr, sled;
var models = {
    'podtop': {obj: '/objects/MTA22.glb'},
};
var x= 10,y=5,z=10;
var status = "0";
var maxRotation = 2 * Math.PI;

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 1000);

camera.position.set(x,y,z);
// camera.position.z = 10;
console.log("Camera is working");

var container = document.getElementById('container');

var renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setClearColor(0xd6d6d6);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    //document자리에 페이지에서 원하는 div를 설정하면 그곳에 render.
    container.appendChild(renderer.domElement);

var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.campingFactor = 0.25;
controls.enableZoom = true;
controls.minDistance = 1;
controls.maxDistance = 40;

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

//Light
var ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(ambientLight);
    if(ambientLight){
        console.log("ambientLight is working.")
    }

//Multiple GLTFs Loader
// var loader = new THREE.GLTFLoader();
// for(var _key in models){
//     console.log('key1', _key);

//     loader.load(models[_key].obj, function( gltf ){
//         scene.add(gltf.scene);
//     });  
// }

// loading a .gtlf file
var group = new THREE.Group();
var loader = new THREE.GLTFLoader();
    // loader.setPath( '/objects/' );
    loader.load('https://cdn.glitch.com/4e61cc02-40e5-4e28-901f-eb558a51a1d5%2FMTA22.glb?v=1570487968977', function ( gltf ) {
        podtop = gltf.scene;
        group.add( podtop );
    });
    // loader.load('https://cdn.glitch.com/4e61cc02-40e5-4e28-901f-eb558a51a1d5%2FHLO_Pod_Bottom_Front.gltf?v=1562770586202', function ( gltf ) {
    //     bottomf = gltf.scene;
    //     group.add( bottomf );
    // });
    // loader.load('https://cdn.glitch.com/4e61cc02-40e5-4e28-901f-eb558a51a1d5%2FHLO_Pod_Bottom_Rear.gltf?v=1562770583865', function ( gltf ) {
    //     bottomr = gltf.scene;
    //     group.add( bottomr );
    // });
    // loader.load('https://cdn.glitch.com/4e61cc02-40e5-4e28-901f-eb558a51a1d5%2FHLO_Pod_Bottom_Center.gltf?v=1562770589036', function ( gltf ) {
    //     bottomc = gltf.scene;
    //     group.add( bottomc );
    // });
    // loader.load('https://cdn.glitch.com/4e61cc02-40e5-4e28-901f-eb558a51a1d5%2FHLO_Sled.gltf?v=1562770573102', function ( gltf ) {
    //     sled = gltf.scene;
    //     group.add( sled );
    // });

    scene.add( group );

init();
animate();

function init(){
    // console.log("init is working");
}

window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
    render();

    console.log("windowResize is working");
}

function animate(){
    
    requestAnimationFrame( animate );

    render();
    controls.update();

}

// container.addEventListener('click', onMouseDown, false);

// function onMouseDown(event){
//     event.preventDefault();
//     console.log("container clicked.");
//     console.log(status);

//     this.tl = new TimelineMax({delay:.3});
//     var duration = 2;

//     if(status == "0"){
        //intersects
        // mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
        // mouse.y =  - (event.clientY / renderer.domElement.clientHeight) * 2 + 1;
 
        // raycaster.setFromCamera(mouse, camera);
        // meshObjects = [podtop, bottomc, bottomf];

        // var intersects = raycaster.intersectObjects(meshObjects);

        // for(var i = 0; i < intersects.length; i++){
        //     this.tl = new TimelineMax({delay:.3});
        //     var duration = 3;
        //     this.tl.to(intersects[i].object.position, duration, {y: 3,z:0, ease: Expo.easeOut});
        // };

    //     this.tl.to(podtop.position, duration, {y: 3, ease: Expo.easeOut});
    //     this.tl.to(bottomc.position, duration, {y: -3, ease: Expo.easeOut}, "-=duration");
    //     this.tl.to(bottomf.position, duration, {x: 3, ease: Expo.easeOut}, "-=duration");
    //     this.tl.to(bottomr.position, duration, {x: -3, ease: Expo.easeOut}, "-=duration");

    //     status = "1";
    //     console.log(status);
    //     console.log("status has been changed to 1.");
    // } else {
    //     this.tl.to(podtop.position, duration, {y: 0, ease: Expo.easeOut}, "-=duration");
    //     this.tl.to(bottomc.position, duration, {y: 0, ease: Expo.easeOut}, "-=duration");
    //     this.tl.to(bottomf.position, duration, {x: 0, ease: Expo.easeOut}, "-=duration");
    //     this.tl.to(bottomr.position, duration, {x: 0, ease: Expo.easeOut}, "-=duration");
    //     // this.tl.reverse();
    //     status = "0";
    //     console.log(status);
    //     console.log("status has been changed to 0.")
    // }

    // camera.position.set(x,y,z);
    // x = 10;
    // for(let i=0; i<6; i++){
    //     i += 0.00001;
    //     x = x + i;
    //     camera.position.set(x,y,z);
    // }

    // console.log(camera.position)

    // };


function render(){

    if ( podtop !== undefined ) {
        group.rotation.y = (group.rotation.y + 0.005) % maxRotation;
    }

    renderer.render(scene, camera);
}



