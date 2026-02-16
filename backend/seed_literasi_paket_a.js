// Seed script to add 30 questions from TKA Bahasa Indonesia Paket A
// This will create 10 new lessons for TKA Literasi with additional practice questions

import { supabase } from './services/supabase.js';

async function seedLiterasiPaketA() {
    console.log('🌱 Adding TKA Literasi Paket A questions (30 additional questions)...\n');

    try {
        // Check current TKA Literasi structure
        const { data: existingLessons } = await supabase
            .from('lessons')
            .select('id, title, order_index')
            .eq('course_id', 'tka-literasi')
            .order('order_index');

        console.log(`📚 Current TKA Literasi: ${existingLessons.length} lessons`);

        // Get module IDs
        const { data: modules } = await supabase
            .from('modules')
            .select('id, title')
            .eq('course_id', 'tka-literasi')
            .order('order_index');

        console.log(`📦 Modules: ${modules.length}`);
        modules.forEach(m => console.log(`   - ${m.title} (${m.id})`));

        // Create 10 new lessons
        const newLessons = [
            // Lesson 11: Teks Deskripsi
            {
                id: 'les-lit-11',
                module_id: modules[0].id, // Module 1
                course_id: 'tka-literasi',
                title: 'Latihan Tambahan: Teks Deskripsi',
                content: `Latihan tambahan untuk memahami teks deskripsi dengan lebih mendalam.
        
Topik yang dibahas:
- Istilah dalam teks pariwisata
- Aktivitas rekreasi
- Penerapan konservasi dalam kehidupan`,
                video_url: 'https://www.youtube.com/watch?v=example',
                duration: '20 menit',
                order_index: 11,
            },

            // Lesson 12: Teks Prosedur
            {
                id: 'les-lit-12',
                module_id: modules[0].id,
                course_id: 'tka-literasi',
                title: 'Latihan Tambahan: Teks Prosedur',
                content: `Latihan tambahan untuk memahami struktur dan kelogisan teks prosedur.
        
Topik yang dibahas:
- Istilah bidang kuliner
- Kelogisan hubungan antargagasan
- Kata kerja aktif dalam prosedur`,
                video_url: 'https://www.youtube.com/watch?v=example',
                duration: '20 menit',
                order_index: 12,
            },

            // Lesson 13: Teks Berita 1
            {
                id: 'les-lit-13',
                module_id: modules[1].id, // Module 2
                course_id: 'tka-literasi',
                title: 'Latihan Tambahan: Teks Berita - Pendidikan Vokasi',
                content: `Latihan tambahan untuk menganalisis informasi dalam teks berita.
        
Topik yang dibahas:
- Informasi tersurat
- Prediksi dampak informasi
- Unsur berita (bagaimana)`,
                video_url: 'https://www.youtube.com/watch?v=example',
                duration: '20 menit',
                order_index: 13,
            },

            // Lesson 14: Teks Berita 2
            {
                id: 'les-lit-14',
                module_id: modules[1].id,
                course_id: 'tka-literasi',
                title: 'Latihan Tambahan: Teks Berita - Program Pendidikan',
                content: `Latihan tambahan untuk memahami unsur dan istilah dalam berita.
        
Topik yang dibahas:
- Unsur bagaimana dalam berita
- Istilah proses pendidikan
- Analisis program`,
                video_url: 'https://www.youtube.com/watch?v=example',
                duration: '20 menit',
                order_index: 14,
            },

            // Lesson 15: Teks Eksposisi
            {
                id: 'les-lit-15',
                module_id: modules[2].id, // Module 3
                course_id: 'tka-literasi',
                title: 'Latihan Tambahan: Teks Eksposisi',
                content: `Latihan tambahan untuk menganalisis teks eksposisi.
        
Topik yang dibahas:
- Objek pembahasan
- Konsekuensi logis
- Simpulan ide pokok`,
                video_url: 'https://www.youtube.com/watch?v=example',
                duration: '20 menit',
                order_index: 15,
            },

            // Lesson 16: Teks Eksplanasi
            {
                id: 'les-lit-16',
                module_id: modules[2].id,
                course_id: 'tka-literasi',
                title: 'Latihan Tambahan: Teks Eksplanasi',
                content: `Latihan tambahan untuk memahami teks eksplanasi.
        
Topik yang dibahas:
- Istilah kesehatan
- Hubungan logis antargagasan
- Kesesuaian isi teks`,
                video_url: 'https://www.youtube.com/watch?v=example',
                duration: '20 menit',
                order_index: 16,
            },

            // Lesson 17: Teks Ulasan 1
            {
                id: 'les-lit-17',
                module_id: modules[3].id, // Module 4
                course_id: 'tka-literasi',
                title: 'Latihan Tambahan: Teks Ulasan Novel',
                content: `Latihan tambahan untuk menganalisis teks ulasan buku/novel.
        
Topik yang dibahas:
- Hubungan logis antarinformasi
- Data unsur buku
- Informasi tersurat`,
                video_url: 'https://www.youtube.com/watch?v=example',
                duration: '20 menit',
                order_index: 17,
            },

            // Lesson 18: Puisi
            {
                id: 'les-lit-18',
                module_id: modules[4].id, // Module 5
                course_id: 'tka-literasi',
                title: 'Latihan Tambahan: Analisis Puisi',
                content: `Latihan tambahan untuk menganalisis unsur-unsur puisi.
        
Topik yang dibahas:
- Suasana dalam puisi
- Citraan (imagery)
- Perasaan emosional`,
                video_url: 'https://www.youtube.com/watch?v=example',
                duration: '20 menit',
                order_index: 18,
            },

            // Lesson 19: Cerpen 1
            {
                id: 'les-lit-19',
                module_id: modules[4].id,
                course_id: 'tka-literasi',
                title: 'Latihan Tambahan: Cerpen - Struktur & Tokoh',
                content: `Latihan tambahan untuk menganalisis struktur dan tokoh cerpen.
        
Topik yang dibahas:
- Kerangka bagian cerpen
- Perkembangan sikap tokoh
- Relevansi dengan kehidupan`,
                video_url: 'https://www.youtube.com/watch?v=example',
                duration: '20 menit',
                order_index: 19,
            },

            // Lesson 20: Cerpen 2
            {
                id: 'les-lit-20',
                module_id: modules[4].id,
                course_id: 'tka-literasi',
                title: 'Latihan Tambahan: Cerpen - Ide & Makna',
                content: `Latihan tambahan untuk memahami ide pokok dan makna dalam cerpen.
        
Topik yang dibahas:
- Peristiwa penting
- Ide pokok cerita
- Makna kiasan`,
                video_url: 'https://www.youtube.com/watch?v=example',
                duration: '20 menit',
                order_index: 20,
            },
        ];

        // Insert new lessons
        console.log('\n📖 Adding 10 new lessons...');
        const { error: lessonError } = await supabase
            .from('lessons')
            .insert(newLessons);

        if (lessonError) {
            console.error('Error adding lessons:', lessonError);
            throw lessonError;
        }
        console.log('✓ Lessons added successfully\n');

        // Create quizzes with actual questions from Paket A
        const newQuizzes = [
            // Quiz for Lesson 11 (Q1-3: Teks Deskripsi - Taman Buah Mekarsari)
            {
                id: 'quiz-les-lit-11',
                lesson_id: 'les-lit-11',
                questions: [
                    {
                        question: 'Istilah pariwisata yang digunakan dalam teks tersebut adalah ….',
                        options: [
                            'pengunjung, agrowisata, dan buah',
                            'taman wisata, bumi, dan masyarakat',
                            'pemandangan, agrowisata, dan sayur',
                            'pengunjung, pemandangan, dan agrowisata'
                        ],
                        correctIndex: 3
                    },
                    {
                        question: 'Salah satu aktivitas rekreasi yang relevan ditawarkan kepada pengunjung di Taman Buah Mekarsari adalah ...',
                        options: [
                            'Pengunjung dapat menikmati aktivitas olahraga air ekstrem seperti arung jeram di sungai terdekat.',
                            'Aktivitas utama yang tersedia adalah mengikuti kelas budidaya tanaman buah yang terdapat di Mekarsari.',
                            'Pengunjung diberikan kesempatan untuk memetik buah segar secara langsung dari pohonnya di area kebun buah.',
                            'Wisatawan dapat mencoba pengalaman berkemah di area perkebunan yang terjal, menantang, dan menarik.'
                        ],
                        correctIndex: 2
                    },
                    {
                        question: 'Hal yang relevan dengan kehidupan sehari-hari untuk menerapkan kesadaran akan pentingnya konservasi buah-buahan tropis seperti yang dilakukan di Mekarsari adalah ....',
                        options: [
                            'membeli buah impor yang lebih murah di pasar tradisional maupun swalayan',
                            'menanam pohon buah lokal di pekarangan rumah atau lingkungan sekitar',
                            'menggunakan produk olahan buah kemasan yang dijual di toko',
                            'membiarkan lahan kosong di pekarangan rumah begitu saja'
                        ],
                        correctIndex: 1
                    }
                ]
            },

            // Quiz for Lesson 12 (Q4-6: Teks Prosedur - Kuliner Cungkring)
            {
                id: 'quiz-les-lit-12',
                lesson_id: 'les-lit-12',
                questions: [
                    {
                        question: 'Istilah bidang kuliner yang terdapat pada teks tersebut adalah ….',
                        options: [
                            'bumbu-bumbu, resep, dan bogor',
                            'bahan-bahan dan blender',
                            'cungkring dan bawang goreng',
                            'empuk, rebus, dan limau'
                        ],
                        correctIndex: 1
                    },
                    {
                        question: 'Kelogisan hubungan antargagasan dalam teks tersebut adalah …',
                        options: [
                            'Teks disajikan secara tidak logis karena teks tersebut mencampuradukkan antara bahan dan cara membuat, sehingga sulit diikuti oleh pembaca dalam mempraktikan olahan makanan cungkring tersebut.',
                            'Teks disajikan secara logis karena teks menyajikan informasi secara terstruktur, dimulai dari bahan-bahan yang diperlukan, diikuti dengan langkah-langkah pembuatan dari awal hingga penyajian akhir yang runtut.',
                            'Teks disajikan secara tidak logis karena proses pembuatan bumbu kacang dijelaskan terpisah dari proses pembuatan kulit sapi, padahal keduanya harus disajikan bersamaan sehingga memudahkan proses pembuatan.',
                            'Teks disajikan secara logis secara acak karena pembaca dapat memulai proses memasak dari langkah mana saja tanpa memengaruhi hasil akhir masakan cungkring sesuai dengan tujuan dari proses masak tersebut.'
                        ],
                        correctIndex: 1
                    },
                    {
                        question: 'Kalimat yang menunjukkan penggunaan kata kerja aktif dalam teks tersebut adalah …',
                        options: [
                            'Bahan-bahannya yaitu kulit sapi dan air secukupnya.',
                            'Kemudian rebus sampai air menyusut dan matang lalu angkat.',
                            'Siapkan wajan lalu rebuslah kulit selama 5 menit.',
                            'Cungkring khas Bogor siap disajikan untuk dinikmati bersama keluarga.'
                        ],
                        correctIndex: 2
                    }
                ]
            },

            // Quiz for Lesson 13 (Q7-8: Teks Berita - Lulusan SMK)
            {
                id: 'quiz-les-lit-13',
                lesson_id: 'les-lit-13',
                questions: [
                    {
                        question: 'Informasi tersurat yang terdapat dalam teks berita tersebut adalah …',
                        options: [
                            'Lulusan SMK kini hanya bisa bekerja sebagai operator sistem keuangan berbasis aplikasi tanpa merambah ke yang lain.',
                            'Pendidikan vokasi saat ini hanya menuntut lulusan siap kerja tanpa perlu kemampuan kewirausahaan.',
                            'Pola pikir yang ingin dibangun dalam pendidikan vokasi adalah bahwa menjadi kaya itu kebetulan semata.',
                            'Akuntan masa kini tidak cukup hanya mahir administrasi, tetapi harus menguasai berbagai platform keuangan digital.'
                        ],
                        correctIndex: 3
                    },
                    {
                        question: 'Hal yang mungkin terjadi pada minat siswa SMK untuk berwirausaha setelah lulus berdasarkan informasi pada teks tersebut adalah …',
                        options: [
                            'minat siswa untuk berwirausaha akan menurun drastis karena lebih memilih menjadi staf di kantor karena risiko untuk gagal kemungkinan kecil.',
                            'diprediksi akan semakin banyak lulusan SMK yang mendirikan usaha mikro dengan memanfaatkan platform keuangan digital untuk mengelola bisnis mereka.',
                            'lulusan SMK akan kesulitan mendapatkan modal usaha karena industri keuangan digital yang pilih-pilih dalam mendukung UMKM yang berada di daerah.',
                            'pelaku UMKM digital akan berhenti merekrut lulusan SMK karena dianggap tidak memiliki kompetensi di bidang tersebut, mereka lebih ke perkantoran.'
                        ],
                        correctIndex: 1
                    }
                ]
            },

            // Quiz for Lesson 14 (Q9-10: Teks Berita - Program Disdik)
            {
                id: 'quiz-les-lit-14',
                lesson_id: 'les-lit-14',
                questions: [
                    {
                        question: 'Pernyataan yang sesuai dengan unsur bagaimana dari teks berita tersebut adalah … (Jawaban lebih dari satu)',
                        options: [
                            'Pelaksanaan program dilakukan melalui pendekatan inovatif yang membantu meningkatkan motivasi belajar siswa.',
                            'Disdik bekerja sama dengan orang tua dan masyarakat dalam menciptakan lingkungan belajar yang kondusif.',
                            'Program unggulan dilakukan dengan merujuk kepada kurikulum nasional untuk menciptakan generasi tangguh.',
                            'Program Disdik didukung oleh penelitian pakar pendidikan yang menunjukkan dampak positif.'
                        ],
                        correctIndex: 0 // A, B, D benar
                    },
                    {
                        question: 'Istilah terkait proses pendidikan dalam teks tersebut adalah .... (Jawaban lebih dari satu)',
                        options: [
                            'motivasi belajar',
                            'pendekatan inovatif',
                            'menciptakan generasi',
                            'penelitian pendidikan'
                        ],
                        correctIndex: 0 // A, B benar
                    }
                ]
            },

            // Quiz for Lesson 15 (Q11-13: Teks Eksposisi - Gen Z)
            {
                id: 'quiz-les-lit-15',
                lesson_id: 'les-lit-15',
                questions: [
                    {
                        question: 'Berdasarkan kosakata yang digunakan, objek yang dibahas dalam teks tersebut adalah ….',
                        options: [
                            'pergeseran perilaku pencarian informasi di kalangan Gen Z',
                            'pergeseran perilaku Gen Z dalam media sosial',
                            'pergeseran kepercayaan dari teks ke media visual',
                            'pergeseran kepercayaan Gen Z dengan internet'
                        ],
                        correctIndex: 0
                    },
                    {
                        question: '40% anak muda beralih ke TikTok/Instagram saat mencari tempat makan. Konsekuensi logis dari data ini terhadap strategi branding bagi pemasar digital adalah …',
                        options: [
                            'Pemasar harus mengalihkan seluruh anggaran iklan dari media sosial ke Google Maps.',
                            'Pemasar dapat mengabaikan Gen Z karena jumlah mereka tidak signifikan bagi pasar.',
                            'Pemasar harus memastikan brand mereka muncul di FYP karena jika tidak, brand tersebut dianggap tidak eksis oleh Gen Z.',
                            'Pemasar harus membuat artikel SEO yang lebih panjang dan mendetail untuk menarik minat Gen Z kembali.'
                        ],
                        correctIndex: 2
                    },
                    {
                        question: 'Simpulan ide pokok dalam teks tersebut adalah …',
                        options: [
                            'Google sedang mengalami penurunan karena 40% anak muda beralih ke TikTok dan Instagram.',
                            'Pentingnya Search Engine Optimization (SEO) dalam strategi pemasaran digital di tahun 2025.',
                            'Senior Vice President Google mengakui bahwa "Mbah Google tahu segalanya" adalah frasa yang tidak valid lagi.',
                            'Telah terjadi pergeseran fundamental dalam perilaku pencarian informasi pada Gen Z.'
                        ],
                        correctIndex: 3
                    }
                ]
            },

            // Quiz for Lesson 16 (Q14-16: Teks Eksplanasi - Kesehatan Gigi)
            {
                id: 'quiz-les-lit-16',
                lesson_id: 'les-lit-16',
                questions: [
                    {
                        question: 'Istilah kesehatan yang digunakan dalam teks tersebut adalah ….',
                        options: [
                            'karies gigi, tidak menular, dan strategi',
                            'kesadaran pasien, mulut, dan gigi anak',
                            'luas, kesejahteraan, dan ekonomi',
                            'motivasi, masyarakat, dan pasien'
                        ],
                        correctIndex: 1
                    },
                    {
                        question: 'Hubungan logis antargagasan dalam teks tersebut yang paling tepat adalah …',
                        options: [
                            'Hubungan penjelasan dan pendukung: Gagasan mengenai pentingnya IoT dalam promosi kesehatan gigi dijelaskan lebih lanjut dan didukung oleh data WHO, hasil penelitian, serta fungsi praktisnya.',
                            'Hubungan sebab dan akibat: Karies gigi yang meluas (sebab) menyebabkan perlunya pengembangan teknologi IoT dalam promosi kesehatan (akibat).',
                            'Hubungan perbandingan dan pertentangan: Membandingkan metode promosi kesehatan gigi konvensional yang dianggap kurang efektif dengan metode digital (IoT) yang lebih modern dan efisien.',
                            'Hubungan kronologis: Menguraikan perkembangan promosi kesehatan gigi, dimulai dari pendekatan tradisional hingga pendekatan digital di era modern.'
                        ],
                        correctIndex: 0
                    },
                    {
                        question: 'Pernyataan yang sesuai dengan isi teks tersebut adalah ...',
                        options: [
                            'Karies gigi adalah penyakit menular yang meluas penyebarannya pada semua usia.',
                            'Penggunaan internet dan aplikasi seluler kurang berpengaruh dalam meningkatkan kesadaran kebersihan gigi dan mulut.',
                            'IoT adalah tren teknologi terbesar yang berpotensi membantu peningkatan kesehatan gigi dan pencegahan penyakit gigi anak.',
                            'Penggunaan IoT efektif untuk mengingatkan orang tua dalam mempraktikkan kebersihan gigi dan mulut, tetapi tidak untuk memotivasi mereka.'
                        ],
                        correctIndex: 2
                    }
                ]
            },

            // Quiz for Lesson 17 (Q17-20: Teks Ulasan)
            {
                id: 'quiz-les-lit-17',
                lesson_id: 'les-lit-17',
                questions: [
                    {
                        question: 'Hubungan logis antarinformasi yang terdapat dalam teks tersebut diantaranya … (Jawaban lebih dari satu)',
                        options: [
                            'Paragraf kesatu terdapat hubungan pertentangan diawali dari kebingungan memahami isi namun akhirnya terselesaikan juga.',
                            'Paragraf kedua mendukung pernyataan paragraf pertama dengan pemaparan yang jelas.',
                            'Paragraf terakhir berisi kalimat rekomendasi dan didukung oleh evaluasi kekurangan buku.',
                            'Paragraf kedua berisi paparan sinopsis diperkuat di paragraf ketiga dengan adanya penilaian kelebihan buku.'
                        ],
                        correctIndex: 0 // A benar
                    },
                    {
                        question: 'Data yang sesuai dengan unsur buku dalam teks ulasan tersebut diantaranya …. (Jawaban lebih dari satu)',
                        options: [
                            'jumlah halaman buku ini melebihi 200 halaman',
                            'penulis buku ini adalah Maya Lestari GF',
                            'buku ini diterbitkan pada tahun 2020',
                            'kategori buku ini adalah novel'
                        ],
                        correctIndex: 1 // B, C, D benar
                    },
                    {
                        question: 'Informasi tersurat yang terdapat dalam teks tersebut adalah …',
                        options: [
                            'Peran orang tua dalam cerita sangat besar, tetapi hanya muncul di akhir cerita.',
                            'Novel Sesuk lebih menonjolkan kisah horor hantu yang sangat mencekam dan menakutkan.',
                            'Cerita dalam buku ini menggabungkan unsur gaib, kearifan lokal, dan teknologi canggih.',
                            'Meskipun seram, pembaca merasa lega karena semua kejadian aneh dapat diatasi dengan mudah.'
                        ],
                        correctIndex: 2
                    },
                    {
                        question: 'Pernyataan berikut yang paling tepat untuk menilai kesesuaian antara identitas buku dengan ulasannya adalah …',
                        options: [
                            'Ulasan tersebut tidak relevan karena identitas buku menyebutkan 329 halaman, namun ulasannya terlalu singkat dan tidak proporsional.',
                            'Ulasan tersebut dinilai sesuai karena langsung fokus pada isi cerita dan pesan moral, mengabaikan aspek fisik buku seperti jumlah halaman.',
                            'Ulasan tersebut dinilai tidak sesuai karena meskipun disebutkan penulisnya Tere Liye, gaya bahasa ulasan tidak mencerminkan ciri khas beliau.',
                            'Ulasan tersebut relevan karena mencantumkan identitas buku secara lengkap sebelum mengulas tuntas aspek fiksi di dalamnya.'
                        ],
                        correctIndex: 3
                    }
                ]
            },

            // Quiz for Lesson 18 (Q21-23: Puisi)
            {
                id: 'quiz-les-lit-18',
                lesson_id: 'les-lit-18',
                questions: [
                    {
                        question: 'Suasana yang tergambar dalam puisi tersebut adalah .…',
                        options: [
                            'sedang menderita',
                            'merasa kesepian',
                            'ditinggal kekasih',
                            'merasa kehilangan'
                        ],
                        correctIndex: 3
                    },
                    {
                        question: 'Citraan yang terdapat pada puisi tersebut adalah .…',
                        options: [
                            'penglihatan, pendengaran, dan perasaan',
                            'penglihatan, perasaan, dan perabaan',
                            'pendengaran, perasaan, dan perabaan',
                            'pendengaran, perabaan, dan penglihatan'
                        ],
                        correctIndex: 0
                    },
                    {
                        question: 'Perasaan emosional yang mendominasi pada puisi tersebut adalah ....',
                        options: [
                            'kegembiraan karena perbedaan yang menyatukan',
                            'kemarahan terhadap takdir dan perbedaan yang ada',
                            'nostalgia dan penyesalan atas hubungan yang bermasalah',
                            'kesedihan mendalam atas perpisahan yang tak terhindarkan'
                        ],
                        correctIndex: 3
                    }
                ]
            },

            // Quiz for Lesson 19 (Q24-26: Cerpen - Selintas Sepi)
            {
                id: 'quiz-les-lit-19',
                lesson_id: 'les-lit-19',
                questions: [
                    {
                        question: 'Urutan kerangka bagian-bagian penting pada teks tersebut adalah ...',
                        options: [
                            'orientasi: Kepulan hangat kapucino itu membuatku enggan kembali ke hotel. komplikasi: Kafe mulai sesak. Kulihat beberapa orang berbalik kecewa ketika melihat seluruh kursi telah penuh. resolusi: Beruntung bisa mendapat tempat duduk di kafe yang dikenal turis sebagai tempat yang terkenal dengan kapucinonya ini.',
                            'orientasi: Entah kenapa tiap tegukkannya kunikmati benar-benar. komplikasi: Harum kapucino itu cukup lama masuk ke hidungku sebelum cairannya menelusuri tenggorokan. resolusi: Kulihat beberapa orang berbalik kecewa ketika melihat seluruh kursi telah penuh.',
                            'orientasi: Harum kapucino itu cukup lama masuk ke hidungku sebelum cairannya menelusuri tenggorokan. komplikasi: Kafe mulai sesak. Kulihat beberapa orang berbalik kecewa ketika melihat seluruh kursi telah terisi penuh. resolusi: Setiap liburan panjang, turis-turis tumpah ruah di Old Quebec. Dan aku hanyalah salah satu dari mereka.',
                            'orientasi: Malam cerah dan riuh seperti siang yang kehilangan matahari. komplikasi: Biasanya aku selalu terburu-buru dan tak pernah bisa tenang saat menghadapi makanan ataupun minuman. resolusi: Setiap liburan panjang, turis-turis tumpah ruah di Old Quebec.'
                        ],
                        correctIndex: 0
                    },
                    {
                        question: 'Perkembangan sikap tokoh pada cerita tersebut yang paling mungkin terjadi selanjutnya adalah ...',
                        options: [
                            'Tokoh utama akan segera buru-buru menghabiskan kapucinonya dan pulang ke hotel.',
                            'Tokoh utama akan terlibat dalam dialog dengan salah satu turis yang baru datang atau pelayan kafe.',
                            'Kapucino tokoh utama akan dingin dan membuatnya kecewa, sehingga ia marah.',
                            'Tokoh utama akan mulai panik karena menyadari ia terlambat untuk suatu janji.'
                        ],
                        correctIndex: 1
                    },
                    {
                        question: 'Perubahan sikap dalam kehidupan sehari-hari yang paling relevan dengan situasi pada cerita tersebut adalah ....',
                        options: [
                            'tantangan untuk tetap tenang saat menghadapi ujian sulit di sekolah',
                            'sadar bahwa kita perlu rehat dari rutinitas padat untuk menikmati kebutuhan hal-hal kecil',
                            'keharusan untuk cepat-cepat makan karena bel masuk sekolah sudah berbunyi',
                            'kebutuhan untuk menyesuaikan diri dengan tempat baru saat pindah rumah'
                        ],
                        correctIndex: 1
                    }
                ]
            },

            // Quiz for Lesson 20 (Q27-30: Cerpen - Penghapus Ajaib + Teks Eksplanasi)
            {
                id: 'quiz-les-lit-20',
                lesson_id: 'les-lit-20',
                questions: [
                    {
                        question: 'Peristiwa yang menjadi momen pertemuan tokoh utama dengan penghapus ajaib adalah ….',
                        options: [
                            'saat ia menemani temannya berbelanja alat tulis di toko dekat sekolah',
                            'saat ia terpeleset di tengah jalan sewaktu berlari menerobos hujan',
                            'saat ia membersihkan kamar dan menemukan penghapus yang terjatuh',
                            'saat memungut sampah yang berserakan di depan gerbang sekolah'
                        ],
                        correctIndex: 1
                    },
                    {
                        question: 'Ide pokok yang mendasari cerita ini adalah ....',
                        options: [
                            'pentingnya memiliki teman yang selalu memberikan motivasi',
                            'perasaan kecewa tokoh utama terhadap prestasi belajarnya',
                            'alasan tokoh utama bisa mendapatkan ketenangan batin',
                            'nilai kejujuran, lebih penting daripada nilai akademik di mata orang tua'
                        ],
                        correctIndex: 3
                    },
                    {
                        question: 'Makna kiasan dari anak semata wayang pada cerita tersebut adalah ….',
                        options: [
                            'anak pertama dalam keluarga',
                            'anak andalan dalam keluarga',
                            'anak satu-satunya dalam keluarga',
                            'anak kesayangan dalam keluarga'
                        ],
                        correctIndex: 2
                    },
                    {
                        question: 'Jika musim hujan datang, kemungkinan penyakit yang akan muncul adalah …. (Jawaban lebih dari satu)',
                        options: [
                            'diare dan infeksi saluran pernapasan atas (ISPA)',
                            'demam berdarah dan leptospirosis',
                            'masuk angin dan influenza',
                            'penyakit kulit dan gatal-gatal'
                        ],
                        correctIndex: 0 // A, B, D benar
                    }
                ]
            }
        ];

        // Insert new quizzes
        console.log('❓ Adding 10 new quizzes with 30 questions...');
        const { error: quizError } = await supabase
            .from('quizzes')
            .insert(newQuizzes);

        if (quizError) {
            console.error('Error adding quizzes:', quizError);
            throw quizError;
        }
        console.log('✓ Quizzes added successfully\n');

        // Verify
        console.log('=== Verification ===');
        const { data: allLessons } = await supabase
            .from('lessons')
            .select('id, title')
            .eq('course_id', 'tka-literasi')
            .order('order_index');

        console.log(`Total lessons: ${allLessons.length}`);
        console.log('New lessons added:');
        allLessons.slice(10).forEach(lesson => {
            console.log(`  - ${lesson.title}`);
        });

        const { data: allQuizzes } = await supabase
            .from('quizzes')
            .select('id, lesson_id, questions')
            .in('lesson_id', newLessons.map(l => l.id));

        const totalQuestions = allQuizzes.reduce((sum, quiz) => {
            const questions = typeof quiz.questions === 'string'
                ? JSON.parse(quiz.questions)
                : quiz.questions;
            return sum + questions.length;
        }, 0);

        console.log(`Total new questions: ${totalQuestions}`);

        console.log('\n✅ TKA Literasi Paket A successfully added!');
        console.log('📊 Summary:');
        console.log(`   - Total lessons: ${allLessons.length} (10 existing + 10 new)`);
        console.log(`   - Total questions: ${30 + totalQuestions} (30 existing + ${totalQuestions} new)`);

    } catch (error) {
        console.error('❌ Error during seeding:', error);
        throw error;
    }
}

seedLiterasiPaketA()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error('Seeding failed:', error);
        process.exit(1);
    });
