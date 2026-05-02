function renderProfile(){
  const gate=document.getElementById('profile-gate');
  const content=document.getElementById('profile-content');
  if(!currentUser){gate.style.display='block';content.style.display='none';return}
  gate.style.display='none';content.style.display='block';
  const ud=getUserData(currentUser.email);
  const initials=(currentUser.firstName[0]+(currentUser.lastName||'')[0]||'').toUpperCase();
  document.getElementById('profile-avatar').textContent=initials;
  document.getElementById('profile-disp-name').textContent=currentUser.firstName+' '+(currentUser.lastName||'');
  document.getElementById('profile-disp-email').textContent=currentUser.email;
  const logs=getLogs(currentUser.email);
  document.getElementById('profile-stats-mini').innerHTML=`
    <div class="psm-item"><div class="psm-num">${logs.filter(l=>l.workout).length}</div><div class="psm-lbl">Workouts</div></div>
    <div class="psm-item"><div class="psm-num">${ud.weight||'—'}</div><div class="psm-lbl">Weight kg</div></div>
    <div class="psm-item"><div class="psm-num">${ud.height||'—'}</div><div class="psm-lbl">Height cm</div></div>
    <div class="psm-item"><div class="psm-num">${ud.goal?ud.goal.charAt(0).toUpperCase()+ud.goal.slice(1):'—'}</div><div class="psm-lbl">Goal</div></div>`;
  const navItems=[
    {id:'pn-metrics',icon:'&#9881;',label:'Body Metrics'},
    {id:'pn-goals',icon:'&#127919;',label:'Fitness Goals'},
    {id:'pn-prefs',icon:'&#127803;',label:'Diet Preferences'},
    {id:'pn-account',icon:'&#128100;',label:'Account'},
  ];
  document.getElementById('profile-nav-menu').innerHTML=navItems.map((n,i)=>`
    <div class="profile-nav-item${i===0?' active':''}" id="${n.id}" onclick="switchProfilePanel('${n.id}')">
      <span class="profile-nav-icon">${n.icon}</span>${n.label}
    </div>`).join('');
  renderProfilePanels(ud);
  showProfilePanel('pn-metrics');
}

