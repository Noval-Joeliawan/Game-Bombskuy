// ===== KONSTANTA MAP =====
const ROWS = 9;
const COLS = 15;
const EMPTY = 0;
const WALL = 1;
const BRICK = 2;

const TILE_SIZE = 48;
const MAX_BOMBS = 2;
const BOMB_RADIUS = 2;
const BOMB_TIMER = 2500;
const ENEMY_SPEED = 750;

// ===== ELEMEN DOM =====
const board = document.getElementById("gameBoard");
const welcomeScreen = document.getElementById("welcomeScreen");
const gameScreen = document.getElementById("gameScreen");
const gameOverScreen = document.getElementById("gameOverScreen");
const winScreen = document.getElementById("winScreen");

const nameText = document.getElementById("nameText");
const livesText = document.getElementById("livesText");
const scoreText = document.getElementById("scoreText");
const timerText = document.getElementById("timerText");
const bombsText = document.getElementById("bombsText");
const enemiesText = document.getElementById("enemiesText");

// ===== SOUND EFFECT =====
const sfxBomb = document.getElementById("sfxBomb");
const sfxExplode = document.getElementById("sfxExplode");
const sfxPickup = document.getElementById("sfxPickup");
const sfxWin = document.getElementById("sfxWin");
const sfxLose = document.getElementById("sfxLose");
const sfxStep = document.getElementById("sfxStep");
const sfxHurt = document.getElementById("sfxHurt");
const bgMusic = document.getElementById("bgMusic");
const sfxCountdown = document.getElementById("sfxCountdown");

function playSound(sound) {
  if (!sound) return;
  sound.currentTime = 0;
  sound.play();
}

