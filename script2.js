class Calendar {
    constructor(){    	
		this.now = new Date();	
		this.d = this.now.getDate();
		this.m = this.now.getMonth();
		this.y = this.now.getYear();	
		this.yy = this.now.getFullYear();			
    }
	
	// ustawienie struktury kalendarza
	setDiv(){
		
		let NewObj='';
		NewObj+=' <img src="logo2.png" alt="logo" height ="46px" width="75px"/>';
		NewObj+='<div class="tab_year">';
		NewObj+='<label id="f_year"></label></div>';
		
		NewObj+= '<div class="tab_month">';
		
		NewObj+= '<button class="btn_cal" id="b_prv" onClick="prev_month()"><<</button>';
		NewObj+= '<label id="f_month"></label>';
		NewObj+='<button class="btn_cal" id="b_nxt" onClick="next_month()">>></button></div>';	
		
		NewObj+= '<div class="tab_day_name" id="t_day_name"></div>';
		
		NewObj+= '<div class="tab_day" id="t_day"></div>';
		
		document.getElementById("calendar").innerHTML=NewObj;
	}
	
	// ustawienie dni tygodnia i kolorowanie niedzieli
	setTab(){
		const days=["Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "Ndz"];
		let NewDivDay="";
		for(let i in days){
				if (i==6){					
					NewDivDay=NewDivDay + '<div class="day_name" style="color: red" >' + (days[i]) + '</div>';	
				}else{
					NewDivDay=NewDivDay + '<div class="day_name">' + (days[i]) + '</div>';		
				}				
			document.getElementById("t_day_name").innerHTML=NewDivDay;			
		}
	}
	
	// ustawianie pól dni miesiaca i wyswietlenie roku oraz miesiaca
	setDays(){		
		const monthNames = ["styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec", "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień"];
		let offsetsDays = new Date(this.yy, this.m, 1).getDay();
		const daysInMonth = new Date(this.y, this.m+1, 0).getDate();
		
		document.getElementById("f_month").innerHTML=monthNames[this.m];
		document.getElementById("f_year").innerHTML=this.yy;
			
		let start = 1;
		if (offsetsDays===0){ 
			offsetsDays=7;
			start=7;
		}else{
			start=offsetsDays;
		}	
		
		const maxDays = 42;		
		let NewDivDay="";
		
		for(let i=1;i<=maxDays;i++){
			if (i>=daysInMonth+offsetsDays){
				NewDivDay += '<div class="day_dis" ></div>';				
			}else if (start===i){
				if (i%7===0){					
					NewDivDay += '<div class="day" style="color: red" onClick="click_day(' + (i-offsetsDays+1) + ')" >' + (i-offsetsDays+1) + '</div>';
				}else{
					NewDivDay += '<div class="day" onClick="click_day(' + (i-offsetsDays+1) + "," + (this.m+1) + "," + this.yy +')" >' + (i-offsetsDays+1) + '</div>';	
				}	
				start+=1;				
			}else{
				NewDivDay += '<div class="day_dis" ></div>';		
			}
				
			document.getElementById("t_day").innerHTML=NewDivDay;
		}
	}

	//zmiana miesiaca do przodu
	next(){		
		this.m++;
		if (this.m>11) {
			this.m=0;
			this.yy++;			
		}		
		this.setDays();
	}
	
	//zmiana miesiaca do tyłu
	prev(){		
		this.m--;
		if (this.m<0) {
			this.m=11;
			this.yy--;			
		}		
		this.setDays();		
	}	
}



class Visit{
	constructor(name,surname,phone,term){
		this.name = name;
		this.surname = surname;
		this.phone = phone;
		this.term = term;		
	}	
}


// obsługa butonów
function prev_month(){
	c.prev();	
}


function next_month(){
	c.next();
}


function saveVisit(){
		
	// sprawdzenie czy wypełnono poprawnie pola
	const obj = document.querySelector("div[id=win_visit]");
	
	const inputName = obj.querySelector("input[id=in_name]");
	const inputSurname = obj.querySelector("input[id=in_surname]");
	const inputPhone = obj.querySelector("input[id=in_phone]");
	const inputHour = obj.querySelector("input[id=in_hour]");
    let infoErr = "Nie mogę zapisać wizyty \n \n";
	let vErr=0
	
    if (!inputName.checkValidity()){
		infoErr+="popraw imie \n"; 
		vErr++;}
    if (!inputSurname.checkValidity()){
		infoErr+="popraw nazwisko \n"; 
		vErr++;}
	if (!inputPhone.checkValidity()){
		infoErr+="popraw telefon \n";
		vErr++;}
	if (!inputHour.checkValidity()){
		infoErr+="popraw godzinę \n";
		vErr++;}
		
    if (vErr > 0){
		alert(infoErr);
	}else{
		const n = document.getElementById("in_name").value;
		const s = document.getElementById("in_surname").value;   
		const p = document.getElementById("in_phone").value;
		const t = document.getElementById("in_date").innerHTML + " " + document.getElementById("in_hour").value;			
		
		let v = new Visit(n,s,p,t);		
		let terFree = true;			
		let i=0;
			
		// sprawdzenie czy termin jest wolny
		while (i < termAll.length){
			if(termAll[i].term == t){ 
					terFree = false;
					i = termAll.length;
				}else{
					terFree = true;
				}			
			i++;
		}	

		
		
		if (terFree){
			// dodaje termin do listy
			termAll.push(v);
			
			// zapis w localeStorage  
			localStorage.setItem('termAll', JSON.stringify(this.termAll));	
			
			// wyswietlam zapisany termin i osobe			
			visitOk(n,s,t);

			//czekam na koniec animacji i pokazuje kalendarz
			setTimeout(setCalendar,4000);
			
		}else{
			alert("W tym dniu ta godzina jest zajęta \n proszę wybrać inną");
		}	
	}
}


function setCalendar(){	
	c.setDiv();
	c.setTab();
	c.setDays();	
}


function click_day(nr,mo,ye){	
	
	document.getElementById("calendar").innerHTML='<div class="new_window" id="win_visit"></div>';
	
	let NewObj='';
	NewObj+='<div class="n_w"><label id="in_date">' + nr + "-" + mo + "-" + ye + '</label></div>';
	
	NewObj+='<div class="n_w"><label for="in_name">Imię</label>';
	NewObj+='<input type="text" id="in_name" minlength="1" maxlength="25" required/></div>';
	
	NewObj+='<div class="n_w"><label for="in_surname">Nazwisko</label>';
	NewObj+='<input type="text" id="in_surname" minlength="2" maxlength="35"required/></div>';
	
	NewObj+='<div class="n_w"><label for="in_phone">Telefon</label>';
	NewObj+='<input type="tel" id="in_phone" maxlength="11" placeholder="123-456-789" pattern="[0-9]{3}-[0-9]{3}-[0-9]{3}" required/></div>';
	
	NewObj+='<div class="n_w"><label for="in_hour">Godzina</label>';
	NewObj+='<input type="number" min="8" max="21" id="in_hour" required/></div>';
	
	NewObj+='<div class="n_h"><button class="btn_visit" id="btn_save" onClick="saveVisit()">Zapisz wizytę</button>';
	NewObj+='<button  class="btn_visit" id="btn_exit" onClick="setCalendar()">Anuluj</button></div>';
			
	document.getElementById("win_visit").innerHTML=NewObj;
	document.getElementById("in_name").focus();
}

function visitOk(n,s,t){	

	document.getElementById("win_visit").innerHTML='<div class="windowVisitAdd" id="win_visit_add"></div>';
	
	let NewObj='';
	NewObj+=' <img src="logo2.png" alt="logo" height ="46px" width="75px"/>';
	NewObj+='<div class="windowVisitAddDivName">' + n + ' ' + s + '</div>';	
	NewObj+='<div class="windowVisitAddDiv">zapisana/y na wizytę</div>';	
	NewObj+='<div class="windowVisitAddDiv">' + t + ':00 </div>';	
	
	document.getElementById("win_visit_add").innerHTML=NewObj;	
}


// lista na terminy
var termAll =[];
let dataLS = JSON.parse(localStorage.getItem("termAll"));

if (dataLS === null) {
	termAll = [];
}else{
	termAll = dataLS
}


let c = new Calendar();
setCalendar();




