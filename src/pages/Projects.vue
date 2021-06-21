<template>
  <q-page class="flex">
    <ProjectList>
      <template #header="{ count }">
        No. of Projects: {{ count }}
      </template>
    </ProjectList>
  </q-page>
</template>

<script>

import ProjectList from 'components/ProjectList'
export default {
  name: 'Projects',
  components: { ProjectList }
}
</script>

<style scoped>

</style>
