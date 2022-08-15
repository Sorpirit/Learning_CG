
const degrees_to_radians = Math.PI / 180;

// Returns a 3x3 transformation matrix as an array of 9 values in column-major order.
// The transformation first applies scale, then rotation, and finally translation.
// The given rotation value is in degrees.
function GetTransform( positionX, positionY, rotation, scale )
{
	const rotationRad = rotation * degrees_to_radians;
	const cosRot = Math.cos(rotationRad);
	const sinRot = Math.sin(rotationRad);
	const positionMatrix = [1, 0, 0, 0, 1, 0, positionX, positionY, 1];
	const rotationMatrix = [cosRot, sinRot, 0, -sinRot, cosRot, 0, 0, 0, 1];
	const scaleMatrix = [scale, 0, 0, 0, scale, 0, 0, 0, 1];
	return ApplyTransform(ApplyTransform(scaleMatrix, rotationMatrix), positionMatrix);
	// return Array( 
	// 	scale * cosRot, sinRot, 0, 
	// 	-sinRot, scale * cosRot, 0, 
	// 	positionX, positionY, 1 );
}

// Returns a 3x3 transformation matrix as an array of 9 values in column-major order.
// The arguments are transformation matrices in the same format.
// The returned transformation first applies trans1 and then trans2.
function ApplyTransform( trans1, trans2 )
{
	const rows1 = [GetRow(trans2, 0), GetRow(trans2, 1), GetRow(trans2, 2)];
	const clos2 = [GetColumn(trans1, 0), GetColumn(trans1, 1), GetColumn(trans1, 2)];
	// const rows1 = [GetRow(trans1, 0), GetRow(trans1, 1), GetRow(trans1, 2)];
	// const clos2 = [GetColumn(trans2, 0), GetColumn(trans2, 1), GetColumn(trans2, 2)];
	const result = Array( 1, 0, 0, 0, 1, 0, 0, 0, 1 );
	for(var i = 0; i < rows1.length; i++)
	for(var j = 0; j < clos2.length; j++)
	{
		result[i + j * 3] = Multiply(rows1[i], clos2[j]);
	}
	return result;
}

function Multiply(arr1, arr2)
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
	return [matrix[index], matrix[index + 3], matrix[index + 6]]
}

function GetColumn(matrix, index)
{
	return [matrix[index * 3], matrix[index * 3 + 1], matrix[index * 3 + 2]]
}