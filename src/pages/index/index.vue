<template>
  <div class="app-box" :style="'height:' + bodyHeight + 'px'">
    <header-view @addText="addText" @showImgMask="showImgMask" />
    <div class="app-body">
      <div class="app-left"></div>
      <div class="app-center">
        <canvas id="2edit-canvas" width="375" height="667"></canvas>
      </div>
      <div class="app-right">
        <layer-manage :canvasList="canvasList" :canvasSelectedIndex="canvasSelectedIndex" @addNewCanvas="addNewCanvas" @changeCanvasSelectedIndex="changeCanvasSelectedIndex" @deleteCanvasByIndex="deleteCanvasByIndex" @setCanvasBgColor="setCanvasBgColor" @selectLayer="selectLayer" @switchLayerSelectable="switchLayerSelectable" @switchLayerVisible="switchLayerVisible" />
      </div>
    </div>
  </div>
</template>

<script>
import headerView from "../../components/header/index.vue";
import layerManage from "./layerManage.vue";
import { ref, reactive, onMounted, getCurrentInstance, toRaw } from "vue";
import { useRouter } from "vue-router";

export default {
  components: {
    "header-view": headerView,
    "layer-manage": layerManage,
  },
  setup(props) {
    /**
     * 变量
     * */
    // 定义路由实例
    const $router = useRouter();
    // 获取全局属性
    const { proxy } = getCurrentInstance();
    // 获取画布插件
    const { $fabric: fabric, $nanoid: nanoid } = proxy;
    // 画布列表
    const canvasList = reactive([]);
    // 当前选择的画布
    const canvasSelectedIndex = ref(0);
    /**
     * 方法
     * */
    onMounted(() => {
      addNewCanvas();
    });
    // 添加新的canvas
    function addNewCanvas() {
      // 创建新的画布
      const { appCenterEle, newCanvas } = createNewCanvas();
      // 添加新的canvas进入容器
      appCenterEle.appendChild(newCanvas);
      // 定义新画布 控制器
      const canvasContext = new fabric.Canvas(newCanvas.id);
      // 将画布添加进入画布列表
      canvasList.push({
        // canvas
        canvas: newCanvas,
        // 画布id
        id: newCanvas.id,
        // 画布控制器
        canvasContext,
        // 画布的dom节点
        canvasNode: appCenterEle.children[0],
        // 画布的图片
        canvasImg: canvasContext.toDataURL(),
        // 画布的图层
        layerList: [],
      });
      // 设置初始化背景色
      setCanvasBgColor("#ffffff");

      // 给画布绑定事件
      canvasBindOn(canvasContext, newCanvas.id);
      // 更新当前画布下标
      canvasSelectedIndex.value = canvasList.length - 1;
    }
    document.onkeydown = function (e) {
      if (e.code === "Delete") {
        const canvasContext = toRaw(
          canvasList[canvasSelectedIndex.value].canvasContext
        );
        canvasContext.remove(...canvasContext.getActiveObjects());
      }
    };
    // 给画布绑定事件
    function canvasBindOn(canvasContext, canvasId) {
      let index = getCanvasIndexById(canvasId);
      canvasContext.on("mouse:out", () => {
        updateTheCanvasImg();
      });
      canvasContext.on("selection:created", () => {
        // 整理图层信息 （获取画布所有元素，并标识出是否被选择出来）
        getLayerInfo(index);
      });
      canvasContext.on("selection:updated", () => {
        // 整理图层信息 （获取画布所有元素，并标识出是否被选择出来）
        getLayerInfo(index);
      });
      canvasContext.on("selection:cleared", () => {
        // 整理图层信息 （获取画布所有元素，并标识出是否被选择出来）
        getLayerInfo(index);
      });
    }
    // 整理图层信息 （获取画布所有元素，并标识出是否被选择出来）
    function getLayerInfo(index) {
      const canvasContext = toRaw(canvasList[index].canvasContext);
      // 清空画布对象
      while (canvasList[index].layerList.length > 0) {
        canvasList[index].layerList.pop();
      }
      // 将画布对象重新加入图层
      canvasList[index].layerList.push(
        ...canvasContext.getObjects().map((item) => ({
          isActive: canvasContext.getActiveObjects().includes(item),
          layer: item,
        }))
      );
    }
    // 根据canvasId获取canvas的index
    function getCanvasIndexById(canvasId) {
      for (let i = 0; i < canvasList.length; i++) {
        if (canvasId === canvasList[i].id) {
          return i;
        }
      }
    }
    // 更换canvas
    function changeCanvas() {
      // 获取容器
      var appCenterEle = document.getElementsByClassName("app-center")[0];
      // 清除旧的canvas
      for (let i = 0; i < appCenterEle.children.length; i++) {
        appCenterEle.removeChild(appCenterEle.children[i]);
      }
      // 获取将要换取的canvas
      const { canvasNode } = canvasList[canvasSelectedIndex.value];

      // 添加新的canvas进入容器
      appCenterEle.appendChild(canvasNode);
    }
    // 创建新的canvas
    function createNewCanvas() {
      // 获取容器
      var appCenterEle = document.getElementsByClassName("app-center")[0];
      // 清除旧的canvas
      for (let i = 0; i < appCenterEle.children.length; i++) {
        appCenterEle.removeChild(appCenterEle.children[i]);
      }
      // 定义新的canvas
      var newCanvas = document.createElement("canvas");
      newCanvas.id = nanoid();
      newCanvas.width = 375;
      newCanvas.height = 667;
      return {
        appCenterEle,
        newCanvas,
      };
    }
    // 修改当前页下标
    function changeCanvasSelectedIndex(index) {
      canvasSelectedIndex.value = index;
      changeCanvas();
    }
    // 根据下标删除画布
    function deleteCanvasByIndex(index) {
      canvasList.splice(index, 1);
      if (
        index <= canvasSelectedIndex.value &&
        canvasSelectedIndex.value !== 0
      ) {
        canvasSelectedIndex.value -= 1;
      }
      if (canvasList.length > 0) {
        changeCanvas();
      } else {
        addNewCanvas();
      }
    }
    // 更新当画布的图片
    function updateTheCanvasImg() {
      const canvasContext = toRaw(
        canvasList[canvasSelectedIndex.value].canvasContext
      );
      canvasList[canvasSelectedIndex.value].canvasImg = canvasContext.toDataURL(
        { format: "png" }
      );
    }
    // 添加文本
    function addText() {
      // 生成文本实例
      const text = new fabric.IText("文本", { left: 150, top: 240 });
      const canvasContext = toRaw(
        canvasList[canvasSelectedIndex.value].canvasContext
      );
      // 将文本实例加入到画布
      canvasContext.add(text);
      console.log(text);
      // 设置文本为被选中状态
      canvasContext.setActiveObject(text);
      // 设置更新画布图片
      setTimeout(() => {
        updateTheCanvasImg();
      }, 0);
    }
    function showImgMask() {
      // // 生成文本实例
      // const text = new fabric.IText("文本", {
      //   left: 150,
      //   top: 240,
      //   selectable: false,
      //   visible: false,
      // });
      // const canvasContext = toRaw(
      //   canvasList[canvasSelectedIndex.value].canvasContext
      // );
      // // 将文本实例加入到画布
      // canvasContext.add(text);
      // console.log(text);
      // canvasContext.renderAll();
      // // 设置更新画布图片
      // setTimeout(() => {
      //   updateTheCanvasImg();
      // }, 0);
    }

    function setCanvasBgColor(color) {
      const canvasContext = toRaw(
        canvasList[canvasSelectedIndex.value].canvasContext
      );
      canvasContext.backgroundColor = color;
      canvasContext.renderAll();
    }
    // 选择图层
    function selectLayer(theLayer) {
      if (theLayer.selectable === false) {
        return;
      }
      const canvasContext = toRaw(
        canvasList[canvasSelectedIndex.value].canvasContext
      );
      canvasContext.setActiveObject(toRaw(theLayer));
      canvasContext.renderAll();
    }
    // 切换是否可被选
    function switchLayerSelectable(theLayer, value) {
      const canvasContext = toRaw(
        canvasList[canvasSelectedIndex.value].canvasContext
      );
      theLayer.set("selectable", value);
      if (!value) {
        canvasContext.discardActiveObject();
      }
      canvasContext.renderAll();
    }
    function switchLayerVisible(theLayer, value) {
      console.log(theLayer);
      console.log(value);
      const canvasContext = toRaw(
        canvasList[canvasSelectedIndex.value].canvasContext
      );
      theLayer.set("visible", value);
      if (!value) {
        canvasContext.discardActiveObject();
      }
      canvasContext.renderAll();
    }

    /**
     * 返回值
     * */
    return {
      bodyHeight: window.innerHeight,
      canvasList,
      canvasSelectedIndex,
      addNewCanvas,
      changeCanvasSelectedIndex,
      deleteCanvasByIndex,
      addText,
      setCanvasBgColor,
      selectLayer,
      showImgMask,
      switchLayerSelectable,
      switchLayerVisible,
    };
  },
};
</script>

<style scoped>
.app-box {
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.app-body {
  flex: 1;
  display: flex;
  justify-content: center;
  position: relative;
  background-color: #eff2f7;
  align-items: center;
}
.app-left {
  position: absolute;
  top: 0;
  left: 0;
  width: 72px;
  height: 100%;
  background-color: white;
}
.app-center {
  background-color: white;
  position: relative;
}

.app-right {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
}
</style>                       