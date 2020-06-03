<template>
<body class="ubg2">
  <!-- 公用头部组件 -->
  <!-- <Header></Header> -->
  <!------题目列表------>
  <div class="mb20" id="testQuestion" style="overflow:hidden">
    <div class="row mt20 mb20">
      <div class="col-xs-6 col-md-6">
        <div class="taocanName" style="padding-left: 2px;"></div>
      </div>
      <div class="col-xs-6 col-md-6">
        <div class="tou text-right">
          <a
            href="javascript:;"
            id="questionGoBack"
            class="backG green"
            @click.prevent.stop="backStart"
          >返回>></a>
        </div>
      </div>
    </div>
    <div class="test-answer">
      <div class="pd2">
        <h2 id="sheetName" data-id="368">{{this.$route.query.name}}</h2>
      </div>
      <div class="pd2">
        <div class="row3">
          <h3 class="gray col-xs-2 col-md-2 text-left" style="width:22%;">进度条</h3>
          <van-progress
            color="#FF6969"
            stroke-width="7"
            :show-pivot="false"
            :percentage="optionProgress"
            style="width:62%;"
          />
          <div class="col-xs-2 col-md-2 text-right" style="width:16%;">
            <span class="red">{{this.num + 1}}</span>
            <span class="gray">/{{sheetLength}}</span>
          </div>
        </div>
      </div>

      <div class="pd2">
        <div id="quizBox" class="clearfix" style="min-height: 100px" v-if="this.sheetList[num]">
          <!-- 题目标题 -->
          <div
            class="a-title mb20 clearfix"
            data-questionid="9954"
            data-type="1"
            v-html="this.sheetList[this.num].quesMedia"
          ></div>
          <div
            v-for="(item,index) in sheetList[num].option"
            :key="index"
            :class="[item.selected==1?'radio active':'radio']"
            @click="radioCheck(item,index)"
          >
            <i :class="[item.selected==1?'ic ic-radio ic-radio-active':'ic ic-radio']"></i>
            {{item.optContent}}
            <img class="aImg" v-bind:src="item.descriptionImg" />
          </div>
        </div>
        <div class="row mt40" v-if="this.sheetList[num]">
          <div class="col-xs-12 col-md-4 tips">
            <span class="red">请注意：</span>
            <span
              class="gray"
              id="tips"
              v-if="this.sheetList[num].quesType == 1 || this.sheetList[num].quesType == 4"
            >单选题，请选择！</span>
            <span class="gray" id="tips" v-else-if="this.sheetList[num].quesType == 2">多选题，请选择！</span>
            <span class="gray" id="tips" v-else-if="this.sheetList[num].quesType == 3">文本题 ！</span>
          </div>
          <div class="col-xs-12 col-md-8 text-right">
            <a
              href="javascript:;"
              class="btn btn-danger bg-red pdlr30"
              id="btnPre"
              v-show="btnopen"
              @click.prevent.stop="backTo"
            >返回上一题</a>
            <a
              href="javascript:;"
              class="btn btn-danger bg-red pdlr30 ml10"
              id="btnNext"
              @click="nextQues"
              v-show="nextQu"
            >下一题</a>
            <button
              type="button"
              class="btn btn-success pdlr30 ml20"
              id="btnSubmit"
              v-show="btnSubmit"
              @click="btnSave"
            >提交</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!--提交单套试题弹框-->
  <van-dialog
    class="dialogSu"
    :showCancelButton="true"
    v-model="show"
    title="提示"
    show-cancel-button
    @confirm="writeEnter"
  >
    <p class="loginSuccess" style="text-align:center">本套试题做题完毕，确认后不能再更改。</p>
  </van-dialog>
