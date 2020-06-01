<template>
  <v-container
    id="subscribe"
    tag="section"
  >
    <base-card
      color="rgba(203, 170, 92, 0.51)"
      class="pa-3"
    >
      <v-container>
        <v-row>
          <v-col
            cols="12"
            md="5"
          >
            <base-subheading class="mb-3">
              Subscribe
            </base-subheading>

            <p>
              Enter your email address to subscribe to this blog
              and receive notifications of new posts by email.
            </p>

            <v-row class="pa-2">
              <v-responsive
                class="overflow-visible mr-2"
                max-width="400"
              >
                <v-text-field
                  hide-details
                  label="Your Email Address"
                  solo
                />
              </v-responsive>

              <v-btn
                :block="$vuetify.breakpoint.xsOnly"
                class="ma-0"
                color="secondary"
                style="height: 48px"
              >
                Subscribe
              </v-btn>
            </v-row>
          </v-col>

          <v-col
            cols="12"
            md="6"
            offset-md="1"
          >
            <base-subheading>Contact</base-subheading>

            <v-list class="transparent">
              <v-list-item>
                <v-list-item-avatar
                  color="primary"
                >
                  <v-icon
                    class="elevation-4"
                    dark
                  >
                    mdi-email-outline
                  </v-icon>
                </v-list-item-avatar>

                <v-list-item-title>EMAIL</v-list-item-title>

                <v-list-item-subtitle>
                  THEARTOFTRAVEL@GMAIL.COM
                </v-list-item-subtitle>
              </v-list-item>

              <v-list-item>
                <v-list-item-avatar color="primary">
                  <v-icon
                    class="elevation-4"
                    dark
                  >
                    mdi-map-marker
                  </v-icon>
                </v-list-item-avatar>

                <v-list-item-title>ADDRESS</v-list-item-title>

                <v-list-item-subtitle>
                  1234 WORLD DR. HERE, TX 76123
                </v-list-item-subtitle>
              </v-list-item>

              <v-list-item>
                <v-list-item-avatar color="primary">
                  <v-icon
                    class="elevation-4"
                    dark
                  >
                    mdi-phone
                  </v-icon>
                </v-list-item-avatar>

                <v-list-item-title>PHONE</v-list-item-title>

                <v-list-item-subtitle>
                  555-789-1234
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-container>
    </base-card>
  </v-container>
</template>

<script>
  export default {
    name: 'HomeSubscribe',
  }
</script>
