import{V as C}from"./vendor.b0a03f26.js";function E(){import("data:text/javascript,")}const g=function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))u(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&u(l)}).observe(document,{childList:!0,subtree:!0});function e(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerpolicy&&(r.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?r.credentials="include":n.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function u(n){if(n.ep)return;n.ep=!0;const r=e(n);fetch(n.href,r)}};g();var A=function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("button",{staticClass:"color-button",class:t.dynamicClasses,attrs:{value:t.color},on:{click:t.handleColorButtonClick}})},w=[];function c(t,o,e,u,n,r,l,m){var s=typeof t=="function"?t.options:t;o&&(s.render=o,s.staticRenderFns=e,s._compiled=!0),u&&(s.functional=!0),r&&(s._scopeId="data-v-"+r);var a;if(l?(a=function(i){i=i||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,!i&&typeof __VUE_SSR_CONTEXT__!="undefined"&&(i=__VUE_SSR_CONTEXT__),n&&n.call(this,i),i&&i._registeredComponents&&i._registeredComponents.add(l)},s._ssrRegister=a):n&&(a=m?function(){n.call(this,(s.functional?this.parent:this).$root.$options.shadowRoot)}:n),a)if(s.functional){s._injectStyles=a;var p=s.render;s.render=function(y,h){return a.call(h),p(y,h)}}else{var d=s.beforeCreate;s.beforeCreate=d?[].concat(d,a):[a]}return{exports:t,options:s}}const B={name:"ColorButton",props:{color:{type:String,required:!0},isActive:{type:Boolean,required:!0}},computed:{dynamicClasses(){return{[`color-button--${this.color}`]:this.color,"color-button--active":this.isActive}}},methods:{handleColorButtonClick(t){this.$emit("on-color-button-click",t.target.value)}}},_={};var b=c(B,A,w,!1,S,"2d2d53c0",null,null);function S(t){for(let o in _)this[o]=_[o]}var R=function(){return b.exports}(),$=function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("div",{staticClass:"menu"},[e("div",[e("h2",[t._v("\u0420\u0430\u0443\u043D\u0434: "+t._s(t.isGameStarted?t.round:"-"))]),e("button",{staticClass:"menu__input",attrs:{disabled:t.isGameStarted},on:{click:t.handleStartButtonClick}},[t._v("\u041D\u0430\u0447\u0430\u0442\u044C")])]),e("div",[e("h2",[t._v("\u0421\u043B\u043E\u0436\u043D\u043E\u0441\u0442\u044C:")]),e("select",{staticClass:"menu__input",attrs:{disabled:t.isGameStarted},domProps:{value:t.difficulty},on:{change:t.handleSelectChange}},[e("option",{attrs:{value:"easy"}},[t._v("\u041B\u0435\u0433\u043A\u0430\u044F")]),e("option",{attrs:{value:"medium"}},[t._v("\u041D\u043E\u0440\u043C\u0430\u043B\u044C\u043D\u0430\u044F")]),e("option",{attrs:{value:"hard"}},[t._v("\u0421\u043B\u043E\u0436\u043D\u0430\u044F")])])])])},k=[];const G={name:"Menu",props:{isGameStarted:{type:Boolean,required:!0},round:{type:Number,required:!0},difficulty:{type:String,required:!0}},methods:{handleStartButtonClick(){this.$emit("on-start-button-click")},handleSelectChange(t){this.$emit("on-select-change",t.target.value)}}},f={};var x=c(G,$,k,!1,F,"2dc677aa",null,null);function F(t){for(let o in f)this[o]=f[o]}var N=function(){return x.exports}(),T=function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("div",{staticClass:"app"},[e("h2",{staticClass:"you-lost-message",class:{"you-lost-message--visible":t.lastCompletedRound!==null}},[t._v(" \u0412\u044B \u043F\u0440\u043E\u0438\u0433\u0440\u0430\u043B\u0438! \u041F\u0440\u043E\u0439\u0434\u0435\u043D\u043E \u0440\u0430\u0443\u043D\u0434\u043E\u0432: "+t._s(t.lastCompletedRound)+" ")]),e("div",{staticClass:"playing-field"},[e("div",{staticClass:"button-set"},[e("div",{staticClass:"button-row"},[e("ColorButton",{attrs:{color:"green",isActive:t.colorButtons.green.isActive},on:{"on-color-button-click":t.handleColorButtonClick}}),e("ColorButton",{attrs:{color:"red",isActive:t.colorButtons.red.isActive},on:{"on-color-button-click":t.handleColorButtonClick}})],1),e("div",{staticClass:"button-row"},[e("ColorButton",{attrs:{color:"yellow",isActive:t.colorButtons.yellow.isActive},on:{"on-color-button-click":t.handleColorButtonClick}}),e("ColorButton",{attrs:{color:"blue",isActive:t.colorButtons.blue.isActive},on:{"on-color-button-click":t.handleColorButtonClick}})],1)]),e("Menu",{attrs:{isGameStarted:t.isGameStarted,round:t.round,difficulty:t.difficulty},on:{"on-start-button-click":t.handleStartButtonClick,"on-select-change":t.handleSelectChange}})],1)])},M=[];const I={name:"App",components:{ColorButton:R,Menu:N},data(){return{round:1,lastCompletedRound:null,isGameStarted:!1,isWaitingForAnswer:!1,rightAnswers:[],currentRightAnswerIndex:0,difficulty:"easy",difficultyDelay:{easy:1500,medium:1e3,hard:400},colorButtons:{green:{name:"green",isActive:!1},red:{name:"red",isActive:!1},yellow:{name:"yellow",isActive:!1},blue:{name:"blue",isActive:!1}},sounds:{green:new Audio("sounds/green.mp3"),red:new Audio("sounds/red.mp3"),yellow:new Audio("sounds/yellow.mp3"),blue:new Audio("sounds/blue.mp3"),error:new Audio("sounds/error.wav")}}},methods:{handleStartButtonClick(){this.startTheGame()},handleSelectChange(t){this.difficulty=t},handleColorButtonClick(t){if(!this.isGameStarted){this.playSound(this.sounds[t]);return}if(!!this.isWaitingForAnswer){if(t!==this.rightAnswers[this.currentRightAnswerIndex].name){this.loseTheGame();return}this.playSound(this.sounds[t]),this.currentRightAnswerIndex++,this.currentRightAnswerIndex===this.rightAnswers.length&&this.goNextRound()}},getRandomInt(t,o){const e=t+Math.random()*(o+1-t);return Math.floor(e)},getRandomColorButton(){const t=Object.entries(this.colorButtons)[this.getRandomInt(0,3)][0];return this.colorButtons[t]},delay(t,o){return new Promise(e=>setTimeout(()=>{t(),e()},o))},addNextColorButton(){const t=this.getRandomColorButton();this.rightAnswers.push(t)},playSound(t){new Audio(t.src).play()},async playRound(){this.isWaitingForAnswer=!1;for(const t of this.rightAnswers)this.playSound(this.sounds[t.name]),t.isActive=!0,await this.delay(()=>{t.isActive=!1},this.difficultyDelay[this.difficulty]-100),await this.delay(()=>{},100);this.isWaitingForAnswer=!0},async goNextRound(){this.round++,this.currentRightAnswerIndex=0,this.isWaitingForAnswer=!1,await this.delay(()=>{},800),this.addNextColorButton(),this.playRound()},startTheGame(){this.lastCompletedRound=null,this.isGameStarted=!0,this.addNextColorButton(),this.playRound()},restartTheGame(){this.round=1,this.isGameStarted=!1,this.isWaitingForAnswer=!1,this.rightAnswers=[],this.currentRightAnswerIndex=0},loseTheGame(){this.lastCompletedRound=this.round-1,this.playSound(this.sounds.error),this.restartTheGame()}}},v={};var O=c(I,T,M,!1,W,"0dbf64f6",null,null);function W(t){for(let o in v)this[o]=v[o]}var q=function(){return O.exports}();new C({render:t=>t(q)}).$mount("#app");export{E as __vite_legacy_guard};