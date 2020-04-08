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
            <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" class="login-form">
              <!-- <div class="input-box clearfix">
                <i class="ic-card"></i>
                <input
                  type="text"
                  class="input input-80"
                  placeholder="请输入就诊卡号"
                  id="iptCard"
                  v-model="loginForm.cardNumber"
                  autofocus="autofocus"
                />
              </div>-->

              <el-form-item prop="cardNumber">
                <div class="input-box clearfix">
                  <i class="ic-card"></i>
                  <input
                    type="text"
                    class="input input-80"
                    placeholder="请输入就诊卡号"
                    id="iptCard"
                    v-model="loginForm.cardNumber"
                    autofocus="autofocus"
                  />
                </div>
              </el-form-item>

              <div class="row log-btn">
                <div class="col-xs-4 col-md-4">
                  <button type="button" class="mbtn" @click.prevent.stop="btnSubmitCard">登 录</button>
                </div>
              </div>
            </el-form>
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
      loginForm: {
        cardNumber: ""
      },
      loginRules: {
        cardNumber: [{ required: true, message: "请输入卡号", trigger: "blur" }]
      }
    };
  },
  methods: {
    btnSubmitCard() {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return;
        const { data: res } = await this.$http.post("/checkList/confirmInfo", {
          orderNo: this.loginForm.cardNumber
        });
        console.log(res);
        if (res.code != 200 || res.data == null) return this.$message.error("请输入正确卡号");
        this.$router.push("/lookInfo");
      });
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