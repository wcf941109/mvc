document.getElementById('getList').addEventListener('click', () => {
  fetch('/board').then(function () {
    window.location = '/board';
  });
});

document.getElementById('deleteBoard').addEventListener('click', () => {
  const id = document.getElementById('idid').value;
  const name1 = document.getElementById('name1').innerText;
  const name2 = document.getElementById('name2').innerText;

  console.log(name1, '11111111111111');
  console.log(name2, '11111111111111');

  if (name1 === name2) {
    axios
      .delete('/board_detail', {
        data: {
          id,
        },
      })
      .then(function () {
        window.location = '/board';
      });
  } else {
    alert('글쓴이만 삭제 할 수 있습니다');
  }
});

const checkUser = () => {
  let name1;
  if (document.getElementById('name1'))
    name1 = document.getElementById('name1').innerText;
  const name2 = document.getElementById('name2').innerText;
  const id = window.location.pathname.replace('/board_detail/', '');

  if (name1 === name2) {
    window.location = `/update/${id}`;
  } else {
    alert('글쓴이만 수정 할 수 있습니다');
  }
};
