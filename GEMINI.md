# Project: My TypeScript Library

## General Instructions for Node.js/Express

*   Use Asynchronous Code: Always prefer asynchronous functions (using Promises or async/await) over synchronous ones, as synchronous operations block the Node.js event loop, severely impacting performance under load.
*   Modularize with MVC/Layered Structure: Use a Model-View-Controller (MVC) or a Layered Architecture to separate concerns:  
    *   Routes: Handle request/response logic and call controllers.
    *   Controllers: Contain the main business logic.
    *   Services/Models: Handle database interaction and complex logic (e.g., in a separate src/services or src/models directory).
*   **Environment Variables:** Use a library like `**dotenv**` to load configuration variables (like port, API keys, database credentials) from a `**.env**` file. **Never** commit the `.env` file to version control.
*   **Error Handling Middleware:** Implement a **centralized error handling middleware** (placed last in your Express middleware chain) to catch and format errors, preventing the app from crashing due to uncaught exceptions.
*   **Input Validation:** Use a library like **Joi** or **Express-Validator** to validate all user input on the server side to ensure data integrity and security.

## General Instructions for Tailwind CSS

*   **Use PostCSS and Autoprefixer:** Since Tailwind is a PostCSS plugin, ensure your setup includes `**postcss**` and `**autoprefixer**` to process the utility classes and add necessary vendor prefixes for cross-browser compatibility.
*   **Configure Content Paths Correctly:** In your `tailwind.config.js`, the `content` array **must** accurately list all files where you use Tailwind classes (e.g., EJS templates, JavaScript files).
*   **Purge for Production:** When building your CSS for production, make sure to set `NODE_ENV=production` in your build script. Tailwind's build process will automatically **purge (tree-shake) all unused CSS classes**, drastically reducing the final CSS file size.

## Coding Style

*   Use 2 spaces for indentation.
*   Always use strict equality (`===` and `!==`).
*   **Componentize Often (Views/Partials):** Avoid repeating long class strings across multiple views. Even without a frontend framework (like React), you should **extract UI patterns into reusable partials** (e.g., an EJS partial for a `<button>` or a `<card>`). This reduces **"class soup"** and centralizes styling changes.
*   **Use** `**@apply**` **for Complex/Repeated Components:** If a class list for a component becomes long (e.g., 5-10 classes) and is used in multiple components, use the `**@apply**` directive in a minimal, separate CSS file (`input.css`) to create a custom class.
*   **Extend the Theme:** Use `tailwind.config.js` to define **custom design tokens** (colors, fonts, spacing) rather than using arbitrary values in your HTML. This centralizes the design system and ensures consistency.