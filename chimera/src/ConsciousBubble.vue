<template>
  <v-app>
    <v-overlay v-if="splash" :absolute="true" :opacity="1" v-resize="onResizeSplash">
      <canvas id="network" width="1000" height="1000" :style="{ backgroundImage: 'url(' + require('@/assets/images/bubble.png') + ')', opacity: 1}" style="backgroundSize: cover; backgroundRepeat: no-repeat;"></canvas>
      <v-fade-transition mode="in-out">
        <v-overlay v-show="showOverlayImage" :absolute="true" opacity="0">
          <canvas id="overlayImage" width="1000" height="1000" :style="{ backgroundImage: 'url(' + require('@/assets/images/becoming-conscious-bubble.png') + ')', opacity: (1.2 - overlayOpacity) / 2 }" style="backgroundSize: cover; backgroundRepeat: no-repeat;"></canvas>
        </v-overlay>
      </v-fade-transition>
    </v-overlay>
  </v-app>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'ConsciousBubble',
  components: {
  },
  data () {
    return {
      showProfile: false,
      help: false,
      timerCount: 120,
      overlayOpacity: 1,
      showOverlayImage: false,
      network: undefined,
      vueCanvas: undefined,
      s: 0,
      height: 0,
      width: 0,
      sideLen: 500,
      sideNumb: 96,
      rotation: 30 * Math.PI / 180,
      fractals: 0,
      xCenter: 0,
      yCenter: 0,
      symbol: '',
      scale: 0,
      offSet: 0,
      ticks: 0,
      networks: 0,
      canvasAlpha: 1,
      image: 'bubble.png'
    }
  },
  methods: {
    ...mapActions('auth', ['turnSplashOff', 'turnSplashOn']),
    onResizeSplash () {
      console.log('onResizeSplash')
      if (window.innerHeight < window.innerWidth) {
        this.width = window.innerHeight * 0.9
      } else {
        this.width = window.innerWidth * 0.9
      }
      this.height = this.width
      this.sideLen = this.width / 2
    },
    renderMainSymbol () {
      var i
      for (i = 0; i < this.sideNumb / 2; i++) {
        this.vueCanvas.beginPath()
        const posX = this.xCenter + this.sideLen * Math.cos(this.rotation + ((this.ticks - 1) * 2 * Math.PI / this.sideNumb))
        const posXto = this.xCenter + this.sideLen * Math.cos(this.rotation + ((this.ticks + i) * 2 * Math.PI / this.sideNumb))
        const posY = this.yCenter + this.sideLen * Math.sin(this.rotation + ((this.ticks - 1) * 2 * Math.PI / this.sideNumb))
        const posYto = this.yCenter + this.sideLen * Math.sin(this.rotation + ((this.ticks + i) * 2 * Math.PI / this.sideNumb))
        this.vueCanvas.moveTo(posX, posY)
        var gradient = this.vueCanvas.createLinearGradient(posX, posY, posXto, posYto)
        var alpha1 = this.canvasAlpha / (i + 0.1) * 1.5
        gradient.addColorStop(0, 'rgb(128,0,128, ' + alpha1 + ')')
        gradient.addColorStop(0.5, 'rgb(0,128,128, ' + alpha1 / 2 + ')')
        gradient.addColorStop(1, 'rgb(128,0,128, ' + alpha1 + ')')
        this.vueCanvas.strokeStyle = gradient
        this.vueCanvas.lineTo(posXto, posYto)
        this.vueCanvas.stroke()
        this.vueCanvas.closePath()
      }

      if (this.ticks > (this.sideNumb - 1)) {
        this.networks += 1
        this.ticks = 1
        this.height = this.height / 1.4
        this.width = this.width / 1.4
        this.sideLen = this.sideLen / 1.4
        this.canvasAlpha = this.canvasAlpha / 1.4
        this.vueCanvas.lineWidth = this.vueCanvas.lineWidth * 1.2
        this.sideNumb = this.sideNumb / 2
        if (this.networks < 6) {
          window.requestAnimationFrame(this.renderMainSymbol)
        } else {
          this.showOverlayImage = true
        }
      } else {
        this.ticks = this.ticks + 1
        setTimeout(() => {
          window.requestAnimationFrame(this.renderMainSymbol)
        }, 25 * this.networks)
      }
    },
    drawMainSymbol () {
      document.getElementById('overlayImage').width = this.width
      document.getElementById('overlayImage').height = this.width
      this.network.width = this.width
      this.network.height = this.width
      this.vueCanvas.lineWidth = 2
      this.vueCanvas.lineCap = 'round'
      this.xCenter = this.width / 2 + 5
      this.yCenter = this.height / 2
      this.ticks = 1
      this.vueCanvas.clearRect(0, 0, this.width, this.height)
      this.renderMainSymbol()
    },
    redrawMainSymbol () {
      if (window.innerHeight < window.innerWidth) {
        this.width = window.innerHeight * 0.9
      } else {
        this.width = window.innerWidth * 0.9
      }
      this.height = this.width
      this.sideLen = this.width / 2
      this.image = 'bubble.png'
      this.network = document.getElementById('network')
      this.vueCanvas = this.network.getContext('2d')
      this.timerCount = 120
      this.overlayOpacity = 1
      this.s = 0
      this.sideLen = this.width / 2.08
      this.sideNumb = 96
      this.rotation = 30 * Math.PI / 180
      this.fractals = 0
      this.xCenter = 0
      this.yCenter = 0
      this.symbol = ''
      this.scale = 0
      this.offSet = 0
      this.ticks = 0
      this.networks = 0
      this.canvasAlpha = 1
      this.drawMainSymbol()
    }
  },
  computed: {
    ...mapState('auth', ['splash'])
  },
  mounted () {
    this.redrawMainSymbol()
  },
  watch: {
    timerCount: {
      handler (value) {
        if (value > 0) {
          if (value < 80) this.image = 'becoming-conscious-bubble.png'
          if (value < 40) this.image = 'conscious-bubble.png'
          setTimeout(() => {
            this.timerCount--
            this.overlayOpacity = value / 50
          }, 100)
        } else {
          // this.redrawMainSymbol()
        }
      },
      immediate: true // This ensures the watcher is triggered upon creation
    }
  }
}
</script>

<style>
.child {
  position: absolute;
  top: 0;
  left: 0;
}

.parent {
  position: relative;
}
</style>