// ===== SOAL DATABASE (LENGKAP - Jawaban Acak) =====
const questionBank = {
  pkn: [
    { q: "Dasar negara Indonesia adalah?", options: ["UUD", "Pancasila", "Garuda"], correct: "B" }, // B benar
    { q: "Lambang negara Indonesia adalah?", options: ["Garuda Pancasila", "Burung Elang", "Rajawali"], correct: "A" }, // A benar
    { q: "Sila pertama Pancasila berbunyi?", options: ["Keadilan Sosial", "Ketuhanan Yang Maha Esa", "Persatuan Indonesia"], correct: "B" }, // B benar
    { q: "Jumlah sila dalam Pancasila adalah?", options: ["6", "5", "4"], correct: "B" },
    { q: "Bhinneka Tunggal Ika berarti?", options: ["Indonesia Raya", "Berbeda-beda tetapi tetap satu", "Bersatu Kita Teguh"], correct: "B" },
    { q: "UUD merupakan singkatan dari?", options: ["Undang-Undang Desa", "Unit Usaha Daerah", "Undang-Undang Dasar"], correct: "C" },
    { q: "Warna bendera Indonesia adalah?", options: ["Putih Hijau", "Merah Putih", "Merah Biru"], correct: "B" },
    { q: "Musyawarah bertujuan untuk mencapai?", options: ["Hukuman", "Kesepakatan bersama", "Pertengkaran"], correct: "B" },
    { q: "Hak adalah sesuatu yang?", options: ["Harus dibeli", "Harus dijual", "Harus diterima"], correct: "C" },
    { q: "Kewajiban adalah sesuatu yang?", options: ["Harus dibayar", "Harus dilakukan", "Harus diminta"], correct: "B" },
    { q: "Sila ketiga Pancasila adalah?", options: ["Keadilan Sosial", "Persatuan Indonesia", "Kerakyatan Indonesia"], correct: "C" },
    { q: "Lagu kebangsaan Indonesia adalah?", options: ["Garuda Pancasila", "Indonesia Raya", "Hari Merdeka"], correct: "B" },
    { q: "Pemilu digunakan untuk memilih?", options: ["Guru", "Tetangga", "Pemimpin"], correct: "C" },
    { q: "Garuda Pancasila memiliki semboyan?", options: ["Tut Wuri Handayani", "Jalesveva Jayamahe", "Bhinneka Tunggal Ika"], correct: "C" },
    { q: "Sila kelima berbunyi?", options: ["Ketuhanan Yang Maha Esa", "Persatuan Indonesia", "Keadilan Sosial bagi Seluruh Rakyat Indonesia"], correct: "C" },
  ],
  sejarah: [
    { q: "Siapa presiden pertama Indonesia?", options: ["Habibie", "Soekarno", "Soeharto"], correct: "B" },
    { q: "Kapan Indonesia merdeka?", options: ["20 Mei 1908", "17 Agustus 1945", "18 Agustus 1945"], correct: "B" },
    { q: "Siapa wakil presiden pertama Indonesia?", options: ["Sutan Sjahrir", "Mohammad Hatta", "Soekarno"], correct: "B" },
    { q: "Pembacaan Proklamasi dilakukan di kota?", options: ["Jakarta", "Bandung", "Surabaya"], correct: "A" },
    { q: "Bapak Pendidikan Nasional adalah?", options: ["Cut Nyak Dien", "Diponegoro", "Ki Hajar Dewantara"], correct: "C" },
    { q: "Hari Kebangkitan Nasional diperingati setiap tanggal?", options: ["17 Agustus", "10 November", "20 Mei"], correct: "C" },
    { q: "Budi Utomo berdiri pada tahun?", options: ["1945", "1908", "1928"], correct: "B" },
    { q: "Sumpah Pemuda terjadi pada tahun?", options: ["1908", "1945", "1928"], correct: "C" },
    { q: "Pencipta lagu Indonesia Raya adalah?", options: ["Gesang", "Ismail Marzuki", "W.R. Supratman"], correct: "C" },
    { q: "Hari Pahlawan diperingati setiap tanggal?", options: ["10 November", "17 Agustus", "20 Mei"], correct: "A" },
    { q: "Kerajaan Majapahit berada di wilayah?", options: ["Kalimantan", "Sumatera", "Jawa Timur"], correct: "C" },
    { q: "Kerajaan Sriwijaya terkenal sebagai kerajaan?", options: ["Industri", "Pertanian", "Maritim"], correct: "C" },
    { q: "Siapa yang mengetik naskah Proklamasi?", options: ["Ahmad Soebardjo", "Fatmawati", "Sayuti Melik"], correct: "C" },
    { q: "Fatmawati dikenal sebagai penjahit?", options: ["Lambang Garuda", "Seragam Tentara", "Bendera Merah Putih"], correct: "C" },
    { q: "Peristiwa Rengasdengklok terjadi sebelum?", options: ["Pertempuran Surabaya", "Proklamasi Kemerdekaan", "Sumpah Pemuda"], correct: "B" },
  ],
  agama: [
    { q: "Kitab suci umat Islam adalah?", options: ["Weda", "Injil", "Al-Qur'an"], correct: "C" },
    { q: "Nabi terakhir adalah?", options: ["Nabi Musa", "Nabi Muhammad SAW", "Nabi Isa"], correct: "B" },
    { q: "Jumlah rukun Islam ada?", options: ["4", "6", "5"], correct: "C" },
    { q: "Shalat wajib sehari semalam berjumlah?", options: ["5", "3", "7"], correct: "A" },
    { q: "Puasa wajib dilakukan pada bulan?", options: ["Ramadan", "Muharram", "Syawal"], correct: "A" },
    { q: "Tempat ibadah umat Islam adalah?", options: ["Gereja", "Pura", "Masjid"], correct: "C" },
    { q: "Zakat termasuk rukun Islam ke?", options: ["3", "5", "4"], correct: "C" },
    { q: "Malaikat penyampai wahyu adalah?", options: ["Mikail", "Jibril", "Israfil"], correct: "B" },
    { q: "Nabi Muhammad lahir di kota?", options: ["Thaif", "Madinah", "Mekah"], correct: "C" },
    { q: "Hari raya setelah Ramadan adalah?", options: ["Natal", "Idul Fitri", "Nyepi"], correct: "B" },
    { q: "Bacaan basmalah adalah?", options: ["Astaghfirullah", "Alhambra", "Bismillahirrahmanirrahim"], correct: "C" },
    { q: "Orang tua wajib kita?", options: ["Abaikan", "Lawan", "Hormati"], correct: "C" },
    { q: "Sedekah merupakan perbuatan?", options: ["Tercela", "Terpuji", "Dilarang"], correct: "B" },
    { q: "Lawan kata jujur adalah?", options: ["Benar", "Bohong", "Amanah"], correct: "B" },
    { q: "Rukun Islam pertama adalah?", options: ["Zakat", "Puasa", "Syahadat"], correct: "C" },
  ]
};
// ===== STATE GAME =====
let map = [];
let bombs = [];
let bombTimeouts = [];
let explosions = [];
let powerUps = [];
let questionItems = [];
let player = {};
let enemies = [];

