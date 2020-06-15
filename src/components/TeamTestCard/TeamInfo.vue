<template>
  <body>
    <div style="padding-top:20px">
      <div class="infoBox">
        <h2 style="margin-bottom:20px;">基本信息</h2>
        <el-form
          ref="loginFormRef"
          :model="loginForm"
          :rules="Addrules"
          class="login-form"
          label-width="80px"
          label-position="left"
        >
          <el-form-item label="姓  名" prop="name">
            <el-input
              ref="name"
              v-model="loginForm.name"
              placeholder="请输入姓名"
              type="text"
            />
          </el-form-item>
          <el-form-item label="身 份 证" prop="idCard">
            <el-input
              ref="name"
              v-model="loginForm.idCard"
              placeholder="请输入身份证号码"
              type="text"
              @change="IsRepetitionIdCard"
            />
          </el-form-item>
          <el-form-item label="手  机" prop="phone">
            <el-input
              ref="phone"
              v-model="loginForm.phone"
              placeholder="请输入手机号码"
              type="text"
            />
          </el-form-item>
          <el-form-item label="部  门" prop="dept">
            <el-input
              v-model="loginForm.dept"
              placeholder="请选择部门"
              type="text"
              @focus="showDept()"
              readonly
            ></el-input>
          </el-form-item>
          <el-form-item label="性  别" prop="sex">
            <el-select
              v-model="loginForm.sex"
              placeholder="请选择性别"
              style="width:100%"
            >
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="生  日" prop="birth" style="wdith:100%">
            <el-input
              v-model="loginForm.birth"
              placeholder="请选择日期"
              @focus="showPopFn()"
              readonly
            ></el-input>
            <van-popup
              v-model="show"
              position="bottom"
              :style="{ height: '40%' }"
            >
              <van-datetime-picker
                v-model="currentDate"
                type="date"
                :min-date="minDate"
                :max-date="maxDate"
                @confirm="confirmFn()"
                @cancel="cancelFn()"
              />
            </van-popup>
          </el-form-item>
          <el-form-item label="婚  姻" prop="marriage">
            <el-select
              v-model="loginForm.marriage"
              placeholder="请选择"
              style="width:100%"
            >
              <el-option label="未婚" value="未婚"></el-option>
              <el-option label="已婚" value="已婚"></el-option>
              <el-option label="离异" value="离异"></el-option>
              <el-option label="丧偶" value="丧偶"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="职  业" prop="job">
            <el-select
              v-model="loginForm.job"
              placeholder="请选择职业"
              style="width:100%"
            >
              <el-option
                v-for="item in jobList"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="文  化" prop="edu">
            <el-select
              v-model="loginForm.edu"
              placeholder="请选择文化程度"
              style="width:100%"
            >
              <el-option
                v-for="item in eduList"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-button
            class="loginBtn"
            type="danger"
            @click.native.prevent="handleLogin"
            >保 存</el-button
          >
        </el-form>
      </div>
    </div>

    <!-- 部门选择器 -->
    <VuePicker
      :layer="3"
      :data="deptDate"
      ref="pickerRef"
      @cancel="cancel"
      @confirm="confirm"
      :showToolbar="true"
      :maskClick="true"
      :visible.sync="pickerVisible"
    ></VuePicker>
  </body>
