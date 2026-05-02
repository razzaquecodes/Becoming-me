function renderProgress(){
  const gate=document.getElementById('progress-gate');
  const content=document.getElementById('progress-content');
  if(!currentUser){gate.style.display='block';content.style.display='none';return}
  gate.style.display='none';content.style.display='block';
  const logs=getLogs(currentUser.email);
  const ud=getUserData(currentUser.email);
  const weightLogs=logs.filter(l=>l.weight);
  const streak=calcStreak(logs);
  // streak banner
  const sb=document.getElementById('streak-banner');
  if(streak>0){
    sb.style.display='flex';
    sb.innerHTML=`<div class="streak-flame">&#128293;</div><div class="streak-text"><div class="big">${streak}-Day Streak</div><div class="sm">Keep it up! You're building an unstoppable habit.</div></div>`;
  } else sb.style.display='none';
  // stats
  const startW=weightLogs.length?weightLogs[weightLogs.length-1].weight:null;
  const currW=weightLogs.length?weightLogs[0].weight:null;
  const diff=startW&&currW?+(currW-startW).toFixed(1):null;
  document.getElementById('progress-stats-row').innerHTML=`
    <div class="stat-card"><div class="num">${streak}</div><div class="lbl">Day Streak</div></div>
    <div class="stat-card"><div class="num">${logs.filter(l=>l.workout&&l.workout!=='Rest Day').length}</div><div class="lbl">Workouts Done</div></div>
    <div class="stat-card"><div class="num">${currW?currW+'kg':'—'}</div><div class="lbl">Current Weight</div></div>
    <div class="stat-card"><div class="num" style="color:${diff&&diff<0?'#66bb6a':diff&&diff>0?'#ef5350':'var(--white)'}">${diff!==null?(diff>0?'+':'')+diff+'kg':'—'}</div><div class="lbl">Weight Change</div></div>`;
  // chart
  renderWeightChart(weightLogs);
  // log list
  renderLogList(logs);
  // goals
  renderGoals(logs,ud);
}

function calcStreak(logs){
  let streak=0;
  const today=new Date();today.setHours(0,0,0,0);
  let check=new Date(today);
  for(let i=0;i<60;i++){
    const dayStr=check.toISOString().split('T')[0];
    const found=logs.some(l=>l.date&&l.date.split('T')[0]===dayStr);
    if(found)streak++;
    else if(i>0)break;
    check.setDate(check.getDate()-1);
  }
  return streak;
}

function renderWeightChart(weightLogs){
  const ctx=document.getElementById('weightChart');
  if(!ctx)return;
  const sorted=[...weightLogs].reverse().slice(-14);
  if(weightChart){weightChart.destroy();weightChart=null}
  if(!sorted.length){ctx.getContext('2d').clearRect(0,0,ctx.width,ctx.height);return}
  const labels=sorted.map(l=>new Date(l.date).toLocaleDateString('en-IN',{day:'2-digit',month:'short'}));
  const data=sorted.map(l=>l.weight);
  const script=document.createElement('script');
  if(!window.Chart){
    script.src='https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js';
    script.onload=()=>drawChart(ctx,labels,data);
    document.head.appendChild(script);
  } else drawChart(ctx,labels,data);
}

function drawChart(ctx,labels,data){
  if(weightChart)weightChart.destroy();
  weightChart=new Chart(ctx,{
    type:'line',
    data:{labels,datasets:[{label:'Weight (kg)',data,borderColor:'#c8373a',backgroundColor:'rgba(200,55,58,.12)',tension:.4,fill:true,pointBackgroundColor:'#c8373a',pointRadius:5}]},
    options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{
      x:{grid:{color:'rgba(255,255,255,.05)'},ticks:{color:'#888',font:{size:11}}},
      y:{grid:{color:'rgba(255,255,255,.05)'},ticks:{color:'#888',font:{size:11}}}
    }}
  });
}

function renderLogList(logs){
  const el=document.getElementById('log-entries-list');
  if(!logs.length){el.innerHTML='<li style="color:var(--text-muted);font-size:.85rem;padding:1rem 0">No entries yet. Log your first session!</li>';return}
  el.innerHTML=logs.slice(0,10).map((l,i)=>`
    <li class="log-entry">
      <span class="log-date">${new Date(l.date).toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'})}</span>
      <div class="log-vals">
        ${l.weight?`<div class="log-val"><div class="v">${l.weight}kg</div><div class="k">Weight</div></div>`:''}
        ${l.workout?`<div class="log-val"><div class="v" style="font-size:.82rem">${l.workout}</div><div class="k">Workout</div></div>`:''}
      </div>
      <button class="log-del" onclick="deleteLog(${i})" title="Delete">&#x2715;</button>
    </li>`).join('');
}

function logEntry(){
  const w=document.getElementById('log-weight').value;
  const workout=document.getElementById('log-workout').value;
  const notes=document.getElementById('log-notes').value;
  if(!w&&!workout){showToast('Please enter at least a weight or workout.');return}
  const logs=getLogs(currentUser.email);
  logs.unshift({date:new Date().toISOString(),weight:w?+w:null,workout:workout||null,notes});
  saveLogs(currentUser.email,logs);
  document.getElementById('log-weight').value='';
  document.getElementById('log-workout').value='';
  document.getElementById('log-notes').value='';
  renderProgress();
  showToast('&#9989; Entry logged!');
}

function deleteLog(i){
  const logs=getLogs(currentUser.email);
  logs.splice(i,1);
  saveLogs(currentUser.email,logs);
  renderProgress();
}

function renderGoals(logs,ud){
  const workoutDone=logs.filter(l=>{const d=new Date(l.date);const now=new Date();return d.getFullYear()===now.getFullYear()&&d.getMonth()===now.getMonth()&&l.workout&&l.workout!=='Rest Day';}).length;
  const target=ud.weeklyGoal||4;
  const weekWorkouts=logs.filter(l=>{const d=new Date(l.date);const now=new Date();const diff=(now-d)/(1000*60*60*24);return diff<7&&l.workout&&l.workout!=='Rest Day';}).length;
  const ring=(pct,color,label,val)=>{
    const r=40;const circ=2*Math.PI*r;const offset=circ*(1-Math.min(pct,1));
    return`<div class="chart-card" style="text-align:center">
      <div class="progress-ring">
        <svg width="100" height="100" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="${r}" fill="none" stroke="rgba(255,255,255,.08)" stroke-width="8"/>
          <circle cx="50" cy="50" r="${r}" fill="none" stroke="${color}" stroke-width="8" stroke-dasharray="${circ}" stroke-dashoffset="${offset}" stroke-linecap="round"/>
        </svg>
        <div class="progress-ring-text"><div class="pr-num">${val}</div><div class="pr-lbl">${label}</div></div>
      </div>
    </div>`;
  };
  document.getElementById('goals-grid').innerHTML=
    ring(weekWorkouts/target,'#c8373a','This week',weekWorkouts+'/'+target)+
    ring(workoutDone/20,'#2e7d52','Monthly',workoutDone)+
    ring(Math.min((logs.length/100),1),'#b8750a','Total logs',logs.length);
}


updateNavAuth();
renderWorkouts();
