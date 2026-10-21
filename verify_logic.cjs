// Execute the app's JavaScript in a small DOM harness without external packages.
// This checks application logic after the merge; it is not a browser layout test.
const fs = require('fs');
const vm = require('vm');
const path = require('path');
const root=__dirname;
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const code=html.match(/<script>([\s\S]*?)<\/script>/)[1];
const saved=new Map();
const checks=[];
class Element {
  constructor(){this.children=[];this.handlers={};this.value='';this.checked=false;this.hidden=false;this.textContent='';}
  append(...items){this.children.push(...items)}
  replaceChildren(...items){this.children=[...items]}
  setAttribute(name,value){this[name]=value}
  addEventListener(name,fn){this.handlers[name]=fn}
  focus(){}
}
function start(){
  const elements={};
  const document={
    getElementById(id){return elements[id]??(elements[id]=new Element())},
    createElement(){return new Element()},
    querySelector(){return this.getElementById('tip')}
  };
  for(const match of html.matchAll(/\bid="([^"]+)"/g)) document.getElementById(match[1]);
  document.getElementById('view-filter').value='all';
  const context=vm.createContext({document,structuredClone,Date,Math,
    localStorage:{getItem:k=>saved.get(k)??null,setItem:(k,v)=>saved.set(k,v)}});
  vm.runInContext(code,context);
  return {context,elements,document,read:expression=>vm.runInContext(expression,context)};
}
function check(value,message){if(!value)throw Error(message);checks.push('PASS '+message)}
let app=start();
check(app.elements.tasks.children.length===3,'Initial task list renders three entries');
check(app.elements.progress.textContent==='1 of 3 tasks complete','Progress summary from first branch is correct');
app.elements['task-name'].value='Finish competency reflection';
app.elements.course.value='Capstone';app.elements.priority.value='High';
app.elements['task-form'].handlers.submit({preventDefault(){},target:{reset(){}}});
check(app.read('tasks.length')===4,'Custom task can be added');
const box=app.elements.tasks.children[1].children[0];box.checked=true;box.handlers.change();
check(app.elements.progress.textContent==='2 of 4 tasks complete','Completing a task updates progress');
app.elements['view-filter'].value='done';app.elements['view-filter'].handlers.change();
check(app.elements.tasks.children.length===2,'Completed filter from second branch works');
app.elements['view-filter'].value='open';app.elements['view-filter'].handlers.change();
check(app.elements.tasks.children.length===2,'Open filter excludes completed tasks');
app=start();
check(app.read('tasks.length')===4 && app.elements.progress.textContent==='2 of 4 tasks complete','Saved tasks and completion state load in a new page context');
const remove=app.elements.tasks.children[3].children[2];remove.handlers.click();
check(app.read('tasks.length')===3,'Task removal works');
const text='Local JavaScript logic verification using a lightweight DOM harness.\nNot a real browser rendering test.\n\n'+checks.join('\n')+'\n';
fs.writeFileSync(path.join(root,'evidence/05_logic_verification.txt'),text);
console.log(text);
