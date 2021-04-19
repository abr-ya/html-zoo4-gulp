const showBtn = document.querySelector('.mobButtonOpen');
const menu = document.querySelector('.mobMenu');

const showBtnClickHandler = (e) => {
  console.log('click', e);
  menu.classList.add('open');
  // e.target.closest('.info').classList.toggle('open');
};

showBtn.addEventListener('click', (e) => showBtnClickHandler(e));

menu.addEventListener('click', (e) => {
  menu.classList.remove('open');
});
const infoCardBtns = document.querySelectorAll('.info button');

const infoClickHandler = (e) => {
  e.target.closest('.info').classList.toggle('open');
};

for (let btn of infoCardBtns) {
  btn.addEventListener('click', (e) => infoClickHandler(e));
};
