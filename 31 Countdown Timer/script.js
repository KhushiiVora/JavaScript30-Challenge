(function () {
  const second = document.querySelector(".second");
  const minute = document.querySelector(".minute");
  const hour = document.querySelector(".hour");

  var countdownTimer = null;

  const startBtn = document.querySelector(".start");
  const stopBtn = document.querySelector(".stop");
  const resetBtn = document.querySelector(".reset");

  startBtn.addEventListener("click", () => {
    if (hour == 0 && minute == 0 && second == 0) return;

    function startInterval() {
      startBtn.style.display = "none";
      stopBtn.style.display = "block";
      countdownTimer = setInterval(() => {
        timer();
      }, 1000);
    }

    startInterval();
  });

  function stopInterval(state) {
    startBtn.innerHTML = state === "pause" ? "Continue" : "Start";

    startBtn.style.display = "block";
    stopBtn.style.display = "none";

    clearInterval(countdownTimer);
  }

  function timer() {
    if (second.value > 60) {
      minute.value = `${minute.value <= 10 ? "0" : ""}${minute.value + 1}`;
      second.value = parseInt(second.value) - 59;
    }
    if (minute.value > 60) {
      hour.value = `${hour.value <= 10 ? "0" : ""}${hour.value + 1}`;
      minute.value = parseInt(minute.value) - 60;
    }
    if (hour.value == 0 && minute.value == 0 && second.value == 0) {
      hour.value = "";
      minute.value = "";
      second.value = "";
      stopInterval("stop");
    } else if (second.value != 0) {
      second.value = `${second.value <= 10 ? "0" : ""}${second.value - 1}`;
    } else if (minute.value != 0 && second.value == 0) {
      second.value = 59;
      minute.value = `${minute.value <= 10 ? "0" : ""}${minute.value - 1}`;
    } else if (hour.value != 0 && minute.value == 0) {
      minute.value = 60;
      hour.value = `${hour.value <= 10 ? "0" : ""}${hour.value - 1}`;
    }
  }

  resetBtn.addEventListener("click", () => {
    second.value = "";
    minute.value = "";
    hour.value = "";
    stopInterval("stop");
  });

  stopBtn.addEventListener("click", () => {
    stopInterval("pause");
  });
})();
