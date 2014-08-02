window.onload = init;
var list = document.getElementById('showpizza');
var add = document.getElementById('addpizza');
var edit = document.getElementById('edit');
var listview = document.getElementById('list');
var addview = document.getElementById('addition');
var del = document.getElementById('delete');
var submit = document.getElementById('submit'),target,editflag = false,olddetails;
function init(){
    
    list.onmousedown = displayList;
    add.onmousedown = activateAddView;
    edit.onmousedown = editview;
    del.onmousedown = removerow;
    submit.onmousedown = addPizza;
}
function displayList(){
    listview.style.visibility = 'visible';
    addview.style.visibility = 'hidden';
    edit.style.visibility = 'hidden';
    del.style.visibility = 'hidden';
    listview.innerHTML = '';
    if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
             xmlhttp=new XMLHttpRequest();
    }
    else{// code for IE6, IE5
            xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function(){
            if (xmlhttp.readyState==4 && xmlhttp.status==200){
               console.log('got');
               var data = JSON.parse(xmlhttp.responseText);
               console.log(data);
               for (var i=0;i<data.length;i++) {
               console.log(data[i]);
                    if (data[i].pizza&&data[i].price) {
                    console.log(data);
                    insertList(data[i]);
                    }
               }
               var rows = document.getElementsByClassName('row');
               for (var i=0;i<rows.length;i++) {
                rows[i].onmousedown = showOptions;
               }
               }
    }
    xmlhttp.open("GET","/admin/?showlist=true",true);
    xmlhttp.send();
}
function insertList(data) {
    
    var row =document.createElement('p');
    row.className = 'row';
    row.innerHTML = '<span class="r">'+'pizza :'+data.pizza+'</span>'+'<span class="r">'+'price :'+data.price+'</span>';  
    listview.appendChild(row);
}
function showOptions(e){
    //saving target to be used for editing or deleting
    target = e.target.parentNode;
    console.log('in show options');
    edit.style.visibility = 'visible';
    del.style.visibility = 'visible';
}
function activateAddView() {
    addview.style.visibility = 'visible';
    listview.style.visibility = 'hidden';
    edit.style.visibility = 'hidden';
    del.style.visibility = 'hidden';
    document.getElementById('newpizza').value='';
    document.getElementById('price').value='';
}
function removerow(){
    olddetails = extractData(target);
    if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
                 xmlhttp=new XMLHttpRequest();
        }
        else{// code for IE6, IE5
                xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange=function(){
                if (xmlhttp.readyState==4 && xmlhttp.status==200){
                   console.log(JSON.parse(xmlhttp.responseText));
                   //if edit flag is true than display list as it is been edited
                   displayList();
                }
        }
        xmlhttp.open("post","/admin/"+JSON.stringify(olddetails)+"?details=true",true);
        //xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        //editflag for checking whether to edit or add
        //var txt =JSON.stringify(data);
        xmlhttp.send();
    
}
function editview(){
    addview.style.visibility = 'visible';
    listview.style.visibility = 'hidden';
    edit.style.visibility = 'hidden';
    del.style.visibility = 'hidden';
    olddetails = extractData(target);
    document.getElementById('newpizza').value = olddetails.pizza;
    document.getElementById('price').value = olddetails.price;
    editflag = true;
}
function extractData(parentnode){
   var child = parentnode.getElementsByClassName('r');
   var details = {};
   details.pizza = extractText(child[0],'pizza :');
   details.price = extractText(child[1],'price :');
   return details;
}
function extractText(nod,str){
    console.log(nod);
    var txt = nod.textContent;
    var len = str.length;
    txt = txt.slice(len);
    console.log(txt);
    return txt;
}
function addPizza(){
    var data = {};
    var pizza = document.getElementById('newpizza').value;
    var price = document.getElementById('price').value;
    if (editflag) {
        data.changed = {};
        data.old = {};
        data.old = olddetails;
        data.changed.pizza=pizza;
        data.changed.price=price;
    }
    else {
    //data should be handled with care as it is going to be stored
    //directly in database
        data.pizza = pizza;
        data.price = price;
    }
        if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
                 xmlhttp=new XMLHttpRequest();
        }
        else{// code for IE6, IE5
                xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange=function(){
                if (xmlhttp.readyState==4 && xmlhttp.status==200){
                   console.log(JSON.parse(xmlhttp.responseText));
                   //if edit flag is true than display list as it is been edited
                   displayList();
                   editflag=false;
                }
        }
        xmlhttp.open("post","/admin/"+JSON.stringify(data)+"?editflag="+editflag,true);
        //xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        //editflag for checking whether to edit or add
        //var txt =JSON.stringify(data);
        xmlhttp.send();
}