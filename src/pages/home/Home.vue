<template>
  <div class="home-box" :style="'height:' + bodyHeight + 'px'">
    <BlockUI :blocked="textData.isShowInput" :fullScreen="true" :baseZIndex="90" :autoZIndex="false">
      <div class="add-text-input-box" name="p-blockui-document" v-show="textData.isShowInput">
        <!-- <span class="p-float-label"> -->
        <InputText id="add-text" class="add-text-input" type="text" v-model="textData.content" />
        <!-- <label class="add-text-tip" for="add-text">添加文本</label> -->
        <!-- </span> -->
        <Button class="cancel-btn" @click="switchShowText">取消</Button>
        <Button @click="addText">确定</Button>
      </div>
    </BlockUI>

    <!-- header -->
    <div class="header-box">
      <div class="project-name">邀请函</div>
      <div class="header-btn-list">
        <Button @click="switchShowText">文字</Button>
        <Button @click="delText">测试删除</Button>
        <Button>图片</Button>
        <Button>音乐</Button>
        <Button>视频</Button>
      </div>
      <div class="header-share-box">分享</div>
    </div>
    <!-- center -->
    <div class="center-box">
      <div class="tool-left"></div>
      <div class="canvas-box">
        <canvas id="edit-canvas" :width="375 * 1.5" :height="667 * 1.5" style="border: 1px solid #00000011"></canvas>
      </div>
      <div class="tool-right"></div>
    </div>
    <!-- footer -->
    <footer class="footer-box">Posted by: carSlow</footer>
  </div>
</template>

<script>
import { red, reactive, onMounted, getCurrentInstance } from "vue";
export default {
  setup() {
    // 获取全局属性
    const { proxy } = getCurrentInstance();
    const fabric = proxy.$fabric;
    const textData = reactive({
      isShowInput: false,
      content: "",
    });
    // 定义画布对象
    let canvasContext;

    // 挂载后初始化画布对象
    onMounted(() => {
      canvasContext = new fabric.Canvas("edit-canvas");
      console.log(canvasContext);
      canvasContext.on("mouse:down", function (options, a) {
        console.log(options);
        console.log(a);
      });
    });
    let text;
    // 展示或者隐藏添加文本蒙层
    function switchShowText() {
      textData.isShowInput = !textData.isShowInput;
    }
    // 添加文本
    function addText() {
      text = new fabric.Text(textData.content, { left: 10, top: 10 });
      canvasContext.add(text);
      textData.isShowInput = false;
      textData.content = "";
    }
    // 删除文本
    function delText() {
      canvasContext.remove(text);
    }
    return {
      bodyHeight: window.innerHeight,
      switchShowText,
      addText,
      delText,
      textData,
    };
  },
};
</script>

<style scoped>
/* body */
.home-box {
  background-color: #d6effb66;
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
  margin-right: 50px;
  color: #888ce5;
}

/* center */
.center-box {
  display: flex;
  justify-content: center;
}

.canvas-box {
  display: inline-block;
  background-color: #f4f7fb;

  margin-top: 40px;
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
