<template>
  <div class="loginbg modal-open">
    <div class="log-container">
      <div class="log-box">
        <div class="row">
          <div class="col-xs-12 col-sm-6 col-md-6">
            <div class="pdr10">
              <div class="log-logo">
                <img src="../images/logologin.png" class="logo" id="hospitalLogo" />
              </div>
              <div class="log-txt" id="brief" style="min-height: 100px"></div>
            </div>
          </div>
          <!--就诊卡登录-->
          <div class="col-xs-12 col-sm-6 col-md-6" id="loginCard">
            <h3>用户登录</h3>
            <div class="input-box clearfix">
              <i class="ic-card"></i>
              <input
                type="text"
                class="input input-80"
                placeholder="请输入就诊卡号"
                id="iptCard"
                v-model="cardNumber"
                autofocus="autofocus"
              />
            </div>
            <div class="row log-btn">
              <div class="col-xs-4 col-md-4">
                <button type="button" class="mbtn" @click="btnSubmitCard">登 录</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cardNumber: ""
    };
  },
  methods: {
    btnSubmitCard() {
      this.$router.push("/lookInfo");
    }
  }
};
</script>
<style lang='less'>
.log-box {
  position: relative;
}
.SuccDialog {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  background: rgba(0, 0, 0, 0.35);
}
</style>