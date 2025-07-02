const music = document.getElementById("bg-music");
      if (music && music.paused) {
        music.play().catch(() => {
          console.log("Müzik başlatılamadı (kullanıcı etkileşimi gerekebilir).");
        });
      }