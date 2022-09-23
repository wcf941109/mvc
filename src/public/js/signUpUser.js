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
