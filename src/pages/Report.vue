<template>
  <q-page class="flex">

    <q-splitter v-model="splitterModel" style="width: 100%">

      <template v-slot:before>

        <div class="flex column">
          <q-input filled v-model="date" dense disable>
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date v-model="date" range :events="events">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat/>
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-btn-group spread flat disabled>
            <!--FIXME: fix button height-->
            <q-btn label="Week" dense/>
            <q-btn label="Two Weeks" dense/>
            <q-btn label="Month" dense/>
          </q-btn-group>

          <!--
            FIXME: q-input and q-btn-group are causing additional scroll area for
                   whole page. Only Issues-list should be scrollable
          -->
          <Issues @issues-loaded="updateReport"
                  @issue-clicked="showIssueStats"
                  hide-actions
                  clickable/>

        </div>
      </template>

      <template v-slot:after>
        <div class="flex justify-center content-center" style="height: 100%">
          <q-circular-progress v-if="selectedIssue"
                               show-value
                               font-size="26px"
                               :value="100"
                               size="265px"
                               :thickness="0.05"
                               :color="selectedIssue.state === 'opened' ? 'primary' : 'green' ">
            <div class="q-mx-sm text-center">
              {{ selectedIssue.time_stats.human_total_time_spent || '0h' }}
            </div>
          </q-circular-progress>
        </div>
      </template>
    </q-splitter>
  </q-page>
</template>

<script>
import Issues from 'pages/Issues'
export default {
  name: 'Report',
  components: { Issues },
  data() {
    return {
      splitterModel: 40,
      selectedIssue: null,
      date: '2019/03/01',
      events: ['2019/02/01', '2019/02/05', '2019/02/06']
    }
  },
  methods: {
    updateReport(issues) {
      console.log(issues.length)
    },
    showIssueStats(issue) {
      this.selectedIssue = issue
    }
  }

}
</script>

<style scoped>

</style>
