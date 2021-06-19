<template>
  <q-page class="flex column">
    <q-list bordered separator>
      <q-item v-for="project in projects" :key="project.id" clickable v-ripple>
        <q-item-section>
          {{ project.name }}
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
export default {
  name: 'Projects',
  data() {
    return {
      projects: []
    }
  },
  created() {
    // FIXME: refactor. prototype

    this.$gitlabApi.get('/projects?membership=true')
      .then(({ data }) => {
        this.projects = data
      })
      .catch(error => {
        console.error(error)
      })
  }
}
</script>

<style scoped>

</style>
