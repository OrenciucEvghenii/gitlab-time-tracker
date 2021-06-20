<template>
  <q-page class="flex">

    <q-splitter v-model="splitterModel" style="width: 100%">

      <template v-slot:before>

        <div class="flex column">
          <q-input filled v-model="date" dense>
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
          <q-btn-group spread flat>
            <!--FIXME: fix button height-->
            <q-btn label="Week" dense/>
            <q-btn label="Two Weeks" dense/>
            <q-btn label="Month" dense/>
          </q-btn-group>

          <!--
            FIXME: q-input and q-btn-group are causing additional scroll area for
                   whole page. Only Issues-list should be scrollable
          -->
          <Issues hide-actions clickable/>

        </div>
      </template>

      <template v-slot:after>
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
      splitterModel: 30,
      date: '2019/03/01',
      events: ['2019/02/01', '2019/02/05', '2019/02/06']
    }
  }

}
</script>

<style scoped>

</style>
