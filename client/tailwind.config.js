/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    safelist: [
        // Dynamic classes used in components via template literals
        'bg-cyan-400/5', 'bg-cyan-400/10', 'bg-cyan-400/20',
        'bg-neon-green/5', 'bg-neon-green/10', 'bg-neon-green/20',
        'bg-blue-500/5', 'bg-blue-500/10', 'bg-blue-500/20',
        'bg-red-500/5', 'bg-red-500/10', 'bg-red-500/20',
        'bg-purple-500/10',
        'border-cyan-400/20', 'border-neon-green/20', 'border-blue-500/20',
        'text-cyan-400', 'text-neon-green', 'text-blue-500', 'text-red-500', 'text-purple-500',
    ],
    theme: {
        extend: {
            colors: {
                'teal-accent': '#00FFD1',
                neon: {
                    cyan: "#00F5FF",
                    green: "#39FF14",
                },
                navy: {
                    deep: "#05081a",
                    light: "#0A0F2C",
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                orbitron: ['Orbitron', 'sans-serif'],
            },
            animation: {
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
        },
    },
    plugins: [],
}
