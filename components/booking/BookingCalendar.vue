<template>
  <div class="calendar">
    <h3 class="title">Календарь бронирований</h3>
    
    <!-- Навигация по месяцам -->
    <div class="month-nav">
      <button @click="prevMonth">&lt;</button>
      <span>{{ currentMonth }} {{ currentYear }}</span>
      <button @click="nextMonth">&gt;</button>
    </div>
    
    <!-- Дни недели -->
    <div class="weekdays">
      <div v-for="day in ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']" 
           :key="day" class="weekday">
        {{ day }}
      </div>
    </div>
    
    <!-- Дни месяца -->
    <div class="days-grid">
      <div 
        v-for="day in calendarDays" 
        :key="day.date"
        @click="selectDate(day)"
        class="day-cell"
        :class="{
          'other-month': !day.isCurrentMonth,
          'selected': day.isSelected,
          'today': day.isToday,
          'has-booking': day.hasBooking
        }"
      >
        <div class="day-number">{{ day.day }}</div>
        <div v-if="day.hasBooking" class="booking-marker"></div>
      </div>
    </div>
    
    <!-- Информация о выбранной дате -->
    <div v-if="selectedDate" class="date-info">
      <h4>Выбрана дата: {{ formatDate(selectedDate) }}</h4>
      <div v-if="getBookingsForDate(selectedDate).length > 0">
        <div v-for="booking in getBookingsForDate(selectedDate)" 
             :key="booking.id" 
             class="booking">
          {{ booking.time }} - {{ booking.resource }}
        </div>
      </div>
      <div v-else class="no-bookings">
        На эту дату нет бронирований
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps(['bookings'])
const selectedDate = ref(null)
const currentDate = ref(new Date())

const monthNames = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
]

const currentMonth = computed(() => monthNames[currentDate.value.getMonth()])
const currentYear = computed(() => currentDate.value.getFullYear())

const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  
  // Начало календаря (понедельник)
  const startDay = new Date(firstDay)
  startDay.setDate(firstDay.getDate() - (firstDay.getDay() || 7) + 1)
  
  // Конец календаря (воскресенье)
  const endDay = new Date(lastDay)
  endDay.setDate(lastDay.getDate() + (7 - lastDay.getDay()))
  
  const days = []
  const day = new Date(startDay)
  
  while (day <= endDay) {
    const dateStr = formatDate(day)
    const hasBooking = props.bookings.some(b => b.date === dateStr)
    
    days.push({
      day: day.getDate(),
      date: dateStr,
      isCurrentMonth: day.getMonth() === month,
      isToday: isToday(day),
      isSelected: selectedDate.value === dateStr,
      hasBooking: hasBooking
    })
    
    day.setDate(day.getDate() + 1)
  }
  
  return days
})

function isToday(date) {
  const today = new Date()
  return date.getDate() === today.getDate() &&
         date.getMonth() === today.getMonth() &&
         date.getFullYear() === today.getFullYear()
}

function formatDate(date) {
  if (!date) return ''
  const d = new Date(date)
  return d.toISOString().split('T')[0]
}

function prevMonth() {
  currentDate.value = new Date(currentDate.value.setMonth(currentDate.value.getMonth() - 1))
}

function nextMonth() {
  currentDate.value = new Date(currentDate.value.setMonth(currentDate.value.getMonth() + 1))
}

function selectDate(day) {
  selectedDate.value = day.date
}

function getBookingsForDate(date) {
  return props.bookings.filter(b => b.date === date)
}
</script>

<style scoped>
.calendar {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 16px;
  margin: 0 auto;
}

.title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  text-align: center;
}

.month-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.month-nav button {
  background: none;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
}

.weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 8px;
  font-weight: 500;
  text-align: center;
}

.days-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}

.day-cell {
  border: 1px solid #e2e8f0;
  padding: 8px;
  height: 40px;
  text-align: center;
  cursor: pointer;
  position: relative;
}

.day-cell:hover {
  background-color: #f8fafc;
}

.day-number {
  font-weight: 500;
}

.other-month {
  color: #94a3b8;
  background-color: #f8fafc;
}

.selected {
  background-color: #dbeafe;
  border-color: #93c5fd;
}

.today {
  font-weight: bold;
  color: #b6000f;
}

.has-booking .day-number {
  font-weight: bold;
}

.booking-marker {
  position: absolute;
  bottom: 4px;
  left: 50%;
  transform: translateX(-50%);
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #3b82f6;
}

.date-info {
  margin-top: 16px;
  padding: 12px;
  border-top: 1px solid #e2e8f0;
}

.booking {
  background: #dbeafe;
  padding: 8px;
  margin-top: 8px;
  border-radius: 4px;
  font-size: 14px;
}

.no-bookings {
  color: #64748b;
  font-style: italic;
  margin-top: 8px;
}
</style>