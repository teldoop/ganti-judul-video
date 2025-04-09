# ganti-judul-video-youtube
Script untuk mengganti judul dan deskripsi video youtube agar menyesuaikan dengan jumlah views, likes, komentar, subscriber, dan berapa tahun, bulan, dan hari yang lalu video diupload. 

Oke! begini caranya ☺

<h2> Step 1</h2>
Buka https://script.google.com/ 

<h2> Step 2</h2>
Klik tombol "Project Baru" atau "New Project" di sebelah kiri bagian atas

<h2> Step 3</h2>
Setelah loading selesai, pada panel sebelah kiri, klik tombol + di sebelah kanan tulisan "Layanan"

<h2> Step 4</h2>
Setelah popup muncul, scroll ke bawah pada daftar API sampai ketemu "YouTube Data API V3" lalu diklik

<h2> Step 5</h2>
Hapus script yang tersedia

```js
function myFunction() {
  
}
```
dan ganti dengan script yang ini:
```js
function updateTitleAndDescription() {
  var videoID = 'ID_VIDEO_KALIAN'; // ganti ID_VIDEO_KALIAN dangan ID video YouTube kalian! Contoh: t4q3GQZHvcg
  var channelId = "ID_CHANNEL_KALIAN"; // ganti ID_CHANNEL_KALIAN dengan ID channel YouTube kalian! Contoh: UCIbWCZyYUysTkDDNcV-Zqow
  var apiKey = "API_KEY_KALIAN"; // ganti API_KEY_KALIAN dengan API Key yg kalian dapat dari project google cloud console! Contoh: AIxxxxxxxxxxxxxxxxx-xxxxxxx_xxxxxxxxxxx
  var part = 'snippet,statistics';
  var params = {'id': videoID};
  
  // Penghitung statistik video
  var response = YouTube.Videos.list(part, params);
  var video = response.items[0];
  var videoViewsCount = video.statistics.viewCount;
  var videoLikeCount = video.statistics.likeCount;
  var videoCommentCount = video.statistics.commentCount;
  
  // ✅ Judul video, bisa kalian ganti sesuai keinginan
  var videoTitle = "Video ini memiliki " + videoViewsCount + " views, " + videoLikeCount + " like, dan " + videoCommentCount + " komentar"; // ganti sesuai keinginan
  video.snippet.title = videoTitle;

  // Fungsi untuk mendapatkan statistik channel
  var channelUrl = "https://www.googleapis.com/youtube/v3/channels?part=statistics&id=" + channelId + "&key=" + apiKey;
  var channelResponse = UrlFetchApp.fetch(channelUrl);
  var channelData = JSON.parse(channelResponse.getContentText());
  var channelStatistics = channelData.items[0].statistics;
  
  // Penghitung subscriber
  var subscriber = channelStatistics.subscriberCount;

  // Penghitung waktu video diupload, ⚠ jangan lupa tambahkan moment.js ke project kalian biar ga error!
  var uploadDate = moment('2021-11-21'); // ganti 2021-11-21 sesuai tanggal video kalian diupload, ket: tahun-bulan-tanggal
  var currentDate = moment();
  var duration = moment.duration(currentDate.diff(uploadDate));
  var years = duration.years();
  var months = duration.months();
  var days = duration.days();
  
  // ✅ Deskripsi video, bisa kalian ganti sesuai keinginan
  var description = "Hi! Terimakasih telah membuat video ini menjadi ditonton sebanyak " + videoViewsCount + " kali, di like sebanyak " + videoLikeCount + " kali, dan dikomentari sebanyak " + videoCommentCount + " kali, walaupun videonya sudah lama, diuploadnya sudah " + years + " tahun, " + months + " bulan, dan " + days + " hari yang lalu (maaf kalau ga akurat), tepatnya pada tanggal 21 November 2021. Oh iya terima kasih juga telah mensubscribe channel ini sampai memiliki " + subscriber + " subscriber! Walaupun masih sedikit, ya gpp lah!\n\nDan kalau kalian mau subscribe sih gpp, tapi lebih baik gausah subscribe lah, soalnya kan channel ini jarang upload juga. Dan jangan lupa juga follow sosial media lain:\nIG: https://www.instagram.com/teldoop \nTikTok: https://www.tiktok.com/@teldoop\n\nKalau ada yang mau ditanyakan:\nEmail: admin@teldoop.my.id\nTanya Anonim: https://ngl.link/teldoop\nbisa juga DM IG atau tanya langsung di kolom komentar\n\nOke! Thanks for watching walaupun videonya cuma 5 detik😂";
  
  video.snippet.description = description;
  
  try {
    YouTube.Videos.update(video, part);
  } catch(e) {
    
  }
}
```
### Keterangan:

