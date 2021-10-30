const userForm = document.querySelector('#userInfo');
const roomCardBlock = document.querySelector('.room-cards-block');

// console.log(roomCardBlock);
// console.log(submitBtn);

console.log("file attached");

userForm.addEventListener('submit', (e) => {
    e.preventDefault();
    roomCardBlock.style.visibility = 'visible';
    const username = document.querySelector('#avatarName').value;
    console.log("click");
    sessionStorage.setItem('userName', username);

})
