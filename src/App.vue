<template>
  <modal-image  v-if="mainStore.modalValue('image')"></modal-image>
  <div class="container">
    <img-thumb imageurl="/images/img1.jpg"
               title="image title"
               :makethumbextension="false"
               :size-area="{width:'160', height: '160'}"
               @openimage="openImage" ></img-thumb>
  </div>
</template>
<script setup>
import { nextTick } from 'vue'

import {useMainStore} from '@/stores/main'
const mainStore = useMainStore()
import ImgThumb from '@/components/ImgThumb.vue'
import ModalImage from '@/components/ModalImage.vue'

const openImage = async (data) => {
  mainStore.setImage({image: data.image, title: data.title})
  await nextTick()
  mainStore.openModal('image')
}
</script>


<style scoped>
div.container {
  padding-top: 400px;
  width: 100%;
}
</style>