`' + videoViewsCount + '` adalah penghitung jumlah views video<br>
`' + videoLikeCount + '` adalah penghitung jumlah like video<br>
`' + videoCommentCount + '` adalah penghitung jumlah komentar di video<br>
`' + subscriber + '` adalah penghitung subscriber channel<br>
`' + years + '` adalah penghitung berapa tahun lalu video diupload<br>
`' + months + '` adalah penghitung lebih berapa bulan lalu video diupload<br>
`' + days + '` adalah penghitung lebih berapa hari lalu video diupload<br>
`\n` adalah pindah baris (cuma buat deskripsi, bukan di judul)
### yg harus kalian ganti:

- `ID_VIDEO_KALIAN` <b>(pada baris kedua):</b> Ganti dengan ID Video YouTube kalian yang akan kalian ganti judul dan deskripsinya

  > misalnya url video adalah https://www.youtube.com/watch?v=t4q3GQZHvcg maka IDnya adalah <b>t4q3GQZHvcg</b>


- `ID_CHANNEL_KALIAN` <b>(pada baris ketiga):</b> Ganti dengan ID Channel YouTube kalian <b>(bukan @handle atau /c/customurl)</b> yang terdapat video yang akan kalian ganti judul dan deskripsinya
  > misalnya url channel adalah https://www.youtube.com/channel/UCIbWCZyYUysTkDDNcV-Zqow maka IDnya adalah <b>UCIbWCZyYUysTkDDNcV-Zqow</b>
  >
  > kalau kalian bingung, bisa menggunakan [cara ini](#cara-lain-untuk-mendapatkan-id-channel)


- `API_KEY_KALIAN` <b>(pada baris ke4):</b> Ganti dengan API key yang terdapat pada project google cloud console kalian<br><br>
- `2021-11-21` <b>(pada baris ke29):</b> Ganti dengan tanggal video kalian diupload
  > Format: <b>YYYY-MM-DD</b><br>
  > Contoh: <b>2025-11-23</b> atau <b>2025-04-09</b>

### Cara meng-custom judul video
  - Ubah dari tanda " pertama sampai tanda " terakhir pada baris ke 16 untuk meng-custom judul video sesuai keinginan.
  - Tambahkan salah satu atau beberapa penghitung. Daftar penghitung bisa dilihat di [keterangan](#keterangan)
  - Berikut adalah contoh script yg sdh berhasil:
  ```js
  var videoTitle = "Video ini memiliki " + videoViewsCount + " views, " + videoLikeCount + " like, dan " + videoCommentCount + " komentar";
  ```
  <br>
  Jika misalnya videonya memiliki 243 views, 4 likes, dan 6 komentar, maka, judul videonya akan menjadi seperti:<br><br>
  
  > <b>Video ini memiliki 243 views, 4 like, dan 6 komentar</b>

### Cara meng-custom deskripsi video
  - Ubah dari tanda " pertama sampai tanda " terakhir pada baris ke 37 untuk meng-custom deskripsi video sesuai keinginan.
  - Tambahkan salah satu atau beberapa penghitung. Daftar penghitung bisa dilihat di [keterangan](#keterangan)
  - Dan berikut adalah contoh script yg sdh berhasil:
  ```
  var description = "Video ini ditonton sebanyak " + videoViewsCount + " kali, di like sebanyak " + videoLikeCount + " kali, dikomentari sebanyak " + videoCommentCount + " kali, diupload " + years + " tahun, " + months + " bulan, dan " + days + " hari yang lalu.\n\nChannel ini memiliki " + subscriber + " subscriber."
  ```
  <br>
  Jika misalnya videonya memiliki 243 views, 4 likes, 6 komentar, dan channelnya memiliki 12 subscriber, dan videonya diupload pada 21 November 2021, dan hari ini adalah tanggal 23 Juni 2023, maka deskripsinya akan menjadi seperti:<br><br>
  
  > <b>Video ini ditonton sebanyak 243 kali, di like sebanyak 4 kali, dikomentari sebanyak 6 kali, diupload 1 tahun, 7 bulan, dan 0 hari yang lalu.<br><br>Channel ini memiliki 12 subscriber.</b>
  
  begitulah scriptnya,, "<br><br>
<h3>Cara lain untuk mendapatkan ID Channel</h3><br>
  
  >**Catatan:**
  >
  > ❗ Kalau tadi sudah dapat ID channelnya, skip langkah ini dan langsung ke [Cara mendapatkan API KEY](#cara-mendapatkan-api-key)
  >
  > ⚠ Kalau kalian menggunakan **HP📱**, jangan pake aplikasi YouTube.  
  > Pake **Google Chrome**, terus klik tombol titik tiga di bagian kanan atas ➜ nyalakan **"Situs desktop"** biar tampilannya kayak di laptop/PC.
  
  - Buka https://www.youtube.com/
  - Klik pp youtube kalian di kanan atas
  - Scroll ke bawah (jika perlu) sampai ketemu "Setelan" lalu diklik
  - di panel sebelah kiri, klik "Setelan lanjutan" yg berada di paling bawah di antara menu-menu lainnya
  - Disitu, kalian langsung bisa melihat ID Channel YouTube kalian, ID Channel terletak di bawah ID pengguna dan di atas "Channel default, atau ID pengguna, tapi di awalannya ditambahkan
  - Di bagian ID channel, klik tombol "Salin" yg berwarna biru

### Cara mendapatkan API Key:
  
  - Buka https://console.cloud.google.com/
  - Klik "Select a project" di samping kanan logo google cloud pada bagian kiri atas
  - Klik "NEW PROJECT" di bagian kanan atas popup
  - Namai project kalian sesuai keinginan, Misalnya: ganti judul video
  - Klik "CREATE"
  - Di panel sebelah kiri, klik "APIs & Services"
  - Lalu klik "Enabled APIs & Services"
  - Klik tombol "+ ENABLE APIS AND SERVICES" di bawah kolom pencarian
  - Scroll ke bawah sampai menemukan "YouTube Data API V3" lalu diklik
  - Klik tombol "ENABLE" yg berwarna biru lalu tunggu loading
  - Lalu klik "Credentials" pada panel sebelah kiri
  - Di bawah kolom pencarian, klik "+ CREATE CREDENTIALS"
  - Pilih API Key
  - Tunggu Loading sampai muncul popup "API key created"
  - Copykan API keynya (yang ada di kolom "Your API key")
  - Klik "Close"
  - Pada bagian API Keys, kan ada tuh API key yg sdh kalian buat tadi, tinggal dekatkan cursor ke API key yg kalian buat tadi, habis itu muncul tombol titik tiga di bawah tulisan "Actions", itu kalian klik, habis itu klik "Edit API Key"
  - Scroll sampai bawah (jika perlu) sampai kalian ketemu bagian "API restrictions"
  - Disitu ada 2 opsi, secara default, opsi ini diatur ke "Don't restrict key" tapi, supaya API Key nya berfungsi di scriptnya, kalian pilih "Restrict Key"
  - Kemudian dibawahnya akan muncul menu dropdown, silahkan kalian scroll sampai bawah sampai ketemu "YouTube Data API V3" lalu diklik, lalu klik tombol OK
  - Klik tombol "SAVE" yg berwarna biru di paling bawah
  - dah,, itu aja ☺

<h2> Step 6</h2>
Tambahkan file dengan mengklik tombol + di sebelah kanan tulisan "File" pada panel sebelah kiri.
kemudian beri nama file tersebut, misalnya: moment.gs

<h2> Step 7</h2>
Buka https://momentjs.com/

<h2> Step 8</h2>
Cari tulisan "Download" dan dibawah tulisan "Download", klik tombol "moment.js"

<h2> Step 9</h2>
Copy semua script yg ada di laman tersebut, lalu pastekan di file kedua yg kalian buat di Google Apps Script, (yg di atas diberi nama moment.gs) lalu tekan Ctrl + S pada keyboard

<h2> Step 10</h2>
Pada panel di sebelah kiri, kembali ke file pertama yg dibuat secara otomatis saat kalian buat project

<h2> Step 11</h2>
Klik tombol "Jalankan"

<h2> Step 12</h2>
Jika muncul popup, klik tombol "Berikan Akses"

<h2> Step 13</h2>
Pilih akun google yg sama seperti email akun youtube yg videonya akan kalian ubah judulnya, email akun google apps script saat ini dengan email akun YouTube harus sama agar tidak terjadi error

<h2> Step 14</h2>
jika terdapat pesan pada log eksekusi "Peringatan	Eksekusi selesai", Judul videonya berhasil diubah

<h2> Step 15</h2>
Agar judul dan deskripsi videonya berubah secara otomatis, arahkan kursor ke bagian paling kiri, lalu klik "Pemicu"

<h2> Step 16</h2>
Pada bagian kanan bawah, klik tombol "+ Tambahkan Pemicu" yg berwarna biru

<h2> Step 17</h2>
Scroll ke bawah (jika perlu), lalu di bagian "Pilih jenis pemicu berdasarkan waktu" pilih sesuai keinginan

<h2> Step 18</h2>
misalnya jika memilih "Timer menit" pada bagian di atasnya, di bagian "Pilih interval menit", pilih sesuai keinginan, misalnya "setiap 10 menit"

<h2> Step 19</h2>
Lalu klik simpan, dan judul video kalian akan berubah sesuai yang kalian tentukan
<br><br>
Semoga bermanfaat ☺, dan maaf kalau ada typo
