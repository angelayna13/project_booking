<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">Управление ресурсами</h1>
    
    <div class="mb-6">
      <button @click="showResourceModal = true" class="bg-green-600 text-white px-4 py-2 rounded">
        Добавить ресурс
      </button>
    </div>
    
    <ResourceEditor v-if="showResourceModal" @close="showResourceModal = false" />
    
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white">
        <thead>
          <tr>
            <th class="py-2 px-4 border">Название</th>
            <th class="py-2 px-4 border">Описание</th>
            <th class="py-2 px-4 border">Ответственный</th>
            <th class="py-2 px-4 border">Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="resource in resources" :key="resource.id">
            <td class="py-2 px-4 border">{{ resource.name }}</td>
            <td class="py-2 px-4 border">{{ resource.description }}</td>
            <td class="py-2 px-4 border">{{ getResponsibleName(resource.responsibleId) }}</td>
            <td class="py-2 px-4 border">
              <button @click="editResource(resource)" class="text-blue-600 mr-2">Редактировать</button>
              <button @click="deleteResource(resource.id)" class="text-red-600">Удалить</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
const resourceStore = useResourceStore()
const { resources } = storeToRefs(resourceStore)

const showResourceModal = ref(false)

onMounted(() => {
  resourceStore.fetchResources()
})

const getResponsibleName = (id: string) => {
  // Логика получения имени ответственного
}

const editResource = (resource: any) => {
  // Логика редактирования
}

const deleteResource = async (id: string) => {
  if (confirm('Вы уверены, что хотите удалить этот ресурс?')) {
    await resourceStore.deleteResource(id)
  }
}
</script>