let steps = 0;
let score = 0;
let lives = 3;
let timerSeconds = 0;
let totalKills = 0;
let playerName = "Player";
let selectedSubject = "";

let gameInterval = null;
let enemyInterval = null;
let isRespawning = false;
let isGameActive = false;

let currentQuestion = null;
let questionTimer = null;
let questionTimeLeft = 15;
let isQuestionActive = false;

// ===== PARTIKEL LATAR BELAKANG =====
(function createParticles() {
  const container = document.getElementById("particles");
  for (let i = 0; i < 30; i++) {
    const p = document.createElement("div");
    p.classList.add("particle");
    p.style.left = Math.random() * 100 + "vw";
    p.style.animationDuration = 6 + Math.random() * 10 + "s";
    p.style.animationDelay = Math.random() * 10 + "s";
    p.style.width = 1 + Math.random() * 3 + "px";
    p.style.height = p.style.width;
    p.style.background =
      Math.random() > 0.5 ? "rgba(255,107,0,0.6)" : "rgba(0,200,255,0.5)";
    container.appendChild(p);
  }
})();

// ===== EVENT: TOMBOL MULAI =====
document.getElementById("startBtn").addEventListener("click", startGame);

// ===== EVENT: PILIH MAPEL =====
document.querySelectorAll(".subject-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".subject-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    selectedSubject = btn.dataset.subject;
  });
});

// ===== EVENT: KEYBOARD =====
document.addEventListener("keydown", handleKeyDown);

function handleKeyDown(e) {
  if (isQuestionActive) return;

  if (welcomeScreen.classList.contains("active") && e.key === "Enter") {
    startGame();
    return;
  }

  if (!gameScreen.classList.contains("active") || !isGameActive || isRespawning)
    return;

  if (
    ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)
  ) {
    e.preventDefault();
  }

  let newX = player.x;
  let newY = player.y;

  if (e.key === "ArrowUp") newY--;
  if (e.key === "ArrowDown") newY++;
  if (e.key === "ArrowLeft") newX--;
  if (e.key === "ArrowRight") newX++;

  if (e.key === " ") {
    placeBomb(player.x, player.y);
    return;
  }

  if (
    map[newY] &&
    map[newY][newX] !== undefined &&
    map[newY][newX] === EMPTY &&
    !bombs.some((b) => b.x === newX && b.y === newY)
  ) {
    player.x = newX;
    player.y = newY;
    steps++;
    playSound(sfxStep);
    player.isWalking = true;
    setTimeout(() => {
      player.isWalking = false;
    }, 120);

    pickupPowerUp();
    pickupQuestionItem();
  }

  checkEnemyTouch();
  drawMap();
}

