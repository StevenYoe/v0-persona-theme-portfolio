# Panduan Pengisian Konten Per Bidang

Semua teks yang berubah sesuai bidang ada di satu file: `lib/portfolio-data.ts`. Kamu tidak perlu menyentuh komponen untuk mengganti isi.

## Alur baru

START → pilih bidang → portfolio tampil sesuai bidang.
Dari Pause Menu (ESC) ada menu **CHANGE FIELD** untuk ganti bidang tanpa kembali ke Main Menu.

## Bagian yang mengikuti bidang

| Bagian web | Properti di data |
|---|---|
| Teks kecil di hero ("IT QUALITY ASSURANCE") | `heroTitle` |
| Judul besar, badge, dan paragraf About | `about.headingTop`, `about.headingBottom`, `about.badge`, `about.paragraphs` |
| File tombol DOWNLOAD CV | `cv.file`, `cv.downloadName` |
| Kotak statistik di About | `stats` |
| Carousel Skills | `skills` |
| Grid Tools & Technologies | `tools` |
| Section Projects | `projects` |
| Tab WORK di Experience | `experience.work` |

Tab WORK di Experience mengikuti bidang. Tab ORGANIZATION dan EDUCATION serta section Contact sama untuk semua bidang.

## Bidang yang tersedia

Empat bidang, dibuat mengikuti empat CV kamu.

| id | Label menu | Hero | File CV | Asal CV |
|---|---|---|---|---|
| `qa` | QA & TESTING | IT QUALITY ASSURANCE | `public/cv/CV_Steven_QA.pdf` | `CV_Steven_QA.pdf` |
| `it-support` | IT SUPPORT | IT SUPPORT & TECHNICIAN | `public/cv/CV_Steven_IT_Technician.pdf` | `CV_Steven_IT_Techinician.pdf` |
| `developer` | WEB DEVELOPER | WEB DEVELOPER | `public/cv/CV_Steven_IT.pdf` | `CV_Steven_IT.pdf` |
| `operations` | OPS & LEADERSHIP | OPERATIONS & TEAM LEADERSHIP | `public/cv/CV_Steven_Operations_Leadership.pdf` | Versi umum yang dibuat dari template `CV_Steven.docx` dengan isi CV ASDP |

Nama file `Techinician` di CV asli saya betulkan menjadi `Technician` saat disalin ke `public/cv/`.

Bidang pertama di array `FIELDS` adalah tombol paling atas di layar pilih bidang. `DEFAULT_FIELD` dipakai sebagai cadangan kalau bidang belum terpilih.

## Mengisi bidang yang sudah ada

Buka `lib/portfolio-data.ts`, cari bidangnya di array `FIELDS`, lalu ubah nilainya.

```ts
{
  id: 'qa',
  label: 'QA & TESTING',                  // judul di layar pilih bidang
  sublabel: 'Software & API Testing',
  heroTitle: 'IT QUALITY ASSURANCE',
  sections: ['about', 'skills', 'experience', 'projects', 'contact'],
  about: {
    headingTop: 'ENSURING',
    headingBottom: 'SOFTWARE QUALITY',
    badge: 'QA',
    paragraphs: ['Paragraf 1', 'Paragraf 2'],   // boleh 1 sampai 3 paragraf
  },
  cv: { file: '/cv/CV_Steven_QA.pdf', downloadName: 'CV_Steven_QA.pdf' },
  stats: [ { number: '3', label: 'Internship Experience' }, ... ],  // disarankan 4 item
  skills: [ ... ],
  tools: [ ... ],
  projects: [ ... ],
  experience: { work: numbered([...]), organization: organizationExperience, education: educationExperience },
}
```

Isi semua bidang sudah saya susun dari keempat CV kamu. Baca ulang satu per satu sebelum push.

## Menambah bidang baru

1. Tambahkan id baru di tipe `FieldId` (baris paling atas file):
   ```ts
   export type FieldId = 'qa' | 'it-support' | 'developer' | 'operations' | 'data-analyst'
   ```
2. Salin salah satu objek di `FIELDS`, tempel di bawahnya, lalu ganti isinya. `id` harus sama dengan yang kamu tulis di langkah 1.
3. Taruh file CV di `public/cv/` dan samakan namanya dengan `cv.file`.

Layar pilih bidang otomatis menampilkan opsi baru. Urutan tombol mengikuti urutan di array `FIELDS`.

### Kapan perlu bidang baru, kapan cukup ganti CV

Bidang di portofolio sebaiknya mewakili jenis peran, bukan satu per satu lamaran. Aturan praktisnya:

