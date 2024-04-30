const countdownElements = document.querySelectorAll('[id^="countdownTimer"]');

countdownElements.forEach((element) => {
  const time = element.textContent;
  const futureDate = new Date(time);
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

const countdownElementsCloses = document.querySelectorAll('[id^="countdownTimerCollection"]');

countdownElementsCloses.forEach((element) => {
  const time = element.textContent;
  const futureDate = new Date(time);
  const intervalId = setInterval(() => updateCountdown(futureDate, element), 1000);
});

function updateCountdown(date, element) {
  const now = new Date();
  const diffMs = date - now;

  const diffDays = Math.floor(diffMs / 86400000); // days
  const diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
  const diffMins = Math.floor((diffMs % 3600000) / 60000); // minutes
  const diffSecs = Math.floor((diffMs % 60000) / 1000); // seconds

  element.innerHTML = `Closes in ${diffDays}d ${diffHrs}h ${diffMins}m ${diffSecs}s`;

  if (diffMs < 0) {
    clearInterval(intervalId);
    element.innerHTML = 'Closed';
  }
}