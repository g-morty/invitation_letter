<template>
  <div class="header-box">邀请函</div>
  <div class="home-body">
    <div class="home-left-box">
      <div class="control-btn">文字</div>
      <div class="control-btn">图形</div>
      <div class="control-btn">图标</div>
      <div class="control-btn">图片</div>
    </div>
    <div class="home-center-box">
      <canvas id="edit-canvas" width="600" height="1000">abc</canvas>
    </div>
    <div class="home-right-box"></div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.header-box {
  /* background-color: #d1ffe3; */
  background-image: linear-gradient(180deg, #3effe5, #a6faff88, #a5d9cb00);
  height: 180px;
  /* text-align: center; */
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  color: #48b1ff;
  position: relative;
}
.header-box::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 150px;
  height: 100%;
  background-image: linear-gradient(90deg, #3effe5, #a6faff88, #a5d9cb00);
}
.home-body {
  min-height: 1200px;
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.home-left-box {
  width: 150px;
  background-image: linear-gradient(90deg, #3effe5, #a6faff88, #a5d9cb00);
}

.control-btn {
  height: 120px;
  width: 100%;
  color: #33b9cb;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.control-btn:hover {
  background-image: linear-gradient();
  background-color: #3effe5;
}
#edit-canvas{
  border: 1rpx solid #dbfff9;
  background-color: #e5fff6;
}
.home-right-box{
  width: 150px;
}
</style>