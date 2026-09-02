# CLAUDE.md — Web Development Guidelines

> Инструкции для Claude Code при разработке современных веб-сайтов:
> портфолио, лендинги, интернет-магазины и другие типы сайтов.

---

## 🧩 Текущий проект: портфолио (Astro)

При запуске dev-сервера использовать фоновый режим:

```
astro dev --background
```

Управление фоновым сервером: `astro dev stop`, `astro dev status`, `astro dev logs`.

Документация: https://docs.astro.build — разделы по роутингу, компонентам, фреймворкам, контент-коллекциям, стилям и i18n.

---

## 🧠 Философия разработки

- Каждый сайт — уникальный продукт. Никакого «AI-шаблонного» вида.
- Дизайн всегда **intentional**: выбирай эстетику и придерживайся её до конца.
- Код чистый, масштабируемый, без лишней абстракции.
- Mobile-first всегда — десктоп это расширение мобильного, не наоборот.
- Производительность и SEO — не опции, а базовые требования.

---

## 🛠 Технологический стек

### Основные фреймворки (выбирай под задачу)

| Тип сайта | Предпочтительный стек |
|---|---|
| Портфолио / лендинг | Astro + CSS/SCSS или Vanilla HTML/CSS/JS |
| Интернет-магазин | Next.js (App Router) + Tailwind CSS |
| Многостраничный сайт | Nuxt 3 или Next.js |
| Простой статичный сайт | Vanilla HTML/CSS/JS |

### CSS-подходы

- **Vanilla / SCSS** — для Astro, статики, лендингов. Использовать CSS Custom Properties обязательно.
- **CSS Modules** — для React/Next.js компонентов, изолируем стили.
- **Tailwind CSS** — для e-commerce и dashboard-heavy проектов.
- Никогда не смешивать Tailwind и SCSS в одном проекте.

### JavaScript

- Язык: **JavaScript** (без строгого TypeScript, если не оговорено).
- Современный синтаксис: ES2022+, async/await, optional chaining, nullish coalescing.
- Без `var`. Только `const` / `let`.
- Комментарии: **на русском или английском** (по контексту задачи).
- Имена переменных/функций: **camelCase на английском**, описательные (`heroSectionEl`, `cartItemCount`).

---

## 🎨 Дизайн-система и визуальный стиль

### Обязательные CSS Custom Properties (в каждом проекте)

```css
:root {
  /* Цвета */
  --color-bg: #0a0a0a;
  --color-surface: #141414;
  --color-text: #f0f0f0;
  --color-text-muted: #888;
  --color-accent: #e8ff00;       /* Варьируется под проект */
  --color-accent-hover: #d4eb00;
  --color-border: rgba(255,255,255,0.08);

  /* Типографика */
  --font-display: 'Syne', sans-serif;   /* Менять под проект */
  --font-body: 'DM Sans', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Размеры */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 2rem;
  --space-xl: 4rem;
  --space-2xl: 8rem;

  /* Скругления */
  --radius-sm: 4px;
  --radius-md: 12px;
  --radius-lg: 24px;
  --radius-full: 9999px;

  /* Переходы */
  --transition-fast: 150ms ease;
  --transition-base: 300ms ease;
  --transition-slow: 600ms cubic-bezier(0.16, 1, 0.3, 1);

  /* Сетка */
  --container-max: 1400px;
  --container-padding: clamp(1rem, 5vw, 3rem);
}
```

### Dark Mode

- **Всегда** реализовывать через `prefers-color-scheme` + ручной переключатель.
- Переменные переопределять в `[data-theme="light"]`, базовая тема — тёмная.
- Никогда не использовать `filter: invert()` для dark mode.

```css
@media (prefers-color-scheme: light) {
  :root:not([data-theme="dark"]) {
    --color-bg: #fafafa;
    --color-surface: #f0f0f0;
    --color-text: #0a0a0a;
    --color-text-muted: #666;
    --color-border: rgba(0,0,0,0.08);
  }
}
[data-theme="light"] { /* те же переменные */ }
```

---

## ✨ Анимации и эффекты

### Порядок выбора инструмента

1. **CSS-анимации** — для простых hover, fade, slide (всегда первый выбор).
2. **Framer Motion** — для React-проектов с page transitions и layout animations.
3. **GSAP** — для сложных timeline-анимаций, ScrollTrigger, морфинга SVG.

### Правила анимаций

```css
/* Уважать системные настройки */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

- Анимировать только `transform` и `opacity` — никогда `width`, `height`, `top`, `left`.
- Staggered reveal при скролле — через IntersectionObserver или GSAP ScrollTrigger.
- Page load: один хорошо срежиссированный вход лучше десяти случайных эффектов.
- Hover-эффекты на всех интерактивных элементах обязательны.

### Паттерны scroll-анимаций (Vanilla / Astro)

```js
// Базовый reveal при скролле
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
);

