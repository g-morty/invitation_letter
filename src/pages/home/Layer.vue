<template>
  <div class="layer-box" :class="{'show-layer-box':isShowLayerList, 'hide-layer-box': !isShowLayerList }">
    <div class="layer-title" :class="{'show-layer-title':isShowLayerList, 'hide-layer-title': !isShowLayerList }" @click="isShowLayerList=!isShowLayerList">图层</div>
    <div class="layer-list">
      <div class="layer-item" :class="{'layer-item-active': item.isActive}" v-for="(item,index) in layerList" :key="index" @click="selectLayer(item)">图层{{ index + 1 }}</div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  props: ["layerList"],
  setup(props, context) {
    // 是否显示图层
    let isShowLayerList = ref(true);
    // 选择图层
    function selectLayer(theLayer) {
      context.emit("selectLayer", theLayer.layer);
    }
    return {
      isShowLayerList,
      selectLayer,
    };
  },
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
  /* border: 1rpx solid red; */
  padding-top: 30px;
}
.show-layer-box {
  height: auto;
}
.hide-layer-box {
  width: 100px;
  height: 30px;
  overflow: hidden;
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
  user-select: none;
}
.show-layer-title::after {
  content: "》";
  position: absolute;
  top: 50%;
  right: 30px;
  transform: translateY(-48%);
  font-size: 12px;
  color: #746c73;
}

.hide-layer-title::after {
  content: "《";
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-47%);
  font-size: 12px;
  color: #746c73;
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
.layer-item-active {
  background-color: #c2eeed33;
  color: #44b0b4;
}
.layer-item:hover {
  background-color: #afe8ea;
}
</style>