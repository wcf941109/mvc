document.getElementById('getList').addEventListener('click', () => {
  fetch('/board').then(function () {
    window.location = '/board';
  });
});

// document.getElementById('getUpdate').addEventListener('click', () => {
//   fetch('/update').then(function () {
//     window.location = '/update';
//   });
// });
