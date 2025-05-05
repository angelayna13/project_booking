import { defineStore } from 'pinia'

export const useBookingStore = defineStore('booking', {
  state: () => ({
    bookings: []
  }),
  actions: {
    async fetchBookings() {
      // Здесь должен быть запрос к API
      this.bookings = [
        { id: '1', resource: 'Конференц-зал 1', date: '2023-06-15', time: '10:00' }
      ]
    },
    async createBooking(booking) {
      // Проверка на конфликты
      const conflict = this.bookings.some(b => 
        b.date === booking.date && b.time === booking.time && b.resource === booking.resource
      )
      
      if (conflict) {
        throw new Error('Этот ресурс уже забронирован на выбранное время')
      }
      
      this.bookings.push(booking)
      // Здесь должен быть запрос к API для сохранения
    }
  }
})