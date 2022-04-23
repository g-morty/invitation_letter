<template>
  <div class="invitation-letter" :style="'height:' + bodyHeight + 'px'">
    <div class="canvas-list-box">
      <div class="canvas-window">
        <div class="canvas-content" :style="'left:-' + 375 * canvasIndexOffset +'px' ">

        </div>
      </div>
      <div class="the-paginator">
        <Paginator v-model:first="canvasIndexOffset" @page="changCanvasInde" :rows="1" :totalRecords="canvasList.length" :pageLinkSize="3"></Paginator>
      </div>
      <audio id="audio-ele" :muted="false">a</audio>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted, getCurrentInstance, toRaw } from "vue";
import animation from "../../utils/animation";
import { useRoute, useRouter } from "vue-router";
export default {
  setup(props, context) {
    // 获取全局属性
    const { proxy } = getCurrentInstance();
    const [$router, $route] = [useRouter(), useRoute()];
    // 获取画布插件
    const { $fabric: fabric, $nanoid: nanoid, $axios } = proxy;
    // 当前画布下标
    let canvasIndexOffset = ref(0);
    // 画布列表
    const canvasList = reactive([]);

    onMounted(async () => {
      const canvasListJson = await getCanvasJson();

      // 从本地获取画布信息
      // const canvasListJson = localStorage.getItem("canvasList");
      // 将画布信息从json转化成数组
      const canvasListObject =
        canvasListJson != null ? JSON.parse(canvasListJson) : [];
      // 将画布信息添加至画布列表
      canvasListObject.map((item) => addNewCanvas(item));
      // 触发画布动画
      setTimeout(() => {
        emitCanvasAnimation();
      }, 200);
      // 获取音频信息
      const loaclAudioStr = localStorage.getItem("audioData");
      if (loaclAudioStr != null) {
        const loaclAudio = JSON.parse(loaclAudioStr);
        console.log(loaclAudio.audioUrl);
        const audioController = document.getElementById("audio-ele");
        audioController.autoplay = true;
        audioController.muted = true;
        console.log(audioController);
        // setTimeout(() => {
        audioController.play();
        // }, 1000);
      }
    });

    async function getCanvasJson() {
      const canvasJsonRes = await $axios.get(
        "/api/get_invitation_letter_by_id",
        { params: { id: $route.query.invitation_letter_id } }
      );
      if (canvasJsonRes.status === 200) {
          return canvasJsonRes.data.canvasData;
      }
    }
    // 添加新的canvas
    function addNewCanvas(canvasJson) {
      // 创建新的画布
      const { appCenterEle, newCanvas } = createNewCanvas();
      // 添加新的canvas进入容器
      appCenterEle.appendChild(newCanvas);
      // 定义新画布 控制器
      const canvasContext = new fabric.StaticCanvas(newCanvas.id);
      canvasContext.loadFromJSON(canvasJson);

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
    }

    // 创建新的canvas
    function createNewCanvas() {
      // 获取容器
      var appCenterEle = document.getElementsByClassName("canvas-content")[0];

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
    // 修改画布下标
    function changCanvasInde(e) {
      emitCanvasAnimation();
    }
    // 触发canvas动画
    function emitCanvasAnimation() {
      const canvasContext = toRaw(
        canvasList[canvasIndexOffset.value].canvasContext
      );
      const elementList = canvasContext.getObjects();
      // console.log( elementList );
      elementList.map((item, index) => {
        if (item.animation != undefined) {
          elementAnimationRun(canvasContext, item, item.animation);
          // elementAnimationRun(canvasContext, item, item.animation[0].type);
          // animation.run(canvasContext, item, item.animation[0].type);
          // function run(canvasContext, element, type, cb = () => { }) {
        }
      });
    }
    // 执行动画递归
    function elementAnimationRun(
      canvasContext,
      element,
      animationList,
      index = 0
    ) {
      console.log(canvasContext, element, animationList, index);
      if (index >= animationList.length - 1) {
        return animation.run(canvasContext, element, animationList[index].type);
      } else {
        return animation.run(
          canvasContext,
          element,
          animationList[index].type,
          elementAnimationRun.bind(
            this,
            canvasContext,
            element,
            animationList,
            index + 1
          )
        );
      }
    }

    return {
      bodyHeight: window.innerHeight,
      canvasList,
      canvasIndexOffset,
      changCanvasInde,
    };
  },
};
</script>

<style scoped>
.invitation-letter {
  background-color: #eff2f7;
  display: flex;
  align-items: center;
  justify-content: center;
}
.canvas-list-box {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.canvas-window {
  width: 375px;
  height: 667px;
  background-color: white;
  position: relative;
  overflow: hidden;
}
.canvas-content {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  display: flex;
  transition-duration: 0.3s;
  transition-timing-function: linear;
}
.canvas-item {
  height: 100%;
  width: 375px;
}
.the-paginator {
  margin-top: 20px;
  width: 416px;
  transform: scale(0.9);
}
/* ::v-global(.the-paginator .p-paginator){
  flex-wrap: nowrap;
} */
</style>