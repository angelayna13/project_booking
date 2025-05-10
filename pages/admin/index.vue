<template>
    <div class="admin-container">
      <div class="admin-header">
        <h2>Управление ресурсами</h2>
        <NuxtLink to="/admin/add" class="add-button">Добавить ресурс</NuxtLink>
      </div>
      
      <div class="resources-list">
        <div v-for="resource in resources" :key="resource.id" class="resource-card">
          <div class="resource-info">
            <h3>{{ resource.name }}</h3>
            <p>Тип: {{ resource.type }}</p>
            <p>Ответственный: {{ resource.responsible }}</p>
            <p>Описание: {{ resource.description }}</p>
          </div>
          <div class="resource-actions">
            <NuxtLink :to="`/admin/${resource.id}`" class="edit-button">Редактировать</NuxtLink>
            <button @click="deleteResource(resource.id)" class="delete-button">Удалить</button>
          </div>
        </div>
      </div>
    </div>
</template>
  
<script setup>
const resources = ref([
    {
      id: 1,
      name: 'Конференц-зал №1',
      type: 'Помещение',
      responsible: 'Давиченко А.А.',
      description: 'Зал на 30 человек с проектором'
    },
    {
      id: 2,
      name: 'Ноутбук ASUS',
      type: 'Техника',
      responsible: 'Нестеренко А.Г.',
      description: 'Ноутбук для презентаций'
    }
  ]);
  
  const deleteResource = (id) => {
    // Здесь будет запрос к API для удаления ресурса
    resources.value = resources.value.filter(res => res.id !== id);
  };
</script>
