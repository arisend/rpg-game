import './index.scss';
import ClientGame from './client/ClientGame';

const $button = document.querySelector('#nameForm > div:nth-child(3) > button');
$button.onclick = function () {
  const playerName = document.querySelector('#name').value;
  ClientGame.init({ tagId: 'game', playerName: playerName });
  const $elem = document.querySelector('body > div > div.canvas-wrap > div.start-game');
  $elem.parentNode.removeChild($elem);
};

$form.addEventListener('submit', (e) => {
  e.preventDefault();
  if ($input) {
    console.log('#####', $input.value);
    socket.emit('chat message', $input.value);
    $input.value = '';
  }
});
socket.on('chat online', (data) => {
  console.log('### ', data);
  let names;
  data.names.forEach((element, index) => {
    if (element.name && index === 0) {
      names = element.name;
    } else if (element.name) {
      names = names + ', ' + element.name;
    }
    console.log(element, index);
  });

  $message.insertAdjacentHTML(
    'beforeend',
    `<p><strong>There are ${data.online} peoples online.</strong> - ${names}</p>`,
  );
});
let personalId = null;

socket.on('chat connection', (data) => {
  console.log('###22 ', data);
  if (!personalId) {
    personalId = data.id;
  }
  $message.insertAdjacentHTML('beforeend', `<p><strong>${getTime(data.time)}</strong> - ${data.msg}</p>`);
});
socket.on('chat disconnect', (data) => {
  console.log('### ', data);
  $message.insertAdjacentHTML('beforeend', `<p><strong>${getTime(data.time)}</strong> - ${data.msg}</p>`);
});
socket.on('chat message', (data) => {
  if (data.id == personalId) {
    $message.insertAdjacentHTML(
      'beforeend',
      `<p  style="color:blue;"><strong>${getTime(data.time)} - ${data.name}: </strong>${data.msg}</p>`,
    );
  } else {
    $message.insertAdjacentHTML(
      'beforeend',
      `<p><strong>${getTime(data.time)} - ${data.name}: </strong>${data.msg}</p>`,
    );
  }
});
$nameForm.addEventListener('submit', submitName);
