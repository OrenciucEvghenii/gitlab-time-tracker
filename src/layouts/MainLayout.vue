<template>
  <q-layout view="lHh Lpr lFf">

    <q-header>
      <q-toolbar>
        <q-toolbar-title>
          <q-btn to="/" label="GitLab Time Tracker" flat dense/>
        </q-toolbar-title>
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
  data () {
    return {
      leftDrawerOpen: false
    }
  }
}
</script>

<style>
</style>
