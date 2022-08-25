function update() {
  const name = document.getElementById('name').value;
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  axios.put('/board_detail/update/:id', {
    name,
    title,
    content,
  });

  // .then((res) => {
  // const div = document.createElement('div');
  // const updatename = res.data.name;
  // const updatetitle = res.data.title;
  // const updatecontent = res.data.content;
  // div.textContent = updatename;
  // div.textContent = updatetitle;
  // div.textContent = updatecontent;
  // // div.innerText = res.data.name;
  // // div.innerText = res.data.title;
  // // div.innerText = res.data.content;
  // });

  fetch('/board').then(function () {
    window.location = '/board';
  });
}

document.getElementById('getList').addEventListener('click', () => {
  fetch('/board').then(function () {
    window.location = '/board';
  });
});
