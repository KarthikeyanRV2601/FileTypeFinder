window.onload=()=>{
    var tag = document.createElement("script");
    tag.src = "./JS/Functions.js";
    tag.defer=true
    document.getElementsByTagName("head")[0].appendChild(tag);
}