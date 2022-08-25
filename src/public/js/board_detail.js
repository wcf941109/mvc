document.getElementById('getList').addEventListener('click', () => {
  fetch('/board').then(function () {
    window.location = '/board';
  });
});

document.getElementById('deleteBoard').addEventListener('click', () => {
  // const URLSearch = new URLSearchParams(location.search);
  // const id = [URLSearch.get('id')];
  const id = document.getElementById('id').value;
  // const title = document.getElementById('title').value;

  const saveConfirm = confirm('게시글을 삭제하시겠습니까?');
  if (saveConfirm) {
    fetch('/board_detail/:id', {
      method: 'Delete',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(id),
    }).then(function () {
      window.location = '/board';
    });
  }
});
