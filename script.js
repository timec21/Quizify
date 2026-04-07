const QUESTIONS = [
  {
    q: "JavaScript'te '===' operatörü ile '==' arasındaki fark nedir?",
    options: ["Fark yoktur", "=== hem değeri hem de tipi kontrol eder", "== daha hızlı çalışır", "=== sadece sayıları karşılaştırır"],
    answerIndex: 1,
  },
  {
    q: "CSS'de bir elemanı sayfada tam ortalamak için (Flexbox ile) hangisi kullanılır?",
    options: ["display: block", "align-items: center; justify-content: center;", "text-align: center;", "float: center;"],
    answerIndex: 1,
  },
  {
    q: "HTML5 ile gelen, grafik çizmek için kullanılan etiket hangisidir?",
    options: ["<graphics>", "<draw>", "<canvas>", "<paint>"],
    answerIndex: 2,
  },
  {
    q: "JavaScript'te bir dizinin sonuna eleman eklemek için hangi metod kullanılır?",
    options: ["pop()", "push()", "shift()", "join()"],
    answerIndex: 1,
  },
  {
    q: "CSS'de 'z-index' özelliği ne işe yarar?",
    options: ["Yazı boyutunu belirler", "Elemanların derinlik (üst üste binme) sırasını belirler", "Dış boşluğu belirler", "Elemanı gizler"],
    answerIndex: 1,
  },
  {
    q: "Hangisi geçerli bir CSS renk tanımlama yöntemi değildir?",
    options: ["rgb(255, 0, 0)", "#FF0000", "color: red", "color-rgba: 25"],
    answerIndex: 3,
  },
  {
    q: "HTML'de 'target=\"_blank\"' özniteliği ne işe yarar?",
    options: ["Bağlantıyı yeni sekmede açar", "Bağlantıyı aynı sayfada açar", "Sayfayı yeniler", "Geri dönmeyi sağlar"],
    answerIndex: 0,
  },
  {
    q: "JavaScript'te 'NaN' ifadesinin açılımı nedir?",
    options: ["New and Next", "Not a Number", "Null and None", "Negative and Normal"],
    answerIndex: 1,
  },
  {
    q: "CSS Box Model (Kutu Modeli) hiyerarşisi içeriden dışarıya doğru nasıldır?",
    options: ["Padding - Border - Margin", "Margin - Border - Padding", "Border - Padding - Margin", "Content - Margin - Padding"],
    answerIndex: 0,
  },
  {
    q: "HTML'de hangi etiket SEO açısından en önemli başlığı temsil eder?",
    options: ["<h6>", "<head>", "<title>", "<h1>"],
    answerIndex: 3,
  },
  {
    q: "JavaScript'te sabit bir değişken tanımlamak için hangi anahtar kelime kullanılır?",
    options: ["var", "let", "const", "static"],
    answerIndex: 2,
  },
  {
    q: "CSS'de 'position: absolute' olan bir eleman neye göre konumlanır?",
    options: ["Sayfa başına göre", "En yakın 'position: relative' olan üst elemanına göre", "Bir sonraki elemana göre", "Ekranın ortasına göre"],
    answerIndex: 1,
  },
  {
    q: "Hangisi bir JavaScript framework/kütüphanesi değildir?",
    options: ["React", "Vue", "Laravel", "Angular"],
    answerIndex: 2,
  },
  {
    q: "HTML formlarında verinin URL içinde gönderildiği metod hangisidir?",
    options: ["POST", "GET", "SEND", "FETCH"],
    answerIndex: 1,
  },
  {
    q: "CSS'de fare üzerine gelince yapılacak değişikliği hangi 'pseudo-class' belirler?",
    options: [":active", ":focus", ":visited", ":hover"],
    answerIndex: 3,
  }
];
let currentIndex = 0;
let score = 0;
let answered = false;

// Element Seçiciler
const metaEl = document.getElementById("meta");
const scoreMetaEl = document.getElementById("scoreMeta");
const barFillEl = document.getElementById("barFill");
const quizView = document.getElementById("quizView");
const resultView = document.getElementById("resultView");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const noteEl = document.getElementById("note");
const nextBtn = document.getElementById("nextBtn");
const skipBtn = document.getElementById("skipBtn");
const restartBtn = document.getElementById("restartBtn");
const finalScoreEl = document.getElementById("finalScore");
const summaryEl = document.getElementById("summary");
const badgeEl = document.getElementById("badge");

function initQuiz() {
  currentIndex = 0;
  score = 0;
  quizView.style.display = "block";
  document.getElementById("bottomBar").style.display = "flex";
  resultView.style.display = "none";
  renderQuestion();
}

function renderQuestion() {
  const total = QUESTIONS.length;
  const currentQuestion = QUESTIONS[currentIndex];

  answered = false;
  nextBtn.disabled = true;
  noteEl.textContent = "Bir seçeneğe tıkla.";

  // UI Güncelleme
  metaEl.textContent = `Soru ${currentIndex + 1} / ${total}`;
  scoreMetaEl.textContent = `Puan: ${score}`;
  barFillEl.style.width = `${(currentIndex / total) * 100}%`;

  questionEl.textContent = currentQuestion.q;
  optionsEl.innerHTML = "";

  currentQuestion.options.forEach((text, i) => {
    const btn = document.createElement("button");
    btn.className = "opt";
    btn.textContent = text;
    btn.onclick = () => handleChoice(i, btn);
    optionsEl.appendChild(btn);
  });
}

function handleChoice(choiceIndex, btnElement) {
  if (answered) return;
  answered = true;

  const correctIndex = QUESTIONS[currentIndex].answerIndex;
  const allButtons = optionsEl.querySelectorAll(".opt");

  allButtons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === correctIndex) {
      btn.classList.add("right");
    }
  });

  if (choiceIndex === correctIndex) {
    score++;
    noteEl.textContent = "Doğru!";
  } else {
    btnElement.classList.add("wrong");
    noteEl.textContent = "Yanlış Cevap.";
  }

  scoreMetaEl.textContent = `Puan: ${score}`;
  nextBtn.disabled = false;
}

function handleNext() {
  if (currentIndex < QUESTIONS.length - 1) {
    currentIndex++;
    renderQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  const total = QUESTIONS.length;
  const percentage = Math.round((score / total) * 100);

  barFillEl.style.width = "100%";
  quizView.style.display = "none";
  document.getElementById("bottomBar").style.display = "none";
  resultView.style.display = "block";

  finalScoreEl.textContent = `${score} / ${total}`;
  badgeEl.textContent = `Başarı: %${percentage}`;

  if (percentage >= 80) summaryEl.textContent = "Harika bir performans!";
  else if (percentage >= 50) summaryEl.textContent = "Fena değil, biraz daha çalışma gerek.";
  else summaryEl.textContent = "Daha çok pratik yapmalısın.";
}

// Event Listeners
nextBtn.addEventListener("click", handleNext);
skipBtn.addEventListener("click", handleNext); // Atla butonu aynı mantıkla ilerletir
restartBtn.addEventListener("click", initQuiz);

// İlk başlatma
initQuiz();