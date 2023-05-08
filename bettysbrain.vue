<template>
  <div id="container" v-if="url">
    <content
      v-if="view === 'dashboard'"
      :id="dashboardURL"
      :scope="scope"
    />
    <content
      v-else-if="view === 'app'"
      :id="appURL"
      :scope="scope"
    />
    <span v-else>Unknown view search param: "{{ view  }}</span>
  </div>
</template>

<script>
  // this wrapper expects the query to look something like this:
  // ?view=dashboard&scope=SCOPE&name=USERNAME&id=USERID&map=climate-change&local=true
  export default {
    data() {
      return {
        url: null
      }
    },
    async created() {
      this.url = window.location.href
    },
    computed: {
      URL() {
        return new URL(this.url)
      },
      local() {
        return this.URL.searchParams.get('local') !== null
      },
      module() {
        return this.URL.searchParams.get('module') || 'climate-change'
      },
      view() {
        return this.URL.searchParams.get('view') || 'app'
      },
      dashboardHostname() {
        return this.local ? 'localhost:3000' : 'dev.bettysbrain-teacherdashboard.pages.dev'
      },
      appHostname() {
        return this.local ? 'localhost:6060' : 'bettysbrain.pages.dev'
      },
      dashboardURL() {
        return `https://${this.dashboardHostname}/${this.module}${this.URL.search}`
      },
      appURL() {
        return `https://${this.appHostname}/${this.module}${this.URL.search}`
      },
      scope() {
        return this.URL.searchParams.get('scope')
      }
    }
  }
</script>

<style>

#container
{
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
}

</style>