| Situasi | Yang dilakukan |
|---|---|
| Lamaran OMT, ASDP, Management Trainee, atau program sejenis | Tidak perlu bidang baru. Semuanya masuk `operations`. Kirim CV yang disesuaikan langsung ke perusahaan, tanpa mengubah portofolio. |
| CV untuk perusahaan tertentu menyebut nama programnya | Simpan sebagai file terpisah di luar `public/cv/`. File yang diunduh pengunjung portofolio sebaiknya versi umum. |
| Jenis peran yang benar-benar berbeda, misalnya Data Analyst, Supply Chain, atau Admin | Tambah bidang baru, karena skills, stats, dan pengalaman yang disorot juga berbeda. |
| Hanya ingin memperbarui CV bidang yang ada | Timpa file PDF-nya di `public/cv/` dengan nama yang sama. |

Dengan begitu layar pilih bidang tetap pendek dan mudah dipilih. Empat sampai lima bidang masih nyaman.

## Mengisi Skills

Satu skill terdiri dari empat properti:

```ts
{
  name: 'Quality Assurance',
  icon: '✅',                 // satu emoji
  description: 'Satu sampai dua kalimat.',
  category: 'Testing',        // label kecil di atas kartu
}
```

Skill yang sama bisa dipakai di beberapa bidang. Cukup definisikan sekali sebagai konstanta (lihat `skillQA`, `skillBackend`, dan seterusnya di bagian atas file), lalu masukkan ke array `skills` bidang yang butuh.

## Mengisi Projects

```ts
{
  id: 1,                      // pengenal unik di dalam satu bidang, tidak ditampilkan
  title: 'Nama Project',
  category: 'Full-stack Development',
  description: 'Ringkasan satu kalimat untuk kartu.',
  fullDescription: 'Penjelasan panjang untuk popup detail.',
  tags: ['Laravel', 'MySQL'],
  year: '2025',
  features: ['Fitur 1', 'Fitur 2', 'Fitur 3', 'Fitur 4'],
  image: '/images/nama-project.webp',
  link: 'https://contoh.com',
}
```

Langkah menambah project:
1. Simpan gambar di `public/images/` (format `.webp`, rasio mendekati gambar yang sudah ada).
2. Buat konstanta project di bagian atas file, misalnya `const myProject: Project = { ... }`.
3. Masukkan `myProject` ke array `projects` pada bidang yang relevan. Urutan array menentukan urutan tampil.

Nomor besar di kartu project (01, 02, 03) mengikuti urutan di array `projects` bidang itu, bukan nilai `id`. Jadi kalau di QA urutannya `[pazarProject, reseCornerProject]`, Pazar jadi 01. Kalau di IT Support dibalik, Rese Corner yang jadi 01.

Project yang sama boleh muncul di banyak bidang. Karena `id` hanya perlu unik di dalam satu bidang, tidak ada konflik.

## Mengisi CV

1. Siapkan satu PDF per bidang.
2. Simpan di `public/cv/` dengan nama persis seperti `cv.file`.
3. `downloadName` adalah nama file yang diterima pengunjung saat mengunduh.

Keempat CV kamu sudah terpasang. Untuk memperbarui, timpa file dengan nama yang sama.

## Mengisi Stats

Stat dipakai sebagai kotak angka di About. Gunakan angka yang bisa kamu pertanggungjawabkan. Sumber angka di keempat bidang:

| Stat | Sumber |
|---|---|
| 3 Internship | PT Global Loyalty, PT Pristine, PT Samanasoft |
| 6 Months QA Internship | Agustus 2025 sampai Januari 2026 |
| 3.81 GPA | Tertulis di semua CV |
| 8+ Years | Rendy Audio sejak 2017. Tambahkan angkanya seiring waktu |
| 5 Hands-on Hardware Tasks | Daftar di bagian Hands-on Technical Experience pada CV IT Technician |
| 3 Concurrent Event Roles, 4 Treasurer Roles | CV ASDP dan data Organization |
| 5+ Web Projects, 3+ Happy Clients | Angka lama dari portofolio. Tidak tertulis di CV, jadi cek apakah masih benar |

## Menambah, mengganti, atau mengurangi isi section per bidang

Ada dua tingkat perubahan. Keduanya sudah bisa dilakukan lewat `lib/portfolio-data.ts`.

### Tingkat 1: mengubah jumlah isi di dalam section

Cukup tambah atau hapus item di array bidang yang bersangkutan pada `lib/portfolio-data.ts`. Tidak perlu menyentuh komponen.

