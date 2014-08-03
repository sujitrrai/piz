window.onload = init;
var ordercomplete = document.getElementById('ordercomplete');
var dropdown = document.getElementById('pizza');
var modal = document.getElementById('displaymodal');
var total = document.getElementById('total');
var nooforder = document.getElementById('nooforders');
var anotherorder = document.getElementById('anotherorder');
var deliver = document.getElementById('deliver');
var size;
var info = {};
function init() {
    //console.log(sessionStorage.total);
    if (sessionStorage.info) {
        info = JSON.parse(sessionStorage.info);
        console.log(info);
        console.log(sessionStorage.info);
        document.getElementById('phno').value = info.phonenumber;
        document.getElementById('address').value = info.address;
        document.getElementById('username').value = info.username;
        document.getElementById('nooforders').value = 1;
        ordercomplete.onmousedown = extractInfo;
        anotherorder.onmousedown = redirect;
        deliver.onmousedown = exit;
        dropdown.onfocus = getNames;
        getNames();
    }
    else{
        window.location.pathname = "";
    }
}

function exit(){
    document.getElementsByTagName('body')[0].innerHTML = "<p class='thanks'>THANKS FOR PURCHASING</p>";
    delete sessionStorage.total;
    delete sessionStorage.info;
}

function redirect(){
    alert(sessionStorage.total);
    window.location.pathname = '/pizza';
}

function getNames(){
    
    if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
                 xmlhttp=new XMLHttpRequest();
        }
        else{// code for IE6, IE5
                xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange=function(){
                if (xmlhttp.readyState==4 && xmlhttp.status==200){
                    //converting data into object form
                    console.log(JSON.parse(xmlhttp.responseText));
                    dropdown.innerHTML = '';
                    var data = JSON.parse(xmlhttp.responseText);
                    for(var i=0;i<data.length;i++){
                        if (data[i].pizza) {
                            createList(data[i].pizza);
                        }
                        
                    }
                }
        }
        //sending data in the string form as it is not getting received as object
        xmlhttp.open("GET","/pizza/?names=true",true);
        xmlhttp.send();
}

function createList(data){
    var element = document.createElement('option');
    element.value = data;
    element.textContent = data;
    dropdown.appendChild(element);
}

function removeSpace(text) {
        //removing whitespace
        return text.replace(/ /g,"");
}

function extractInfo(){
    var data = {},ph,add,date,time,pizza,size,nsize,toppings = new Array(),ntoppings,specialinfo;
    data.toppings = toppings;
    data.ph = document.getElementsByName('phonenumber')[0].value;
    data.add = document.getElementById('address').value;
    data.date = document.getElementsByName('orderdate')[0].value;
    
    //date is retrieved in the format yyyy-mm-dd
    data.time = document.getElementsByName('ordertime')[0].value;
    
    data.pizza = document.getElementById('pizza').value;
    console.log(data.pizza);
    nsize = document.getElementsByName('size');
    for (i=0;i<nsize.length;i++) {
        if (nsize[i].checked) {
            data.size = nsize[i].value;
            size = nsize[i].value;
        }
    }
    ntoppings = document.getElementsByName('toppings');
    for(i=0;i<ntoppings.length;i++){
        if (ntoppings[i].checked) {
            data.toppings.push(ntoppings[i].value);
            
        }
    }
    data.specialinfo = document.getElementById('specialinfo').value;
    console.log(data);
    sendData(data);
    modal.style.opacity = '1';
    modal.style.pointerEvents = 'auto';
    modal.style.visibility = 'visible';
}
function sendData(data) {
     if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
                 xmlhttp=new XMLHttpRequest();
        }
        else{// code for IE6, IE5
                xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange=function(){
                if (xmlhttp.readyState==4 && xmlhttp.status==200){
                    //converting data into object form
                    console.log(JSON.parse(xmlhttp.responseText));
                    var res = JSON.parse(xmlhttp.responseText);
                    var priceonsize;
                    if (document.getElementsByName('size')[0].checked) {
                        priceonsize = res.price.size.small;
                        console.log('for small : '+priceonsize);
                    }
                    else if (document.getElementsByName('size')[1].checked) {
                        priceonsize = res.price.size.medium;
                        console.log('for medium : '+priceonsize);
                    }
                    else if (document.getElementsByName('size')[2].checked) {
                        priceonsize = res.price.size.large;
                        console.log('for large : '+priceonsize);
                    }
                    
                    var totl;
                    if (sessionStorage.total!==undefined && sessionStorage.hasOwnProperty('total')) {
                        console.log(sessionStorage.total);
                        console.log(typeof NaN);
                        console.log(typeof sessionStorage.total);
                        console.log('inside if');
                        var prevprice = 1*sessionStorage.total;
                        console.log('prevprice :'+prevprice);
                        sessionStorage.total = sessionStorage.total =''+(prevprice+(1*nooforder.value*priceonsize));
                        console.log('sessionstorage.total :'+sessionStorage.total);
                        totl = sessionStorage.total;
                        console.log('total :'+totl);
                    }
                    else{
                        console.log('inside else');
                        totl = ''+(1*nooforder.value*priceonsize);
                        console.log('total :'+totl);
                        sessionStorage.total = ''+totl;
                        console.log('sessionStorage.total :'+sessionStorage.total);
                    }
                    total.innerText = 'TOTAL PRICE : '+totl;
                }
        }
        //sending data in the string form as it is not getting received as object
        xmlhttp.open("POST","/pizza/"+JSON.stringify(data),true);
        xmlhttp.send();
}