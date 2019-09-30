<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md3>
      <v-form id="check-login-form"
              ref="form"
              v-model="error"
              @submit.prevent="signIn"
      >
        <h4 class="display-1 text-md-center mb-3">
          Sign In
        </h4>

        <v-text-field v-model="email"
                      prepend-icon="email"
                      label="Email"
                      type="email"
                      required
        />

        <v-text-field v-model="password"
                      prepend-icon="lock"
                      name="password"
                      label="Password"
                      type="password"
                      required
        />

        <v-layout>
          <v-btn color="success"
                 type="submit"
                 large
                 block
          >
            Sign In
          </v-btn>
        </v-layout>
        <v-snackbar
          v-model="snackbar"
          :top="true"
        >
          {{ snackbarMessage }}
          <v-btn
            color="pink"
            flat
            @click="error = false"
          >
            Close
          </v-btn>
        </v-snackbar>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      error: '',
      snackbar: false,
      snackbarMessage: '',
    }
  },
  methods: {
    async signIn() {
      try {
        await this.$store.dispatch('security/signIn', {
          email: this.email,
          password: this.password
        })

        this.$router.push({name: 'Dashboard'})
      } catch (e) {
        if (e.response.status === 401) {
          this.snackbarMessage = 'Wrong email or password'
        } else {
          this.snackbarMessage = 'Unknown error'
        }
        this.snackbar = true
      }
    },
  },
}
</script>
