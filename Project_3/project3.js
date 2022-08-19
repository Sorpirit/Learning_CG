// [TO-DO] Complete the implementation of the following class and the vertex shader below.

class CurveDrawer {
	constructor()
	{
		this.prog = InitShaderProgram( curvesVS, curvesFS );
		// [TO-DO] Other initializations should be done here.
		// [TO-DO] This is a good place to get the locations of attributes and uniform variables.
		
		// Get the ids of the vertex attributes in the shaders
		this.tPos = gl.getAttribLocation( this.prog, 't' );

		// Get the ids of the uniform variables in the shaders
		this.mvp = gl.getUniformLocation( this.prog, 'mvp' );
		
		// Get the ids of the vertex attributes in the shaders
		this.pointPointer = [];
		for ( var i=0; i<4; ++i ) {
			this.pointPointer.push(gl.getUniformLocation( this.prog, 'p'.concat(i) ));
		}
		console.log(this.pointPointer);
		
		// Create the vertex buffer object
		this.tBuffer = gl.createBuffer();

		// Initialize the attribute buffer
		this.steps = 100;
		var tv = [];
		for ( var i=0; i<this.steps; ++i ) {
			tv.push( i / (this.steps-1) );
		}

		gl.bindBuffer(gl.ARRAY_BUFFER, this.tBuffer );

		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(tv), gl.STATIC_DRAW );

		// [TO-DO] This is where you can create and set the contents of the vertex buffer object
		// for the vertex attribute we need.

		
	}
	setViewport( width, height )
	{
		// [TO-DO] This is where we should set the transformation matrix.
		// [TO-DO] Do not forget to bind the program before you set a uniform variable value.
		var trans = [ 2/width,0,0,0,  0,-2/height,0,0, 0,0,1,0, -1,1,0,1 ];
		gl.useProgram( this.prog );
		gl.uniformMatrix4fv( this.mvp, false, trans );
	}
	updatePoints( pt )
	{
		// [TO-DO] The control points have changed, we must update corresponding uniform variables.
		// [TO-DO] Do not forget to bind the program before you set a uniform variable value.
		// [TO-DO] We can access the x and y coordinates of the i^th control points using
		// var x = pt[i].getAttribute("cx");
		// var y = pt[i].getAttribute("cy");

		gl.useProgram( this.prog );
		for ( var i=0; i<4; ++i ) {
			var x = pt[i].getAttribute("cx");
			var y = pt[i].getAttribute("cy");
			gl.uniform2f( this.pointPointer[i] , x, y );
		}
	}
	draw()
	{
		// [TO-DO] This is where we give the command to draw the curve.
		// [TO-DO] Do not forget to bind the program and set the vertex attribute.
		// Draw the line segments
		gl.useProgram( this.prog );
		gl.bindBuffer( gl.ARRAY_BUFFER, this.tBuffer );
		gl.vertexAttribPointer( this.tPos, 1, gl.FLOAT, false, 0, 0 );
		gl.enableVertexAttribArray( this.tPos );
		gl.drawArrays( gl.LINE_STRIP, 0, this.steps );
	}
}

// Vertex Shader
var curvesVS = `
	attribute float t;
	uniform mat4 mvp;
	uniform vec2 p0;
	uniform vec2 p1;
	uniform vec2 p2;
	uniform vec2 p3;

	vec2 linearInterpolation(vec2 start, vec2 end, float t)
	{
		return (start * (1.0 - t) + end * t);
	}

	vec2 QuadraticBazierCurve(vec2 start, vec2 end, vec2 a, float t)
	{
		float invT = 1.0 - t;
		return ( invT * invT * start + 2.0 * invT * t * a + t * t * end );
	}

	vec2 CubicBazierCurve(vec2 start, vec2 end, vec2 a, vec2 b, float t)
	{
		float invT = 1.0 - t;
		float t2 = t * t;
		float invT2 = invT * invT;
		return (invT * invT2 * start + 3.0 * invT2 * t * a + 3.0 * invT * t2 * b + t * t2 * end);
	}


	void main()
	{
		//gl_Position = mvp * vec4(linearInterpolation(p0, p3, t),0,1);
		
		//gl_Position = mvp * vec4(QuadraticBazierCurve(p0, p2, p1, t),0,1);

		//vec2 x1 = linearInterpolation(linearInterpolation(p0,p1,t), linearInterpolation(p1,p2,t), t);
		//vec2 x2 = linearInterpolation(linearInterpolation(p1,p2,t), linearInterpolation(p2,p3,t), t);
		//gl_Position = mvp * vec4(linearInterpolation(x1, x2, t),0,1);

		gl_Position = mvp * vec4(CubicBazierCurve(p0, p3, p1, p2, t),0,1);
	}
`;

// Fragment Shader
var curvesFS = `
	precision mediump float;
	void main()
	{
		gl_FragColor = vec4(1,0,0,1);
	}
`;