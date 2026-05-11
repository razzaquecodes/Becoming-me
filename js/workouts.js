const gymWorkouts=[
  {id:'power-builder',title:'Power Builder',cat:'strength',muscle:'upper',level:'Advanced',duration:'75 min',kcal:680,img:'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=70',desc:'5-day progressive overload for max hypertrophy and raw strength.',
    exercises:[
      {n:'Barbell Back Squat',d:'3 min rest',r:'5 × 5'},{n:'Romanian Deadlift',d:'2 min rest',r:'4 × 8'},
      {n:'Incline Bench Press',d:'2 min rest',r:'4 × 8'},{n:'Weighted Pull-Ups',d:'90 sec rest',r:'4 × 6'},
      {n:'Barbell Row',d:'2 min rest',r:'4 × 8'},{n:'Overhead Press',d:'90 sec rest',r:'3 × 10'},
      {n:'Cable Lateral Raise',d:'60 sec rest',r:'3 × 15'},{n:'Face Pull',d:'60 sec rest',r:'3 × 15'},
      {n:'Ab Wheel Rollout',d:'60 sec rest',r:'3 × 12'}]},
  {id:'iron-aesthetics',title:'Iron Aesthetics',cat:'strength',muscle:'upper',level:'Intermediate',duration:'65 min',kcal:520,img:'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=600&q=70',desc:'Hypertrophy-focused upper body split with supersets and cables.',
    exercises:[
      {n:'Flat Dumbbell Press',d:'90 sec rest',r:'4 × 10'},{n:'Incline Cable Fly',d:'60 sec rest',r:'3 × 15'},
      {n:'Lat Pulldown',d:'90 sec rest',r:'4 × 10'},{n:'Seated Cable Row',d:'60 sec rest',r:'3 × 12'},
      {n:'Smith Machine Shoulder Press',d:'90 sec rest',r:'4 × 10'},{n:'Cable Lateral Raise',d:'45 sec rest',r:'4 × 15'},
      {n:'EZ Bar Bicep Curl',d:'60 sec rest',r:'3 × 12'},{n:'Tricep Rope Pushdown',d:'60 sec rest',r:'3 × 12'},
      {n:'Machine Preacher Curl',d:'45 sec rest',r:'3 × 15'},{n:'Overhead Tricep Extension',d:'45 sec rest',r:'3 × 15'}]},
  {id:'leg-day-pro',title:'Leg Day Pro',cat:'strength',muscle:'lower',level:'Advanced',duration:'70 min',kcal:600,img:'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&q=70',desc:'Comprehensive lower body destruction — quads, hamstrings, glutes, calves.',
    exercises:[
      {n:'Barbell Squat',d:'3 min rest',r:'5 × 4'},{n:'Leg Press',d:'2 min rest',r:'4 × 10'},
      {n:'Walking Lunge',d:'90 sec rest',r:'3 × 12 each'},{n:'Romanian Deadlift',d:'2 min rest',r:'4 × 8'},
      {n:'Leg Curl',d:'90 sec rest',r:'4 × 12'},{n:'Leg Extension',d:'60 sec rest',r:'3 × 15'},
      {n:'Hip Thrust (barbell)',d:'90 sec rest',r:'4 × 10'},{n:'Standing Calf Raise',d:'60 sec rest',r:'5 × 15'},
      {n:'Seated Calf Raise',d:'45 sec rest',r:'3 × 20'}]},
  {id:'inferno-hiit',title:'Inferno HIIT',cat:'hiit',muscle:'upper',level:'Intermediate',duration:'35 min',kcal:480,img:'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=70',desc:'40/20 interval protocol with battle ropes, sled, and plyometrics.',
    exercises:[
      {n:'Battle Rope Slams',d:'40 sec on / 20 sec off',r:'4 rounds'},{n:'Box Jumps',d:'40/20',r:'4 rounds'},
      {n:'Sled Push',d:'40/20',r:'3 rounds'},{n:'Kettlebell Swing',d:'40/20',r:'4 rounds'},
      {n:'Jump Rope Double Unders',d:'40/20',r:'4 rounds'},{n:'Tuck Jumps',d:'40/20',r:'3 rounds'},
      {n:'Rowing Machine Sprint',d:'40/20',r:'4 rounds'},{n:'Medicine Ball Slam',d:'40/20',r:'3 rounds'}]},
  {id:'endurance-core',title:'Endurance Core',cat:'cardio',muscle:'core',level:'All Levels',duration:'50 min',kcal:390,img:'https://images.unsplash.com/photo-1520333789090-1afc82db536a?w=600&q=70',desc:'Treadmill tempo runs paired with core-stability superset circuits.',
    exercises:[
      {n:'Treadmill Warm-Up',d:'Easy pace zone 1',r:'10 min'},{n:'Tempo Run',d:'Zone 3-4 effort',r:'20 min'},
      {n:'Plank Hold',d:'Rest 60 sec',r:'3 × 60 sec'},{n:'Cable Crunch',d:'60 sec rest',r:'3 × 15'},
      {n:'Hanging Leg Raise',d:'60 sec rest',r:'3 × 15'},{n:'Russian Twist w/ plate',d:'45 sec rest',r:'3 × 20'},
      {n:'Cool-Down Walk',d:'Zone 1',r:'10 min'}]},
  {id:'flow-state',title:'Flow State Mobility',cat:'mobility',muscle:'core',level:'Beginner',duration:'30 min',kcal:140,img:'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&q=70',desc:'Full-body mobility and flexibility session. Perfect as an active recovery day.',
    exercises:[
      {n:'Cat-Cow Stretch',d:'Breathe deeply',r:'2 × 10'},{n:'Hip Flexor Lunge',d:'Hold each side',r:'2 × 45 sec'},
      {n:'Thoracic Rotation',d:'Each side',r:'2 × 10'},{n:'Pigeon Pose',d:'Per side',r:'2 × 60 sec'},
      {n:'Thread the Needle',d:'Each side',r:'2 × 8'},{n:'Ankle Circles',d:'Each direction',r:'2 × 10'},
      {n:'Doorway Chest Stretch',d:'Hold',r:'3 × 30 sec'},{n:"Child's Pose w/ reach",d:'Hold',r:'3 × 45 sec'},
      {n:'Standing Quad Stretch',d:'Each leg',r:'2 × 30 sec'}]},
  {id:'back-builder',title:'Back Builder',cat:'strength',muscle:'upper',level:'Intermediate',duration:'60 min',kcal:490,img:'https://images.unsplash.com/photo-1598971639058-999e5e9494c0?w=600&q=70',desc:'Dedicated back day — width, thickness, and rear delts all covered.',
    exercises:[
      {n:'Deadlift',d:'3 min rest',r:'4 × 5'},{n:'Wide-Grip Pull-Up',d:'2 min rest',r:'4 × 8'},
      {n:'T-Bar Row',d:'90 sec rest',r:'4 × 10'},{n:'Cable Row (narrow grip)',d:'90 sec rest',r:'3 × 12'},
      {n:'Single Arm Dumbbell Row',d:'60 sec rest',r:'3 × 12 each'},{n:'Lat Pullover (cable)',d:'60 sec rest',r:'3 × 15'},
      {n:'Face Pull',d:'45 sec rest',r:'4 × 15'},{n:'Rear Delt Fly Machine',d:'45 sec rest',r:'3 × 15'}]},
  {id:'push-power',title:'Push Power',cat:'strength',muscle:'upper',level:'Intermediate',duration:'60 min',kcal:460,img:'https://images.unsplash.com/photo-1534367610401-9f5ed68180aa?w=600&q=70',desc:'Chest, shoulders, and triceps superset session for maximum pump.',
    exercises:[
      {n:'Flat Barbell Bench Press',d:'2 min rest',r:'4 × 8'},{n:'Incline Dumbbell Press',d:'90 sec rest',r:'3 × 10'},
      {n:'Pec Deck Machine',d:'60 sec rest',r:'3 × 15'},{n:'Dips (weighted)',d:'90 sec rest',r:'3 × 10'},
      {n:'Overhead Press (barbell)',d:'2 min rest',r:'4 × 8'},{n:'Arnold Press',d:'60 sec rest',r:'3 × 12'},
      {n:'Cable Lateral Raise',d:'45 sec rest',r:'4 × 15'},{n:'Skull Crushers',d:'60 sec rest',r:'3 × 12'},
      {n:'Tricep Dip Machine',d:'45 sec rest',r:'3 × 15'}]},
  {id:'cardio-blast',title:'Cardio Blast',cat:'cardio',muscle:'lower',level:'All Levels',duration:'45 min',kcal:420,img:'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=600&q=70',desc:'Machine cardio + finisher circuit. Burns fat while building stamina.',
    exercises:[
      {n:'Warm-Up (Elliptical)',d:'Easy',r:'8 min'},{n:'Stationary Bike Intervals',d:'30 sec hard / 30 sec easy',r:'10 rounds'},
      {n:'Rowing Machine',d:'Moderate effort',r:'10 min'},{n:'Stair Climber',d:'Moderate',r:'8 min'},
      {n:'Burpees (finisher)',d:'Rest 30 sec between',r:'4 × 10'},{n:'Cool-Down Elliptical',d:'Very easy',r:'5 min'}]},
  {id:'core-crusher',title:'Core Crusher',cat:'core',muscle:'core',level:'Intermediate',duration:'40 min',kcal:280,img:'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=70',desc:'Six-pack focused core workout hitting every angle of your midsection.',
    exercises:[
      {n:'Ab Wheel Rollout',d:'90 sec rest',r:'4 × 10'},{n:'Hanging Leg Raise',d:'60 sec rest',r:'4 × 12'},
      {n:'Cable Crunch',d:'60 sec rest',r:'3 × 15'},{n:'Decline Sit-Up',d:'60 sec rest',r:'3 × 15'},
      {n:'Russian Twist (cable)',d:'45 sec rest',r:'3 × 20 each'},{n:'Plank w/ Hip Dip',d:'30 sec rest',r:'3 × 60 sec'},
      {n:'Bicycle Crunch',d:'45 sec rest',r:'3 × 20 each'},{n:'Dragon Flag (progression)',d:'2 min rest',r:'3 × 5'},
      {n:'Hollow Body Hold',d:'45 sec rest',r:'3 × 30 sec'}]},
];

