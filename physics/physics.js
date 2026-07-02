/*==================================================
    PHYSICS.JS
    PART 3A
    Topic Generator + Search
==================================================*/

/*==============================
TOPICS
Add all your chapters here.
Only add ONE object for each file.
==============================*/

const topics = [

{
title:"Kinematics Part 1",
link:"kinematics1.html",
icon:"🚀",
description:"Motion in One Dimension"
},

{
title:"Kinematics Part 2",
link:"kinematics2.html",
icon:"⚛️",
description:"Projectile Motion"
},

{
title:"Laws of Motion",
link:"lawsofmotion.html",
icon:"🏹",
description:"Newton's Laws"
},

{
title:"Work Power Energy",
link:"workpowerenergy.html",
icon:"⚡",
description:"Energy & Conservation"
},

{
title:"Rotational Motion",
link:"rotationalmotion.html",
icon:"🌀",
description:"Torque & Rotation"
},

{
title:"Gravitation",
link:"gravitation.html",
icon:"🌍",
description:"Universal Gravitation"
},

{
title:"Electrostatics",
link:"electrostatics.html",
icon:"🔋",
description:"Charges & Electric Field"
},

{
title:"Current Electricity",
link:"currentelectricity.html",
icon:"💡",
description:"Current & Resistance"
},

{
title:"Magnetism",
link:"magnetism.html",
icon:"🧲",
description:"Magnetic Effects"
},

{
title:"EMI",
link:"emi.html",
icon:"⚙️",
description:"Electromagnetic Induction"
},

{
title:"Alternating Current",
link:"ac.html",
icon:"🔄",
description:"AC Circuits"
},

{
title:"Ray Optics",
link:"rayoptics.html",
icon:"🔍",
description:"Reflection & Refraction"
},

{
title:"Wave Optics",
link:"waveoptics.html",
icon:"🌈",
description:"Interference & Diffraction"
},

{
title:"Modern Physics",
link:"modernphysics.html",
icon:"☢️",
description:"Atoms & Nuclei"
}

];

/*==============================
DOM
==============================*/

const topicContainer =
document.getElementById("topicContainer");

const searchInput =
document.getElementById("searchInput");

const topicCount =
document.getElementById("topicCount");

/*==============================
CREATE CARDS
==============================*/

function createCards(list){

topicContainer.innerHTML="";

list.forEach(topic=>{

const card=document.createElement("div");

card.className="topic-card hidden";

card.innerHTML=`

<div class="topic-icon">
${topic.icon}
</div>

<h2 class="topic-title">
${topic.title}
</h2>

<p class="topic-desc">
${topic.description}
</p>

<div class="open-btn">

Open Lesson
<i class="fa-solid fa-arrow-right"></i>

</div>

`;

card.onclick=()=>{

window.location.href=topic.link;

};

topicContainer.appendChild(card);

});

topicCount.innerText=list.length;

observeCards();

}

/*==============================
SEARCH
==============================*/

searchInput.addEventListener("keyup",()=>{

const keyword=
searchInput.value.toLowerCase();

const filtered=
topics.filter(topic=>

topic.title.toLowerCase().includes(keyword) ||

topic.description.toLowerCase().includes(keyword)

);

createCards(filtered);

});

/*==============================
INITIAL LOAD
==============================*/

createCards(topics);
/*==================================================
    PHYSICS.JS
    PART 3B
==================================================*/

/*==============================
Dark Mode
==============================*/

const themeToggle =
document.getElementById("themeToggle");

const savedTheme =
localStorage.getItem("theme");

if(savedTheme==="dark"){

document.body.classList.add("dark");

themeToggle.innerHTML=
'<i class="fa-solid fa-sun"></i>';

}

themeToggle.addEventListener("click",()=>{

document.body.classList.toggle("dark");

if(document.body.classList.contains("dark")){

themeToggle.innerHTML=
'<i class="fa-solid fa-sun"></i>';

localStorage.setItem("theme","dark");

}else{

themeToggle.innerHTML=
'<i class="fa-solid fa-moon"></i>';

localStorage.setItem("theme","light");

}

});

/*==============================
Scroll To Top
==============================*/

const scrollBtn=
document.getElementById("scrollTop");

window.addEventListener("scroll",()=>{

if(window.scrollY>300){

scrollBtn.style.display="block";

}else{

scrollBtn.style.display="none";

}

});

scrollBtn.onclick=()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

};

/*==============================
Scroll Animation
==============================*/

function observeCards(){

const cards=
document.querySelectorAll(".topic-card");

const observer=
new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},{
threshold:.15
});

cards.forEach(card=>{

observer.observe(card);

});

}

/*==============================
Ripple Effect
==============================*/

document.addEventListener("click",(e)=>{

const card=
e.target.closest(".topic-card");

if(!card) return;

const ripple=
document.createElement("span");

ripple.className="ripple";

const rect=
card.getBoundingClientRect();

const size=
Math.max(rect.width,rect.height);

ripple.style.width=size+"px";

ripple.style.height=size+"px";

ripple.style.left=
(e.clientX-rect.left-size/2)+"px";

ripple.style.top=
(e.clientY-rect.top-size/2)+"px";

card.appendChild(ripple);

setTimeout(()=>{

ripple.remove();

},600);

});

/*==============================
Keyboard Shortcut
Press /
to focus search
==============================*/

document.addEventListener("keydown",(e)=>{

if(e.key==="/"){

e.preventDefault();

searchInput.focus();

}

});

/*==============================
Welcome Animation
==============================*/

window.addEventListener("load",()=>{

document.body.style.opacity="0";

document.body.style.transition=".5s";

setTimeout(()=>{

document.body.style.opacity="1";

},50);

});

/*==============================
Console Message
==============================*/

console.log(
"%cPhysics Learning Portal",
"font-size:24px;color:#4285F4;font-weight:bold;"
);

console.log(
"Built with ❤️ for JEE & WBJEE."
);
