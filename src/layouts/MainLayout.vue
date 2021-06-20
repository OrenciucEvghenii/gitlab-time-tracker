<template>
  <q-layout view="lHh Lpr lFf">

    <q-header>
      <q-toolbar>
        <q-breadcrumbs active-color="white">
          <q-breadcrumbs-el :to="{ name: 'dashboard' }" icon="dashboard"/>
          <q-breadcrumbs-el v-if="isRouteProjects || isRouteIssues" :to="{ name: 'projects' }" label="Projects"/>
          <q-breadcrumbs-el v-if="isRouteIssues" label="Issues"/>
          <q-breadcrumbs-el v-if="isRouteReport" label="Report"/>
          <q-breadcrumbs-el v-if="isRouteSettings" label="Settings"/>
        </q-breadcrumbs>

        <q-space/>

        <q-btn :to="{name: 'settings'}" icon="settings" flat round dense/>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view/>
    </q-page-container>

  </q-layout>
</template>

<script>

export default {
  name: 'MainLayout',
  components: {},
  data() {
    return {}
  },
  computed: {
    // FIXME: temporary solution. refactor! need better strategy for generating breadcrumbs
    isRouteDashboard() {
      return this.$route.name === 'dashboard'
    },
    isRouteProjects() {
      return this.$route.name === 'projects'
    },
    isRouteIssues() {
      return this.$route.name === 'issues'
    },
    isRouteReport() {
      return this.$route.name === 'report'
    },
    isRouteSettings() {
      return this.$route.name === 'settings'
    }
  },
  created() {
    this.$gitlabApi.defaults.baseURL = localStorage.gitlabApiUrl
    this.$gitlabApi.defaults.headers['PRIVATE-TOKEN'] = localStorage.gitlabAccessToken
  }
}
</script>

<style>
</style>