// ===== MULAI GAME DENGAN COUNTDOWN =====
function startGame() {
  const inputName = document.getElementById("playerName").value.trim();

  if (inputName === "") {
    alert("Masukkan nama terlebih dahulu!");
    return;
  }

  if (!selectedSubject) {
    alert("Pilih mata pelajaran terlebih dahulu!");
    return;
  }

  playerName = inputName;
  nameText.textContent = playerName;

  welcomeScreen.classList.remove("active");
  gameOverScreen.classList.remove("active");
  winScreen.classList.remove("active");

  jalankanCountdown();
}

// ===== FUNGSI COUNTDOWN =====
function jalankanCountdown() {
  const countdownOverlay = document.getElementById("countdownOverlay");
  const countdownNumber = document.getElementById("countdownNumber");

  countdownOverlay.classList.add("active");
  let count = 3;
  countdownNumber.textContent = count;
  playSound(sfxCountdown);

  const timer = setInterval(() => {
    count--;
    if (count > 0) {
      countdownNumber.textContent = count;
      playSound(sfxCountdown);
      countdownNumber.style.animation = "none";
      countdownNumber.offsetHeight;
      countdownNumber.style.animation =
        "countdownPulse 0.8s ease-in-out infinite";
    } else {
      clearInterval(timer);
      countdownOverlay.classList.remove("active");
      mulaiGameSebenarnya();
    }
  }, 1000);
}

// ===== GAME UTAMA =====
function mulaiGameSebenarnya() {
  score = 0;
  lives = 3;
  timerSeconds = 0;
  totalKills = 0;
  steps = 0;
  bombs = [];
  bombTimeouts = [];
  explosions = [];
  powerUps = [];
  questionItems = [];
  isRespawning = false;
  isGameActive = true;

  // Auto volume berdasarkan device
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  bgMusic.volume = isMobile ? 0.5 : 0.15;
  bgMusic.play();

  generateMap();
  player = { x: 1, y: 1 };

  enemies = [
    { x: 13, y: 7 },
    { x: 13, y: 1 },
    { x: 1, y: 7 },
    { x: 7, y: 4 },
  ];

  clearSafeZone(13, 7);
  clearSafeZone(13, 1);
  clearSafeZone(1, 7);

  gameScreen.classList.add("active");
  updateUI();
  drawMap();
  updateMobileControlsVisibility();

  clearInterval(gameInterval);
  clearInterval(enemyInterval);

  gameInterval = setInterval(() => {
    timerSeconds++;
    updateUI();
  }, 1000);

  enemyInterval = setInterval(moveEnemies, ENEMY_SPEED);

    // 🔧 FIX: Tampilkan mobile controls saat game mulai
  updateMobileControlsVisibility();
}

// ===== GENERATE MAP =====
function generateMap() {
  map = [];
  for (let y = 0; y < ROWS; y++) {
    const row = [];
    for (let x = 0; x < COLS; x++) {
      if (
        y === 0 ||
        x === 0 ||
        y === ROWS - 1 ||
        x === COLS - 1 ||
        (x % 2 === 0 && y % 2 === 0)
      ) {
        row.push(WALL);
      } else {
        row.push(Math.random() < 0.4 ? BRICK : EMPTY);
      }
    }
    map.push(row);
  }
  map[1][1] = EMPTY;
  map[1][2] = EMPTY;
  map[2][1] = EMPTY;
  map[1][3] = EMPTY;
  map[3][1] = EMPTY;
}

function clearSafeZone(cx, cy) {
  const offsets = [
    [0, 0],
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  offsets.forEach(([dx, dy]) => {
    const nx = cx + dx,
      ny = cy + dy;
    if (map[ny] && map[ny][nx] === BRICK) map[ny][nx] = EMPTY;
  });
}

// ===== RENDER MAP =====
function drawMap() {
  board.innerHTML = "";
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      const tile = document.createElement("div");
      tile.classList.add("tile");
      if (map[y][x] === WALL) tile.classList.add("wall");
      else if (map[y][x] === BRICK) tile.classList.add("brick");
      else tile.classList.add("empty");

      if (powerUps.some((p) => p.x === x && p.y === y))
        tile.classList.add("powerup");
      if (questionItems.some((q) => q.x === x && q.y === y))
        tile.classList.add("question-item");
      if (bombs.some((b) => b.x === x && b.y === y)) tile.classList.add("bomb");
      if (explosions.some((e) => e.x === x && e.y === y))
        tile.classList.add("explosion");
      if (enemies.some((e) => e.x === x && e.y === y))
        tile.classList.add("enemy");
      if (player.x === x && player.y === y) {
        tile.classList.add("player");
        if (isRespawning) {
          tile.classList.add("respawning");
          if (Math.floor(Date.now() / 120) % 2 === 0)
            tile.style.opacity = "0.2";
        }
        if (player.isWalking) tile.classList.add("walking");
      }
      board.appendChild(tile);
    }
  }
}

