function signUp() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const pwd = document.getElementById('pwd').value;
  const phone = document.getElementById('phone').value;

  axios
    .post('/signUpUser', {
      name,
      email,
      pwd,
      phone,
    })
    .then((res) => {
      const div = document.createElement('div');

      div.innerText = res.data.name;
      div.innerText = res.data.email;
      div.innerText = res.data.pwd;
      div.innerText = res.data.phone;
    });

  fetch('/login').then(function () {
    window.location = '/login';
  });
}

document.getElementById('getLogin').addEventListener('click', () => {
  fetch('/login').then(function () {
    window.location = '/login';
  });
});

function checkId() {
  const name = document.getElementById('name').value;

  axios
    .post('/checkId', {
      name,
    })
    .then((res) => {
      if (res.data) {
        alert('사용가능한 아이디입니다.');
        document.getElementById('signupBtn').style.color = 'black';
        document.getElementById('signupBtn').removeAttribute('disabled');
      } else {
        alert('이미 존재하는 아이디입니다.');
      }
    });
}
