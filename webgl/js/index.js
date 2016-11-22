const { compileShader, createProgram } = require('./shadersAndPrograms');

init();

function init() {
    let canvas = document.createElement('canvas')
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    document.body.appendChild(canvas);

    let gl = initGL(canvas);
    let vertexShader = compileShader(gl, gl.VERTEX_SHADER, 'vertexShader');
    let fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, 'fragmentShader');
    let program = createProgram(gl, vertexShader, fragmentShader);

    let positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
    let positionBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    let positions = [
        0, 0,
        0, 0.5,
        0.7, 0
    ];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
}

function initGL(canvas) {
    let gl = canvas.getContext('webgl');
    return gl;
}