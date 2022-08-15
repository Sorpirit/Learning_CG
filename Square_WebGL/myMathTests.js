function MathTestRun()
{
    VectorTests();
}

function VectorTests()
{
    Vector2Tests();

}

function Vector2Tests()
{
    var v1 = new Vector2(3, -4);
    console.assert(v1.x == 3 && v1.y == -4, "Vector2 basic constructor fail");
    var v2 = new Vector2();
    console.assert(v2.x == 0 && v2.y == 0, "Vector2 empty constructor fail");

    console.assert(v1.length() == 5, "Vector2 length() fail");
    console.assert(v2.length() == 0, "Vector2 length() fail");

    console.assert(v1.lengthSqr() == 25, "Vector2 lengthSqr() fail");
    console.assert(v2.lengthSqr() == 0, "Vector2 lengthSqr() fail");

    var v3 = new Vector2(3, 0);
    v1.normalize();
    v3.normalize();
    console.assert(v1.x == 0.6 && v1.y == -0.8, "Vector2 normalize() fail");
    console.assert(v3.x == 1 && v3.y == 0, "Vector2 normalize() fail");

    v3.scale(5);
    v2.scale(10);
    console.assert(v3.x == 5 && v3.y == 0, "Vector2 scale() fail");
    console.assert(v2.x == 0 && v2.y == 0, "Vector2 scale() fail");
}
