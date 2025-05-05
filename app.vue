<template>
  <div>
    <header class="header">
      <h1 class="title">Система бронирования</h1>
      <nav class="nav">
        <NuxtLink to="/" class="nav-link">Главная</NuxtLink>
        <NuxtLink to="/booking" class="nav-link">Бронирование</NuxtLink>
        <NuxtLink to="/admin" class="nav-link">Управление</NuxtLink>
      </nav>
    </header>
    
    <main class="main">
      <NuxtPage />
    </main>
  </div>
</template>