<template>
  <div>
    <div class="header-box">
      <div class="title"></div>
      <div class="edit-tools">
        <div class="tool-item" @click="addText">
          <i class="iconfont icon-wenzi"></i>
          <div class="tool-text">文本</div>
        </div>
        <div class="tool-item">
          <i class="iconfont icon-tupian1"></i>
          <div class="tool-text">图片</div>
        </div>
      </div>
      <div class="share-box">分享</div>
    </div>
  </div>
</template>

<script>
export default {
  setup(props, context) {
    function addText() {
      context.emit("addText");
    }
    return {
      addText,
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
.share-box {
  font-size: 14px;
  color: #888ce5;
  height: 100%;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.share-box:hover {
  color: #1261ff;
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