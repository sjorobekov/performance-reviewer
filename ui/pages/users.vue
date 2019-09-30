<template>
  <div>
    <v-toolbar class="elevation-1" color="white">
      <v-toolbar-title>Users</v-toolbar-title>

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

      <UserEditor v-model="dialog"
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
          {{ props.item.fullname }}
        </td>
        <td>
          {{ props.item.email }}
        </td>
        <td>
          <v-chip color="black"
                  class="white--text"
                  small
          >
            {{ props.item.role }}
          </v-chip>
        </td>
        <td>
          <v-icon
            small
            class="mr-2"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import UserEditor from '@/modals/user-editor'

export default {
  components: {
    UserEditor,
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
        sortBy: 'fullname'
      },
      rowsPerPageItems: [20],
      headers: [
        {
          text: 'Fullname',
          align: 'left',
          value: 'fullname',
        },
        {
          text: 'Email',
          align: 'left',
          value: 'email',
          sortable: false,
        },
        {
          text: 'Role',
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
      this.$store.dispatch('users/getList', this.pagination)
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
      this.editedItem = { role: 'EMPLOYEE', status: 'ACTIVE' }
      this.dialog = true
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
