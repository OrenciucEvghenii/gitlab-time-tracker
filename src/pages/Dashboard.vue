<template>
  <q-page class="flex justify-center content-center">
    <div class="q-gutter-lg">
      <q-card @click="$router.push({ name: 'projects' })" class="cursor-pointer" flat bordered>
        <q-card-section>
          <div class="text-h6">Projects</div>
        </q-card-section>
      </q-card>
      <q-card @click="$router.push({ name: 'projects' })" class="cursor-pointer" flat bordered>
        <q-card-section>
          <div class="text-h6">Projects</div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Dashboard'
}
</script>
