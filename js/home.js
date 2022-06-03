const jumpToVoidBtn = document.getElementById("jump");
const backToGroundBtn = document.getElementById("back");
const first = document.getElementById("from1");
const second = document.getElementById("from2");
const type = document.getElementById("type");
const version = document.getElementById("version");
const download = document.getElementById("download");
const hash = document.getElementById("hash");
const container = document.querySelector(".container");
var selectedType = type.options[type.selectedIndex].text;
var selectedVersion = "0";
var downloadLink = "None";
jumpToVoidBtn.addEventListener("click", ()=> {
    container.classList.remove("right-panel-active");
})
backToGroundBtn.addEventListener("click", ()=> {
    container.classList.add("right-panel-active");
})
download.addEventListener("click", () => {
    if (downloadLink != "None")
        window.open(downloadLink);
})
type.addEventListener("change", () => {
    var index = type.selectedIndex;
    selectedType = type.options[index].text;
    if (refresh_version())
        refresh();
})

version.addEventListener("change", () => {
    var index = version.selectedIndex;
    selectedVersion = version.options[index].text;
    refresh();
})
function refresh_version() {
    $.getJSON("jar/Version.json", function(data) {
        version.innerHTML = "";
        console.debug("DEBUG >> Get Json File");
        console.debug("DEBUG >> Get Version Value: " + data[selectedType]);
        if (data[selectedType] == undefined || data[selectedType] == "") {
            console.warn("WARN >> Get no version!");
            return false;
        }
        var v1 = data[selectedType].split(",");
        for (i in v1) {
            console.debug("DEBUG >> Get Option: " + v1[i]);
            var opt = document.createElement("option");
            opt.innerHTML = v1[i];
            version.appendChild(opt);
        }
        return true;
    });
}
function refresh() {
    download.classList.remove("btn2");
    download.classList.add("btn3");
    $.getJSON("jar/" + selectedType + "/" + selectedVersion + "/index.json", function(data) {
        console.debug("DEBUG >> Get Json File:");
        console.debug("DEBUG >> Get Hash Value: " + data.Hash);
        console.debug("DEBUG >> Get File Path Value: " + data.Path);
        console.debug("DEBUG >> Get Type Value: " + data.Type);
        console.debug("DEBUG >> Get Version Value: " + data.Version);
        if (data.Path == undefined || data.Path == "") {
            console.warn("WARN >> 'Path' key is empty!");
        } else {
            downloadLink = data.Path;
            download.classList.remove("btn3");
            download.classList.add("btn2");
        }
        if (data.Hash == undefined || data.Hash == "") {
            console.warn("WARN >> 'Hash' key is empty!");
        } else {
            hash.textContent = data.Hash;
        }
    });
}