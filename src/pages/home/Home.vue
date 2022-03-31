<template>
  <div class="home-box" :style="'height:' + bodyHeight + 'px'">
    <!-- <img src="./bgImg2.jpg" class="canvas-img"> -->
    <!-- header -->
    <div class="header-box">
      <div class="project-name">邀请函</div>
      <div class="header-btn-list">
        <Button @click="switchShowText">文字</Button>
        <Button>图片</Button>
        <Button>音乐</Button>
        <Button>视频</Button>
        <Button>动画</Button>
      </div>
      <div class="header-share-box" @click="shareCanvas">分享</div>
    </div>
    <!-- center -->
    <div class="center-box">
      <div class="tool-left"></div>
      <div class="canvas-box">
        <canvas id="edit-canvas" :width="375 * 1.5" :height="667 * 1.5" style="border: 1px solid #00000011"></canvas>
      </div>
      <div class="tool-right">
        <Layer :layer-list="layerList" @selectLayer="selectLayer" />
      </div>
    </div>
    <!-- footer -->
    <footer class="footer-box">Posted by: carSlow</footer>
    <!-- 添加文字蒙层 -->
    <BlockUI :blocked="textData.isShowInput" :fullScreen="true" :baseZIndex="90" :autoZIndex="false">
      <div class="add-text-input-box" name="p-blockui-document" v-show="textData.isShowInput">
        <InputText id="add-text" class="add-text-input" type="text" v-model="textData.content" @keydown.enter="addText" />
        <Button class="cancel-btn" @click="switchShowText">取消</Button>
        <Button @click="addText">确定</Button>
      </div>
    </BlockUI>
  </div>
</template>

<script>
import {
  ref,
  reactive,
  onMounted,
  getCurrentInstance,
  toRaw,
  onBeforeUnmount,
} from "vue";
import { useRouter } from "vue-router";
import Layer from "./Layer.vue";
export default {
  components: { Layer },

  setup() {
    const $router = useRouter();
    // 获取全局属性
    const { proxy } = getCurrentInstance();
    // 获取画布插件
    const fabric = proxy.$fabric;
    // 定义文本相关信息
    const textData = reactive({
      isShowInput: false,
      content: "",
    });
    // 定义画布对象
    let canvasContext;
    // 定义图层
    let layerList = reactive([]);
    // 挂载后初始化画布对象
    onMounted(() => {
      canvasContext = new fabric.Canvas("edit-canvas");
      const loaclCanvas = localStorage.getItem("canvas");
      if (loaclCanvas !== null) {
        canvasContext.loadFromJSON(loaclCanvas);
      }
      // 渲染之后重新获取画布元素 todo:有性能问题、后续优化
      canvasContext.on("after:render", function () {
        canvasContext.getObjects().map((item) => {
          item.toObject = (function (toObject) {
            return function () {
              return fabric.util.object.extend(toObject.call(this), {
                animation: this.animation,
              });
            };
          })(item.toObject);
        });
        localStorage.setItem("canvas", JSON.stringify(canvasContext));

        getLayerInfo();
      });
      document.onkeydown = function (e) {
        if (e.code === "Backspace" || e.code === "Delete") {
          canvasContext.remove(...canvasContext.getActiveObjects());
        }
      };
      // location.reload();
    });
    // onBeforeUnmount(() => {
    //   canvasContext.dispose();
    // });
    // 展示或者隐藏添加文本蒙层
    function switchShowText() {
      textData.isShowInput = !textData.isShowInput;
      if (textData.isShowInput) {
        setTimeout(() => {
          document.getElementById("add-text").focus();
        }, 10);
      }
    }
    // 添加文本
    function addText() {
      // 生成文本实例
      const text = new fabric.Text(textData.content, { left: 10, top: 10 });
      text.animation = [
        {
          property: "angle",
          value: "300",
          details: {
            duration: 4000,
            from: 0,
          },
        },
      ];
      // console.log(text);
      // text.on("after:render", function () {
      //   console.log("abc");
      // });
      text.on("selected", function () {
        text.animate("angle", "300", {
          onChange: canvasContext.renderAll.bind(canvasContext),
          duration: 4000,
          from: 0,
          onComplete: () => {
            // this.set("angle", 0);
            canvasContext.renderAll();
          },
        });
      });
      // findAnimationsByTarget （目标）→ {Array.<AnimationContext>}
      // console.log( canvasContext.findAnimationsByTarget(text) );
      // 隐藏文本展示
      textData.isShowInput = false;
      // 将输入框内容清空
      textData.content = "";
      // 将文本实例加入到画布
      canvasContext.add(text);
    }
    // 整理图层信息 （获取画布所有元素，并标识出是否被选择出来）
    function getLayerInfo() {
      // 清空画布对象
      while (layerList.length > 0) {
        layerList.pop();
      }

      // 将画布对象重新加入图层
      layerList.push(
        ...canvasContext.getObjects().map((item) => ({
          isActive: canvasContext.getActiveObjects().includes(item),
          layer: item,
        }))
      );
    }
    // 删除文本
    function delText() {}
    // 选择图层
    function selectLayer(theLayer) {
      canvasContext.setActiveObject(toRaw(theLayer));
      canvasContext.renderAll();
    }
    // 分享
    function shareCanvas() {
      $router.push({ path: "/invitation_letter" });
    }
    return {
      bodyHeight: window.innerHeight,
      switchShowText,
      addText,
      delText,
      textData,
      layerList,
      selectLayer,
      shareCanvas,
    };
  },
};
</script>

<style scoped>
/* body */
.home-box {
  background-color: #d6effb66;
  overflow: hidden;
  /* min-height: 2000px; */
}

/* header */
.header-box {
  height: 80px;
  border-bottom: 2px solid #edeff3;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f8f8f6;
}

.project-name {
  margin-left: 60px;
  font-size: 24px;
  color: #5da8b7;
}

.header-btn-list {
  display: flex;
}

.header-btn-list button {
  margin: 0 10px;
}

.header-share-box {
  font-size: 16px;
  color: #888ce5;
  height: 100%;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

/* center */
.center-box {
  display: flex;
  justify-content: space-between;
  padding-top: 90px;
}

.canvas-box {
  display: inline-block;
  background-color: #f4f7fb;
}

.tool-right {
  position: relative;
}

.add-text-input-box {
  position: fixed;
  top: 160px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 95;
}

.add-text-input {
  width: 300px;
  /* background-color: red; */
  vertical-align: center;
  /* padding: 0; */
}

.add-text-tip {
  color: green;
  line-height: 18px;
  height: 18px;
}

.cancel-btn {
  margin: 0 20px;
}

/* footer */
.footer-box {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  height: 30px;
  text-align: right;
  line-height: 30px;
  padding-right: 30px;
  border-top: 1px solid #13474733;
}
</style>
