const btn = document.querySelector('.btn');
const iconDark = document.querySelector('.dark');
const iconLight = document.querySelector('.light')

btn.addEventListener('click', () => {
   iconDark.classList.toggle('hidden');
   iconLight.classList.toggle('hidden');
})



