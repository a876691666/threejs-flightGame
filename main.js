var _angle = Math.PI / 180;
var width = window.innerWidth
var height = window.innerHeight
var scene = new THREE.Scene();
var camera = new THREE.OrthographicCamera(width / - 2, width / 2, height / 2, height / - 2, 1, 10000);

var renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true




var material = new THREE.MeshPhongMaterial( { color: 0x808080, dithering: true } );
var geometry = new THREE.BoxGeometry( 2000, 2000, 1 );
var mesh = new THREE.Mesh( geometry, material );
mesh.position.set( 0, 0, 0 );
mesh.receiveShadow = true;
scene.add( mesh );

var group = new THREE.Object3D();

var geometry = new THREE.BoxGeometry(50, 50, 50);
var material = new THREE.MeshPhongMaterial({
	color: 0x00ff00
});
var cube = new THREE.Mesh(geometry, material);
cube.receiveShadow = true;
cube.castShadow = true;
group.add(camera)
group.add(cube)
scene.add(group);
// cube.rotateZ()


cube.position.y = 100
cube.position.z = 25


camera.rotateX(90*_angle);
camera.position.z = 1000+25;
camera.position.x = 1000;
camera.position.y = 1000;
camera.rotateY(180*_angle);
var centerAngle = relativeAngle(camera, cube);
camera.rotateY(-centerAngle[1]*_angle);
camera.rotateX(-(90-centerAngle[0])*_angle);


var light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );

var spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set( 15, -1000, 150 );
spotLight.angle = Math.PI / 4;
spotLight.penumbra = 0.05;
spotLight.decay = 2;
spotLight.distance = 2000;
spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;
spotLight.shadow.camera.near = 10;
spotLight.shadow.camera.far = 200;

scene.add( spotLight );

document.body.appendChild(renderer.domElement);




var keyList = {'q':false, 'e':false, 'w':false, 'a':false, 's':false, 'd':false, 'up':false, 'down':false, 'left':false, 'right':false };
(function(){
	var ok = new OK();
	ok.on('q.down', function(){
		keyList.q = true;
	}).on('q.up', function(){
		keyList.q = false;
	}).on('e.down', function(){
		keyList.e = true;
	}).on('e.up', function(){
		keyList.e = false;
	}).on('w.down', function(){
		keyList.w = true;
	}).on('w.up', function(){
		keyList.w = false;
	}).on('a.down', function(){
		keyList.a = true;
	}).on('a.up', function(){
		keyList.a = false;
	}).on('s.down', function(){
		keyList.s = true;
	}).on('s.up', function(){
		keyList.s = false;
	}).on('d.down', function(){
		keyList.d = true;
	}).on('d.up', function(){
		keyList.d = false;
	}).on('up.down', function(){
		keyList.up = true;
	}).on('up.up', function(){
		keyList.up = false;
	}).on('down.down', function(){
		keyList.down = true;
	}).on('down.up', function(){
		keyList.down = false;
	}).on('left.down', function(){
		keyList.left = true;
	}).on('left.up', function(){
		keyList.left = false;
	}).on('right.down', function(){
		keyList.right = true;
	}).on('right.up', function(){
		keyList.right = false;
	});
	setInterval(function() {
		if(keyList.w){
			group.position.x+=1;
		}
		if(keyList.s){
			group.position.x-=1;
		}
		if(keyList.a){
			group.position.y+=1;
		}
		if(keyList.d){
			group.position.y-=1;
		}
		if(keyList.q){
			cube.rotateZ(1*_angle);
		}
		if(keyList.e){
			cube.rotateZ(-1*_angle);
		}
	}, 1000/ 60)
})();



function render() {
	// cube.rotateZ(3*_angle)
	// cube.position.y +=1;
	requestAnimationFrame(render);
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.render(scene, camera);
}
render();

function relativeAngle(source, target) {
	var x = source.position.x - target.position.x;
	var y = source.position.y - target.position.y;
	var z = source.position.z - target.position.z;
	var zr = Math.sqrt(x * x + y * y);
	var r = Math.sqrt(z * z + zr * zr);
	return [Math.acos(z / r) / _angle, Math.atan(y / x) / _angle]
}