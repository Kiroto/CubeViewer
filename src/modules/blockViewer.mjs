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
        const xSize = (element.to[0] - element.from[0])// * pixelToBlockRatio
        const ySize = (element.to[1] - element.from[1])// * pixelToBlockRatio
        const zSize = (element.to[2] - element.from[2])// * pixelToBlockRatio

        const xFacePosition = xSize / 2
        const yFacePosition = ySize / 2
        const zFacePosition = zSize / 2

        const ySeparator = yFacePosition * pixelToBlockRatio
        console.log(ySeparator)

        const frontFace = document.createElement("div")
        frontFace.classList.add("face")
        frontFace.style.transform = `translateZ(${zFacePosition * pixelToBlockRatio}px)`
        frontFace.style.backgroundImage = `url(${textureURL})`

        const backFace = document.createElement("div")
        backFace.classList.add("face")
        backFace.style.transform = `translateZ(-${zFacePosition * pixelToBlockRatio}px) rotateY(180deg)`
        backFace.style.backgroundImage = `url(${textureURL})`

        const leftFace = document.createElement("div")
        leftFace.classList.add("face")
        leftFace.style.transform = `translateX(-${xFacePosition * pixelToBlockRatio}px) rotateY(-90deg)`
        leftFace.style.backgroundImage = `url(${textureURL})`

        const rightFace = document.createElement("div")
        rightFace.classList.add("face")
        rightFace.style.transform = `translateX(${xFacePosition * pixelToBlockRatio}px) rotateY(90deg)`
        rightFace.style.backgroundImage = `url(${textureURL})`

        const topFace = document.createElement("div")
        topFace.classList.add("face")
        topFace.style.transform = `translateY(-${ySeparator}px) rotateX(90deg)`
        topFace.style.backgroundImage = `url(${textureURL})`

        const bottomFace = document.createElement("div")
        bottomFace.classList.add("face")
        bottomFace.style.transform = `translateY(${ySeparator}px) rotateX(-90deg)`
        bottomFace.style.backgroundImage = `url(${textureURL})`

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

