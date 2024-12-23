  var hiddenForm = document.getElementById('login');
  var lgnbtn = document.getElementById('lgnbtn');
  var hisbtn = document.getElementById('hisbtn');
  var hisdiv = document.getElementById('hisdiv');
  var canbtn = document.getElementById('canbtn');
  var candiv = document.getElementById('candiv');
  var lgnStatusPara = document.getElementById('lgn-status-para');
  var cansub = document.getElementById('cansub');
  var profbtn = document.getElementById('profbtn');
  var profdiv = document.getElementById('profdiv');
  var profsub = document.getElementById('profsub');
  var closeModal = document.getElementsByClassName("close")[0];
  var vdt = document.getElementById('dt');
  var canName = document.getElementById('can-name');
  var canStDt = document.getElementById('can-st-dt');
  var nisDiv = document.getElementById('nis-div');
  var nis = document.getElementById('nis');
var mainObj = {
   xp : null
};
  var vmainObj=null;//localStorage.getItem('sifr');
  if(vmainObj!==null){
   mainObj=JSON.parse(vmainObj);
  }


  const divs = [hiddenForm, hisdiv, candiv,profdiv]; // Array of all div elements

  function closeAllDivs() {
    divs.forEach(div => {
      div.style.display = 'none'; // Hide all divs
    });
  }

  // function sendRequest(xhr){
  //   var xhr = new XMLHttpRequest();
  //   var url = "https://sifr.in/c/f/b1.php";
  //   xhr.open("POST", url, true); 
  //   xhr.setRequestHeader("Content-Type", "application/json");
  // }

  function formatDate(dateStr) {
    if (!dateStr) {
      return null; 
    }
    const dateParts = dateStr.split("-"); 
    const year = dateParts[0];
    const month = dateParts[1];
    const day = dateParts[2];
    return `${day}-${month}-${year}`;
  }

  // Event listener for showFormBtn
  /*showFormBtn.addEventListener('click', function() {
    if(mainObj.token === null || mainObj.token === undefined){
      if (hiddenForm.style.display === 'block') {
        hiddenForm.style.display = 'none'; // If already open, close it
      } else {
        closeAllDivs(); // Close all divs first
        hiddenForm.style.display = 'block'; // Show the clicked div
      }
    }else{
      document.getElementById("lgn-status-para").textContent="you are already logged in";
      closeAllDivs();
    }
  });*/

  
  hisbtn.addEventListener('click', function() {
    if (vmainObj === null) {
        closeAllDivs(); 
        hiddenForm.style.display = 'flex'; 
        closeModal.onclick = function () {
          hiddenForm.style.display = "none"; // Hide modal
        }
        window.onclick = function (event) {
          if (event.target == hiddenForm) {
            hiddenForm.style.display = "none";
          }
        }
    } else {
      var today = new Date();
      var xpDate = new Date(mainObj.xp);     
      if(xpDate < today){
        closeAllDivs(); 
        hiddenForm.style.display = 'flex'; 
        closeModal.onclick = function () {
          hiddenForm.style.display = "none"; // Hide modal
        }
        window.onclick = function (event) {
          if (event.target == hiddenForm) {
            hiddenForm.style.display = "none";
          }
        }
      }else{
        if (hisdiv.style.display === 'block') {
          hisdiv.style.display = 'none'; 
        } else {
          closeAllDivs(); 
          hisdiv.style.display = 'block'; 
        }
      }
    }
  });

  vdt.addEventListener('change',function(){
    nis.style.display='none';
    nisDiv.style.display='block';
    var xhr = new XMLHttpRequest();
    var url = "https://sifr.in/c/f/b1.php";
    xhr.open("POST", url, true); 
    xhr.setRequestHeader("Content-Type", "application/json");
    //sendRequest(xhr); 
    
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) { 
            var response = JSON.parse(xhr.responseText); 
            if(response.tk.length>40){
              if(response.su===1){
                canName.innerText="Name:"+ response.o262.n; 
                if(response.o262.e===null){
                  nis.style.display='block';
                  nisDiv.style.display='none';
                  nis.innerText="This date is not in your subscription";
                }else{
                  var formattedDate = formatDate(response.o262.e);
                  canStDt.innerText="Starting Date:"+ formattedDate;
                }
                //document.getElementById("tamt").value = response.o262.f;
                if(response.o262.muf==2){
                  document.getElementById("lunch").disabled = true;
                  document.getElementById("ltext").style.color="red";
                }else{
                  document.getElementById("lunch").disabled = false;
                  document.getElementById("ltext").style.color="black";
                }
                if(response.o262.mug==2){
                  document.getElementById("dinner").disabled = true;
                  document.getElementById("dtext").style.color="red";
                }  
              }
            }
        }
    };

    var data = JSON.stringify({
      "ap": 0,
      "tk": "OqQEWQBSubKK41gKkE20WCMe1d9SY8yb1728627325",
      "vw": 65,
      "fn": 262,
      "d": "2",
      "o": "0",
      "fm": "0",
      "fe": "0",
      "f": "0",
      "m": "6196",
      "e": "1",
      "u": "0",
      "v": "0",
      "w": "0",
      "x": "0",
      "x1": vdt.value
  });
    xhr.send(data);
  });
  
  canbtn.addEventListener('click', function() {

    if (candiv.style.display === 'block') {
      candiv.style.display = 'none'; 
    } else {
      closeAllDivs(); 
      candiv.style.display = 'block'; 
    }
    
    var todayDate = new Date();
    var tommarowDate = new Date();
    var hours = todayDate.getHours();
    tommarowDate.setDate(todayDate.getDate() + 1);
    var nextMonth = new Date();
    nextMonth.setMonth(tommarowDate.getMonth() + 1); 
    

    if(hours>17 && hours<24){
      var formattedDate = tommarowDate.toISOString().split('T')[0];
    }else{
      var formattedDate = todayDate.toISOString().split('T')[0];
    }
    
    //document.getElementById('dt').value = formattedDate;
    var formattedNextMonth = nextMonth.toISOString().split('T')[0];
    
    var dateInput = document.getElementById('dt');
    dateInput.setAttribute('min', formattedDate);
    dateInput.setAttribute('max', formattedNextMonth);
  });

  profbtn.addEventListener('click', function() {
    if (vmainObj === null) {
      closeAllDivs(); 
      hiddenForm.style.display = 'flex'; 
      closeModal.onclick = function () {
        hiddenForm.style.display = "none"; // Hide modal
      }
      window.onclick = function (event) {
        if (event.target == hiddenForm) {
          hiddenForm.style.display = "none";
        }
      }
    }else { 
      var today = new Date();
      var xpDate = new Date(mainObj.xp);     
      if(xpDate < today){
        closeAllDivs(); 
        hiddenForm.style.display = 'flex'; 
        closeModal.onclick = function () {
          hiddenForm.style.display = "none"; // Hide modal
        }
        window.onclick = function (event) {
          if (event.target == hiddenForm) {
            hiddenForm.style.display = "none";
          }
        }
      }else{
        if (profdiv.style.display === 'block') {
          profdiv.style.display = 'none'; 
        } else {
          closeAllDivs(); 
          profdiv.style.display = 'block'; 
        }
      }        
    }
  });
  

  lgnbtn.addEventListener('click', function() {
    var xhr = new XMLHttpRequest();
    var url = "https://dummyjson.com/auth/login";
    xhr.open("POST", url, true); 
    xhr.setRequestHeader("Content-Type", "application/json"); 
    
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) { 
            var response = JSON.parse(xhr.responseText);
            console.log(response); 
            if(response.accessToken.length>100){
              mainObj.token=response.accessToken;
              mainObj.xp="2024-11-15 10:45";
              mainObj.o263= [
                {
                    "a": "1",
                    "b": "2024-10-11 16:31:21",
                    "c": "4",
                    "d": "0",
                    "e": "2024-08-08",
                    "f": "1600"
                },
                {
                    "a": "2",
                    "b": "2024-10-11 12:28:39",
                    "c": "4",
                    "d": "0",
                    "e": "2024-10-15",
                    "f": "1600"
                },
                {
                    "a": "3",
                    "b": "2024-10-11 16:31:02",
                    "c": "4",
                    "d": "0",
                    "e": "2024-07-03",
                    "f": "1600"
                },
                {
                    "a": "4",
                    "b": "2024-10-11 16:30:44",
                    "c": "4",
                    "d": "0",
                    "e": "2024-06-01",
                    "f": "1600"
                },
                {
                    "a": "5",
                    "b": "2024-10-11 16:31:26",
                    "c": "4",
                    "d": "0",
                    "e": "2024-09-09",
                    "f": "1600"
                }
            ]
        
              localStorage.setItem('sifr',JSON.stringify(mainObj));

              closeAllDivs();
              lgnStatusPara.textContent="you are logged in";
            }
        }
    };

    var data = JSON.stringify({"username": "emilys", "password": "emilyspass"});
    xhr.send(data); 
  });



