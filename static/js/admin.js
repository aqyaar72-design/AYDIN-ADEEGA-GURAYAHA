const ready=window.supabase && window.AYDIN_SUPABASE_URL && window.AYDIN_SUPABASE_PUBLISHABLE_KEY && !window.AYDIN_SUPABASE_PUBLISHABLE_KEY.startsWith("KU_DHEJI");
const sb=ready?window.supabase.createClient(window.AYDIN_SUPABASE_URL,window.AYDIN_SUPABASE_PUBLISHABLE_KEY):null;
const loginPanel=document.getElementById("loginPanel"),dash=document.getElementById("dashboard"),loginMsg=document.getElementById("loginMessage"),dashMsg=document.getElementById("dashMessage");
function showLogin(){loginPanel.hidden=false;dash.hidden=true}
async function loadBookings(){
 dashMsg.textContent="Xogta waa la soo rarayaa...";
 const {data,error}=await sb.from("bookings").select("*").order("created_at",{ascending:false});
 if(error){dashMsg.className="message error";dashMsg.textContent="Xogta lama soo qaadi karin: "+error.message;return}
 document.getElementById("totalCount").textContent=data.length;
 document.getElementById("newCount").textContent=data.filter(x=>x.status==="Cusub").length;
 document.getElementById("doneCount").textContent=data.filter(x=>x.status==="La dhammeeyey").length;
 const tbody=document.getElementById("bookingsBody");
 tbody.replaceChildren();
 if(!data.length){tbody.innerHTML='<tr><td colspan="7">Weli ma jiraan codsiyo.</td></tr>'}
 data.forEach(b=>{
  const tr=document.createElement("tr");
  const vals=[b.reference,b.customer_name,b.phone,b.service_id,b.city+" — "+b.address,b.preferred_date+" / "+b.preferred_time];
  vals.forEach(v=>{const td=document.createElement("td");td.textContent=v||"—";tr.appendChild(td)});
  const td=document.createElement("td"),select=document.createElement("select");
  ["Cusub","La xaqiijiyey","Shaqada socota","La dhammeeyey","La joojiyey"].forEach(s=>{const o=document.createElement("option");o.value=s;o.textContent=s;o.selected=b.status===s;select.appendChild(o)});
  select.addEventListener("change",async()=>{const {error}=await sb.from("bookings").update({status:select.value}).eq("id",b.id);dashMsg.className=error?"message error":"message success";dashMsg.textContent=error?"Xaaladda lama beddeli karin: "+error.message:"Xaaladda codsiga waa la beddelay.";if(!error)loadBookings()});
  td.appendChild(select);tr.appendChild(td);tbody.appendChild(tr);
 });
 dashMsg.className="message success";dashMsg.textContent="Xogta waa la cusboonaysiiyey.";
}
async function checkSession(){
 if(!sb){loginMsg.className="message error";loginMsg.textContent="Marka hore ku dar Supabase Publishable Key-ga faylka config.js.";return}
 const {data}=await sb.auth.getSession();
 if(data.session){loginPanel.hidden=true;dash.hidden=false;loadBookings()}
}
document.getElementById("loginForm").addEventListener("submit",async e=>{
 e.preventDefault();if(!sb){loginMsg.textContent="Supabase lama diyaarin.";return}
 const f=new FormData(e.target);loginMsg.textContent="Waa la xaqiijinayaa...";
 const {error}=await sb.auth.signInWithPassword({email:f.get("email"),password:f.get("password")});
 if(error){loginMsg.className="message error";loginMsg.textContent="Gelitaanku wuu fashilmay: "+error.message;return}
 loginPanel.hidden=true;dash.hidden=false;loadBookings();
});
document.getElementById("logoutBtn").addEventListener("click",async()=>{await sb.auth.signOut();showLogin()});
document.getElementById("refreshBtn").addEventListener("click",loadBookings);
checkSession();
