import uuidGen from "./uuidGen.mjs"
export default class SubscriptableEvent {
    constructor() {
        this.callbacks = {}
    }

    register(callback) {
        const generatedUUID = uuidGen()
        this.callbacks[generatedUUID] = callback
        return generatedUUID
    }

    unRegister(uuid) {
        delete this.callbacks[uuid]
    }

    unRegisterAll() {
        for (const key in this.callbacks) {
            if (this.callbacks.hasOwnProperty(key)) {
                delete this.callbacks[key]
                callback.apply(null, ...args)
            }
        }
    }

    fire(...args) {
        for (const key in this.callbacks) {
            if (this.callbacks.hasOwnProperty(key)) {
                const callback = this.callbacks[key]
                callback.apply(null, ...args)
            }
        }
    }
}