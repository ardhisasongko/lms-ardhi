import { supabase } from './services/supabase.js';

async function seedDatabase() {
  console.log('🌱 Mulai seeding database...\n');

  // Hapus data lama
  console.log('🗑️  Menghapus data lama...');
  await supabase.from('user_progress').delete().neq('id', '');
  await supabase.from('quizzes').delete().neq('id', '');
  await supabase.from('lessons').delete().neq('id', '');
  await supabase.from('modules').delete().neq('id', '');
  await supabase.from('courses').delete().neq('id', '');

  // Insert Courses
  console.log('📚 Menambah courses...');
  const { error: courseError } = await supabase.from('courses').insert([
    {
      id: 'tka-literasi',
      title: 'TKA Literasi',
      description:
        'Persiapan Tes Kemampuan Akademik - Literasi Bahasa Indonesia',
      instructor: 'Tim Pengajar LMS Ardhi',
      duration: '10 jam',
      level: 'Menengah',
      image:
        'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400',
    },
  ]);
  if (courseError) console.error('Error courses:', courseError);

  // Insert Modules - 5 Modul Literasi
  console.log('📁 Menambah modules...');
  const { error: moduleError } = await supabase.from('modules').insert([
    {
      id: 'mod-lit-1',
      course_id: 'tka-literasi',
      title: 'Pemahaman Teks',
      description: 'Memahami isi teks, ide pokok, dan informasi penting',
      order_index: 1,
    },
    {
      id: 'mod-lit-2',
      course_id: 'tka-literasi',
      title: 'Struktur dan Jenis Paragraf',
      description: 'Paragraf deduktif, induktif, dan campuran',
      order_index: 2,
    },
    {
      id: 'mod-lit-3',
      course_id: 'tka-literasi',
      title: 'Penalaran dan Kesimpulan',
      description: 'Inferensi, kesimpulan, dan hubungan antar gagasan',
      order_index: 3,
    },
    {
      id: 'mod-lit-4',
      course_id: 'tka-literasi',
      title: 'Kebahasaan',
      description: 'Ejaan, tanda baca, diksi, dan kalimat efektif',
      order_index: 4,
    },
    {
      id: 'mod-lit-5',
      course_id: 'tka-literasi',
      title: 'Latihan Soal TKA',
      description: 'Latihan dan pembahasan soal TKA Bahasa Indonesia',
      order_index: 5,
    },
  ]);
  if (moduleError) console.error('Error modules:', moduleError);

  // Video URL yang sama untuk semua lesson
  const videoUrl = 'https://www.youtube.com/watch?v=KwJ_HMedAFQ';

  // Insert Lessons - 10 Materi Literasi
  console.log('📖 Menambah lessons...');
  const { error: lessonError } = await supabase.from('lessons').insert([
    {
      id: 'les-lit-1',
      module_id: 'mod-lit-1',
      course_id: 'tka-literasi',
      title: 'Menentukan Ide Pokok Paragraf',
      content: `Ide pokok adalah gagasan utama yang menjadi dasar pengembangan paragraf.

Cara menemukan ide pokok:
1. Baca keseluruhan paragraf dengan cermat
2. Identifikasi kalimat utama (biasanya di awal atau akhir paragraf)
3. Cari kata kunci yang sering diulang atau ditekankan
4. Bedakan antara ide pokok dan ide penjelas/pendukung
5. Ringkas inti paragraf dalam satu kalimat

Tips: Ide pokok menjawab pertanyaan "Apa yang dibahas dalam paragraf ini?"`,
      video_url: videoUrl,
      duration: '15 menit',
      order_index: 1,
    },
    {
      id: 'les-lit-2',
      module_id: 'mod-lit-1',
      course_id: 'tka-literasi',
      title: 'Memahami Informasi Tersurat dan Tersirat',
      content: `Informasi dalam teks terbagi menjadi dua:

1. INFORMASI TERSURAT (Eksplisit)
   - Dinyatakan langsung dalam teks
   - Dapat ditemukan dengan membaca literal
   - Contoh: fakta, data, nama, tanggal

2. INFORMASI TERSIRAT (Implisit)
   - Tidak dinyatakan langsung
   - Perlu disimpulkan dari petunjuk dalam teks
   - Memerlukan pemahaman konteks
   - Contoh: maksud penulis, sikap, pesan moral`,
      video_url: videoUrl,
      duration: '15 menit',
      order_index: 2,
    },
    {
      id: 'les-lit-3',
      module_id: 'mod-lit-2',
      course_id: 'tka-literasi',
      title: 'Paragraf Deduktif dan Induktif',
      content: `PARAGRAF DEDUKTIF
- Ide pokok di AWAL paragraf
- Pola: Umum → Khusus
- Kalimat pertama adalah kalimat utama
- Kalimat selanjutnya menjelaskan/mendukung

PARAGRAF INDUKTIF
- Ide pokok di AKHIR paragraf
- Pola: Khusus → Umum
- Dimulai dengan penjelasan/contoh
- Diakhiri dengan kesimpulan (kalimat utama)

PARAGRAF CAMPURAN
- Ide pokok di AWAL dan AKHIR
- Kalimat akhir menegaskan kembali kalimat awal`,
      video_url: videoUrl,
      duration: '20 menit',
      order_index: 1,
    },
    {
      id: 'les-lit-4',
      module_id: 'mod-lit-2',
      course_id: 'tka-literasi',
      title: 'Hubungan Antar Kalimat dalam Paragraf',
      content: `Kalimat dalam paragraf harus saling terhubung (kohesif dan koheren).

JENIS HUBUNGAN ANTAR KALIMAT:
1. Hubungan Penjelas - kalimat berikutnya menjelaskan kalimat sebelumnya
2. Hubungan Sebab-Akibat - karena, sehingga, akibatnya, oleh karena itu
3. Hubungan Pertentangan - tetapi, namun, akan tetapi, sebaliknya
4. Hubungan Perbandingan - seperti, bagaikan, sama halnya dengan
5. Hubungan Penegasan - bahkan, apalagi, terlebih lagi
6. Hubungan Waktu - kemudian, setelah itu, selanjutnya

KONJUNGSI yang sering digunakan: dan, atau, tetapi, karena, sehingga, meskipun, jika`,
      video_url: videoUrl,
      duration: '20 menit',
      order_index: 2,
    },
    {
      id: 'les-lit-5',
      module_id: 'mod-lit-3',
      course_id: 'tka-literasi',
      title: 'Membuat Kesimpulan dari Teks',
      content: `Kesimpulan adalah pernyataan akhir yang diambil berdasarkan informasi dalam teks.

LANGKAH MEMBUAT KESIMPULAN:
1. Baca dan pahami seluruh teks
2. Identifikasi fakta-fakta penting
3. Hubungkan informasi yang saling berkaitan
4. Tarik kesimpulan yang logis

CIRI KESIMPULAN YANG BAIK:
- Didukung oleh fakta dalam teks
- Tidak menambah informasi baru
- Logis dan konsisten
- Mencakup inti dari keseluruhan teks

KESALAHAN UMUM:
- Membuat kesimpulan yang tidak didukung teks
- Mengambil detail sebagai kesimpulan
- Terlalu luas atau terlalu sempit`,
      video_url: videoUrl,
      duration: '15 menit',
      order_index: 1,
    },
    {
      id: 'les-lit-6',
      module_id: 'mod-lit-3',
      course_id: 'tka-literasi',
      title: 'Inferensi dan Penalaran dalam Membaca',
      content: `INFERENSI adalah proses menyimpulkan informasi yang tidak dinyatakan langsung.

JENIS INFERENSI:
1. Inferensi Logis - berdasarkan hubungan sebab-akibat
2. Inferensi Prediktif - memperkirakan apa yang akan terjadi
3. Inferensi Evaluatif - menilai sikap/pendapat penulis

CARA MELAKUKAN INFERENSI:
1. Perhatikan petunjuk dalam teks (kata kunci, konteks)
2. Hubungkan dengan pengetahuan umum
3. Pertimbangkan konteks keseluruhan
4. Pilih kesimpulan yang paling masuk akal

Contoh: "Ani membawa payung saat berangkat" → Inferensi: Cuaca mendung/akan hujan`,
      video_url: videoUrl,
      duration: '20 menit',
      order_index: 2,
    },
    {
      id: 'les-lit-7',
      module_id: 'mod-lit-4',
      course_id: 'tka-literasi',
      title: 'Ejaan dan Tanda Baca',
      content: `EJAAN YANG DISEMPURNAKAN (EYD V):

1. HURUF KAPITAL digunakan untuk:
   - Awal kalimat
   - Nama orang, tempat, lembaga
   - Judul buku, karangan
   - Kata sapaan (Bapak, Ibu)

2. TANDA BACA:
   - Titik (.) → akhir kalimat berita
   - Koma (,) → pemisah unsur, anak kalimat
   - Tanda tanya (?) → kalimat tanya
   - Tanda seru (!) → kalimat perintah/seru
   - Titik dua (:) → sebelum rincian
   - Titik koma (;) → pemisah kalimat setara

3. PENULISAN KATA:
   - Kata depan (di, ke, dari) → ditulis terpisah
   - Awalan (di-, ke-) → ditulis serangkai`,
      video_url: videoUrl,
      duration: '15 menit',
      order_index: 1,
    },
    {
      id: 'les-lit-8',
      module_id: 'mod-lit-4',
      course_id: 'tka-literasi',
      title: 'Diksi dan Kalimat Efektif',
      content: `DIKSI (Pilihan Kata)
Pemilihan kata yang tepat sesuai konteks dan makna yang diinginkan.

JENIS MAKNA KATA:
1. Makna Denotatif → makna sebenarnya/harfiah
2. Makna Konotatif → makna kiasan/tambahan
3. Sinonim → kata bermakna sama
4. Antonim → kata bermakna berlawanan
5. Homonim → kata sama, makna berbeda

KALIMAT EFEKTIF memenuhi syarat:
1. Kesepadanan → subjek dan predikat jelas
2. Keparalelan → bentuk kata sejajar
3. Kehematan → tidak ada kata mubazir
4. Kelogisan → makna dapat diterima akal
5. Ketepatan → penggunaan kata sesuai konteks`,
      video_url: videoUrl,
      duration: '20 menit',
      order_index: 2,
    },
    {
      id: 'les-lit-9',
      module_id: 'mod-lit-5',
      course_id: 'tka-literasi',
      title: 'Strategi Menjawab Soal TKA Literasi',
      content: `STRATEGI MENGERJAKAN SOAL TKA:

1. BACA SOAL TERLEBIH DAHULU
   - Ketahui apa yang ditanyakan
   - Fokus mencari jawaban saat membaca teks

2. BACA TEKS DENGAN TEKNIK SKIMMING
   - Baca cepat untuk memahami gambaran umum
   - Tandai bagian penting

3. IDENTIFIKASI KATA KUNCI
   - Di soal dan di teks
   - Hubungkan keduanya

4. ELIMINASI JAWABAN SALAH
   - Coret pilihan yang jelas salah
   - Pilih dari yang tersisa

5. PERHATIKAN KATA-KATA ABSOLUT
   - "semua", "tidak pernah", "selalu" → biasanya salah
   - "sebagian", "kadang-kadang" → lebih aman`,
      video_url: videoUrl,
      duration: '20 menit',
      order_index: 1,
    },
    {
      id: 'les-lit-10',
      module_id: 'mod-lit-5',
      course_id: 'tka-literasi',
      title: 'Latihan Soal dan Pembahasan',
      content: `TIPS MENGERJAKAN SOAL TKA BAHASA INDONESIA:

1. Soal IDE POKOK → cari kalimat utama
2. Soal KESIMPULAN → rangkum keseluruhan teks
3. Soal MAKNA KATA → lihat konteks kalimat
4. Soal TUJUAN PENULIS → inferensi dari keseluruhan teks
5. Soal STRUKTUR → perhatikan pola paragraf

JENIS SOAL YANG SERING MUNCUL:
- Menentukan ide pokok/gagasan utama
- Menyimpulkan isi teks
- Menentukan makna kata/istilah
- Menemukan informasi tersurat/tersirat
- Menentukan hubungan antar paragraf
- Memperbaiki kalimat tidak efektif
- Melengkapi paragraf rumpang

Latihan rutin dan pahami pola soal!`,
      video_url: videoUrl,
      duration: '25 menit',
      order_index: 2,
    },
  ]);
  if (lessonError) console.error('Error lessons:', lessonError);

  // Insert Quizzes - 10 Quiz dengan masing-masing 8-10 soal
  console.log('❓ Menambah quizzes...');
  const { error: quizError } = await supabase.from('quizzes').insert([
    // Quiz 1: Ide Pokok
    {
      id: 'quiz-lit-1',
      lesson_id: 'les-lit-1',
      questions: [
        {
          question: 'Ide pokok paragraf adalah...',
          options: [
            'Kalimat pertama paragraf',
            'Gagasan utama yang menjadi dasar paragraf',
            'Kesimpulan paragraf',
            'Semua kalimat dalam paragraf',
          ],
          correctIndex: 1,
        },
        {
          question: 'Kalimat yang mengandung ide pokok disebut...',
          options: [
            'Kalimat penjelas',
            'Kalimat utama',
            'Kalimat penutup',
            'Kalimat pendukung',
          ],
          correctIndex: 1,
        },
        {
          question: 'Fungsi kalimat penjelas dalam paragraf adalah...',
          options: [
            'Menggantikan ide pokok',
            'Mendukung dan mengembangkan ide pokok',
            'Bertentangan dengan ide pokok',
            'Mengulang ide pokok',
          ],
          correctIndex: 1,
        },
        {
          question: 'Cara menemukan ide pokok yang TEPAT adalah...',
          options: [
            'Membaca kalimat pertama saja',
            'Membaca keseluruhan paragraf dan mencari kata kunci',
            'Menghitung jumlah kalimat',
            'Melihat tanda baca',
          ],
          correctIndex: 1,
        },
        {
          question: 'Ide pokok menjawab pertanyaan...',
          options: [
            'Kapan peristiwa terjadi?',
            'Apa yang dibahas dalam paragraf?',
            'Siapa penulisnya?',
            'Di mana teksnya?',
          ],
          correctIndex: 1,
        },
        {
          question: 'Kata kunci dalam paragraf biasanya...',
          options: [
            'Ditulis dengan huruf kapital',
            'Sering diulang atau ditekankan',
            'Berada di akhir kalimat',
            'Menggunakan tanda kutip',
          ],
          correctIndex: 1,
        },
        {
          question: 'Perbedaan ide pokok dan ide penjelas adalah...',
          options: [
            'Ide pokok lebih panjang',
            'Ide pokok adalah gagasan utama, ide penjelas mendukungnya',
            'Tidak ada perbedaan',
            'Ide penjelas lebih penting',
          ],
          correctIndex: 1,
        },
        {
          question: 'Jika ide pokok tidak dinyatakan langsung, maka...',
          options: [
            'Paragraf tidak memiliki ide pokok',
            'Ide pokok harus disimpulkan dari keseluruhan paragraf',
            'Paragraf tersebut salah',
            'Tidak perlu dicari',
          ],
          correctIndex: 1,
        },
      ],
    },
    // Quiz 2: Informasi Tersurat dan Tersirat
    {
      id: 'quiz-lit-2',
      lesson_id: 'les-lit-2',
      questions: [
        {
          question: 'Informasi tersurat adalah informasi yang...',
          options: [
            'Dinyatakan langsung dalam teks',
            'Harus disimpulkan',
            'Tidak ada dalam teks',
            'Bertentangan dengan teks',
          ],
          correctIndex: 0,
        },
        {
          question: 'Informasi tersirat memerlukan...',
          options: [
            'Membaca cepat',
            'Pemahaman konteks dan penyimpulan',
            'Menghafal teks',
            'Membaca berulang-ulang',
          ],
          correctIndex: 1,
        },
        {
          question: 'Contoh informasi tersurat adalah...',
          options: [
            'Perasaan tokoh',
            'Nama, tanggal, dan fakta dalam teks',
            'Pesan moral cerita',
            'Maksud tersembunyi penulis',
          ],
          correctIndex: 1,
        },
        {
          question: 'Contoh informasi tersirat adalah...',
          options: [
            'Judul teks',
            'Nama tokoh utama',
            'Sikap penulis terhadap suatu isu',
            'Jumlah paragraf',
          ],
          correctIndex: 2,
        },
        {
          question: 'Untuk menemukan informasi tersirat, pembaca perlu...',
          options: [
            'Membaca literal saja',
            'Menganalisis petunjuk dan konteks',
            'Mengabaikan detail',
            'Membaca cepat',
          ],
          correctIndex: 1,
        },
        {
          question:
            'Pertanyaan "Apa yang dapat disimpulkan dari teks?" menanyakan informasi...',
          options: ['Tersurat', 'Tersirat', 'Literal', 'Permukaan'],
          correctIndex: 1,
        },
        {
          question: 'Informasi eksplisit sama dengan informasi...',
          options: ['Tersirat', 'Tersurat', 'Implisit', 'Rahasia'],
          correctIndex: 1,
        },
        {
          question: 'Informasi implisit sama dengan informasi...',
          options: ['Tersurat', 'Eksplisit', 'Tersirat', 'Langsung'],
          correctIndex: 2,
        },
      ],
    },
    // Quiz 3: Paragraf Deduktif dan Induktif
    {
      id: 'quiz-lit-3',
      lesson_id: 'les-lit-3',
      questions: [
        {
          question: 'Paragraf deduktif memiliki ide pokok di...',
          options: [
            'Akhir paragraf',
            'Tengah paragraf',
            'Awal paragraf',
            'Tidak ada ide pokok',
          ],
          correctIndex: 2,
        },
        {
          question: 'Paragraf induktif memiliki ide pokok di...',
          options: [
            'Awal paragraf',
            'Tengah paragraf',
            'Akhir paragraf',
            'Awal dan akhir',
          ],
          correctIndex: 2,
        },
        {
          question: 'Pola paragraf deduktif adalah...',
          options: [
            'Khusus → Umum',
            'Umum → Khusus',
            'Khusus → Khusus',
            'Umum → Umum',
          ],
          correctIndex: 1,
        },
        {
          question: 'Pola paragraf induktif adalah...',
          options: ['Umum → Khusus', 'Khusus → Umum', 'Kronologis', 'Spasial'],
          correctIndex: 1,
        },
        {
          question: 'Paragraf campuran memiliki ide pokok di...',
          options: ['Awal saja', 'Akhir saja', 'Awal dan akhir', 'Tengah saja'],
          correctIndex: 2,
        },
        {
          question:
            'Paragraf yang dimulai dengan contoh-contoh kemudian diakhiri kesimpulan adalah paragraf...',
          options: ['Deduktif', 'Induktif', 'Naratif', 'Deskriptif'],
          correctIndex: 1,
        },
        {
          question:
            'Paragraf yang kalimat pertamanya adalah kalimat utama adalah paragraf...',
          options: ['Induktif', 'Deduktif', 'Campuran', 'Eksposisi'],
          correctIndex: 1,
        },
        {
          question: 'Ciri paragraf campuran adalah...',
          options: [
            'Tidak memiliki ide pokok',
            'Kalimat akhir menegaskan kembali kalimat awal',
            'Hanya berisi contoh',
            'Tidak ada kalimat utama',
          ],
          correctIndex: 1,
        },
      ],
    },
    // Quiz 4: Hubungan Antar Kalimat
    {
      id: 'quiz-lit-4',
      lesson_id: 'les-lit-4',
      questions: [
        {
          question: 'Konjungsi "sehingga" menunjukkan hubungan...',
          options: ['Pertentangan', 'Sebab-akibat', 'Penjelas', 'Waktu'],
          correctIndex: 1,
        },
        {
          question: 'Konjungsi "tetapi" menunjukkan hubungan...',
          options: [
            'Sebab-akibat',
            'Pertentangan',
            'Penegasan',
            'Perbandingan',
          ],
          correctIndex: 1,
        },
        {
          question: 'Konjungsi "bahkan" menunjukkan hubungan...',
          options: ['Pertentangan', 'Sebab-akibat', 'Penegasan', 'Waktu'],
          correctIndex: 2,
        },
        {
          question: 'Kalimat yang kohesif adalah kalimat yang...',
          options: [
            'Berdiri sendiri',
            'Saling berhubungan dengan kalimat lain',
            'Sangat panjang',
            'Menggunakan kata baku',
          ],
          correctIndex: 1,
        },
        {
          question: 'Konjungsi "oleh karena itu" menunjukkan hubungan...',
          options: [
            'Akibat dari sebab sebelumnya',
            'Pertentangan',
            'Perbandingan',
            'Waktu',
          ],
          correctIndex: 0,
        },
        {
          question:
            '"Meskipun hujan, dia tetap berangkat." Kata "meskipun" menunjukkan hubungan...',
          options: [
            'Sebab-akibat',
            'Pertentangan/konsesif',
            'Waktu',
            'Penjelas',
          ],
          correctIndex: 1,
        },
        {
          question: 'Koheren dalam paragraf berarti...',
          options: [
            'Menggunakan kata yang sama',
            'Keterpaduan makna antar kalimat',
            'Kalimat yang panjang',
            'Banyak konjungsi',
          ],
          correctIndex: 1,
        },
        {
          question:
            '"Kemudian, setelah itu, selanjutnya" adalah konjungsi yang menunjukkan hubungan...',
          options: [
            'Sebab-akibat',
            'Pertentangan',
            'Waktu/urutan',
            'Perbandingan',
          ],
          correctIndex: 2,
        },
      ],
    },
    // Quiz 5: Kesimpulan
    {
      id: 'quiz-lit-5',
      lesson_id: 'les-lit-5',
      questions: [
        {
          question: 'Kesimpulan yang baik harus...',
          options: [
            'Menambah informasi baru',
            'Didukung oleh fakta dalam teks',
            'Bertentangan dengan teks',
            'Mengulang seluruh teks',
          ],
          correctIndex: 1,
        },
        {
          question: 'Langkah pertama membuat kesimpulan adalah...',
          options: [
            'Menulis langsung',
            'Membaca dan memahami seluruh teks',
            'Menghitung kata',
            'Mencari judul',
          ],
          correctIndex: 1,
        },
        {
          question: 'Kesimpulan yang terlalu luas adalah kesimpulan yang...',
          options: ['Tepat', 'Melebihi cakupan teks', 'Sesuai fakta', 'Logis'],
          correctIndex: 1,
        },
        {
          question: 'Kesimpulan berbeda dengan ringkasan karena kesimpulan...',
          options: [
            'Lebih panjang',
            'Menarik inti/esensi, bukan mengulang isi',
            'Mengutip langsung',
            'Sama saja',
          ],
          correctIndex: 1,
        },
        {
          question: 'Kesalahan umum dalam membuat kesimpulan adalah...',
          options: [
            'Membaca seluruh teks',
            'Membuat kesimpulan yang tidak didukung teks',
            'Mencari fakta',
            'Memahami konteks',
          ],
          correctIndex: 1,
        },
        {
          question: 'Kesimpulan harus bersifat...',
          options: ['Subjektif', 'Objektif dan logis', 'Emosional', 'Ambigu'],
          correctIndex: 1,
        },
        {
          question: 'Untuk membuat kesimpulan, pembaca perlu...',
          options: [
            'Mengabaikan detail',
            'Menghubungkan informasi yang saling berkaitan',
            'Membaca cepat tanpa memahami',
            'Menebak jawaban',
          ],
          correctIndex: 1,
        },
        {
          question: 'Kesimpulan yang tepat adalah yang...',
          options: [
            'Mencakup inti keseluruhan teks',
            'Hanya membahas satu kalimat',
            'Menambah pendapat pribadi',
            'Mengabaikan fakta',
          ],
          correctIndex: 0,
        },
      ],
    },
    // Quiz 6: Inferensi
    {
      id: 'quiz-lit-6',
      lesson_id: 'les-lit-6',
      questions: [
        {
          question: 'Inferensi adalah...',
          options: [
            'Membaca cepat',
            'Menyimpulkan informasi yang tidak dinyatakan langsung',
            'Mengulang teks',
            'Menerjemahkan',
          ],
          correctIndex: 1,
        },
        {
          question: 'Inferensi logis berdasarkan...',
          options: [
            'Perasaan pembaca',
            'Hubungan sebab-akibat',
            'Judul teks',
            'Jumlah paragraf',
          ],
          correctIndex: 1,
        },
        {
          question:
            '"Ani membawa payung saat berangkat." Inferensi yang tepat adalah...',
          options: [
            'Ani suka payung',
            'Cuaca mendung atau akan hujan',
            'Ani malas',
            'Payung itu baru',
          ],
          correctIndex: 1,
        },
        {
          question: 'Untuk melakukan inferensi, pembaca perlu memperhatikan...',
          options: [
            'Jumlah halaman',
            'Petunjuk/konteks dalam teks',
            'Nama penulis',
            'Tahun terbit',
          ],
          correctIndex: 1,
        },
        {
          question: 'Inferensi evaluatif adalah...',
          options: [
            'Memperkirakan kejadian',
            'Menilai sikap atau pendapat penulis',
            'Membaca cepat',
            'Menghitung kata',
          ],
          correctIndex: 1,
        },
        {
          question: 'Perbedaan inferensi dan kesimpulan adalah...',
          options: [
            'Tidak ada perbedaan',
            'Inferensi dari petunjuk tidak langsung, kesimpulan dari keseluruhan teks',
            'Kesimpulan lebih sulit',
            'Inferensi lebih panjang',
          ],
          correctIndex: 1,
        },
        {
          question:
            '"Matanya berkaca-kaca saat menerima penghargaan." Inferensi: tokoh merasa...',
          options: ['Marah', 'Terharu/bahagia', 'Bosan', 'Takut'],
          correctIndex: 1,
        },
        {
          question: 'Inferensi yang baik harus...',
          options: [
            'Berdasarkan imajinasi',
            'Masuk akal dan didukung petunjuk teks',
            'Selalu positif',
            'Sangat panjang',
          ],
          correctIndex: 1,
        },
      ],
    },
    // Quiz 7: Ejaan dan Tanda Baca
    {
      id: 'quiz-lit-7',
      lesson_id: 'les-lit-7',
      questions: [
        {
          question: 'Huruf kapital digunakan untuk...',
          options: [
            'Semua kata',
            'Awal kalimat dan nama diri',
            'Kata kerja saja',
            'Kata sifat saja',
          ],
          correctIndex: 1,
        },
        {
          question: 'Penulisan kata depan yang benar adalah...',
          options: [
            'Ditulis serangkai dengan kata berikutnya',
            'Ditulis terpisah dari kata berikutnya',
            'Ditulis dengan huruf kapital',
            'Tidak ada aturan',
          ],
          correctIndex: 1,
        },
        {
          question: 'Penulisan yang benar adalah...',
          options: ['Di rumah', 'Dirumah', 'Di-rumah', 'dirumah'],
          correctIndex: 0,
        },
        {
          question: 'Penulisan yang benar adalah...',
          options: ['Dimakan', 'Di makan', 'Di-makan', 'di Makan'],
          correctIndex: 0,
        },
        {
          question: 'Tanda koma digunakan untuk...',
          options: [
            'Mengakhiri kalimat',
            'Memisahkan unsur-unsur dalam kalimat',
            'Kalimat tanya',
            'Kata seru',
          ],
          correctIndex: 1,
        },
        {
          question: 'Tanda titik dua digunakan sebelum...',
          options: [
            'Akhir kalimat',
            'Rincian atau pemerian',
            'Kalimat tanya',
            'Kata ganti',
          ],
          correctIndex: 1,
        },
        {
          question: 'Penulisan judul buku yang benar adalah...',
          options: [
            'laskar pelangi',
            'Laskar Pelangi',
            'LASKAR PELANGI',
            'laskar Pelangi',
          ],
          correctIndex: 1,
        },
        {
          question: 'Tanda hubung (-) digunakan untuk...',
          options: [
            'Mengakhiri kalimat',
            'Menyambung kata ulang dan awalan dengan kata dasar tertentu',
            'Kalimat tanya',
            'Semua kata',
          ],
          correctIndex: 1,
        },
      ],
    },
    // Quiz 8: Diksi dan Kalimat Efektif
    {
      id: 'quiz-lit-8',
      lesson_id: 'les-lit-8',
      questions: [
        {
          question: 'Diksi adalah...',
          options: [
            'Tanda baca',
            'Pilihan kata yang tepat',
            'Struktur kalimat',
            'Jenis paragraf',
          ],
          correctIndex: 1,
        },
        {
          question: 'Makna denotatif adalah makna...',
          options: ['Kiasan', 'Sebenarnya/harfiah', 'Tambahan', 'Negatif'],
          correctIndex: 1,
        },
        {
          question: 'Makna konotatif adalah makna...',
          options: ['Harfiah', 'Kiasan/tambahan', 'Kamus', 'Baku'],
          correctIndex: 1,
        },
        {
          question: 'Sinonim adalah kata yang memiliki makna...',
          options: ['Berlawanan', 'Sama atau mirip', 'Berbeda', 'Jamak'],
          correctIndex: 1,
        },
        {
          question: 'Antonim adalah kata yang memiliki makna...',
          options: ['Sama', 'Berlawanan', 'Mirip', 'Ganda'],
          correctIndex: 1,
        },
        {
          question: 'Kalimat efektif harus memiliki...',
          options: [
            'Banyak kata',
            'Kesepadanan, kehematan, kelogisan',
            'Kata asing',
            'Kalimat panjang',
          ],
          correctIndex: 1,
        },
        {
          question: 'Kalimat yang hemat adalah kalimat yang...',
          options: [
            'Sangat pendek',
            'Tidak ada kata mubazir/berlebihan',
            'Hanya satu kata',
            'Tanpa subjek',
          ],
          correctIndex: 1,
        },
        {
          question:
            '"Buku itu sangat amat bagus sekali" tidak efektif karena...',
          options: [
            'Terlalu pendek',
            'Ada kata mubazir (sangat, amat, sekali)',
            'Tidak ada subjek',
            'Salah ejaan',
          ],
          correctIndex: 1,
        },
        {
          question: 'Keparalelan dalam kalimat berarti...',
          options: [
            'Kalimat yang panjang',
            'Bentuk kata yang sejajar/setara',
            'Banyak konjungsi',
            'Tanpa tanda baca',
          ],
          correctIndex: 1,
        },
        {
          question: 'Contoh kalimat tidak logis adalah...',
          options: [
            'Saya makan nasi',
            'Waktu dan tempat kami persilakan',
            'Dia pergi ke sekolah',
            'Buku ini menarik',
          ],
          correctIndex: 1,
        },
      ],
    },
    // Quiz 9: Strategi Menjawab Soal
    {
      id: 'quiz-lit-9',
      lesson_id: 'les-lit-9',
      questions: [
        {
          question: 'Strategi pertama mengerjakan soal TKA adalah...',
          options: [
            'Membaca teks langsung',
            'Membaca soal terlebih dahulu',
            'Menebak jawaban',
            'Mengabaikan teks',
          ],
          correctIndex: 1,
        },
        {
          question: 'Teknik skimming adalah...',
          options: [
            'Membaca sangat lambat',
            'Membaca cepat untuk memahami gambaran umum',
            'Menghafal teks',
            'Menulis ulang teks',
          ],
          correctIndex: 1,
        },
        {
          question: 'Eliminasi jawaban berguna untuk...',
          options: [
            'Memperlambat pengerjaan',
            'Memperbesar peluang jawaban benar',
            'Membuat bingung',
            'Mengabaikan soal',
          ],
          correctIndex: 1,
        },
        {
          question:
            'Kata-kata absolut seperti "selalu" dan "tidak pernah" dalam pilihan jawaban biasanya...',
          options: ['Benar', 'Salah', 'Ragu-ragu', 'Tidak penting'],
          correctIndex: 1,
        },
        {
          question: 'Setelah membaca soal, langkah selanjutnya adalah...',
          options: [
            'Langsung menjawab',
            'Membaca teks dengan fokus mencari jawaban',
            'Melewati soal',
            'Menghitung waktu',
          ],
          correctIndex: 1,
        },
        {
          question: 'Menandai bagian penting dalam teks berguna untuk...',
          options: [
            'Menghabiskan waktu',
            'Memudahkan menemukan jawaban',
            'Membuat kotor kertas',
            'Tidak ada gunanya',
          ],
          correctIndex: 1,
        },
        {
          question: 'Jika ragu antara dua pilihan jawaban, sebaiknya...',
          options: [
            'Pilih yang pertama',
            'Analisis kembali mana yang lebih sesuai teks',
            'Pilih yang terakhir',
            'Kosongkan',
          ],
          correctIndex: 1,
        },
        {
          question: 'Manajemen waktu dalam TKA penting karena...',
          options: [
            'Tidak penting',
            'Memastikan semua soal terjawab',
            'Membuat cemas',
            'Tidak ada alasan',
          ],
          correctIndex: 1,
        },
      ],
    },
    // Quiz 10: Latihan Soal
    {
      id: 'quiz-lit-10',
      lesson_id: 'les-lit-10',
      questions: [
        {
          question: 'Soal menentukan ide pokok menanyakan...',
          options: [
            'Kesimpulan teks',
            'Gagasan utama paragraf',
            'Makna kata',
            'Judul teks',
          ],
          correctIndex: 1,
        },
        {
          question: 'Soal tentang tujuan penulis termasuk jenis soal...',
          options: ['Literal', 'Inferensi', 'Ejaan', 'Struktur'],
          correctIndex: 1,
        },
        {
          question: 'Untuk soal makna kata, yang harus diperhatikan adalah...',
          options: [
            'Jumlah huruf',
            'Konteks kalimat/paragraf',
            'Posisi kata',
            'Tanda baca',
          ],
          correctIndex: 1,
        },
        {
          question: 'Soal melengkapi paragraf rumpang menguji kemampuan...',
          options: [
            'Menghitung',
            'Memahami koherensi dan kohesi',
            'Menggambar',
            'Berbicara',
          ],
          correctIndex: 1,
        },
        {
          question:
            'Jika soal menanyakan "Berdasarkan teks, pernyataan yang BENAR adalah...", ini menanyakan...',
          options: [
            'Opini pembaca',
            'Informasi sesuai teks',
            'Pengalaman pribadi',
            'Pengetahuan umum',
          ],
          correctIndex: 1,
        },
        {
          question: 'Soal perbaikan kalimat menguji pemahaman tentang...',
          options: [
            'Isi teks',
            'Kalimat efektif dan ejaan',
            'Ide pokok',
            'Kesimpulan',
          ],
          correctIndex: 1,
        },
        {
          question: 'Tips mengerjakan soal TKA yang paling penting adalah...',
          options: [
            'Menebak semua jawaban',
            'Latihan rutin dan pahami pola soal',
            'Tidak perlu belajar',
            'Mengerjakan cepat tanpa baca',
          ],
          correctIndex: 1,
        },
        {
          question: 'Jika menemukan kata sulit dalam teks, sebaiknya...',
          options: [
            'Panik',
            'Pahami dari konteks kalimat sekitarnya',
            'Lewati teks',
            'Tanya teman',
          ],
          correctIndex: 1,
        },
        {
          question: 'Soal hubungan antar paragraf menguji kemampuan...',
          options: [
            'Menghitung paragraf',
            'Memahami keterkaitan dan alur gagasan',
            'Menghafal',
            'Menulis',
          ],
          correctIndex: 1,
        },
        {
          question: 'Kunci sukses TKA Bahasa Indonesia adalah...',
          options: [
            'Menghafal teks',
            'Memahami konsep dan banyak latihan',
            'Menebak jawaban',
            'Tidak belajar',
          ],
          correctIndex: 1,
        },
      ],
    },
  ]);
  if (quizError) console.error('Error quizzes:', quizError);

  console.log('\n✅ Seeding selesai!');
  console.log('📚 1 Course (TKA Literasi)');
  console.log('📁 5 Modules');
  console.log('📖 10 Lessons dengan video YouTube');
  console.log('❓ 10 Quizzes dengan 8-10 soal per quiz');

  process.exit(0);
}

seedDatabase().catch(console.error);
