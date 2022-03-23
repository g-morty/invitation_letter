<template>
  <div>
    <Button>按钮</Button>
  </div>
</template>

<script>
import { getCurrentInstance } from "vue";
export default {
  setup(a, b) {
      console.log( 11232 );
    // const { proxy } = getCurrentInstance();
    // console.log(proxy);
    // console.log(proxy.$fabric);
    // return {};
  },
};
</script>

<style>
</style>