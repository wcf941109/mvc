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
    });

  fetch('/board').then(function () {
    window.location = '/board';
  });
}

document.getElementById('getList').addEventListener('click', () => {
  fetch('/board').then(function () {
    window.location = '/board';
  });
});

document.getElementById('deleteBoard').addEventListener('click', () => {
  const URLSearch = new URLSearchParams(location.search);
  const id = [URLSearch.get('id')];
  const saveConfirm = confirm('게시글을 삭제하시겠습니까?');
  if (saveConfirm) {
    fetch('/board_detail/:id', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(id),
    }).then(function () {
      window.location = '/board';
    });
  }
});