| Yang ingin diubah | Caranya | Batas aman |
|---|---|---|
| Jumlah project | Tambah atau hapus objek di `projects` | Boleh 1 atau lebih |
| Jumlah skill | Tambah atau hapus objek di `skills` | Minimal 1 |
| Jumlah tools | Tambah atau hapus nama di `tools` | Boleh kosong, tapi judul "TOOLS & TECHNOLOGIES" tetap tampil dengan area kosong |
| Jumlah stat | Tambah atau hapus objek di `stats` | Disarankan 4 supaya grid rapi, 2 sampai 4 masih wajar |
| Jumlah paragraf About | Tambah atau hapus teks di `about.paragraphs` | Boleh 1 sampai 3 |

Contoh, satu bidang hanya menampilkan satu project:

```ts
projects: [pazarProject],
```

Peringatan untuk kondisi kode saat ini:

- `skills: []` akan membuat halaman error, karena carousel membaca item pertama.
- `projects: []` tidak error, tapi judul PROJECTS tetap tampil dengan area kosong. Kalau satu bidang memang tidak punya project, jangan dikosongkan. Sembunyikan section-nya dengan Tingkat 2 di bawah.

### Tingkat 2: menyembunyikan atau mengurutkan ulang seluruh section

Setiap bidang punya properti `sections` yang menentukan section apa saja yang tampil dan urutannya. Hero selalu tampil dan tidak perlu ditulis.

```ts
// QA, semua section
sections: ['about', 'skills', 'experience', 'projects', 'contact'],

// Contoh bidang tanpa projects
sections: ['about', 'skills', 'experience', 'contact'],
```

Id yang tersedia: `about`, `skills`, `experience`, `projects`, `contact`.

Yang terjadi otomatis:
- Section yang tidak ada di daftar tidak dirender sama sekali.
- Tab NAVIGATION di Pause Menu hanya menampilkan section yang tampil, jadi tidak ada tombol yang menuju section kosong.
- Urutan di array menentukan urutan tampil di halaman. Menulis `['about', 'projects', 'skills', 'contact']` memindahkan Projects ke atas Skills.

Catatan:
- Label bernomor seperti `01 / ABOUT` sudah diganti menjadi `/ ABOUT` supaya nomornya tidak lompat saat ada section yang disembunyikan.
- Kalau section disembunyikan, datanya di bidang itu tidak dipakai. Kamu boleh membiarkannya terisi atau mengosongkannya. Khusus `skills`, bidang dengan section Skills tetap harus punya minimal 1 skill.
- Mengubah `sections` tidak mempengaruhi Hero maupun Contact kecuali kamu menghapus `contact` dari daftar.

### Menambah section yang benar-benar baru (belum ada, butuh kode)

Misalnya section CERTIFICATIONS khusus bidang tertentu:

1. Buat komponen baru, misalnya `components/certifications-section.tsx`, dengan gaya yang meniru section lain.
2. Tambahkan `'certifications'` ke tipe `SectionId` di `lib/portfolio-data.ts`, lalu daftarkan komponennya di `SECTION_COMPONENTS` pada `app/page.tsx`.
3. Kalau isinya berbeda per bidang, tambahkan properti datanya di `FieldContent` (misalnya `certifications?: Certification[]`) dan isi di bidang yang memakainya.
4. Tambahkan `'certifications'` ke `sections` pada bidang yang ingin menampilkannya, di posisi yang kamu mau.
5. Tambahkan satu entri di `navItems` pada `components/pause-menu.tsx`, dengan `id` yang sama.

### Mengganti isi Experience per bidang

Tab WORK sekarang bisa berbeda tiap bidang. Tab ORGANIZATION dan EDUCATION sama untuk semua dan dikelola sekali saja.

Di `lib/portfolio-data.ts` ada empat konstanta pengalaman kerja: `globalLoyalty`, `pristine`, `samanasoft`, dan `rendyAudio`. Tiap bidang memilih mana yang tampil, urutannya, dan boleh menimpa deskripsi atau sorotan lewat `tweak`:

```ts
experience: {
  work: numbered([
    rendyAudio,                                  // dipakai apa adanya
    tweak(globalLoyalty, {                       // dipakai dengan sorotan berbeda
      description: 'Kalimat baru untuk bidang ini.',
      highlights: ['Poin 1', 'Poin 2'],
    }),
    pristine,
  ]),
  organization: organizationExperience,
  education: educationExperience,
},
```

