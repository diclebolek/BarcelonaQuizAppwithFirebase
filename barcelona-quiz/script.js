let currentQuestion = 0;
let score = 0;
let usedFifty = false;
let usedSkip = false;
let usedDoubleForQuestion = [];
let doubleAttempt = false;
let doubleUsedThisQuestion = false;
let timerInterval;
const pointsPerQuestion = 100 / questions.length;

let username = "";
let userGift = "";
const userScores = JSON.parse(localStorage.getItem("quizResults") || "[]");

let doubleChanceUsed = false; // Çift cevap hakkı kullanımı

// Başla ekranı kontrolü
window.onload = () => {
  const ui = document.getElementById("username-input");
  const btn = document.getElementById("start-quiz-btn");
  btn.disabled = true;
  ui.addEventListener("input", () => btn.disabled = ui.value.trim() === "");
  btn.addEventListener("click", () => {
    username = ui.value.trim();
    if (!username) return;

    document.getElementById("start-screen").classList.add("hidden");
    document.getElementById("quiz-container").classList.remove("hidden");
    document.getElementById("result").classList.add("hidden");

    initQuiz();

    document.getElementById("bg-music").play();
  });
  showUserResults();
};

document.getElementById("start-quiz-btn").addEventListener("click", () => {
  const usernameInput = document.getElementById("username-input");
  const usernameVal = usernameInput.value.trim();
  if (!usernameVal) return;

  username = usernameVal;

  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("quiz-container").classList.remove("hidden");
  document.getElementById("result").classList.add("hidden");

  initQuiz();
});

function initQuiz() {
  questions.sort(() => Math.random() - 0.5);
  usedDoubleForQuestion = Array(questions.length).fill(false);
  score = 0;
  currentQuestion = 0;
  usedFifty = false;
  usedSkip = false;
  userGift = "";
  doubleChanceUsed = false;

  showQuestion();
  updateProgressBar();
  document.getElementById("fiftyBtn").disabled = false;
  document.getElementById("doubleBtn").disabled = false;
}

function showQuestion() {
  clearInterval(timerInterval);
  doubleAttempt = false;
  doubleUsedThisQuestion = usedDoubleForQuestion[currentQuestion];
  const q = questions[currentQuestion];

  document.getElementById("question-number").textContent = `Soru ${currentQuestion + 1} / ${questions.length}`;
  document.getElementById("question").textContent = q.question;

  const ic = document.getElementById("question-image");
  ic.innerHTML = q.image ? `<img src="${q.image}" style="max-width:100%;height:250px;border-radius:10px;margin-bottom:10px;">` : "";

  const od = document.getElementById("options");
  od.innerHTML = "";

  q.options.forEach((opt, i) => {
    const b = document.createElement("button");
    b.textContent = opt;
    b.disabled = false;
    b.style.display = "block";
    b.onclick = () => checkAnswer(i, b);

    if (q.images && q.images[i]) {
      b.innerHTML = `<img src="${q.images[i]}" style="width:50px;height:50px;vertical-align:middle;margin-right:8px;">${opt}`;
    }
    od.appendChild(b);
  });

  updateProgressBar();
  startTimer();

  document.getElementById("doubleBtn").disabled = usedDoubleForQuestion[currentQuestion] || doubleChanceUsed;
}

function checkAnswer(idx, btn) {
  const corr = questions[currentQuestion].correctAnswer;
  if (idx === corr) {
    score += pointsPerQuestion;
    showScoreAnimation();
    clearInterval(timerInterval);
    nextQuestion();
  } else if (doubleUsedThisQuestion && !doubleAttempt) {
    doubleAttempt = true;
    btn.disabled = true;
  } else {
    clearInterval(timerInterval);
    nextQuestion();
  }
}

function useFiftyFifty() {
  if (usedFifty) return;
  usedFifty = true;
  const corr = questions[currentQuestion].correctAnswer;
  const bs = document.querySelectorAll("#options button");
  let rm = 0;
  bs.forEach((b, i) => {
    if (i !== corr && rm < 2) {
      b.style.display = "none";
      rm++;
    }
  });
  document.getElementById("fiftyBtn").disabled = true;
}

function useDoubleChance() {
  if (doubleChanceUsed) return;
  doubleChanceUsed = true;

  doubleUsedThisQuestion = true;
  usedDoubleForQuestion[currentQuestion] = true;

  document.getElementById("doubleBtn").disabled = true;
}

function skipQuestion() {
  clearInterval(timerInterval);
  nextQuestion();
}

function startTimer() {
  clearInterval(timerInterval);
  let t = 20;
  const tm = document.getElementById("timer");
  tm.textContent = `⏱️ ${t} saniye`;
  timerInterval = setInterval(() => {
    t--;
    tm.textContent = `⏱️ ${t} saniye`;
    if (t <= 0) {
      clearInterval(timerInterval);
      nextQuestion();
    }
  }, 1000);
}

