<template>
  <q-item>
    <q-item-section>
      <div>
        <q-btn type="a" :href="issue.web_url" target="_blank" icon="launch" size="sm" flat dense/>
        {{ issue.title }}
      </div>
    </q-item-section>

    <q-item-section side>
      <div>
        <span v-if="showActions">
          <q-btn @click="toggleState"
                 :label="isOpened ? 'Close' : 'Reopen'"
                 size="sm"
                 class="q-mr-sm"
                 outline
                 no-caps/>

          <q-btn-group class="q-mr-md" flat>
            <q-btn v-for="({duration, buttonLabel}) in spentTimeDurations"
                   :key="duration"
                   @click="addSpentTime(duration)"
                   :disable="loading"
                   :label="buttonLabel"
                   dense
                   no-caps/>
          </q-btn-group>
        </span>

        <q-circular-progress :indeterminate="loading"
                             :color="isOpened ? 'primary' : 'green' "
                             :value="100"
                             :thickness="0.05"
                             font-size="12px"
                             size="50px"
                             show-value>
          <div class="q-mx-sm text-center">
            {{ totalTimeSpentInHours + 'h' }}
          </div>
        </q-circular-progress>
      </div>
    </q-item-section>
  </q-item>
</template>

<script>
import moment from 'moment'

export default {
  name: 'IssueListItem',
  props: {
    issue: {
      type: Object,
      required: true
    },
    clickable: {
      type: Boolean
    },
    showActions: {
      type: Boolean
    }
  },
  data() {
    return {
      loading: false,
      spentTimeDurations: [
        { duration: '8h', buttonLabel: '+8h' },
        { duration: '4h', buttonLabel: '+4h' },
        { duration: '2h', buttonLabel: '+2h' },
        { duration: '1h', buttonLabel: '+1h' },
        { duration: '30m', buttonLabel: '+30m' }
      ]
    }
  },
  computed: {
    issueUrl() {
      return `/projects/${this.issue.project_id}/issues/${this.issue.iid}` // 'iid' isn't a typo
    },
    isOpened() {
      return this.issue.state === 'opened'
    },
    totalTimeSpentInHours() {
      return moment.duration(this.issue.time_stats.total_time_spent, 'seconds').asHours()
    }
  },
  methods: {
    addSpentTime(duration) {
      this.loading = true

      const url = `${this.issueUrl}/add_spent_time?duration=${duration}`

      this.$gitlabApi.post(url)
        .then(({ data }) => {
          this.issue.time_stats.total_time_spent = data.total_time_spent
          this.loading = false
        })
        .catch(error => {
          console.error(error)
          this.loading = false
        })
    },
    toggleState() {
      this.loading = true

      const newState = this.isOpened ? 'close' : 'reopen'
      const url = `${this.issueUrl}?state_event=${newState}`

      this.$gitlabApi.put(url)
        .then(() => {
          this.$emit('stateChanged')
          this.loading = false
        })
        .catch(error => {
          console.error(error)
          this.loading = false
        })
    }
  }
}
</script>

<style scoped>

</style>
