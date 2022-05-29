const jumpToVoidBtn = document.getElementById("jump");
const backToGroundBtn = document.getElementById("back");
const first = document.getElementById("from1");
const second = document.getElementById("from2");
const type = document.getElementById("type");
const version = document.getElementById("version");
const container = document.querySelector(".container");

jumpToVoidBtn.addEventListener("click", ()=> {
    container.classList.remove("right-panel-active");
})
backToGroundBtn.addEventListener("click", ()=> {
    container.classList.add("right-panel-active");
})

type.addEventListener("change", () => {
    var index = type.selectedIndex;
    var text = type.options[index].text;
    $.getJSON("jar/Spigot/1.17.1/index.json", function(data) {
        console.log(data);
    })
})