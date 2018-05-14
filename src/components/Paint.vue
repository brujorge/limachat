<template>
    <div id='paint'>
        <canvas id="myCanvas" ref="canvas" width="490" height="220"></canvas>
    </div>
</template>

<script>
export default {
    name: 'paint',
    data() {
        return {
        }
    },
    mounted(){
      let canvas = this.$refs.canvas
      canvas.on('mousedown', function(e){
        const mouseX = e.pageX - this.offsetLeft
        const mouseY = e.pageY - this.offsetTop
      })
      }
}
</script>

