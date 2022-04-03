<template>
  <div class="layer-manage-box">
    <!-- title -->
    <div class="layer-manage-title">
      <div class="layer-manage-item" @click="changeManageIndex(0)" :class="{'layer-manage-item-seleted':manageIndex == 0}"> 页面设置 </div>
      <div class="layer-manage-item" @click="changeManageIndex(1)" :class="{'layer-manage-item-seleted':manageIndex == 1}"> 图层管理 </div>
      <div class="layer-manage-item" @click="changeManageIndex(2)" :class="{'layer-manage-item-seleted':manageIndex == 2}"> 页面管理 </div>
    </div>
    <!--  -->
    <div class="layer-manage-content">
      <div class="page-set" v-show="manageIndex == 0">
        <div class="page-color">
          <div class="page-color-title">背景颜色</div>
          <div class="page-color-list">
            <div class="page-color-item" style="background-color:black;" @click="setCanvasBgColor('#000000')"></div>
            <div class="page-color-item" style="background-color:white;border:1px solid #eee;" @click="setCanvasBgColor('#ffffff')"></div>
            <div class="page-color-item" style="background-color:red;" @click="setCanvasBgColor('red')"></div>
            <div class="page-color-item" style="background-color:green;" @click="setCanvasBgColor('green')"></div>
            <div class="page-color-item" style="background-color:transparent;"></div>
            <div class="page-color-item" style="background-color:transparent;"></div>
            <div class="page-color-item" style="background-color:transparent;"></div>
            <div class="page-color-item" style="background-color:transparent;"></div>
            <div class="page-color-item" style="background-color:transparent;"></div>
            <div class="page-color-item" style="background-color:transparent;"></div>
            <div class="page-color-item" style="background-color:transparent;"></div>
            <div class="page-color-item" style="background-color:transparent;"></div>
            <div class="page-color-item" style="background-color:transparent;"></div>
            <div class="page-color-item" style="background-color:transparent;"></div>
          </div>
        </div>
      </div>
      <div class="layer-manage" v-show="manageIndex == 1">
        <div class="layer-list">
          <div class="layer-item" :class="{'layer-item-selected':item.isActive}" v-for="(item,index) in layerList" :key="index" @click="selectLayer(item)">
            <i class="iconfont" :class="item.layer.visible === false?'icon-bukejian':'icon-kejian'" @click.stop="switchLayerVisible(item)"></i>
            <i class="iconfont" :class="item.layer.selectable === false?'icon-jiesuo':'icon-suoding'" @click.stop="switchLayerSelectable(item)"></i>
            <div class="layer-text">新文本</div>
          </div>
        </div>
      </div>
      <!-- 页面管理 -->
      <div class="page-manage" v-show="manageIndex == 2">
        <div class="page-manage-btn-group">
          <div class="page-manage-btn-box" :class="{'page-manage-btn-box-selected': true}">
            <i class="iconfont icon-suolvetuqiehuan"></i>
            <div class="page-manage-btn-text">缩略图展示</div>
          </div>
          <div class="page-manage-btn-chanl"></div>
          <div class="page-manage-btn-box" onclick="alert('还未实现')">
            <i class="iconfont icon-31liebiao"></i>
            <div class="page-manage-btn-text">列表展示</div>
          </div>
        </div>
        <div class="abbreviate-page-list">
          <div class="abbreviate-page-item" :class="{'abbreviate-page-item-selected': index === canvasSelectedIndex}" v-for="(item, index) in canvasList" :key="item.id" @click="changeCanvasSelectedIndex(index)">
            <div class="abbreviate-page-index" :class="{'abbreviate-page-index-selected': index === canvasSelectedIndex}">{{index + 1}}</div>
            <img class="abbreviate-page-img" :src="item.canvasImg">
            <div class="abbreviate-page-btn">
              <div class="abbreviate-page-btn-item">
                <i class="iconfont icon-shanchu" :class="{'icon-shanchu-selected':index === canvasSelectedIndex }" @click.stop="deleteCanvasByIndex(index)"></i>
              </div>
            </div>
          </div>
          <div class="abbreviate-page-add-box">
            <div class="abbreviate-page-add-btn" @click="addNewCanvas"> ﹢ 添加页 </div>
          </div>
        </div>
      </div>
    </div>
    <div class="canvas-item-ele-manage">
      <div class="canvas-item-manage-title">
        <div class="canvas-item-manage-text">组件设置</div>
        <i class="iconfont icon-close2"></i>
      </div>
      <div class="canvas-item-tools">
        <div class="canvas-item-tool-box" :class="{'canvas-item-tool-box-selected':true}">样式</div>
        <div class="canvas-item-tool-box">动画</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, toRaw, watch, computed } from "vue";
