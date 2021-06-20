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
            <q-btn @click="addSpentTime(issue, '4h')"
                   :disable="issue.loading"
                   label="+4h"
                   no-caps
                   flat
                   rounded/>
            <q-btn @click="addSpentTime(issue, '2h')"
                   :disable="issue.loading"
                   label="+2h"
                   no-caps
                   flat
                   rounded/>
            <q-btn @click="addSpentTime(issue, '1h')"
                   :disable="issue.loading"
                   label="+1h"
                   no-caps
                   flat
                   rounded/>
            <q-btn @click="addSpentTime(issue, '30m')"
                   :disable="issue.loading"
                   label="+30m"
                   no-caps
                   flat
                   rounded/>

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
      issues: []
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
