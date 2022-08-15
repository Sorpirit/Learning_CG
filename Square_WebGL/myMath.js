function multiplyArray(arr1, arr2)
{
	if(arr1.length != arr2.length)
		console.error("Cant multiply array with different length");

	var sum = 0;
	for(var i = 0; i < arr1.length; i++)
	{
		sum += arr1[i] * arr2[i];
	}
	return sum;
}

class Vector2
{
    constructor(x, y) 
    {
        this.x = x === undefined ? 0.0 : x;
        this.y = y === undefined ? 0.0 : y;
    }

    get array()
    {
        return [this.x, this.y];
    }

    length()
    {
        return Math.sqrt(this.lengthSqr());
    }

    lengthSqr()
    {
        return this.x * this.x + this.y * this.y;
    }

    normalize()
    {
        const length = this.length();
        console.assert(length != 0.0, "Cant normalize vector with length 0");

        this.x /= length;
        this.y /= length;
        return length;
    }

    scale(value)
    {
        this.x *= value;
        this.y *= value;
    }

    equal(vecB) {
        if(typeof(vecB) != 'Vector2')
            return false;

        return this.x == vecB.x && this.y == vecB.y;
    }

    static subtract(vec1, vec2){
        return new Vector2(vec1.x - vec2.x, vec1.y - vec2.y);
    }
    
    static add(vec1, vec2){
        return new Vector2(vec1.x + vec2.x, vec1.y + vec2.y);
    }

    static dot(vec1, vec2){
        return vec1.x * vec2.x + vec1.y * vec2.y;
    }

}

class Vector3
{
    constructor(x, y, z) 
    {

        if(typeof(x) === 'Vector2')
        {
            this.x = x.x;
            this.y = x.y;
            this.z = y !== undefined ? y : 0.0;
        }
        else
        {

            this.x = x !== undefined ? x : 0.0;
            this.y = y !== undefined ? y : 0.0;
            this.z = z !== undefined ? z : 0.0;
        }
    }

    get array()
    {
        return [this.x, this.y, this.z];
    }


    length()
    {
        return Math.sqrt(this.lengthSqr());
    }

    lengthSqr()
    {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }

    normalize()
    {
        const length = this.length();
        this.x /= length;
        this.y /= length;
        this.z /= length;
        return length;
    }

    scale(value)
    {
        this.x *= value;
        this.y *= value;
        this.z *= value;
    }

    equal(vecB) {
        if(typeof(vecB) != 'Vector3')
            return false;

        return this.x == vecB.x && this.y == vecB.y && this.z == vecB.z;
    }

    static Subtract(vec1, vec2){
        return new Vector3(vec1.x - vec2.x, vec1.y - vec2.y, vec1.z - vec2.z);
    }
    
    static Add(vec1, vec2){
        return new Vector3(vec1.x + vec2.x, vec1.y + vec2.y, vec1.z + vec2.z);
    }

    static Dot(vec1, vec2){
        return vec1.x * vec2.x + vec1.y * vec2.y + vec1.z * vec2.z;
    }

    static Cross(vec1, vec2){
        return new Vector3(vec1.y * vec2.z - vec1.z * vec2.y, vec1.z * vec2.x - vec1.x * vec2.z, vec1.x * vec2.y - vec1.y * vec1.x);
    }
}

class Vector4
{
    constructor(x, y, z, w) 
    {
        if(typeof(x) === 'Vector3')
        {
            this.x = x.x;
            this.y = x.y;
            this.z = x.z;
            this.w = y !== undefined ? y : 0.0;
        }
        else
        {
            this.x = x !== undefined ? x : 0.0;
            this.y = y !== undefined ? y : 0.0;
            this.z = z !== undefined ? z : 0.0;
            this.w = w !== undefined ? w : 0.0;
        }
    }

    get array()
    {
        return [this.x, this.y, this.z, this.w];
    }

    length()
    {
        return sqrt(this.lengthSqr());
    }

    lengthSqr()
    {
        return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
    }

    normalize()
    {
        const length = this.length();
        this.x /= length;
        this.y /= length;
        this.z /= length;
        this.w /= length;
        return length;
    }

    scale(value)
    {
        this.x *= value;
        this.y *= value;
        this.z *= value;
        this.w *= value;
    }

    equal(vecB) {
        if(typeof(vecB) != 'Vector4')
            return false;

        return this.x == vecB.x && this.y == vecB.y && this.z == vecB.z && this.w == vecB.w;
    }

    static subtract(vec1, vec2){
        return new Vector4(vec1.x - vec2.x, vec1.y - vec2.y, vec1.z - vec2.z, vec1.w - vec2.w);
    }
    
    static add(vec1, vec2){
        return new Vector4(vec1.x + vec2.x, vec1.y + vec2.y, vec1.z + vec2.z, vec1.w + vec2.w);
    }

    static dot(vec1, vec2){
        return vec1.x * vec2.x + vec1.y * vec2.y + vec1.z * vec2.z + vec1.w * vec2.w;
    }
}

class Ray
{
    constructor(pos, dir) 
    {
        this.pos = pos;
        this.dir = dir;
    }
}

class Mat4
{
    constructor(array) 
    {
        console.assert(array.length == 16, "Wrong array length");
        this.array = array;
    }

    get row1()
    {
        return Mat4.GetRow(this, 0);
    }

    get row2()
    {
        return Mat4.GetRow(this, 1);
    }

    get row3()
    {
        return Mat4.GetRow(this, 2);
    }

