<template>
  <v-app light>
    <v-navigation-drawer :clipped="clipped" v-model="drawer" enable-resize-watcher app>
      <v-toolbar flat>
        <v-list>
          <v-list-tile>
            <v-list-tile-title class="title">
              Nav Links
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-divider></v-divider>
      <v-list dense class="pt-0">
        <v-list-tile v-for="item in items" :key="item.title" @click="redirect(item.route)">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app :clipped-left="clipped">
      <v-toolbar-side-icon @click.stop="drawer = !drawer" light></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <span class="mr-20">Network status: <strong>{{ networkStatus }}</strong></span>
    </v-toolbar>
    <main>
      <v-content>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-content>
    </main>
    <v-footer :fixed="fixed" app>
      <span class="copyright">&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        clipped: false,
        drawer: true,
        fixed: false,
        items: [
          { title: 'Home', icon: 'dashboard', route: 'home' },
          { title: 'Forms', icon: 'assignment', route: 'list' },
          { title: 'About', icon: 'question_answer', route: 'home' }
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'PWA Offline Management',
        networkStatus: null
      }
    },
    watch: {
      // call again the method if the route changes
      '$route': 'fetchData'
    },
    created () {
      this.fetchData()
    },
    methods: {
      redirect (routeName) {
        this.$router.push({ name: routeName })
      },
      fetchData () {
        this.networkStatus = navigator.onLine ? 'online' : 'offline'
      }
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'

  footer span.copyright {

  }

  footer span.copyright a {
    text-decoration: none;
  }
</style>
