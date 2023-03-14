var objects = [
    {
        id: 1,
        name: "Disco mingo",
        img: "disco-ball.png",
        text: "It's party time",
        modification: () => { delay -= 15 },
        level: 1,
        used: false,
        reusable: true,
        //reusable: false,
        credit: '<a href="https://www.flaticon.com/free-icons/disco" title="disco icons">Disco icons created by Freepik - Flaticon</a>'
    },
    {
        id: 2,
        name: "Experimental Treatment",
        text: "Honey, I Shrunk the Kids",
        img: "injection.png",
        modification: () => { image_size -= 30 },
        level: 1,
        used: false,
        reusable: true,
        credit: '<a href="https://www.flaticon.com/free-icons/vaccine" title="vaccine icons">Vaccine icons created by Freepik - Flaticon</a>'
    },
    {
        id: 3,
        name: "Star of Marius",
        text: "Follow the light",
        img: "star.png",
        modification: () => { points += 50 },
        level: 1,
        used: false,
        reusable: true,
        //reusable: false,
        credit: '<a href="https://www.flaticon.com/free-icons/star" title="star icons">Star icons created by Freepik - Flaticon</a>'
    },
    {
        id: 4,
        name: "The Devil",
        text: "We are each our own devil, and we make this world our hell",
        img: "devil.png",
        level: 1,
        modification: () => {
            document.body.style.background = "rgb(185,34,36)";
            document.body.style.background = "linear-gradient(180deg, rgba(185,34,36,1) 0%, rgba(72,4,8,1) 70%, rgba(5,4,4,1) 100%)";
            document.body.style.transition = "background 3s"
        },
        used: false,
        reusable: false,
        credit: '<a href="https://www.flaticon.com/free-icons/evil" title="evil icons">Evil icons created by Smashicons - Flaticon</a>'
    },
    {
        id: 5,
        name: "Paper sheet",
        text: "The paper burns, but the words fly free",
        img: "paper.png",
        modification: () => { planeImgSrc = "paper-plane.png"; tolerance += 10 },
        level: 1,
        used: false,
        reusable: false,
        credit: '<a href="https://www.flaticon.com/free-icons/paper" title="paper icons">Paper icons created by Freepik - Flaticon</a>'
    },
    {
        id: 6,
        name: "Spinner",
        text: "They see me rollin'",
        img: "spinner.png",
        modification: () => { planeClasses.push("spin") },
        level: 1,
        used: false,
        reusable: false,
        credit: '<a href="https://www.flaticon.com/free-icons/spinner" title="spinner icons">Spinner icons created by Freepik - Flaticon</a>'
    },
    {
        id: 7,
        name: "Toad",
        text: "Despite their appearance, toads do not cause warts",
        img: "toad.png",
        modification: () => { points += 100 },
        level: 1,
        used: false,
        reusable: true,
        //reusable: false,
        credit: '<a href="https://www.flaticon.com/free-icons/toad" title="toad icons">Toad icons created by max.icons - Flaticon</a>'
    },
    {
        id: 8,
        name: "Original Sin",
        text: "And in Sin did my mother conceive me",
        img: "original-sin.png",
        modification: () => { sinuosity += 1 },
        level: 1,
        used: false,
        reusable: true,
        //reusable: false,
        credit: '<a href="https://www.flaticon.com/free-icons/original-sin" title="original-sin icons">Original-sin icons created by Smashicons - Flaticon</a>'
    },
    {
        id: 9,
        name: "Virus",
        text: "We going bankrupt",
        img: "coronavirus.png",
        modification: () => { enemies = Math.floor(enemies * 0.60) },
        level: 6,
        // level: 1,
        used: false,
        reusable: true,
        //reusable: false,
        credit: '<a href="https://www.flaticon.com/free-icons/virus" title="virus icons">Virus icons created by Freepik - Flaticon</a>'
    },
    {
        id: 10,
        name: "I'm feeling lucky",
        text: "Oh, I am fortune's fool!",
        img: "casino.png",
        modification: () => {
            const luck = 0.60;
            enemies = randomi(enemies * (1 - luck), enemies * (1 + luck));
            var img_chane = randomi(image_size * (1 - luck), image_size * (1 + luck));
            tolerance = Math.floor(tolerance * img_chane / image_size)
            image_size = img_chane
            delay = randomi(delay * (1 - luck), delay * (1 + luck));
            points = randomi(points * (1 - luck), points * (1 + luck));
            degrees = randomi(30, 360);
        },
        level: 6,
        // level: 1,
        used: false,
        reusable: true,
        //reusable: false,
        credit: '<a href="https://www.flaticon.com/free-icons/dice" title="dice icons">Dice icons created by juicy_fish - Flaticon</a>'
    },
    {
        id: 11,
        name: "Random Zoom",
        text: "It's a big small world",
        img: "glass.png",
        level: 6,
        used: false,
        reusable: true,
        modification: () => { image_size = randomi(image_size * 0.20, image_size * 1.8) },
        credit: '<a href="https://www.flaticon.com/free-icons/search" title="search icons">Search icons created by Dimitry Miroliubov - Flaticon</a>'
    },
    {
        id: 12,
        name: "Reverse",
        text: "Now it's counter clockwise",
        img: "switch.png",
        level: 1,
        used: false,
        reusable: true,
        modification: () => { degrees -= 180 },
        credit: '<a href="https://www.flaticon.com/free-icons/reset" title="reset icons">Reset icons created by Freepik - Flaticon</a>'
    },
    {
        id: 13,
        name: "Steering Wheel",
        text: "What could go wrong",
        img: "gaming.png",
        level: 1,
        used: false,
        reusable: false,
        modification: () => { randomTurn = true },
        credit: '<a href="https://www.flaticon.com/free-icons/racing-game" title="racing game icons">Racing game icons created by Freepik - Flaticon</a>'
    },
    {
        id: 14,
        name: "Christmas Tree",
        text: "It's that time of the year...",
        img: "christmas-tree.png",
        level: 6,
        used: false,
        reusable: true,
        modification: () => { enemies *= 1.75 },
        credit: '<a href="https://www.flaticon.com/free-icons/sale" title="sale icons">Sale icons created by Pixel perfect - Flaticon</a>'
    },
    {
        id: 15,
        name: "Airbus A380",
        text: "The world's largest passenger aircraft",
        img: "airbus.png",
        level: 1,
        used: false,
        reusable: true,
        modification: () => { image_size += 30 },
        credit: '<a href="https://www.flaticon.com/free-icons/aerospace" title="aerospace icons">Aerospace icons created by balan - Flaticon</a>'
    },
    {
        id: 16,
        name: "Long distance Flight",
        text: "19h of pure joy",
        img: "long-distance.png",
        level: 1,
        used: false,
        reusable: true,
        modification: () => { points += 200 },
        credit: '<a href="https://www.flaticon.com/free-icons/long-distance" title="long-distance icons">Long-distance icons created by iconixar - Flaticon</a>'
    },
    {
        id: 17,
        name: "Fuel Leak",
        text: "Kerosene all over the place",
        img: "leak.png",
        level: 6,
        used: false,
        reusable: true,
        modification: () => { delay *= 1.10 },
        credit: '<a href="https://www.flaticon.com/free-icons/leak" title="leak icons">Leak icons created by Freepik - Flaticon</a>'
    },
    {
        id: 18,
        name: "Extra Fuel",
        text: "Oil they would buy from anyone, even from Satan",
        img: "petroleum.png",
        level: 6,
        used: false,
        reusable: true,
        modification: () => { delay *= 0.75 },
        credit: '<a href="https://www.flaticon.com/free-icons/petroleum" title="petroleum icons">Petroleum icons created by Freepik - Flaticon</a>'
    },
    {
        id: 19,
        name: "Extra Lugagge",
        text: "It won't be cheap",
        img: "luggage.png",
        level: 1,
        used: false,
        reusable: true,
        modification: () => { delay += 5 },
        credit: '<a href="https://www.flaticon.com/free-icons/travel" title="travel icons">Travel icons created by Freepik - Flaticon</a>'
    },
    {
        id: 20,
        name: "Tourist Seasson",
        text: "Anyone who needs more than one suitcase is a tourist, not a traveler",
        img: "Tourist.png",
        level: 1,
        used: false,
        reusable: true,
        modification: () => { enemies += 3 },
        credit: '<a href="https://www.flaticon.com/free-icons/summer" title="summer icons">Summer icons created by Eucalyp - Flaticon</a>'
    },
    {
        id: 21,
        name: "Wider Roads",
        text: "And her eyes were on the highway, where life whizzed by",
        img: "highway.png",
        level: 1,
        used: false,
        reusable: true,
        modification: () => { spawn += 1 },
        credit: '<a href="https://www.flaticon.es/iconos-gratis/la-carretera" title="la carretera iconos">La carretera iconos creados por DinosoftLabs - Flaticon</a>'
    },
    {
        id: 22,
        name: "Artificial Inteligence",
        text: "The question of whether a computer can think is no more interesting than the question of whether a submarine can swim",
        img: "inteligencia-artificial.png",
        level: 6,
        used: false,
        reusable: true,
        modification: () => { enemies -= 3; points *= 1.1 },
        credit: '<a href="https://www.flaticon.es/iconos-gratis/cerebro" title="cerebro iconos">Cerebro iconos creados por Freepik - Flaticon</a>'
    },
    {
        id: 23,
        name: "Robot Eye",
        text: "Do not apologize for crying. Without this emotion, we are only robots",
        img: "robot-eye.png",
        level: 6,
        used: false,
        reusable: true,
        modification: () => { degrees += 45; delay -= 5 },
        credit: '<a href="https://www.flaticon.es/iconos-gratis/inteligencia-artificial" title="inteligencia artificial iconos">Inteligencia artificial iconos creados por Freepik - Flaticon</a>'
    },
    {
        id: 24,
        name: "V for vendetta",
        text: "Behind this mask there is more than just flesh. Beneath this mask there is an idea... and ideas are bulletproof",
        img: "v.png",
        level: 1,
        used: false,
        reusable: true,
        modification: () => { degrees = 60 },
        credit: '<a href="https://www.flaticon.com/free-icons/v" title="v icons">V icons created by Freepik - Flaticon</a>'
    },
    {
        id: 25,
        name: "THC",
        text: "I don't do drugs. I am drugs.",
        img: "thc.png",
        level: 6,
        used: false,
        reusable: true,
        modification: () => { delay *= 2.0; enemies += 5; points += 200; image_size -= 25 },
        credit: '<a href="https://www.flaticon.com/free-icons/thc" title="thc icons">Thc icons created by Freepik - Flaticon</a>'
    },
    {
        id: 26,
        name: "Speed Ball",
        text: "A weird combination",
        img: "SpeedBall.png",
        level: 6,
        used: false,
        reusable: true,
        modification: () => { delay *= 0.4; enemies -= 1; image_size += 10 },
        credit: '<a href="https://www.flaticon.com/free-icons/syringe" title="syringe icons">Syringe icons created by iconixar - Flaticon</a>'
    },
    {
        id: 27,
        name: "Perfect Vision",
        text: "20 / 20",
        img: "perfect-vision.png",
        img_class: "img-128",
        level: 6,
        used: false,
        reusable: true,
        modification: () => { degrees = 180; enemies += 2; spawn += 1 },
        credit: '<a href="https://www.flaticon.com/free-icons/vr-glass" title="vr glass icons">Vr glass icons created by Paul J. - Flaticon</a>'
    },
    {
        id: 28,
        name: "Blurry Vision",
        text: "Smeared world, unclear sight.",
        img: "myopia.png",
        img_class: "img-128",
        level: 1,
        used: false,
        reusable: false,
        modification: () => { blurry = true; blurryVision(true) },
        credit: '<a href="https://www.flaticon.com/free-icons/myopia" title="myopia icons">Myopia icons created by Freepik - Flaticon</a>'
    },
    {
        id: 29,
        name: "Old Tv",
        text: "Black and White memories",
        img: "tv.png",
        img_class: "img-128",
        level: 1,
        used: false,
        reusable: false,
        modification: () => {
            document.querySelector('*').style.filter = "grayscale(100%)"
            document.querySelector('*').style.transition = "filter 1.5s"
        },
        credit: '<a href="https://www.flaticon.com/free-icons/television" title="television icons">Television icons created by Freepik - Flaticon</a>'
    }

]

