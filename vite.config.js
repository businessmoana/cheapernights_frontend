import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        host: '0.0.0.0', // Allows external connections
        port: 5173, // Default port; change if needed
    },
});