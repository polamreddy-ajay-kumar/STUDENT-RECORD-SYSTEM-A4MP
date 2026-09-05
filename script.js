const DEMO={a4mp:{password:'a4mp143',students:[
{name:'Aarav Reddy',studentId:'CSE23001',registrationNo:'JNTU23CSE001',admissionNo:'ADM-2023-001',department:'Computer Science and Engineeri
ng',program:'B.Tech',year:'4',semester:'7',section:'A',batch:'2023–2027',admissionDate:'2023-08-10',dob:'2005-02-14',gender:'Male',bloodGrou
p:'O+',nationality:'Indian',email:'aarav.reddy@example.com',collegeEmail:'cse23001@college.edu',phone:'9876543210',altPhone:'9123456780',add
ress:'12 Green Park Road, Hyderabad',city:'Hyderabad',state:'Telangana',pin:'500001',guardianName:'Suresh Reddy',guardianRelation:'Father',g
uardianPhone:'9988776655',guardianEmail:'suresh@example.com',guardianOccupation:'Engineer',attendance:92,cgpa:9.18,backlogs:0,credits:138,ra
nk:2,remarks:'Excellent academic performance',portalUsername:'aarav23001',portalStatus:'Active',photo:''},
{name:'Ananya Sharma',studentId:'ECE23014',registrationNo:'JNTU23ECE014',admissionNo:'ADM-2023-014',department:'Electronics and
Communication Engineering',program:'B.Tech',year:'4',semester:'7',section:'B',batch:'2023–2027',admissionDate:'2023-08-10',dob:'2005-06-21',
gender:'Female',bloodGroup:'A+',nationality:'Indian',email:'ananya.sharma@example.com',collegeEmail:'ece23014@college.edu',phone:'9876501234
',altPhone:'9000012345',address:'Lake View Colony, Warangal',city:'Warangal',state:'Telangana',pin:'506001',guardianName:'Rajesh Sharma',gua
rdianRelation:'Father',guardianPhone:'9988001122',guardianEmail:'rajesh@example.com',guardianOccupation:'Business',attendance:78,cgpa:8.62,b
acklogs:0,credits:136,rank:8,remarks:'Consistent performance',portalUsername:'ananya23014',portalStatus:'Active',photo:''},
{name:'Vikram Kumar',studentId:'MECH23031',registrationNo:'JNTU23ME031',admissionNo:'ADM-2023-031',department:'Mechanical Engineering',progr
am:'B.Tech',year:'4',semester:'7',section:'A',batch:'2023–2027',admissionDate:'2023-08-10',dob:'2005-11-09',gender:'Male',bloodGroup:'B+',na
tionality:'Indian',email:'vikram.kumar@example.com',collegeEmail:'mech23031@college.edu',phone:'9012345678',altPhone:'',address:'Industrial
Estate, Vijayawada',city:'Vijayawada',state:'Andhra Pradesh',pin:'520001',guardianName:'Ravi Kumar',guardianRelation:'Father',guardianPhone:
'9090909090',guardianEmail:'ravi@example.com',guardianOccupation:'Supervisor',attendance:69,cgpa:7.21,backlogs:2,credits:124,rank:32,remarks
:'Needs attendance and academic improvement',portalUsername:'vikram23031',portalStatus:'Active',photo:''}
]}};
const $=id=>document.getElementById(id);let currentUser=null,students=[],editingPhoto='';
function key(){return `srs_students_${currentUser}`};function users(){return
JSON.parse(localStorage.getItem('srs_users')||JSON.stringify(DEMO))}function
saveUsers(u){localStorage.setItem('srs_users',JSON.stringify(u))}
function seed(){const u=users();if(!u.admin){u.admin=DEMO.admin;saveUsers(u)}}
function initials(n){return (n||'?').split(' ').map(x=>x[0]).slice(0,2).join('').toUpperCase()}
function loadData(){const
raw=localStorage.getItem(key());if(raw===null){students=JSON.parse(JSON.stringify(users()[currentUser]?.students||[]));saveData()}else
students=JSON.parse(raw)}function saveData(){localStorage.setItem(key(),JSON.stringify(students));const
u=users();if(u[currentUser]){u[currentUser].students=students;saveUsers(u)}}
function toast(m){$('toast').textContent=m;$('toast').classList.add('show');setTimeout(()=>$('toast').classList.remove('show'),2200)}
function login(){currentUser=localStorage.getItem('srs_session');if(!currentUser)return false;loadData();$('loginScreen').classList.add('hid
den');$('app').classList.remove('hidden');$('sideUser').textContent=currentUser;$('accountLabel').textContent=`Account:
${currentUser}`;$('userAvatar').textContent=initials(currentUser);renderAll();return true}
function logout(){localStorage.removeItem('srs_session');location.reload()}
function renderAll(){renderStats();renderStudents();renderAttendance();renderResults();renderActivity();renderAttention();$('darkToggle').ch
ecked=document.body.classList.contains('dark')}
function avg(field){return students.length?(students.reduce((a,s)=>a+Number(s[field]||0),0)/students.length):0}
function status(s){return Number(s.attendance)>=75&&Number(s.cgpa)>=7.5?'Good':Number(s.attendance)>=65||Number(s.cgpa)>=6.5?'Watch':'At
Risk'}
function statusClass(v){return v==='Good'?'good':v==='Watch'?'warn':'danger'}
function renderStats(){$('statsGrid').innerHTML=[['Total Students',students.length,'Enrolled records'],['Avg
Attendance',avg('attendance').toFixed(1)+'%','Across all students'],['Average CGPA',avg('cgpa').toFixed(2),'Current performance'],['At
Risk',students.filter(s=>status(s)==='At Risk').length,'Needs follow-up']].map(x=>`<div class="stat"><div class="label">${x[0]}</div><div
class="value">${x[1]}</div><div class="label">${x[2]}</div></div>`).join('');const depts={};students.forEach(s=>{depts[s.department]??=[];de
pts[s.department].push(Number(s.cgpa||0))});$('deptChart').innerHTML=Object.entries(depts).map(([d,a])=>{const
v=a.reduce((x,y)=>x+y,0)/a.length;return `<div class="bar-row"><span>${d}</span><div class="bar-track"><div class="bar-fill"
style="width:${v*10}%"></div></div><b>${v.toFixed(2)}</b></div>`}).join('')||'<p class="muted">No student records yet.</p>'}
function renderStudents(){const
q=($('searchInput')?.value||'').toLowerCase(),df=$('deptFilter')?.value||'all',yf=$('yearFilter')?.value||'all';const list=students.filter(s
=>(!q||JSON.stringify(s).toLowerCase().includes(q))&&(df==='all'||s.department===df)&&(yf==='all'||s.year===yf));$('recordCount').textConten
t=`${list.length} of ${students.length} records`;$('studentTable').innerHTML=list.map(s=>`<tr><td><div class="student-cell">${s.photo?`<img
class="student-photo" src="${s.photo}">`:`<div class="photo-fallback">${initials(s.name)}</div>`}<div><b>${s.name}</b><div
class="muted">${s.email||'No email'}</div></div></div></td><td><b>${s.studentId}</b></td><td>${s.department}</td><td>${s.year}th</td><td>${s
.attendance}%</td><td>${Number(s.cgpa).toFixed(2)}</td><td><span class="status ${statusClass(status(s))}">${status(s)}</span></td><td><div
class="action-row"><button class="secondary" onclick="previewStudent('${encodeURIComponent(s.studentId)}')">Preview</button><button
class="secondary" onclick="editStudent('${encodeURIComponent(s.studentId)}')">Edit</button><button class="danger"
onclick="deleteStudent('${encodeURIComponent(s.studentId)}')">Delete</button></div></td></tr>`).join('')||'<tr><td colspan="8"
class="muted">No matching students. Click Add Student to create a record.</td></tr>'}
function renderAttendance(){$('attendanceStats').innerHTML=[['Average Attendance',avg('attendance').toFixed(1)+'%'],['Safe',students.filter(
s=>Number(s.attendance)>=75).length],['Watch',students.filter(s=>Number(s.attendance)>=65&&Number(s.attendance)<75).length],['At
Risk',students.filter(s=>Number(s.attendance)<65).length]].map(x=>`<div class="stat"><div class="label">${x[0]}</div><div
class="value">${x[1]}</div></div>`).join('');$('attendanceTable').innerHTML=students.map(s=>`<tr><td><b>${s.name}</b><div class="muted">${s.
studentId}</div></td><td>${s.department}</td><td>${Math.round(Number(s.attendance||0)*1.2)}</td><td>120</td><td>${s.attendance}%</td><td><sp
an class="status ${Number(s.attendance)>=75?'good':Number(s.attendance)>=65?'warn':'danger'}">${Number(s.attendance)>=75?'Safe':Number(s.att
endance)>=65?'Watch':'At Risk'}</span></td></tr>`).join('')||'<tr><td colspan="6" class="muted">No records.</td></tr>'}
function renderResults(){const bands=[['9+','9.0–10',students.filter(s=>Number(s.cgpa)>=9).length],['8–8.99','8.0–8.99',students.filter(s=>N
umber(s.cgpa)>=8&&Number(s.cgpa)<9).length],['7–7.99','7.0–7.99',students.filter(s=>Number(s.cgpa)>=7&&Number(s.cgpa)<8).length],['Below
7','Below 7',students.filter(s=>Number(s.cgpa)<7).length]];$('gradeLegend').innerHTML=bands.map(x=>`<div><b>${x[0]}</b> · ${x[2]}
students</div>`).join('');const top=[...students].sort((a,b)=>b.cgpa-a.cgpa).slice(0,5);$('topPerformers').innerHTML=top.map((s,i)=>`<div
class="activity"><b>#${i+1} ${s.name}</b><br><span class="muted">${s.department} · ${s.studentId}</span><strong
style="float:right">${Number(s.cgpa).toFixed(2)}</strong></div>`).join('')||'<p class="muted">No results yet.</p>'}
function renderActivity(){$('activityList').innerHTML=students.slice(-5).reverse().map(s=>`<div class="activity"><b>${s.name}</b> ·
${s.studentId}<br><span class="muted">${s.department} · CGPA ${Number(s.cgpa).toFixed(2)}</span></div>`).join('')||'<p class="muted">No
recent activity.</p>'}
function renderAttention(){$('attentionList').innerHTML=students.filter(s=>status(s)!=='Good').map(s=>`<div
class="activity"><b>${s.name}</b> <span class="status ${statusClass(status(s))}">${status(s)}</span><br><span class="muted">Attendance
${s.attendance}% · CGPA ${Number(s.cgpa).toFixed(2)}</span></div>`).join('')||'<p class="muted">All students are currently in a healthy
status.</p>'}
function switchSection(sec){document.querySelectorAll('.nav-item').forEach(b=>b.classList.toggle('active',b.dataset.section===sec));document
.querySelectorAll('.page-section').forEach(s=>s.classList.toggle('active',s.id===sec));$('pageTitle').textContent=sec[0].toUpperCase()+sec.s
lice(1);$('sidebar').classList.remove('open')}
function openModal(s=null){$('studentForm').reset();$('editId').value='';editingPhoto='';$('modalTitle').textContent=s?'Edit Student':'Add
Student';if(s){Object.entries(s).forEach(([k,v])=>{const el=$(k==='attendance'?'attendanceInput':k);if(el&&k!=='photo')el.value=v??''});$('e
ditId').value=s.studentId;editingPhoto=s.photo||''}else{$('nationality').value='Indian';$('guardianRelation').value='Father';$('backlogs').v
alue=0;$('credits').value=0}$('modal').classList.add('show')}
function closeModal(){$('modal').classList.remove('show')}
function editStudent(id){const s=students.find(x=>x.studentId===decodeURIComponent(id));if(s)openModal(s)}
function deleteStudent(id){id=decodeURIComponent(id);if(confirm('Delete this student
record?')){students=students.filter(s=>s.studentId!==id);saveData();renderAll();toast('Student record deleted')}}
function previewStudent(id){const s=students.find(x=>x.studentId===decodeURIComponent(id));if(!s)return;const data=encodeURIComponent(btoa(u
nescape(encodeURIComponent(JSON.stringify(s)))));window.open(`student-profile.html?user=${encodeURIComponent(currentUser)}&data=${data}`,'_b
lank','noopener')}
function readForm(){const g=id=>$(id)?.value||'';return{name:g('name'),studentId:g('studentId'),registrationNo:g('registrationNo'),admission
No:g('admissionNo'),department:g('department'),program:g('program'),year:g('year'),semester:g('semester'),section:g('section'),batch:g('batc
h'),admissionDate:g('admissionDate'),dob:g('dob'),gender:g('gender'),bloodGroup:g('bloodGroup'),nationality:g('nationality'),email:g('email'
),collegeEmail:g('collegeEmail'),phone:g('phone'),altPhone:g('altPhone'),address:g('address'),city:g('city'),state:g('state'),pin:g('pin'),g
uardianName:g('guardianName'),guardianRelation:g('guardianRelation'),guardianPhone:g('guardianPhone'),guardianEmail:g('guardianEmail'),guard
ianOccupation:g('guardianOccupation'),attendance:Number(g('attendanceInput')||0),cgpa:Number(g('cgpa')||0),backlogs:Number(g('backlogs')||0)
,credits:Number(g('credits')||0),rank:g('rank'),remarks:g('remarks'),portalUsername:g('portalUsername'),portalStatus:g('portalStatus'),photo
:editingPhoto}}
function saveStudent(e){e.preventDefault();const s=readForm(),old=$('editId').value;if(!s.studentId)return;const
duplicate=students.some(x=>x.studentId===s.studentId&&x.studentId!==old);if(duplicate){toast('Student ID already exists');return}const
f=$('photo').files[0];if(f){const r=new FileReader();r.onload=()=>{s.photo=r.result;finishSave(s,old)};r.readAsDataURL(f)}else
finishSave(s,old)}
function finishSave(s,old){if(old){const i=students.findIndex(x=>x.studentId===old);students[i]=s}else
students.push(s);saveData();closeModal();renderAll();toast(old?'Student record updated':'Student record added successfully')}
function exportCSV(){const headers=['Name','Student ID','Registration No','Department','Program','Year','Semester','Section','Email','Phone'
,'Guardian','Attendance','CGPA','Backlogs','Credits','Rank','Status'];const rows=students.map(s=>[s.name,s.studentId,s.registrationNo,s.depa
rtment,s.program,s.year,s.semester,s.section,s.email,s.phone,s.guardianName,s.attendance,s.cgpa,s.backlogs,s.credits,s.rank,status(s)]);cons
t csv=[headers,...rows].map(r=>r.map(v=>`"${String(v??'').replaceAll('"','""')}"`).join(',')).join('\n');const
