const sideClass = ["top", "front", "right", "back", "left", "bottom"]

const pixelsInBlock = 200
const blockSize = 16
const pixelToBlockRatio = pixelsInBlock / blockSize

export const createModelRender = (modelJson, textureURL) => {
    const containerElement = document.createElement("div")
    containerElement.classList.add("container")

    const modelElement = document.createElement("div")
    modelElement.classList.add("model")

    modelJson.elements.forEach(element => {
        const xSize = (element.to[0] - element.from[0])
        const ySize = (element.to[1] - element.from[1])
        const zSize = (element.to[2] - element.from[2])

        const xFacePosition = xSize / 2
        const yFacePosition = ySize / 2
        const zFacePosition = zSize / 2

        const generateFace = (width, height, xRot, yRot, xPos, yPos, zPos, texture, tag = "TEXT") => {
            const face = document.createElement("div")
            face.innerText = tag
            face.classList.add("face")
            face.style.width = `${width * pixelToBlockRatio}px`
            face.style.height = `${height * pixelToBlockRatio}px`
            const transforms = []
            transforms.push(`rotateY(${yRot}deg)`)
            transforms.push(`rotateX(${xRot}deg)`)
            transforms.push(`translateZ(${(zPos) * pixelToBlockRatio}px)`)
            transforms.push(`translateX(${(xPos) * pixelToBlockRatio}px)`)
            transforms.push(`translateY(${(yPos) * pixelToBlockRatio}px)`)
            face.style.transform = transforms.join(" ")
            face.style.backgroundImage = `url(${texture})`
            return face
        }

        const backFace = generateFace(xSize, ySize, 0, 180, -element.from[0], -element.from[1], zSize-8, textureURL, "Back")
        const frontFace = generateFace(xSize, ySize, 0, 0, element.from[0], -element.from[1], element.to[2]-8, textureURL, "Front")

        const leftFace = generateFace(zSize, ySize, 0, -90, element.from[2], -element.from[1], xSize-8, textureURL, "Left")
        const rightFace = generateFace(zSize, ySize, 0, 90, element.from[2], -element.from[1], element.to[0]-8, textureURL, "Right")

        const topFace = generateFace(xSize, zSize, 90, 0, element.from[0], element.from[2], element.from[1]+ySize-8, textureURL, "Top")
        const bottomFace = generateFace(xSize, zSize, -90, 0, element.from[0], element.from[2], element.to[1]-8, textureURL, "Bottom A")


        modelElement.appendChild(frontFace)
        modelElement.appendChild(backFace)
        modelElement.appendChild(leftFace)
        modelElement.appendChild(rightFace)
        modelElement.appendChild(topFace)
        modelElement.appendChild(bottomFace)
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

