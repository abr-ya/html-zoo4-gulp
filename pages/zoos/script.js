const showBtn = document.querySelector('.mobButton');

const infoClickHandler = (e) => {
  console.log('click', e);
  // e.target.closest('.info').classList.toggle('open');
};

showBtn.addEventListener('click', (e) => infoClickHandler(e));

const infoCardBtns = document.querySelectorAll('.info button');

const infoClickHandler = (e) => {
  e.target.closest('.info').classList.toggle('open');
};

for (let btn of infoCardBtns) {
  btn.addEventListener('click', (e) => infoClickHandler(e));
};
