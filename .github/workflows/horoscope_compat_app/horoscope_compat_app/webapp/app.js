
const apiBase = window.location.origin;
document.getElementById('getHoroscope').addEventListener('click', async () => {
  const z = document.getElementById('zodiac').value;
  const res = await fetch(`${apiBase}/api/horoscope/${z}`);
  const data = await res.json();
  document.getElementById('horoscopeResult').innerText = `${data.date} — ${data.zodiac.toUpperCase()}:\n\n${data.horoscope}`;
});

document.getElementById('checkCompat').addEventListener('click', async () => {
  const name1 = document.getElementById('name1').value.trim();
  const dob1 = document.getElementById('dob1').value.trim();
  const name2 = document.getElementById('name2').value.trim();
  const dob2 = document.getElementById('dob2').value.trim();
  const res = await fetch(`${apiBase}/api/compatibility`, {
    method: 'POST', headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ name1, dob1, name2, dob2 })
  });
  const data = await res.json();
  if (data.error) {
    document.getElementById('compatResult').innerText = 'Error: ' + data.error;
    return;
  }
  document.getElementById('compatResult').innerText =
    `Result for ${data.name1} (${data.zodiac1}) & ${data.name2} (${data.zodiac2})\nScore: ${data.score}\n${data.message}`;
});

document.getElementById('shareBtn').addEventListener('click', () => {
  const url = window.location.href;
  const text = encodeURIComponent('Check this fun Horoscope & Compatibility tool: ' + url);
  const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${text}`;
  window.open(shareUrl, '_blank');
});
