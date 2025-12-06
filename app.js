// あなたの LIFF ID を入力してください
const liffId = 2008640559-9lXvZakB;

window.onload = async () => {
  try {
    // ① LIFF を初期化
    await liff.init({ liffId });
    console.log("LIFF 初期化成功");

    // ② ログイン状態を確認
    if (!liff.isLoggedIn()) {
      document.getElementById("loginBtn").style.display = "block";
    } else {
      document.getElementById("logoutBtn").style.display = "block";
    }

  } catch (err) {
    console.error("LIFF 初期化エラー：", err);
  }
};

// ③ ログインボタン
document.getElementById("loginBtn").onclick = () => {
  liff.login();
};

// ④ ログアウトボタン
document.getElementById("logoutBtn").onclick = () => {
  liff.logout();
  location.reload();
};

// ⑤ プロフィール取得
document.getElementById("profileBtn").onclick = async () => {
  if (!liff.isLoggedIn()) return alert("まずログインしてください");

  const profile = await liff.getProfile();
  document.getElementById("result").innerText = JSON.stringify(profile, null, 2);
};

// ⑥ 自分にテキストメッセージを送信
document.getElementById("msgBtn").onclick = async () => {
  if (!liff.isLoggedIn()) return alert("まずログインしてください");

  await liff.sendMessages([
    {
      type: "text",
      text: "これは LIFF ページから送信されたテストメッセージです！"
    }
  ]);

  alert("メッセージを送信しました！");
};