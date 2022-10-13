let name1;
if (document.getElementById('name1'))
  name1 = document.getElementById('name1').innerText;
const name2 = document.getElementById('name2').value;

if (name1 !== name2 || !name1) {
  alert('유저 정보가 올바르지 않습니다.');
  window.location = '/board';
}

// function update() {
//   const name = document.getElementById('name').value;
//   const title = document.getElementById('title').value;
//   const content = document.getElementById('content').value;

//   axios.put('/board_detail/update/:id', { name, title, content });

//   // fetch('/board').then(function () {
//   //   window.location = '/board';
//   // });
// }

document.getElementById('getUpdate').addEventListener('click', () => {
  const name = document.getElementById('name2').value;
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  axios
    .put('/update', {
      name,
      title,
      content,
    })
    .then(function () {
      window.location = '/board?id=1';
    });
});

document.getElementById('getList').addEventListener('click', () => {
  fetch('/board').then(function () {
    window.location = '/board';
  });
});
