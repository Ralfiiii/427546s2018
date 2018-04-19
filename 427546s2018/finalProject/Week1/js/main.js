$(function(){
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, 400/300, 0.1, 10000);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(400, 300);
    $('.cav').append(renderer.domElement);

    var light = new THREE.AmbientLight( 0x404040 );
    scene.add( light )

    var light1 = new THREE.PointLight( 0xff0000, 2, 600 );
    light.position.set( 50, 50, 0 );
    scene.add(light1);

    var material = new THREE.MeshLambertMaterial({
        color: 0xF3FFE2,
        emissive: 0xff0000,
        emissiveIntensity: 0.5
    });

    var geometry = new THREE.BoxGeometry(10,10,10);
    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.set(0,0,-30);
    camera.lookAt( new THREE.Vector3(0,0,0));
    function render(){
        requestAnimationFrame(render);

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        renderer.render(scene,camera);
    }
    render();
})
