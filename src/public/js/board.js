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

document.getElementById('loginBtn').addEventListener('click', () => {
  const getnickname = document.getElementById('nickname').value;
  const getPwd = document.getElementById('pwd').value;
  const data = [getnickname, getPwd];
  if (getnickname == '') {
    alert('아이디를 입력해주세요.');
  } else if (getPwd == '') {
    alert('비밀번호를 입력해주세요.');
  } else {
    axios
      .post('/login', {
        data,
      })
      .then((res) => console.log(res.data));
    // .then((res) => res.text())
    // .then((text) => {
    //   switch (text) {
    //     case 'checkId':
    //       alert('존재하지 않는 아이디입니다.');
    //       break;
    //     case 'checkPwd':
    //       alert('비밀번호가 일치하지 않습니다.');
    //       break;
    //     case 'loginSuccess':
    //       window.location = '/';
    //       break;
    //   }
    // });
  }
});
