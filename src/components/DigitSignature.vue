<template>
  <div class="digit-signature">
    <!-- canvas画板 -->
    <div class="digit-signature__canvas" ref="canvasBox">
      <canvas
        ref="canvas"
        @touchstart="touchStart"
        @touchmove="touchMove"
        @touchend="touchEnd"
      />
    </div>
    <!-- 按钮区域 -->
    <div class="digit-signature__btns">
      <div
        class="digit-signature__btn-cancel"
        @click="doCancel"
      >
        {{ cancelText }}
      </div>
      <div
        class="digit-signature__btn-confirm"
        @click="doConfirm"
      >
        {{ confirmBtnText }}
      </div>
    </div>
    <van-dialog v-model="show" show-cancel-button>
      <img :src="digitSignature" alt="" />
    </van-dialog>
  </div>
</template>

<script>
import mixins from '@/mixins/signatureMixin'
export default {
  name: 'DigitSignature',
  mixins: [mixins],
  props: {
    confirmBtnText: { type: String, default: '确 定' },
    cancelBtnText: { type: String, default: '取 消' }
  },
  computed: {
    hasSignature() {
      return this.points.length > 0
    },
    cancelText() {
      return this.hasSignature
        ? '清 空' : this.cancelBtnText
    }
  },
  data() {
    return {
      show: false,
      digitSignature: null,
      points: [],
      startX: 0,
      startY: 0,
      moveY: 0,
      moveX: 0,
      endY: 0,
      endX: 0,
      w: null,
      h: null,
      isDown: false,
      X: [],
      Y: []
    }
  },
  mounted() {
    let canvas = this.$refs.canvas
    canvas.height = this.$refs.canvasBox.offsetHeight
    canvas.width = this.$refs.canvasBox.offsetWidth - 10
    this.initCanvas(canvas)
  },
  methods: {
    touchStart(ev) {
      // console.log("touchStart")
      ev = ev || event
      ev.preventDefault()
      if (ev.touches.length == 1) {
        const trailObj = this.getTrail(ev)
        this.startX = trailObj.x
        this.startY = trailObj.y
        this.signatureMove(trailObj)
        this.points.push(trailObj)
      }
    }, // 移动端设备事件
    touchMove(ev) {
      // console.log("touchMove")
      ev = ev || event
      ev.preventDefault()
      if (ev.touches.length == 1) {
        const trailObj = this.getTrail(ev)
        this.moveY = trailObj.y
        this.moveX = trailObj.x
        this.signatureMove(trailObj)
        this.startY = trailObj.y
        this.startX = trailObj.x
        this.points.push(trailObj)
      }
    }, // 移动端设备事件
    touchEnd(ev) {
      // console.log("touchEnd")
      ev = ev || event
      ev.preventDefault()
      if (ev.touches.length == 1) {
        const trailObj = this.getTrail(ev)
        this.points.push(trailObj)
        this.points.push({ x: -1, y: -1 })
      }
    }, // 移动端设备事件
    doConfirm() {
      // alert('提交行为！')
      if (!this.points.length) {
        alert('请签名！')
        return
      }
      this.points.map(item => {
        this.X.push(item.x)
        this.Y.push(item.y)
      })
      /**
       * 签名所辐射的区域如果小于总屏幕的1/4，则签名太小，重新签名
       */
      let baseAcreage =
        (Math.max.apply(null, this.X) - Math.min.apply(null, this.X)) *
        (Math.max.apply(null, this.Y) - Math.min.apply(null, this.Y))
      let canvasAcreage = this.$refs.canvas.width * this.$refs.canvas.height
      if (canvasAcreage / baseAcreage >= 4) {
        alert("签名太小，请重新签名！")
        this.clearSignature()
      } else {
        let baseImg = this.$refs.canvas.toDataURL()
        this.dealImage(baseImg, 200, callback => {
          /**
           * 200为base64转码后，图片的宽度大小
           */
          this.show = true
          this.digitSignature = callback
          console.log(callback, "在这里提交数据")
        })
      }
    },
    //压缩图片
    dealImage(base64, w, callback) {
      var newImage = new Image()
      var quality = 0.6 // 压缩系数0-1之间
      newImage.src = base64
      newImage.setAttribute("crossOrigin", "Anonymous") //url为外域时需要
      var imgWidth, imgHeight
      newImage.onload = function() {
        imgWidth = this.width
        imgHeight = this.height
        var canvas = document.createElement("canvas")
        var ctx = canvas.getContext("2d")
        if (Math.max(imgWidth, imgHeight) > w) {
          if (imgWidth > imgHeight) {
            canvas.width = w
            canvas.height = (w * imgHeight) / imgWidth
          } else {
            canvas.height = w
            canvas.width = (w * imgWidth) / imgHeight
          }
        } else {
          canvas.width = imgWidth
          canvas.height = imgHeight
          quality = 0.6
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(this, 0, 0, canvas.width, canvas.height)
        const base64 = canvas.toDataURL("image/png", quality) // 压缩语句
        // 如想确保图片压缩到自己想要的尺寸,如要求在50-150kb之间，请加以下语句，quality初始值根据情况自定
        // while (base64.length / 1024 > 150) {
        // 	quality -= 0.01;
        // 	base64 = canvas.toDataURL("image/png", quality);
        // }
        // // 防止最后一次压缩低于最低尺寸，只要quality递减合理，无需考虑
        // while (base64.length / 1024 < 50) {
        // 	quality += 0.001;
        // 	base64 = canvas.toDataURL("image/png", quality);
        // }
        callback(base64)
      }
    },
    doCancel() {
      this.hasSignature
        ? this.clearSignature() : this.handleCancel()
    },
    clearSignature() {
      this.canvasTxt.clearRect(
        0,
        0,
        this.$refs.canvas.width,
        this.$refs.canvas.height
      )
      this.points = []
      this.Y = []
      this.X = []
      this.digitSignature = null
    },
    handleCancel() {
      alert('取消行为！')
    }
  }
}
</script>

<style lang="scss" scoped>
  @mixin btnStyle($background, $borderColor, $color) {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 2px;
    height: 38px;
    width: 50%;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    border: 1px solid $borderColor;
    background: $background;
    color: $color;
  }
  .digit-signature {
    position: absolute;
    bottom: 0;
    display: flex;
    flex-direction: column;
    width: 100%;
    background: #FFF;
    &__canvas {
      height: 140px;
    }
    &__btns {
      padding: 13px;
      display: flex;
      flex-direction: row;
    }
    &__btn-cancel {
      @include btnStyle(#FFF, rgba(151, 151, 151, 0.5), rgba(151, 151, 151, 0.5));
    }
    &__btn-confirm {
      margin-left: 15px;
      @include btnStyle(#4685FF, #4685FF, #FFF);
    }
  }

</style>
