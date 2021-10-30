

const setUserName = (e) => {
e.preventDefault();
const userName = document.querySelector('#avatarName').value;
sessionStorage.setItem('userName', userName);
console.log(sessionStorage.getItem('userName'));

}