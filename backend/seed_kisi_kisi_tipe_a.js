// Seed script to add 30 additional questions from Kisi-Kisi Tipe A
// This will create 9 new lessons (Lesson 10-18) with additional practice questions

import { supabase } from './services/supabase.js';

async function seedKisiKisiTipeA() {
    console.log('🌱 Adding Kisi-Kisi Tipe A questions (30 additional questions)...\n');

    try {
        // ============================================
        // MODULE 1: BILANGAN - 2 New Lessons (10-11)
        // ============================================

        const newLessons = [
            // Lesson 10: Perbandingan & Operasi (Module 1)
            {
                id: 'les-num-10',
                module_id: 'mod-num-1',
                course_id: 'tka-numerasi',
                title: 'Latihan Tambahan: Perbandingan & Operasi Dasar',
                content: `Latihan tambahan untuk memperdalam pemahaman tentang perbandingan dan operasi aritmetika dasar.
        
Topik yang dibahas:
- Perbandingan dan selisih
- Operasi hitung pada data tabel
- Pembelian dan perhitungan harga
- Pembagian dan sisa`,
                video_url: 'https://www.youtube.com/watch?v=KwJ_HMedAFQ',
                duration: '20 menit',
                order_index: 10,
            },

            // Lesson 11: Perbandingan Lanjutan (Module 1)
            {
                id: 'les-num-11',
                module_id: 'mod-num-1',
                course_id: 'tka-numerasi',
                title: 'Latihan Tambahan: Faktorisasi & Perbandingan Berbalik Nilai',
                content: `Latihan tambahan untuk perbandingan berbalik nilai dan faktorisasi prima.
        
Topik yang dibahas:
- Diskon dan perhitungan uang kembalian
- Faktorisasi prima
- Perbandingan berbalik nilai
- Skala dan proporsi`,
                video_url: 'https://www.youtube.com/watch?v=KwJ_HMedAFQ',
                duration: '20 menit',
                order_index: 11,
            },

            // Lesson 12: Persamaan Linear (Module 2)
            {
                id: 'les-num-12',
                module_id: 'mod-num-2',
                course_id: 'tka-numerasi',
                title: 'Latihan Tambahan: Persamaan & Pertidaksamaan Linear',
                content: `Latihan tambahan untuk persamaan dan pertidaksamaan linear.
        
Topik yang dibahas:
- Sudut berpelurus
- Pertidaksamaan linear
- Bentuk aljabar
- Sistem persamaan linear dua variabel`,
                video_url: 'https://www.youtube.com/watch?v=KwJ_HMedAFQ',
                duration: '20 menit',
                order_index: 12,
            },

            // Lesson 13: Barisan & Fungsi (Module 2)
            {
                id: 'les-num-13',
                module_id: 'mod-num-2',
                course_id: 'tka-numerasi',
                title: 'Latihan Tambahan: Barisan, Deret & Fungsi',
                content: `Latihan tambahan untuk barisan, deret aritmatika, dan fungsi.
        
Topik yang dibahas:
- Barisan berhingga
- Barisan aritmatika
- Nilai fungsi`,
                video_url: 'https://www.youtube.com/watch?v=KwJ_HMedAFQ',
                duration: '20 menit',
                order_index: 13,
            },

            // Lesson 14: Sudut & Transformasi (Module 3)
            {
                id: 'les-num-14',
                module_id: 'mod-num-3',
                course_id: 'tka-numerasi',
                title: 'Latihan Tambahan: Sudut & Transformasi Geometri',
                content: `Latihan tambahan untuk sudut dan transformasi geometri.
        
Topik yang dibahas:
- Hubungan antar sudut
- Translasi dan refleksi
- Teorema Pythagoras`,
                video_url: 'https://www.youtube.com/watch?v=KwJ_HMedAFQ',
                duration: '20 menit',
                order_index: 14,
            },

            // Lesson 15: Luas & Keliling (Module 3)
            {
                id: 'les-num-15',
                module_id: 'mod-num-3',
                course_id: 'tka-numerasi',
                title: 'Latihan Tambahan: Luas & Keliling Bangun',
                content: `Latihan tambahan untuk luas permukaan dan keliling bangun datar.
        
Topik yang dibahas:
- Luas permukaan bangun ruang
- Keliling lingkaran
- Luas trapesium`,
                video_url: 'https://www.youtube.com/watch?v=KwJ_HMedAFQ',
                duration: '20 menit',
                order_index: 15,
            },

            // Lesson 16: Bangun Ruang (Module 3)
            {
                id: 'les-num-16',
                module_id: 'mod-num-3',
                course_id: 'tka-numerasi',
                title: 'Latihan Tambahan: Volume & Jaring-Jaring Bangun Ruang',
                content: `Latihan tambahan untuk volume dan jaring-jaring bangun ruang.
        
Topik yang dibahas:
- Volume kubus dan limas
- Jaring-jaring prisma
- Bangun ruang gabungan`,
                video_url: 'https://www.youtube.com/watch?v=KwJ_HMedAFQ',
                duration: '20 menit',
                order_index: 16,
            },

            // Lesson 17: Statistika (Module 4)
            {
                id: 'les-num-17',
                module_id: 'mod-num-4',
                course_id: 'tka-numerasi',
                title: 'Latihan Tambahan: Penyajian & Interpretasi Data',
                content: `Latihan tambahan untuk penyajian dan interpretasi data statistika.
        
Topik yang dibahas:
- Distribusi frekuensi
- Interpretasi tabel
- Diagram batang
- Mean, median, modus`,
                video_url: 'https://www.youtube.com/watch?v=KwJ_HMedAFQ',
                duration: '20 menit',
                order_index: 17,
            },

            // Lesson 18: Peluang (Module 4)
            {
                id: 'les-num-18',
                module_id: 'mod-num-4',
                course_id: 'tka-numerasi',
                title: 'Latihan Tambahan: Peluang & Kombinatorik',
                content: `Latihan tambahan untuk peluang dan kombinatorik.
        
Topik yang dibahas:
- Peluang kejadian tunggal
- Himpunan dan peluang
- Kombinatorik dan rute`,
                video_url: 'https://www.youtube.com/watch?v=KwJ_HMedAFQ',
                duration: '20 menit',
                order_index: 18,
            },
        ];

        // Insert new lessons
        console.log('📖 Adding 9 new lessons...');
        const { error: lessonError } = await supabase
            .from('lessons')
            .insert(newLessons);

        if (lessonError) {
            console.error('Error adding lessons:', lessonError);
            throw lessonError;
        }
        console.log('✓ Lessons added successfully\n');

        // ============================================
        // QUIZZES - 30 New Questions
        // ============================================

        const newQuizzes = [
            // Quiz for Lesson 10 (Q1-4: Bilangan)
            {
                id: 'quiz-les-num-10',
                lesson_id: 'les-num-10',
                questions: [
                    {
                        question: 'Di sebuah kelas, perbandingan jumlah siswa laki-laki dan perempuan adalah 3:5. Jika selisih jumlah siswa laki-laki dan perempuan adalah 10 orang, berapa jumlah seluruh siswa di kelas tersebut?',
                        options: ['30 orang', '35 orang', '40 orang', '45 orang'],
                        correctIndex: 2
                    },
                    {
                        question: 'Tabel berikut menunjukkan volume air yang diminum Budi:\n\nPagi: 500 ml\nSiang: 750 ml\nSore: 600 ml\nMalam: 400 ml\n\nJika Budi menyiapkan 3 liter air di pagi hari, berapa ml air yang tersisa?',
                        options: ['650 ml', '750 ml', '850 ml', '950 ml'],
                        correctIndex: 1
                    },
                    {
                        question: 'Sebuah toko menjual buku tulis seharga Rp 3.500 per buah. Jika membeli 5 buah atau lebih, mendapat diskon 10%. Manakah pernyataan yang benar?',
                        options: [
                            'Harga 3 buku adalah Rp 10.500',
                            'Harga 5 buku setelah diskon adalah Rp 15.750',
                            'Diskon untuk 4 buku adalah Rp 1.400',
                            'Harga 6 buku setelah diskon adalah Rp 18.900'
                        ],
                        correctIndex: 1
                    },
                    {
                        question: 'Di sebuah kelas terdapat 40 siswa. Setiap siswa laki-laki membawa 2 botol air mineral dan setiap siswa perempuan membawa 1 botol. Jika perbandingan siswa laki-laki dan perempuan adalah 3:5, dan 15 botol dari siswa perempuan sudah habis, berapa botol air mineral dari siswa perempuan yang masih tersisa?',
                        options: ['5 botol', '8 botol', '10 botol', '12 botol'],
                        correctIndex: 2
                    }
                ]
            },

            // Quiz for Lesson 11 (Q5-8: Bilangan Lanjutan)
            {
                id: 'quiz-les-num-11',
                lesson_id: 'les-num-11',
                questions: [
                    {
                        question: 'Sebuah toko memberikan diskon untuk sepatu 20% dan sandal 15%. Harga sepatu sebelum diskon adalah Rp 200.000 dan sandal Rp 80.000. Jika Andi membeli keduanya dan membayar dengan uang Rp 300.000, berapa uang kembaliannya?',
                        options: ['Rp 72.000', 'Rp 68.000', 'Rp 64.000', 'Rp 60.000'],
                        correctIndex: 0
                    },
                    {
                        question: 'Diketahui n adalah bilangan bulat positif. Pecahan (n+12)/(n-3) menghasilkan bilangan bulat. Berapa banyak nilai n yang memenuhi?',
                        options: ['4', '5', '6', '7'],
                        correctIndex: 1
                    },
                    {
                        question: 'Sebuah proyek pembangunan dapat diselesaikan oleh 20 pekerja dalam waktu 30 hari. Setelah 10 hari bekerja, proyek terhenti selama 5 hari. Berapa tambahan pekerja yang diperlukan agar proyek selesai tepat waktu?',
                        options: ['5 pekerja', '8 pekerja', '10 pekerja', '12 pekerja'],
                        correctIndex: 0
                    },
                    {
                        question: 'Pada sebuah peta dengan skala 1:50.000, jarak dari kantor desa ke bukit adalah 8 cm. Jika seseorang berjalan kaki dengan kecepatan 4 km/jam, berapa lama waktu yang diperlukan untuk sampai ke bukit?',
                        options: ['45 menit', '50 menit', '60 menit', '75 menit'],
                        correctIndex: 2
                    }
                ]
            },

            // Quiz for Lesson 12 (Q9-12: Aljabar)
            {
                id: 'quiz-les-num-12',
                lesson_id: 'les-num-12',
                questions: [
                    {
                        question: 'Dua buah sudut saling berpelurus. Sudut pertama besarnya (2x + 15)° dan sudut kedua besarnya (3x - 25)°. Berapakah besar sudut yang pertama?',
                        options: ['53°', '65°', '77°', '83°'],
                        correctIndex: 3
                    },
                    {
                        question: 'Sebuah aquarium berbentuk balok dengan panjang 80 cm, lebar 40 cm, dan tinggi h cm. Jika volume aquarium tidak boleh lebih dari 128.000 cm³, manakah pernyataan yang benar tentang tinggi aquarium?',
                        options: ['h ≤ 40 cm', 'h ≥ 40 cm', 'h < 40 cm', 'h > 40 cm'],
                        correctIndex: 0
                    },
                    {
                        question: 'Tersedia 500 tiket untuk sebuah konser. Ani menjual x tiket, Budi menjual (x + 50) tiket, dan tersisa 200 tiket. Berapa tiket yang dijual Ani?',
                        options: ['100 tiket', '115 tiket', '125 tiket', '150 tiket'],
                        correctIndex: 2
                    },
                    {
                        question: 'Di sebuah toko buah, 3 kg jeruk dan 2 kg apel harganya Rp 65.000. Sedangkan 2 kg jeruk dan 3 kg apel harganya Rp 70.000. Manakah pernyataan yang benar?',
                        options: [
                            'Harga 1 kg jeruk adalah Rp 10.000',
                            'Harga 1 kg apel adalah Rp 15.000',
                            'Harga 5 kg jeruk sama dengan harga 4 kg apel',
                            'Selisih harga 1 kg apel dan 1 kg jeruk adalah Rp 5.000'
                        ],
                        correctIndex: 0
                    }
                ]
            },

            // Quiz for Lesson 13 (Q13-15: Barisan & Fungsi)
            {
                id: 'quiz-les-num-13',
                lesson_id: 'les-num-13',
                questions: [
                    {
                        question: 'Di sebuah perempatan, lampu merah menyala setiap 60 detik, lampu kuning setiap 45 detik, dan lampu hijau setiap 90 detik. Jika pada pukul 07.00 ketiga lampu menyala bersamaan, manakah pernyataan yang benar?',
                        options: [
                            'Ketiga lampu akan menyala bersamaan lagi pada pukul 07.03',
                            'Lampu merah dan kuning menyala bersamaan setiap 120 detik',
                            'Lampu kuning dan hijau menyala bersamaan setiap 90 detik',
                            'Dalam 10 menit pertama, lampu merah menyala 10 kali'
                        ],
                        correctIndex: 0
                    },
                    {
                        question: 'Harga tiket pertunjukan adalah Rp 50.000. Gedung pertunjukan memiliki 20 baris kursi. Baris pertama berisi 15 kursi, dan setiap baris berikutnya bertambah 3 kursi. Manakah pernyataan yang benar?',
                        options: [
                            'Baris ke-10 memiliki 42 kursi',
                            'Total kursi di gedung adalah 870 kursi',
                            'Pendapatan maksimal jika semua kursi terisi adalah Rp 40.000.000',
                            'Baris terakhir memiliki 72 kursi'
                        ],
                        correctIndex: 0
                    },
                    {
                        question: 'Diketahui fungsi f(x) = 2x² - 5x + 3. Berapakah nilai f(3)?',
                        options: ['6', '8', '10', '12'],
                        correctIndex: 3
                    }
                ]
            },

            // Quiz for Lesson 14 (Q16-17, 20: Geometri - Sudut & Transformasi)
            {
                id: 'quiz-les-num-14',
                lesson_id: 'les-num-14',
                questions: [
                    {
                        question: 'Sebuah pizza dipotong menjadi 8 bagian sama besar. Jika Andi memakan 3 potong pizza, berapa besar sudut pizza yang dimakan Andi?',
                        options: ['90°', '135°', '150°', '180°'],
                        correctIndex: 1
                    },
                    {
                        question: 'Titik A(4, 3) ditranslasikan sejauh (-2, 5), kemudian direfleksikan terhadap sumbu Y. Koordinat bayangan titik A adalah...',
                        options: ['(-2, 8)', '(2, 8)', '(-2, -8)', '(2, -8)'],
                        correctIndex: 0
                    },
                    {
                        question: 'Tim SAR melakukan pelatihan navigasi. Pos A berada di koordinat (0, 0), Pos B di (300, 0), dan Pos C di (0, 400). Semua dalam satuan meter. Berapakah luas wilayah yang dibentuk oleh ketiga pos tersebut?',
                        options: ['50.000 m²', '60.000 m²', '70.000 m²', '80.000 m²'],
                        correctIndex: 1
                    }
                ]
            },

            // Quiz for Lesson 15 (Q18-19, 23: Geometri - Luas & Keliling)
            {
                id: 'quiz-les-num-15',
                lesson_id: 'les-num-15',
                questions: [
                    {
                        question: 'Sebuah drum bekas berbentuk tabung dengan diameter 60 cm dan tinggi 80 cm akan dicat seluruh permukaannya. Jika 1 kaleng cat dapat menutup 2 m², berapa kaleng cat yang diperlukan? (π = 3,14)',
                        options: ['1 kaleng', '2 kaleng', '3 kaleng', '4 kaleng'],
                        correctIndex: 2
                    },
                    {
                        question: 'Sebuah gulungan kabel memiliki inti berbentuk silinder dengan diameter 20 cm. Kabel dililitkan sebanyak 50 lapis dengan ketebalan setiap lapis 0,5 cm. Jika harga kabel Rp 5.000 per meter, manakah pernyataan yang benar? (π = 3,14)',
                        options: [
                            'Diameter gulungan setelah 50 lapis adalah 60 cm',
                            'Panjang kabel pada lapis pertama sekitar 62,8 cm',
                            'Panjang kabel pada lapis ke-50 sekitar 219,8 cm',
                            'Total biaya kabel sekitar Rp 3.500.000'
                        ],
                        correctIndex: 2
                    },
                    {
                        question: 'Sebuah trapesium ABCD memiliki AB // CD. Panjang AB = 12 cm, CD = 8 cm, dan tinggi trapesium 6 cm. Diagonal AC dan BD berpotongan di titik O. Berapakah luas segitiga AOB?',
                        options: ['18 cm²', '21 cm²', '24 cm²', '27 cm²'],
                        correctIndex: 0
                    }
                ]
            },

            // Quiz for Lesson 16 (Q21-22, 24: Geometri - Bangun Ruang)
            {
                id: 'quiz-les-num-16',
                lesson_id: 'les-num-16',
                questions: [
                    {
                        question: 'Sebuah bangun terdiri dari kubus dengan rusuk 10 cm dan limas segiempat dengan alas sama dengan sisi atas kubus. Tinggi limas adalah 12 cm. Berapakah volume bangun tersebut?',
                        options: ['1.200 cm³', '1.300 cm³', '1.400 cm³', '1.500 cm³'],
                        correctIndex: 2
                    },
                    {
                        question: 'Sebuah prisma segitiga sama kaki memiliki alas dengan panjang sisi 10 cm, 10 cm, dan 12 cm. Tinggi alas prisma 8 cm dan tinggi prisma 15 cm. Manakah pernyataan yang benar?',
                        options: [
                            'Luas alas prisma adalah 48 cm²',
                            'Volume prisma adalah 720 cm³',
                            'Luas permukaan prisma adalah 600 cm²',
                            'Panjang diagonal ruang prisma adalah 20 cm'
                        ],
                        correctIndex: 0
                    },
                    {
                        question: 'Sebuah hiasan berbentuk setengah lingkaran dengan diameter 14 cm dan tabung dengan tinggi 10 cm serta diameter 14 cm. Manakah pernyataan yang benar? (π = 22/7)',
                        options: [
                            'Luas setengah lingkaran adalah 77 cm²',
                            'Volume tabung adalah 1.540 cm³',
                            'Luas permukaan tabung tanpa tutup adalah 660 cm²',
                            'Total luas permukaan hiasan adalah 800 cm²'
                        ],
                        correctIndex: 1
                    }
                ]
            },

            // Quiz for Lesson 17 (Q25-28: Data & Statistika)
            {
                id: 'quiz-les-num-17',
                lesson_id: 'les-num-17',
                questions: [
                    {
                        question: 'Tabel distribusi frekuensi jumlah kunjungan wisatawan asing ke Kabupaten Bogor tahun 2023:\n\nJanuari-Maret: 1.200 orang\nApril-Juni: 1.500 orang\nJuli-September: 1.800 orang\nOktober-Desember: 1.300 orang\n\nManakah pernyataan yang benar?',
                        options: [
                            'Rata-rata kunjungan per triwulan adalah 1.400 orang',
                            'Median kunjungan adalah 1.500 orang',
                            'Modus kunjungan adalah 1.800 orang',
                            'Total kunjungan sepanjang tahun adalah 5.800 orang'
                        ],
                        correctIndex: 3
                    },
                    {
                        question: 'Tabel pengunjung toko dalam seminggu:\n\nSenin: 45, Selasa: 52, Rabu: 48, Kamis: 55, Jumat: 60, Sabtu: 75, Minggu: 80\n\nManakah pernyataan yang benar?',
                        options: [
                            'Rata-rata pengunjung per hari adalah 55 orang',
                            'Median pengunjung adalah 55 orang',
                            'Modus pengunjung adalah 60 orang',
                            'Jangkauan data adalah 40 orang'
                        ],
                        correctIndex: 1
                    },
                    {
                        question: 'Diagram batang menunjukkan jumlah murid yang mengikuti ekstrakurikuler:\n\nFutsal: 25, Basket: 20, Voli: 15, Badminton: 30, Renang: 10\n\nManakah pernyataan yang benar?',
                        options: [
                            'Rata-rata murid per ekstrakurikuler adalah 20 orang',
                            'Median jumlah murid adalah 25 orang',
                            'Modus jumlah murid adalah 30 orang',
                            'Total murid yang mengikuti ekstrakurikuler adalah 100 orang'
                        ],
                        correctIndex: 0
                    },
                    {
                        question: 'Nilai uji kompetensi 5 siswa:\n\nAni: 85, 87, 86, 85, 87\nBudi: 70, 90, 75, 85, 80\nCitra: 82, 83, 82, 83, 82\nDedi: 88, 72, 90, 70, 85\n\nSiswa manakah yang memiliki nilai paling stabil dan merata?',
                        options: ['Ani', 'Budi', 'Citra', 'Dedi'],
                        correctIndex: 3
                    }
                ]
            },

            // Quiz for Lesson 18 (Q29-30: Peluang)
            {
                id: 'quiz-les-num-18',
                lesson_id: 'les-num-18',
                questions: [
                    {
                        question: 'Diketahui himpunan A = {1, 2, 3, 4, 5} dan B = {3, 4, 5, 6, 7}. Jika diambil satu anggota secara acak dari masing-masing himpunan, berapakah peluang kedua anggota yang terambil sama?',
                        options: ['1/5', '2/5', '3/25', '3/5'],
                        correctIndex: 2
                    },
                    {
                        question: 'Dari titik A ke titik B, seseorang harus melewati 3 persimpangan. Di setiap persimpangan ada 2 pilihan jalan (kiri atau kanan). Manakah pernyataan yang benar?',
                        options: [
                            'Total rute yang mungkin adalah 8 rute',
                            'Peluang memilih rute tertentu adalah 1/8',
                            'Jika di persimpangan pertama memilih kiri, tersisa 4 kemungkinan rute',
                            'Semua pernyataan di atas benar'
                        ],
                        correctIndex: 3
                    }
                ]
            }
        ];

        // Insert new quizzes
        console.log('❓ Adding 9 new quizzes with 30 questions...');
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
            .eq('course_id', 'tka-numerasi')
            .order('order_index');

        console.log(`Total lessons: ${allLessons.length}`);
        console.log('New lessons added:');
        allLessons.slice(9).forEach(lesson => {
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

        console.log('\n✅ Kisi-Kisi Tipe A successfully added!');
        console.log('📊 Summary:');
        console.log(`   - Total lessons: ${allLessons.length} (9 existing + 9 new)`);
        console.log(`   - Total questions: ${30 + totalQuestions} (30 existing + ${totalQuestions} new)`);

    } catch (error) {
        console.error('❌ Error during seeding:', error);
        throw error;
    }
}

seedKisiKisiTipeA()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error('Seeding failed:', error);
        process.exit(1);
    });
