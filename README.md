# Rahul Sutradhar — Advanced Portfolio Website

A high-performance, JavaScript-driven portfolio engineered to deliver a refined, interactive user experience. This project emphasizes motion design, 3D interaction, and modern UI principles while maintaining strict performance discipline and zero reliance on heavy frameworks.

---

## Overview

This portfolio is designed as a dynamic interface rather than a static webpage. It demonstrates strong frontend engineering capability through real-time interactions, efficient rendering strategies, and a clean, production-oriented architecture.

The implementation prioritizes:
- Responsiveness and smoothness across devices
- GPU-accelerated animations
- Minimal dependencies for maximum control
- Clear separation of structure, style, and behavior

---

## Key Features

### 1. Motion-Driven Hero Section
- Dynamic typing engine implemented in pure JavaScript
- Canvas-based animated background using `requestAnimationFrame`
- Smooth call-to-action navigation

### 2. 3D Interactive Project Cards
- Real-time tilt effects based on cursor position
- Perspective-based depth simulation
- Hardware-accelerated transforms for optimal performance

### 3. Scroll-Triggered Animations
- Efficient use of Intersection Observer API
- Progressive reveal system to enhance visual flow
- No scroll event overuse, reducing performance overhead

### 4. Skills Visualization
- Data-driven progress bars using custom attributes
- Lazy-triggered animation on viewport entry
- Clean and readable representation of competencies

### 5. Structured Experience Timeline
- Minimalist layout focusing on clarity
- Chronological flow with emphasis on roles and progression

### 6. Lightweight Contact System
- JavaScript-controlled form handling
- Easily extendable to backend APIs or serverless functions

---

## Technical Architecture

### Stack

| Layer        | Technology |
|--------------|-----------|
| Structure    | HTML5 |
| Styling      | CSS3 (Flexbox, Gradients, Glassmorphism) |
| Logic        | Vanilla JavaScript (ES6+) |
| Animation    | Canvas API + DOM APIs |

---

## Engineering Principles

### Performance-First Design
- Avoidance of heavy libraries and frameworks
- Use of `transform` and `opacity` for animations (GPU accelerated)
- Minimal layout thrashing

### Modularity
- Clear separation between layout, styling, and logic
- Reusable animation patterns and handlers

### Progressive Enhancement
- Core content remains accessible
- Enhancements layered through JavaScript

---

## Core Implementation Details

### Typing Engine
A custom-built typing system cycles through roles dynamically without external libraries.

### Intersection Observer
Used to trigger animations only when elements enter the viewport, improving efficiency and reducing unnecessary computations.

```javascript
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("active");
  });
});
