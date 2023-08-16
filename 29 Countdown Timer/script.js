let countdown;
const h1TimerDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const timerControls = document.querySelector(".timer__controls");

function timer(seconds) {
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function formatTime(time) {
  return `${time < 10 ? "0" : ""}${time}`;
}

function displayTimeLeft(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds / 60) % 60);
  const remainingSeconds = seconds % 60;
  const display = `${hours <= 0 ? "" : formatTime(hours) + ":"}${formatTime(
    minutes
  )}:${formatTime(remainingSeconds)}`;
  document.title = display;
  h1TimerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();
  endTime.textContent = `Be Back At ${formatTime(
    hour > 12 ? hour - 12 : hour
  )}:${formatTime(minutes)}`;
}

function startTimer(e) {
  if (e.target.dataset.time) {
    const seconds = parseInt(e.target.dataset.time);
    timer(seconds);
  }
}

function customTimer(e) {
  e.preventDefault();
  timer(this.minutes.value * 60);
  this.reset();
}

timerControls.addEventListener("click", startTimer);
timerControls.children.customForm.addEventListener("submit", customTimer);
