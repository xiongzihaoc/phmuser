<template>
  <div class="testWork">
    <div class="header">
      <div class="container">
        <div class="row">
          <div class="col-xs-6 col-md-6" id="logo">
            <a href="index.html">
              <img src="../../images/logo.png" />
            </a>
          </div>
          <div class="col-xs-6 col-md-6 text-right login-out">退出登录</div>
        </div>
      </div>
    </div>
    <!------套餐量表列表------>
    <div class="container">
      <div class="row mt20 mb20">
        <div class="col-xs-6 col-md-6"></div>
        <div class="col-xs-6 col-md-6">
          <div class="tou text-right">
            <a href="javascript:;history.back()" class="green">
              返回
              <i class="ic ic-arr-right"></i>
            </a>
          </div>
        </div>
      </div>
      <!------量表列表------>
      <div class="row mt20 mb20">
        ;
        <div class="col-xs-12 col-md-12">
          <div class="taocanName" style="padding-left:2px;"></div>
        </div>
      </div>

      <div class="row test">
        <div class="col-xs-12 col-md-10 cont">
          <h3>111</h3>
          <div class="txt">111</div>
          <div class="row">
            <div class="col-xs-6 col-md-4">检测单位：</div>
            <div class="col-xs-6 col-md-3">卡号：</div>
            <div class="col-xs-6 col-md-3">开卡时间：</div>
            <div class="col-xs-6 col-md-2">状态：已完成</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {
    this.getCarfInfoList();
  },
  methods: {
    async getCarfInfoList() {
        const {data:res} = await this.$http.post('checkList/getPackage',{
            
        })
    }
  }
};

</script>
<style lang='less'>
.testWork {
  width: 100%;
  height: 100%;
  min-width: 290px;
  background: #f7f7f7 url("../../images/nbg2.jpg") repeat-x bottom center;
  background-size: contain;
  padding-bottom: 59px;
}
</style>