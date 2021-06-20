<template>
  <q-page class="flex">
    <div class="col-grow">
      <q-scroll-area style="height: 100%">
        <q-list v-if="issues.length" bordered separator>
          <q-item v-for="issue in issues" :key="issue.id">

            <q-item-section>
              <div>
                <q-btn type="a" :href="issue.web_url" target="_blank" icon="launch" size="sm" flat dense/>
                {{ issue.title }}
              </div>
            </q-item-section>

            <q-item-section side>
              <div>

                <q-btn v-if="isOpened(issue)"
                       @click="changeState(issue, 'close')"
                       label="Close"
                       size="sm"
                       class="q-mr-sm"
                       outline
                       no-caps/>
                <q-btn v-if="!isOpened(issue)"
                       @click="changeState(issue, 'reopen')"
                       label="Reopen"
                       size="sm"
                       outline
                       no-caps/>

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
                                     size="65px"
                                     :thickness="0.05"
                                     :color="isOpened(issue) ? 'primary' : 'green' ">
                  <div class="q-mx-sm text-center">
                    {{ issue.time_stats.human_total_time_spent || '0h' }}
                  </div>
                </q-circular-progress>
              </div>
            </q-item-section>

          </q-item>
        </q-list>
      </q-scroll-area>
    </div>

  </q-page>
</template>

<script>
export default {
  name: 'Issues',
  props: ['projectId'],
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
      this.$gitlabApi.get(`/projects/${this.projectId}/issues`)
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

      const url = this.createIssueUrl(issue) + `/add_spent_time?duration=${duration}`
      this.$gitlabApi.post(url)
        .then(({ data }) => {
          issue.time_stats.human_total_time_spent = data.human_total_time_spent
          issue.loading = false
        })
        .catch(error => {
          issue.loading = false
          console.error(error)
        })
    },
    changeState(issue, state) {
      issue.loading = true

      const url = this.createIssueUrl(issue) + `?state_event=${state}`
      this.$gitlabApi.put(url)
        .then(({ data }) => {
          issue.state = data.state
          issue.loading = false
        })
        .catch(error => {
          issue.loading = false
          console.error(error)
        })
    },
    createIssueUrl(issue) {
      // FIXME: bad solution. fix
      return `/projects/${this.projectId}/issues/${issue.iid}` // 'iid' isn't a typo
    },
    isOpened(issue) {
      return issue.state === 'opened'
    }
  }
}
</script>

<style scoped lang="scss">
</style>
