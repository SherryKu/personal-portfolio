import{i as e,l as t,n,o as r,r as i,s as a,t as o}from"./hn-c120-shared-xpJ6c523.js";typeof document<`u`&&document.currentScript&&`src`in document.currentScript&&document.currentScript.src;function s(){{let e=import.meta.url;return new URL(`./`,e).href}}function c(e){if(!e)return s();let t=new URL(e,document.baseURI).href;return t.endsWith(`/`)?t:`${t}/`}var l=`
:host {
  --hn-ink: #041f46;
  --hn-primary: #072e66;
  --hn-accent: #f37021;
  --hn-muted: #667085;
  --hn-border: #e6eaf0;
  --hn-surface: #ffffff;
  --hn-soft: #f2f6fb;
  --hn-stage: linear-gradient(168deg, #f6f8fb 0%, #e9eef5 48%, #d7dfea 100%);
  --hn-radius: 14px;
  display: block;
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  min-height: 360px;
  color: var(--hn-ink);
  font-family: inherit;
  font-size: 14px;
  line-height: 1.4;
  contain: layout style;
}
@media (max-width: 640px) {
  :host { aspect-ratio: 3 / 4.5; min-height: 480px; }
}
:host([hidden]) { display: none; }
*, *::before, *::after { box-sizing: border-box; }

.root {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--hn-border);
  border-radius: var(--hn-radius);
  background: var(--hn-surface);
}

/* ---------- stage ---------- */
.stage {
  position: relative;
  flex: 1 1 auto;
  min-height: 0;
  overflow: hidden;
  background: var(--hn-stage);
  outline: none;
  cursor: grab;
  -webkit-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}
.stage:active { cursor: grabbing; }
.stage:focus-visible { box-shadow: inset 0 0 0 3px rgba(243, 112, 33, 0.55); }
.canvas { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
.poster {
  position: absolute; inset: 0; width: 100%; height: 100%;
  object-fit: contain; pointer-events: none;
  transition: opacity 0.35s ease;
}
.root[data-ready] .poster { opacity: 0; }
.poster[hidden] { display: none; }
.root[data-reduced] .poster { transition: none; }

.sr-only {
  position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0;
  overflow: hidden; clip-path: inset(50%); white-space: nowrap; border: 0;
}
.status {
  position: absolute; left: 50%; bottom: 16px; transform: translateX(-50%);
  max-width: calc(100% - 32px);
  padding: 8px 14px; border-radius: 999px;
  background: rgba(255, 255, 255, 0.94); border: 1px solid var(--hn-border);
  color: var(--hn-ink); font-size: 13px; text-align: center;
  box-shadow: 0 8px 28px rgba(4, 31, 70, 0.07);
}
.status:empty { display: none; }
.root[data-fallback] .status { border-radius: 12px; }

.hint {
  position: absolute; left: 50%; top: 12px; transform: translateX(-50%);
  max-width: calc(100% - 24px);
  padding: 6px 12px; border-radius: 999px;
  background: rgba(4, 31, 70, 0.82); color: #fff; font-size: 12.5px; text-align: center;
  opacity: 0; pointer-events: none; transition: opacity 0.25s ease;
}
.hint[data-show] { opacity: 1; }
.root[data-reduced] .hint { transition: none; }

.stats {
  position: absolute; left: 10px; top: 10px;
  padding: 4px 8px; border-radius: 6px;
  background: rgba(4, 31, 70, 0.78); color: #fff;
  font: 12px/1.3 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  pointer-events: none;
}
.stats:empty { display: none; }

.reset {
  position: absolute; right: 10px; top: 10px;
}

/* ---------- labels ---------- */
.labels, .captions { position: absolute; inset: 0; pointer-events: none; }
.leaders { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
.leader-back { stroke: rgba(255, 255, 255, 0.9); stroke-width: 3.2; stroke-linecap: round; }
.leader { stroke: var(--hn-primary); stroke-width: 1.1; stroke-linecap: round; }
.leader-dot { fill: var(--hn-primary); stroke: #fff; stroke-width: 1.2; }
.label {
  position: absolute; left: 0; top: 0;
  display: flex; flex-direction: column; align-items: flex-start; gap: 1px;
  margin: 0; padding: 5px 9px 6px;
  border: 1px solid var(--hn-border); border-radius: 8px;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 4px 14px rgba(4, 31, 70, 0.08);
  color: var(--hn-ink); font: inherit; text-align: left; white-space: nowrap;
  cursor: pointer; pointer-events: auto;
  will-change: transform;
}
.label:hover { border-color: rgba(7, 46, 102, 0.45); }
.label:focus-visible { outline: 3px solid rgba(243, 112, 33, 0.55); outline-offset: 1px; }
.label.selected { border-color: var(--hn-accent); box-shadow: 0 0 0 1px var(--hn-accent), 0 4px 14px rgba(4, 31, 70, 0.1); }
.label-name { font-size: 13px; font-weight: 650; letter-spacing: -0.005em; }
.label-no { font-size: 11px; color: var(--hn-muted); font-variant-numeric: tabular-nums; letter-spacing: 0.01em; }

.caption {
  position: absolute; left: 0; top: 0;
  display: flex; flex-direction: column; align-items: center; gap: 1px;
  text-align: center; line-height: 1.25;
}
.caption-name { font-size: 13px; font-weight: 650; }
.caption-material { font-size: 11.5px; color: var(--hn-muted); }
.caption-note { position: absolute; left: 0; right: 0; bottom: 8px; text-align: center; font-size: 11.5px; color: var(--hn-muted); }
.root[data-compact] .caption-name { font-size: 11px; }
.root[data-compact] .caption-material { font-size: 9.5px; }
.root[data-sheet] .controls { display: none; }
/* Without a renderer the controls would do nothing: show the poster and the message only. */
.root[data-fallback] .controls, .root[data-fallback] .reset { display: none; }
.root[data-fallback] .stage { cursor: default; }

/* ---------- controls ---------- */
.controls {
  flex: 0 0 auto;
  display: flex; flex-wrap: wrap; align-items: center; gap: 10px 18px;
  padding: 10px 14px;
  border-top: 1px solid var(--hn-border);
  background: var(--hn-surface);
}
.group { display: flex; align-items: center; gap: 8px; min-width: 0; }
.group[hidden] { display: none; }
.segmented { gap: 0; padding: 3px; border-radius: 10px; background: var(--hn-soft); }
.grow { flex: 1 1 240px; }
.spacer { flex: 1 1 0; }

button {
  font: inherit; color: inherit;
}
.btn, .segmented button {
  min-height: 36px; padding: 6px 13px;
  border: 1px solid transparent; border-radius: 8px;
  background: transparent; color: #344054;
  font-size: 13px; font-weight: 620; white-space: nowrap;
  cursor: pointer;
}
.segmented button[aria-pressed="true"] {
  background: var(--hn-surface); color: var(--hn-primary);
  border-color: var(--hn-border);
  box-shadow: 0 1px 3px rgba(4, 31, 70, 0.1);
}
.btn { border-color: rgba(7, 46, 102, 0.3); background: var(--hn-surface); color: var(--hn-primary); }
.btn:hover, .segmented button:hover { color: var(--hn-primary); }
.btn.primary { background: var(--hn-primary); border-color: var(--hn-primary); color: #fff; min-width: 76px; }
.btn.small { min-height: 30px; padding: 4px 10px; font-size: 12px; background: rgba(255, 255, 255, 0.92); }
button:focus-visible, input:focus-visible, select:focus-visible {
  outline: 3px solid rgba(243, 112, 33, 0.55); outline-offset: 2px;
}

label { font-size: 13px; font-weight: 620; color: #344054; white-space: nowrap; }
output { min-width: 62px; font-size: 13px; font-variant-numeric: tabular-nums; color: var(--hn-ink); text-align: right; white-space: nowrap; }
input[type="range"] {
  flex: 1 1 120px; min-width: 90px; height: 28px; margin: 0;
  accent-color: var(--hn-primary);
  cursor: pointer;
}
select {
  min-height: 36px; max-width: 100%; padding: 4px 8px;
  border: 1px solid var(--hn-border); border-radius: 8px;
  background: var(--hn-surface); color: var(--hn-ink); font: inherit; font-size: 13px;
}
.note { flex: 1 1 100%; margin: 0; font-size: 12px; color: var(--hn-muted); }
.note[hidden] { display: none; }

.root[data-compact] .controls { gap: 8px 10px; padding: 9px 10px; }
.root[data-compact] .segmented { flex: 1 1 100%; }
.root[data-compact] .segmented button { flex: 1 1 0; padding: 6px 6px; min-height: 40px; }
.root[data-compact] .grow { flex: 1 1 100%; }
.root[data-compact] .btn { min-height: 40px; }
.root[data-compact] .picker { flex: 1 1 100%; }
.root[data-compact] .picker select { flex: 1 1 auto; min-height: 40px; }
.root[data-compact] .spacer { display: none; }

@media (prefers-reduced-motion: reduce) {
  .poster, .hint { transition: none; }
}
`,u=[`mode`,`explode`,`speed`,`paused`,`phase`,`direction`,`view`,`lang`,`show-part-no`,`poster`,`asset-base`,`show-fps`,`debug`];function d(e,t,n,r){if(e===null||e.trim()===``)return t;let i=Number(e);return Number.isFinite(i)?Math.min(r,Math.max(n,i)):t}function f(e,t){return e===null?t:!/^(false|0|no|off)$/i.test(e.trim())}function p(){try{let e=document.createElement(`canvas`).getContext(`webgl2`);return e?(e.getExtension(`WEBGL_lose_context`)?.loseContext(),!0):!1}catch{return!1}}var m=typeof HTMLElement>`u`?class{}:HTMLElement,h=class extends m{constructor(){super(),o(this,`shadow`,void 0),o(this,`reducedMotion`,window.matchMedia(`(prefers-reduced-motion: reduce)`)),o(this,`coarsePointer`,window.matchMedia(`(pointer: coarse)`)),o(this,`viewer`,null),o(this,`loadState`,`idle`),o(this,`intersection`,null),o(this,`resize`,null),o(this,`compact`,!1),o(this,`selected`,null),o(this,`hintTimer`,0),o(this,`lastHint`,0),o(this,`settled`,void 0),o(this,`settle`,()=>{}),o(this,`built`,!1),o(this,`loadToken`,0),o(this,`listKey`,``),o(this,`root`,void 0),o(this,`stage`,void 0),o(this,`poster`,void 0),o(this,`labelRoot`,void 0),o(this,`captionRoot`,void 0),o(this,`status`,void 0),o(this,`partsList`,void 0),o(this,`hint`,void 0),o(this,`stats`,void 0),o(this,`resetButton`,void 0),o(this,`modeButtons`,void 0),o(this,`viewButtons`,void 0),o(this,`modeGroup`,void 0),o(this,`viewGroup`,void 0),o(this,`explodeGroup`,void 0),o(this,`explodeLabel`,void 0),o(this,`explodeInput`,void 0),o(this,`explodeOutput`,void 0),o(this,`meshGroup`,void 0),o(this,`playButton`,void 0),o(this,`speedLabel`,void 0),o(this,`speedInput`,void 0),o(this,`speedOutput`,void 0),o(this,`pickerGroup`,void 0),o(this,`pickerLabel`,void 0),o(this,`picker`,void 0),o(this,`note`,void 0),o(this,`onMotionChange`,()=>this.sync()),this.shadow=this.attachShadow({mode:`open`}),this.settled=new Promise(e=>this.settle=e)}get mode(){return this.getAttribute(`mode`)===`mesh`?`mesh`:`explode`}set mode(e){this.setAttribute(`mode`,e===`mesh`?`mesh`:`explode`)}get explode(){return d(this.getAttribute(`explode`),0,0,1)}set explode(e){this.setAttribute(`explode`,String(Math.min(1,Math.max(0,Number(e)||0))))}get speed(){return d(this.getAttribute(`speed`),t.speedDefault,t.speedMin,t.speedMax)}set speed(e){this.setAttribute(`speed`,String(Math.min(t.speedMax,Math.max(t.speedMin,Number(e)||0))))}get paused(){return f(this.getAttribute(`paused`),this.reducedMotion.matches)}set paused(e){e?this.setAttribute(`paused`,``):this.reducedMotion.matches?this.setAttribute(`paused`,`false`):this.removeAttribute(`paused`)}get phase(){return this.viewer?this.viewer.getPhase():d(this.getAttribute(`phase`),0,-1e9,1e9)}set phase(e){this.setAttribute(`phase`,String(Number(e)||0))}get direction(){let e=this.getAttribute(`direction`);return e===`cw`||e===`ccw`?e:a.direction}set direction(e){this.setAttribute(`direction`,e===`ccw`?`ccw`:`cw`)}get view(){let e=this.getAttribute(`view`);return e===`solid`||e===`ghost`||e===`section`?e:this.mode===`mesh`?`ghost`:`solid`}set view(e){this.setAttribute(`view`,e)}get showPartNo(){return f(this.getAttribute(`show-part-no`),a.showPartNo)}set showPartNo(e){this.setAttribute(`show-part-no`,e?`true`:`false`)}get language(){let e=this.getAttribute(`lang`);return i(e??this.closest(`[lang]`)?.getAttribute(`lang`)??document.documentElement.lang)}get assetBase(){return c(this.getAttribute(`asset-base`))}get posterUrl(){let e=this.getAttribute(`poster`);if(e)return new URL(e,document.baseURI).href;let n=this.getBoundingClientRect(),r=n.width>0&&n.height>n.width*1.05;return this.assetBase+(r?t.posterFile.portrait:t.posterFile[this.language])}async whenIdle(){await this.settled,this.viewer&&await this.viewer.whenIdle()}info(){return this.viewer?{...this.viewer.info(),state:this.loadState}:{state:this.loadState}}resetView(){this.viewer?.resetView()}selectPart(e){this.viewer?.select(e)}connectedCallback(){this.built||this.build(),this.updateCompact(),this.sync(),this.resize=new ResizeObserver(()=>this.updateCompact()),this.resize.observe(this),this.reducedMotion.addEventListener(`change`,this.onMotionChange),this.intersection=new IntersectionObserver(e=>{let t=e.some(e=>e.isIntersecting);t&&this.loadState===`idle`&&this.load(),this.viewer?.setVisible(t)},{rootMargin:`200px`}),this.intersection.observe(this)}disconnectedCallback(){this.intersection?.disconnect(),this.intersection=null,this.resize?.disconnect(),this.reducedMotion.removeEventListener(`change`,this.onMotionChange),window.clearTimeout(this.hintTimer),this.loadToken++,this.viewer?.dispose(),this.viewer=null,this.loadState!==`fallback`&&(this.loadState=`idle`,this.root.removeAttribute(`data-ready`),this.poster.hidden=!1,this.resetButton.hidden=!0,this.status.textContent=``,this.settled=new Promise(e=>this.settle=e))}attributeChangedCallback(e,t,n){this.built&&t!==n&&(e===`phase`?n!==null&&this.viewer?.setPhase(d(n,0,-1e9,1e9)):((e===`asset-base`||e===`poster`)&&(this.poster.src=this.posterUrl),this.sync()))}build(){this.built=!0;let e=document.createElement(`style`);e.textContent=l;let n=(e,t)=>{let n=document.createElement(e);return t&&(n.className=t),n},r=(e,t)=>{let r=n(`button`,e);return r.type=`button`,r.addEventListener(`click`,t),r};this.root=n(`div`,`root`),this.root.setAttribute(`part`,`root`),this.stage=n(`div`,`stage`),this.stage.tabIndex=0,this.stage.setAttribute(`role`,`group`),this.stage.setAttribute(`part`,`stage`),this.poster=n(`img`,`poster`),this.poster.alt=``,this.poster.decoding=`async`,this.poster.loading=`lazy`,this.poster.src=this.posterUrl,this.poster.addEventListener(`error`,()=>this.poster.style.display=`none`),this.labelRoot=n(`div`,`labels`),this.captionRoot=n(`div`,`captions`),this.status=n(`div`,`status`),this.status.setAttribute(`role`,`status`),this.partsList=n(`ul`,`sr-only`),this.hint=n(`div`,`hint`),this.hint.setAttribute(`aria-hidden`,`true`),this.stats=n(`div`,`stats`),this.stats.setAttribute(`aria-hidden`,`true`),this.resetButton=r(`btn small reset`,()=>this.viewer?.resetView()),this.resetButton.hidden=!0,this.stage.append(this.poster,this.labelRoot,this.captionRoot,this.partsList,this.status,this.hint,this.stats,this.resetButton),this.stage.addEventListener(`pointerdown`,e=>{(e.target===this.stage||e.target.classList?.contains(`canvas`))&&this.stage.focus({preventScroll:!0})});let i=n(`div`,`controls`);i.setAttribute(`part`,`controls`),this.modeGroup=n(`div`,`group segmented`),this.modeGroup.setAttribute(`role`,`group`),this.modeButtons={explode:r(``,()=>this.mode=`explode`),mesh:r(``,()=>this.mode=`mesh`)},this.modeGroup.append(this.modeButtons.explode,this.modeButtons.mesh),this.explodeGroup=n(`div`,`group grow`),this.explodeLabel=n(`label`),this.explodeInput=n(`input`),this.explodeInput.type=`range`,this.explodeInput.min=`0`,this.explodeInput.max=`100`,this.explodeInput.step=`1`,this.explodeInput.id=`hn-explode`,this.explodeLabel.htmlFor=`hn-explode`,this.explodeOutput=n(`output`),this.explodeOutput.htmlFor.add(`hn-explode`),this.explodeInput.addEventListener(`input`,()=>this.explode=Number(this.explodeInput.value)/100),this.explodeGroup.append(this.explodeLabel,this.explodeInput,this.explodeOutput),this.meshGroup=n(`div`,`group grow`),this.playButton=r(`btn primary play`,()=>this.paused=!this.paused),this.speedLabel=n(`label`),this.speedInput=n(`input`),this.speedInput.type=`range`,this.speedInput.min=String(t.speedMin),this.speedInput.max=String(t.speedMax),this.speedInput.step=`1`,this.speedInput.id=`hn-speed`,this.speedLabel.htmlFor=`hn-speed`,this.speedOutput=n(`output`),this.speedOutput.htmlFor.add(`hn-speed`),this.speedInput.addEventListener(`input`,()=>this.speed=Number(this.speedInput.value)),this.meshGroup.append(this.playButton,this.speedLabel,this.speedInput,this.speedOutput),this.viewGroup=n(`div`,`group segmented`),this.viewGroup.setAttribute(`role`,`group`),this.viewButtons={solid:r(``,()=>this.view=`solid`),ghost:r(``,()=>this.view=`ghost`),section:r(``,()=>this.view=`section`)},this.viewGroup.append(this.viewButtons.solid,this.viewButtons.ghost,this.viewButtons.section),this.pickerGroup=n(`div`,`group picker`),this.pickerLabel=n(`label`),this.picker=n(`select`),this.picker.id=`hn-part`,this.pickerLabel.htmlFor=`hn-part`,this.picker.addEventListener(`change`,()=>this.viewer?.select(this.picker.value||null)),this.pickerGroup.append(this.pickerLabel,this.picker),this.note=n(`p`,`note`),i.append(this.modeGroup,this.explodeGroup,this.meshGroup,this.viewGroup,this.pickerGroup,this.note),this.root.append(this.stage,i),this.shadow.append(e,this.root)}updateCompact(){let e=this.getBoundingClientRect(),n=e.width>0&&(e.width<t.compactWidth||e.height<440);n!==this.compact&&(this.compact=n,this.sync())}currentState(){let e=this.getAttribute(`debug`);return{mode:this.mode,explode:this.explode,speed:this.speed,paused:this.paused,direction:this.direction,view:this.view,lang:this.language,showPartNo:this.showPartNo,showFps:f(this.getAttribute(`show-fps`),!1),debug:e===`materials`?`materials`:null,reducedMotion:this.reducedMotion.matches,compact:this.compact}}sync(){if(!this.built)return;let t=this.currentState(),i=n[t.lang],a=t.debug===`materials`;this.root.toggleAttribute(`data-compact`,t.compact),this.root.toggleAttribute(`data-reduced`,t.reducedMotion),this.root.toggleAttribute(`data-sheet`,a),this.root.dataset.mode=t.mode,this.stage.setAttribute(`aria-label`,i.ariaModel),this.modeGroup.setAttribute(`aria-label`,i.modeGroup),this.modeButtons.explode.textContent=i.modeExplode,this.modeButtons.mesh.textContent=i.modeMesh;for(let e of[`explode`,`mesh`])this.modeButtons[e].setAttribute(`aria-pressed`,String(t.mode===e));this.viewGroup.setAttribute(`aria-label`,i.viewGroup),this.viewButtons.solid.textContent=i.viewSolid,this.viewButtons.ghost.textContent=i.viewGhost,this.viewButtons.section.textContent=i.viewSection;for(let e of[`solid`,`ghost`,`section`])this.viewButtons[e].setAttribute(`aria-pressed`,String(t.view===e));this.explodeGroup.hidden=t.mode!==`explode`||a,this.explodeLabel.textContent=i.explode;let o=Math.round(t.explode*100);Number(this.explodeInput.value)!==o&&(this.explodeInput.value=String(o)),this.explodeOutput.textContent=`${o}%`,this.meshGroup.hidden=t.mode!==`mesh`||a,this.playButton.textContent=t.paused?i.play:i.pause,this.playButton.setAttribute(`aria-pressed`,String(!t.paused)),this.speedLabel.textContent=i.speed,Number(this.speedInput.value)!==Math.round(t.speed)&&(this.speedInput.value=String(Math.round(t.speed))),this.speedOutput.textContent=`${Math.round(t.speed)} ${i.speedUnit}`,this.note.hidden=t.mode!==`mesh`||a,this.note.textContent=i.speedNote,this.modeGroup.hidden=a,this.viewGroup.hidden=a,this.resetButton.textContent=i.resetView,this.pickerGroup.hidden=!(t.compact&&t.mode===`explode`)||a,this.pickerLabel.textContent=i.partPicker;let s=`${t.lang}|${t.showPartNo}`;if(s!==this.listKey){this.listKey=s;let n=[new Option(i.partPickerNone,``)],a=[];for(let i of e){let e=r(i,t.lang,t.showPartNo);n.push(new Option(e.partNo?`${e.name} · ${e.partNo}`:e.name,i.id));let o=document.createElement(`li`);o.textContent=e.partNo?`${e.name}, ${e.partNo}`:e.name,a.push(o)}this.picker.replaceChildren(...n),this.partsList.setAttribute(`aria-label`,i.partsList),this.partsList.replaceChildren(...a)}if(this.picker.value=this.selected??``,this.loadState===`loading`?this.status.textContent=i.loading:this.loadState===`fallback`?this.status.textContent=this.root.dataset.fallback===`no-webgl`?i.fallbackNoWebgl:i.fallbackLoadFailed:this.status.textContent=``,!this.getAttribute(`poster`)){let e=this.posterUrl;this.poster.src!==e&&(this.poster.src=e)}this.viewer?.setState(t)}async load(){let e=this.loadToken;if(this.loadState=`loading`,this.sync(),this.getAttribute(`debug`)===`fallback`||!p())this.fallback(`no-webgl`);else try{let{createViewer:t}=await import(`./hn-c120-viewer-DwVnkvC-.js`),n=await t({stage:this.stage,labelRoot:this.labelRoot,captionRoot:this.captionRoot,assetBase:this.assetBase,isFocused:()=>this.shadow.activeElement!==null&&this.stage.contains(this.shadow.activeElement),onInteract:()=>this.showHint(null),onBlocked:e=>this.showHint(e),onSelect:e=>{this.selected=e,this.picker.value=e??``},onStats:e=>this.stats.textContent=e},this.currentState());if(e!==this.loadToken){n.dispose();return}this.viewer=n;let r=this.getAttribute(`phase`);if(r!==null&&n.setPhase(d(r,0,-1e9,1e9)),await n.whenIdle(),e!==this.loadToken)return;this.loadState=`ready`,this.root.toggleAttribute(`data-ready`,!0),window.setTimeout(()=>{this.loadState===`ready`&&(this.poster.hidden=!0)},600),this.resetButton.hidden=!1,this.sync(),this.settle(),this.dispatchEvent(new CustomEvent(`ready`,{bubbles:!0,composed:!0,detail:n.info()})),this.showHint(`intro`)}catch(t){if(e!==this.loadToken)return;console.error(`[hn-c120-pump]`,t),this.fallback(`load-error`,t)}}fallback(e,t){this.loadState=`fallback`,this.root.dataset.fallback=e,this.sync(),this.settle(),this.dispatchEvent(new CustomEvent(`fallback`,{bubbles:!0,composed:!0,detail:{reason:e,message:t instanceof Error?t.message:void 0}}))}showHint(e){if(window.clearTimeout(this.hintTimer),e===null){this.hint.removeAttribute(`data-show`);return}let t=performance.now();if(e!==`intro`&&t-this.lastHint<250){this.hintTimer=window.setTimeout(()=>this.hint.removeAttribute(`data-show`),1600);return}this.lastHint=t;let r=n[this.language];this.hint.textContent=e===`wheel`?r.hintWheel:e===`touch`||this.coarsePointer.matches?r.hintTouch:r.hintMouse,this.hint.toggleAttribute(`data-show`,!0),this.hintTimer=window.setTimeout(()=>this.hint.removeAttribute(`data-show`),e===`intro`?4200:1600)}};o(h,`observedAttributes`,u);function g(e=t.tagName){typeof window<`u`&&`customElements`in window&&(customElements.get(e)||customElements.define(e,h))}g();export{h as HnC120Pump,e as PARTS,a as PROVISIONAL,t as RUNTIME,g as defineHnC120Pump};