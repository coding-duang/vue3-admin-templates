import { defineComponent } from 'vue'
import { NCarousel, NCarouselItem } from 'naive-ui'

export const Rotation = defineComponent({
  name: 'Rotation',
  setup() {
    return () => <NCarousel
      draggable
      autoplay
      interval={ 2000 }
      style="height: 200px; margin: 20px 0;"
    >
      <NCarouselItem>
        <img
          class="carousel-img"
          src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg"
        />
      </NCarouselItem>
      <NCarouselItem>
        <img
          class="carousel-img"
          src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg"
        />
      </NCarouselItem>
      <NCarouselItem>
        <img
          class="carousel-img"
          src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg"
        />
      </NCarouselItem>
    </NCarousel>
  }
})
