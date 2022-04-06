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
    <div class="canvas-item-ele-manage" v-if="showCanvasTools.isShow">
      <div class="canvas-item-manage-title">
        <div class="canvas-item-manage-text">组件设置</div>
        <i class="iconfont icon-close2" @click="hideCanvasTools"></i>
      </div>
      <div class="canvas-item-tools">
        <div class="canvas-item-tool-box" :class="{'canvas-item-tool-box-selected':elementToolsData.elementIndex === 0}" @click="changeElementIndex(0)">样式</div>
        <div class="canvas-item-tool-box" :class="{'canvas-item-tool-box-selected':elementToolsData.elementIndex === 1}" @click="changeElementIndex(1)">动画</div>
      </div>
      <!-- 文字、图片 -->
      <div v-show="elementToolsData.elementIndex === 0">
        <template v-if="showCanvasTools.content[0].layer.type === 'i-text'">
          <!-- 文本 -->
          <div class="canvas-text-tools">
            <div class="canvas-text-tool-title">
              字体
            </div>
            <Dropdown class="font-family" v-model="fontData.selectedCity" :options="fontData.fontFamily" optionLabel="showText" :placeholder="showCanvasTools.content[0].layer.fontFamily" @change="changeFontFamily($event,showCanvasTools.content[0].layer)" />
          </div>
          <!-- 字号 -->
          <div class="text-font-size">
            <div class="font-size-text">字号</div>
            <div class="font-size-tools">
              <Dropdown class="font-size-choose" v-model.number="fontData.selectedFontSize" :options="fontData.fontSize" optionLabel="showText" :placeholder="showCanvasTools.content[0].layer.fontSize + 'px'" @change="changeFontSize($event,showCanvasTools.content[0].layer)" />
              <div class="font-size-tool-item">
                <i class="iconfont icon-24gl-fontSizeIncrease" @click="fontSizeIncrementReduction(showCanvasTools.content[0].layer,'Increment')"></i>
                <i class="iconfont icon-24gl-fontSizeDecrease" @click="fontSizeIncrementReduction(showCanvasTools.content[0].layer,'Reduction')"></i>
              </div>
            </div>
          </div>
          <!-- 字体颜色 -->
          <div class="text-color">
            <div class="text-color-text">文本颜色</div>
            <div class="text-color-picker">
              <ColorPicker class="color-picker" defaultColor="#333" v-model="fontData.color" @change="changeFontColor($event,showCanvasTools.content[0].layer)" />
              <i class="iconfont icon-huihua"></i>
            </div>
          </div>
        </template>

        <template v-if="showCanvasTools.content[0].layer.type === 'image'">
          <div class="image-tool-filter">
            <div class="image-tool-filter-text">滤镜</div>
            <div class="image-tool-filter-list">
              <div class="image-tool-filter-item" :class="{'image-tool-filter-item-selected': index === showCanvasTools.imgFilterList.index}" v-for="(item, index) in showCanvasTools.imgFilterList.content" :key="index" @click="addFilterToCanvas(index)">
                <img class="filter-item-img" :src="item.fliterImg" alt="">
                <div class="fliter-item-text">{{item.fliterType}}</div>
              </div>
            </div>
          </div>
        </template>
      </div>
      <!-- 动画 -->
      <div v-show="elementToolsData.elementIndex === 1">
        动画
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, toRaw, watch, computed, reactive } from "vue";
export default {
  props: ["canvasList", "canvasSelectedIndex"],
  setup(props, context) {
    // 画布操作台下标下标
    const manageIndex = ref(1);
    // 文本
    const fontData = reactive({
      selectedCity: "Times New Roman",
      fontFamily: [
        { showText: "Times New Roma", value: "Times New Roman" },
        { showText: "Comic Sans", value: "Comic Sans" },
      ],
      selectedFontSize: 16,
      fontSize: [
        { showText: "12px", value: 12 },
        { showText: "13px", value: 13 },
        { showText: "14px", value: 14 },
        { showText: "15px", value: 15 },
        { showText: "16px", value: 16 },
        { showText: "17px", value: 17 },
        { showText: "18px", value: 18 },
        { showText: "19px", value: 19 },
        { showText: "20px", value: 20 },
      ],
      color: "",
    });
    // 元素操作台数据
    const elementToolsData = reactive({
      elementIndex: 0,
    });
    const layerList = computed(() =>
      props.canvasList.length > 0
        ? props.canvasList[props.canvasSelectedIndex].layerList
        : []
    );
    // 滤镜种类
    const imgFilterList = reactive({
      content: [
        // {
        //   fliterType: filterType,
        //   fliterImg: img.toDataURL(),
        //   filterFun: imgFilter,
        // },
      ],
      index: 0,
    });
    // 是否显示元素操作台
    const showCanvasTools = computed({
      get() {
        if (props.canvasList.length <= 0) {
          return {
            isShow: false,
            content: {},
          };
        }
        const seletedEle = props.canvasList[
          props.canvasSelectedIndex
        ].layerList.filter((item) => {
          return item.isActive;
        });
        if (seletedEle.length === 1) {
          // console.log(seletedEle);
          if (seletedEle[0].layer.type === "image") {
            // 初始化滤镜
            imgFilterList.content = [];
            imgFilterList.index = 0;
            addFilterToImgList(
              imgFilterList.content,
              seletedEle[0].layer,
              "原色",
              new fabric.Image.filters.BaseFilter()
            );
            addFilterToImgList(
              imgFilterList.content,
              seletedEle[0].layer,
              "夕阳",
              new fabric.Image.filters.Sepia()
            );
            addFilterToImgList(
              imgFilterList.content,
              seletedEle[0].layer,
              "黑白",
              new fabric.Image.filters.BlackWhite()
            );
            addFilterToImgList(
              imgFilterList.content,
              seletedEle[0].layer,
              "黄昏",
              new fabric.Image.filters.Vintage()
            );
            seletedEle[0].layer.filters.length = 0;
            seletedEle[0].layer.applyFilters();
            return {
              isShow: true,
              content: seletedEle,
              imgFilterList,
            };
          }
          return {
            isShow: true,
            content: seletedEle,
          };
        } else {
          return {
            isShow: false,
            content: {},
          };
        }
      },
    });
    // 增加滤镜种类
    function addFilterToImgList(imgList, img, filterType, imgFilter) {
      img.filters.length = 0;
      img.filters.push(imgFilter);
      img.applyFilters();
      imgList.push({
        fliterType: filterType,
        fliterImg: img.toDataURL(),
        filterFun: imgFilter,
      });
    }
    // 将滤镜添加至画布
    function addFilterToCanvas(index) {
      // 更新当前滤镜下标
      imgFilterList.index = index;
      // 获取要更改的图片
      const theImg = showCanvasTools.value.content[0].layer;
      // 获取滤镜
      const filterFun =
        showCanvasTools.value.imgFilterList.content[index].filterFun;
      //清空以往滤镜
      theImg.filters.length = 0;
      // 将新滤镜加入至图片
      theImg.filters.push(filterFun);
      // 使滤镜生效
      theImg.applyFilters();
      // 更新画布
      const canvasContext =
        props.canvasList[props.canvasSelectedIndex].canvasContext;
      canvasContext.renderAll();
    }
    // 隐藏元素操作台
    function hideCanvasTools() {
      // 取消所有元素的选择
      const canvasContext =
        props.canvasList[props.canvasSelectedIndex].canvasContext;
      canvasContext.discardActiveObject();
      canvasContext.renderAll();

      //   console.log("234");
    }
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
    // 更换字体
    function changeFontFamily(event, element) {
      const canvasContext =
        props.canvasList[props.canvasSelectedIndex].canvasContext;
      const textEle = toRaw(element);

      textEle.set("fontFamily", event.value.value);
      canvasContext.renderAll();
    }
    // 更换字号
    function changeFontSize(event, element) {
      const canvasContext =
        props.canvasList[props.canvasSelectedIndex].canvasContext;

      element.set("fontSize", event.value.value);
      canvasContext.renderAll();
    }
    // 字号加一、减一
    function fontSizeIncrementReduction(element, type) {
      const canvasContext =
        props.canvasList[props.canvasSelectedIndex].canvasContext;

      if (type === "Increment") {
        if (element.fontSize < 20) {
          element.set("fontSize", element.fontSize + 1);
          canvasContext.renderAll();
        }
      }
      if (type === "Reduction") {
        if (element.fontSize > 12) {
          element.set("fontSize", element.fontSize - 1);
          canvasContext.renderAll();
        }
      }
    }
    // 更换文字颜色
    function changeFontColor(event, element) {
      const canvasContext =
        props.canvasList[props.canvasSelectedIndex].canvasContext;

      element.set("fill", "#" + event.value);
      canvasContext.renderAll();
    }
    function changeElementIndex(index) {
      elementToolsData.elementIndex = index;
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
      showCanvasTools,
      hideCanvasTools,
      fontData,
      changeFontFamily,
      changeFontSize,
      fontSizeIncrementReduction,
      changeFontColor,
      elementToolsData,
      changeElementIndex,
      addFilterToCanvas,
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
.canvas-item-tool-box:hover {
  color: #1261ff;
  border-bottom: 2px solid #1261ff;
}
.canvas-item-tool-box-selected {
  color: #1261ff;
  border-bottom: 2px solid #1261ff;
}

.canvas-text-tools {
  padding: 0 12px;
}
.canvas-text-tool-title {
  height: 50px;
  line-height: 50px;
  font-size: 14px;
}
.font-family {
  width: 100%;
  height: 34px;
  display: flex;
  align-items: center;
}
::v-global(.p-dropdown-item) {
  font-size: 14px !important ;
  padding: 4px 10px !important;
}
.text-font-size,
.text-color {
  display: flex;
  margin-top: 20px;
  justify-content: space-between;
  padding: 0 12px;
  align-items: center;
}
.font-size-text {
  font-size: 14px;
}
.font-size-tools {
  width: 160px;
  display: flex;
  justify-content: space-between;
}
.font-size-choose {
  /* flex: 3; */
  width: 80px;
  height: 34px;
  align-items: center;
  /* overflow: hiden; */
}
/* .font-size-tool-item {
  flex: 1;
} */
::v-global(.font-size-choose .p-dropdown-trigger) {
  width: 12px !important;
  font-size: 10px !important;
  padding: 0 4px !important;
}
::v-global(.font-size-choose .p-dropdown-trigger span) {
  font-size: 10px;
  margin-right: 10px;
}
.font-size-tool-item {
  display: flex;
}
.font-size-tool-item i {
  width: 34px;
  height: 34px;
  /* background-color: red; */
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-weight: 700;
  font-size: 14px;
}
.text-color-picker {
  display: flex;
  align-items: center;
  height: 34px;
  /* border: 1px solid #ccc; */
  /* padding: 1px 0; */
  border-radius: 6px;
  overflow: hidden;
}
.color-picker {
  width: 80px;
  /* flex: 1; */
  margin: 0;
  padding: 0;
}
::v-global(.p-colorpicker-preview) {
  width: 100% !important;
  border-radius: 0 !important;
  border: none !important;
}
.icon-huihua {
  width: 34px;
  height: 32px;
  color: #999;
  font-size: 18px;
  text-align: center;
  line-height: 30px;
  background: #f5f7fb;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-left: none;
  border-radius: 0 4px 4px 0;
  box-sizing: border-box;
}
.image-tool-filter {
  padding: 0 12px;
}
.image-tool-filter-text {
  height: 50px;
  line-height: 50px;
  font-size: 14px;
}
.image-tool-filter-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.image-tool-filter-item {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
.filter-item-img {
  width: 51px;
  height: 51px;
  border-radius: 4px;
  overflow: hidden;
  box-sizing: border-box;
  border: 1px solid transparent;
}
.image-tool-filter-item:hover .filter-item-img {
  border: 1px solid #1261ff;
}
.image-tool-filter-item:hover .fliter-item-text {
  color: #1261ff;
}
.image-tool-filter-item-selected .filter-item-img {
  border: 1px solid #1261ff;
}
.image-tool-filter-item-selected .fliter-item-text {
  color: #1261ff;
}

.fliter-item-text {
  font-size: 12px;
  margin-top: 8px;
}
</style>