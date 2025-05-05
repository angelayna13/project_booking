<template>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <BookingCalendar :bookings="bookings" />
      </div>
      <div>
        <BookingForm @booking-created="refreshBookings" />
      </div>
    </div>
  </template>
  
  <script setup>
  const bookingStore = useBookingStore()
  
  const bookings = computed(() => bookingStore.bookings)
  
  onMounted(() => {
    bookingStore.fetchBookings()
  })
  
  const refreshBookings = () => {
    bookingStore.fetchBookings()
  }
  </script>