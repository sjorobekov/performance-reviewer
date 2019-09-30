<template>
  <v-layout>
    <v-flex xs12>
      <v-card v-if="review.id" class="mx-auto" width="300">
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">
              Performance review of {{ review.employee_fullname }}
            </h3>
            <div>Let us know your opinion</div>
          </div>
        </v-card-title>
        <v-card-text>
          <form>
            <v-rating v-model="review.rating" />

            <v-textarea
              v-model="review.feedback"
              name="input-7-1"
              label="Feedback"
              hint="Please write your feedback"
              maxlength="255"
            />
          </form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="success" @click="sendReview()">
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>

      <v-card v-else class="mx-auto" width="300">
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">
              Good news!
            </h3>
            <div>You have nothing to review</div>
          </div>
        </v-card-title>
      </v-card>
    </v-flex>
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
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      snackbar: false,
      snackbarMessage: '',
      review: {},
      loading: false,
    }
  },

  async beforeMount() {
    this.review = await this.$store.dispatch('reviews/fetchPending')
  },

  methods: {
    async sendReview() {
      try {
        this.loading = true
        await this.$store.dispatch('reviews/updateItem', this.review)
        this.review = await this.$store.dispatch('reviews/fetchPending')
      } catch (e) {
        this.snackbarMessage = 'Unknown error'
        this.snackbar = true
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
