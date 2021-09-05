import { io } from 'socket.io-client';
import './index.scss';
import ClientGame from './client/ClientGame';
import { getTime } from './common/util';
window.addEventListener('load', async() => {
  const socket = io('https://jsprochat.herokuapp.com');
  const world = await fetch ('https://jsmarathonpro.herokuapp.com/api/v1/world').then(res => res.json());
  const sprites = await fetch ('https://jsmarathonpro.herokuapp.com/api/v1/sprites').then(res => res.json());
  const gameObjects = await fetch ('https://jsmarathonpro.herokuapp.com/api/v1/gameObjects').then(res => res.json());
  console.log('#### world', world);
  console.log('#### sprites', sprites);
  console.log('#### gameObjects', gameObjects);

  const $startGame = document.querySelector('.start-game');
  const $nameForm = document.getElementById('nameForm');
  const $inputName = document.getElementById('name');
  const $chatWrap = document.querySelector('.chat-wrap');
  const $form = document.getElementById('form');
  const $input = document.getElementById('input');
  const $message = document.querySelector('.message');

  $startGame.style.display = 'flex';

  const submitName = (e) => {
    e.preventDefault();
    if ($inputName.value) {
      ClientGame.init({ tagId: 'game', playerName: $inputName.value , world, sprites,gameObjects,
          apiCfg:{
        url:'https://jsmarathonpro.herokuapp.com/',path:'/game'
        }});
    }
    $chatWrap.style.display = 'block';
    $nameForm.removeEventListener('submit', submitName);
    $startGame.remove();
    socket.emit('start', $inputName.value);
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
});
