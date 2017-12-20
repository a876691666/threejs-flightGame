var _angle = Math.PI/180;
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled=true
var geometry = new THREE.BoxGeometry( 5, 5, 5 );
var material = new THREE.MeshPhongMaterial( { color: 0x00ff00} );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

var bottom = new THREE.BoxGeometry( 999, 999, 0 );
var material = new THREE.MeshPhongMaterial( { color: 0x00ffff } );
var bottomCube = new THREE.Mesh( bottom, material );
scene.add( bottomCube );

cube.position.z = 2.5
camera.position.z = 2;
camera.position.x = 10;
camera.position.y = -10;

camera.rotateX(90*_angle)
var dirLight = new THREE.PointLight( 0xffffff, 3,150);
dirLight.position.set( 50, -30, 20 );
scene.add( dirLight );



renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

function render() {
	requestAnimationFrame( render );
	renderer.render( scene, camera );
}
render();

function relativeAngle(source, target){
	var x = source.position.x - target.position.x;
	var y = source.position.y - target.position.y;
	var z = source.position.z - target.position.z;
	var zr = Math.sqrt(x*x+y*y);
	var r = Math.sqrt(z*z+zr*zr);
	return [Math.acos(z/r)/_angle, Math.atan(y/x)/_angle]
}
