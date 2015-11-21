var waitFor = require('waitFor');
var THREE = require('three');
var sassqwatch = require('sassqwatch');
require('jquery-mousewheel')($);
var Hammer = require('hammerjs');
require('../lib/jquery.hammer.js');

waitFor('body.home', function() {
    var scene, camera, renderer, geometry, material, cube;
    var $container = $('.cube-wrap');

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, 1, 0.1, 100000 );

    renderer = new THREE.WebGLRenderer({alpha: true});
    renderer.setSize( $container.height(), $container.height() );
    $container.append(renderer.domElement);

    geometry = new THREE.BoxGeometry( 3, 3, 3 );

    material = new THREE.MeshBasicMaterial( { color: 0xaaaaaa, wireframe: true } );
    cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    camera.position.z = 5;

    function render() {
        requestAnimationFrame( render );
        renderer.render( scene, camera );
    }

    render();

    if (sassqwatch.isAbove('mq-medium')) {
        $('body').on('mousewheel', function(event) {
            cube.rotation.x += event.deltaY / 50;
            cube.rotation.y += event.deltaX / -50;
        });
    } else {
        $('body.home')
                .hammer()
                .on("panmove", function(ev) {
                    cube.rotation.x += ev.gesture.deltaY / 500;
                    cube.rotation.y += ev.gesture.deltaX / -500;
                });
    }


});