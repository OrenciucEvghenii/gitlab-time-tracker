<template>
  <q-page class="flex">
    <ProjectList bordered>
      <template #header="{ count }">
        <q-item>
          <q-item-section>
            No. of Projects: {{ count }}
          </q-item-section>
        </q-item>
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
