<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import md5 from 'blueimp-md5';
// import RichTextTemplate from './components/RichTextTemplate.vue';
// import RichText from './components/RichText.vue';

export default {
  name: 'App',
  data() {
    return {
    };
  },
  components: {
    // RichText,
    // RichTextTemplate,
  },
  mounted() {
    const data = {
      orderId: '10010',
      code: 'hainanyujie',
    }
    var hash = md5(JSON.stringify(data));
    
    console.log('md5 hash', hash);
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