    get row4()
    {
        return Mat4.GetRow(this, 3);
    }

    get column1()
    {
        return Mat4.GetColumn(this, 0);
    }

    get column2()
    {
        return Mat4.GetColumn(this, 1);
    }

    get column3()
    {
        return Mat4.GetColumn(this, 2);
    }

    get column4()
    {
        return Mat4.GetColumn(this, 3);
    }

    static GetIdentityMatrix()
    {
        return new Mat4([
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ]);
    }

    static GetRow(mat4, index)
    {
        return [mat4.array[index], mat4.array[index + 4], mat4.array[index + 8], mat4.array[index + 12]]
    }

    static GetColumn(mat4, index)
    {
        return [mat4.array[index * 4], mat4.array[index * 4 + 1], mat4.array[index * 4 + 2], mat4.array[index * 4 + 3]]
    }


    //matrixA * matrixB
    static Mult(matrixA, matrixB)
    {
        console.assert(matrixA.array.length == matrixB.array.length, 'Matrix length is different');

        const rows1 = [matrixA.row1, matrixA.row2, matrixA.row3, matrixA.row4];
        const clos2 = [matrixB.column1, matrixB.column2, matrixB.column3, matrixB.column4];

        const result = Mat4.GetIdentityMatrix();
        for(var i = 0; i < rows1.length; i++)
        for(var j = 0; j < clos2.length; j++)
        {
            result.array[i + j * 4] = multiplyArray(rows1[i], clos2[j]);
        }
        return result;
    }

    static GetOrthogonalProjection(left, right, bottom, top, nearZ, farZ)
    {
        var depth = farZ - nearZ;
        var width = right - left;
        var heigh = top - bottom;
        return new Mat4([
            2 / width,0,0,0,
            0,2 / heigh,0,0,
            0,0,2 / depth,0,
            -(right + left) / width, -(top + bottom) / heigh, -(farZ + nearZ) / depth, 1 ]);
    }

    static GetOrthogonalProjection(width, heigh, nearZ, farZ)
    {
        const depth = farZ - nearZ;
        return new Mat4([
            2 / width,0,0,0,
            0,2 / heigh,0,0,
            0,0,2 / depth,0,
            -1,-1, -(farZ + nearZ) / depth,1 ]);
    }

    static GetPerspectiveProjection(left, right, bottom, top, nearZ, farZ)
    {
        var depth = farZ - nearZ;
        var width = right - left;
        var heigh = top - bottom;

        return new Mat4([
            2.0 * nearZ / width,0,0,0,
            0, 2.0 * nearZ / heigh,0,0,
            0,0, -(nearZ + farZ) / depth,-1,
            -nearZ * (right + left) / width, -nearZ *(top + bottom) / heigh, 2.0 * farZ * nearZ / (nearZ - farZ), 0]);
    }

    static GetLookAt(cameraPosition, cameraTarget, upDir){

        var forward = Vector3.Subtract(cameraPosition, cameraTarget).normalize();
        var right = Vector3.Cross(upDir, forward).normalize();
        var up = Vector3.Cross(forward, right);
        return new Mat4([
            right.x, up.x, forward.x, 0,
            right.y, up.y, forward.y, 0,
            right.z, up.z, forward.z, 0,
            Vector3.Dot(right, cameraPosition), Vector3.Dot(up, cameraPosition), Vector3.Dot(forward, cameraPosition), 1 ]);
    }

    static CreateTranslation(x, y, z)
    {
        return new Mat4([
            1,0,0,0,
            0,1,0,0,
            0,0,1,0,
            x,y,z,1 ]);
    }

    static CreateScale(x, y, z)
    {
        return new Mat4([
            x,0,0,0,
            0,y,0,0,
            0,0,z,0,
            0,0,0,1 ]);
    }
}

class Mat3
{
    constructor(array) {
        console.assert(array.length == 9, "Wrong array length");
        this.array = array;
    }

    get row1()
    {
        return Mat3.GetRow(this, 0);
    }

    get row2()
    {
        return Mat3.GetRow(this, 1);
    }

    get row3()
    {
        return Mat3.GetRow(this, 2);
    }

    get column1()
    {
        return Mat3.GetColumn(this, 0);
    }

    get column2()
    {
        return Mat3.GetColumn(this, 1);
    }

    get column3()
    {
        return Mat3.GetColumn(this, 2);
    }

    static GetIdentityMatrix()
    {
        return new Mat3([
            1, 0, 0,
            0, 1, 0,
            0, 0, 1,
        ]);
    }

    static GetRow(mat3, index)
    {
        return [mat3.array[index], mat3.array[index + 3], mat3.array[index * 6]]
    }

    static GetColumn(mat3, index)
    {
        return [mat3.array[index * 3], mat3.array[index * 3 + 1], mat3.array[index * 3 + 2]]
    }

    //matrixA * matrixB
    static Mult(matrixA, matrixB)
    {
        console.assert(matrixA.array.length == matrixB.array.length, 'Matrix length is different');

        const rows1 = [matrixA.row1, matrixA.row2, matrixA.row3];
        const clos2 = [matrixB.column1, matrixB.column2, matrixB.column3];

        const result = Mat3.GetIdentityMatrix();
        for(var i = 0; i < rows1.length; i++)
        for(var j = 0; j < clos2.length; j++)
        {
            result[i + j * 3] = multiplyArray(rows1[i], clos2[j]);
        }
        return result;
    }
}
