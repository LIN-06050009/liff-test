const startButton = document.getElementById("start-button");
const startScreen = document.getElementById("start-screen");


const image = document.getElementById("top-image");

const images = [
  "images/top.jpg",
  "images/top1.png",
];

let currentIndex = 0;

image.addEventListener("click", () => {
  image.classList.add("bounce");
  currentIndex = (currentIndex + 1) % images.length;
  image.src = images[currentIndex];
  setTimeout(() => {
    image.classList.remove("bounce");
  }, 200);
});

const LIFF_ID = "2008640559-9lXvZakB";

const statusText = document.getElementById("status-text");
const testBadge = document.getElementById("test-badge");

async function initLiff() {
  await liff.init({ liffId: LIFF_ID });

  // 🧪 測試模式（LINE 外）
  if (!liff.isInClient()) {
    statusText.textContent = "テストモード（LINE外）";
    testBadge.style.display = "block";
    startButton.style.display = "block"; // 測試也可按
    return;
  }

  testBadge.style.display = "none";

  // 🔐 自動登入
  if (!liff.isLoggedIn()) {
    statusText.textContent = "LINEにログイン中です…";
    startButton.style.display = "none";
    liff.login();
    return;
  }

  // ✅ 已登入
  const profile = await liff.getProfile();
  currentProfile = profile;

  statusText.textContent = `こんにちは ${profile.displayName}！`;
  startButton.style.display = "block";
}

startButton.addEventListener("click", () => {
  if (liff.isInClient()) {
    liff.closeWindow();
  }
});

initLiff();

