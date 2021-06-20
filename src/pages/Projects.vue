<template>
  <q-page class="flex">
    <div class="col-grow">
      <q-scroll-area style="height: 100%">
        <q-item>
          <q-item-section>No. of Projects: {{ projects.length }}</q-item-section>
        </q-item>

        <q-linear-progress v-if="projectsLoading" indeterminate/>

        <q-list bordered separator>
          <q-item v-for="project in projects"
                  :key="project.id"
                  :to="{ name: 'issues', params: { projectId: project.id }}"
                  clickable
                  v-ripple>
            <q-item-section>
              {{ project.name }}
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Projects',
  data() {
    return {
      projects: [],
      projectsLoading: false
    }
  },
  created() {
    // FIXME: refactor. prototype
    this.projectsLoading = true
    this.$gitlabApi.get('/projects?membership=true')
      .then(({ data }) => {
        this.projects = data
        this.projectsLoading = false
      })
      .catch(error => {
        console.error(error)
        this.projectsLoading = false
      })
  }
}
</script>

<style scoped>

</style>
