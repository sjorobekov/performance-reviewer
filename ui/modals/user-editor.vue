<template>
  <v-dialog v-model="isOpen" max-width="500px">
    <v-card>
      <v-card-title>
        <span v-if="isNew" class="headline">New User</span>
        <span v-else-if="isEditable" class="headline">Edit User</span>
        <span v-else class="headline">View User</span>
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
                <fieldset :disabled="!isEditable">
                  <v-text-field
                    v-model="item.fullname"
                    v-validate="'required'"
                    label="Fullname"
                    required
                    :error-messages="errors.collect('fullname')"
                    data-vv-name="fullname"
                  />

                  <v-text-field
                    v-model="item.email"
                    v-validate="`required|email|unique:${item.id}`"
                    label="E-mail"
                    required
                    name="autocomplete_false"
                    :error-messages="errors.collect('email')"
                    data-vv-name="email"
                    type="email"
                  />

                  <v-text-field
                    v-if="isNew"
                    v-model="item.password"
                    v-validate="'required'"
                    label="Password"
                    :error-messages="errors.collect('password')"
                    data-vv-name="password"
                    type="password"
                    autocomplete="new-password"
                  />

                  <v-text-field
                    v-else
                    v-model="item.password"
                    label="Password"
                    type="password"
                    autocomplete="new-password"
                  />

                  <v-radio-group v-model="item.role" :disabled="item.role === 'SUPERUSER'">
                    <v-radio label="User" value="USER" />
                    <v-radio label="Admin" value="ADMIN" />
                    <v-radio v-if="item.role === 'SUPERUSER'" label="Superuser" value="SUPERUSER" />
                  </v-radio-group>
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

        <v-btn v-if="isEditable"
               color="blue darken-1"
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
import { Validator } from 'vee-validate'
import axios from 'axios'

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
    isEditable() {
      return this.$store.getters['security/isAdmin']
    },
  },

  mounted() {
    const isUnique = async (email, [id]) => {
      const { data } = await axios.post('/api/v1/validation/check_email', {
        email,
        id
      })
      return data
    }
    Validator.extend('unique', {
      validate: isUnique,
      getMessage: (field, params, data) => data.message
    })
  },

  methods: {
    close () {
      this.isOpen = false
      this.$emit('on-close')
    },

    async save () {
      await this.$validator.validateAll()

      if (this.$validator.errors.count() > 0) {
        return
      }

      if (this.isNew) {
        this.$store.dispatch('users/create', this.item)
      } else {
        this.$store.dispatch('users/update', this.item)
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
