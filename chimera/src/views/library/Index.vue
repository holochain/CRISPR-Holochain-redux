<template>
  <section>
    <v-overlay :absolute="true" :opacity="overlayOpacity" :value="splash" v-resize="onResizeSplash">
      <canvas id="network" width="1000" height="1000" :style="{ backgroundImage: 'url(' + require('@/assets/chimera-splash.png') + ')'}" style="backgroundSize: cover; background-repeat: no-repeat;"></canvas>
    </v-overlay>
    <v-toolbar flat>
      <v-btn icon  @click="$router.go(-1)">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-divider class="mx-3" inset vertical />
      <span class="title text-truncate">Applications</span>
      <v-spacer></v-spacer>
      <v-btn text to="/personas">
        <v-icon>mdi-account-multiple</v-icon>
        Personas
      </v-btn>
      <v-btn text to="/library/true">
        <v-icon>mdi-account-multiple-outline</v-icon>
        Profiles
      </v-btn>
      <v-icon @click="help=!help">mdi-help</v-icon>
    </v-toolbar>
    <v-alert v-model="help" dismissible border="left" colored-border color="deep-purple accent-4" elevation="2">
      Click on an application to get more information about it.
      <v-divider class="my-4 info" style="opacity: 0.22" />
      Click on 💻 Open to use the application.
      <v-divider class="my-4 info" style="opacity: 0.22" />
      Hover over the right side of the 💻 Open to reveal ⚙️ Settings
      <v-divider class="my-4 info" style="opacity: 0.22" />
      Click 🧬 Install to start the Installation process
      <v-divider class="my-4 info" style="opacity: 0.22" />
      Click <v-icon>mdi-account-multiple</v-icon> (Personas) to manage your personal information.
      <v-divider class="my-4 info" style="opacity: 0.22" />
      Click <v-icon>mdi-account-multiple-outline</v-icon> (Profiles) to manage your personal information for each application.
    </v-alert>
    <v-divider />
    <applications :showProfile="showProfile"/>
  </section>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'Library',
  components: {
    Applications: () => import('./Applications')
  },
  data () {
    return {
      showProfile: false,
      help: false,
      overlayOpacity: 1,
      timerCount: 100,
      network: undefined,
      vueCanvas: undefined,
      s: 0,
      height: 0,
      width: 0,
      sideLen: 500,
      sideNumb: 24,
      rotation: 0,
      fractals: 0,
      xCenter: 0,
      yCenter: 0,
      symbol: '',
      scale: 0,
      offSet: 0,
      ticks: 0,
      networks: 0,
      canvasAlpha: 0.5
    }
  },
  methods: {
    ...mapActions('auth', ['turnSplashOff']),
    onResizeSplash () {
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
        var alpha1 = this.canvasAlpha / (i + 1) * 1.5
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
        this.height = this.height / 2
        this.width = this.width / 2
        this.sideLen = this.sideLen / 2
        this.canvasAlpha = this.canvasAlpha / 2
        if (this.networks < 5) window.requestAnimationFrame(this.renderMainSymbol)
      } else {
        this.ticks = this.ticks + 1
        window.requestAnimationFrame(this.renderMainSymbol)
      }
    },
    drawMainSymbol () {
      this.network.width = this.width
      this.network.height = this.width
      this.vueCanvas.lineWidth = 5
      this.vueCanvas.lineCap = 'round'
      this.xCenter = this.width / 2
      this.yCenter = this.height / 2
      this.ticks = 1
      fetch('./symbol.txt')
        .then(response => response.text())
        .then((data) => {
          this.symbol = data
          this.vueCanvas.clearRect(0, 0, this.width, this.height)
          this.renderMainSymbol()
        })
    }
  },
  computed: {
    ...mapState('auth', ['splash'])
  },
  mounted () {
    this.network = document.getElementById('network')
    this.vueCanvas = this.network.getContext('2d')
    this.drawMainSymbol()
  },
  watch: {
    timerCount: {
      handler (value) {
        if (value > 0) {
          setTimeout(() => {
            this.timerCount--
            this.overlayOpacity = 0.01 * this.timerCount
          }, 100)
        } else {
          this.turnSplashOff()
        }
      },
      immediate: true // This ensures the watcher is triggered upon creation
    }
  }
}
</script>
