import { defineStore } from 'pinia'

export const useMainStore = defineStore('mainStore', {
    state: () => {
        return {
            modal: { image: false },
            loadingPage: false,
            selectedImage: {image: '', type: 'horizontal', title: '', description: ''}
        }
    },
    actions: {
        openModal (type) {
            this.modal[type] = true
        },
        closeModal (type) {
            this.modal[type] = false
        },
        setImage (data) {
            const image = data.image
            const description = Object.prototype.hasOwnProperty.call(data, 'description') ? data.description : ''
            const title = Object.prototype.hasOwnProperty.call(data, 'title') ? data.title : ''
            const type = Object.prototype.hasOwnProperty.call(data, 'type') ? data.type : 'horizontal'
            this.selectedImage = {image: image, type: type, title: title, description: description}
        }
    },
    getters: {
        modalValue: state => type => {
            return state.modal[type]
        }
    }

})