attribute vec3 pos;
attribute vec4 clr;

uniform mat4 progViewMatrix;

varying vec4 vcolor;

void main()
{
    gl_Position = progViewMatrix * vec4(pos,1);
    vcolor = clr;
}