const homeWorkouts=[
  {id:'h-full-body',title:'Full Body Burn',cat:'hiit',muscle:'upper',level:'All Levels',duration:'35 min',kcal:380,img:'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=70',desc:'Zero equipment needed. Intense full-body circuit you can do anywhere.',
    exercises:[
      {n:'Jumping Jacks',d:'Warm-up',r:'3 min'},{n:'Push-Ups',d:'Rest 45 sec',r:'4 × 15'},
      {n:'Bodyweight Squat',d:'Rest 45 sec',r:'4 × 20'},{n:'Mountain Climbers',d:'40 sec on / 20 sec off',r:'4 rounds'},
      {n:'Reverse Lunge',d:'Rest 45 sec',r:'3 × 12 each'},{n:'Burpees',d:'Rest 60 sec',r:'4 × 8'},
      {n:'Pike Push-Up',d:'Rest 45 sec',r:'3 × 12'},{n:'Glute Bridge',d:'Rest 45 sec',r:'4 × 15'},
      {n:'Plank Hold',d:'Rest 30 sec',r:'3 × 45 sec'},{n:'Superman Hold',d:'Rest 30 sec',r:'3 × 12'}]},
  {id:'h-push',title:'Home Push Day',cat:'strength',muscle:'upper',level:'Intermediate',duration:'45 min',kcal:340,img:'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=70',desc:'Chest, shoulders & triceps — no equipment needed, just your bodyweight.',
    exercises:[
      {n:'Wide Push-Up',d:'Rest 60 sec',r:'4 × 15'},{n:'Close-Grip Push-Up',d:'Rest 60 sec',r:'3 × 12'},
      {n:'Pike Push-Up',d:'Rest 60 sec',r:'4 × 12'},{n:'Diamond Push-Up',d:'Rest 45 sec',r:'3 × 10'},
      {n:'Decline Push-Up (feet on chair)',d:'Rest 60 sec',r:'3 × 12'},{n:'Pseudo Planche Lean',d:'Rest 45 sec',r:'3 × 30 sec'},
      {n:'Tricep Dip (chair)',d:'Rest 45 sec',r:'3 × 15'},{n:'Wall Handstand Hold',d:'Rest 60 sec',r:'3 × 20 sec'}]},
  {id:'h-pull',title:'Home Pull Day',cat:'strength',muscle:'upper',level:'Intermediate',duration:'40 min',kcal:300,img:'https://images.unsplash.com/photo-1590239926044-4131b5a8b9b8?w=600&q=70',desc:'Back and biceps with a doorframe pull-up bar and bodyweight exercises.',
    exercises:[
      {n:'Pull-Up (doorframe bar)',d:'Rest 90 sec',r:'4 × max'},{n:'Chin-Up',d:'Rest 90 sec',r:'3 × max'},
      {n:'Inverted Row (table)',d:'Rest 60 sec',r:'4 × 12'},{n:'Superman Hold',d:'Rest 45 sec',r:'4 × 12'},
      {n:'Rear Delt Fly (water bottles)',d:'Rest 45 sec',r:'3 × 15'},{n:'Towel Row',d:'Rest 60 sec',r:'3 × 12'},
      {n:'Bicep Curl (water bottles)',d:'Rest 45 sec',r:'3 × 15'},{n:'Resistance Band Pull-Apart',d:'Rest 30 sec',r:'4 × 20'}]},
  {id:'h-legs',title:'Home Leg Day',cat:'strength',muscle:'lower',level:'Intermediate',duration:'40 min',kcal:420,img:'https://images.unsplash.com/photo-1552611052-33e04de081de?w=600&q=70',desc:'Destroy your legs with zero gym equipment. Pure bodyweight leg power.',
    exercises:[
      {n:'Jump Squat',d:'Rest 60 sec',r:'4 × 15'},{n:'Bulgarian Split Squat (chair)',d:'Rest 90 sec',r:'4 × 10 each'},
      {n:'Pistol Squat (assisted)',d:'Rest 90 sec',r:'3 × 6 each'},{n:'Reverse Lunge',d:'Rest 60 sec',r:'3 × 12 each'},
      {n:'Glute Bridge',d:'Rest 45 sec',r:'4 × 20'},{n:'Single-Leg Glute Bridge',d:'Rest 45 sec',r:'3 × 12 each'},
      {n:'Wall Sit',d:'Rest 60 sec',r:'3 × 60 sec'},{n:'Calf Raise (step)',d:'Rest 45 sec',r:'4 × 20'},
      {n:'Jump Lunge',d:'Rest 60 sec',r:'3 × 10 each'}]},
  {id:'h-hiit',title:'Home Inferno HIIT',cat:'hiit',muscle:'upper',level:'Advanced',duration:'30 min',kcal:460,img:'https://images.unsplash.com/photo-1539794830467-1f1755804d13?w=600&q=70',desc:'Maximum intensity 30 min HIIT — no equipment, all out effort.',
    exercises:[
      {n:'Burpee',d:'40 sec on / 20 sec off',r:'5 rounds'},{n:'Jump Squat',d:'40/20',r:'5 rounds'},
      {n:'Mountain Climber',d:'40/20',r:'5 rounds'},{n:'Tuck Jump',d:'40/20',r:'4 rounds'},
      {n:'Push-Up to T-Rotation',d:'40/20',r:'4 rounds'},{n:'High Knees',d:'40/20',r:'5 rounds'}]},
  {id:'h-core',title:'Home Core Blast',cat:'core',muscle:'core',level:'All Levels',duration:'25 min',kcal:200,img:'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=70',desc:'Six-pack circuit with zero equipment. Target all core regions.',
    exercises:[
      {n:'Crunch',d:'Rest 30 sec',r:'4 × 20'},{n:'Bicycle Crunch',d:'Rest 30 sec',r:'3 × 20 each'},
      {n:'Leg Raise',d:'Rest 45 sec',r:'4 × 15'},{n:'Plank Hold',d:'Rest 30 sec',r:'3 × 60 sec'},
      {n:'Side Plank',d:'Rest 30 sec',r:'3 × 40 sec each'},{n:'V-Up',d:'Rest 45 sec',r:'3 × 15'},
      {n:'Flutter Kicks',d:'Rest 30 sec',r:'3 × 30 sec'},{n:'Russian Twist',d:'Rest 30 sec',r:'3 × 20 each'},
      {n:'Hollow Body Hold',d:'Rest 30 sec',r:'3 × 30 sec'}]},
  {id:'h-cardio',title:'Home Cardio Flow',cat:'cardio',muscle:'lower',level:'All Levels',duration:'35 min',kcal:360,img:'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=600&q=70',desc:'Get your heart rate up with no equipment. Perfect for rest-day cardio.',
    exercises:[
      {n:'Jumping Jacks',d:'Warm-up',r:'5 min'},{n:'High Knees',d:'Rest 30 sec',r:'4 × 45 sec'},
      {n:'Jump Rope (imaginary)',d:'Rest 30 sec',r:'4 × 60 sec'},{n:'Lateral Shuffle',d:'Rest 30 sec',r:'4 × 30 sec'},
      {n:'Butt Kickers',d:'Rest 30 sec',r:'3 × 45 sec'},{n:'Step Tap (stairs/stool)',d:'Rest 30 sec',r:'4 × 45 sec'},
      {n:'Shadow Boxing',d:'Rest 30 sec',r:'4 × 60 sec'},{n:'Cool-Down Walk in place',d:'Easy',r:'5 min'}]},
  {id:'h-mobility',title:'Morning Mobility',cat:'mobility',muscle:'core',level:'Beginner',duration:'20 min',kcal:100,img:'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&q=70',desc:'Start your day right. Full-body mobility and gentle movement flow.',
    exercises:[
      {n:'Cat-Cow',d:'Slow breath',r:'2 × 10'},{n:'Hip Circle',d:'Each direction',r:'2 × 10 each'},
      {n:"World's Greatest Stretch",d:'Each side',r:'2 × 8'},{n:'Pigeon Pose',d:'Per side',r:'2 × 45 sec'},
      {n:'Thoracic Rotation',d:'Each side',r:'2 × 10'},{n:'Standing Hamstring Stretch',d:'Hold',r:'3 × 30 sec'},
      {n:'Shoulder Cross-Body Stretch',d:'Hold each side',r:'2 × 30 sec'},{n:'Neck Rolls',d:'Gentle',r:'2 × 5 each'}]},
  {id:'h-upper-strength',title:'Bodyweight Strength Upper',cat:'strength',muscle:'upper',level:'Advanced',duration:'50 min',kcal:360,img:'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=70',desc:'Advanced calisthenics upper body — build real strength with no weights.',
    exercises:[
      {n:'Archer Push-Up',d:'Rest 90 sec',r:'4 × 8 each'},{n:'Pull-Up (weighted backpack)',d:'Rest 90 sec',r:'4 × 8'},
      {n:'Ring Dip (or chair)',d:'Rest 90 sec',r:'3 × 10'},{n:'L-Sit Hold',d:'Rest 60 sec',r:'4 × 15 sec'},
      {n:'Muscle-Up Progression',d:'Rest 2 min',r:'3 × 3'},{n:'Planche Lean',d:'Rest 60 sec',r:'3 × 30 sec'},
      {n:'Pike Push-Up to Handstand',d:'Rest 90 sec',r:'3 × 8'},{n:'Skin the Cat',d:'Rest 60 sec',r:'3 × 5'}]},
];