var randomObj1;
var randomObj2;

function randomi(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function reset_objs() {
    objects.forEach((object) => object.used = false)
}

function create_obj_img(obj) {

    var object = document.createElement("img")
    object.src = "assets/objects/" + obj.img

    object.classList += "object "

    if (obj.img_class) {
        object.classList += obj.img_class
    }

    object.onmouseover = () => {
        object.style.width = "118px";
        object.style.height = "118px";
    }
    object.onmouseout = () => {
        object.style.width = "128px";
        object.style.height = "128px"
    }
    var first = false
    object.onclick = () => {
        if (!first) {
            first = true

            // Hide img and name
            var imgs = document.getElementsByClassName("object");
            for (let index = 0; index < imgs.length; index++) {
                let element = imgs[index];
                element.style.visibility = "hidden"
            }

            var names = document.getElementsByClassName("object-name");
            for (let index = 0; index < names.length; index++) {
                let element = names[index];
                element.style.visibility = "hidden"
            }

            // show text
            var obj_text = document.getElementById("object-text-" + obj.id)
            obj_text.style.visibility = "visible"

            obj.used = true;
            obj.modification()

            setTimeout(() => {
                obj_text.style.visibility = "hidden"
                nextLevel()
            }, 5000)
        }
    }

    return object;
}

function create_obj(obj) {
    var div = document.createElement("div")

    var object_name = document.createElement("div")
    object_name.id = "object-name-" + obj.id
    object_name.classList += "object-name"
    object_name.innerText = obj.name

    var object_text = document.createElement("div")
    object_text.id = "object-text-" + obj.id
    object_text.classList += "object-text"
    object_text.innerText = obj.text
    object_text.style.visibility = "hidden"

    const img = obj.imgHtml

    div.appendChild(object_name)
    div.appendChild(object_text)
    div.appendChild(img)

    return div
}

function display_objects() {
    var external_container = document.getElementById("container")
    external_container.innerHTML = '<div id="object-container"></div>'

    var container = document.querySelector("#object-container")

    const object1 = create_obj(randomObj1)
    const object2 = create_obj(randomObj2)

    container.appendChild(object1)
    container.appendChild(object2)
}

function select_objects(){
    var notUsedObjects = objects.filter(obj => (obj.level <= level) && (!obj.used || obj.reusable))
    if (notUsedObjects.length < 2) {
        console.log("empty -> reset");
        console.log(notUsedObjects);
    }

    do {
        randomObj1 = notUsedObjects[Math.floor(Math.random() * notUsedObjects.length)]
        randomObj2 = notUsedObjects[Math.floor(Math.random() * notUsedObjects.length)]
        // var randomObj1 = notUsedObjects[notUsedObjects.length - 1]
        // var randomObj2 = notUsedObjects[notUsedObjects.length - 2]

    } while (randomObj1.id == randomObj2.id);

    
    randomObj1.imgHtml = create_obj_img(randomObj1)
    randomObj2.imgHtml = create_obj_img(randomObj2)
    
}

function blurryVision(active) {
    setTimeout(() => {
        if (!blurry)
            return
        if (active) {
            document.body.style.filter = "blur(2px)"
            document.body.style.transition = "filter 1.5s"
            blurryVision(!active)
        }
        else {
            document.body.style.filter = "blur(0px)"
            document.body.style.transition = "filter 1.5s"
            blurryVision(!active)
        }
    }, 5000)

}