// ===== UPDATE HUD =====
function updateUI() {
  scoreText.textContent = score;
  livesText.textContent = lives;
  timerText.textContent = timerSeconds + "s";
  bombsText.textContent = bombs.length + "/" + MAX_BOMBS;
  enemiesText.textContent = enemies.length;
}

// ===== TARUH BOM =====
function placeBomb(x, y) {
  if (bombs.length >= MAX_BOMBS) return;
  if (bombs.some((b) => b.x === x && b.y === y)) return;

  const bomb = {
    x,
    y,
    placedAt: Date.now(),
  };

  bomb.timeoutId = setTimeout(() => {
    bombs = bombs.filter((b) => b !== bomb);
    explodeBomb(x, y);
  }, BOMB_TIMER);

  bombs.push(bomb);
  playSound(sfxBomb);
  updateUI();
  drawMap();
}

// ===== LEDAKAN BOM =====
function explodeBomb(originX, originY) {
  const newExplosions = [];
  playSound(sfxExplode);

  newExplosions.push({ x: originX, y: originY });

  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  directions.forEach(([dx, dy]) => {
    for (let r = 1; r <= BOMB_RADIUS; r++) {
      const nx = originX + dx * r;
      const ny = originY + dy * r;

      if (ny < 0 || ny >= ROWS || nx < 0 || nx >= COLS) break;
      if (map[ny][nx] === WALL) break;

      newExplosions.push({ x: nx, y: ny });

      if (map[ny][nx] === BRICK) {
        map[ny][nx] = EMPTY;
        score += 10;

        // 30% chance drop item SOAL
        if (Math.random() < 0.3) {
          questionItems.push({ x: nx, y: ny });
        } else if (Math.random() < 0.4) {
          powerUps.push({ x: nx, y: ny });
        }
        break;
      }
    }
  });

  explosions = [...explosions, ...newExplosions];
  drawMap();

  if (newExplosions.some((e) => e.x === player.x && e.y === player.y))
    loseLife();

  enemies = enemies.filter((enemy) => {
    if (newExplosions.some((e) => e.x === enemy.x && e.y === enemy.y)) {
      score += 50;
      totalKills++;
      return false;
    }
    return true;
  });

  updateUI();

  setTimeout(() => {
    explosions = explosions.filter(
      (e) => !newExplosions.some((ne) => ne.x === e.x && ne.y === e.y),
    );
    drawMap();
    if (enemies.length === 0 && isGameActive) winGame();
  }, 500);
}

// ===== AMBIL POWERUP =====
function pickupPowerUp() {
  powerUps = powerUps.filter((item) => {
    if (item.x === player.x && item.y === player.y) {
      score += 10;
      playSound(sfxPickup);
      updateUI();
      return false;
    }
    return true;
  });
}

// ===== AMBIL ITEM SOAL =====
function pickupQuestionItem() {
  const itemIndex = questionItems.findIndex(
    (item) => item.x === player.x && item.y === player.y,
  );
  if (itemIndex !== -1) {
    questionItems.splice(itemIndex, 1);
    pauseAllBombs();
    showQuestion();
  }
}

