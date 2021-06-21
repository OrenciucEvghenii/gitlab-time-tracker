<template>
  <q-page class="flex row justify-center content-center q-gutter-lg dashboard">

    <q-card class="col-4 flex column dashboard-card" flat bordered>
      <q-card-section @click="$router.push({ name: 'projects' })" class="cursor-pointer">
        <div class="text-h6">Projects</div>
      </q-card-section>

      <q-separator inset />

      <ProjectList class="q-pa-md" pinned-only/>
    </q-card>

    <q-card class="col-4 dashboard-card" flat bordered>
      <q-card-section @click="$router.push({ name: 'report' })" class="cursor-pointer ">
        <div class="text-h6">Report</div>
      </q-card-section>

      <q-separator inset />

      <q-card-section>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </q-card-section>
    </q-card>

  </q-page>
</template>

<script>
import ProjectList from 'components/ProjectList'
export default {
  name: 'Dashboard',
  components: { ProjectList }
}
</script>

<style lang="scss" scoped>
.dashboard {
  min-height: 500px;
}

.dashboard-card {
  height: 300px;
}
</style>
