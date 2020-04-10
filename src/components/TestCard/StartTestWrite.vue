<template>
<body class="ubg2">
  <div class="header">
    <div class="container">
      <div class="row2">
        <div class="col-xs-6 col-md-6" id="logo">
          <a href="javascript:;">
            <img src="../../images/logo.png" />
          </a>
        </div>
        <div class="col-xs-6 col-md-6 text-right login-out" onclick="delMember();">退出登录</div>
      </div>
    </div>
  </div>
  <!------题目列表------>
  <div class="mb20" id="testQuestion" style>
    <div class="row mt20 mb20">
      <div class="col-xs-6 col-md-6">
        <div class="taocanName" style="padding-left: 2px;"></div>
      </div>
      <div class="col-xs-6 col-md-6">
        <div class="tou text-right">
          <a href="javascript:;" id="questionGoBack" class="green">
            返回
            <i class="ic ic-arr-right"></i>
          </a>
        </div>
      </div>
    </div>
    <div class="test-answer">
      <div class="pd2">
        <h2 id="sheetName" data-id="368">{{infoForm.name}}</h2>
      </div>
      <div class="pd2">
        <div class="row3" style>
          <div class="col-xs-2 col-md-2 text-left">
            <h3 class="gray">进度条</h3>
          </div>
          <div class="col-xs-8 col-md-8">
            <van-progress
              color="#FF6969"
              stroke-width="7"
              :show-pivot="false"
              :percentage="percentage"
            />
          </div>
          <div class="col-xs-2 col-md-2 text-right">
            <span class="gray">{{sheetLength}}</span>
            <span class="gray">/{{sheetLength}}</span>
          </div>
        </div>
      </div>

      <div class="pd2">
        <div id="quizBox" class="clearfix" style="min-height: 100px">
          <div class="a-title mb20 clearfix" data-questionid="9954" data-type="1">
            {{firstSheet.quesContent}}
            <img src class="tImg q-image" />
          </div>
          <div
            class="radio"
            data-optionid="64116"
            data-select="0"
            style="{marginLeft}"
            v-for="(item,index) in this.firstSheet.option"
            :key="index"
          >
            <i class="ic ic-radio"></i>
            {{item.optContent}}
            <img src class="aImg q-image" />
          </div>
        </div>
        <div class="row2 mt40">
          <div class="col-xs-12 col-md-4 tips">
            <span class="red">请注意：</span>
            <span class="gray" id="tips">单选题，请选择！</span>
          </div>
          <div class="col-xs-12 col-md-8 text-right">
            <a
              href="javascript:;"
              class="btn btn-danger bg-red pdlr30"
              id="btnPre"
              style="display: none"
            >返回上一题</a>
            <a
              href="javascript:;"
              class="btn btn-danger bg-red pdlr30 ml10"
              id="btnNext"
              @click="nextQues"
            >下一题</a>
            <button
              type="button"
              class="btn btn-success pdlr30 ml20"
              id="btnSubmit"
              style="display: none"
            >提交</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!--提交单套试题弹框-->
  <div
    class="modal ml-model"
    style="display: none"
    id="modalSubmit"
    tabindex="-1"
    role="dialog"
    aria-labelledby="myModalLabel"
    aria-hidden="hide"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title text-center">提示</h4>
        </div>
        <div class="modal-body text-center" style="padding: 40px;">本套试题做题完毕，确认后不能再更改。</div>
        <div class="modal-footer text-center">
          <button type="button" class="btn bg-gray pdlr30" id="btnModelCancle">取消</button>
          <button type="button" class="btn btn-danger bg-red pdlr30" id="btnModalSubmit">确定</button>
        </div>
      </div>
    </div>
  </div>
</body>
</template>
<script>
export default {
  data() {
    return {
      infoForm: {},
      sheetList: [],
      firstSheet: {},
      sheetLength: null,
      percentage: 30,
      num: 0
    };
  },
  created() {
    this.infoForm = JSON.parse(this.$route.query.infoList);
    // console.log(this.infoForm);
    this.getSheetList();
  },
  methods: {
    async getSheetList() {
      const { data: res } = await this.$http.post("sheetQues/list", {
        sheetUuid: this.infoForm.sheetUuid
      });
      console.log(res.rows);
      this.sheetList = res.rows;
      this.sheetLength = res.rows.length;
      this.firstSheet = this.sheetList[this.num];
    },
    nextQues() {
      this.num = this.num +1;
      this.getSheetList();
    }
  }
};
</script>
<style lang='less'>
.row3 {
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
  align-items: center;
}
.row2 {
  display: flex;
}
</style>