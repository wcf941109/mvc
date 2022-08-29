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

document.getElementById('getList'); //
// .addEventListener('click', () => {
//   fetch('/board').then(function () {
//     window.location = '/board';
//   });
// });

// document.getElementById('deleteBoard').addEventListener('click', () => {
//   const URLSearch = new URLSearchParams(location.search);
//   const id = [URLSearch.get('id')];
//   const saveConfirm = confirm('게시글을 삭제하시겠습니까?');
//   if (saveConfirm) {
//     fetch('/board_detail/:id', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(id),
//     }).then(function () {
//       window.location = '/board';
//     });
//   }
// });

function signupup() {
  const userId = document.getElementById('userId').value;
  const email = document.getElementById('email').value;
  const pwd = document.getElementById('pwd').value;
  const phone = document.getElementById('phone').value;

  axios
    .post('/signup', {
      userId,
      email,
      pwd,
      phone,
    })
    .then((res) => {
      const div = document.createElement('div');

      div.innerText = res.data.userId;
      div.innerText = res.data.email;
      div.innerText = res.data.pwd;
      div.innerText = res.data.phone;
    });
}
