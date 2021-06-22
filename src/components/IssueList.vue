<template>
  <div class="col-grow">
    <q-scroll-area style="height: 100%">
      <header>
        <slot name="header" :count="issues.length"></slot>
      </header>

      <q-linear-progress v-if="issuesLoading" size="xs" indeterminate/>

      <q-list :bordered="bordered" separator>
        <IssueListItem v-for="issue in issues"
                       :key="issue.id"
                       :issue="issue"
                       @stateChanged="loadIssues"
                       show-actions/>
      </q-list>
      <q-item v-if="!issues.length && !issuesLoading">
        No issues found
      </q-item>
    </q-scroll-area>
  </div>
</template>

<script>
import IssueListItem from 'components/IssueListItem'

export default {
  name: 'IssueList',
  components: { IssueListItem },
  props: {
    projectId: {},
    issueState: {
      type: String
    },
    bordered: {
      type: Boolean
    }
  },
  data() {
    return {
      issues: [],
      issuesLoading: false
    }
  },
  computed: {
    issuesUrl() {
      // FIXME: verry ineffective method. Optimize!
      // FIXME: make pagination dynamically [https://docs.gitlab.com/ee/api/README.html#pagination]

      let url = (this.projectId)
        ? `/projects/${this.projectId}/issues?per_page=100`
        : '/issues?scope=assigned_to_me&per_page=100'

      url += this.issueState ? `&state=${this.issueState}` : ''

      return url
    }
  },
  watch: {
    issueState() {
      this.loadIssues()
    }
  },
  created() {
    this.loadIssues()
  },
  methods: {
    loadIssues() {
      this.issuesLoading = true

      this.$gitlabApi.get(this.issuesUrl)
        .then(({ data }) => {
          this.issues = data
          this.issuesLoading = false
        })
        .catch(error => {
          console.error(error)
          this.issuesLoading = false
        })
    }
  }
}
</script>

<style scoped>

</style>
