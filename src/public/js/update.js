function update() {
  const name = document.getElementById('name').value;
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  axios
    .put('/board_detail/update/:id', {
      name,
      title,
      content,
    })

    .then((res) => {
      const div = document.createElement('div');

      div.innerText = res.data.name;
      div.innerText = res.data.title;
      div.innerText = res.data.content;
    });

  // fetch('/board').then(function () {
  //   window.location = '/board';
  // });
}

document.getElementById('getList').addEventListener('click', () => {
  fetch('/board').then(function () {
    window.location = '/board';
  });
});
