<template>
  <div>
    <v-toolbar class="elevation-1" color="white">
      <v-toolbar-title>Review details about {{ review._employee.fullname }}</v-toolbar-title>
      <v-spacer />
    </v-toolbar>

    <v-data-table :headers="headers"
                  :items="items"
                  :pagination.sync="pagination"
                  hide-actions
                  class="elevation-1"
    >
      <template v-slot:items="props">
        <td>
          {{ props.item.assignee_fullname }}
        </td>
        <td>
          <v-rating v-if="props.item.rating" v-model="props.item.rating" readonly />
          <span v-else>Haven't put rating yet</span>
        </td>
        <td>
          <v-icon
            small
            class="mr-2"
            @click="removeItem(props.item)"
          >
            delete
          </v-icon>
        </td>
      </template>
    </v-data-table>

    <v-card class="mt-1">
      <v-form>
        <v-container>
          <v-layout>
            <v-flex
              xs8
              md10
            >
              <v-select
                v-model="item.assignee_id"
                :items="users"
                item-text="fullname"
                item-value="id"
                label="Assignee"
              />
            </v-flex>
            <v-flex
              xs4
              md2
            >
              <v-btn :disabled="!item.assignee_id" @click="createItem()">
                Add Reviewer
              </v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    reviewId: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      loading: true,
      dialog: false,
      editedItem: {},
      total: 0,
      review: {
        _employee: {},
      },
      items: [],
      item: {},
      users: [],
      pagination: {
        rowsPerPage: -1,
      },
      headers: [
        {
          text: 'Assignee',
          align: 'left',
          value: '',
        },
        {
          text: 'Rating',
          align: 'left',
          value: 'rating',
          sortable: false,
        },
        {
          text: 'Actions',
          sortable: false,
        }
      ]
    }
  },

  async beforeMount() {
    await this.getReview()
    this.getItems()
    this.getUsersList()
  },

  methods: {
    async getReview () {
      this.review = await this.$store.dispatch('reviews/getById', this.reviewId)
    },

    async getItems() {
      this.items = await this.$store.dispatch('reviews/getItems', this.reviewId)
    },

    async createItem () {
      this.item.review_id = this.reviewId
      const item = await this.$store.dispatch('reviews/addItem', this.item)
      this.items.push(item)
      this.item = {}
    },

    async removeItem(item) {
      if (confirm('Are you sure?')) {
        await this.$store.dispatch('reviews/removeItem', {
          review_id: this.reviewId,
          id: item.id,
        })
        const index = this.items.indexOf(item)
        this.items.splice(index, 1)
      }
    },

    async getUsersList() {
      this.users = await this.$store.dispatch('users/getUnpaginated')
    },
  },
}
</script>
