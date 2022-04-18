<template>
  <BlockUI :blocked="isShowImgMask" :fullScreen="true" :autoZIndex="false" :baseZIndex="90">
    <div class="img-list-box" v-show="isShowImgMask">
      <div class="img-list-left">
        <div class="img-list-title">音乐库</div>
        <div class="img-list-btn-group">
          <div class="img-list-tool-btn">
            系统音乐
          </div>
        </div>
        <!-- <div class="up-local-img">
          <FileUpload mode="basic" auto accept="image/*" :customUpload="true" @uploader="chooseImage" chooseLabel="选择图片" />
        </div> -->
      </div>
      <div class="img-list-right">
        <div class="img-type-list">
          <i class="iconfont icon-close2" @click="hideAudioMask"></i>
        </div>
        <div class="image-list">
          <div class="image-item" v-for="(item) in audioList" :key="item" @click="addAudio(item)">
            <!-- <div class="display-icon"> -->
            <i class="iconfont icon-bofang" @click.stop="changeDisplayAudio(item)"></i>
            <!-- </div> -->
          </div>
        </div>
        <div class="audio-dispaly-tool" @click="audioRunOrStop">
          <i class="iconfont icon-24gl-pauseCircle" v-if="audioChoose.isDisplay"></i>
          <i class="iconfont icon-24gl-playCircle" v-else></i>
          <div class="audio-display-text">
            XXX
          </div>
        </div>
      </div>
    </div>
  </BlockUI>
</template>

<script>
import { reactive, onMounted ,getCurrentInstance} from "vue";
// import { nanoid } from "@nanoid";
export default {
  props: ["isShowImgMask"],
  setup(props, context) {
    const { proxy } = getCurrentInstance();
    const { $fabric: fabric, $nanoid: nanoid } = proxy;

    const audioList = reactive([
      {
        id: nanoid(),
        url: require("@/assets/audio/abc.mp3"),
      },
     
    ]);
    const audioChoose = reactive({
      isDisplay: false,
      audioUrl: "",
      id: "",
      audioController: {
        play: () => {},
        pause: () => {},
      },
    });
    onMounted(() => {
      const loaclAudioStr = localStorage.getItem("audioData");
      // loaclAudioStr  { id: '', audioUrl: ''}
      // console.log(loaclAudioStr);
      if (loaclAudioStr === null) {
        audioChoose.audioUrl = require("@/assets/audio/abc.mp3");
        audioChoose.audioController = new Audio(
          require("@/assets/audio/abc.mp3")
        );
      } else {
        const loaclAudio = JSON.parse(loaclAudioStr);
        audioChoose.audioUrl = loaclAudio.audioUrl;
        console.log(loaclAudio.audioUrl);
        audioChoose.audioController = new Audio(loaclAudio.audioUrl);
      }
    });
    function addAudio(audioData) {
      localStorage.setItem(
        "audioData",
        JSON.stringify({ id: audioData.id, audioUrl: audioData.url })
      );
      context.emit("addAudio", audioData.url);
      hideAudioMask();
    }
    function hideAudioMask() {
      audioChoose.audioController.pause();

      context.emit("hideAudioMask");
    }

    function chooseImage(e) {
      addImg(e.files[0].objectURL);
    }
    // 音乐播放或者暂停
    function audioRunOrStop() {
      audioChoose.isDisplay = !audioChoose.isDisplay;
      // 如果播放
      if (audioChoose.isDisplay) {
        audioChoose.audioController.play();
      } else {
        audioChoose.audioController.pause();
      }
      // console.log( audioChoose.audioController );
      // console.log( audioChoose.audioController.duration );
      // console.log( audioChoose.audioController.currentTime );
    }
    function changeDisplayAudio(audioInfo) {
      audioChoose.audioController.pause();

      audioChoose.isDisplay = true;
      audioChoose.audioUrl = audioInfo.url;
      audioChoose.id = audioInfo.id;
      audioChoose.audioController = new Audio(audioInfo.url);

      audioChoose.audioController.play();
    }
    return {
      audioList,
      addAudio,
      hideAudioMask,
      chooseImage,
      audioChoose,
      audioRunOrStop,
      changeDisplayAudio,
    };
  },
};
</script>

<style scoped>
.img-list-box {
  width: 960px;
  height: 600px;
  background-color: white;
  position: fixed;
  z-index: 91;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  border-radius: 8px;
}
.img-list-left {
  width: 175px;
  height: 100%;
  position: relative;
  border-right: 1px solid #e6ebed;
}
.img-list-title {
  height: 80px;
  padding: 0 20px;
  line-height: 80px;
  font-size: 18px;
  font-weight: 600;
}
.img-list-tool-btn {
  margin: 0 8px;
  font-size: 13px;
  height: 36px;
  background-color: #1261ff;
  border-radius: 6px;
  padding: 0 12px;
  line-height: 36px;
  color: white;
}
.up-local-img {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #1261ff;
  color: white;
  width: 120px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  border-radius: 8px;
  /* overflow: hidden; */
}

::v-global(.up-local-img .p-button) {
  padding: 0 !important;
  height: 100% !important;
  background-color: transparent !important;
  border: none !important;
  width: 100%;
}
::v-global(.up-local-img .p-button-label) {
  font-size: 12px;
}
::v-global(.up-local-img .p-button-icon) {
  display: none;
}
.img-list-right {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.img-type-list {
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #e6ebed;
  position: relative;
}
.img-type-list i {
  position: absolute;
  width: 60px;
  height: 60px;
  right: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
}
.image-list {
  padding: 30px 0px 0 16px;
  overflow-y: auto;
  flex: 1;
}
.image-item {
  float: left;
  width: 136px;
  height: 136px;
  background-color: #f5f7fb;
  margin: 0 7px 14px;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}
.icon-bofang {
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 20px;
  height: 20px;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 1px;
}
.image-item:hover .icon-bofang {
  background-color: #1261ff;
  color: #fff;
}
.audio-dispaly-tool {
  height: 60px;
  box-sizing: border-box;
  border-top: 1px solid #e6ebed;
  display: flex;
  align-items: center;
  padding-left: 20px;
}
.audio-dispaly-tool i {
  font-size: 24px;
}
.audio-display-text {
  margin-left: 14px;
  font-size: 14px;
}
.audio-dispaly-tool:hover i,
.audio-dispaly-tool:hover .audio-display-text {
  color: #1261ff;
}
</style>