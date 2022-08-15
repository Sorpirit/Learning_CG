function createMeshBuilder()
{
    return {
        positions : [],
        colors : [],
        normals: [],
        addTriangle : function(vec1, vec2, vec3, color) {

            var normal = Vector3.Cross(Vector3.Subtract(vec1, vec2), Vector3.Subtract(vec3, vec2));
            normal.normalize();
            
            this.positions = this.positions.concat(vec1.array);
            this.positions = this.positions.concat(vec2.array);
            this.positions = this.positions.concat(vec3.array);

            this.normals = this.normals.concat(normal.array);
            this.normals = this.normals.concat(normal.array);
            this.normals = this.normals.concat(normal.array);

            //color for each vertex
            for (let i = 0; i < 3; i++) {
                this.colors = this.colors.concat(color.array);
            }
        },
        addQuad : function(vec1, vec2, vec3, vec4, color) {
            this.addTriangle(vec1, vec2, vec3, color);
            this.addTriangle(vec1, vec3, vec4, color);
        }
    };;
}