const THREE = require('three')
const OrbitControls = require('three-orbit-controls')(THREE)

let scene, camera, renderer, geometry, material, mesh, sphere, box,
    pointLight, pointLight2, pointLight3

let leftLimit, rightLimit,
    position = 8.5

let moveRight = true,
    moveLeft = false

let colors = {
    blue: 0x87ceeb,
    white: 0xffffff,
    silver: 0xC0C0C0,
    gray: 0x666666,
    hazel: 0x776536
}

init()

function init() {

    sphere = new THREE.SphereGeometry( 5, 16, 16 )
    let sphere2 = new THREE.SphereGeometry( 1, 16, 16 )

    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 5000)
    camera.position.z = 500
    let ambientLight = new THREE.AmbientLight(colors.gray, 0.5)
    scene.add(ambientLight)

    pointLight = new THREE.PointLight(colors.hazel, 10, 50, 5)
    // pointLight.add( new THREE.Mesh(sphere, new THREE.MeshPhongMaterial({color:colors.hazel, metal: true, wraparound: true})) )
    pointLight.position.z = 20
    pointLight.position.y = 45
    scene.add(pointLight)

    pointLight2 = new THREE.PointLight(colors.hazel, 35, 150, 5)
    // pointLight2.add( new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({color:colors.white})) )
    pointLight2.position.z = 50
    pointLight2.position.y = 25
    scene.add(pointLight2)

    pointLight3 = new THREE.PointLight(colors.hazel, 10, 60, 15)
    // pointLight3.add( new THREE.Mesh(sphere2, new THREE.MeshBasicMaterial({color:colors.white})) )
    pointLight3.position.z = 50
    pointLight3.position.y = 45
    scene.add(pointLight3)

    material = new THREE.MeshPhongMaterial({
        color: colors.silver,
        specular: colors.hazel,
        metal: true,
        wraparound: true,
        shading: THREE.FlatShading
    })

    let loader = new THREE.FontLoader()
    loader.load('font/Appareo.json', (font)=>{

        geometry = new THREE.TextGeometry('Coming Soon', {
            font: font,
            size: 50,
            height: 10
        })

        mesh = new THREE.Mesh(geometry, material)
        mesh.geometry.verticesNeedUpdate = true
        scene.add(mesh)

        box = new THREE.Box3().setFromObject(mesh)
        mesh.position.x = -(box.getSize().x / 2)
        pointLight.position.x = -(box.getSize().x / 8)
        pointLight2.position.x = -(box.getSize().x / 6.75) * position
        pointLight3.position.x = -500

        leftLimit = -(box.getSize().x / 6.75) * position
        rightLimit = -leftLimit

        renderer = new THREE.WebGLRenderer({ antialias: true })
        renderer.setClearColor( 0x000000 )
        renderer.setPixelRatio( window.devicePixelRatio )
        renderer.setSize( window.innerWidth, window.innerHeight )
        document.body.appendChild( renderer.domElement )

        let controls = new OrbitControls(camera)
        controls.target.set(10,0,0)
        animate()
    })



}

function animate() {
    requestAnimationFrame(animate)
    let { x } = pointLight2.position

    let time = Date.now() * 0.0005

    if(x <= leftLimit)
    {
        moveRight = true
        moveLeft = false
    }
    if(x >= rightLimit)
    {
        moveLeft = true
        moveRight = false
    }

    if(moveRight) pointLight2.position.x += 1
    if(moveLeft) pointLight2.position.x -= 1
    // pointLight2.position.z = Math.sin(time) * 50
    // pointLight2.position.y = Math.cos(time) * 50

    pointLight3.position.x = (Math.cos(time*.75) * 15) - 60
    pointLight3.position.z = (Math.sin(time*.75) * 15) + 20
    // pointLight3.position.y = (Math.sin(time*10) * 25) + 50
    renderer.render(scene, camera)
}