</body>
</template>
<script>
import Header from "../common/header";
export default {
  components: { Header },
  data() {
    return {
      sheetList: [],
      sheetLength: null,
      optionProgress: 0,
      num: 0,
      btnopen: false,
      btnSubmit: false,
      nextQu: true,
      show: false
    };
  },
  created() {
    this.getSheetList();
  },
  methods: {
    // 获取量表题目列表
    async getSheetList() {
      const { data: res } = await this.$http.post("sheetQues/list", {
        sheetUuid: this.$route.query.sheetUuid
      });
      this.sheetList = res.rows;
      this.sheetLength = res.rows.length;
      for (var i = 0; i < this.sheetList.length; i++) {
        var optionList = this.sheetList[i].option;
        var isSelected = false;
        for (var j = 0; j < optionList.length; j++) {
          if (optionList[j].selected == 1) {
            isSelected = true;
            break;
          }
        }

        if (!isSelected) {
          this.num = i;
          break;
        }
      }
      this.updateBtnType();
    },
    radioCheck(item, index) {
      if (this.sheetLength >= this.num + 1) {
        if (
          this.sheetList[this.num].quesType == 1 ||
          this.sheetList[this.num].quesType == 4
        ) {
          var optionList = this.sheetList[this.num].option;
          for (var i = 0; i < optionList.length; i++) {
            optionList[i].selected = 0;
          }
          this.sheetList[this.num].option[index].selected = 1;
          this.submitSheetOption();
          if (this.num + 1 < this.sheetLength) {
            this.num++;
          }
          this.updateBtnType();
        } else {
          if (this.sheetList[this.num].option[index].selected == 0) {
            this.sheetList[this.num].option[index].selected = 1;
          } else {
            this.sheetList[this.num].option[index].selected = 0;
          }
        }
      }
    },
    updateBtnType() {
      //改变按钮状态
      if (this.num == 0) {
        this.btnopen = false;
      } else {
        this.btnopen = true;
      }
      if (this.sheetLength > this.num + 1) {
        this.nextQu = true;
        this.btnSubmit = false;
      } else {
        this.nextQu = false;
        this.btnSubmit = true;
      }
      if (this.num + 1 == this.sheetLength) {
        this.nextQu = false;
        this.btnSubmit = true;
      }
      if (this.num == 0) {
        this.optionProgress = 0;
      } else if (this.num + 1 == this.sheetLength) {
        this.optionProgress = 100;
      } else {
        var divide = 100 / this.sheetLength;
        this.optionProgress = divide * this.num + 1;
      }
    },
    // 下一题
    async nextQues(info) {
      if (!this.isSelectedOption()) {
        this.$toast("请选择答案");
        return;
      }
      this.submitSheetOption();
      this.num++;
      this.updateBtnType();
    },
    isSelectedOption() {
      //判断是否选择答案
      var selected = false;
      var optionList = this.sheetList[this.num].option;
      for (var i = 0; i < optionList.length; i++) {
        if (optionList[i].selected == 1) {
          selected = true;
          break;
        }
      }
      return selected;
    },
    // 上一题
    backTo() {
      this.num--;
      this.updateBtnType();
    },
    async submitSheetOption() {
      // console.log(this.sheetList[this.num].quesType);

      //提交单个题目
      var questionContent = {};
      var optOrder = [],
        optScore = [],
        optContent = [],
        optLabel = "";
      var optionList = this.sheetList[this.num].option;
      console.log(optionList);

      for (var i = 0; i < optionList.length; i++) {
        if (optionList[i].selected == 1) {
          optOrder.push(optionList[i].optOrder);
          optScore.push(optionList[i].optScore);
          optContent.push(optionList[i].optContent);
          optLabel = optionList[i].optLabel;
        }
      }
      if (
        this.sheetList[this.num].quesType == 1 ||
        this.sheetList[this.num].quesType == 4
      ) {
        questionContent = {
          ansUuid: this.$route.query.ansUuid,
          sheetUuid: this.sheetList[this.num].sheetUuid,
          quesOrder: this.sheetList[this.num].quesOrder,
          quesContent: this.sheetList[this.num].quesMedia,
          optOrder: optOrder.join(","),
          optScore: optScore.join(","),
          optContent: optContent.join(","),
          optLabel: optLabel
        };
        const { data: res } = await this.$http.post(
          "sheetQues/subSingleAnswer",
          questionContent
        );
        if (res.code != 200) return this.$toast("提交单题答案失败");
      } else if (
        this.sheetList[this.num].quesType == 4 ||
        this.sheetList[this.num].quesType == 2
      ) {
        var score = 0;
        for (var i = 0; i < optScore.length; i++) {
          score = score + parseInt(optScore[i]);
        }
        questionContent = {
          ansUuid: this.$route.query.ansUuid,
          sheetUuid: this.sheetList[this.num].sheetUuid,
          quesOrder: this.sheetList[this.num].quesOrder,
          quesContent: this.sheetList[this.num].quesMedia,
          optScore: score,
          optContent: optContent.join(","),
          optLabel: optLabel
        };
        const { data: res } = await this.$http.post(
          "sheetQues/subSingleAnswer",
          questionContent
        );
        console.log(res);

        if (res.code != 200) return this.$toast("提交单题答案失败");
      }
    },
    // 提交
    async btnSave() {
      if (!this.isSelectedOption()) {
        this.$toast("请选择答案");
        return;
      }
      const { data: res } = await this.$http.post("sheetQues/approve", {
        ansUuid: this.$route.query.ansUuid,
        sheetUuid: this.$route.query.sheetUuid
      });
      if (res.code != 200) {
        return this.$toast("错误");
      } else {
        this.show = true;
      }
    },
    // 确定提交跳转
    writeEnter() {
      this.$router.replace({ path: "testWork" });
    },
    // 返回跳转到开始答题页面
    backStart() {
      this.$router.push("testWork");
    }
  }
};
</script>
<style lang='less'>
.row3 {
  display: flex;
  justify-content: center; /*水平居中*/
  align-items: center;
  margin-right: -15px;
  margin-left: -15px;
}
.row2 {
  display: flex;
}
.test-answer .radio {
  margin-bottom: 5px;
}
.a-title img {
  width: 40px;
  height: 40px;
  vertical-align: bottom;
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
html {
  overflow-x: hidden;
  overflow-y: auto;
}
.backG {
  margin-right: 20px;
}
</style>