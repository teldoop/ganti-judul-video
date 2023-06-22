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
  
  // Judul video
  var videoTitle = 'Video ini memiliki ' + videoViewsCount + ' views, ' + videoLikeCount + ' like, dan ' + videoCommentCount + ' komentar'; // ganti sesuai keinginan
  video.snippet.title = videoTitle;

  // Fungsi untuk mendapatkan statistik channel
  var channelUrl = "https://www.googleapis.com/youtube/v3/channels?part=statistics&id=" + channelId + "&key=" + apiKey;
  var channelResponse = UrlFetchApp.fetch(channelUrl);
  var channelData = JSON.parse(channelResponse.getContentText());
  var channelStatistics = channelData.items[0].statistics;
  
  // Penghitung subscriber
  var subscriber = channelStatistics.subscriberCount;

  // Penghitung waktu video diupload, jangan lupa tambahkan moment.js ke project kalian agar tidak ada error!
  var uploadDate = moment('2021-11-21'); // ganti 2021-11-21 sesuai tanggal video kalian diupload, ket: tahun-bulan-tanggal
  var currentDate = moment();
  var duration = moment.duration(currentDate.diff(uploadDate));
  var years = duration.years();
  var months = duration.months();
  var days = duration.days();
  
  // Deskripsi video
  var description = "Hi! Terimakasih telah membuat video ini menjadi ditonton sebanyak " + videoViewsCount + " kali, di like sebanyak " + videoLikeCount + " kali, dan dikomentari sebanyak " + videoCommentCount + " kali, walaupun videonya sudah lama, diuploadnya sudah " + years + " tahun, " + months + " bulan, dan " + days + " hari yang lalu (maaf kalau ga akurat), tepatnya pada tanggal 21 November 2021. Oh iya terima kasih juga telah mensubscribe channel ini sampai memiliki " + subscriber + " subscriber! Walaupun masih sedikit, ya gpp lah!\n\nDan kalau kalian mau subscribe sih gpp, tapi lebih baik gausah subscribe lah, soalnya kan channel ini jarang upload juga. Dan jangan lupa juga follow sosial media lain:\nIG: https://www.instagram.com/teldoop \nTikTok: https://www.tiktok.com/@teldoop\n\nKalau ada yang mau ditanyakan:\nEmail: admin@teldoop.my.id\nTanya Anonim: https://ngl.link/teldoop\nbisa juga DM IG atau tanya langsung di kolom komentar\n\nOke! Thanks for watching walaupun videonya cuma 5 detik😂";
  
  video.snippet.description = description;
  
  try {
    YouTube.Videos.update(video, part);
  } catch(e) {
    
  }
}