<template>
  <BlockUI :blocked="isShowImgMask" :fullScreen="true" :autoZIndex="false" :baseZIndex="90">
    <div class="img-list-box" v-show="isShowImgMask">
      <div class="img-list-left">
        <div class="img-list-title">图片库</div>
        <div class="img-list-btn-group">
          <div class="img-list-tool-btn">
            系统图片
          </div>
        </div>

        <div class="up-local-img">
          <FileUpload mode="basic" auto accept="image/*" :customUpload="true" @uploader="chooseImage" chooseLabel="选择图片" />
        </div>
      </div>
      <div class="img-list-right">
        <div class="img-type-list">
          <i class="iconfont icon-close2" @click="hideImgMask"></i>
        </div>
        <div class="image-list">
          <div class="image-item" v-for="(item) in imgList" :key="item" @click="addImg(item)">
            <img :src="item" alt="">
          </div>
        </div>
      </div>
    </div>
  </BlockUI>
</template>

<script>
import { reactive, getCurrentInstance } from "vue";
export default {
  props: ["isShowImgMask"],
  setup(props, context) {
    // 获取全局属性
    const { proxy } = getCurrentInstance();
    // 获取画布插件
    const { $axios } = proxy;
    const temPath = "@/assets/images/aoteman/";
    const imgList = reactive([
      // require("@/assets/images/image1.webp"),
      // require("@/assets/images/image2.webp"),
      // require("@/assets/images/image3.webp"),
      // require("@/assets/images/image4.webp"),
    ]);
    const files = require.context("@/assets/images/aoteman/", false, /\s*/);
    files.keys().forEach((path) => {
      imgList.push(require("@/assets/images/aoteman/" + path.substring(2)));
    });

    function addImg(imgUrl) {
      context.emit("addImg", imgUrl);
    }
    function hideImgMask() {
      context.emit("hideImgMask");
    }
    // 选择图片
    async function chooseImage(e) {
      // 定义表单数据
      const formData = new FormData();
      // 添加表单数据
      formData.append("image", e.files[0]);

      const chooseImageRes = await $axios.post("/api/upload_img", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(chooseImageRes);
      if (chooseImageRes.status === 200) {
        addImg(chooseImageRes.data);
      } else {
        alert("上传失败，请重试");
      }
      // imgList.push(e.files[0].objectURL)
      // // imgList.push(require(e.files[0].objectURL))
      // console.log("234345345");
      // addImg(e.files[0].objectURL);
    }
    return {
      imgList,
      addImg,
      hideImgMask,
      chooseImage,
    };
  },
};
</script>

<style scoped>
.img-list-box {
  width: 960px;
  height: 600px;
  background-color: white;
  position: fixed;
  z-index: 91;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  border-radius: 8px;
}
.img-list-left {
  width: 175px;
  height: 100%;
  position: relative;
  border-right: 1px solid #e6ebed;
}
.img-list-title {
  height: 80px;
  padding: 0 20px;
  line-height: 80px;
  font-size: 18px;
  font-weight: 600;
}
.img-list-tool-btn {
  margin: 0 8px;
  font-size: 13px;
  height: 36px;
  background-color: #1261ff;
  border-radius: 6px;
  padding: 0 12px;
  line-height: 36px;
  color: white;
}
.up-local-img {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #1261ff;
  color: white;
  width: 120px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  border-radius: 8px;
  /* overflow: hidden; */
}

::v-global(.up-local-img .p-button) {
  padding: 0 !important;
  height: 100% !important;
  background-color: transparent !important;
  border: none !important;
  width: 100%;
}
::v-global(.up-local-img .p-button-label) {
  font-size: 12px;
}
::v-global(.up-local-img .p-button-icon) {
  display: none;
}
.img-list-right {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.img-type-list {
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #e6ebed;
  position: relative;
}
.img-type-list i {
  position: absolute;
  width: 60px;
  height: 60px;
  right: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
}
.image-list {
  padding: 30px 0px 0 16px;
  overflow-y: auto;
  flex: 1;
}
.image-item {
  float: left;
  width: 136px;
  height: 136px;
  background-color: #f5f7fb;
  margin: 0 7px 14px;
  border-radius: 4px;
  overflow: hidden;
}
.image-item img {
  width: 100%;
  height: 100%;
}
</style>