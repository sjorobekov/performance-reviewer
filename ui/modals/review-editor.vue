<template>
  <v-dialog v-model="isOpen" max-width="500px">
    <v-card>
      <v-card-title>
        <span v-if="isNew" class="headline">New Review</span>
        <span v-else class="headline">Edit Review</span>
      </v-card-title>

      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex md12>
              <v-form
                ref="form"
                v-model="valid"
                lazy-validation
              >
                <fieldset>
                  <v-select
                    v-model="item.employee_id"
                    :items="users"
                    item-text="fullname"
                    item-value="id"
                    label="Employee"
                  />
                </fieldset>
              </v-form>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn color="blue darken-1" flat @click="close">
          Close
        </v-btn>

        <v-btn color="blue darken-1"
               flat
               @click="save"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  $_veeValidate: {
    validator: 'new'
  },
  props: {
    value: Boolean,
    item: {
      type: Object,
      default: function () {
        return {}
      },
    },
  },
  data () {
    return {
      users: [],
      valid: false,
    }
  },
  computed: {
    isNew () {
      return !this.item.id
    },
    isOpen: {
      get () {
        return this.value
      },
      set (value) {
        this.$validator.reset()
        this.$emit('input', value)
      },
    },
  },

  async mounted() {
    await this.getUsersList()
  },

  methods: {
    close () {
      this.isOpen = false
      this.$emit('on-close')
    },

    async getUsersList() {
      const users = await this.$store.dispatch('users/getUnpaginated')
      this.users = [{ fullname: 'Unassaigned', id: null }, ...users]
    },

    async save () {
      await this.$validator.validateAll()

      if (this.$validator.errors.count() > 0) {
        return
      }

      if (this.isNew) {
        this.$store.dispatch('reviews/create', this.item)
      } else {
        this.$store.dispatch('reviews/update', this.item)
      }
      this.isOpen = false
      this.$emit('on-save', this.item)
    },
  },

}
</script>

<style scoped>
  fieldset {
    border: none;
  }
</style>
