<template>
  <q-layout view="lHh Lpr lFf">

    <q-header>
      <q-toolbar>
        <q-breadcrumbs active-color="white">
          <q-breadcrumbs-el label="Home" to="/"/>
          <q-breadcrumbs-el label="Projects" to="/projects"/>
        </q-breadcrumbs>

        <q-space/>

        <q-btn to="/projects" icon="home" flat round dense/>
        <q-btn to="/settings" icon="settings" flat round dense/>
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
    return {
      leftDrawerOpen: false
    }
  },
  created() {
    this.$gitlabApi.defaults.baseURL = localStorage.gitlabApiUrl
    this.$gitlabApi.defaults.headers['PRIVATE-TOKEN'] = localStorage.gitlabAccessToken
  },
  updated() {
    console.log(this.$route.path.split('/'))
  }
}
</script>

<style>
</style>