// ===== PAUSE SEMUA BOM =====
function pauseAllBombs() {
  bombTimeouts = [];

  bombs.forEach((bomb) => {
    if (bomb.timeoutId) {
      clearTimeout(bomb.timeoutId);
    }
    const elapsed = Date.now() - bomb.placedAt;
    bombTimeouts.push({
      x: bomb.x,
      y: bomb.y,
      remaining: Math.max(100, BOMB_TIMER - elapsed),
    });
  });

  bombs = [];
  drawMap();
  updateUI();
}

// ===== TAMPILKAN SOAL (DENGAN PAUSE) =====
function showQuestion() {
  const questions = questionBank[selectedSubject];
  currentQuestion = questions[Math.floor(Math.random() * questions.length)];

  document.getElementById("questionText").textContent = currentQuestion.q;
  document.getElementById("optionA").textContent = currentQuestion.options[0];
  document.getElementById("optionB").textContent = currentQuestion.options[1];
  document.getElementById("optionC").textContent = currentQuestion.options[2];

  document.querySelectorAll(".option-btn").forEach((btn) => {
    btn.classList.remove("correct", "wrong");
    btn.disabled = false;
    btn.style.display = "flex";
  });

  document.getElementById("questionModal").classList.add("active");
  isQuestionActive = true;
  questionTimeLeft = 15;
  document.getElementById("questionTimer").textContent = questionTimeLeft;

  // PAUSE GAME
  clearInterval(enemyInterval);
  clearInterval(gameInterval);

  questionTimer = setInterval(() => {
    questionTimeLeft--;
    document.getElementById("questionTimer").textContent = questionTimeLeft;
    if (questionTimeLeft <= 0) submitAnswer("timeout");
  }, 1000);
}

// ===== KIRIM JAWABAN =====
function submitAnswer(selectedOption) {
  clearInterval(questionTimer);
  isQuestionActive = false;

  const correctAnswer = currentQuestion.correct;
  const allOptions = document.querySelectorAll(".option-btn");

  allOptions.forEach((btn) => {
    btn.disabled = true;
    if (btn.id === "btn" + correctAnswer) {
      btn.classList.add("correct");
    }
  });

  let isCorrect = String(selectedOption) === String(correctAnswer);

  if (selectedOption !== "timeout") {
    allOptions.forEach((btn) => {
      if (
        btn.id === "btn" + selectedOption &&
        !btn.classList.contains("correct")
      ) {
        btn.classList.add("wrong");
      }
    });
  }

  if (isCorrect) {
    score += 20;
    playSound(sfxPickup);
  } else {
    lives--;
    playSound(sfxHurt);
  }

  setTimeout(() => {
    document.getElementById("questionModal").classList.remove("active");
    updateUI();

    if (lives <= 0) {
      gameOver();
    } else {
      // LANJUT GAME + RESTART BOM
      isGameActive = true;
      enemyInterval = setInterval(moveEnemies, ENEMY_SPEED);
      gameInterval = setInterval(() => {
        timerSeconds++;
        updateUI();
      }, 1000);

      if (bombTimeouts.length > 0) {
        restartBombs();
      }
    }
  }, 2000);
}

// ===== RESTART BOM =====
function restartBombs() {
  bombTimeouts.forEach((bombInfo) => {
    const bomb = {
      x: bombInfo.x,
      y: bombInfo.y,
      placedAt: Date.now(),
    };

    bomb.timeoutId = setTimeout(() => {
      bombs = bombs.filter((b) => b !== bomb);
      explodeBomb(bombInfo.x, bombInfo.y);
    }, bombInfo.remaining);

    bombs.push(bomb);
  });

  bombTimeouts = [];
  drawMap();
  updateUI();
}

