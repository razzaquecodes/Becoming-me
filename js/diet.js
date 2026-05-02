function calcBMI(weight,height){return+(weight/((height/100)**2)).toFixed(1)}
function bmiCategory(bmi){
  if(bmi<18.5)return{cat:'Underweight',color:'#4fc3f7',pct:Math.round(bmi/40*100)};
  if(bmi<25)return{cat:'Healthy',color:'#66bb6a',pct:Math.round(bmi/40*100)};
  if(bmi<30)return{cat:'Overweight',color:'#ffa726',pct:Math.round(bmi/40*100)};
  return{cat:'Obese',color:'#ef5350',pct:Math.round(bmi/40*100)};
}
function calcTDEE(weight,height,age,gender,activity){
  let bmr=gender==='male'?10*weight+6.25*height-5*age+5:10*weight+6.25*height-5*age-161;
  const af={sedentary:1.2,light:1.375,moderate:1.55,active:1.725,veryactive:1.9};
  return Math.round(bmr*(af[activity]||1.55));
}
function goalCalories(tdee,goal){
  if(goal==='lose')return tdee-400;
  if(goal==='gain')return tdee+400;
  return tdee;
}

const vegMeals={
  breakfast:[
    {n:'Masala Oats Bowl',d:'Rolled oats cooked with cumin, turmeric, veggies & topped with peanuts',p:'18g',c:'45g',f:'8g',kcal:320},
    {n:'Moong Dal Chilla',d:'Protein-rich lentil pancakes with mint chutney and curd',p:'22g',c:'38g',f:'6g',kcal:300},
    {n:'Paneer Bhurji + Multigrain Toast',d:'Scrambled cottage cheese with onions, tomatoes, spices',p:'25g',c:'40g',f:'12g',kcal:380},
    {n:'Greek Yogurt Parfait',d:'Thick curd with mixed berries, granola & honey',p:'20g',c:'42g',f:'5g',kcal:310},
    {n:'Sprouts Upma',d:'Mixed sprouts, semolina & veggies stir-fried with mustard seeds',p:'16g',c:'50g',f:'4g',kcal:295},
    {n:'Besan Cheela',d:'Gram flour pancake with spinach, capsicum & low-fat curd',p:'18g',c:'35g',f:'7g',kcal:285},
    {n:'Overnight Chia Pudding',d:'Chia seeds soaked in almond milk, mango & nuts',p:'12g',c:'38g',f:'14g',kcal:320},
  ],
  lunch:[
    {n:'Rajma Brown Rice Bowl',d:'Spiced kidney bean curry with brown rice & cucumber raita',p:'22g',c:'60g',f:'8g',kcal:480},
    {n:'Palak Paneer + Roti',d:'Creamy spinach & cottage cheese curry with 2 whole wheat rotis',p:'28g',c:'55g',f:'14g',kcal:520},
    {n:'Dal Tadka + Quinoa',d:'Tempered yellow dal with quinoa, salad & pickle',p:'24g',c:'58g',f:'7g',kcal:460},
    {n:'Chole + Jeera Rice',d:'Spiced chickpea curry with cumin rice and onion salad',p:'20g',c:'65g',f:'9g',kcal:500},
    {n:'Mixed Veg Curry + Millet',d:'Seasonal vegetables in tomato-based gravy with bajra roti',p:'16g',c:'62g',f:'6g',kcal:440},
    {n:'Tofu Stir Fry + Brown Rice',d:'Marinated tofu with bell peppers, broccoli & soy-ginger sauce',p:'26g',c:'55g',f:'10g',kcal:470},
    {n:'Egg-Free Biryani + Raita',d:'Vegetable dum biryani with fragrant basmati & mint raita',p:'18g',c:'70g',f:'8g',kcal:500},
  ],
  snack:[
    {n:'Handful Mixed Nuts',d:'Almonds, walnuts & cashews — healthy fats & protein',p:'8g',c:'12g',f:'18g',kcal:240},
    {n:'Roasted Chana',d:'Spiced Bengal gram — high protein crunchy snack',p:'12g',c:'28g',f:'3g',kcal:190},
    {n:'Fruit & Peanut Butter',d:'Apple/banana with 1 tbsp natural peanut butter',p:'6g',c:'30g',f:'8g',kcal:220},
    {n:'Makhana (Fox Nuts)',d:'Roasted lotus seeds with ghee & rock salt',p:'5g',c:'22g',f:'2g',kcal:140},
    {n:'Paneer Tikka (small)',d:'Grilled cottage cheese cubes with mint chutney',p:'16g',c:'8g',f:'10g',kcal:200},
    {n:'Smoothie Bowl',d:'Banana, spinach, almond milk, seeds & berries',p:'10g',c:'35g',f:'6g',kcal:240},
    {n:'Sprouted Moong Salad',d:'Sprouts with tomato, cucumber, lemon & chaat masala',p:'10g',c:'20g',f:'2g',kcal:150},
  ],
  dinner:[
    {n:'Grilled Paneer + Salad',d:'Herbed cottage cheese with quinoa tabbouleh & dressing',p:'30g',c:'35g',f:'14g',kcal:420},
    {n:'Dal Soup + Multigrain Bread',d:'Light lentil soup with 1 slice multigrain bread',p:'18g',c:'40g',f:'4g',kcal:320},
    {n:'Methi Thepla + Curd',d:'Fenugreek flatbread with low-fat curd & pickle',p:'14g',c:'45g',f:'8g',kcal:360},
    {n:'Tofu & Veggie Bowl',d:'Stir-fried tofu with broccoli, carrots & sesame oil',p:'24g',c:'30g',f:'10g',kcal:360},
    {n:'Moong Dal Khichdi',d:'Comforting yellow dal and rice porridge with ghee',p:'18g',c:'55g',f:'6g',kcal:380},
    {n:'Veg Soup + Roti',d:'Tomato-spinach soup with 1 whole wheat roti',p:'12g',c:'38g',f:'4g',kcal:280},
    {n:'Chickpea Tikka Masala',d:'Creamy spiced chickpeas in tomato sauce — light version',p:'20g',c:'45g',f:'8g',kcal:380},
  ],
};
const nonvegMeals={
  breakfast:[
    {n:'Egg White Omelette',d:'3 egg whites, spinach, mushrooms & feta on multigrain toast',p:'30g',c:'32g',f:'8g',kcal:340},
    {n:'Boiled Eggs + Oats',d:'2 boiled eggs with oats, milk & banana',p:'28g',c:'45g',f:'10g',kcal:390},
    {n:'Chicken Poha',d:'Shredded chicken breast with flattened rice, mustard seeds & lime',p:'32g',c:'48g',f:'6g',kcal:380},
    {n:'Egg Bhurji + Multigrain Toast',d:'Scrambled eggs with onion, tomato & spices',p:'26g',c:'34g',f:'12g',kcal:360},
    {n:'Greek Yogurt + Egg Bowl',d:'High-protein curd bowl with 1 boiled egg & berries',p:'28g',c:'35g',f:'7g',kcal:330},
    {n:'Tuna Salad Wrap',d:'Canned tuna, veggies & mustard in whole wheat wrap',p:'34g',c:'40g',f:'6g',kcal:360},
    {n:'Overnight Oats + Egg',d:'Oats soaked overnight with protein powder & 2 boiled eggs',p:'35g',c:'48g',f:'10g',kcal:420},
  ],
  lunch:[
    {n:'Chicken Breast + Brown Rice',d:'Grilled chicken with brown rice, broccoli & lemon-herb dressing',p:'45g',c:'55g',f:'8g',kcal:510},
    {n:'Egg Curry + Jeera Rice',d:'Hard-boiled eggs in spiced tomato-onion gravy with cumin rice',p:'30g',c:'60g',f:'12g',kcal:500},
    {n:'Fish Tikka + Dal + Roti',d:'Grilled fish fillet, yellow dal & 2 whole wheat rotis',p:'40g',c:'58g',f:'10g',kcal:510},
    {n:'Chicken Biryani (lean)',d:'Skinless chicken with basmati rice, whole spices & raita',p:'38g',c:'65g',f:'10g',kcal:540},
    {n:'Mutton Keema + Quinoa',d:'Lean minced lamb with onion-tomato base, served on quinoa',p:'42g',c:'50g',f:'14g',kcal:520},
    {n:'Prawn Stir Fry + Rice',d:'Prawns with garlic, ginger, mixed veggies & jasmine rice',p:'36g',c:'55g',f:'8g',kcal:480},
    {n:'Chicken Soup + Bread',d:'Hearty chicken vegetable soup with 1 multigrain bread slice',p:'34g',c:'38g',f:'6g',kcal:360},
  ],
  snack:[
    {n:'Boiled Egg (2)',d:'Simple protein-rich snack with a pinch of black salt',p:'12g',c:'1g',f:'10g',kcal:140},
    {n:'Chicken Tikka (small)',d:'Marinated, grilled chicken cubes with mint chutney',p:'28g',c:'5g',f:'6g',kcal:200},
    {n:'Tuna on Crackers',d:'Canned tuna with rye crackers & cucumber slices',p:'20g',c:'18g',f:'4g',kcal:195},
    {n:'Greek Yogurt + Almonds',d:'High-protein curd with almonds & a drizzle of honey',p:'18g',c:'20g',f:'12g',kcal:260},
    {n:'Egg White Protein Shake',d:'3 egg whites blended with banana & milk',p:'22g',c:'28g',f:'2g',kcal:230},
    {n:'Grilled Fish Strips',d:'Baked fish strips with lemon zest & herb seasoning',p:'25g',c:'3g',f:'5g',kcal:165},
    {n:'Chicken Soup Cup',d:'Small cup of clear chicken bone broth with veggies',p:'15g',c:'8g',f:'3g',kcal:125},
  ],
  dinner:[
    {n:'Baked Salmon + Veggies',d:'Salmon fillet with roasted asparagus, cherry tomatoes & olive oil',p:'42g',c:'12g',f:'18g',kcal:400},
    {n:'Chicken Dal + Roti',d:'Shredded chicken mixed dal with 2 whole wheat rotis',p:'40g',c:'50g',f:'8g',kcal:460},
    {n:'Egg Fried Rice (brown)',d:'Whole eggs with brown rice, soy sauce & veggies',p:'28g',c:'55g',f:'10g',kcal:440},
    {n:'Grilled Fish + Salad',d:'Pan-grilled fish with large green salad & olive oil dressing',p:'38g',c:'15g',f:'12g',kcal:340},
    {n:'Mutton Stew + Bread',d:'Light mutton & vegetable stew with 1 multigrain bread',p:'35g',c:'35g',f:'10g',kcal:400},
    {n:'Prawn Masala + Quinoa',d:'Spiced prawn curry with quinoa & cucumber salad',p:'34g',c:'42g',f:'8g',kcal:400},
    {n:'Chicken Soup + Khichdi',d:'Light chicken broth with moong dal khichdi',p:'30g',c:'48g',f:'6g',kcal:380},
  ],
};

