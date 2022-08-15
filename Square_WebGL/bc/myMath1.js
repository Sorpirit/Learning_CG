function getIdentityMatrix(){
    return [
        1,0,0,0,
        0,1,0,0,
        0,0,1,0,
        0,0,0,1 ];
}

function multiplyMatrix(matrix1, matrix2){
    console.assert(matrix1.length == matrix2.length, 'Matrix length is different');

    const rows1 = [GetRow(matrix1, 0), GetRow(matrix1, 1), GetRow(matrix1, 2), GetRow(matrix1, 3)];
	const clos2 = [GetColumn(matrix2, 0), GetColumn(matrix2, 1), GetColumn(matrix2, 2), GetColumn(matrix2, 3)];

    console.log(rows1)
    console.log(clos2)

	const result = getIdentityMatrix();
	for(var i = 0; i < rows1.length; i++)
	for(var j = 0; j < clos2.length; j++)
	{
		result[i + j * 4] = multiplyArray(rows1[i], clos2[j]);
	}
	return result;
}

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

function GetRow(matrix, index)
{
	return [matrix[index], matrix[index + 4], matrix[index + 8], matrix[index + 12]]
}

function GetColumn(matrix, index)
{
	return [matrix[index * 4], matrix[index * 4 + 1], matrix[index * 4 + 2], matrix[index * 4 + 3]]
}

function getOrthogonal(left, right, bottom, top, nearZ, farZ)
{
    const depth = farZ - nearZ;
    const width = right - left;
    const heigh = top - bottom;
    return [
        2 / width,0,0,0,
        0,2 / heigh,0,0,
        0,0,2 / depth,0,
        -(right + left) / width, -(top + bottom) / (heigh), -(farZ + nearZ) / depth,1 ];
}

function getOrthogonal(width, heigh, nearZ, farZ)
{
    const depth = farZ - nearZ;
    return [
        2 / width,0,0,0,
        0,2 / heigh,0,0,
        0,0,2 / depth,0,
        -1,-1, -(farZ + nearZ) / depth,1 ];
}

function getPerspective(fieldOfView, aspectRatio, nearZ, farZ)
{
    const num1 = 1.0 / Math.tan(fieldOfView * 0.5);
    const num2 = num1 / aspectRatio;
    return [
        num1,0,0,0,
        0,num1,0,0,
        0,0,-farZ / (farZ - nearZ),-(nearZ * farZ / (farZ - nearZ)),
        0,0,-1,0 ];
}
function getPerspectiveProj(fieldOfView, aspectRatio, nearZ, farZ)
{
    const num1 = 1.0 / Math.tan(fieldOfView * 0.5);
    const num2 = num1 / aspectRatio;
    perspectiveTransform = [
        nearZ,0,0,0,
        0,nearZ,0,0,
        0,0,(farZ + nearZ),-(nearZ * farZ),
        0,0,1,0 ];
    console.log("perspectiveTransform:")
    console.log(perspectiveTransform);
    orthographic = getOrthogonal(-5,5,-3,3, nearZ, farZ);
    console.log("orthographic:")
    console.log(orthographic);
    return multiplyMatrix(perspectiveTransform, orthographic);
}

function getLookAt(cameraPosition, cameraTarget, upDir){

    var forward = normalize(subtract(cameraPosition, cameraTarget));
    var right = normalize(cross(upDir, forward));
    var up = cross(forward, right);
    return [
        right[0],right[1],right[2], dot(right, cameraPosition),
        up[0],up[1],up[2], dot(up, cameraPosition),
        forward[0],forward[1],forward[2], dot(forward, cameraPosition),
        0,0,0,1 ];
}

function normalize(vec){
    const length =  vectorLength(vec);
    scale(vec, 1.0 / length);
}

function subtract(vec1, vec2){
    var result = Array(vec1.length);
    for(var i = 0; i < vec.length; i++)
    {
        result[i] = vec1[i] - vec2[i];
    }
    return result;
}

function add(vec1, vec2){
    var result = Array(vec1.length);
    for(var i = 0; i < vec.length; i++)
    {
        result[i] = vec1[i] + vec2[i];
    }
    return result;
}

function scale(vec, scale)
{
    for(var i = 0; i < vec.length; i++)
    {
        vec[i] *= scale;
    }
}

function vectorLength(vec){
    var sqrSum = 0;
    for(var i = 0; i < vec.length; i++)
    {
        sqrSum += vec[i] * vec[i]; 
    }

    return Math.sqrt(sqrSum);
}

function dot(vec1, vec2)
{
    var sum = 0;
    for(var i = 0; i < vec1.length; i++)
    {
        sum += vec1[i] * vec2[i]; 
    }

    return sum;
}

function cross(vec1, vec2)
{
    return  [ vec1[1] * vec2[2] - vec1[2] * vec2[1], vec1[2] * vec2[0] - vec1[0] * vec2[2], vec1[0] * vec2[1] - vec1[1] * vec1[0] ]
}

function createTranslation(x, y, z)
{
    return [
        1,0,0,0,
        0,1,0,0,
        0,0,1,0,
        x,y,z,1 ];
}

function createScale(x, y, z)
{
    return [
        x,0,0,0,
        0,y,0,0,
        0,0,z,0,
        0,0,0,1 ];
}
