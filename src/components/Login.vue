<template>
  <div class="loginbg modal-open">
    <div class="log-container">
      <div class="log-box">
        <div class="row">
          <div class="col-xs-12 col-sm-6 col-md-6">
            <div class="pdr10">
              <div class="log-logo">
                <img
                  src="../images/logologin.png"
                  class="logo"
                  id="hospitalLogo"
                />
              </div>
              <div class="log-txt" id="brief" style="min-height: 100px"></div>
            </div>
          </div>
          <!--就诊卡登录-->
          <div class="col-xs-12 col-sm-6 col-md-6" id="loginCard">
            <h3>用户登录</h3>
            <el-form
              ref="loginFormRef"
              :model="loginForm"
              :rules="loginRules"
              class="login-form"
            >
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
                <div class="col-xs-4 col-md-4 ccc">
                  <button
                    type="button"
                    class="mbtn"
                    @click.prevent.stop="btnSubmitCard"
                  >
                    登 录
                  </button>
                </div>
              </div>
            </el-form>
          </div>
        </div>
      </div>
    </div>
    <van-dialog
      class="dialogSu"
      :showCancelButton="false"
      v-model="show"
      title="提示"
      show-cancel-button
      @confirm="loginEnter"
    >
      <p class="loginSuccess" style="text-align:center">
        登录成功,查看个人信息
      </p>
    </van-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loginForm: {
        cardNumber: "",
      },
      loginRules: {
        cardNumber: [
          { required: true, message: "请输入卡号", trigger: "blur" },
        ],
      },
      show: false,
      personalList: {},
      Num: "",
      PrOrderNo: "",
    };
  },
  created() {
    this.PrOrderNo = this.$route.query.orderNo;
    if (this.PrOrderNo !== "") {
      //   this.loginForm.cardNumber = this.PrOrderNo;
      //   const { data: res } = this.$http.post("checkList/confirmInfo", {
      //     orderNo: this.loginForm.cardNumber.trim()
      //   });
      //   if (res.code != 200 || res.data == null)
      //     return this.$toast.fail("卡号不存在");
      //   this.personalList = res.data;
      //   this.Num = res.data.hasConfirm;
      //   window.localStorage.setItem("order", this.loginForm.cardNumber);
      //   window.localStorage.setItem(
      //     "infoForm",
      //     JSON.stringify(this.personalList)
      //   );
      //   this.show = true;
      // }
      this.loginForm.cardNumber = this.PrOrderNo;
      this.btnSubmitCard();
    }
  },
  methods: {
    async btnSubmitCard() {
      const { data: res } = await this.$http.post("checkList/confirmInfo", {
        orderNo: this.loginForm.cardNumber,
      });
      if (res.code != 200 || res.data == null) return;
      // this.$toast.fail("卡号不存在");
      this.personalList = res.data;
      this.Num = res.data.hasConfirm;
      window.localStorage.setItem("order", this.loginForm.cardNumber);
      window.localStorage.setItem(
        "infoForm",
        JSON.stringify(this.personalList)
      );
      this.show = true;
    },
    loginEnter() {
      if (this.Num == 0) {
        this.$router.push({
          path: "/lookInfo",
        });
      } else {
        this.$router.push({
          path: "/testReport",
        });
      }
    },
  },
};
</script>
<style lang="less">
.log-box {
  position: relative;
}
.show {
  width: 60%;
  max-width: 600px;
  border-radius: 8px;
}
.loginSuccess {
  padding: 30px 0;
}
.dialogSu {
  width: 80%;
  max-width: 600px;
}
.ccc {
  margin-left: 50%;
  transform: translate(-50%);
}
</style>