const days=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

function renderDiet(){
  const gate=document.getElementById('diet-gate-wrap');
  const content=document.getElementById('diet-content');
  if(!currentUser){gate.style.display='block';content.style.display='none';return}
  gate.style.display='none';content.style.display='block';
  const ud=getUserData(currentUser.email);
  const bmiCard=document.getElementById('bmi-card');
  const tipEl=document.getElementById('diet-tip');
  if(ud.weight&&ud.height){
    const bmi=calcBMI(+ud.weight,+ud.height);
    const {cat,color,pct}=bmiCategory(bmi);
    const tdee=calcTDEE(+ud.weight,+ud.height,+ud.age||25,ud.gender||'male',ud.activity||'moderate');
    const goal=ud.goal||'maintain';
    const targetKcal=goalCalories(tdee,goal);
    const protein=Math.round((+ud.weight)*2.0);
    const carbs=Math.round((targetKcal*0.45)/4);
    const fats=Math.round((targetKcal*0.25)/9);
    document.getElementById('diet-goal-badge').textContent={lose:'Fat Loss Plan',gain:'Muscle Gain Plan',maintain:'Maintenance Plan'}[goal]||'Your Plan';
    document.getElementById('diet-goal-badge').className='badge '+(goal==='lose'?'badge-red':goal==='gain'?'badge-green':'badge-amber');
    bmiCard.style.display='block';
    bmiCard.innerHTML=`<div class="bmi-display">
      <div><div class="bmi-number" style="color:${color}">${bmi}</div><div style="font-size:.7rem;letter-spacing:.1em;text-transform:uppercase;color:var(--text-muted);margin-top:.3rem">BMI</div></div>
      <div class="bmi-info"><div class="bmi-category" style="color:${color}">${cat}</div><div class="bmi-desc">Based on your height of ${ud.height}cm and weight of ${ud.weight}kg. ${cat==='Healthy'?'Keep it up! Your plan is optimized for performance.':cat==='Underweight'?'Your plan focuses on calorie surplus and muscle building.':'Your plan is calibrated for gradual, sustainable fat loss.'}</div></div>
    </div>
    <div class="bmi-bar-wrap">
      <div class="bmi-bar"><div class="bmi-bar-fill" style="width:${Math.min(pct,100)}%;background:${color}"></div></div>
      <div class="bmi-bar-labels"><span class="bmi-bar-label">Underweight<br>&lt;18.5</span><span class="bmi-bar-label">Healthy<br>18.5-24.9</span><span class="bmi-bar-label">Overweight<br>25-29.9</span><span class="bmi-bar-label">Obese<br>&gt;30</span></div>
    </div>`;
    tipEl.style.display='block';
    tipEl.innerHTML=`<strong style="color:var(--white)">&#9888; Daily Tip:</strong> Your target is <strong style="color:var(--white)">${targetKcal} kcal/day</strong>. Aim for <strong style="color:var(--white)">${protein}g protein</strong> to support your ${goal==='lose'?'fat loss':'muscle'} goal. Stay hydrated — drink ${Math.round(+ud.weight*0.033)}L water daily.`;
    document.getElementById('calorie-strip').innerHTML=`
      <div class="cal-item"><div class="cal-num">${targetKcal}</div><div class="cal-lbl">Daily Calories</div></div>
      <div class="cal-item"><div class="cal-num">${protein}g</div><div class="cal-lbl">Protein</div></div>
      <div class="cal-item"><div class="cal-num">${carbs}g</div><div class="cal-lbl">Carbs</div></div>
      <div class="cal-item"><div class="cal-num">${fats}g</div><div class="cal-lbl">Fats</div></div>`;
  } else {
    bmiCard.style.display='none';tipEl.style.display='none';
    document.getElementById('calorie-strip').innerHTML=`<div style="font-size:.85rem;color:var(--text-muted)">Complete your <button onclick="goPage('profile')" style="background:none;border:none;color:var(--red);cursor:pointer;font-size:.85rem;font-weight:600">profile metrics</button> to see personalized calorie targets.</div>`;
  }
  renderWeekPlan();
}

