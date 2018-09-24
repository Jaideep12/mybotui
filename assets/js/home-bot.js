
var homeBot = BotUI('home-demo');

homeBot.message.add({
  content: 'Bonjour, Je suis l\'assistant du site Internet "pour 1 besoin"'
 }).then(function () {
    return homeBot.message.add({
      delay: 1200,
      content: 'Cette expérience a été crée pour vous permettre de tout savoir sur mes prestations'
    });
  }).then(function () {
  return homeBot.message.add({
    delay: 1500,
    content: 'Voudriez-vous voir les prestations ?'
  });
}).then(function () {
  return homeBot.action.button({
    delay: 1000,
    action: [{
      text: 'Voir les prestations !',
      value: 'skip'
    }, {
      text: 'Envoyé un message',
      value: 'sure'
    }]
  });
}).then(function (res) {
  ga_record('btn_click', res.value);
  if(res.value == 'sure') {
    rmessage();
  }
  if(res.value == 'skip') {
    prestations();
  }
});

var rmessage = function () {
  homeBot.message.add({
    delay: 1000,
    content: "D\'accord, quel est votre prénom ?"
  }).then(function () {
    return homeBot.action.text({
      delay: 1000,
      action: {
        value: '',
        placeholder: 'votre prénom'
      }
    });
  }).then(function (res) {
    return homeBot.message.bot({
      delay: 1000,
      content: res.value + ' ! Bienvenue, moi c\'est Rodolphe'
    });
  }).then(function (res) {
    return homeBot.message.bot({
      delay: 1000,
      content: 'Vous avez une question ?'
    });
  }).then(askAddress);
};

var askAddress = function () {
  homeBot.message.add({
    delay: 1000,
    content: "Laissez moi votre email pour une réponse"
  }).then(function () {
    return homeBot.action.text({
      delay: 800,
      action: {
        size: 30,
        icon: 'mail',
        value: '',
        placeholder: 'votre email'
      }
    });
  }).then(function (res) {
    return homeBot.message.bot({
      delay: 800,
      content: 'Votre email : ' + res.value
    });

  }).then(function (res) {
      return homeBot.action.button({
        delay: 1000,
        action: [{
          icon: 'check',
          text: 'Je confirme',
          value: 'confirm'
        }, {
          icon: 'pencil',
          text: 'Edition de l\'adresse mail',
          value: 'edit'
        }]
      })
    }).then(function (res) {
      if(res.value == 'confirm') {
        smessage();
      } else {
        askAddress();
      }
  })
};

var smessage = function () {
  homeBot.message.add({
    delay: 1000,
    content: "Votre message"
  }).then(function () {
    return homeBot.action.text({
      delay: 800,
      action: {
      size: 40,
      placeholder: 'Message'
      }
    });
  }).then(function (res) {
    return homeBot.message.bot({
      delay: 800,
      content: 'Votre message : ' + res.value
    });

  }).then(function (res) {
      return homeBot.action.button({
        delay: 1000,
        action: [{
          icon: 'check',
          text: 'ok, envoyé le message',
          value: 'confirm'
        }, {
          icon: 'pencil',
          text: 'Recommencer',
          value: 'edit'
        }]
      })
    }).then(function (res) {
      if(res.value == 'confirm') {
        send();
      } else {
        smessage();
      }
  })
};

var send = function () {
  homeBot.message.add({
      delay: 500,
      content: 'Merci. Votre message sera envoyé.'
    });
}

var prestations = function () {
  homeBot.message.add({
    delay: 1000,
    content: '[Conseil en stratégie de l’innovation numérique](https://pour1besoin.fr/prestation)'
  }).then(function (res) {
    return homeBot.message.add({
      delay: 1500,
      type: 'embed',
      content: 'https://giphy.com/embed/v1PSPwbLIrata'
    });
   }).then(function (res) {
    return homeBot.message.add({
      delay: 1500,
      content: 'Création de site Web'
    });
   }).then(function (res) {
    return homeBot.message.add({
      delay: 1500,
      type: 'embed',
      content: 'https://giphy.com/embed/hMOUzHtFPtsru'
    });
   }).then(function (res) {
    return homeBot.message.add({
      delay: 1500,
      content: 'Étude et conseil en référencement naturel'
    });
   }).then(function (res) {
    return homeBot.message.add({
      delay: 1500,
      content: 'Objectif pour renforcer l\'attractivité de votre marque'
    });
   }).then(function (res) {
    return homeBot.message.add({
      delay: 1500,
      content: '!(book) [Voir l\'ensemble des prestations](https:///docs.botui.org), ou voir mon compte !(instagram) [Instagram](https://www.instagram.com/rodolphe_photography/)'
    });
  });
};

var end = function () {
  ga_record('message', 'end');
  homeBot.message.add({
    delay: 1000,
    content: '!(book) [Read the docs](https:///docs.botui.org), see [examples](https:///examples.botui.org) or explore the code on !(github) [GitHub](https://github.com/moinism/botui)'
  });
};

var ga_record = function(type, action) {
  if(ga) {
    ga('send', {
      hitType: 'event',
      eventCategory: type,
      eventAction: action
    });
  }
}

