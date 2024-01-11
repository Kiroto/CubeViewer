import os
import json

RESOURCES_FOLDER = "./src/res"
GENERATED_RESOURCES_FOLDER = f"{RESOURCES_FOLDER}/generated"

DEFAULT_RESOURCES_FOLDER = f"{RESOURCES_FOLDER}/DefaultResourcePack"

BLOCK_TEXTURE_LIST_OUTPUT_FILE = f"{GENERATED_RESOURCES_FOLDER}/blockTextureList.json"
BLOCK_MODEL_LIST_OUTPUT_FILE = f"{GENERATED_RESOURCES_FOLDER}/blockModelList.json"


def get_all_filenames(folder_path):
    filenames = [f for f in os.listdir(folder_path) if os.path.isfile(os.path.join(folder_path, f))]
    return filenames

class MinecraftResourcePack:
    PACK_META_PATH = "pack.mcmeta"
    PACK_PNG_PATH = "pack.png"
    PACK_ASSETS_PATH = "assets"
    PACK_MINECRAFT_ASSETS_PATH = f"{PACK_ASSETS_PATH}/minecraft"
    PACK_TEXTURES_PATH = f"{PACK_MINECRAFT_ASSETS_PATH}/textures"
    PACK_BLOCK_TEXTURES_PATH = f"{PACK_TEXTURES_PATH}/block"
    PACK_MODELS_PATH=f"{PACK_MINECRAFT_ASSETS_PATH}/models"
    PACK_BLOCK_MODELS_PATH=f"{PACK_MODELS_PATH}/block"


    def __init__(self, resource_pack_path) -> None:
        self.block_texture_files = get_all_filenames(f"{resource_pack_path}/{MinecraftResourcePack.PACK_BLOCK_TEXTURES_PATH}")
        self.block_model_files = get_all_filenames(f"{resource_pack_path}/{MinecraftResourcePack.PACK_BLOCK_MODELS_PATH}")

def save_as_json(dictionary, path):
    json_text = json.dumps(dictionary, indent=4)
    with open(path, "w") as json_file:
        json_file.write(f"{json_text}")

if __name__ == "__main__":
    mrp = MinecraftResourcePack(DEFAULT_RESOURCES_FOLDER)
    
    save_as_json(mrp.block_texture_files, BLOCK_TEXTURE_LIST_OUTPUT_FILE)
    save_as_json(mrp.block_model_files, BLOCK_MODEL_LIST_OUTPUT_FILE)

