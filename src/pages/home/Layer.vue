<template>
  <div class="layer-box">
    <div class="layer-title">图层</div>
    <div class="layer-list">
      <div class="layer-item" v-for="(item,index) in layerList" :key="index">图层{{ index + 1 }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["layerList"],
  setup(props) {},
};
</script>

<style scoped>
.layer-box {
  width: 300px;
  background-color: white;
  position: absolute;
  left: 0;
  top: 0;
  transform: translateX(-100%);
  border: 1rpx solid red;
  padding-top: 30px;
}
.layer-title {
  text-align: center;
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  border-bottom: 1px solid #f5f5f5;
}
.layer-list {
  max-height: 970px;
  overflow: auto;
}
.layer-item {
  height: 30px;
  background-color: #c2eeed22;
  display: flex;
  align-items: center;
  padding-left: 10px;
  border-bottom: 1px solid #f5f5f5;
}
.layer-item:hover {
  background-color: #afe8ea;
}
</style>