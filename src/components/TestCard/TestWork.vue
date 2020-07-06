<template>
<div style="height:100%">
  <body class="ubg2" style="height:100%">
    <!-- 公用头部组件 -->
    <Header></Header>
    <div class="container">
      <!--套餐量表列表-->
      <div id="testlist" class="list__box">
        <div class="row mt20 mb20">
          <div class="col-xs-6 col-md-6">
            <div class="taocanName" style="padding-left: 2px;"></div>
          </div>
          <div class="col-xs-6 col-md-6">
            <div class="tou text-right">
              <a href="javascript:;" id="testListBack" class="green" @click.prevent.stop="historyBack">
                返回
                <i class="ic ic-arr-right"></i>
              </a>
            </div>
          </div>
        </div>
        <div id="listBox">
          <div class="row mt20 mb20" v-for="(item,index) in taoCanList" :key="index">
            <div class="col-xs-12 col-md-12">
              <div class="taocanName taocanNameSty" style="padding-left:2px;">{{item.packageName}}</div>
              <div class="row test" v-for="(subItem,i) in item.sheets" :key="i">
                <div class="col-xs-12 col-md-10 cont">
                  <h3>{{subItem.name}}</h3>
                  <div class="txt">
                    <p>{{subItem.instruction}}</p>
                  </div>
                  <div class="row">
                    <div style="margin-bottom:5px;" class="col-xs-6 col-md-3">检测单位：{{subItem.dept}}</div>
                    <div style="margin-bottom:5px;" class="col-xs-6 col-md-4">卡号：{{order}}</div>
                    <div
                      style="margin-bottom:5px;"
                      class="col-xs-6 col-md-3"
                    >开卡时间：{{timesChangeDate(subItem.createTime)}}</div>
                    <div
                      style="margin-bottom:5px;"
                      class="col-xs-6 col-md-2"
                      v-if="subItem.state == 0"
                    >状态：未完成</div>
                    <div
                      style="margin-bottom:5px;"
                      class="col-xs-6 col-md-2"
                      v-if="subItem.state == 1"
                    >状态：未完成</div>
                    <div
                      style="margin-bottom:5px;"
                      class="col-xs-6 col-md-2"
                      v-if="subItem.state == 2"
                    >状态：已完成</div>
                  </div>
                </div>
                <div class="col-xs-12 col-md-2 text-center">
                  <div class="btn-box">
                    <a
                      href="javascript:;"
                      data-id="368"
                      id="btn_368"
                      class="mbtn"
                      data-state="0"
                      v-if="subItem.state == 0"
                      @click.prevent.stop="jumpStart(subItem)"
                    >开始答题</a>
                    <a
                      href="javascript:;"
                      data-id="368"
                      id="btn_368"
                      class="mbtn"
                      data-state="0"
                      v-if="subItem.state == 1"
                      @click.prevent.stop="jumpStart(subItem)"
                    >继续答题</a>
                    <a
                      href="javascript:;"
                      data-id="368"
                      id="btn_368"
                      class="mbtn mbtn-gray"
                      data-state="0"
                      v-if="subItem.state == 2"
                    >答题完毕</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="text-center btnSubmitQues">
          <button
            type="button"
            class="btn pdlr30 btn-submit"
            v-if="this.infoForm.state == 3"
            disabled
            style="color: #fff;background-color: #ccc;border-color: #ccc;"
          >提交答案</button>
          <button
            type="button"
            class="btn btn-success pdlr30 btn-submit"
            v-else
            @click.prevent.stop="saveAnsBtn"
          >提交答案</button>
        </div>
      </div>
    </div>
  </body>
</div>
</template>
<script>
import Header from "../common/header";
import { timesChangeDate } from "../../assets/js/changeTime";
export default {
  components: { Header },
  data() {
    return {
      timesChangeDate,
      taoCanList: [],
      order: "",
      Continue: false,
      over: false,
      infoForm: {},
      start: true
    };
  },
  created() {
    this.order = window.localStorage.getItem("order");
    console.log(this.order);
    this.infoForm = JSON.parse(window.localStorage.getItem("infoForm"));
    this.getCarfInfoList();
  },
  methods: {
    async getCarfInfoList() {
      const { data: res } = await this.$http.post("checkList/getPackage", {
        orderNo: this.order
      });
      this.taoCanList = res.data;
    },
    jumpStart(info) {
      console.log(info);
      
      this.$router.push({
        path: "StartTset",
        query: {
          sheetId: info.sheetUuid,
          instruction: info.instruction,
          ansUuid: info.ansUuid,
          name: info.name
        }
      });
    },
    async location() {
      const { data: res } = await this.$http.post("checkList/confirmInfo", {
        orderNo: this.order
      });
      window.localStorage.setItem("infoForm", JSON.stringify(res.data));
    },
    async saveAnsBtn() {
      const { data: res } = await this.$http.post("checkList/approvePackage", {
        orderNo: this.order
      });
      if (res.code == 500) {
        return this.$toast(res.data);
      } else if (res.code == 200) {
        this.$toast("提交成功");
        this.infoForm.state = 3;
        this.location();
        return;
      } else if (res.code != 200 && res.code != 500) {
        return this.$toast("请完成所有量表");
      }
    },
    historyBack(){
      this.$router.push('testReport')
    },
  }
};
</script>
<style >
.row2 {
  display: flex;
}
.taocanNameSty {
  margin-bottom: 10px;
}
.btnSubmitQues {
  margin-bottom: 20px;
}
body {
  height: 100%;
}
</style>