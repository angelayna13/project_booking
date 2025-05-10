<template>
  <form @submit.prevent="checkBookingConflict" class="form">
    <h3 class="title">Новое бронирование</h3>
    <div class="field">
      <label>Ресурс:</label>
      <select v-model="form.resource" required>
        <option value="" disabled>Выберите ресурс</option>
        <option value="Конференц-зал №1">Конференц-зал №1</option>
        <option value="Конференц-зал №2">Конференц-зал №2</option>
        <option value="Ноутбук ASUS">Ноутбук ASUS</option>
        <option value="Библиотека">Библиотека</option>
        <option value="Автомобиль №001">Автомобиль №001</option>
        <option value="Автомобиль №002">Автомобиль №002</option>
      </select>
    </div>
    <div class="field">
      <label>Дата:</label>
      <input type="date" v-model="form.date" required :min="minDate">
    </div>
    <div class="field">
      <label>Время начала:</label>
      <input type="time" v-model="form.startTime" required>
    </div>
    <div class="field">
      <label>Время окончания:</label>
      <input type="time" v-model="form.endTime" required :min="form.startTime">
    </div>
    <div class="field">
      <label>Ваше имя:</label>
      <input type="text" v-model="form.userName" required>
    </div>
    <button type="submit" class="btn" :disabled="isSubmitting">
      {{ isSubmitting ? 'Проверяем...' : 'Забронировать' }}
    </button>
    <div v-if="message" class="alert" :class="message.type">
      {{ message.text }}
    </div>
  </form>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';

const form = reactive({
  resource: '',
  date: '',
  startTime: '',
  endTime: '',
  userName: ''
});

const message = ref(null);
const isSubmitting = ref(false);
const conflictModal = ref(false);
const conflictingBooking = ref(null);

const bookingStore = useBookingStore();
const emit = defineEmits(['booking-created']);

// Минимальная дата - сегодня
const minDate = computed(() => {
  const today = new Date();
  return today.toISOString().split('T')[0];
});

// Проверка на конфликты бронирования
const checkBookingConflict = async () => {
  isSubmitting.value = true;
  message.value = null;
  
  try {
    if (!form.resource || !form.date || !form.startTime || !form.endTime || !form.userName) {
      throw new Error('Пожалуйста, заполните все поля');
    }
    if (form.startTime >= form.endTime) {
      throw new Error('Время окончания должно быть позже времени начала');
    }}
    catch (error) {
    message.value = { text: error.message, type: 'error' };
  };
};
const createBooking = async () => {
  try {
    await bookingStore.createBooking({
      ...form,
      id: Date.now().toString(),
      status: 'active'
    });
    
    message.value = { 
      text: 'Бронирование успешно создано!', 
      type: 'success' 
    };
    
    emit('booking-created');
    resetForm();
  } catch (error) {
    message.value = { text: error.message, type: 'error' };
  }
};

// Принудительное бронирование (при конфликте)
const forceBook = async () => {
  conflictModal.value = false;
  await createBooking();
};
// Сброс формы
const resetForm = () => {
  form.resource = '';
  form.date = '';
  form.startTime = '';
  form.endTime = '';
  form.userName = '';
};
// Форматирование даты для отображения
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('ru-RU', options);
};
</script>
<style scoped>
.title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
}
.form {
  margin: 0 auto;
  padding: 20px;
  background: white;
  border-radius: 8px;
}
.field {
  margin-bottom: 15px;
}
.field label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
}
.field input,
.field select {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}
.btn {
  display: inline-block;
  background: #5e836f;
  color: white;
  padding: 12px 30px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
}
.btn:hover {
  background-color: #4a6b5a;
}
.btn:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
.alert {
  margin-top: 15px;
  padding: 10px 15px;
  border-radius: 4px;
}
.alert.success {
  background-color: #d4edda;
  color: #155724;
}
.alert.error {
  background-color: #f8d7da;
  color: #721c24;
}
/* Стили для модального окна */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 90%;
}
.modal h3 {
  margin-top: 0;
  color: #721c24;
}
.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}
.btn.cancel {
  background: #6c757d;
}
.btn.confirm {
  background: #dc3545;
}
.btn.cancel:hover {
  background: #5a6268;
}
.btn.confirm:hover {
  background: #c82333;
}
</style>