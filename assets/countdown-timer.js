const countdownElements = document.querySelectorAll('[id^="countdownTimer"]');

countdownElements.forEach((element) => {
  const intervalId = setInterval(() => updateCountdown(futureDate, element), 1000);
});

function updateCountdown(date, element) {
  const now = new Date();
  const diffMs = date - now;

  const diffDays = Math.floor(diffMs / 86400000); // days
  const diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
  const diffMins = Math.floor((diffMs % 3600000) / 60000); // minutes
  const diffSecs = Math.floor((diffMs % 60000) / 1000); // seconds

  element.innerHTML = `Starts in ${diffDays}d ${diffHrs}h ${diffMins}m ${diffSecs}s`;

  if (diffMs < 0) {
    clearInterval(intervalId);
    element.innerHTML = 'Go live!';
  }
}
const futureDate = new Date('2024-05-30T00:00:00Z'); // Set the date and time you want to count down to
const intervalId = setInterval(() => updateCountdown(futureDate), 1000);