cansub.addEventListener('click', function() {
  
  if (vmainObj === null) {
    closeAllDivs(); 
    hiddenForm.style.display = 'flex'; 
    closeModal.onclick = function () {
      hiddenForm.style.display = "none"; 
    }
    window.onclick = function (event) {
      if (event.target == hiddenForm) {
        hiddenForm.style.display = "none";
      }
    }
  }else{
    var today = new Date();
    var xpDate = new Date(mainObj.xp);     
    if(xpDate < today){
      closeAllDivs(); 
      hiddenForm.style.display = 'flex'; 
      closeModal.onclick = function () {
        hiddenForm.style.display = "none"; // Hide modal
      }
      window.onclick = function (event) {
        if (event.target == hiddenForm) {
          hiddenForm.style.display = "none";
        }
      }
    }else{
      var xhr = new XMLHttpRequest();
      var url = "https://dummyjson.com/auth/login";
      xhr.open("POST", url, true); 
      xhr.setRequestHeader("Content-Type", "application/json"); 

      
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) { 
            var response = JSON.parse(xhr.responseText);
            console.log(response); 
            if(response.accessToken.length>100){
              mainObj.token=response.accessToken;
              closeAllDivs();
              document.getElementById("lgn-status-para").textContent="you are logged in";
            }
        }
      };
      var callurl=1;
      var now = new Date();
      var hours = now.getHours();
      
      var lv=document.getElementById('lunch');
      var lvv=0
      if(lv.checked){
        if(hours<10){
          lvv=2;
        }else{
          callurl=0;
          lvv=0;
          alert("lunch cancellation time is passed");
        }
      }
      else{
        lvv=0;
      }
      var ld=document.getElementById('dinner');
      var ldd=0
      if(ld.checked){
        if(hours<17){
          
          ldd=2;
        }else{
          callurl=0;
          ldd=0;
          alert("dinner cancellation time is passed");
        } 
      }
      else{
        ldd=0;
      }

      var vdt=document.getElementById('dt').value;

      //var data = JSON.stringify({"dt": vdt , "l": lvv,"d":ldd});
      mainObj.o1={"dt": vdt , "l": lvv,"d":ldd};
      if(callurl===1){
        xhr.send(JSON.stringify(mainObj)); 
      }
      }
      }
    
});

