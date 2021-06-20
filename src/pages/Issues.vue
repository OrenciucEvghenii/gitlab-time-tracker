<template>
  <q-page class="flex">
    <div class="col-grow">
      <q-scroll-area style="height: 100%">
        <q-list bordered separator>
          <q-item>
            <q-item-section>No. of Issues: {{ issues.length }}</q-item-section>
            <q-btn-toggle v-model="issueState"
                          :options="issueStateOptions"
                          @input="loadIssues"
                          toggle-color="primary"
                          flat/>
          </q-item>

          <q-linear-progress v-if="issuesLoading" indeterminate/>

          <q-item v-for="issue in issues" :key="issue.id" :clickable="clickable" @click="$emit('issue-clicked', issue)">
            <q-item-section>
              <div>
                <q-btn type="a" :href="issue.web_url" target="_blank" icon="launch" size="sm" flat dense/>
                {{ issue.title }}
              </div>
            </q-item-section>

            <q-item-section side>
              <div>
                <span v-if="!hideActions">
                  <q-btn @click="changeState(issue, (isOpened(issue) ? 'close' : 'reopen'))"
                         :label="isOpened(issue) ? 'Close' : 'Reopen'"
                         size="sm"
                         class="q-mr-sm"
                         outline
                         no-caps/>

                  <q-btn-group class="q-mr-md" flat>
                    <q-btn v-for="({duration, buttonLabel}) in spentTimeDurations"
                           :key="duration"
                           @click="addSpentTime(issue, duration)"
                           :disable="issue.loading"
                           :label="buttonLabel"
                           dense
                           no-caps/>
                  </q-btn-group>
                </span>

                <q-circular-progress show-value
                                     font-size="11px"
                                     :value="100"
                                     :indeterminate="issue.loading"
                                     size="65px"
                                     :thickness="0.05"
                                     :color="isOpened(issue) ? 'primary' : 'green' ">
                  <div class="q-mx-sm text-center">
                    {{ secondsToHours(issue.time_stats.total_time_spent) + 'h' }}
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
import moment from 'moment'

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
      spentTimeDurations: [
        { duration: '8h', buttonLabel: '+8h' },
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
          this.$emit('issues-loaded', this.issues)
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
          issue.time_stats.total_time_spent = data.total_time_spent
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
    },
    secondsToHours(seconds) {
      return moment.duration(seconds, 'seconds').asHours()
    }
  }
}
</script>

<style scoped lang="scss">
</style>
