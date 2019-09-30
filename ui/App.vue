<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
      absolute
      temporary
      width="200"
    >
      <v-toolbar flat>
        <v-list>
          <v-list-tile>
            <v-list-tile-title class="title">
              Actions
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <v-divider />

      <v-list dense class="pt-0">
        <v-list-tile v-if="this.$store.getters['security/isAdmin']" :to="{name: 'Users'}">
          <v-list-tile-action>
            <v-icon>people</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>Users</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile v-if="this.$store.getters['security/isAdmin']" :to="{name: 'Reviews'}">
          <v-list-tile-action>
            <v-icon>rate_review</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>Reviews</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile v-if="this.$store.getters['security/isLoggedIn']" @click.stop="signOut">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>Sign Out</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-else :to="{name: 'SignIn'}">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>Sign In</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar app color="primary">
      <v-toolbar-side-icon class="hidden-md-and-up" @click.stop="drawer = !drawer" />
      <v-toolbar-title>
        <router-link class="toolbar-title" :to="{name: 'DoReview'}">
          App
        </router-link>
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn v-if="this.$store.getters['security/isAdmin']"
               flat
               :to="{name: 'Users'}"
        >
          Users
        </v-btn>
        <v-btn v-if="this.$store.getters['security/isAdmin']"
               flat
               :to="{name: 'Reviews'}"
        >
          Reviews
        </v-btn>
        <v-btn v-if="this.$store.getters['security/isLoggedIn']" flat @click.stop="signOut">
          Sign Out
        </v-btn>
        <v-btn v-else flat :to="{name: 'SignIn'}">
          Sign In
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container v-if="this.$router.currentRoute.name === 'SignIn'" row fill-height>
        <router-view />
      </v-container>
      <v-container v-else fluid>
        <router-view />
      </v-container>
    </v-content>
    <v-footer app />
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      drawer: false,
    }
  },
  methods: {
    async signOut() {
      try {
        await this.$store.dispatch('security/signOut')
        this.$router.push({name: 'SignIn'})
      } catch (e) {}
    },
  },
}
</script>

<style lang="stylus">
@import url('https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons')
@import '~vuetify/src/stylus/main'

#app {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.toolbar-title
  color black
  text-decoration none
</style>