profsub.addEventListener('click', function() {
  var startdt=document.getElementById('startdt').value;
  var uname=document.getElementById('uname').value;
  var umob=document.getElementById('umob').value;
  var uaddr=document.getElementById('uaddr').value;
  var tamt=document.getElementById('tamt').value;
  var pamt=document.getElementById('pamt').value;
  var ramt=document.getElementById('ramt').innerText;
  var leaves=document.getElementById('leaves').innerText;

  var xhr = new XMLHttpRequest();
  var url = "https://dummyjson.com/auth/login";
  xhr.open("POST", url, true); 
  xhr.setRequestHeader("Content-Type", "application/json"); 

  
  xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) { 
          var response = JSON.parse(xhr.responseText);
          console.log(response); 
          if(response.accessToken.length>100){
            mainObj.token=response.accessToken;
            closeAllDivs();
            document.getElementById("lgn-status-para").textContent="you are logged in";
          }
      }
  };
  mainObj.o2={"startdate": startdt, "username": uname, "usermobile": umob, "useraddress": uaddr, "totalAmount": tamt, "paidAmount": pamt, "remainingAmount": ramt, "leaves": leaves}
  xhr.send(JSON.stringify(mainObj));
  // var data = JSON.stringify({});
  // xhr.send(data); 
});