function add() {
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  axios
    .post('/board', {
      title,
      content,
    })

    .then((res) => {
      div.innerText = res.data.title;
      div.innerText = res.data.content;
    });
}
