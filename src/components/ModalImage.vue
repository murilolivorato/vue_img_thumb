<template>
  <transition name="modal">
    <div class="modal-mask image-modal">
      <div class="modal-wrapper">
        <div id="modal-image-container" class="modal-container horizontal">
          <a class="close-modal" @click="mainStore.closeModal('image')" ></a>
          <div class="modal-body" id="modal-image-body">
            <div class="image-description" v-if="mainStore.selectedImage.title || mainStore.selectedImage.description">
              <div class="box-description">
                  <h2 v-if="mainStore.selectedImage.title">{{ mainStore.selectedImage.title }}</h2>
                  <p v-if="mainStore.selectedImage.description">{{ mainStore.selectedImage.description }}</p>
              </div>
            </div>
            <img :src="imgSize" />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script setup>
import { computed } from 'vue'

import {useMainStore} from '@/stores/main'
const mainStore = useMainStore()

const imgSize = computed(() => {
  const image = new Image()
  image.onload = function () {
    const width = image.width
    const height = image.height
    const addClassName = width > height ? 'horizontal' : 'vertical'

    document.getElementById('modal-image-container').classList.add(addClassName)
    document.getElementById('modal-image-body').appendChild(image)
  }
  return mainStore.selectedImage.image
})
</script>
<style scoped>

@import url("../assets/css/modal.css");
</style>
