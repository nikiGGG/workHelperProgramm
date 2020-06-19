let currentDiv = ''
function openbox (id) {
    display = document.getElementById(id.innerText).style.display;
    if(display==='none'){
       document.getElementById(id.innerText).style.display='block';
       if(currentDiv != '' && currentDiv != id.innerText)document.getElementById(currentDiv).style.display='none';
       if(id.innerText != 'Full')currentDiv = id.innerText
    }else if (id.innerHTML === 'Full') {
      if (display==='none') {
        document.getElementById(id.innerText).style.display='block';
      }else{
         document.getElementById(id.innerText).style.display='none';
      }
    } else{
       document.getElementById(id.innerText).style.display='none';
    }
}


function hideAll() {
  document.getElementById(currentDiv).style.display = 'none'
  document.getElementById('Full').style.display = 'none'
}
