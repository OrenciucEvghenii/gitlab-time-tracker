<template>
  <q-page class="flex column">
    <div>No. of Issues: {{ issues.length }}</div>
    <q-list v-if="issues.length" bordered separator>
      <q-item v-for="(issue) in issues" :key="issue.id">

        <q-item-section>
          {{ issue.title }}
        </q-item-section>

        <q-item-section side>
          <div>
            <q-btn-group class="q-mr-md" flat>
              <q-btn v-for="({duration, buttonLabel}) in durations"
                     :key="duration"
                     @click="addSpentTime(issue, duration)"
                     :disable="issue.loading"
                     :label="buttonLabel"
                     no-caps/>
            </q-btn-group>

            <q-circular-progress show-value
                                 font-size="11px"
                                 :value="100"
                                 :indeterminate="issue.loading"
                                 size="60px"
                                 :thickness="0.05"
                                 color="primary">
              <div class="q-mx-sm text-center">
                {{ issue.time_stats.human_total_time_spent || '0h' }}
              </div>
            </q-circular-progress>
          </div>
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
      issues: [],
      durations: [
        { duration: '1d', buttonLabel: '+1d' },
        { duration: '4h', buttonLabel: '+4h' },
        { duration: '2h', buttonLabel: '+2h' },
        { duration: '1h', buttonLabel: '+1h' },
        { duration: '30m', buttonLabel: '+30m' }
      ]
    }
  },
  created() {
    this.loadIssues()
  },
  methods: {
    loadIssues() {
      this.$gitlabApi.get(`/projects/${this.$route.params.id}/issues`)
        .then(({ data }) => {
          this.issues = data.map(issue => {
            return { loading: false, ...issue }
          })
        })
        .catch(error => {
          console.error(error)
        })
    },
    addSpentTime(issue, duration) {
      issue.loading = true

      const url = `/projects/${this.$route.params.id}/issues/${issue.iid}/add_spent_time?duration=${duration}`
      this.$gitlabApi.post(url)
        .then(({ data }) => {
          issue.time_stats.human_total_time_spent = data.human_total_time_spent
          issue.loading = false
        })
        .catch(error => {
          issue.loading = false
          console.error(error)
        })
    }
  }
}
</script>

<style scoped lang="scss">
</style>
