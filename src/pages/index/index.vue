<template>
  <div class="app-box" :style="'height:' + bodyHeight + 'px'">
    <header-view :isUpdata="isUpdata" @shareInvitationLetter="shareInvitationLetter" @addText="addText" @showImgMask="showImgMask" @saveAllCanvas="saveAllCanvas" @showAudioMask="showAudioMask" @hideAudioMask="hideAudioMask" />
    <div class="app-body">
      <div class="app-left"></div>
      <div class="app-center">
        <canvas id="2edit-canvas" width="375" height="667"></canvas>
      </div>
      <div class="app-right">
        <layer-manage :canvasList="canvasList" :canvasSelectedIndex="canvasSelectedIndex" @addNewCanvas="addNewCanvas" @changeCanvasSelectedIndex="changeCanvasSelectedIndex" @deleteCanvasByIndex="deleteCanvasByIndex" @setCanvasBgColor="setCanvasBgColor" @selectLayer="selectLayer" @switchLayerSelectable="switchLayerSelectable" @switchLayerVisible="switchLayerVisible" />
      </div>
      <img-storage @addImg="addImg" :isShowImgMask="isShowImgMask" @hideImgMask="hideImgMask" />
      <audio-storage @addAudio="addAudio" :isShowImgMask="isShowAudioMask" @hideAudioMask="hideAudioMask"></audio-storage>
    </div>
  </div>
</template>

<script>
import headerView from "../../components/header/index.vue";
import layerManage from "./layerManage.vue";
import imgStorage from "./imgStorage.vue";
import audioStorage from "./audioStorage.vue";
import { ref, reactive, onMounted, getCurrentInstance, toRaw } from "vue";
import { useRouter } from "vue-router";