function switchProfilePanel(id){
  document.querySelectorAll('.profile-nav-item').forEach(el=>el.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  showProfilePanel(id);
}

function showProfilePanel(id){
  document.querySelectorAll('.profile-panel').forEach(p=>p.classList.remove('active'));
  const el=document.getElementById('pp-'+id);
  if(el)el.classList.add('active');
}

function renderProfilePanels(ud){
  document.getElementById('profile-panels').innerHTML=`
    <div class="profile-panel active" id="pp-pn-metrics">
      <div class="profile-section-card">
        <div class="profile-section-title">BODY METRICS</div>
        ${ud.weight?`<div class="metrics-grid">
          <div class="metric-box"><div class="val">${ud.weight}<span class="unit">kg</span></div><div class="lbl">Weight</div></div>
          <div class="metric-box"><div class="val">${ud.height}<span class="unit">cm</span></div><div class="lbl">Height</div></div>
          <div class="metric-box"><div class="val">${ud.age||'—'}</div><div class="lbl">Age</div></div>
          <div class="metric-box"><div class="val">${ud.weight&&ud.height?calcBMI(+ud.weight,+ud.height):'—'}</div><div class="lbl">BMI</div></div>
        </div>`:''}
        <div class="form-row">
          <div class="form-group"><label>Weight (kg)</label><input type="number" id="pf-weight" value="${ud.weight||''}" placeholder="e.g. 72" step="0.5"></div>
          <div class="form-group"><label>Height (cm)</label><input type="number" id="pf-height" value="${ud.height||''}" placeholder="e.g. 175"></div>
        </div>
        <div class="form-row">
          <div class="form-group"><label>Age</label><input type="number" id="pf-age" value="${ud.age||''}" placeholder="e.g. 25" min="13" max="100"></div>
          <div class="form-group"><label>Gender</label>
            <select id="pf-gender"><option value="">Select</option><option value="male"${ud.gender==='male'?' selected':''}>Male</option><option value="female"${ud.gender==='female'?' selected':''}>Female</option></select>
          </div>
        </div>
        <div class="form-group"><label>Activity Level</label>
          <select id="pf-activity">
            <option value="">Select</option>
            <option value="sedentary"${ud.activity==='sedentary'?' selected':''}>Sedentary (desk job, no exercise)</option>
            <option value="light"${ud.activity==='light'?' selected':''}>Lightly Active (1-3 days/week)</option>
            <option value="moderate"${ud.activity==='moderate'?' selected':''}>Moderately Active (3-5 days/week)</option>
            <option value="active"${ud.activity==='active'?' selected':''}>Very Active (6-7 days/week)</option>
            <option value="veryactive"${ud.activity==='veryactive'?' selected':''}>Athlete (2x per day)</option>
          </select>
        </div>
        <button class="btn btn-primary" onclick="saveMetrics()">Save Metrics &#8594;</button>
      </div>
    </div>
    <div class="profile-panel" id="pp-pn-goals">
      <div class="profile-section-card">
        <div class="profile-section-title">FITNESS GOALS</div>
        <div class="form-group"><label>Primary Goal</label>
          <select id="pf-goal">
            <option value="">Select your goal</option>
            <option value="lose"${ud.goal==='lose'?' selected':''}>Lose Fat / Cut</option>
            <option value="gain"${ud.goal==='gain'?' selected':''}>Gain Muscle / Bulk</option>
            <option value="maintain"${ud.goal==='maintain'?' selected':''}>Maintain & Recomp</option>
          </select>
        </div>
        <div class="form-group"><label>Weekly Workout Target (days)</label>
          <select id="pf-weekly">
            <option value="3"${ud.weeklyGoal==3?' selected':''}>3 days/week</option>
            <option value="4"${ud.weeklyGoal==4?' selected':''}>4 days/week</option>
            <option value="5"${ud.weeklyGoal==5?' selected':''}>5 days/week</option>
            <option value="6"${ud.weeklyGoal==6?' selected':''}>6 days/week</option>
          </select>
        </div>
        <div class="form-group"><label>Preferred Workout Location</label>
          <select id="pf-location">
            <option value="gym"${ud.location==='gym'?' selected':''}>Gym</option>
            <option value="home"${ud.location==='home'?' selected':''}>Home</option>
            <option value="both"${ud.location==='both'?' selected':''}>Both</option>
          </select>
        </div>
        <div class="form-group"><label>Target Weight (kg) — optional</label>
          <input type="number" id="pf-targetw" value="${ud.targetWeight||''}" placeholder="e.g. 65" step="0.5">
        </div>
        <button class="btn btn-primary" onclick="saveGoals()">Save Goals &#8594;</button>
      </div>
    </div>
    <div class="profile-panel" id="pp-pn-prefs">
      <div class="profile-section-card">
        <div class="profile-section-title">DIET PREFERENCES</div>
        <div class="form-group"><label>Diet Type</label>
          <select id="pf-diet">
            <option value="veg"${ud.dietType==='veg'?' selected':''}>Vegetarian</option>
            <option value="nonveg"${ud.dietType==='nonveg'?' selected':''}>Non-Vegetarian</option>
          </select>
        </div>
        <div class="form-group"><label>Food Allergies / Restrictions (optional)</label>
          <input type="text" id="pf-allergies" value="${ud.allergies||''}" placeholder="e.g. nuts, dairy, gluten">
        </div>
        <div class="form-group"><label>Water Intake Reminder</label>
          <select id="pf-water">
            <option value="off"${ud.water==='off'?' selected':''}>Off</option>
            <option value="on"${ud.water==='on'?' selected':''}>On — remind me daily</option>
          </select>
        </div>
        <button class="btn btn-primary" onclick="savePrefs()">Save Preferences &#8594;</button>
      </div>
    </div>
    <div class="profile-panel" id="pp-pn-account">
      <div class="profile-section-card">
        <div class="profile-section-title">ACCOUNT DETAILS</div>
        <div class="form-row">
          <div class="form-group"><label>First Name</label><input type="text" id="pf-fn" value="${currentUser.firstName||''}"></div>
          <div class="form-group"><label>Last Name</label><input type="text" id="pf-ln" value="${currentUser.lastName||''}"></div>
        </div>
        <div class="form-group"><label>Email</label><input type="email" value="${currentUser.email}" disabled style="opacity:.5;cursor:not-allowed"></div>
        <div style="margin-bottom:1rem;font-size:.82rem;color:var(--text-muted)">Member since: ${new Date(currentUser.joined||Date.now()).toLocaleDateString('en-IN',{day:'2-digit',month:'long',year:'numeric'})}</div>
        <button class="btn btn-primary" onclick="saveAccount()" style="margin-right:1rem">Save Changes</button>
        <button class="btn btn-outline btn-sm" onclick="doLogout()" style="border-color:rgba(200,55,58,.4);color:var(--red)">Sign Out</button>
      </div>
    </div>`;
}

function saveMetrics(){
  if(!currentUser)return;
  const ud=getUserData(currentUser.email);
  ud.weight=document.getElementById('pf-weight').value||ud.weight;
  ud.height=document.getElementById('pf-height').value||ud.height;
  ud.age=document.getElementById('pf-age').value||ud.age;
  ud.gender=document.getElementById('pf-gender').value||ud.gender;
  ud.activity=document.getElementById('pf-activity').value||ud.activity;
  saveUserData(currentUser.email,ud);
  showToast('&#9989; Body metrics saved!');
  renderProfile();
}
function saveGoals(){
  if(!currentUser)return;
  const ud=getUserData(currentUser.email);
  ud.goal=document.getElementById('pf-goal').value||ud.goal;
  ud.weeklyGoal=document.getElementById('pf-weekly').value||ud.weeklyGoal;
  ud.location=document.getElementById('pf-location').value||ud.location;
  ud.targetWeight=document.getElementById('pf-targetw').value||ud.targetWeight;
  saveUserData(currentUser.email,ud);
  showToast('&#9989; Goals saved!');
  renderProfile();
}
function savePrefs(){
  if(!currentUser)return;
  const ud=getUserData(currentUser.email);
  ud.dietType=document.getElementById('pf-diet').value;
  ud.allergies=document.getElementById('pf-allergies').value;
  ud.water=document.getElementById('pf-water').value;
  saveUserData(currentUser.email,ud);
  // sync diet type
  dietType=ud.dietType||'veg';
  showToast('&#9989; Diet preferences saved!');
}
function saveAccount(){
  if(!currentUser)return;
  const fn=document.getElementById('pf-fn').value.trim();
  const ln=document.getElementById('pf-ln').value.trim();
  if(!fn){showToast('First name cannot be empty.');return}
  const users=getUsers();
  const idx=users.findIndex(u=>u.email===currentUser.email);
  if(idx>-1){users[idx].firstName=fn;users[idx].lastName=ln;saveUsers(users);}
  currentUser.firstName=fn;currentUser.lastName=ln;
  updateNavAuth();showToast('&#9989; Account updated!');renderProfile();
}

