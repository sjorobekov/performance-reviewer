<template>
  <div>
    <v-toolbar class="elevation-1" color="white">
      <v-toolbar-title>Reviews</v-toolbar-title>

      <v-spacer />

      <v-btn
        color="primary"
        dark
        fab
        small
        @click.stop="createItem"
      >
        <v-icon>person_add</v-icon>
      </v-btn>

      <ReviewEditor v-model="dialog"
                    :item="editedItem"
                    @on-save="onSave"
      />
    </v-toolbar>

    <v-data-table :headers="headers"
                  :items="items"
                  :pagination.sync="pagination"
                  :rows-per-page-items="rowsPerPageItems"
                  :total-items="total"
                  :loading="loading"
                  class="elevation-1"
                  :must-sort="true"
    >
      <template v-slot:items="props">
        <td>
          <router-link :to="{ name: 'ReviewDetails', params: { reviewId: props.item.id }}">
            {{ props.item.employee.fullname }}
          </router-link>
        </td>
        <td>
          {{ props.item.createdBy ? props.item.createdBy.fullname : '' }}
        </td>
        <td>
          <v-chip color="primary"
                  class="white--text"
                  small
          >
            {{ props.item.status }}
          </v-chip>
        </td>
        <td>
          <v-icon small @click="editItem(props.item)">
            edit
          </v-icon>
          <v-icon small
                  @click="removeItem(props.item)"
          >
            delete
          </v-icon>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import ReviewEditor from '@/modals/review-editor'

export default {
  components: {
    ReviewEditor,
  },

  data() {
    return {
      loading: true,
      dialog: false,
      editedItem: {},
      total: 0,
      items: [],
      pagination: {
        rowsPerPage: 20,
        page: 1,
      },
      rowsPerPageItems: [20],
      headers: [
        {
          text: 'Employee',
          align: 'left',
          value: 'fullname',
          sortable: false,
        },
        {
          text: 'Created By',
          align: 'left',
          value: 'email',
          sortable: false,
        },
        {
          text: 'Status',
          align: 'left',
          value: 'role',
          sortable: false,
        },
        {
          text: 'Actions',
          sortable: false,
        }
      ]
    }
  },
  watch: {
    pagination: {
      handler () {
        this.refresh()
      },
      deep: true
    },
  },
  methods: {
    refresh () {
      this.loading = true
      this.$store.dispatch('reviews/getList', this.pagination)
        .then(({ data, total }) => {
          this.loading = false
          this.items = data
          this.total = parseInt(total, 10)
        })
    },
    editItem (item) {
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    createItem () {
      this.editedItem = {}
      this.dialog = true
    },

    removeItem(item) {
      if (confirm('Are you sure?')) {
        this.$store.dispatch('reviews/remove', item)
      }
    },

    onSave () {
      this.refresh()
    },

    toggleSorting () {
      this.pagination.descending = !this.pagination.descending
    }
  },

}
</script>
