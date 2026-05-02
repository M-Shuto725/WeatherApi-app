// Enterキーで検索
document.getElementById("cityInput")
  .addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
      getWeather();
    }
});

// ページ読み込み時に初期表示
window.onload = function() {
  document.getElementById("cityInput").value = "Tokyo";
  getWeather();
};

async function getWeather() {
  const input = document.getElementById("cityInput").value;

  if (input === "") {
    document.getElementById("result").textContent = "都市名を入力してください";
    document.getElementById("icon").src = "";
    return;
  }

  // 日本語対応
  const city = encodeURIComponent(input);

  const apiKey = "39dd51014098a13c3ee92f8e9b7dcc77"; // ←必ず入れる

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},JP&appid=${apiKey}&lang=ja&units=metric`;

  // ローディング表示
  document.getElementById("result").textContent = "取得中...";
  document.getElementById("icon").src = "";

  try {
    const response = await fetch(url);
    const data = await response.json();

    // エラー処理
    if (data.cod != 200) {
      document.getElementById("result").textContent =
        "都市名が正しくない可能性があります";
      return;
    }

    const cityName = data.name;
    const weather = data.weather[0].description;
    const temp = data.main.temp;
    const icon = data.weather[0].icon;

    // 表示
    document.getElementById("result").textContent =
      `${cityName}の天気：${weather} / 気温：${temp}℃`;

    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    document.getElementById("icon").src = iconUrl;

  } catch (error) {
    document.getElementById("result").textContent = "通信エラー";
  }
}