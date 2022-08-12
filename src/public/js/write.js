function enroll() {
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;
  axios

    .post('/write', {
      title: title,
      content: content,
    })

    .then((res) => {
      const div = document.createElement('div');
      div.innerText = res.data.title;
      div.innerText = res.data.content;
      document.getElementById('data').appendChild(div);
    });
}
