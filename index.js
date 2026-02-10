// Description:
//   TODO を管理できるボットです
// Commands:
//   add      - TODO を作成
//   done     - TODO を完了にする
//   del      - TODO を消す
//   list     - TODO の一覧表示
//   donelist - 完了した TODO の一覧表示

'use strict';
const bolt = require('@slack/bolt');
const todo = require('./index.js');

const app =new bolt.App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
  logLevel: 'debug'
});

app.message(/add (.+)/i, ({context, say}) => {
  const taskName = context.matches[1].trim();
  todo.add(taskName);
  say(`追加しました: ${taskName}`);
});

app.message(/done (.+)/i, ({context, say}) => {
  const taskName = context.matches[1].trim();
  todo.done(taskName);
  say(`完了にしました: ${taskName}`);
});
 
app.message(/del (.+)/i, ({context, say}) => {
  const taskName = context.matches[1].trim();
  todo.del(taskName);
  say(`削除しました: ${taskName}`);
});
 
app.message(/^list/i, ({say}) => {
   const tasks = todo.list();
  if (tasks.length === 0){
  say('現在TODOはありません');
  } else{
    say(tasks.join('\n'));
  }
});

app.message(/donelist/i, ({say}) => {
  const doneTasks = todo.donelist();
   if (doneTasks.length === 0){
  say('完了したTODOはありません');
  } else{
    say(doneTasks.join('\n'));
  }
});


app.start();