function setDietType(t){
  dietType=t;
  document.getElementById('dt-veg').classList.toggle('active',t==='veg');
  document.getElementById('dt-nonveg').classList.toggle('active',t==='nonveg');
  renderWeekPlan();
}

function renderWeekPlan(){
  const meals=dietType==='veg'?vegMeals:nonvegMeals;
  const tabsEl=document.getElementById('week-tabs');
  const daysEl=document.getElementById('week-days');
  tabsEl.innerHTML=days.map((d,i)=>`<button class="week-tab${i===0?' active':''}" onclick="switchDay(${i})" id="wt-${i}">${d.slice(0,3)}</button>`).join('');
  daysEl.innerHTML=days.map((d,i)=>{
    const b=meals.breakfast[i%meals.breakfast.length];
    const l=meals.lunch[i%meals.lunch.length];
    const s=meals.snack[i%meals.snack.length];
    const dn=meals.dinner[i%meals.dinner.length];
    const mealCard=(m,time)=>`<div class="meal-card">
      <div class="meal-time">${time}</div>
      <div class="meal-name">${m.n}</div>
      <div class="meal-desc">${m.d}</div>
      <div class="meal-macros">
        <span class="macro-pill">P: ${m.p}</span>
        <span class="macro-pill">C: ${m.c}</span>
        <span class="macro-pill">F: ${m.f}</span>
        <span class="macro-pill">${m.kcal} kcal</span>
      </div>
    </div>`;
    return`<div class="day-plan${i===0?' active':''}" id="dp-${i}">${mealCard(b,'Breakfast')}${mealCard(l,'Lunch')}${mealCard(s,'Snack')}${mealCard(dn,'Dinner')}</div>`;
  }).join('');
}
function switchDay(i){
  document.querySelectorAll('.week-tab').forEach((t,j)=>t.classList.toggle('active',j===i));
  document.querySelectorAll('.day-plan').forEach((d,j)=>d.classList.toggle('active',j===i));
}

