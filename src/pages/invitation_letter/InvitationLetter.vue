<template>
  <div class="show-canvas-box">
    <canvas id="show-canvas" :width="375 * 1.5" :height="667 * 1.5" style="border: 1px solid #00000011"></canvas>

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

export default {
  setup() {
    // 获取全局属性
    const { proxy } = getCurrentInstance();
    // 获取画布插件
    const fabric = proxy.$fabric;
    // 定义画布对象
    let canvasContext;
    const loaclCanvas = localStorage.getItem("canvas");
    // 挂载后初始化画布对象
    onMounted(() => {
      canvasContext = new fabric.StaticCanvas("show-canvas");
      canvasContext.loadFromJSON(loaclCanvas);
      canvasContext.getObjects().map((item) => {
        console.log(item);
        console.log(item.a);
        if (item.animation != undefined) {
          item.animate(
            item.animation[0]["property"],
            item.animation[0]["value"],
            {
              onChange: canvasContext.renderAll.bind(canvasContext),
              ...item.animation[0]["details"],
            }
          );
        }
      });
      // canvasContext.on("after:render", function () {
      //   console.log( '234' );

      // });
    });
  },
};
</script>
<style scoped>
.show-canvas-box {
  display: flex;
  justify-content: center;
  margin-top: 200px;
}
</style>
