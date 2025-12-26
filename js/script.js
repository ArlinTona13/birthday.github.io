// Variabel untuk audio
let backgroundMusic;
let isMusicPlaying = false;

// Setup audio
function setupAudio() {
  backgroundMusic = document.getElementById('background-music');
  
  if (backgroundMusic) {
    backgroundMusic.volume = 0.3;
    backgroundMusic.loop = true;
    
    // Coba mainkan musik dengan interaksi pengguna
    document.addEventListener('click', startMusicOnInteraction, { once: true });
  }
}

// Fungsi untuk memulai musik setelah interaksi pengguna
function startMusicOnInteraction() {
  if (backgroundMusic && !isMusicPlaying) {
    backgroundMusic.play()
      .then(() => {
        isMusicPlaying = true;
        console.log("Musik Jamrud mulai diputar");
      })
      .catch(error => {
        console.log("Tidak bisa memutar musik:", error);
      });
  }
}

// Play click sound effect
function playClickSound() {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800 + Math.random() * 200;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1);
  } catch (e) {
    console.log("Sound effect tidak tersedia");
  }
}

// Navigasi antar halaman
function goTo(sectionId) {
  // Play click sound
  playClickSound();
  
  // Sembunyikan semua halaman
  document.querySelectorAll('.section').forEach(section => {
    section.classList.remove('active');
  });
  
  // Tampilkan halaman tujuan
  document.getElementById(sectionId).classList.add('active');
  
  // Mulai musik jika belum dimulai
  if (!isMusicPlaying && backgroundMusic) {
    backgroundMusic.play()
      .then(() => {
        isMusicPlaying = true;
      })
      .catch(error => {
        console.log("Autoplay diblokir, perlu interaksi pengguna");
      });
  }
  
  // Efek khusus untuk halaman final
  if (sectionId === 'final') {
    // Tambahkan efek konfeti
    createExtraConfetti();
    
    // Tambahkan hati yang melayang
    createFloatingHearts();
    
    // Naikkan volume musik sedikit di halaman final
    if (backgroundMusic) {
      backgroundMusic.volume = 0.4;
    }
  } else {
    // Kembalikan volume normal di halaman lain
    if (backgroundMusic) {
      backgroundMusic.volume = 0.3;
    }
  }
  
  // Scroll ke atas
  window.scrollTo(0, 0);
}

// Fungsi untuk tombol "Masih ragu"
function shakeButton(button) {
  // Play sound effect
  playClickSound();
  
  // Tambahkan animasi goyang
  button.style.animation = 'shake 0.5s';
  
  // Ubah teks sementara
  const originalText = button.innerHTML;
  button.innerHTML = '<i class="fas fa-smile-beam"></i> Oke deh, lanjut!';
  button.classList.remove('secondary');
  button.classList.add('primary');
  
  // Reset setelah animasi
  setTimeout(() => {
    button.style.animation = '';
    
    // Navigasi ke gallery setelah jeda
    setTimeout(() => {
      goTo('gallery');
    }, 500);
  }, 500);
}

// Fungsi untuk tombol "Tunggu dulu"
function playTrick() {
  // Play sound effect lucu
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Efek suara turun
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.5);
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.5);
  } catch (e) {
    console.log("Tidak bisa memainkan sound effect");
  }
  
  // Ambil tombol "Ya"
  const yesButton = document.querySelector('.welcome-actions .btn.primary');
  
  // Buat tombol bergetar
  yesButton.style.animation = 'bounce 0.5s 3';
  
  // Ubah teks sementara
  const originalText = yesButton.innerHTML;
  yesButton.innerHTML = '<i class="fas fa-heart"></i> Tekan aku lagi!';
  
  // Tampilkan pesan lucu
  const hint = document.querySelector('.hint');
  hint.innerHTML = '<i class="fas fa-grin-tongue"></i> Ah, kamu pasti mau membukanya! Tekan tombol pink itu!';
  hint.style.color = '#ff0066';
  hint.style.fontWeight = 'bold';
  
  // Reset setelah animasi
  setTimeout(() => {
    yesButton.style.animation = '';
    yesButton.innerHTML = originalText;
  }, 1500);
}

