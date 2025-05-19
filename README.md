# Building a Custom Thumb Image Component with Vue.js and Pinia

A comprehensive guide to creating an interactive thumb image component with hover effects, click functionality, and modal display using Vue.js and Pinia for state management.


<p align="center"><br><br>
<img src="https://miro.medium.com/v2/resize:fit:700/1*iN_0nNovYQSN1j4BPWAwng.png" alt="Intro" /><br><br>
</p>

More information at - 
https://medium.com/@murilolivorato/build-a-custom-thumb-image-with-hover-effect-click-and-open-a-modal-with-vue-js-and-pinia-store-9b18574011c8

## Overview

This project demonstrates how to build:
- A reusable thumb image component
- Hover effects and animations
- Modal display functionality
- State management with Pinia
- Image gallery management

## Features

- Interactive thumb image display
- Hover effects and animations
- Modal image preview
- Pinia state management
- Responsive design
- Image gallery management
- Customizable styling
- Lazy loading support

## Prerequisites

- Node.js (v14 or higher)
- Vue.js 3.x
- Pinia
- npm or yarn
- Basic understanding of Vue.js components
- Basic knowledge of CSS animations

## Installation

1. Create a new Vue project:
```bash
npm create vue@latest
```

2. Navigate to project directory:
```bash
cd your-project-name
```

3. Install dependencies:
```bash
# Install Pinia
npm install pinia

# Install additional dependencies
npm install @vueuse/core
npm install sass -D
```

## Project Structure
```bash
src/
├── components/
│ ├── ThumbImage/
│ │ ├── ThumbImage.vue
│ │ └── ImageModal.vue
│ └── examples/
│ └── ImageGallery.vue
├── stores/
│ └── imageStore.js
├── assets/
│ └── styles/
│ └── thumb-image.scss
└── App.vue
```



## Implementation

### 1. Pinia Store
```javascript
// src/stores/imageStore.js
import { defineStore } from 'pinia'

export const useImageStore = defineStore('image', {
  state: () => ({
    selectedImage: null,
    isModalOpen: false,
    images: []
  }),
  
  actions: {
    setSelectedImage(image) {
      this.selectedImage = image
      this.isModalOpen = true
    },
    
    closeModal() {
      this.isModalOpen = false
      this.selectedImage = null
    },
    
    setImages(images) {
      this.images = images
    }
  }
})
```

### 2. Thumb Image Component
```vue
<!-- src/components/ThumbImage/ThumbImage.vue -->
<template>
  <div 
    class="thumb-image"
    @click="handleClick"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <img 
      :src="image.src" 
      :alt="image.alt"
      :class="{ 'hover-effect': isHovered }"
      loading="lazy"
    />
    <div class="overlay" :class="{ 'show': isHovered }">
      <span class="title">{{ image.title }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useImageStore } from '@/stores/imageStore'

const props = defineProps({
  image: {
    type: Object,
    required: true
  }
})

const store = useImageStore()
const isHovered = ref(false)

const handleClick = () => {
  store.setSelectedImage(props.image)
}
</script>

<style lang="scss" scoped>
.thumb-image {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  cursor: pointer;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
    
    &.hover-effect {
      transform: scale(1.1);
    }
  }
  
  .overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.7);
    padding: 1rem;
    transform: translateY(100%);
    transition: transform 0.3s ease;
    
    &.show {
      transform: translateY(0);
    }
    
    .title {
      color: white;
      font-size: 1rem;
    }
  }
}
</style>
```

### 3. Image Modal Component
```vue
<!-- src/components/ThumbImage/ImageModal.vue -->
<template>
  <Transition name="modal">
    <div v-if="store.isModalOpen" class="modal-overlay" @click="store.closeModal">
      <div class="modal-content" @click.stop>
        <button class="close-button" @click="store.closeModal">&times;</button>
        <img 
          v-if="store.selectedImage" 
          :src="store.selectedImage.src" 
          :alt="store.selectedImage.alt"
        />
        <div class="modal-info">
          <h2>{{ store.selectedImage?.title }}</h2>
          <p>{{ store.selectedImage?.description }}</p>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { useImageStore } from '@/stores/imageStore'

const store = useImageStore()
</script>

<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  position: relative;
  max-width: 90%;
  max-height: 90vh;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  
  img {
    max-width: 100%;
    max-height: 70vh;
    object-fit: contain;
  }
}

.close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 2rem;
  color: white;
  cursor: pointer;
  z-index: 1;
}

.modal-info {
  padding: 1rem;
  
  h2 {
    margin: 0 0 0.5rem;
  }
}

// Transition animations
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
```

## Usage

### Basic Implementation
```vue
<!-- src/components/examples/ImageGallery.vue -->
<template>
  <div class="image-gallery">
    <div class="grid">
      <ThumbImage
        v-for="image in store.images"
        :key="image.id"
        :image="image"
      />
    </div>
    <ImageModal />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useImageStore } from '@/stores/imageStore'
import ThumbImage from '../ThumbImage/ThumbImage.vue'
import ImageModal from '../ThumbImage/ImageModal.vue'

const store = useImageStore()

onMounted(() => {
  // Load images
  store.setImages([
    {
      id: 1,
      src: '/images/image1.jpg',
      alt: 'Image 1',
      title: 'Beautiful Landscape',
      description: 'A stunning landscape photograph'
    },
    // Add more images...
  ])
})
</script>

<style lang="scss" scoped>
.image-gallery {
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
    padding: 1rem;
  }
}
</style>
```

## Customization

### Props

#### ThumbImage Component Props
- `image`: Object (required)
  - `src`: String - Image source URL
  - `alt`: String - Image alt text
  - `title`: String - Image title
  - `description`: String - Image description

### Styling
The components can be customized using SCSS variables:

```scss
// src/assets/styles/_variables.scss
$thumb-image-radius: 8px;
$thumb-image-overlay-bg: rgba(0, 0, 0, 0.7);
$modal-overlay-bg: rgba(0, 0, 0, 0.8);
$transition-duration: 0.3s;
```

## Best Practices

1. **Performance**
   - Use lazy loading for images
   - Implement proper image optimization
   - Use appropriate image formats
   - Implement proper caching

2. **Accessibility**
   - Provide proper alt text
   - Implement keyboard navigation
   - Use ARIA attributes
   - Ensure proper contrast

3. **User Experience**
   - Implement smooth transitions
   - Provide loading states
   - Handle error states
   - Implement responsive design


## 👥 Author

For questions, suggestions, or collaboration:
- **Author**: Murilo Livorato
- **GitHub**: [murilolivorato](https://github.com/murilolivorato)
- **linkedIn**: https://www.linkedin.com/in/murilo-livorato-80985a4a/


## 📸 Screenshots

### Login Page
![Login Page](https://miro.medium.com/v2/resize:fit:317/1*FxIWAxuxZxqhNttfhMaIEQ.png)

### Dashboard
![Dashboard](https://miro.medium.com/v2/resize:fit:700/1*McIM4GqXnaOUzF0KJXyKDA.png)

<div align="center">
  <h3>⭐ Star This Repository ⭐</h3>
  <p>Your support helps us improve and maintain this project!</p>
  <a href="https://github.com/murilolivorato/vue_img_thumb/stargazers">
    <img src="https://img.shields.io/github/stars/murilolivorato/vue_img_thumb?style=social" alt="GitHub Stars">
  </a>
</div>
