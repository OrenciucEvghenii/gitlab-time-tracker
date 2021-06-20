<template>
  <q-page class="flex justify-center content-center q-gutter-lg">
    <q-card @click="$router.push({ name: 'projects' })" class="cursor-pointer" flat bordered>
      <q-card-section>
        <div class="text-h6">Projects</div>
      </q-card-section>
    </q-card>
    <q-card @click="$router.push({ name: 'report' })" class="cursor-pointer" flat bordered>
      <q-card-section>
        <div class="text-h6">Report</div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'Dashboard'
}
</script>