</template>
<script>
import { timesChangeDate } from "../../assets/js/changeTime";
import VuePicker from "vue-pickers";
export default {
  components: {
    VuePicker,
  },
  data() {
    // 手机验证规则
    var checkMobile = (rule, value, cb) => {
      const regMoblie = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
      if (regMoblie.test(value)) {
        return cb();
      }
      return cb(new Error("请输入合法的手机号"));
    };

    var IdCardRule = (rule, value, cb) => {
      const regMoblie = /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
      if (regMoblie.test(value)) {
        return cb();
      }
      return cb(new Error("请输入合法的身份证号码"));
    };
    return {
      timesChangeDate,
      // 表单检验规则
      Addrules: {
        dept: [{ required: true, message: "请选择部门" }],
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        idCard: [
          { required: true, message: "请输入身份证号码", trigger: "blur" },
          { validator: IdCardRule, trigger: "change" },
        ],
        docName: [
          { required: true, message: "请输入医生姓名", trigger: "blur" },
        ],
        phone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { validator: checkMobile, trigger: "change" },
        ],
        sex: [{ required: true, message: "请选择性别", trigger: "blur" }],
        birth: [{ required: true, message: "请选择出生日期" }],
        job: [{ required: true, message: "请选择职业", trigger: "blur" }],
        marriage: [
          { required: true, message: "请选择婚姻状况", trigger: "blur" },
        ],
        edu: [{ required: true, message: "请选择教育程度", trigger: "blur" }],
      },
      jobList: [
        { id: 1, name: "国家公务员" },
        { id: 2, name: "专业技术人员" },
        { id: 3, name: "职员" },
        { id: 4, name: "企业管理人员" },
        { id: 5, name: "工人" },
        { id: 6, name: "农民" },
        { id: 7, name: "学生" },
        { id: 8, name: "现役军人" },
        { id: 9, name: "自由职业者" },
        { id: 10, name: "个体经营者" },
        { id: 11, name: "无业人员" },
        { id: 12, name: "退(离)休人员" },
        { id: 13, name: "其他" },
      ],
      eduList: [
        { id: 1, name: "博士" },
        { id: 2, name: "硕士" },
        { id: 3, name: "本科" },
        { id: 4, name: "大专" },
        { id: 5, name: "中专和中技" },
        { id: 6, name: "技工学校" },
        { id: 7, name: "高中" },
        { id: 8, name: "初中" },
        { id: 9, name: "小学" },
        { id: 10, name: "文盲与半文盲" },
      ],
      loginForm: {
        name: "",
        sex: "",
        phone: "",
        job: "",
        marriage: "",
        edu: "",
        dept: "",
        deptValue: "",
        birth: "",
        idCard: "",
        hasConfirm: "",
        editId: "",
      },
      //   Isshow: false,
      //   时间选择配置
      currentDate: new Date(),
      minDate: new Date(1930, 0, 1),
      maxDate: new Date(2100, 0, 1),
      show: false, // 用来显示弹出层
      //   测试数据
      pickerVisible: false,
      deptDate: [],
      infoForm: {},
    };
  },
  created() {
    this.infoForm = this.$route.query;
    console.log(this.infoForm);
    this.getDeptList();
  },
  methods: {
    async getDeptList() {
      const { data: res } = await this.$http.post("teamList/dept/tree", {
        code: this.infoForm.deptCode,
      });
      this.deptDate = res.data;
      console.log(this.deptDate);
    },
    // 保存
    handleLogin() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await this.$http.post("checkList/update", {
          id: this.editId,
          teamDept: this.loginForm.deptValue,
          teamNo: this.infoForm.singleNum,
          teamPackageUuid: "",
          // teamPackageUuid: this.infoForm.teamPackageUuid,
          // patient: {
          idCard: this.loginForm.idCard,
          name: this.loginForm.name,
          phone: this.loginForm.phone,
          sex: this.loginForm.sex,
          birth: this.timesChangeDate(this.loginForm.birth),
          job: this.loginForm.job,
          marriage: this.loginForm.marriage,
          edu: this.loginForm.edu,
          // },
        });
        if (res.code !== 200) {
          return this.$toast.fail("更新失败");
        } else {
          this.$router.replace({
            path: "/testReport",
          });
        }
      });
    },
    // 查看数据库是否有重复信息,如果有直接更新登录 没有return
    async IsRepetitionIdCard() {
      const { data: res } = await this.$http.post(
        "checkList/team/checkMember",
        {
          teamNo: this.infoForm.singleNum,
          idCard: this.loginForm.idCard,
        }
      );
      this.editId = res.data.id;
      console.log(res);
      if (res.code == 200 && res.data !== null) {
        this.loginForm = res.data;
        this.loginForm.deptValue = res.data.teamDept;
        console.log(this.deptDate);
        if (res.data.teamDept != null && res.data.teamDept != "") {
          var deptName = "";
          if (this.deptDate != null && this.deptDate.length > 0) {
            this.deptDate.forEach((ele) => {
              var children = ele.children;
              if (res.data.teamDept == ele.code) {
                deptName = ele.label;
                return;
              }
              if (children != null && children.length > 0) {
                children.forEach((el) => {
                  var children = el.children;
                  if (res.data.teamDept == el.code) {
                    deptName = ele.label + "-" + el.label;
                    return;
                  }
                  if (children != null && children.length > 0) {
                    children.forEach((e) => {
                      if (res.data.teamDept == e.code) {
                        deptName = ele.label + "-" + el.label + "-" + e.label;
                        return;
                      }
                    });
                  }
                });
              }
            });
            this.loginForm.dept = deptName;
          }
        }

        window.localStorage.setItem("order", res.data.orderNo);
        window.localStorage.setItem("infoForm", JSON.stringify(res.data));
      } else {
        return this.$toast.fail("当前检测人员不存在，请输入正确身份证号");
      }
    },
    // 选择日期
    showPopFn() {
      this.show = true;
    },
    // 确定按钮
    confirmFn() {
      this.loginForm.birth = this.timesChangeDate(this.currentDate);
      this.show = false;
    },
    // 关闭按钮
    cancelFn() {
      this.show = true;
    },
    // 选择部门区域方法
    showDept() {
      this.loginForm.deptValue = "";
      this.loginForm.dept = "";
      this.pickerVisible = true;
    },
    cancel() {
      console.log("cancel");
    },
    // 确定部门选择
    confirm(res) {
      console.log(res);

      // 数组长度减1 获取数组最后一项的下标
      var DeptLength = res.length;
      this.loginForm.deptValue = res[DeptLength - 1].value;
      // 拼接部门名称
      var deptStr = "";
      for (var i = 0; i < res.length; i++) {
        deptStr += res[i].label + "-";
      }
      if (deptStr.length > 0) {
        deptStr = deptStr.substr(0, deptStr.length - 1);
      }
      this.loginForm.dept = deptStr;
    },
  },
  mounted() {
    this.timesChangeDate(new Date());
  },
};
</script>
<style>
header {
  padding: 10px 10px 10px 20%;
  width: 100%;
  background-color: #fff;
}
body {
  height: 100%;
  background: #0088b3 url("../../images/nbg.png") no-repeat bottom center;
  background-size: contain;
}
.infoBox {
  width: 90%;
  max-width: 800px;
  padding: 5%;
  margin: 0px auto;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.5);
}
.loginBtn {
  margin-left: 50%;
  transform: translate(-50%);
}
.infoBox .el-form-item__label {
  color: #000;
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
.el-input--small .el-input__inner {
  line-height: normal;
}

.el-input--medium .el-input__inner {
  line-height: normal;
}

.el-input__inner {
  line-height: normal;
}
</style>
