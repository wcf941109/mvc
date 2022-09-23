function add() {
  const name = document.getElementById('nickname').value;
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

document.getElementById('loginBtn').addEventListener('click', () => {
  const getnickname = document.getElementById('nickname').value;
  const getPwd = document.getElementById('pwd').value;
  // const data = [getnickname, getPwd];
  if (getnickname == '') {
    alert('아이디를 입력해주세요.');
  } else if (getPwd == '') {
    alert('비밀번호를 입력해주세요.');
  }
  try {
    axios.post('/login', {
      headers: {
        'Content-Type': 'application/json',
      },
      nickname: getnickname,
      pwd: getPwd,
    });
    // alert(`${getnickname}님 로그인하였습니다!!`);
    // window.location = '/';
  } catch (error) {
    console.log(error.message);
  }
});
