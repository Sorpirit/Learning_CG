// bgImg is the background image to be modified.
// fgImg is the foreground image.
// fgOpac is the opacity of the foreground image.
// fgPos is the position of the foreground image in pixels. It can be negative and (0,0) means the top-left pixels of the foreground and background are aligned.
function composite( bgImg, fgImg, fgOpac, fgPos )
{
    const width = bgImg.width;
    const bgData = bgImg.data;
    const fgData = fgImg.data;
    for(let y = 0; y < bgImg.height; y += 1)
    {
        for(let x = 0; x < bgImg.width; x += 1)
        {
            const bgColorIndices = getColorIndicesForCoord(x, y, width);
            const bgColor = getColor(bgData, bgColorIndices);
            
            var fgColor = [0, 0, 0, 0];

            if(!outOfBounds(x - fgPos.x, y - fgPos.y, fgImg.width, fgImg.height))
            {
                const fgColorIndices = getColorIndicesForCoord(x - fgPos.x, y - fgPos.y, fgImg.width);
                fgColor = getColor(fgData, fgColorIndices);
            }

            //Alpha blending
            // if(fgColor[3] != 0 && bgColor[3] != 0)
            // {
            //     const fgAlpha = fgColor[3] * fgOpac;
            //     const newAlpha = fgAlpha  + bgColor[3] * (1 - fgAlpha);
            //     bgColor[0] = (fgColor[0] * fgAlpha + bgColor[0] * bgColor[3] * (1 - fgAlpha)) / newAlpha;
            //     bgColor[1] = (fgColor[1] * fgAlpha + bgColor[1] * bgColor[3] * (1 - fgAlpha)) / newAlpha;
            //     bgColor[2] = (fgColor[2] * fgAlpha + bgColor[2] * bgColor[3] * (1 - fgAlpha)) / newAlpha;
            //     bgColor[3] = newAlpha;
            // }

            //Additive blending
            // if(fgColor[3] != 0 && bgColor[3] != 0)
            // {
            //     const fgAlpha = fgColor[3] * fgOpac;
            //     const newAlpha = saturate(fgAlpha + bgColor[3]);
            //     bgColor[0] = (fgColor[0] * fgAlpha + bgColor[0] * bgColor[3]) / newAlpha;
            //     bgColor[1] = (fgColor[1] * fgAlpha + bgColor[1] * bgColor[3]) / newAlpha;
            //     bgColor[2] = (fgColor[2] * fgAlpha + bgColor[2] * bgColor[3]) / newAlpha;
            //     bgColor[3] = newAlpha;
            // }

            //Difference blending
            // if(fgColor[3] != 0 && bgColor[3] != 0)
            // {
            //     const fgAlpha = fgColor[3] * fgOpac;
            //     const newAlpha = saturate(abs(fgAlpha + bgColor[3]));
            //     bgColor[0] = abs(fgColor[0] * fgAlpha - bgColor[0] * bgColor[3]) / newAlpha;
            //     bgColor[1] = abs(fgColor[1] * fgAlpha - bgColor[1] * bgColor[3]) / newAlpha;
            //     bgColor[2] = abs(fgColor[2] * fgAlpha - bgColor[2] * bgColor[3]) / newAlpha;
            //     bgColor[3] = newAlpha;
            // }

            //Myltiply blending
            // if(fgColor[3] != 0 && bgColor[3] != 0)
            // {
            //     const fgAlpha = fgColor[3] * fgOpac;
            //     bgColor[0] = fgColor[0] * bgColor[0] * fgAlpha + (1 - fgAlpha) * bgColor[0];
            //     bgColor[1] = fgColor[1] * bgColor[1] * fgAlpha + (1 - fgAlpha) * bgColor[1];
            //     bgColor[2] = fgColor[2] * bgColor[2] * fgAlpha + (1 - fgAlpha) * bgColor[2];
            //     bgColor[3] = fgAlpha;
            // }

            //Screen blending
            if(fgColor[3] != 0 && bgColor[3] != 0)
            {
                bgColor[0] = 1 - (1 - fgColor[0]) * (1 - bgColor[0]);
                bgColor[1] = 1 - (1 - fgColor[1]) * (1 - bgColor[1]);
                bgColor[2] = 1 - (1 - fgColor[2]) * (1 - bgColor[2]);
                bgColor[3] = bgColor[3];
            }

            writeColor(bgColor, bgData, bgColorIndices);
        }
    }
}
function writeColor(color, data, colorIndices)
{
    data[colorIndices[0]] = color[0] * 255; // red
    data[colorIndices[1]] = color[1] * 255; // green
    data[colorIndices[2]] = color[2] * 255; // blue
    data[colorIndices[3]] = color[3] * 255; // alpha
}

function getColorIndicesForCoord(x, y, width)
{
    const red = y * (width * 4) + x * 4;
    return [red, red + 1, red + 2, red + 3];
}

function outOfBounds(x, y, width, height)
{
    return x < 0 || y < 0 || x >= width || y >= height;
}

function getColor(data, colorIndices)
{
    return [data[colorIndices[0]] / 255.0, data[colorIndices[1]] / 255.0, data[colorIndices[2]] / 255.0, data[colorIndices[3]] / 255.0];
}

function setPixel(imageData, x, y, r, g, b, a) {
    const index = x + y * imageData.width;
    imageData.data[index * 4] = r;
    imageData.data[index * 4 + 1] = g;
    imageData.data[index * 4 + 2] = b;
    imageData.data[index * 4 + 3] = a;
}

function saturate(val) {
    return val > 1.0 ? 1.0 : (val < 0.0 ? 0 : val);
}

function abs(val) {
    return val >= 0.0 ? val : -val;
}