export default {
  components: {
    "header-view": headerView,
    "layer-manage": layerManage,
    "img-storage": imgStorage,
    "audio-storage": audioStorage,
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
    const { $fabric: fabric, $nanoid: nanoid, $axios } = proxy;
    // 画布列表
    const canvasList = reactive([]);
    // 当前选择的画布
    const canvasSelectedIndex = ref(0);
    //
    const isShowImgMask = ref(false);
    const isShowAudioMask = ref(false);
    // 是否在上传的状态
    const isUpdata = ref(false);
    /**
     * 方法
     * */
    onMounted(() => {
      const canvasJsonList = localStorage.getItem("canvasList");
      // console.log( canvasJsonList );
      // 如果本地没有缓存 添加新的canvas
      if (canvasJsonList === null) {
        addNewCanvas();
      } else {
        // 如果有缓存 将缓存反序列化至画布列表
        const canvasArr = JSON.parse(canvasJsonList);
        // console.log(canvasArr);
        for (let i = 0; i < canvasArr.length; i++) {
          addNewCanvas(canvasArr[i]);
        }
      }
    });
    // 添加新的canvas
    function addNewCanvas(canvasJson) {
      // console.log( canvasList );
      // 创建新的画布
      const { appCenterEle, newCanvas } = createNewCanvas();
      // 添加新的canvas进入容器
      appCenterEle.appendChild(newCanvas);
      // 定义新画布 控制器
      const canvasContext = new fabric.Canvas(newCanvas.id);
      // let canvasImg = canvasContext.toDataURL();
      if (canvasJson != undefined) {
        canvasLoadFromJson(canvasContext, canvasJson);
        // updateTheCanvasImg();
      }
      // canvasContext.toObject = (function (toObject) {
      //   return function () {
      //     return fabric.util.object.extend(toObject.call(this), {
      //       id: this.id,
      //     });
      //   };
      // })(canvasContext.toObject);
      // 将画布添加进入画布列表
      setTimeout(() => {
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
        if (canvasJson === undefined) {
          // 设置初始化背景色
          setCanvasBgColor("#ffffff");
        }

        // 给画布绑定事件
        canvasBindOn(canvasContext, newCanvas.id);
        // 更新当前画布下标
        canvasSelectedIndex.value = canvasList.length - 1;
      }, 200);
    }
    // 将json添加至画布（给画布的每个元素重写toObject方法）
    function canvasLoadFromJson(canvasContext, canvasJson) {
      canvasContext.loadFromJSON(canvasJson);
      canvasContext.getObjects().map((item) => addAnimationToEle(item));
      // updateTheCanvasImg();
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
        getLayerInfo(index);

      canvasContext.on("mouse:out", () => {
        updateTheCanvasImg();
      });
      canvasContext.on("selection:created", () => {
        // 整理图层信息 （获取画布所有元素，并标识出是否被选择出来）
        getLayerInfo(index);
        setTimeout(() => {
          updateTheCanvasImg();
        }, 0);
      });
      canvasContext.on("selection:updated", () => {
        // 整理图层信息 （获取画布所有元素，并标识出是否被选择出来）
        getLayerInfo(index);
      });
      canvasContext.on("selection:cleared", () => {
        // 整理图层信息 （获取画布所有元素，并标识出是否被选择出来）
        getLayerInfo(index);
        setTimeout(() => {
          updateTheCanvasImg();
        }, 0);
      });
    }
    // 给整个画布的元素添加
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
    function updateTheCanvasImg(canvasContexti, canvasListi) {
      const canvasContext = toRaw(
        canvasList[canvasSelectedIndex.value].canvasContext
      );
      canvasList[canvasSelectedIndex.value].canvasImg =
        canvasContext.toDataURL();
    }
    function addAnimationToEle(Ele) {
      Ele.toObject = (function (toObject) {
        return function () {
          return fabric.util.object.extend(toObject.call(this), {
            animation: this.animation,
            imgList: this.imgList,
          });
        };
      })(Ele.toObject);
    }
    // 添加文本
    function addText() {
      // 生成文本实例
      const text = new fabric.IText("I'm in Comic Sans", {
        left: 100,
        top: 200,
        fontFamily: "Times New Roman",
        fontSize: 16,
        fill: "#333",
      });
      const canvasContext = toRaw(
        canvasList[canvasSelectedIndex.value].canvasContext
      );
      // 将文本实例加入到画布
      canvasContext.add(text);
      // 设置文本为被选中状态
      canvasContext.setActiveObject(text);

      // 设置更新画布图片 重写元素toObject方法
      setTimeout(() => {
        updateTheCanvasImg();
        addAnimationToEle(text);
      }, 0);
    }
    // 增加图片
    function addImg(imgUrl) {
      const canvasContext = toRaw(
        canvasList[canvasSelectedIndex.value].canvasContext
      );
      const newImg = new Image();
      newImg.crossOrigin = "anonymous";
      newImg.src = imgUrl;
      newImg.onload = () => {
        var imgInstance = new fabric.Image(newImg, {
          scaleX: 375 / newImg.width / 2,
          scaleY: 375 / newImg.height / 2,
          top: 100,
          left: 94,
        });
        canvasContext.add(imgInstance);
        hideImgMask();
        // 添加滤镜种类
        addFilterToImgList(imgInstance);
        // console.log(imgInstance);
        // 设置文本为被选中状态
        canvasContext.setActiveObject(imgInstance);
        // 设置更新画布图片
        setTimeout(() => {
          updateTheCanvasImg();
          addAnimationToEle(imgInstance);
        }, 0);
      };
    }
    // 增加滤镜种类
    function addFilterToImgList(imgElement) {
      imgElement.imgList = {
        index: 0,
        content: [
          {
            fliterType: "原色",
            filterFun: { type: "BaseFilter" },
          },
          {
            fliterType: "夕阳",
            filterFun: { type: "Sepia" },
          },
          {
            fliterType: "黑白",
            filterFun: { type: "BlackWhite" },
          },
          {
            fliterType: "黄昏",
            filterFun: { type: "Vintage" },
          },
        ],
      };
      console.log( imgElement );
      // // 添加图片滤镜
      // const imgFilterList = [
      //   {
      //     fliterType: "原色",
      //     filterFun: { type: "BaseFilter" },
      //   },
      //   {
      //     fliterType: "夕阳",
      //     filterFun: { type: "Sepia" },
      //   },
      //   {
      //     fliterType: "黑白",
      //     filterFun: { type: "BlackWhite" },
      //   },
      //   {
      //     fliterType: "黄昏",
      //     filterFun: { type: "Vintage" },
      //     //  new fabric.Image.filters.Vintage()
      //   },
      // ];

      // imgFilterList.map((item) => {
      //   imgElement.filters.length = 0;
      //   imgElement.filters.push(
      //     new fabric.Image.filters[item.filterFun.type]()
      //   );
      //   imgElement.applyFilters();
      //   imgElement.imgList.content.push({
      //     fliterImg: imgElement.toDataURL(),
      //     ...item,
      //   });
      // });
      // imgElement.filters.length = 0;
      // imgElement.applyFilters();
    }
    // 显示图片蒙层
    function showImgMask() {
      isShowImgMask.value = true;
    }
    // 隐藏图片蒙层
    function hideImgMask() {
      isShowImgMask.value = false;
    }

    // 显示图片蒙层
    function showAudioMask() {
      isShowAudioMask.value = true;
    }
    // 隐藏图片蒙层
    function hideAudioMask() {
      isShowAudioMask.value = false;
    }
    function addAudio(audioUrl) {
      console.log(audioUrl);
    }

    // 设置画布背景色
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

    // 切换--是否可以被看见
    function switchLayerVisible(theLayer, value) {
      const canvasContext = toRaw(
        canvasList[canvasSelectedIndex.value].canvasContext
      );
      theLayer.set("visible", value);
      if (!value) {
        canvasContext.discardActiveObject();
      }
      canvasContext.renderAll();
    }
    // 保存
    function saveAllCanvas() {
      const canvasJson = getCanvasJsonList();
      localStorage.setItem("canvasList", canvasJson);
      setTimeout(() => {
        alert("保存成功");
      }, 0);
      return canvasJson;
    }
    function getCanvasJsonList() {
      const canvasJsonList = canvasList.map((canvasItem) =>
        toRaw(canvasItem.canvasContext).toObject()
      );
      console.log(canvasJsonList);

      return JSON.stringify(canvasJsonList);
    }
    // 分享
    async function shareInvitationLetter() {
      const canvasJson = getCanvasJsonList();
      localStorage.setItem("canvasList", canvasJson);
      isUpdata.value = true;
      const shareInvitationLetterRes = await $axios.post(
        "/api/add_new_invitation_letter",
        {
          canvasData: canvasJson,
        }
      );

      isUpdata.value = false;
      console.log(shareInvitationLetterRes);
      if (shareInvitationLetterRes.status === 201) {
        $router.push({
          path: "/invitation_letter",
          query: {
            invitation_letter_id:
              shareInvitationLetterRes.data.invitationLetterId,
          },
        });
      } else {
        alter("分享失败");
      }
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
      addImg,
      isShowImgMask,
      hideImgMask,
      saveAllCanvas,
      showAudioMask,
      hideAudioMask,
      isShowAudioMask,
      addAudio,
      shareInvitationLetter,
      isUpdata,
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
/* 添加图片过滤器、添加动画、序列化、反序列化、动画运行、音频添加 */
/* 问题：网络图片报错 https://blog.csdn.net/weixin_30668887/article/details/98822699 */
/* 三个接口：上传图片、上传序列化画布数据、下载序列化画布数据 */

/* 元素翻转 */
</style>                       