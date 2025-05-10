<template>
    <div class="form-container">
      <h2>Редактирование ресурса</h2>
      <form @submit.prevent="submitForm" class="resource-form">
        <div class="form-group">
          <label for="name">Название ресурса:</label>
          <input id="name" v-model="form.name" type="text" required>
        </div>
        
        <div class="form-group">
          <label for="type">Тип ресурса:</label>
          <select id="type" v-model="form.type" required>
            <option value="Помещение">Помещение</option>
            <option value="Техника">Техника</option>
            <option value="Транспорт">Транспорт</option>
            <option value="Другое">Другое</option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="responsible">Ответственное лицо:</label>
          <input id="responsible" v-model="form.responsible" type="text" required>
        </div>
        
        <div class="form-group">
          <label for="description">Описание:</label>
          <textarea id="description" v-model="form.description" rows="4"></textarea>
        </div>
        
        <div class="form-actions">
          <NuxtLink to="/admin" class="cancel-button">Отмена</NuxtLink>
          <button type="submit" class="submit-button">Сохранить изменения</button>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  const route = useRoute();
  const resourceId = route.params.id;

  const resourceData = {
    1: {
      name: 'Конференц-зал №1',
      type: 'Помещение',
      responsible: 'Давиченко А.А.',
      description: 'Зал на 30 человек с проектором'
    },
    2: {
      name: 'Ноутбук ASUS',
      type: 'Техника',
      responsible: 'Нестеренко А.Г.',
      description: 'Ноутбук для презентаций'
    }
  };
  
  const form = reactive({
    name: resourceData[resourceId]?.name || '',
    type: resourceData[resourceId]?.type || 'Помещение',
    responsible: resourceData[resourceId]?.responsible || '',
    description: resourceData[resourceId]?.description || ''
  });
  
  const submitForm = () => {
    console.log('Обновлен ресурс:', resourceId, form);
    navigateTo('/admin');
  };
  </script>
<style scoped>
.form-container {
    max-width: 1200pх;
    margin: 0 auto;
}
.resource-form {
    display: grid;
    gap: 1.5rem;
    margin-top: 2rem;
}
.form-group {
    display: grid;
    gap: 0.5rem;
}
.form-group label {
    font-weight: bold;
}
.form-group input,
.form-group select,
.form-group textarea {
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
}
.form-group textarea {
    resize: vertical;
}
.form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 1rem;
}
.cancel-button {
    background-color: #95a5a6;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    text-decoration: none;
    transition: 0.3s;
}
.cancel-button:hover {
    background-color: #7f8c8d;
}
.submit-button {
    background-color: #5e836f;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    transition: 0.3s;
}
.submit-button:hover {
    background-color: #507260;
}
  </style>