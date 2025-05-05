<template>
  <div class="border rounded p-4">
    <h3 class="text-lg font-semibold mb-4">Календарь бронирований</h3>
    <div class="grid grid-cols-7 gap-2">
      <div v-for="day in days" :key="day" class="border p-2 h-24">
        {{ day }}
        <div v-for="booking in getBookingsForDay(day)" :key="booking.id" 
             class="bg-blue-100 p-1 text-xs mt-1">
          {{ booking.resource }} {{ booking.time }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['bookings'])

const days = Array.from({ length: 31 }, (_, i) => i + 1)

const getBookingsForDay = (day) => {
  return props.bookings.filter(b => new Date(b.date).getDate() === day)
}
</script>