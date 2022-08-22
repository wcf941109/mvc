const { Router } = require('express');

const router = Router();

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
function update() {
  router.put('/board_detail/update/:id', (req, res) => {
    try {
      const params = req.params;
      const body = req.body;
      let result;
      MVC.forEach((board) => {
        if (board.id === params.id) {
          board = { ...title, ...content };
          result = board;
        }
      });
      res.status(200).send({
        success: true,
        data: {
          board: result,
        },
      });
    } catch (error) {
      res.status(400).send({
        success: false,
        error: error.message,
      });
    }
  });

  // const title = document.getElementById('title').value;
  // const content = document.getElementById('content').value;

  // axios
  //   .post('/update', {
  //     title,
  //     content,
  //   })

  //   .then((res) => {
  //     div.innerText = res.data.title;
  //     div.innerText = res.data.content;
  //   });

  // await fetch('/board').then(function () {
  //   window.location = '/board';
  // });
}

// function deleteDiv(data) {
//   const div = document.getElementById('div');

//   div.remove(data);
// }

document.getElementById('getDelete').addEventListener('click', () => {
  const div = document.getElementById('div');
  const URLSearch = new URLSearchParams(location.search);
  const id = [URLSearch.get('id')];
  const saveConfirm = confirm('게시글을 삭제하시겠습니까?');
  // if (saveConfirm) {
  //   fetch('/board_detail/:id', {
  //     method: 'delete',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(id),
  //   }).then(function (data) {
  //     div.remove(data);
  //     window.location = '/board';
  //   });
  // }
  axios
    .delete('/board_detail', {
      data,
    })

    .then((res) => {
      div.remove(res.data);
    });
  fetch('/board').then(function () {
    window.location = '/board';
  });
});
