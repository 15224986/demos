// camera 相机	scene 场景  renderer 渲染器
var camera, scene, renderer;
var renderer;
var controls;


var $mian = document.getElementById('mian');


init();
animate();

function init() {

    console.log( Math.sqrt(0.64) );


    camera = new THREE.PerspectiveCamera(40, $("#mian").width() / $("#mian").height(), 1, 10000);
    camera.position.set( 0, 0, 906 );
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    scene = new THREE.Scene();
    // 创建盒子
    initCreateDom();
    

    // setTimeout( ()=>{
    //     TweenPosition();
    // }, 0);
    function TweenPosition(){
        var $obj = scene.getObjectById(parseInt($("#castPie").attr("objectid")))
        new TWEEN.Tween($obj.position)
            .to({ x: 100, y: 50, z: 50 }, 2000)
            .easing(TWEEN.Easing.Exponential.InOut)
            .onUpdate(function() {})
            .start()
            .onComplete(function() {
                TweenPosition1($obj)
            });
    }
    function TweenPosition1($obj){
        new TWEEN.Tween($obj.position)
            .to({ x: 100, y: 150, z: 50 }, 2000)
            .easing(TWEEN.Easing.Exponential.InOut)
            .start()
            .onComplete(function() {
                TweenPosition2($obj)
            });
    }
    function TweenPosition2($obj){
        new TWEEN.Tween($obj.position)
            .to({ x: -100, y: 150, z: 50 }, 2000)
            .easing(TWEEN.Easing.Exponential.InOut)
            .start()
            .onComplete(function() {
                TweenPosition3($obj)
            });
    }
    function TweenPosition3($obj){
        new TWEEN.Tween($obj.position)
            .to({ x: -100, y: 50, z: 50 }, 2000)
            .easing(TWEEN.Easing.Exponential.InOut)
            .start()
            .onComplete(function() {
                TweenPosition4($obj)
            });
    }
    function TweenPosition4($obj){
        new TWEEN.Tween($obj.position)
            .to({ x: 0, y: 50, z: 50 }, 2000)
            .easing(TWEEN.Easing.Exponential.InOut)
            .start()
            .onComplete(function() {
                TweenPosition()
            });
    }


    
    

    


    // WebGL渲染器（WebGLRenderer）
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    // renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( $("#mian").width(), $("#mian").height() );
    $mian.appendChild( renderer.domElement );


    
    //  CSS3DRenderer的3D全景
    renderer = new THREE.CSS3DRenderer();
    renderer.setSize( $("#mian").width(), $("#mian").height() );
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = 0;
    $mian.appendChild( renderer.domElement );
    controls = new THREE.TrackballControls( camera, renderer.domElement );


}
function animate() {
    requestAnimationFrame( animate );
    controls.update();          // 可以转动舞台
    TWEEN.update();             // 添加tween动画
    renderer.render( scene, camera );
}



/**
 * 对初始化页面所需要的Dom元素进行创建 添加动画
 * createCube() 创建一个 立方体
 * createPie()  创建一个 旋转的罗盘
 * 
 */

function initCreateDom(){
    createCube()
    createPie() 
}



function createCube(){
    // after
    var element = document.createElement( 'div' );
    element.className = 'neu-cast-cube neu-cast-cube-after';
    element.innerHTML ="after";
    var object = new THREE.CSS3DObject( element );
    object.position.x = 0;
    object.position.y = -200;
    object.position.z = 0;
    scene.add( object );
    $(element).attr('id','afterDom').attr("objectid", object.id);

    // right
    var element = document.createElement( 'div' );
    element.className = 'neu-cast-cube neu-cast-cube-right';
    element.innerHTML ="right";
    var object = new THREE.CSS3DObject( element );
    object.position.x = 50;
    object.position.y = -200;
    object.position.z = 50;
    object.rotateY(Math.PI/2);
    scene.add( object );
    $(element).attr('id','rightDom').attr("objectid", object.id);

    // left
    var element = document.createElement( 'div' );
    element.className = 'neu-cast-cube neu-cast-cube-left';
    element.innerHTML ="left";
    var object = new THREE.CSS3DObject( element );
    object.position.x = -50;
    object.position.y = -200;
    object.position.z = 50;
    object.rotateY(Math.PI/2);
    scene.add( object );
    $(element).attr('id','leftDom').attr("objectid", object.id);

    // top
    var element = document.createElement( 'div' );
    element.className = 'neu-cast-cube neu-cast-cube-top';
    element.innerHTML ="top";
    var object = new THREE.CSS3DObject( element );
    object.position.x = 0;
    object.position.y = -150;
    object.position.z = 50;
    object.rotateX(Math.PI/2);
    scene.add( object );
    $(element).attr('id','topDom').attr("objectid", object.id);

    // bottom
    var element = document.createElement( 'div' );
    element.className = 'neu-cast-cube neu-cast-cube-bottom';
    element.innerHTML ="bottom";
    var object = new THREE.CSS3DObject( element );
    object.position.x = 0;
    object.position.y = -250;
    object.position.z = 50;
    object.rotateX(Math.PI/2);
    scene.add( object );
    $(element).attr('id','bottomDom').attr("objectid", object.id);

    // before
    var element = document.createElement( 'div' );
    element.className = 'neu-cast-cube neu-cast-cube-before';
    element.innerHTML ="before";
    var object = new THREE.CSS3DObject( element );
    object.position.x = 0;
    object.position.y = -200;
    object.position.z = 100;
    scene.add( object );
    $(element).attr('id','beforeDom').attr("objectid", object.id);
}

function createPie(){
    var element = document.createElement( 'div' );
    element.className = 'neu-cast-pie';
    element.innerHTML = `<div class="neu-cast-pie-prop"></div>`;
    var object = new THREE.CSS3DObject( element );
    object.position.x = 0;
    object.position.y = 50;
    object.position.z = 0;
    object.rotateX(Math.PI/2.5);
    scene.add( object );
    $(element).attr('id','castPie').attr("objectid", object.id);

    var element = document.createElement( 'div' );
    element.className = 'neu-cast-pie-text';
    element.innerHTML = `<p>旋转的罗盘</P>`;
    var object = new THREE.CSS3DObject( element );
    object.position.x = 0;
    object.position.y = 65;
    object.position.z = 0;
    // object.rotateX(Math.PI/8.8);
    scene.add( object );
    
    var element = document.createElement( 'div' );
    element.className = 'neu-cast-pie-text';
    element.innerHTML = `<p>旋转的罗盘</P>`;
    var object = new THREE.CSS3DObject( element );
    object.position.x = 0;
    object.position.y = 128;
    object.position.z = 0;
    object.rotateY(Math.PI/6.8);
    object.rotateZ(Math.PI/36.8);
    scene.add( object );

}
