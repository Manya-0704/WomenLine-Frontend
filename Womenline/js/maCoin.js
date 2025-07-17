let maCoin = localStorage.getItem('maCoin') || 120;
document.getElementById('maCoinValue').textContent = maCoin;

function updateMaCoin(amount) {
  maCoin = Number(maCoin) + amount;
  localStorage.setItem('maCoin', maCoin);
  document.getElementById('maCoinValue').textContent = maCoin;
} 