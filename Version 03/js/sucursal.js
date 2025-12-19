  const toggleLogo = document.getElementById("toggleMenu");
  const menuItems = document.getElementById("menuItems");
  const sidebarPanel = document.getElementById("sidebarPanel");

  toggleLogo.addEventListener("click", () => {
    menuItems.classList.toggle("hidden");
    sidebarPanel.classList.toggle("collapsed");
  });


  const monthButton = document.getElementById("monthButton");
    const weekDaysContainer = document.getElementById("weekDays");
    const miniCalendar = document.getElementById("miniCalendar");
    const miniMonth = document.getElementById("miniMonth");
    const prev = document.getElementById("prev");
    const next = document.getElementById("next");
    const calendarGrid = document.getElementById("calendarGrid");

    let selectedDate = new Date();
    let currentMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);

    const today = new Date();
    today.setHours(0,0,0,0);

    const maxLimit = new Date(today);
    maxLimit.setDate(maxLimit.getDate() + 14);

    const weekNames = ["DOM","LUN","MAR","MIÉ","JUE","VIE","SÁB"];

    renderUI();

    function renderUI(){
        renderMonthTitle();
        renderWeekDays();
        renderCalendar();
    }

    function renderMonthTitle(){
        monthButton.textContent = selectedDate.toLocaleDateString("es-MX",{month:"long", year:"numeric"}).toUpperCase();
    }

    function renderWeekDays(){
        weekDaysContainer.innerHTML = "";

        const startOfWeek = new Date(selectedDate);
        startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay());

        for(let i=0;i<7;i++){
            const d = new Date(startOfWeek);
            d.setDate(startOfWeek.getDate() + i);

            const div = document.createElement("div");
            div.className = "day";
            if(d.toDateString() === selectedDate.toDateString()) div.classList.add("selected");

            div.textContent = weekNames[i];

            div.onclick = ()=>{
                selectDate(d);
                currentMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
                renderUI();
            };

            weekDaysContainer.appendChild(div);
        }
    }

    function renderCalendar(){
        calendarGrid.innerHTML = "";

        miniMonth.textContent = currentMonth.toLocaleDateString("es-MX",{month:"long", year:"numeric"}).toUpperCase();

        const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
        const start = firstDay.getDay();

        for(let i=0;i<start;i++){
            calendarGrid.appendChild(document.createElement("div"));
        }

        const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth()+1, 0).getDate();

        for(let d=1; d<=daysInMonth; d++){
            const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), d);
            const div = document.createElement("div");
            div.textContent = d;

            if(date > maxLimit || date < today){
                div.classList.add("disabled");
            }

            if(date.toDateString() === selectedDate.toDateString()){
                div.classList.add("selected-day");
            }

            div.onclick = ()=>{
                selectDate(date);
                currentMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
                renderUI();
            };

            calendarGrid.appendChild(div);
        }
    }

    function selectDate(date){
        selectedDate = new Date(date);
    }

    monthButton.onclick =()=>{
        miniCalendar.style.display = miniCalendar.style.display === "block" ? "none":"block";
    };

    prev.onclick =()=>{
        currentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth()-1, 1);
        renderCalendar();
    };

    next.onclick =()=>{
        const tentative = new Date(currentMonth.getFullYear(), currentMonth.getMonth()+1, 1);
        if(tentative > maxLimit) return;
        currentMonth = tentative;
        renderCalendar();
    };