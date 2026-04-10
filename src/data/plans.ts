export type BodyType = 'ectomorph' | 'mesomorph' | 'endomorph';

export interface Plan {
  title: string;
  description: string;
  macros: {
    carbs: number;
    protein: number;
    fat: number;
  };
  mealPlan: string;
  workoutSchedule: string;
  homeWorkout: string;
  lifestyleTips: string[];
}

export const plans: Record<BodyType, Plan> = {
  ectomorph: {
    title: 'Ectomorph',
    description: 'Tipe tubuh yang cenderung kurus, sulit menambah berat badan atau otot karena metabolisme yang sangat cepat.',
    macros: { carbs: 50, protein: 25, fat: 25 },
    mealPlan: `
### Rencana Makan Harian (Ectomorph)
Fokus pada surplus kalori dengan makanan padat nutrisi.

*   **Sarapan:** Oatmeal besar dengan selai kacang, pisang, dan susu full cream.
*   **Camilan Pagi:** Segenggam kacang almond atau protein shake.
*   **Makan Siang:** Nasi merah porsi besar, dada ayam panggang, dan alpukat.
*   **Camilan Sore:** Roti gandum dengan telur rebus.
*   **Makan Malam:** Pasta gandum dengan daging sapi cincang dan sayuran hijau.
*   **Sebelum Tidur:** Greek yogurt dengan madu.
    `,
    workoutSchedule: `
### Jadwal Olahraga (Ectomorph)
Fokus pada latihan beban berat untuk merangsang pertumbuhan otot. Bisa dilakukan di rumah dengan beban tubuh atau peralatan minimal.

*   **Senin:** Dada & Triceps (Push-ups, Chair Dips).
*   **Selasa:** Istirahat.
*   **Rabu:** Punggung & Biceps (Doorframe Rows, Pull-ups jika ada).
*   **Kamis:** Istirahat.
*   **Jumat:** Kaki & Bahu (Bodyweight Squats, Lunges, Pike Push-ups).
*   **Sabtu/Minggu:** Istirahat atau aktivitas ringan (jalan santai).

### Tips Olahraga di Rumah:
1. Gunakan botol air besar sebagai pengganti dumbbell.
2. Fokus pada tempo lambat (time under tension) untuk merangsang otot.
3. Pastikan form gerakan benar sebelum menambah beban.
    `,
    homeWorkout: `
### Saran Olahraga di Rumah (Ectomorph)
*   **Push-ups:** 4 set x 12-15 repetisi (Dada & Trisep).
*   **Bodyweight Squats:** 4 set x 20 repetisi (Kaki).
*   **Dips di Kursi:** 3 set x 12 repetisi (Trisep).
*   **Plank:** 3 set x 60 detik (Core).
*   **Bulgarian Split Squats:** 3 set x 12 repetisi per kaki.
    `,
    lifestyleTips: [
      'Makan lebih sering (5-6 kali sehari).',
      'Kurangi kardio berlebihan agar tidak membakar terlalu banyak kalori.',
      'Pastikan tidur minimal 8 jam untuk pemulihan maksimal.',
      'Gunakan suplemen penambah berat badan jika sulit memenuhi kebutuhan kalori.'
    ]
  },
  mesomorph: {
    title: 'Mesomorph',
    description: 'Tipe tubuh atletis alami, mudah membangun otot dan membakar lemak secara efisien.',
    macros: { carbs: 40, protein: 30, fat: 30 },
    mealPlan: `
### Rencana Makan Harian (Mesomorph)
Fokus pada keseimbangan makronutrisi untuk menjaga massa otot dan energi.

*   **Sarapan:** Telur dadar (3 butir), bayam, dan ubi jalar rebus.
*   **Camilan Pagi:** Buah apel dan keju cottage.
*   **Makan Siang:** Salad quinoa dengan salmon panggang dan minyak zaitun.
*   **Camilan Sore:** Protein bar atau smoothie buah.
*   **Makan Malam:** Steak tanpa lemak, brokoli kukus, dan sedikit nasi merah.
*   **Sebelum Tidur:** Segelas susu rendah lemak.
    `,
    workoutSchedule: `
### Jadwal Olahraga (Mesomorph)
Kombinasi latihan kekuatan dan kardio untuk performa optimal. Sangat efektif dilakukan di rumah.

*   **Senin:** Latihan Kekuatan Seluruh Tubuh (Push-ups, Squats, Lunges).
*   **Selasa:** HIIT (Burpees, Mountain Climbers, Jumping Jacks) 20-30 menit.
*   **Rabu:** Latihan Kekuatan (Fokus Otot Atas - Pike Push-ups, Plank).
*   **Kamis:** Istirahat Aktif (Jalan cepat atau Yoga).
*   **Jumat:** Latihan Kekuatan (Fokus Otot Bawah - Bulgarian Split Squats).
*   **Sabtu:** Kardio LISS (Jalan santai atau bersepeda statis).
*   **Minggu:** Istirahat Total.

### Tips Olahraga di Rumah:
1. Gunakan kursi stabil untuk latihan step-up atau dips.
2. Manfaatkan tas ransel berisi buku sebagai beban tambahan.
    `,
    homeWorkout: `
### Saran Olahraga di Rumah (Mesomorph)
*   **Burpees:** 3 set x 15 repetisi (Kardio & Kekuatan).
*   **Lunges:** 3 set x 15 repetisi per kaki (Kaki).
*   **Mountain Climbers:** 3 set x 30 detik (Core & Kardio).
*   **Diamond Push-ups:** 3 set x 10 repetisi (Trisep & Dada).
*   **Superman:** 3 set x 15 repetisi (Punggung Bawah).
    `,
    lifestyleTips: [
      'Variasikan intensitas latihan agar tubuh tidak stagnan.',
      'Pantau asupan kalori agar tidak berlebihan meski mudah membakar lemak.',
      'Fokus pada kualitas makanan (whole foods).',
      'Tetap terhidrasi dengan minum minimal 3 liter air sehari.'
    ]
  },
  endomorph: {
    title: 'Endomorph',
    description: 'Tipe tubuh yang cenderung bulat, memiliki metabolisme lambat, dan mudah menyimpan lemak.',
    macros: { carbs: 25, protein: 35, fat: 40 },
    mealPlan: `
### Rencana Makan Harian (Endomorph)
Fokus pada diet rendah karbohidrat dan tinggi protein untuk mengontrol insulin.

*   **Sarapan:** Telur rebus (2 butir) dan setengah alpukat (tanpa nasi/roti).
*   **Camilan Pagi:** Segenggam biji labu atau kuaci.
*   **Makan Siang:** Dada ayam bakar dengan banyak sayuran hijau dan sedikit kacang-kacangan.
*   **Camilan Sore:** Greek yogurt tanpa rasa dengan sedikit beri.
*   **Makan Malam:** Ikan panggang (kakap/tuna) dengan asparagus dan salad zaitun.
*   **Sebelum Tidur:** Teh hijau (tanpa gula).
    `,
    workoutSchedule: `
### Jadwal Olahraga (Endomorph)
Fokus pada pembakaran kalori maksimal dan peningkatan metabolisme. Latihan sirkuit sangat cocok untuk di rumah.

*   **Senin:** Latihan Sirkuit (Push-ups -> Squats -> Lunges -> Plank, tanpa istirahat).
*   **Selasa:** Kardio Intensitas Tinggi (HIIT - Burpees, High Knees) 30 menit.
*   **Rabu:** Latihan Beban (Repetisi Tinggi, 15-20 repetisi bodyweight).
*   **Kamis:** Kardio LISS (Jalan cepat di sekitar rumah 45-60 menit).
*   **Jumat:** Latihan Beban (Fokus Compound - Squat to Overhead reach).
*   **Sabtu:** Aktivitas Luar Ruangan atau HIIT tambahan.
*   **Minggu:** Istirahat Aktif.

### Tips Olahraga di Rumah:
1. Jaga waktu istirahat tetap singkat (30 detik) untuk menjaga detak jantung.
2. Gunakan tangga jika ada untuk latihan kardio tambahan.
    `,
    homeWorkout: `
### Saran Olahraga di Rumah (Endomorph)
*   **Jumping Jacks:** 4 set x 50 repetisi (Pembakaran Kalori).
*   **High Knees:** 4 set x 40 detik (Kardio Intens).
*   **Plank to Push-up:** 3 set x 12 repetisi (Kekuatan Seluruh Tubuh).
*   **Glute Bridges:** 3 set x 20 repetisi (Bokong & Paha Belakang).
*   **Bicycle Crunches:** 3 set x 20 repetisi per sisi (Otot Perut).
    `,
    lifestyleTips: [
      'Kurangi asupan gula dan karbohidrat olahan secara drastis.',
      'Tingkatkan NEAT (aktivitas harian non-olahraga) seperti naik tangga.',
      'Makan dalam jendela waktu tertentu (Intermittent Fasting bisa sangat efektif).',
      'Fokus pada serat untuk rasa kenyang lebih lama.'
    ]
  }
};
