<template>
    <div class="container">
      <section class="hero">
        <div class="hero-content">
          <h1>Система бронирования ресурсов</h1>
          <p>Удобное планирование общих ресурсов организации</p>
          <NuxtLink to="/booking" class="btn">Начать бронирование</NuxtLink>
        </div>
      </section>
      <section class="features">
        <h2>Наши преимущества</h2>
        <div class="features-grid">
          <div class="feature">
            <div class="icon">
                <img src="\public\image\icon1.svg" alt="Картинка"/>
            </div>
            <h3>Простое бронирование</h3>
            <p>Интуитивный интерфейс для резервирования</p>
          </div>
          <div class="feature">
            <div class="icon">
                <img src="\public\image\icon2.svg" alt="Картинка"/>
            </div>
            <h3>Контроль занятости</h3>
            <p>Занятость ресурсов в реальном времени</p>
          </div>
          <div class="feature">
            <div class="icon">
                <img src="\public\image\icon3.svg" alt="Картинка"/>
            </div>
            <h3>Автоуведомления</h3>
            <p>Подтверждение брони и напоминания</p>
          </div>
        </div>
      </section>
      <section class="resources">
        <div class="section-header">
          <h2>Популярные ресурсы</h2>
          <NuxtLink to="/booking">Все ресурсы →</NuxtLink>
        </div>
        
        <div class="resources-grid">
          <div v-for="resource in popularResources" :key="resource.id" class="resource">
            <div class="resource-image">
              <span>{{ resource.emoji }}</span>
            </div>
            <div class="resource-info">
              <h3>{{ resource.name }}</h3>
              <p>{{ resource.description }}</p>
              <NuxtLink :to="`/booking?resource=${resource.id}`">Забронировать</NuxtLink>
            </div>
          </div>
        </div>
      </section>
      <section class="stats">
        <h2>Мы в цифрах</h2>
        <div class="stats-grid">
          <div class="stat">
            <div class="stat-number">1,250+</div>
            <div class="stat-label">Бронирований</div>
          </div>
          <div class="stat">
            <div class="stat-number">50+</div>
            <div class="stat-label">Ресурсов</div>
          </div>
          <div class="stat">
            <div class="stat-number">98%</div>
            <div class="stat-label">Довольных</div>
          </div>
          <div class="stat">
            <div class="stat-number">24/7</div>
            <div class="stat-label">Доступ</div>
          </div>
        </div>
      </section>
    </div>
  </template>
  <script setup>
  const popularResources = [
    {
      id: 1,
      name: 'Конференц-зал "Олимп"',
      description: 'Вместимость до 20 человек',
      emoji: '💼'
    },
    {
      id: 2,
      name: 'Фотостудия',
      description: 'Профессиональное оборудование',
      emoji: '📸'
    },
    {
      id: 3,
      name: 'Переговорная "Бриз"',
      description: 'Для небольших встреч',
      emoji: '🗣️'
    },
    {
      id: 4,
      name: 'Ноутбук',
      description: 'MacBook Pro 16"',
      emoji: '💻'
    }
  ]
  </script>
