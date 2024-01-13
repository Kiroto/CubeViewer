import { regularCube, createModelRender } from "./modules/blockViewer.mjs";
import SubscriptableEvent from "./modules/subscriptableEvent.mjs";
import fileToHumanReadable from "./modules/fileToHumanReadable.mjs";

const defaultTexturePackPath = "./src/res/DefaultResourcePack"
const generatedListsPath = "./src/res/generated"

const blockTexturesListPath = `${generatedListsPath}/blockTextureList.json`
const blockModelsListPath = `${generatedListsPath}/blockModelList.json`

const defaultTexturesPath = `${defaultTexturePackPath}/assets/minecraft/textures`
const defaultBlockTexturesPath = `${defaultTexturesPath}/block`

const defaultModelsPath = `${defaultTexturePackPath}/assets/minecraft/models`
const defaultBlockModelsPath = `${defaultModelsPath}/block`

const blockTextureNames = []
const blockModelNames = []

const OnBlockTexturesLoaded = new SubscriptableEvent();
const OnBlockModelsLoaded = new SubscriptableEvent();

let defaultTexturesDidLoad = false;
let blockModelsDidLoad = false;


const modelSelector = document.getElementById("modelSelection")
const showcasePlace = document.getElementById("showcase");

const constructJsonModel = async (baseModelPath, textureOverrides = {}) => {
    const modelJson = await fetch(`${defaultBlockModelsPath}/${baseModelPath}`)
        .then(response => response.json())
    while (modelJson.parent) {
        const parentJsonPath = modelJson.parent.split(":").slice(-1) + ".json"

        console.log(`Fetching ${parentJsonPath}`)
        const childJson = await fetch(`${defaultModelsPath}/${parentJsonPath}`).then(response => response.json())

        modelJson.parent = childJson.parent
        if (!modelJson.textures) {
            modelJson.textures = {}
        }
        if (childJson.textures) {
            Object.keys(childJson.textures).forEach((key, idx) => {
                if (!modelJson.textures.hasOwnProperty(key)) {
                    modelJson.textures[key] = childJson.textures[key]
                }
            })
        }

        if (!modelJson.elements) {
            modelJson.elements = []
        }
        if (childJson.elements) {
            modelJson.elements = modelJson.elements.concat(childJson.elements)
        }
    }

    Object.keys(textureOverrides).forEach((key, idx) => {
        modelJson.textures[key] = childJson.textures[key]
    })

    const textureMap = {}
    // const pointerList = {}

    Object.keys(modelJson.textures).map((key, idx) => {
        const texture = modelJson.textures[key]
        const isTag = texture.startsWith("#");
        if (isTag) {
            const pointer = texture.slice(1)
            // if (!pointerList[pointer]) {
            //     pointerList[pointer] = [key]
            // } else {
            //     pointerList[pointer].push(key)
            // }
            const ptrValue = modelJson.textures[pointer]
            const assigningTexture = ptrValue ?? "./src/res/defaultSprite.png"
            textureMap[key] = `${defaultTexturesPath}/${assigningTexture.split(":").slice(-1)}.png` //  modelJson.textures[pointer].split(":").slice(-1) + ".png"
            
        } else if (texture.startsWith("minecraft") || texture.indexOf(":") == -1) {
            const filename = texture.split(":").slice(-1)
            const textureValue = `${defaultTexturesPath}/${filename}.png`
            textureMap[key] = textureValue
        }
    })

    // Object.keys(textureMap).forEach(key => {
    //     if (pointerList[key]) {
    //         pointerList[key].forEach(pointer => {
    //             textureMap[pointer] = textureMap[key]
    //         })
    //     }
    // })


    console.log(modelJson)
    console.log(textureMap)
    const modelElement = createModelRender(modelJson, "./src/res/defaultSprite.png", textureMap)
    showcasePlace.innerHTML = ""
    showcasePlace.appendChild(modelElement)

    // .then()
    // .catch(error => {
    //     console.error("Error rendering model:", error);
    // });
}

const refreshModelView = () => {
    if (!defaultTexturesDidLoad) return;
    const selectedModel = modelSelector.value
    constructJsonModel(selectedModel)
}

modelSelector.addEventListener("change", refreshModelView)

const refreshSelect = () => {
    modelSelector.innerHTML = ""
    blockModelNames.forEach(modelName => {
        const optionElement = document.createElement("option")
        optionElement.value = modelName
        optionElement.text = fileToHumanReadable(modelName)
        modelSelector.appendChild(optionElement)
    })
}

const refreshOptions = () => {
    if (blockModelsDidLoad) {
        refreshSelect()
    }
}

const loadDefaultBlockTextures = () => {
    fetch(blockTexturesListPath)
        .then(response => response.json())
        .then(blockList => {
            blockTextureNames.push(...blockList)
            OnBlockTexturesLoaded.fire()
        })
        .catch(error => {
            console.error("Error loading blockList:", error);
        });
}

const loadDefaultBlockModels = () => {
    fetch(blockModelsListPath)
        .then(response => response.json())
        .then(blockList => {
            blockModelNames.push(...blockList)
            OnBlockModelsLoaded.fire()
        })
        .catch(error => {
            console.error("Error loading blockList:", error);
        });
}

OnBlockTexturesLoaded.register(() => {
    defaultTexturesDidLoad = true;
    refreshOptions()
})

OnBlockModelsLoaded.register(() => {
    blockModelsDidLoad = true;
    refreshOptions()
})

window.addEventListener('load', function () {
    loadDefaultBlockTextures()
    loadDefaultBlockModels()
});
