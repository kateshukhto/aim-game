const screens = document.querySelectorAll('.screen')
      startBtn = document.querySelector('.start'),
      timeList = document.querySelector('.time-list'),
      timeEl = document.querySelector('#time'),
      board = document.querySelector('#board');

const colors = [ '#FFFFFF', '#FFFF00', '#00FF00', '#0066FF', '#FF6600','#000066', '#CC0066'];

let time = 0;
let score = 0;

startBtn.addEventListener('click', (e) => {
      e.preventDefault();
      screens[0].classList.add('up');
});

timeList.addEventListener('click', (e) => {
      if(e.target.classList.contains('time-btn')) {
            time = parseInt(e.target.getAttribute('data-time'))
      }
      screens[1].classList.add('up');
      startGame()
});

board.addEventListener('click', e => {
      if(e.target.classList.contains('circle')) {
            score++;
            e.target.remove();
            startGame()
      }
})

function startGame() {
      setInterval(decreaseTime, 1000);
      createRandomCircle();
      setTime(time)
}

function decreaseTime() {
      if(time === 0) {
            finishGame()
      } else {
            let current = --time;
            if(current < 10) {
                  current = `0${current}`
            }
            setTime(current)
      }
}

function setTime(value) {
      timeEl.innerHTML = `00:${value}`
}

function createRandomCircle() {
     const circle = document.createElement('div');
     const size = getRandomNumber(3, 60);
     const {width, height} = board.getBoundingClientRect();
     const x = getRandomNumber(0, width - size);
     const y = getRandomNumber(0, height - size)
     circle.classList.add('circle');

     circle.style.width = `${size}px`;
     circle.style.height = `${size}px`;
     circle.style.top = `${y}px`;
     circle.style.left = `${x}px`;
     circle.style.background = `${getRandomColor()}`

     board.append(circle)
}

function getRandomNumber(min, max) {
      return Math.round(Math.random() * (max - min) + min)
}

function finishGame() {
      timeEl.parentNode.classList.add('hide');
      board.innerHTML =`<h1>Счет:<span class='primary'>${score}</span></h1>`;
}

function getRandomColor() {
      const index = Math.floor(Math.random() * colors.length);
      return colors[index];
}