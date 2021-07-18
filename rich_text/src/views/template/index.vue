<template>
  <div class="contract" id="pdfDom">
    <div class="ql-container ql-snow">
      <div class="ql-editor">
        <div class="contract_body" v-html="content"></div>
      </div>
    </div>
  </div>
</template>

<script>
import request from "@requset/index.js";

const htmlTemplateModal = `<h3><strong style="font-size: 18px; line-height: 2;">第九条 争议解决</strong></h3><p class="ql-align-justify"><span style="font-size: 16px; line-height: 2;">1、本合同适用于中华人民共和国法律。</span></p><p class="ql-align-justify"><span style="font-size: 16px; line-height: 2;">2、双方在履行本合同中若发生争议，应当协商解决；协商不成的，任何一方均可向甲方所在地人民法院提起诉讼。</span></p><p class="ql-align-justify"><br></p><p class="ql-align-justify"><br></p><p class="ql-align-justify"><br></p><p class="ql-align-justify"><br></p><p class="ql-align-justify"><br></p><p class="ql-align-justify"><br></p><h3><strong style="font-size: 18px; line-height: 2;">甲乙双方签字/签章</strong></h3><p><br></p><p><br></p><p><span style="font-size: 16px; line-height: 2;">甲方（签字/盖章处）：</span></p><p><br></p>{imageA}<p><br></p><p><br></p><p><span style="font-size: 16px; line-height: 2;">乙方（签字/ 盖章处）：</span></p><p><br></p>{imageB}<p></p>`;

export default {
  data() {
    return {
      content: htmlTemplateModal,
    };
  },
  mounted() {
    this.getUrl();
  },
  methods: {
		getUrl() {
			let self = this;
			const loading = this.$loading({
				lock: true,
				text: "Loading",
				spinner: "el-icon-loading",
				background: "rgba(0, 0, 0, 0.7)"
			});
			request({
				url: "/Api/getUrl",
				method: "get",
			})
				.then(res => {
					loading.close();
          console.log('res', res);
				})
				.catch(err => {
					loading.close();
					self.$message({
						type: "error",
						message: err.msg
					});
				});
		}
  },
};
</script>

<style scoped>
.ql-container.ql-snow  {
	border: none;
}
</style>
