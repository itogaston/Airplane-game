function newCloud(index, size) {
    let cloud = document.createElement("div");
    cloud.classList += "cloud "+ size+ " cloud-"+ index
    for (let index = 0; index < 4; index++) {
        cloud.appendChild(document.createElement("div"))
    }
    return cloud
}

function createClouds(){
    var container = document.getElementById("clouds")
    const sizes = {1: "large", 2: "normal", 3:"small", 4:"tiny"}
    
    for (let i = 1; i <= 3; i++) {
        for (let j = 1; j <= 4; j++) {
            let cloud = newCloud((i-1)*4+j, sizes[j])
            container.appendChild(cloud)
        }
    }
   
}

function resizeClouds(windowHeight){
    var clouds = document.querySelectorAll(".cloud");
    var margin_bottom = Math.floor(windowHeight / 14);
    console.log(windowHeight, margin_bottom, "clouds");
    console.log(margin_bottom);
    for (let index = 0; index < clouds.length; index++) {
        var element = clouds[index];
        element.style.marginBottom = margin_bottom+"px";
    }
}