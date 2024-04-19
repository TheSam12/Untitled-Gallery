const countdownElement = document.getElementById('countdownTimer');

function updateCountdown(date) {
  const now = new Date();
  const diffMs = date - now;

  const diffDays = Math.floor(diffMs / 86400000); // days
  const diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
  const diffMins = Math.floor((diffMs % 3600000) / 60000); // minutes
  const diffSecs = Math.floor((diffMs % 60000) / 1000); // seconds

  countdownElement.innerHTML = `${diffDays}d ${diffHrs}h ${diffMins}m ${diffSecs}s`;

  if (diffMs < 0) {
    clearInterval(intervalId);
    countdownElement.innerHTML = 'Time is up!';
  }
}

const futureDate = new Date('2023-01-01T00:00:00Z'); // Set the date and time you want to count down to
const intervalId = setInterval(() => updateCountdown(futureDate), 1000);