// Fungsi untuk membuat konfeti ekstra
function createExtraConfetti() {
  const container = document.querySelector('.background-elements');
  
  // Tambah lebih banyak konfeti
  for (let i = 0; i < 25; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    
    // Posisi acak
    confetti.style.left = Math.random() * 100 + '%';
    
    // Warna acak
    const colors = ['#ff66b2', '#ffcc00', '#66ff66', '#6699ff', '#cc66ff', '#ff9966'];
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    
    // Ukuran acak
    const size = Math.random() * 12 + 5;
    confetti.style.width = size + 'px';
    confetti.style.height = size + 'px';
    
    // Delay animasi acak
    confetti.style.animationDelay = Math.random() * 5 + 's';
    
    // Tambah ke container
    container.appendChild(confetti);
    
    // Hapus setelah animasi selesai
    setTimeout(() => {
      if (confetti.parentNode) {
        confetti.remove();
      }
    }, 5000);
  }
}

// Animasi hati melayang
function createFloatingHearts() {
  const container = document.querySelector('.background-elements');
  
  for (let i = 0; i < 15; i++) {
    setTimeout(() => {
      const heart = document.createElement('div');
      heart.innerHTML = '<i class="fas fa-heart"></i>';
      heart.style.position = 'absolute';
      heart.style.color = '#ff0066';
      heart.style.fontSize = Math.random() * 25 + 15 + 'px';
      heart.style.left = Math.random() * 100 + '%';
      heart.style.top = '100%';
      heart.style.opacity = '0.8';
      heart.style.zIndex = '1000';
      heart.style.pointerEvents = 'none';
      
      // Animasi melayang
      const duration = Math.random() * 15 + 10;
      heart.style.animation = `
        heartFloat ${duration}s linear forwards,
        heartPulse ${Math.random() * 1.5 + 0.5}s ease-in-out infinite
      `;
      
      container.appendChild(heart);
      
      // Hapus setelah animasi selesai
      setTimeout(() => {
        if (heart.parentNode) {
          heart.remove();
        }
      }, duration * 1000);
    }, i * 300);
  }
}

// Fungsi untuk tombol "Kirim Cinta"
function shareLove() {
  // Play sound effect hati
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Mainkan beberapa suara hati
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 600 + i * 100;
        oscillator.type = 'sine';
        
        const startTime = audioContext.currentTime;
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.2, startTime + 0.1);
        gainNode.gain.linearRampToValueAtTime(0, startTime + 0.2);
        
        oscillator.start(startTime);
        oscillator.stop(startTime + 0.3);
      }, i * 200);
    }
  } catch (e) {
    console.log("Tidak bisa memainkan sound effect hati");
  }
  
  // Buat efek ledakan hati
  const container = document.querySelector('.background-elements');
  
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      const heart = document.createElement('div');
      heart.innerHTML = '<i class="fas fa-heart"></i>';
      heart.style.position = 'absolute';
      heart.style.color = '#ff0066';
      heart.style.fontSize = Math.random() * 30 + 20 + 'px';
      
      // Posisi dari tengah
      const centerX = 50;
      const centerY = 50;
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 30 + 10;
      
      heart.style.left = (centerX + Math.cos(angle) * distance) + '%';
      heart.style.top = (centerY + Math.sin(angle) * distance) + '%';
      heart.style.opacity = '0.9';
      heart.style.zIndex = '1000';
      heart.style.pointerEvents = 'none';
      heart.style.transform = 'scale(0)';
      
      // Animasi meledak
      heart.style.animation = 'heartExplode 1s ease-out forwards';
      
      container.appendChild(heart);
      
      // Hapus setelah selesai
      setTimeout(() => {
        if (heart.parentNode) {
          heart.remove();
        }
      }, 3000);
    }, i * 50);
  }
  
  // Tampilkan pesan terima kasih
  setTimeout(() => {
    alert('Terima kasih telah berbagi Cerita! ❤️\nSemoga hari-harimu selalu dipenuhi kebahagiaan dan tawa!');
  }, 1000);
}

// Tambahkan animasi CSS untuk hati
function addHeartAnimations() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes heartFloat {
      0% {
        transform: translateY(0) rotate(0deg);
        opacity: 0.8;
      }
      100% {
        transform: translateY(-100vh) rotate(360deg);
        opacity: 0;
      }
    }
    
    @keyframes heartPulse {
      0%, 100% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.2);
      }
    }
    
    @keyframes heartExplode {
      0% {
        transform: scale(0);
      }
      70% {
        transform: scale(1.3);
      }
      100% {
        transform: scale(1);
      }
    }
  `;
  document.head.appendChild(style);
}

// Inisialisasi saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
  console.log('Halaman Ucapan Ulang Tahun dimuat!');
  
  // Setup audio
  setupAudio();
  
  // Tambah animasi hati
  addHeartAnimations();
  
  // Tambah event listener untuk semua tombol
  document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
      // Efek visual saat tombol diklik
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 150);
    });
  });
});

