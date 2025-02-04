import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        inspire_teacher: "url('/src/assets/images/inspired-teacher.jpg')",
        class_icon: "url('/src/assets/icons/total-class.png')",
        users_icon: "url('/src/assets/icons/users.png')",
        enrollment_icon: "url('/src/assets/icons/enrollment.png')",
        payment_bg:"url('/src/assets/images/payment.svg')"
      },
      screens: {
        'large': "940px",
        'desktop': "1160px"
      }
    },
  },
  plugins: [daisyui],
}