document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
```

---

## 📐 Типы сайтов — специфические правила

### 🎭 Портфолио

- Структура: Hero → About → Works/Projects → Skills → Contact
- Акцент на **типографику** — она и есть дизайн.
- Обязательно: кастомный cursor, page transitions, project hover previews.
- Hero section: fullscreen, bold statement, минимум текста.
- Работы: grid с hover-reveal подробностей, или горизонтальный скролл.
- Шрифты: нестандартные display-шрифты (Clash Display, Syne, General Sans, Neue Montreal).

```html
<!-- Структура hero для портфолио -->
<section class="hero" data-reveal>
  <div class="hero__label">Available for work · 2025</div>
  <h1 class="hero__title">
    <span class="hero__line">Creative</span>
    <span class="hero__line hero__line--accent">Developer</span>
  </h1>
  <div class="hero__scroll-hint" aria-hidden="true">Scroll ↓</div>
</section>
```

### 🚀 Лендинг

- Структура: Hero → Problem → Solution → Features → Social Proof → CTA → Footer
- Один главный CTA — он должен быть очевидным и повторяться 2–3 раза.
- Hero: одна сильная headline (≤8 слов), subheadline, CTA кнопка, visual.
- Above the fold должен полностью грузиться за < 1.5s.
- Секции чередуются по ритму: tight → spacious → tight.
- A/B тестируемые элементы выносить в отдельные компоненты.

```html
<!-- Структура hero для лендинга -->
<section class="hero">
  <div class="hero__badge">New · Version 2.0</div>
  <h1 class="hero__headline">One line that changes everything</h1>
  <p class="hero__sub">Supporting sentence. Max 20 words. Benefit-focused.</p>
  <div class="hero__actions">
    <a href="#" class="btn btn--primary">Get Started Free</a>
    <a href="#" class="btn btn--ghost">Watch Demo →</a>
  </div>
</section>
```

### 🛍 Интернет-магазин

- Стек: **Next.js App Router** + CSS Modules или Tailwind.
- Структура страниц: `/`, `/catalog`, `/catalog/[category]`, `/product/[slug]`, `/cart`, `/checkout`.
- Компоненты: `ProductCard`, `ProductGrid`, `CartDrawer`, `FilterSidebar`, `QuickView`.
- Cart state: Zustand или React Context + localStorage persist.
- Оптимизация изображений: всегда `next/image` с `sizes` атрибутом.
- Skeleton loaders для всех асинхронных секций.

```jsx
// ProductCard — базовая структура
export function ProductCard({ product }) {
  return (
    <article className={styles.card}>
      <div className={styles.card__media}>
        <Image src={product.image} alt={product.name} fill sizes="(max-width: 768px) 50vw, 25vw" />
        <button className={styles.card__quickAdd} aria-label="Быстро добавить в корзину">
          + В корзину
        </button>
      </div>
      <div className={styles.card__info}>
        <h3 className={styles.card__name}>{product.name}</h3>
        <p className={styles.card__price}>{product.price} ₽</p>
      </div>
    </article>
  );
}
```

---

## 📱 Mobile-First & Адаптивность

### Брейкпоинты

```scss
// _breakpoints.scss
$bp-sm: 480px;
$bp-md: 768px;
$bp-lg: 1024px;
$bp-xl: 1280px;
$bp-2xl: 1536px;

