/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Corrected paths to include the 'src' directory
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",        // For files in src/app/
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",      // If you're using the Pages Router in src/
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}", // For files in src/components/
    // Add any other directories where you use Tailwind classes, e.g., for custom hooks, etc.
    // "./src/**/*.{js,ts,jsx,tsx,mdx}", // A more general catch-all for anything directly in src/
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}