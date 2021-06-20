<template>
  <q-page class="flex column">
    <div>No. of Issues: {{issues.length}}</div>
    <q-list v-if="issues.length" bordered separator>
      <q-item v-for="issue in issues" :key="issue.id" clickable v-ripple>
        <q-item-section>
          {{ issue.title }}
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
export default {
  name: 'Issues',
  data() {
    return {
      issues: []
    }
  },
  watch: {
    $route() {
      // this.loadIssues()
    }
  },
  created() {
    this.loadIssues()
  },
  methods: {
    loadIssues() {
      // FIXME: refactor. prototype

      this.$gitlabApi.get(`/projects/${this.$route.params.id}/issues`)
        .then(({ data }) => {
          this.issues = data
        })
        .catch(error => {
          console.error(error)
        })
    }
  }
}
</script>

<style scoped>

</style>