// ===== GERAK MUSUH =====
function moveEnemies() {
  if (!isGameActive) return;

  const directions = [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0],
  ];

  enemies.forEach((enemy) => {
    const shuffled = directions.slice().sort(() => Math.random() - 0.5);

    for (const [dx, dy] of shuffled) {
      const nx = enemy.x + dx;
      const ny = enemy.y + dy;

      if (
        map[ny] &&
        map[ny][nx] === EMPTY &&
        !bombs.some((b) => b.x === nx && b.y === ny) &&
        !enemies.some((e) => e !== enemy && e.x === nx && e.y === ny)
      ) {
        enemy.x = nx;
        enemy.y = ny;
        break;
      }
    }
  });

  checkEnemyTouch();
  drawMap();
}

// ===== CEK SENTUH MUSUH =====
function checkEnemyTouch() {
  if (isRespawning) return;
  if (enemies.some((e) => e.x === player.x && e.y === player.y)) loseLife();
}

// ===== HILANG NYAWA =====
function loseLife() {
  if (isRespawning) return;

  playSound(sfxHurt);
  lives--;

  // CLEAR BOM TIMEOUT
  bombs.forEach((bomb) => {
    if (bomb.timeoutId) clearTimeout(bomb.timeoutId);
  });
  bombs = [];
  explosions = [];
  updateUI();

  if (lives <= 0) {
    gameOver();
    return;
  }

  isRespawning = true;
  player.x = 1;
  player.y = 1;

  const blinkInterval = setInterval(() => drawMap(), 120);

  setTimeout(() => {
    clearInterval(blinkInterval);
    isRespawning = false;
    drawMap();
  }, 1500);
}

// ===== SIMPAN LEADERBOARD =====
function saveLeaderboard(name, finalScore) {
  let leaderboard =
    JSON.parse(localStorage.getItem("bombskuyLeaderboard")) || [];

  leaderboard.push({
    name: name,
    score: finalScore,
    time: timerSeconds,
    kills: totalKills,
    date: new Date().toLocaleDateString("id-ID"),
  });

  leaderboard.sort((a, b) => b.score - a.score);
  leaderboard = leaderboard.slice(0, 10);

  localStorage.setItem("bombskuyLeaderboard", JSON.stringify(leaderboard));
}

// ===== TAMPILKAN LEADERBOARD =====
function showLeaderboard() {
  const leaderboard =
    JSON.parse(localStorage.getItem("bombskuyLeaderboard")) || [];
  const container = document.getElementById("leaderboardList");

  if (leaderboard.length === 0) {
    container.innerHTML = '<p class="lb-empty">Belum ada skor</p>';
    return;
  }

  const medals = ["🥇", "🥈", "🥉"];
  const rankClasses = ["gold-rank", "silver-rank", "bronze-rank"];

  container.innerHTML = leaderboard
    .slice(0, 5)
    .map(
      (entry, i) => `
    <div class="lb-row">
      <span class="lb-rank ${rankClasses[i] || ""}">${medals[i] || i + 1}</span>
      <span class="lb-name">${escapeHtml(entry.name)}</span>
      <span class="lb-score">${entry.score}</span>
    </div>
  `,
    )
    .join("");
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// ===== GAME OVER =====
function gameOver() {
  if (!isGameActive) return;
  isGameActive = false;
  bgMusic.pause();
  bgMusic.currentTime = 0;
  playSound(sfxLose);

  clearInterval(gameInterval);
  clearInterval(enemyInterval);
  clearInterval(questionTimer);

  saveLeaderboard(playerName, score);

  document.getElementById("finalScore").textContent = score;
  document.getElementById("finalTime").textContent = timerSeconds + " detik";
  document.getElementById("finalKills").textContent = totalKills;

  gameScreen.classList.remove("active");
  gameOverScreen.classList.add("active");

    // 🔧 FIX: Sembunyikan mobile controls
  updateMobileControlsVisibility();
}

// ===== MENANG =====
function winGame() {
  if (!isGameActive) return;
  isGameActive = false;
  bgMusic.pause();
  bgMusic.currentTime = 0;
  playSound(sfxWin);

  clearInterval(gameInterval);
  clearInterval(enemyInterval);
  score += Math.max(0, 200 - steps);
  saveLeaderboard(playerName, score);

  document.getElementById("winScore").textContent = score;
  document.getElementById("winTime").textContent = timerSeconds + " detik";
  document.getElementById("winKills").textContent = totalKills;

  gameScreen.classList.remove("active");
  winScreen.classList.add("active");

    // 🔧 FIX: Sembunyikan mobile controls
  updateMobileControlsVisibility();
}

// ===== KEMBALI KE MENU =====
function backMenu() {
  gameOverScreen.classList.remove("active");
  winScreen.classList.remove("active");
  welcomeScreen.classList.add("active");

  isGameActive = false;
  clearInterval(gameInterval);
  clearInterval(enemyInterval);

  showLeaderboard();
    
  // 🔧 FIX: Sembunyikan mobile controls
  updateMobileControlsVisibility();
}

function restartGame() {
  gameOverScreen.classList.remove("active");
  winScreen.classList.remove("active");

  startGame();
}

// ===== EVENT LISTENER JAWABAN =====
document.querySelectorAll(".option-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    if (isQuestionActive && !this.disabled) {
      submitAnswer(this.dataset.option);
    }
  });
});

