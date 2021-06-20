<template>
  <q-page class="flex">
    <div class="col-grow">
      <q-scroll-area style="height: 100%">
        <q-list bordered separator>
          <q-item>
            <q-item-section>No. of Issues: {{ issues.length }}</q-item-section>
            <q-btn-toggle v-model="issueState"
                          toggle-color="primary"
                          :options="issueStateOptions"
                          @input="loadIssues"
                          flat/>
          </q-item>
          <q-linear-progress v-if="issuesLoading" indeterminate/>
          <q-item v-for="issue in issues" :key="issue.id" :clickable="clickable">

            <q-item-section>
              <div>
                <q-btn type="a" :href="issue.web_url" target="_blank" icon="launch" size="sm" flat
                       dense/>
                {{ issue.title }}
              </div>
            </q-item-section>

            <q-item-section v-if="!hideActions" side>
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
  props: {
    projectId: {},
    hideActions: {
      type: Boolean,
      default: false
    },
    clickable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      issues: [],
      issuesLoading: false,
      durations: [
        { duration: '1d', buttonLabel: '+1d' },
        { duration: '4h', buttonLabel: '+4h' },
        { duration: '2h', buttonLabel: '+2h' },
        { duration: '1h', buttonLabel: '+1h' },
        { duration: '30m', buttonLabel: '+30m' }
      ],
      issueState: null,
      issueStateOptions: [
        { label: 'All', value: null },
        { label: 'Opened', value: '&state=opened' },
        { label: 'Closed', value: '&state=closed' }
      ]
    }
  },
  created() {
    this.loadIssues()
  },
  methods: {
    loadIssues() {
      // FIXME: verry ineffective method. Optimize!
      // FIXME: make pagination dynamically [https://docs.gitlab.com/ee/api/README.html#pagination]

      this.issuesLoading = true

      const url = (this.projectId)
        ? `/projects/${this.projectId}/issues?per_page=100${this.issueState || ''}`
        : `/issues?scope=assigned_to_me&per_page=100${this.issueState || ''}`

      this.$gitlabApi.get(url)
        .then(({ data }) => {
          this.issues = data.map(issue => {
            return { loading: false, ...issue }
          })
          this.issuesLoading = false
        })
        .catch(error => {
          console.error(error)
          this.issuesLoading = false
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
          this.loadIssues()
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
