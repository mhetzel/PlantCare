
var div = null;
var search = null;
var listWrap = null;
var list = null;

function newEl(tag, attrs) {
  var e=document.createElement(tag);
  if(attrs!==undefined) Object.keys(attrs).forEach(k=>{
    if(k==='class') { 
      Array.isArray(attrs[k]) ? attrs[k].forEach(o=>o!==''?e.classList.add(o):0) : (attrs[k]!==''?e.classList.add(attrs[k]):0)
    }
    else if(k==='style'){  
      Object.keys(attrs[k]).forEach(ks=>{
        e.style[ks]=attrs[k][ks];
      });
     }
    else if(k==='text'){
      attrs[k]===''?e.innerHTML='&nbsp;':e.innerText=attrs[k]
    }
    else e[k]=attrs[k];
  });
  return e;
}

function MultiselectDropdown(options){
  var config={
    search:false,
    height:'15rem',
    placeholder:'select',
    txtSelected:'selected',
    txtAll:'All',
    txtRemove: 'Remove',
    txtSearch:'search',
    ...options
  };
  
  document.querySelectorAll("select[multiple]").forEach((el,k)=>{
    // TODO make sure one doesn't exist in el before making a new one.
    div=newEl('div',{id:el.id+'multi', class:'multiselect-dropdown',style:{width:'100%',padding:config.style?.padding??''}});
    el.style.display='none';
    el.parentNode.insertBefore(div,el.nextSibling);
    listWrap=newEl('div',{class:'multiselect-dropdown-list-wrapper'});
    list=newEl('div',{class:'multiselect-dropdown-list',style:{height:config.height}});
    search=newEl('input',{class:['multiselect-dropdown-search'].concat([config.searchInput?.class??'form-control']),style:{width:'100%',display:el.attributes['multiselect-search']?.value==='true'?'block':'none'},placeholder:config.txtSearch});
    listWrap.appendChild(search);
    div.appendChild(listWrap);
    listWrap.appendChild(list);

    el.loadOptions=()=>{
      console.log('el load options')
      list.innerHTML='';
      
      if(el.attributes['multiselect-select-all']?.value=='true'){
        var op=newEl('div',{class:'multiselect-dropdown-all-selector'})
        var ic=newEl('input',{type:'checkbox'});
        op.appendChild(ic);
        op.appendChild(newEl('label',{text:config.txtAll}));
  
        op.addEventListener('click',()=>{
          op.classList.toggle('checked');
          op.querySelector("input").checked=!op.querySelector("input").checked;
          
          var ch=op.querySelector("input").checked;
          list.querySelectorAll(":scope > div:not(.multiselect-dropdown-all-selector)")
            .forEach(i=>{if(i.style.display!=='none'){i.querySelector("input").checked=ch; i.optEl.selected=ch}});
  
          el.dispatchEvent(new Event('change'));
        });
        ic.addEventListener('click',(ev)=>{
          ic.checked=!ic.checked;
        });
  
        list.appendChild(op);
      }

      Array.from(el.options).map(o=>{
        console.log('array from o', o)
        var op=newEl('div',{class:o.selected?'checked':'',optEl:o})
        console.log('array from op', op)
        var ic=newEl('input',{type:'checkbox',checked:o.selected});
        op.appendChild(ic);
        op.appendChild(newEl('label',{text:o.text}));

        op.addEventListener('click',()=>{
          op.classList.toggle('checked');
          op.querySelector("input").checked=!op.querySelector("input").checked;
          op.optEl.selected=!!!op.optEl.selected;
          el.dispatchEvent(new Event('change'));
        });
        ic.addEventListener('click',(ev)=>{
          ic.checked=!ic.checked;
        });
        o.listitemEl=op;
        console.log('o listitemel', o.listitemEl)
        list.appendChild(op);
      });
      
      div.listEl=listWrap;

      div.refresh=()=>{
        div.querySelectorAll('span.optext, span.placeholder').forEach(t=>div.removeChild(t));
        console.log('calling array from', el.selectedOptions)
        var sels=Array.from(el.selectedOptions);
        console.log('refresh', sels)
        if(sels.length>(el.attributes['multiselect-max-items']?.value??5)){
          div.appendChild(newEl('span',{class:['optext','maxselected'],text:sels.length+' '+config.txtSelected}));          
        }
        else{
          sels.map(x=>{
            var c=newEl('span',{class:'optext',text:x.text, srcOption: x});
            console.log('c.srcOption.listitemEl', c.srcOption.listitemEl)
            if((el.attributes['multiselect-hide-x']?.value !== 'true'))
              c.appendChild(newEl('span',{class:'optdel',text:'🗙',title:config.txtRemove, onclick:(ev)=>{
                console.log('div refresh on click c.srcOption.listitemEl', c.srcOption.listitemEl)
                c.srcOption.listitemEl.dispatchEvent(new Event('click'));
                div.refresh();
                ev.stopPropagation();
              }}));

            div.appendChild(c);
          });
        }
        if(0==el.selectedOptions.length) div.appendChild(newEl('span',{class:'placeholder',text:el.attributes['placeholder']?.value??config.placeholder}));
      };
      div.refresh();
    }
    el.loadOptions();
    
    search.addEventListener('input',()=>{
      list.querySelectorAll(":scope div:not(.multiselect-dropdown-all-selector)").forEach(d=>{
        var txt=d.querySelector("label").innerText.toUpperCase();
        d.style.display=txt.includes(search.value.toUpperCase())?'block':'none';
      });
    });

    div.addEventListener('click',()=>{
      div.listEl.style.display='block';
      search.focus();
      search.select();
    });
    
    document.addEventListener('click', docClickEvent);    

    // already
    console.log(el.nextSibling.attributes.class.value === 'multiselect-dropdown')
  });
}

function docClickEvent(event) {
  if (!div.contains(event.target)) {
    listWrap.style.display='none';
    div.refresh();
  }
}

window.addEventListener('load',()=>{
  MultiselectDropdown(window.MultiselectDropdownOptions);
});