// ===== MOBILE JOYSTICK =====
const joystick = document.getElementById("joystick");
const stick = document.getElementById("stick");
const bombBtn = document.getElementById("bombBtn");

let moveInterval = null;
let currentDirection = null;

function movePlayerMobile(direction) {
  if (!isGameActive || isRespawning || isQuestionActive) return;

  let newX = player.x;
  let newY = player.y;

  if (direction === "up") newY--;
  if (direction === "down") newY++;
  if (direction === "left") newX--;
  if (direction === "right") newX++;

  if (
    map[newY] &&
    map[newY][newX] === EMPTY &&
    !bombs.some((b) => b.x === newX && b.y === newY)
  ) {
    player.x = newX;
    player.y = newY;
    steps++;
    playSound(sfxStep);
    pickupPowerUp();
    pickupQuestionItem();
    drawMap();
  }

  checkEnemyTouch();
}

joystick.addEventListener("touchmove", (e) => {
  e.preventDefault();

  const rect = joystick.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const touch = e.touches[0];
  const dx = touch.clientX - centerX;
  const dy = touch.clientY - centerY;

  const angle = Math.atan2(dy, dx);
  const distance = Math.min(Math.sqrt(dx * dx + dy * dy), 35);

  stick.style.left = 35 + Math.cos(angle) * distance + "px";
  stick.style.top = 35 + Math.sin(angle) * distance + "px";

  let direction;
  if (Math.abs(dx) > Math.abs(dy)) {
    direction = dx > 0 ? "right" : "left";
  } else {
    direction = dy > 0 ? "down" : "up";
  }

  if (direction !== currentDirection) {
    currentDirection = direction;
    clearInterval(moveInterval);
    movePlayerMobile(direction);
    moveInterval = setInterval(() => movePlayerMobile(direction), 150);
  }
});

joystick.addEventListener("touchend", () => {
  clearInterval(moveInterval);
  currentDirection = null;
  stick.style.left = "35px";
  stick.style.top = "35px";
});

bombBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  if (isGameActive && !isRespawning && !isQuestionActive) {
    placeBomb(player.x, player.y);
  }
});

// ===== INIT =====
showLeaderboard();
// Initialize dan visibility
const mobileControls = document.getElementById("mobileControls");

function updateMobileControlsVisibility() {
  const isMobile = window.innerWidth <= 768;
  
  if (gameScreen.classList.contains("active") && isGameActive && isMobile) {
    mobileControls.style.display = "flex";  // ✅ Gunakan "flex" seperti CSS
  } else {
    mobileControls.style.display = "none";
  }
}

// Panggil di awal
showLeaderboard();
updateMobileControlsVisibility();

// Dan di setiap fungsi transisi screen
// Di startGame(), gameOver(), winGame(), backMenu(), dll tambahin:
// updateMobileControlsVisibility();

