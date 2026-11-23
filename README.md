# Stock videos (4K, loop, orisinal)

Enam belas video 3840x2160, 16:9, 30 fps, 20 detik, loop mulus, tanpa teks/logo:

| Scene | Konsep |
|---|---|
| `silk` | Garis aliran seperti sutra/tinta |
| `terrain` | Lanskap titik bergelombang 3D |
| `aurora` | Gradien cair + bokeh + grain halus |
| `hex` | Kisi heksagon dengan gelombang cahaya |
| `ridges` | Garis gelombang berlapis ala punggung bukit |
| `growth` | Grafik batang naik + garis tren bercahaya (bisnis, keuangan) |
| `dash` | Kartu dasbor analitik melayang (bisnis, data) |
| `logistics` | Kotak paket di ban berjalan isometrik (logistik, rantai pasok) |
| `gears` | Roda gigi saling mengait (otomasi, alur kerja) |
| `roadmap` | Peta jalan strategi dengan tonggak menyala (perencanaan) |
| `turbines` | Turbin angin di lanskap senja (energi terbarukan) |
| `qubit` | Bola Bloch kuantum, vektor keadaan berpresesi |
| `bloom` | Mekar rasio emas (phyllotaxis) |
| `cells` | Sel mikroskopis membelah (simulasi reaksi-difusi) |
| `topo` | Peta topografi kontur mengalir |
| `car` | Mobil 3D hitam generik (tanpa merek), kamera sinematik belakang → samping → depan, melaju kencang lalu melambat |

## Cara render (GitHub Actions)
1. Unggah isi folder ini ke repo GitHub (termasuk folder `.github`).
2. Buka tab **Actions** → **Render videos** → **Run workflow**. Pilih `scene`: `bisnis` (5 video bisnis: growth, dash, logistics, gears, roadmap), `niche` (5 video niche: turbines, qubit, bloom, cells, topo), `car`, `all`, atau satu scene saja.
3. Centang `preview` dulu untuk tes cepat (1080p, 4 detik). Hapus centang untuk render 4K penuh.
4. Setelah selesai, buka **Releases** di halaman utama repo. Video MP4 ada di bagian **Assets** (batas 2 GB per file, tidak memakai kuota artifact). Jangan commit MP4 ke git.

Render 4K lewat CPU lambat (puluhan menit per video, scene `car` paling lama). Video jalan paralel.

## Scene `car`
WebGL2 murni (tanpa library), digambar frame demi frame. Koreografi memakai waktu ternormalisasi, jadi berapa pun durasinya urutan gerak tetap utuh: kamera dari belakang ke samping lalu depan, mobil melaju kencang lalu melambat (roda, pantulan lampu, tiang, dan garis jalan ikut melambat, hidung mobil sedikit menunduk saat pengereman). Atur di `scenes/car.js`: `VMAX` (kecepatan), `camA/camR/camH/camF` (sudut, jarak, tinggi, FOV kamera), `speedK` (profil kecepatan).

## Cek sebelum unggah ke Adobe Stock
- Resolusi 3840x2160, MP4/H.264, fps standar, durasi 5-60 detik: cek dengan `ffprobe`.
- Frame pada detik ke-5 dipakai sebagai gambar preview, pastikan tampilannya bagus.
- Label "Created using generative AI tools" di Contributor Portal bila berlaku (kode dibuat dengan bantuan AI). Cek ketentuan terbaru Adobe.
- Tanpa teks, logo, atau watermark. Judul dan kata kunci harus menggambarkan isi (abstract, loop, background, 4K).

## Lokal (opsional)
`npm install && npx playwright install chromium`, lalu `node render.js --scene silk`. Butuh `ffmpeg` terpasang.
