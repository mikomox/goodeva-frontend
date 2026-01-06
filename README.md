# Frontend Todo List Test

Aplikasi Todo List modern dan responsif yang dibangun menggunakan React, TypeScript, dan Tailwind CSS

## 🚀 Fitur

-   **Autentikasi**:
    -   Login berbasis API Key.
    -   Penyimpanan aman menggunakan `localStorage`.
    -   Verifikasi kunci dengan umpan balik server (status loading, notifikasi toast).
-   **Manajemen Todo**:
    -   **Lihat**: Menampilkan daftar tugas dengan UI yang bersih.
    -   **Buat**: Menambahkan tugas baru secara instan 
    -   **Toggle**: Menandai tugas sebagai aktif/selesai 
-   **Pencarian & Filter**:
    -   **Pencarian Real-time**: Pencarian dengan *debounce* untuk kinerja optimal.
    -   **Penyaringan**: Filter tugas berdasarkan "Semua" (All), "Aktif" (Active), atau "Selesai" (Completed).
-   **UX/UI**:
    -   **Sistem Desain**: Tema "Clean Tech" kustom menggunakan Tailwind CSS.
    -   **Animasi**: Transisi halus menggunakan `framer-motion`.
    -   **Umpan Balik**: Notifikasi toast melalui `sonner`.
    -   **Ikon**: Ikonografi yang konsisten menggunakan `lucide-react`.

## 🛠️ Stack Teknologi

-   **Inti**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/)
-   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/), `clsx`, `tailwind-merge`
-   **Manajemen State & Pengambilan Data**: [@tanstack/react-query](https://tanstack.com/query/latest)
-   **HTTP Client**: [Axios](https://axios-http.com/)
-   **Utilitas**:
    -   `sonner`: Untuk notifikasi toast.
    -   `use-debounce`: Untuk menangani input pencarian.
    -   `framer-motion`: Untuk animasi tata letak.

## 📂 Struktur Proyek

```bash
src/
├── components/        
├── features/          
│   ├── auth/          
│   └── todos/         
├── lib/               
└── App.tsx            
```

## Requirements

-   Node.js >= 20
-   npm >= 10

## 🔧 Instalasi & Pengaturan

1.  **Instal Dependensi**:

    ```bash
    npm install
    ```

2.  **Pengaturan Environment**:
    Pastikan Anda memiliki file `.env` di root folder

    ```env
    VITE_API_URL=/api
    ```

3.  **Jalankan Server Development**:

    ```bash
    npm run dev
    ```

    Aplikasi akan berjalan di `http://localhost:5173`.


