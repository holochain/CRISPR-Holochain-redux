<template>
  <v-card class="d-flex flex-row ma-0 pa-0" flat tile>
    <v-card width="100%" class="ma-0 pa-0" flat>
      <div :id="'waveform-' + this.track.id" />
    </v-card>
  </v-card>
</template>

<script>
import WaveSurfer from 'wavesurfer.js'
export default {
  name: 'TrackSurfer',
  components: {

  },
  data () {
    return {
      wavesurfer: {}
    }
  },
  props: ['track', 'play', 'playedTime'],
  methods: {
    skipForward: function () {
      console.log('skip f')
      const skipTime = this.wavesurfer.getCurrentTime() + this.wavesurfer.getDuration() / 25
      this.wavesurfer.setCurrentTime(skipTime)
    },
    skipBackward: function () {
      console.log('skip b')
      const skipTime = Math.max(0, this.wavesurfer.getCurrentTime() - this.wavesurfer.getDuration() / 25)
      this.wavesurfer.setCurrentTime(skipTime)
    },
    stop: function () {
      console.log('stop')
      this.wavesurfer.stop()
      this.$emit('played', 0, 'stop')
    },
    setCurrentTime: function (playedTime) {
      console.log('setCurrentTime')

      this.wavesurfer.setCurrentTime(playedTime)
    }
  },
  mounted: function () {
    const that = this
    this.wavesurfer = WaveSurfer.create({
      container: '#waveform-' + this.track.id,
      waveColor: this.$vuetify.theme.currentTheme.wave,
      progressColor: this.$vuetify.theme.currentTheme.action,
      cursorColor: '#00000000', // this.$vuetify.theme.currentTheme.action,
      barWidth: 2,
      barHeight: 1,
      backend: 'MediaElement'
    })

    console.log('this.track.src', this.track.src)
    if (this.track.pcm) {
      this.wavesurfer.load(this.track.src, this.track.pcm)
    } else {
      this.wavesurfer.load(this.track.src)
    }

    this.wavesurfer.on('audioprocess', function () {
      that.$emit('played', that.wavesurfer.getCurrentTime(), 'audioprocess')
    })

    this.wavesurfer.on('seek', function () {
      that.$emit('played', that.wavesurfer.getCurrentTime(), 'seek')
    })

    this.wavesurfer.on('waveform-ready', function () {
      if (!that.track.pcm) {
        var pcmData = that.wavesurfer.exportPCM(1024, 10000, false)
        console.log('pcm: ' + pcmData)
        console.log('')
        console.log('')
      }
    })

    this.wavesurfer.on('ready', function () {
      that.$emit('duration', that.wavesurfer.getDuration())
    })
  },
  watch: {
    play: function (play) {
      if (play) {
        this.wavesurfer.play()
      } else {
        this.wavesurfer.pause()
      }
    }
  }
}
</script>
