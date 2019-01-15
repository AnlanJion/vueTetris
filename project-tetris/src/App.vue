<template>
  <div id="app">
    <tetris/>
  </div>
</template>

<script>
import Tetris from './components/tetris.vue'
export default {
  name: 'app',
  components: {
    Tetris
  }
}
</script>

<style>
  *{
    margin: 0;
    padding: 0;
  }
  html,body,#app{
    width:100%;
    height:100%;
    overflow: hidden;
  }
</style>