@mixin sm { @media (min-width: #{$bp-sm}) { @content; } }
@mixin md { @media (min-width: #{$bp-md}) { @content; } }
@mixin lg { @media (min-width: #{$bp-lg}) { @content; } }
@mixin xl { @media (min-width: #{$bp-xl}) { @content; } }
```

### Правила

- Всегда начинать с мобильного layout, затем расширять через `min-width`.
- Использовать `clamp()` для fluid typography:
  ```css
  font-size: clamp(2rem, 5vw + 1rem, 5rem);
  ```
- Touch targets: минимум 44×44px.
- Навигация на мобильном: hamburger → full-screen overlay с анимацией.
- Горизонтальный скролл — только явно, через `overflow-x: auto` + `scrollbar-width: none`.

---

## 🔍 SEO-оптимизация

### Обязательный минимум для каждого проекта

```html
<!-- В <head> каждой страницы -->
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Уникальный заголовок · Бренд</title>
<meta name="description" content="150–160 символов, с ключевым словом." />
<link rel="canonical" href="https://example.com/page" />

<!-- Open Graph -->
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:image" content="https://example.com/og-image.jpg" /> <!-- 1200×630 -->
<meta property="og:url" content="..." />
<meta property="og:type" content="website" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
```

### Структура заголовков

- Один `<h1>` на страницу — всегда.
- `<h2>` для разделов, `<h3>` для подразделов.
- Не пропускать уровни заголовков.

### Изображения

- Атрибут `alt` — всегда. Описательный, с ключевыми словами там, где уместно.
- Форматы: WebP с fallback JPEG/PNG. AVIF для современных браузеров.
- Lazy loading: `loading="lazy"` для всего ниже fold.

### Семантика

- `<main>`, `<header>`, `<footer>`, `<nav>`, `<article>`, `<section>` — по смыслу.
- Schema.org разметка для: LocalBusiness, Product, BreadcrumbList, FAQPage.

---

## ⚡ Производительность

- Шрифты: подключать через `font-display: swap`, preload критичных.
- Critical CSS: инлайнить для above-the-fold контента в Astro/Next.js.
- Изображения hero: всегда `loading="eager"` + `fetchpriority="high"`.
- Избегать render-blocking скриптов: `defer` или `type="module"`.
- Bundle: разбивать на chunks, lazy load тяжёлых библиотек (GSAP, Three.js).

```html
<!-- Preload критичного шрифта -->
<link rel="preload" href="/fonts/display.woff2" as="font" type="font/woff2" crossorigin />
```

---

## 📁 Структура проекта

### Astro / Vanilla

```
src/
├── components/        # Переиспользуемые компоненты
├── layouts/           # Layout-обёртки
├── pages/             # Страницы (роутинг)
├── styles/
│   ├── _variables.scss
│   ├── _reset.scss
│   ├── _typography.scss
│   ├── _animations.scss
│   └── global.scss
├── scripts/           # JS-модули
│   ├── animations.js
│   └── utils.js
└── assets/            # Статика (шрифты, иконки)
```

### Next.js

```
src/
├── app/               # App Router
│   ├── layout.jsx
│   ├── page.jsx
│   └── [routes]/
├── components/
│   ├── ui/            # Атомарные компоненты (Button, Input, Badge...)
│   ├── sections/      # Секции страниц (Hero, Features, Pricing...)
│   └── layout/        # Header, Footer, Navigation
├── styles/
│   ├── globals.css
│   └── variables.css
├── lib/               # Утилиты, хелперы, константы
├── hooks/             # Кастомные React hooks
└── public/
```

---

## 🔧 Компоненты — шаблоны

### Кнопки

```css
.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius-full);
  font-weight: 600;
  font-size: 0.9375rem;
  letter-spacing: 0.01em;
  transition: all var(--transition-base);
  cursor: pointer;
  border: none;
  text-decoration: none;
}

.btn--primary {
  background: var(--color-accent);
  color: #000;
}

.btn--primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.2);
}

.btn--ghost {
  background: transparent;
  color: var(--color-text);
  border: 1px solid var(--color-border);
}

.btn--ghost:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}
```

### Navigation

```html
<header class="header" role="banner">
  <nav class="nav" aria-label="Основная навигация">
    <a href="/" class="nav__logo" aria-label="На главную">Brand</a>
    <ul class="nav__links" role="list">
      <li><a href="/about" class="nav__link">About</a></li>
      <li><a href="/work" class="nav__link">Work</a></li>
      <li><a href="/contact" class="nav__link">Contact</a></li>
    </ul>
    <button class="nav__toggle" aria-expanded="false" aria-label="Открыть меню">
      <span></span><span></span>
    </button>
  </nav>
</header>
```

---

## ✅ Чеклист перед сдачей

### Дизайн
- [ ] Чёткая эстетическая концепция выдержана от начала до конца
- [ ] Dark mode работает корректно
- [ ] Все hover-состояния реализованы
- [ ] Анимации отключаются при `prefers-reduced-motion`
- [ ] Кастомные шрифты загружены и отображаются верно

### Адаптивность
- [ ] Проверено на 320px, 375px, 768px, 1024px, 1440px
- [ ] Нет горизонтального скролла на мобильном
- [ ] Touch targets ≥ 44×44px
- [ ] Навигация работает на мобильном

### SEO
- [ ] Уникальные `<title>` и `<meta description>` на каждой странице
- [ ] Open Graph теги расставлены
- [ ] Один `<h1>` на страницу
- [ ] Все изображения с атрибутом `alt`
- [ ] `<link rel="canonical">` задан

### Производительность
- [ ] Изображения в WebP формате
- [ ] Шрифты с `font-display: swap`
- [ ] Нет render-blocking скриптов
- [ ] Hero image с `fetchpriority="high"`

### Код
- [ ] Нет `console.log` в продакшн-коде
- [ ] CSS переменные используются системно
- [ ] Нет инлайн-стилей (кроме динамических JS-значений)
- [ ] Семантический HTML

---

## 🚫 Антипаттерны — никогда не делать

- ❌ Шрифты Inter, Roboto, Arial как display-шрифты
- ❌ Фиолетовые градиенты на белом фоне
- ❌ `!important` без крайней необходимости
- ❌ `position: absolute` для layout (использовать Grid/Flex)
- ❌ Анимировать `width`, `height`, `margin`, `top`, `left`
- ❌ `@import` CSS внутри CSS файлов (только `@use` в SCSS)
- ❌ Изображения без `width` и `height` атрибутов (CLS)
- ❌ Один огромный CSS файл без разбивки
- ❌ JavaScript для того, что можно сделать на CSS
- ❌ Placeholder текст типа "Lorem ipsum" в финальном коде

---

*Обновлено: 2025 · Стек: Astro / Next.js / Vue/Nuxt / Vanilla · JS · SCSS / CSS Modules / Tailwind*
