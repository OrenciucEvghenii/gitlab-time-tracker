<template>
  <div class="col-grow">
    <q-scroll-area style="height: 100%">
      <header>
        <slot name="header" :count="sortedProjects.length"></slot>
      </header>

      <q-linear-progress v-if="projectsLoading" size="xs" indeterminate/>

      <q-list :bordered="bordered" separator>
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
  props: {
    bordered: {
      type: Boolean
    },
    pinnedOnly: {
      type: Boolean
    }
  },
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
    this.projectsLoading = true
    this.$gitlabApi.get('/projects?membership=true')
      .then(({ data }) => {
        if (localStorage.pinedProjectIds) {
          this.pinedProjectIds = localStorage.pinedProjectIds.split(',').map(id => parseInt(id))
        }

        if (this.pinnedOnly) { // FIXME: verry inefficient. especially if user has many projects
          data = data.filter(project => this.isProjectPinned(project.id))
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
