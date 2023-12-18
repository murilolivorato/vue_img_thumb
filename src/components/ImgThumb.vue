<template>
      <a @click.prevent="openImage()"  :class="style_thumb"   @mouseover="setMagTrue()" @mouseleave="setMagFalse()" >
         <font-awesome-icon icon="search"  :class="mag_style"  />
         <div :class="div_mag_style"></div>
          <div class="image_link" v-bind:style="{width: sizeArea.width + 'px' , height: sizeArea.height + 'px' }" >
              <transition name="fade">
                  <img :src="smallImage" :class="imgclass"  />
               </transition>
          </div>
       </a>
</template>
<script setup>
import {computed, ref} from 'vue'
const emit = defineEmits(['openimage'])
const props = defineProps({
  imageurl: { type: String },
  stylelist: { type: String, default: 'imgthumb' },
  makethumbextension: { type: Boolean, default: true },
  sizeArea: { type: Object },
  data: { type: Object  },
  title: { type: String, default: null },
  index: { type: Number },
  imgclass: { type: String, default: 'horizontal' }
})

const showMag = ref(false)


const setMagTrue = () => {
  showMag.value = true
}

const setMagFalse = () => {
  showMag.value = false
}

const openImage = () => {
  emit('openimage', { image: props.imageurl, title: props.title})
}

const smallImage = computed(() => {
  if (props.makethumbextension) {
    if (props.imageurl) {
      const splitImage = props.imageurl.split('.')
      return splitImage[0] + '_thumb.' + splitImage[1]
    }
  }

  return props.imageurl
})


const style_thumb = computed(() => {
  return 'thumb box_img_thumb ' + props.stylelist
})

const div_mag_style = computed(() => {
  return showMag.value === true ? 'white_bg is_over' : 'white_bg'
})

const mag_style = computed(() => {
  return showMag.value === true ? 'mag_icon is_over' : 'mag_icon'
})
</script>

<style scoped>
  .box_img_thumb {
    position: relative;
    overflow: hidden;
  }

  .box_img_thumb img {
    position: absolute;
    left: 0;
    top: 0;

  }
  a.imgthumb {
      padding:4px;
      border:#c9c9c9 1px solid;
      -webkit-border-radius:4px;
      -moz-border-radius:4px;
      border-radius:4px;
      float:left;
      display: flex;
      align-items: center;
      justify-content: center;

  }
 div.image_link  {
    position: relative;
    overflow: hidden;
    background:#FFF;
    display: inline-block;
  }

  img.horizontal {
    height: 100%;
    width:  auto;
  }

  img.vertical {
    height: auto;
    width:  100%;
  }

  .mag_icon{
    font-size:33px;
    position:absolute;
    z-index: 20;
    color:#FFF;
    margin:0px auto;
    opacity: 0.0;

    -webkit-transition: all 200ms ease-in-out;
    -moz-transition: all 200ms ease-in-out;
    -ms-transition: all 200ms ease-in-out;
    -o-transition: all 200ms ease-in-out;
    transition: all 200ms ease-in-out;
    z-index:3;
  }
  .mag_icon.is_over{
    opacity: 1.0 !important;
  }

  /* MAG */
  div.white_bg {
    width: 100%;
    height: 100%;
    background:#FFF;
    opacity: 0.0;
    z-index:2;
    position:absolute;

  }
  div.white_bg.is_over {
    opacity: 0.3 !important;
  }
  .thumb {
    border:1px solid;
    margin:0px !important;
  }
</style>
