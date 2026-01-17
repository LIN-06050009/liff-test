const startButton = document.getElementById("start-button");
const startScreen = document.getElementById("start-screen");
const chatScreen = document.getElementById("chat-screen");

startButton.addEventListener("click", () => {
  startScreen.classList.remove("active");
  chatScreen.classList.add("active");
});

const backButton = document.getElementById("back-button");

backButton.addEventListener("click", () => {
  chatScreen.classList.remove("active");
  startScreen.classList.add("active");
});

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

const statusText = document.getElementById("login-status");

async function initLiff() {
  try {
    await liff.init({ liffId: LIFF_ID });

    console.log("isLoggedIn:", liff.isLoggedIn());

    // ❌ 未登入 → 顯示提示 UI，並自動登入
    if (!liff.isLoggedIn()) {
      showScreen("login-screen");
      statusText.textContent = "LINEにログイン中です…";

      // ⚠️ 給 UI 一點時間顯示（體驗會好很多）
      setTimeout(() => {
        liff.login({
          redirectUri: window.location.origin + "/"
        });
      }, 800);

      return;
    }

    // ✅ 已登入 → 直接進聊天室
    const profile = await liff.getProfile();
    statusText.textContent = `ログイン中：${profile.displayName}`;

    showScreen("start-screen");

  } catch (err) {
    console.error(err);
    statusText.textContent = "LIFF 初期化に失敗しました";
  }
}

function showScreen(screenId) {
  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.remove("active");
  });
  document.getElementById(screenId)?.classList.add("active");
}

initLiff();

