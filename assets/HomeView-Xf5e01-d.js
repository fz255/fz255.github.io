import{L as _,G as n,l as p}from"./locale-Dl6Cr3iI.js";import{e as u,r as m,o as l,c as d,a as s,f as i,w as c,y as f,h as g,d as h}from"./index-Dn4RknuI.js";const b={class:"container noprint"},v=s("br",null,null,-1),y={class:"row"},w={key:0,id:"loading"},C={class:"card mb-4"},B={class:"card-body"},N={class:"p-3"},V=s("p",null,[h("Двойной статус - это наличие записи о человеке одновременно"),s("br"),h("в реестре иностранных агентов Минюста и в реестре экстремистов/террористов Росфинмониторинга."),s("br")],-1),k={class:"card mb-4"},x=s("div",{align:"left",class:"card-header"},[s("span",{class:"small ms-1"},"Загрузка...")],-1),E={class:"card-body"},H={class:"progress",role:"progressbar"},j=s("div",{id:"reestr"},null,-1),z={data(){return{loaded:!1,progress:0,grid:new _}},mounted(){this.progress=20,fetch("https://raw.githubusercontent.com/fz255/foreign-agents/main/registry.json").then(r=>r.json()).then(r=>{this.progress=50,fetch("https://apiv2.li0ard.rest/cors?url=https://extrem.ishukshin.ru/json/all").then(t=>t.json()).then(t=>{this.progress=60,r=r.filter(e=>e.dob!="").map(e=>[e.fullName.toUpperCase().trim().replace(/ \(.+\)/gm,""),e.dob,e.dateIn]),this.progress=80,t=t.filter(e=>!!e.birth).map(e=>[e.name_full.replace("*",""),e.birth.replace(" г.р.",""),e.added_at]);let a=[];for(let e of r)t.filter(o=>o[0]==e[0]&&o[1]==e[1]).length!=0&&a.push([...e,t.filter(o=>o[0]==e[0]&&o[1]==e[1])[0][2]]);this.progress=100,this.grid.updateConfig({columns:["ФИО",{name:"Дата рождения",sort:!1},{name:n("Включение в реестр<br>Минюста"),sort:!1},{name:n("Включение в реестр<br>Росфинмониторинга"),sort:!1,formatter:e=>(e=e.replace("BEFORE","до 08.2018"),e)}],data:a,pagination:{limit:10},sort:!0,fixedHeader:!0,search:{ignoreHiddenColumns:!1},language:p}),this.loaded=!0,this.grid.render(document.getElementById("reestr"))})})}},F=u({...z,__name:"HomeView",setup(r){return(t,a)=>{const e=m("center");return l(),d("main",null,[s("div",b,[v,s("div",y,[i(e,null,{default:c(()=>[t.loaded?g("",!0):(l(),d("div",w,[s("div",C,[s("div",B,[i(e,null,{default:c(()=>[s("div",N,[V,s("div",k,[x,s("div",E,[s("div",H,[s("div",{id:"bar",class:"progress-bar",style:f(`width: ${t.progress}%;`)},null,4)])])])])]),_:1})])])])),j]),_:1})])])])}}});export{F as default};
