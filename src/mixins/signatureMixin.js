// signature mixins
export default {
  data() {
    return {
      stage_info: [],
      canvasText: null
    }
  },
  methods: {
    initCanvas(canvas) {
      this.canvasTxt = canvas.getContext("2d")
      this.stage_info = canvas.getBoundingClientRect()
      this.canvasTxt.lineWidth = 4
    },
    getTrail(event) {
      return {
        x: event.targetTouches[0].clientX - this.stage_info.left,
        y: event.targetTouches[0].clientY - this.stage_info.top
      }
    },
    signatureMove(trail) {
      this.canvasText.beginPath()
      this.canvasText.moveTo(this.startX, this.startY)
      this.canvasTxt.lineTo(trail.x, trail.y)
      this.canvasTxt.stroke()
      this.canvasTxt.closePath()
    }
  }
}