function updateProgressBar() {
  const p = (currentQuestion / questions.length) * 100;
  document.getElementById("progress").style.width = p + "%";
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) showQuestion();
  else showResult();
}

function showResult() {
  document.getElementById("quiz-container").classList.add("hidden");
  document.getElementById("start-screen").classList.add("hidden");

  const rd = document.getElementById("result");
  document.getElementById("bg-music").pause();

  let msg = "";
  if (score >= 65) {
    msg = `🎉 Tebrikler ${username}! ${Math.round(score)} puanla hediyeyi kazandın!<br>`;
    msg += `<div class="gift-selection">
      <h3>🎁 Hadi hediyeni seç!</h3>
      <div class="gift-buttons">
        <button class="gift-btn pink-btn" onclick="chooseGift('pembe')">🎀 Bu olsun</button>
        <button class="gift-btn navy-btn" onclick="chooseGift('lacivert')">🎁 Bunu seçiyorum</button>
      </div>
      <p id="gift-message"></p>
    </div>`;
    celebrate();
  } else {
    saveToFirebase("yok"); // Başarısız kullanıcıyı Firebase'e kaydet
    msg = `😢 Başarısız oldun, tekrar dene!<br><button id="retryBtn" class="retry-button">Tekrar Dene</button>`;
  }

  let ans = "<h3>✅ Doğru Cevaplar</h3><ol>";
  questions.forEach(q => {
    ans += `<li><strong>${q.question}</strong><br>Cevap: ${q.options[q.correctAnswer]}</li>`;
  });
  ans += "</ol>";

  rd.innerHTML = `<h2>Quiz Bitti!</h2><p>${msg}</p>${ans}`;
  rd.classList.remove("hidden");

  const r = document.getElementById("retryBtn");
  if (r) r.onclick = () => {
    rd.classList.add("hidden");
    document.getElementById("start-screen").classList.remove("hidden");
  };

  showUserResults();
}

function chooseGift(color) {
  userGift = color;
  const gm = document.getElementById("gift-message");
  if (color === "pembe") {
    gm.innerHTML = "🎉 Harika seçim, hazırlıklara başlıyorum!";
  } else {
    gm.innerHTML = "🎉 Diğer hediye daha harikaydı 😊";
  }

  // Hediye seçim butonlarını devre dışı bırak (yalnızca bir kez tıklanabilir)
  const buttons = document.querySelectorAll(".gift-btn");
  buttons.forEach(btn => btn.disabled = true);

  userScores.push({ username, score: Math.round(score), gift: color });
  localStorage.setItem("quizResults", JSON.stringify(userScores));

  saveToFirebase(color);

  showUserResults();
}

function saveToFirebase(giftColor) {
  db.collection("quizResults").add({
    username: username,
    score: Math.round(score),
    gift: giftColor,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  })
  .then(() => {
    console.log("Veri Firebase'e kaydedildi.");
    showUserResults();
  })
  .catch((err) => console.error("Firebase kaydetme hatası:", err));
}

function showScoreAnimation() {
  const c = document.querySelector(".container");
  const a = document.createElement("div");
  a.textContent = "+5";
  Object.assign(a.style, {
    position: "absolute",
    top: "20px",
    right: "20px",
    fontSize: "32px",
    color: "#FFD700",
    fontWeight: "bold",
    opacity: "1",
    transition: "all 1s ease-out"
  });
  c.appendChild(a);
  setTimeout(() => { a.style.top = "0"; a.style.opacity = "0"; }, 50);
  setTimeout(() => c.removeChild(a), 1050);
}

function celebrate() {
  const dur = 5000, end = Date.now() + dur;
  const def = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };
  const iv = setInterval(() => {
    const tl = end - Date.now();
    if (tl <= 0) return clearInterval(iv);
    confetti(Object.assign({}, def, { particleCount: 50 * (tl / dur), origin: { x: Math.random(), y: Math.random() - 0.2 } }));
  }, 250);
}

function showUserResults() {
  // Firestore'dan skorları çekip göster
  const ul = document.getElementById("results-list");
  ul.innerHTML = "";

  db.collection("quizResults").orderBy("timestamp", "desc").get()
    .then(snapshot => {
      if (snapshot.empty) {
        ul.innerHTML = "<li>Henüz kayıtlı kullanıcı yok.</li>";
        return;
      }

      snapshot.forEach((doc, i) => {
        const data = doc.data();
        const li = document.createElement("li");
        li.innerHTML = `${i + 1}. ${data.username} — ${Math.round(data.score)} puan — <span class="gift-color">${data.gift}</span>`;
        ul.appendChild(li);
      });
    })
    .catch(err => {
      console.error("Firestore'dan veri çekme hatası:", err);
      ul.innerHTML = "<li>Veri alınamadı.</li>";
    });
}
