<template>
  <q-page class="flex">
    <div class="col-grow">
      <q-scroll-area style="height: 100%">
        <q-item>
          <q-item-section>No. of Projects: {{ projects.length }}</q-item-section>
        </q-item>

        <q-linear-progress v-if="projectsLoading" indeterminate/>

        <q-list bordered separator>
          <q-item v-for="project in sortedProjects" :key="project.id">
            <q-item-section>
              <div>
                <q-btn type="a" :href="project.web_url" target="_blank" icon="launch" size="sm" flat dense/>
                {{ project.name }} ({{project.id}})
              </div>
            </q-item-section>
            <q-btn icon="push_pin" @click="toggleProjectPined(project.id)" :color="isProjectPined(project.id) ? 'primary' : 'black'" size="sm" flat dense/>
            <q-btn :to="{ name: 'issues', params: { projectId: project.id }}"
                   label="Issues"
                   icon-right="navigate_next"
                   no-caps
                   flat/>
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
      pinedProjectIds: [],
      projectsLoading: false
    }
  },
  computed: {
    sortedProjects() {
      const sortedProjects = [...this.projects]

      return sortedProjects.sort((first, second) => {
        if (this.isProjectPined(first.id) && !this.isProjectPined(second.id)) {
          return -1
        } else if (!this.isProjectPined(first.id) && this.isProjectPined(second.id)) {
          return 1
        } else {
          return 0
        }
      })
    }
  },
  created() {
    // FIXME: refactor. prototype
    this.projectsLoading = true
    this.$gitlabApi.get('/projects?membership=true')
      .then(({ data }) => {
        if (localStorage.pinedProjectIds) {
          this.pinedProjectIds = localStorage.pinedProjectIds.split(',').map(id => parseInt(id))
        }

        this.projects = data
        this.projectsLoading = false
      })
      .catch(error => {
        console.error(error)
        this.projectsLoading = false
      })
  },
  methods: {
    toggleProjectPined(projectId) {
      if (this.isProjectPined(projectId)) {
        const pinedProjectIndex = this.pinedProjectIds.indexOf(projectId)
        this.pinedProjectIds.splice(pinedProjectIndex, 1)
      } else {
        this.pinedProjectIds.push(projectId)
      }

      localStorage.pinedProjectIds = this.pinedProjectIds
    },
    isProjectPined(projectId) {
      return this.pinedProjectIds.includes(projectId)
    }
  }
}
</script>

<style scoped>

</style>
