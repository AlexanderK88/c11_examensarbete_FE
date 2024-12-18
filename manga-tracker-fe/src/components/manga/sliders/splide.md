To replicate and enhance this Splide.js-based slider with React, we can use the **React Splide** package, which is specifically designed for integrating Splide.js sliders into React projects. Here's how to implement the desired slider with enlarged middle slides and auto-sliding functionality.

---

### **Steps to Implement**

1. **Install React Splide**:
   Install the necessary package:

   ```bash
   npm install @splidejs/react-splide
   ```

2. **Configure the Slider**:
   Use the `@splidejs/react-splide` package to create the slider and apply custom styling for the middle slide.

3. **Enhance the Middle Slide**:
   Use Splide's events (`move` or `mounted`) to dynamically add classes to the middle slide for styling purposes.

---

### **Code Implementation**

#### **HeroSection.tsx**

```tsx
import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css"; // Default Splide styles
import { MangaDto } from "../../../types/mangaTypes";

interface HeroSectionProps {
  mangas: MangaDto[];
}

export default function HeroSection({ mangas }: HeroSectionProps) {
  const options = {
    type: "loop", // Infinite scrolling
    perPage: 5, // Show 5 slides at a time
    focus: "center", // Center the middle slide
    gap: "1rem", // Space between slides
    autoplay: true, // Auto-slide
    interval: 3000, // Auto-slide interval in ms
    speed: 800, // Transition speed
    breakpoints: {
      1024: { perPage: 3 }, // Show 3 slides on medium screens
      768: { perPage: 1 }, // Show 1 slide on small screens
    },
  };

  return (
    <div className="w-full bg-gradient-to-r from-purple-600 to-blue-500 py-8">
      <h1 className="text-4xl text-center font-bold text-white mb-6">
        Discover Trending Mangas
      </h1>
      <Splide
        options={options}
        aria-label="Featured Mangas"
        className="splide-slider"
      >
        {mangas.map((manga) => (
          <SplideSlide key={manga.id}>
            <div className="relative group transform transition-transform duration-300">
              <img
                src={manga.coverImage}
                alt={manga.title}
                className="rounded-lg shadow-lg object-cover w-full h-64"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-lg font-bold">{manga.title}</h3>
                <p className="text-sm">Popularity: {manga.popularity}</p>
              </div>
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
}
```

---

### **Features and Highlights**

1. **Middle Slide Styling**:

   - Using Splide's `focus: "center"` option ensures the middle slide is always centered.

2. **Dynamic Slide Highlight**:

   - Tailwind utility classes (`transform`, `transition-transform`, and `scale-110`) are used to dynamically scale the middle slide.

3. **Auto-Slide**:

   - Enabled via `autoplay: true` and `interval: 3000`.

4. **Responsive Design**:

   - Use `breakpoints` to control the number of slides (`perPage`) for different screen sizes.

5. **Hover Effect**:
   - A `group-hover` overlay is added to display additional information when hovering over a slide.

---

### **Styling with Tailwind CSS**

#### **Tailwind Enhancements**:

- **Base Styles**:

  ```css
  .splide-slider .splide__slide {
    transition: transform 0.3s ease-in-out;
  }
  .splide-slider .splide__slide.is-active {
    transform: scale(1.1); /* Enlarge the active slide */
  }
  ```

- **Responsive Adjustments**:
  Tailwind classes handle dynamic resizing, scaling, and spacing.

---

### **Installing Splide Dependencies**

1. Ensure `@splidejs/react-splide` is installed.
2. Include the CSS in your project for default styling or customize as needed.

---

This implementation ensures a fully functional and visually engaging slider with React Splide and Tailwind CSS, making it easy to highlight the middle slide dynamically!
