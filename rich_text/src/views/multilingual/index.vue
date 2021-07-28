<template>
  <div class="main">
      <div>{{$t('lang.login')}}</div>
      <div>{{$t('lang.register')}}</div>
      <div>{{$t('lang.rember')}}</div>
      <div>{{$t('lang.about')}}</div>
      <div>{{$t('lang.aboutDesc')}}</div>
      <el-button type="primary" @click="switchLang" >切换语言</el-button>
  </div>
</template>

<script>
// 多语言

export default {
  methods: {
    switchLang() {
      this.$i18n.locale = this.$i18n.locale === 'zh' ? 'en' : 'zh';
    }
  }
}
</script>

<style>

</style>