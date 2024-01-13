const faceIndex = ["top", "front", "right", "back", "left", "bottom"]

const pixelsInBlock = 200
const blockSize = 16
const pixelToBlockRatio = pixelsInBlock / blockSize


const generateFace = (width, height, xRot, yRot, xPos, yPos, zPos, texture, tag = "", isHelper = false) => {
    if (!texture) return undefined;
    const face = document.createElement("div")
    face.innerText = tag
    face.classList.add("face")
    if (isHelper)
        face.classList.add("helper")

    face.style.width = `${width * pixelToBlockRatio}px`
    face.style.height = `${height * pixelToBlockRatio}px`

    const transforms = []
    const xtranslation = (xPos - width / 2)
    const ytranslation = (yPos - height / 2)
    transforms.push(`translateZ(${(zPos) * pixelToBlockRatio}px)`)
    transforms.push(`translateX(${xtranslation * pixelToBlockRatio}px)`)
    transforms.push(`translateY(${ytranslation * pixelToBlockRatio}px)`)
    transforms.push(`rotateY(${yRot}deg)`)
    transforms.push(`rotateX(${xRot}deg)`)
    face.style.transform = transforms.join(" ")
    face.style.backgroundImage = `url(${texture.url})`
    face.style.backgroundPosition = "bottom left"
    // face.style.backgroundPositionX = `${texture.xOffset * pixelToBlockRatio}px`
    // face.style.backgroundPositionY = `${texture.yOffset  * pixelToBlockRatio}px`
    return face
}



export const createModelRender = (modelJson, defaultTextureUrl, textureMap) => {
    const containerElement = document.createElement("div")
    containerElement.classList.add("container")

    const modelElement = document.createElement("div")
    modelElement.classList.add("model")

    const parseTexture = (element, side) => {
        const sideValue = element.faces[side]
        if (!sideValue) {
            console.log(`Could not find texture for side ${side}`)
            return undefined
        };
        const sideTexture = sideValue.texture
        const uvs = sideValue.uv
        let faceTexture = defaultTextureUrl
        if (sideTexture.startsWith("#")) {
            const queryTexture = sideTexture.slice(1)
            const mappedTexture = textureMap[queryTexture]
            if (mappedTexture) {
                faceTexture = mappedTexture
            } else {
                console.log(`Could not find expected mapped texture ${queryTexture} in Texture Map: ${textureMap}`)
            }
        } else {
            faceTexture = sideTexture
        }
        return { url: faceTexture, xOffset: 0, yOffset: 0 };
    }
    const addFace = (...args) => {
        const generatedModel = generateFace.apply(null, args)
        if (generatedModel)
            modelElement.appendChild(generatedModel)
    }

    modelJson.elements.forEach((element, idx) => {
        // if (idx != 1) return;
        const xSize = (element.to[0] - element.from[0])
        const ySize = (element.to[1] - element.from[1])
        const zSize = (element.to[2] - element.from[2])

        element.from[0] = 16 - element.from[0]
        element.to[0] = 16 - element.to[0]

        element.from[1] = 16 - element.from[1]
        element.to[1] = 16 - element.to[1]

        element.from[2] = 16 - element.from[2]
        element.to[2] = 16 - element.to[2]


        const xFacePosition = xSize / 2
        const yFacePosition = ySize / 2
        const zFacePosition = zSize / 2

        const xCenter = ((element.to[0] + element.from[0]) / 2)
        const yCenter = ((element.to[1] + element.from[1]) / 2)
        const zCenter = ((element.to[2] + element.from[2]) / 2) - 8

        addFace(xSize, ySize, 0, 180, xCenter, yCenter, zCenter - zFacePosition, parseTexture(element, "south"))
        addFace(xSize, ySize, 0, 0, xCenter, yCenter, zCenter + zFacePosition, parseTexture(element, "north"))

        addFace(zSize, ySize, 0, -90, xCenter - xFacePosition, yCenter, zCenter, parseTexture(element, "east"))
        addFace(zSize, ySize, 0, 90, xCenter + xFacePosition, yCenter, zCenter, parseTexture(element, "west"))

        addFace(xSize, zSize, 90, 0, xCenter, yCenter - yFacePosition, zCenter, parseTexture(element, "up"))
        addFace(xSize, zSize, -90, 0, xCenter, yCenter + yFacePosition, zCenter, parseTexture(element, "down"))

        console.log(`X: ${xCenter},Y: ${yCenter},Z ${zCenter}`)

    })
    containerElement.appendChild(modelElement)
    return containerElement
}

export const cube = (top, front, right, back, left, bottom) => {
    const containerElement = document.createElement("div")
    containerElement.classList.add("container")

    const cubeElement = document.createElement("div")
    cubeElement.classList.add("cube")

    const sideTextures = [top, front, right, back, left, bottom]
    for (let side = 0; side < 6; side++) {
        const face = document.createElement("div")
        face.classList.add("face")
        face.classList.add(faceIndex[side])
        face.style.backgroundImage = `url(${sideTextures[side]})`
        cubeElement.appendChild(face)
    }
    containerElement.appendChild(cubeElement)
    return containerElement;
}

export const regularCube = (face) => {
    return cube(face, face, face, face, face, face)
}

export const differentSideCube = (faceTop, faceSide, faceBottom) => {
    return cube(faceTop, faceSide, faceSide, faceSide, faceSide, faceBottom)
}

export const stairs = (top, middle, frontTop, frontBottom, left, right, back, bottom) => {

}

export const regularStairs = (face) => {
    return stairs(face, face, face, face, face, face, face, face)
}