Urutan di dalam `numbered([...])` menentukan urutan kartu. Untuk menambah pengalaman kerja baru, buat konstanta `ExperienceBase` baru dengan bentuk yang sama, lalu masukkan ke bidang yang butuh. Untuk mengubah data Organization atau Education, edit `organizationExperience` atau `educationExperience` sekali dan semua bidang ikut berubah.

### Ringkasan kapan memakai yang mana

| Kebutuhan | Pakai |
|---|---|
| Bidang A punya 3 project, bidang B punya 1 | Tingkat 1 |
| Bidang B tidak punya section Projects sama sekali | Tingkat 2, hapus `'projects'` dari `sections` |
| Ganti urutan section di satu bidang | Tingkat 2 |
| Section baru khusus satu bidang | Menambah section baru |
| Pengalaman kerja berbeda per bidang | `experience.work` dengan `tweak` |

## Cek sebelum deploy

Hal yang saya ubah atau tentukan sendiri dan perlu kamu pastikan:

- GPA di tab Education sebelumnya 3.84, sekarang 3.81 mengikuti semua CV. Periode juga diubah dari "2022 - Present" menjadi "2022 - 2026" karena CV menyebut kamu sudah lulus.
- Rendy Audio ditambahkan ke tab WORK untuk bidang IT Support dan Operations, karena ada di CV kedua bidang itu. Di bidang QA dan Developer tidak tampil, sama seperti CV-nya.
- Peran ECLIVAL 2024 diubah menjadi "Treasurer & Front of House" mengikuti CV ASDP.
- CV bidang Operations sudah versi umum. Nama program Blibli OMG, pernyataan siap penempatan nasional, dan minat gadget dari CV ASDP tidak saya bawa, karena itu spesifik untuk satu lamaran.
- Stat "5+ Web Projects" dan "3+ Happy Clients" tidak ada di CV. Pastikan masih benar.
- Paragraf About, deskripsi skill, dan sorotan pengalaman saya tulis ulang dari isi CV. Ubah kalimat yang kurang pas dengan gayamu.

Sebelum push:

- Klik tiap bidang dan scroll sampai Contact, pastikan tidak ada teks yang tidak cocok.
- Buka tiap tab di Experience (WORK, ORGANIZATION, EDUCATION) pada tiap bidang.
- Buka Pause Menu, tab NAVIGATION, pastikan daftar tombolnya sesuai section yang tampil.
- Klik tombol Download CV di tiap bidang dan pastikan PDF yang terbuka benar.
- Jalankan `bun run build`.

## Tentang menu Credits

Tombol Quit sudah diganti dengan **CREDITS** di Main Menu. Alasannya, browser tidak mengizinkan script menutup tab yang dibuka langsung oleh pengunjung, jadi Quit tidak bisa diandalkan.

Isi Credits ada di `lib/credits.ts`:

- `builtBy`, `repoUrl`, dan `techStack` sudah terisi.
- `music` berisi daftar lagu per tema (Persona 3, 4, dan 5). Untuk menambah lagu, tambahkan objek `{ title, game }` di `tracks` grup yang sesuai. Untuk menambah grup baru, tambahkan objek `{ theme, tracks }`.
- `musicNote` dan `disclaimer` adalah catatan kecil di bagian bawah. Kosongkan `musicNote` kalau tidak ingin tampil.

Tampilannya ada di `components/credits-modal.tsx`. Popup ditutup dengan ESC, Enter, tombol BACK, atau klik di luar kotak.

## Catatan teknis: SFX

Suara klik sebelumnya bisa terdengar dua kali lewat mouse, karena satu klik ditangkap oleh handler komponen dan oleh listener global di `components/audio-manager.tsx`. Sekarang `playSFX` mengabaikan suara jenis yang sama kalau baru diputar kurang dari 80 ms sebelumnya. Kalau suatu saat ingin mengubah batasnya, nilainya ada di `SFX_DEDUPE_MS`.

## Catatan teknis: link di Contact

- Link sosial (GitHub, LinkedIn, Instagram, Website) dan tombol WhatsApp selalu membuka tab baru.
- WhatsApp memakai `wa.me` di tab baru. Link ini otomatis membuka aplikasi WhatsApp kalau terpasang, atau WhatsApp Web kalau tidak, jadi cocok untuk semua pengunjung.
- Email memakai `mailto:` biasa tanpa tab baru. Link ini membuka aplikasi email pengunjung dan tidak meninggalkan halaman, sedangkan `target="_blank"` pada `mailto:` sering hanya meninggalkan tab kosong.
- Nomor WhatsApp diatur di konstanta `WHATSAPP_NUMBER` pada `components/contact-section.tsx`.
