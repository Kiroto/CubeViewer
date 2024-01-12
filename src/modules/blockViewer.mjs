const sideClass = ["top", "front", "right", "back", "left", "bottom"]

const pixelsInBlock = 200
const blockSize = 16
const pixelToBlockRatio = pixelsInBlock / blockSize


const generateFace = (width, height, xRot, yRot, xPos, yPos, zPos, texture, tag = "", isHelper = false) => {
    const face = document.createElement("div")
    face.innerText = tag
    face.classList.add("face")
    if (isHelper)
        face.classList.add("helper")

    face.style.width = `${width * pixelToBlockRatio}px`
    face.style.height = `${height * pixelToBlockRatio}px`

    const transforms = []
    transforms.push(`translateZ(${(zPos) * pixelToBlockRatio}px)`)
    transforms.push(`translateX(${(xPos - width/2) * pixelToBlockRatio}px)`)
    transforms.push(`translateY(${(yPos - height/2) * pixelToBlockRatio}px)`)
    transforms.push(`rotateY(${yRot}deg)`)
    transforms.push(`rotateX(${xRot}deg)`)
    face.style.transform = transforms.join(" ")
    face.style.backgroundImage = `url(${texture})`
    return face
}



export const createModelRender = (modelJson, textureURL) => {
    const containerElement = document.createElement("div")
    containerElement.classList.add("container")

    const modelElement = document.createElement("div")
    modelElement.classList.add("model")

    const addFace = (...args) => {
        modelElement.appendChild(generateFace.apply(null, args))
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

        addFace(xSize, ySize, 0, 180, xCenter, yCenter, zCenter - zFacePosition, textureURL)
        addFace(xSize, ySize, 0, 0, xCenter, yCenter, zCenter + zFacePosition, textureURL )

        addFace(zSize, ySize, 0, -90, xCenter - xFacePosition, yCenter, zCenter, textureURL)
        addFace(zSize, ySize, 0, 90, xCenter + xFacePosition, yCenter, zCenter, textureURL)

        addFace(xSize, zSize, 90, 0, xCenter, yCenter - yFacePosition, zCenter, textureURL)
        addFace(xSize, zSize, -90, 0, xCenter, yCenter + yFacePosition, zCenter, textureURL)

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
        face.classList.add(sideClass[side])
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

