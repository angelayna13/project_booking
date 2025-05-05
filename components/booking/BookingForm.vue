<template>
    <form @submit.prevent="submit" class="form">
      <h3 class="title">Новое бронирование</h3>
      <div class="field">
        <label>Ресурс:</label>
        <select v-model="form.resource">
          <option value="Конференц-зал 1">Конференц-зал 1</option>
          <option value="Конференц-зал 2">Конференц-зал 2</option>
          <option value="Фотограф">Фотограф</option>
        </select>
      </div>
      <div class="field">
        <label>Дата:</label>
        <input type="date" v-model="form.date">
      </div>
      <div class="field">
        <label>Время:</label>
        <input type="time" v-model="form.time">
      </div>
      <button type="submit" class="btn">
        Забронировать
      </button>
      <div v-if="message" class="alert" :class="message.type">
        {{ message.text }}
      </div>
    </form>
</template> 
<script setup>
  const form = reactive({
    resource: '',
    date: '',
    time: ''
  })
  
  const message = ref(null)
  
  const bookingStore = useBookingStore()
  
  const submit = async () => {
    try {
      await bookingStore.createBooking({
        ...form,
        id: Date.now().toString()
      })
      message.value = { text: 'Бронирование успешно создано!', type: 'success' }
      emit('booking-created')
      form.resource = ''
      form.date = ''
      form.time = ''
    } catch (error) {
      message.value = { text: error.message, type: 'error' }
    }
  }
  
  const emit = defineEmits(['booking-created'])
</script>
<style scoped>
    .title {
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 16px;
    }
    .btn {
        display: inline-block;
        background: white;
        color: #5e836f;
        padding: 12px 30px;
        border-radius: 8px;
        font-weight: 600;
        transition: background 0.3s;
    }  
    .btn:hover {
        background: #cadbd2;
    }
</style>
