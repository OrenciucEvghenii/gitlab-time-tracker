<template>
  <div class="col-grow">
    <q-scroll-area style="height: 100%">
      <header>
        <q-item>
          <q-item-section>
            <slot name="header" :count="sortedProjects.length"></slot>
          </q-item-section>
        </q-item>
      </header>

      <q-linear-progress v-if="projectsLoading" indeterminate/>

      <q-list bordered separator>
        <ProjectListItem v-for="project in sortedProjects"
                         :key="project.id"
                         :project="project"
                         :is-pinned="isProjectPinned(project.id)"
                         @pinClicked="toggleProjectPined(project.id)"/>
      </q-list>
    </q-scroll-area>
  </div>
</template>

<script>

import ProjectListItem from 'components/ProjectListItem'

export default {
  name: 'ProjectList',
  props: ['pinnedOnly'],
  components: { ProjectListItem },
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
        if (this.isProjectPinned(first.id) && !this.isProjectPinned(second.id)) {
          return -1
        } else if (!this.isProjectPinned(first.id) && this.isProjectPinned(second.id)) {
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
      if (this.isProjectPinned(projectId)) {
        const pinedProjectIndex = this.pinedProjectIds.indexOf(projectId)
        this.pinedProjectIds.splice(pinedProjectIndex, 1)
      } else {
        this.pinedProjectIds.push(projectId)
      }

      localStorage.pinedProjectIds = this.pinedProjectIds
    },
    isProjectPinned(projectId) {
      return this.pinedProjectIds.includes(projectId)
    }
  }
}
</script>

<style scoped>

</style>
