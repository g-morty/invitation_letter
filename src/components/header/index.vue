<template>
  <div>
    <div class="header-box">
      <div class="title"></div>
      <div class="edit-tools">
        <div class="tool-item" @click="addText">
          <i class="iconfont icon-wenzi"></i>
          <div class="tool-text">文本</div>
        </div>
        <div class="tool-item" @click="showImgMask">
          <i class="iconfont icon-tupian1"></i>
          <div class="tool-text">图片</div>
        </div>
        <div class="tool-item" @click="showAudioMask">
          <i class="iconfont icon-yinleyinpin"></i>
          <div class="tool-text">音乐</div>
        </div>
      </div>
      <div class="header-btn-group">
        <div class="save-box" @click="goInvitationLetter">预览</div>
        <div class="save-box" @click="saveAllCanvas">保存</div>
        <div class="share-box">分享</div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  setup(props, context) {
    const $router = useRouter();

    function addText() {
      context.emit("addText");
    }
    function showImgMask() {
      context.emit("showImgMask");
    }
    function showAudioMask() {
      context.emit("showAudioMask");
    }
    function saveAllCanvas() {
      context.emit("saveAllCanvas");
    }
    function goInvitationLetter() {
      $router.push({ path: "/invitation_letter" });
    }
    return {
      addText,
      showImgMask,
      saveAllCanvas,
      goInvitationLetter,
      showAudioMask
    };
  },
};
</script>

<style scoped>
.header-box {
  height: 56px;
  background-color: white;
  border-bottom: 1px solid #f9f9fb;
  box-shadow: 0 1px 10px 2px #f9f9fb;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.header-btn-group {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.save-box {
  width: 38px;
  height: 30px;
  border: 1px solid #ccd5db;
  font-size: 12px;
  line-height: 28px;
  text-align: center;
  border-radius: 4px;
  background-color: #fff;
  box-sizing: border-box;
}
.save-box:hover {
  background-color: #1261ff;
  color: #fff;
}
.share-box {
  width: 38px;
  height: 30px;
  font-size: 12px;
  line-height: 30px;
  text-align: center;
  border-radius: 4px;
  background-color: #1261ff;
  color: #fff;
  margin: 0 30px 0 14px;
}
.share-box:hover {
  background-color: #1261ffcc;
}
.edit-tools {
  display: flex;
  height: 100%;
}
.tool-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 100%;
}

.tool-item i {
  font-size: 18px;
  color: #333;
}

.tool-text {
  color: #333;
  font-size: 12px;
  margin-top: 4px;
}
.tool-item:hover {
  background-color: #1261ff;
}
.tool-item:hover i,
.tool-item:hover .tool-text {
  color: white;
}
</style>