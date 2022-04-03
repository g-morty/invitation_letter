<template>
  <div class="image-list-box">
      <div class="img-bgcolr" @click="chooseImg('images/image1.webp')">
        <img class="img-item" :src="require('@/assets/images/image1.webp')" alt="">
      </div>
      <div class="img-bgcolr" @click="chooseImg('images/image2.webp')">
        <img class="img-item" :src="require('@/assets/images/image2.webp')" alt="">
      </div>
      <div class="img-bgcolr" @click="chooseImg('images/image3.webp')">
        <img class="img-item" :src="require('@/assets/images/image3.webp')" alt="">
      </div>
      <div class="img-bgcolr" @click="chooseImg('images/image4.webp')">
        <img class="img-item" :src="require('@/assets/images/image4.webp')" alt="">
      </div>
  </div>
</template>

<script>
export default {
  setup(props, context) {
    function chooseImg(imgInfo) {
      context.emit('chooseImg',imgInfo)
      
    }
    return {
      chooseImg,
    };
  },
};
</script>

<style scoped>
.image-list-box {
  position: absolute;
  top: 0;
  left: 0;
  height: 1000px;
  width: 300px;
  background-color: white;
  overflow: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  /* align-items: flex-start; */
  align-content: flex-start;
}
.img-bgcolr {
  width: 120px;
  height: 120px;
  background-color: #f8fbf9;
  margin-top: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.img-item {
  width: 80%;
  border-radius: 8px;
}
</style>