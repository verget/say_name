
const { Composer} = require('micro-bot');
const app = new Composer();
const fs = require('fs');

app.command('start', (ctx) => ctx.reply('Welcome!'));

app.command('count', (ctx) => {
  let names = JSON.parse(fs.readFileSync('names.json', 'utf8'));
  ctx.reply(names.length);
});

app.command('all', (ctx) => {
  let names = JSON.parse(fs.readFileSync('names.json', 'utf8'));
  let namesString = '';
  for (let i of names) {
    namesString += i.title + '\n';
  }
  ctx.reply(namesString);
});

app.command('random', (ctx) => {
  let names = JSON.parse(fs.readFileSync('names.json', 'utf8'));
  let random = Math.floor(Math.random() * names.length);
  ctx.reply(names[random].title);
});

app.command('top', (ctx) => {
  let names = JSON.parse(fs.readFileSync('names.json', 'utf8'));
  
  names.sort((a, b) => {
    if (a.count < b.count)
      return 1;
    if (a.count > b.count)
      return -1;
    return 0;
  });
  
  let topString = '';
  
  for (let i of names.slice(0, 10)) {
    topString += '- ' + i.title + ': ' + i.count + '\n'
  }

  ctx.reply(topString);
});

app.command('test', ctx => {
  console.log(ctx.update.message);
});

app.hears('а как?', ({ reply }) => {
  console.log('THEY KNOW!!!');
  reply('а никак!')
});

app.hears('а как', ({ reply }) => {
  console.log('THEY KNOW!!!');
  reply('а никак!')
});

app.hears('как?', ({ reply }) => {
  console.log('THEY KNOW!!!');
  reply('а никак!')
});

const saveName = (name) => {
  if (name.length < 3) {
    return false;
  }
  let names = JSON.parse(fs.readFileSync('names.json', 'utf8'));
  console.log(name);
  name = name.toLowerCase();
  let found = false;
  names.find((oldName) => {
    if (oldName.title == name) {
      oldName.count++;
      found = true;
    }
  });
  if (!found) {
    names.push({
      title: name, count: 1
    });
  }
  fs.writeFile('names.json', JSON.stringify(names), (err) => {
    if (err) {
      console.error(err);
    }
  })
};

app.hears(/.*/, (ctx) => {
  saveName(ctx.update.message.text);
  
  
  if (ctx.update.message.text == 'андрей' || ctx.update.message.text == 'Андрей') {
     return ctx.reply('Хороший вариант, но нет');
  }
  if (ctx.update.message.text == 'вова' || ctx.update.message.text == 'Вова') {
    return ctx.reply('Хороший вариант, выборы скоро, но нет');
  }
  if (ctx.update.message.text == 'размик' || ctx.update.message.text == 'Размик') {
    return ctx.reply('Ну ладно ладно, убедила...шутка - нет');
  }
  if (ctx.update.message.text == 'рита' || ctx.update.message.text == 'Рита') {
    return ctx.reply('--_--');
  }
  if (ctx.update.message.text == 'ян' ||
      ctx.update.message.text == 'влад' ||
      ctx.update.message.text == 'дима' ||
      ctx.update.message.text == 'саша' ||
      ctx.update.message.text == 'Саша') {
    return ctx.reply('Ну сколько можно то, а?');
  }

  if (ctx.update.message.text == 'рома' || ctx.update.message.text == 'Рома') {
    return ctx.reply('Рома, Рома - чума..');
  }
  if (ctx.update.message.text == 'платон' || ctx.update.message.text == 'Платон') {
    return ctx.reply('.. мне друг, но истина дороже!');
  }
  if (ctx.update.message.text == 'сэм' || ctx.update.message.text == 'Сэм' || ctx.update.message.text.length > 9) {
    return ctx.reply('серьезно?');
  }
  if (ctx.update.message.text == 'чубака' ||
      ctx.update.message.text == 'катя' ||
      ctx.update.message.text == 'Катя' ||
      ctx.update.message.text == 'рита' ||
      ctx.update.message.text == 'жак' ||
      ctx.update.message.text == 'боб' ||
      ctx.update.message.text == 'лена' ||
      ctx.update.message.text == 'лев' ||
      ctx.update.message.text == 'кот' ||
      ctx.update.message.text == 'роберт'
  ) {
    ctx.reply('да!');
    setTimeout(() => {
      return ctx.reply('шутка');
    }, 3000)
  } else {
    return ctx.reply('неа, попробуй еще');
  }
  
});


module.exports = app;