export default {
  props: ["canvasList", "canvasSelectedIndex"],
  setup(props, context) {
    const { canvasList, canvasSelectedIndex } = props;
    const manageIndex = ref(1);

    const layerList = computed(() =>
      canvasList.length > 0 ? canvasList[canvasSelectedIndex].layerList : []
    );

    function changeManageIndex(index) {
      manageIndex.value = index;
    }
    // 添加页
    function addNewCanvas() {
      context.emit("addNewCanvas");
    }
    // 修改
    function changeCanvasSelectedIndex(index) {
      context.emit("changeCanvasSelectedIndex", index);
    }
    // 删除canvas
    function deleteCanvasByIndex(index) {
      context.emit("deleteCanvasByIndex", index);
    }
    function setCanvasBgColor(color) {
      context.emit("setCanvasBgColor", color);
    }
    // 选择图层
    function selectLayer(theLayer) {
      context.emit("selectLayer", theLayer.layer);
    }
    // 切换--是否可以被选中
    function switchLayerSelectable(theLayer) {
      // console.log(!!theLayer.layer.selectable);
      context.emit(
        "switchLayerSelectable",
        theLayer.layer,
        !theLayer.layer.selectable
      );
    }
    // 切换--是否可以被看见
    function switchLayerVisible(theLayer) {
      context.emit(
        "switchLayerVisible",
        theLayer.layer,
        !theLayer.layer.visible
      );
    }
    return {
      manageIndex,
      changeManageIndex,
      addNewCanvas,
      changeCanvasSelectedIndex,
      deleteCanvasByIndex,
      setCanvasBgColor,
      layerList,
      selectLayer,
      switchLayerSelectable,
      switchLayerVisible,
    };
  },
};
</script>

<style scoped>
.layer-manage-box {
  height: 100%;
  width: 260px;
  background-color: white;
  border-left: 1px solid #ccd5db66;
  box-sizing: content-box;
  display: flex;
  flex-direction: column;
  position: relative;
}
.layer-manage-title {
  height: 40px;
  display: flex;
}

.layer-manage-item {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f1f5f9;
  font-size: 14px;
  color: #333;
}

.layer-manage-item-seleted {
  background-color: white;
  font-weight: 500;
}
.layer-manage-content {
  overflow: auto;
  flex: 1;
}
.page-color {
  padding: 10px;
  padding-top: 20px;
}
.page-color-title {
  font-size: 14px;
  line-height: 28px;
}
.page-color-list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.page-color-item {
  width: 24px;
  height: 24px;
  margin: 0 5px 8px;
  /* margin-top: 8px; */
  background-color: black;
  border-radius: 4px;
  box-sizing: border-box;
}

.layer-item {
  display: flex;
  height: 36px;
  align-items: center;
  box-sizing: border-box;
  border-bottom: 1px solid #ccd5db;
}
.icon-kejian,
.icon-bukejian {
  font-size: 16px;
  margin-left: 5px;
  padding: 5px;
}
.icon-suoding,
.icon-jiesuo {
  font-size: 16px;
  padding: 5px;
  margin-right: 20px;
}
.layer-text {
  font-size: 12px;
  color: #555;
}
.layer-item:hover .icon-kejian,
.layer-item:hover .icon-bukejian,
.layer-item:hover .icon-suoding,
.layer-item:hover .icon-jiesuo,
.layer-item:hover .layer-text {
  color: #1261ff;
}
.layer-item-selected .icon-kejian,
.layer-item-selected .icon-bukejian,
.layer-item-selected .icon-suoding,
.layer-item-selected .icon-jiesuo,
.layer-item-selected .layer-text {
  color: #1261ff;
}
.page-manage-btn-group {
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.page-manage-btn-box {
  display: flex;
  align-items: center;
}

.page-manage-btn-text {
  font-size: 14px;
  font-weight: 500;
  margin-left: 4px;
}
.page-manage-btn-chanl {
  margin: 0 12px;
  width: 1px;
  height: 16px;
  background: #ccd5db;
}
.page-manage-btn-box-selected i,
.page-manage-btn-box-selected .page-manage-btn-text {
  color: #1261ff;
}
.abbreviate-page-list {
  position: relative;
}
.abbreviate-page-item {
  height: 187px;
  border-bottom: 1px solid #eef2f8;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.abbreviate-page-item:hover {
  background-color: #f5f8fb;
}
.abbreviate-page-item:hover .abbreviate-page-index {
  background-color: #1261ff;
  color: white;
}
.abbreviate-page-item:hover .icon-shanchu {
  display: inline-block;
}
.abbreviate-page-item-selected {
  background-color: #f5f8fb;
}
.icon-shanchu {
  display: none;
}
.icon-shanchu-selected {
  display: inline-block;
}
.abbreviate-page-index {
  width: 24px;
  height: 24px;
  background-color: #ccc;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 14px;
}
.abbreviate-page-index-selected {
  background-color: #1261ff;
  color: white;
}
.abbreviate-page-img {
  width: 82px;
  height: 140px;
  background-color: white;
  border: none;
  display: inline-block;
}
.abbreviate-page-btn {
  width: 24px;
}
.abbreviate-page-btn-item {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}
.abbreviate-page-add-box {
  position: sticky;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
}
.abbreviate-page-add-btn {
  width: 80%;
  height: 36px;
  border-radius: 4px;
  background-color: #1261ff;
  color: white;
  line-height: 36px;
  text-align: center;
  vertical-align: top;
}
.canvas-item-ele-manage {
  width: 260px;
  height: 100%;
  position: absolute;
  background-color: #fff;
  top: 0;
  left: -1px;
  transform: translateX(-100%);
}
.canvas-item-manage-title {
  display: flex;
  padding: 20px;
  justify-content: space-between;
  align-items: center;
}
.canvas-item-manage-text {
  font-size: 14px;
  color: #333;
}
.canvas-item-tools {
  display: flex;
}
.canvas-item-tool-box {
  font-size: 14px;
  flex: 1;
  text-align: center;
  line-height: 30px;
  color: #333;
  border-bottom: 2px solid #ccd5db;
  font-weight: 500;
}
.canvas-item-tool-box-selected {
  color: #1261ff;
  border-bottom: 2px solid #1261ff;
}
</style>