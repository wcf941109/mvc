function add() {
  const name = document.getElementById('name').value;
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  axios
    .post('/board', {
      name,
      title,
      content,
    })

    .then((res) => {
      div.innerText = res.data.name;
      div.innerText = res.data.title;
      div.innerText = res.data.content;
      document.getElementById('data').appendChild(div);
    });

  fetch('/board').then(function () {
    window.location = '/board';
  });
}

// document.getElementById('getList').addEventListener('click', () => {
//   fetch('/board').then(function () {
//     window.location = '/board';
//   });
// });

// 따로 js파일 만들어야 함.
// document.getElementById('getWrite').addEventListener('click', () => {
//   axios
//     .post('/write', {})
//     .then(function (response) {
//       window.location = '/write';
//     })
//     .catch(function (error) {
//       if (error) {
//         alert(error.response.data.message);
//         window.location = '/login';
//       }
//     });
// });

document.getElementById('loginBtn').addEventListener('click', () => {
  const getname = document.getElementById('name').value;
  const getPwd = document.getElementById('pwd').value;
  // const data = [getname, getPwd];
  if (getname == '') {
    alert('아이디를 입력해주세요.');
  } else if (getPwd == '') {
    alert('비밀번호를 입력해주세요.');
  }

  axios
    .post('/login', {
      name: getname,
      pwd: getPwd,
    })
    .then(function (response) {
      window.location = '/home';
    })
    .catch(function (error) {
      if (error.response.data) {
        alert(error.response.data.message);
      }
    });
});