function renderWorkouts(){
  const wks=workoutLocation==='gym'?gymWorkouts:homeWorkouts;
  const grid=document.getElementById('workout-grid');
  const filtered=currentWorkoutFilter==='all'?wks:wks.filter(w=>w.cat===currentWorkoutFilter||w.muscle===currentWorkoutFilter);
  if(!filtered.length){grid.innerHTML='<div style="padding:3rem;color:var(--text-muted);font-size:.9rem">No workouts found for this filter combination. Try a different filter.</div>';return}
  grid.innerHTML=filtered.map(w=>`
    <div class="wk-card" onclick="openWkModal('${w.id}')">
      <div class="wk-card-img">
        <img src="${w.img}" alt="${w.title}" loading="lazy">
        <div style="position:absolute;top:1rem;left:1rem"><span class="badge badge-red">${w.cat.toUpperCase()}</span></div>
      </div>
      <div class="wk-card-body">
        <div class="wk-card-meta">
          <span class="tag-pill">${w.level}</span>
          <span class="tag-pill">${w.exercises.length} exercises</span>
        </div>
        <h3 class="wk-card-title">${w.title}</h3>
        <p class="wk-card-desc">${w.desc}</p>
        <div class="wk-card-footer">
          <div class="wk-info">
            <div class="wk-info-item">&#9200; ${w.duration}</div>
            <div class="wk-info-item">&#128293; ${w.kcal} kcal</div>
          </div>
          <div class="wk-arrow">&#8599;</div>
        </div>
      </div>
    </div>`).join('');
}

