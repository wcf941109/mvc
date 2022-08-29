document.getElementById('getList').addEventListener('click', () => {
  fetch('/board').then(function () {
    window.location = '/board';
  });
});

document.getElementById('deleteBoard').addEventListener('click', () => {
  // const URLSearch = new URLSearchParams(location.search);
  // const id = [URLSearch.get('id')];
  const id = document.getElementById('idid').value;
  // const title = [document.getElementById('title')];

  const saveConfirm = confirm('게시글을 삭제하시겠습니까?');
  if (saveConfirm) {
    axios.delete('/board_detail', {
      data: { id },
    });
    fetch('/board').then(function () {
      window.location = '/board';
    });
  }
});