function setLocation(loc){
  workoutLocation=loc;
  document.getElementById('loc-gym').classList.toggle('active',loc==='gym');
  document.getElementById('loc-home').classList.toggle('active',loc==='home');
  document.getElementById('loc-desc').textContent=loc==='gym'
    ?'Full gym equipment workouts — barbells, cables, machines and more.'
    :'Zero-equipment home workouts — bodyweight, calisthenics, and minimal gear.';
  renderWorkouts();
}

function filterW(cat,btn){
  currentWorkoutFilter=cat;
  document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  renderWorkouts();
}

function openWkModal(id){
  const all=[...gymWorkouts,...homeWorkouts];
  const w=all.find(x=>x.id===id);
  if(!w)return;
  const exHtml=w.exercises.map((e,i)=>`
    <li class="ex-item">
      <span class="ex-num">${String(i+1).padStart(2,'0')}</span>
      <div class="ex-body">
        <div class="ex-name">${e.n}</div>
        <div class="ex-detail">${e.d}</div>
      </div>
      <span class="ex-reps">${e.r}</span>
    </li>`).join('');
  document.getElementById('wk-modal-content').innerHTML=`
    <button class="modal-close" onclick="closeWkModal()">&times;</button>
    <div class="wm-header">
      <span class="badge badge-red" style="margin-bottom:.75rem">${w.cat.toUpperCase()}</span>
      <h2 class="wm-title">${w.title}</h2>
      <div class="wm-meta">
        <span class="wm-meta-item">${w.level}</span>
        <span class="wm-meta-item">&bull; ${w.duration}</span>
        <span class="wm-meta-item">&bull; ${w.kcal} kcal</span>
        <span class="wm-meta-item">&bull; ${w.exercises.length} exercises</span>
      </div>
      <p style="font-size:.85rem;color:var(--text-muted);font-weight:300">${w.desc}</p>
    </div>
    <div class="divider"></div>
    <ul class="exercise-list">${exHtml}</ul>
    <button class="start-btn" onclick="startWorkout('${w.id}','${w.title}')">&#9889; Start Workout</button>`;
  document.getElementById('wk-modal').classList.add('open');
  document.body.style.overflow='hidden';
}
function closeWkModal(){document.getElementById('wk-modal').classList.remove('open');document.body.style.overflow=''}
function startWorkout(id,title){
  if(currentUser){
    const logs=getLogs(currentUser.email);
    logs.unshift({date:new Date().toISOString(),weight:null,workout:title,notes:'Started from workout page'});
    saveLogs(currentUser.email,logs);
    showToast('&#9989; '+title+' logged! Get after it!');
  } else {
    showToast('&#9889; Sign in to track your workouts!');
  }
  closeWkModal();
}

