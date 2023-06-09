function new_plane(id, Xini, Yini, Xfin, Yfin, d_step, d_min, d_max, d_speed) {
    return {
        id: id,
        X: Xini, Y: Yini, targetX: Xfin, targetY: Yfin,
        index: 0, slash_index: 0,
        d_step: d_step, d_min: d_min, d_max: d_max, d_speed: d_speed,
        finished: false, shown: false,
        trail_func(index) {
            let x_change = (this.targetX - this.X) / (n - 1);
            let y_change = (this.targetY - this.X) / (n - 1);

            return { X: this.X + index * x_change, Y: this.Y + index * y_change }
        }
    }
}

function setPlaneTrail(plane, n) {

    if (!n)
        n = points

    plane.trail = [];

    let X = plane.X;
    let Y = plane.Y;

    let targetX = plane.targetX;
    let targetY = plane.targetY;

    let x_change = (targetX - X) / (n - 1);
    let y_change = (targetY - Y) / (n - 1);

    plane.x_change = x_change;
    plane.y_change = y_change;

    for (let i = 0; i < n; i++) {
        plane.trail.push({
            X: X + i * x_change + points / 50 * Math.sin(i / 10) * sinuosity,
            Y: Y + i * y_change + points / 50 * Math.sin(i / 10) * sinuosity
        })
    }
}

function move_planes(planes) {
    let id = null;
    clearInterval(id);
    id = setInterval(frame, delay);
    var position = 0;

    function frame() {
        if (stop_game) {
            console.log("end game");
            clearInterval(id)
            endGame()
        }
        planes.forEach((plane, index) => {
            if (allAirplanesClear()) {
                console.log("victory")
                clearInterval(id);
                display_objects()
            } else {
                draw_plane(plane, index);
                // draw_slash(plane)
                // delete_slash(plane);
                plane.index += 1;
            }
        });
        position += 1

        stop_game = handle_colision(planes)
    }
}

function handle_colision(planes) {
    for (let i = 0; i < planes.length; i++) {
        const plane1 = planes[i];
        for (let j = i + 1; j < planes.length; j++) {
            const plane2 = planes[j];
            if (detect_colision(plane1, plane2)) {
                console.log("colision", plane1, plane2);
                let explotion_gif = document.createElement("img")
                explotion_gif.src = "assets/explotion.gif"
                explotion_gif.style.width = image_size + "px"
                explotion_gif.style.height = image_size + "px"
                explotion_gif.style.position = "absolute"
                // explotion_gif.style.border="solid black 1px"

                const plane1_pos = plane1.trail[plane1.index]
                const plane2_pos = plane2.trail[plane2.index]

                const x_gif = (plane1_pos.X - image_size / 2 + plane2_pos.X - image_size / 2) / 2
                const y_gif = (plane1_pos.Y - image_size / 2 + plane2_pos.Y - image_size / 2) / 2

                explotion_gif.style.left = (x_gif).toString() + "px"
                explotion_gif.style.top = (y_gif).toString() + "px"

                document.getElementById("container").appendChild(explotion_gif)
                return true
            }
        }
    }
    return false
}

function draw_plane(plane, index) {
    if (plane.index >= points)
        return

    const X = plane.trail[plane.index].X
    const Y = plane.trail[plane.index].Y

    if (plane.shown && (X < -image_size || X > width + image_size) || (Y < -image_size || Y > height + image_size)) {
        planes[index].finished = true
    }

    let planeItem = document.getElementById("airplane_" + plane.id);

    if (plane.index >= points || plane.trail[plane.index].X == plane.trail[points - 1].X && plane.trail[plane.index].Y == plane.trail[points - 1].Y) {
        planes[index].finished = true;
        return
    }

    const x = plane.trail[plane.index].X + image_size / 2
    const y = plane.trail[plane.index].Y + image_size / 2

    if (x > width + image_size || y > height + image_size) {
        planeItem.style.visibility = "hidden"
        return
    }

    plane.shown = true
    planeItem.style.visibility = "visible"

    planeItem.style.left = plane.trail[plane.index].X - image_size / 2 + "px"
    planeItem.style.top = plane.trail[plane.index].Y - image_size / 2 + "px"
}

function draw_slash(plane) {
    let d_step = plane.d_step
    let d_min = plane.d_min
    let d_max = plane.d_max
    let dash_speed = plane.d_speed

    let slashes = Math.floor((plane.slash_index - plane.index) / d_step)

    if (d_max <= slashes)
        return

    if (plane.slash_index < d_min * d_step + plane.index) {
        let n = 0;
        for (let i = plane.slash_index; i < plane.trail.length && n < d_min; i += d_step) {
            const slash = plane.trail[i];

            draw_single_slash(i + "_" + plane.id, plane.id + "_slash", slash.X, slash.Y)

            plane.slash_index = i;
            n += 1;
        }
    }

    if (dash_speed < 1) {
        let module = Math.floor(1 / dash_speed)

        if (plane.index % module == 0) {
            next_slash(plane, d_step)
        }
    }
    else if (dash_speed >= 1) {
        for (let i = 0; i < dash_speed; i++) {
            next_slash(plane, d_step)
        }
    }

}

function next_slash(plane, step) {
    plane.slash_index += step
    if (plane.slash_index >= plane.trail.length) {
        return
    }
    const slash = plane.trail[plane.slash_index];
    // console.log(slash, plane.dashIndex);
    draw_single_slash(plane.slash_index + "_" + plane.id, plane.id + "_slash", slash.X, slash.Y)
}

function draw_single_slash(id, className, X, Y) {
    if (X + 2 > width || Y + 2 > height) {
        return
    }

    let slash = document.createElement("div");
    slash.id = id
    slash.classList += className
    slash.style = "background-color: black; width: 5px; height: 5px; position: absolute;"

    slash.style.left = X + "px"
    slash.style.top = Y + "px"

    document.getElementById("container").appendChild(slash);
}

function delete_slash(plane) {
    let container = document.getElementById("container");
    let slash_list = document.getElementsByClassName(plane.id + "_slash");
    for (let index = 0; index < slash_list.length; index++) {
        const element = slash_list[index];
        let index_id = element.id.split("_")
        if (index_id[0] < plane.index + plane.d_step) {
            container.removeChild(element)
        }
        else
            break
        index += 1
    }
}

function deleteAllSlash(plane) {
    let container = document.getElementById("container");
    let slash_list = document.getElementsByClassName(plane.id + "_slash");
    for (let index = 0; index < slash_list.length; index++) {
        const element = slash_list[index];
        container.removeChild(element)
    }
}

function set_colision(plane1, plane2) {
    var intentos = 0
    var max_intentos = 20
    do {
        var index = Math.floor(Math.random() * plane1.trail.length)
        var point = plane1.trail[index]
        intentos += 1
    } while ((intentos < max_intentos) &&
        (point.X > width - image_size || point.X < image_size
            || point.Y > height - image_size || point.Y < image_size)
    )

    if (intentos >= max_intentos) {
        point = { X: image_size + Math.random() * (width - image_size), Y: image_size + Math.random() * (height - image_size) }
    }

    plane2.trail = [];

    let X = plane2.X;
    let Y = plane2.Y;

    let x_change = (point.X - X) / (index);
    let y_change = (point.Y - Y) / (index);

    for (let i = 0; i <= index; i++) {
        plane2.trail.push({
            X: X + i * x_change + points / 50 * Math.sin(i / 10) * sinuosity,
            Y: Y + i * y_change + points / 50 * Math.sin(i / 10) * sinuosity
        })
    }

    // TODO revisar que el ultimo elemtento este fuera de la región visible 0 800
    for (let i = index + 1; i < plane1.trail.length; i++) {
        plane2.trail.push({
            X: X + i * x_change + points / 50 * Math.sin(i / 10) * sinuosity,
            Y: Y + i * y_change + points / 50 * Math.sin(i / 10) * sinuosity
        })
    }

    plane2.targetX = X + points * x_change;
    plane2.targetY = Y + points * y_change;

    plane2.x_change = x_change
    plane2.y_change = y_change

    // si no llamada recursiva con un contador de intentos

}

function get_randomXY() {

    if (Math.random() > 0.5) {
        // Esquina superior izq
        if (Math.random() > 0.5) {
            // Cuadrado superior
            var Xini = -image_size + Math.random() * (width + image_size) * spawn
            var Yini = -image_size + Math.random() * image_size * spawn
        }
        else {
            // cuadrado izquierdo
            var Xini = -image_size + Math.random() * (image_size) * spawn
            var Yini = 0 + Math.random() * (height) * spawn
        }
        if (Math.random() > 0.5) {
            // Cuadrado inferior
            var Xfin = -image_size + Math.random() * (width + image_size)
            var Yfin = height + Math.random() * image_size
        }
        else {
            // cuadrado derecho
            var Xfin = width + Math.random() * (image_size)
            var Yfin = 0 + Math.random() * (height)
        }
    }
    else {
        if (Math.random() > 0.5) {
            // Cuadrado inferior
            var Xini = -image_size + Math.random() * (width + image_size) * spawn
            var Yini = height + Math.random() * image_size * spawn
        }
        else {
            // cuadrado derecho
            var Xini = width + Math.random() * (image_size) * spawn
            var Yini = 0 + Math.random() * (height) * spawn
        }
        if (Math.random() > 0.5) {
            // Cuadrado superior
            var Xfin = -image_size + Math.random() * (width + image_size)
            var Yfin = -image_size + Math.random() * image_size
        }
        else {
            // cuadrado izquierdo
            var Xfin = -image_size + Math.random() * (image_size)
            var Yfin = 0 + Math.random() * (height)
        }
    }

    return { Xini: Xini, Yini: Yini, Xfin: Xfin, Yfin: Yfin };
}

function get_randomXY2(cuadrante) {

    let off = (cuadrante < 2) ? 1 : -1;

    let Ini = get_XY_cuadrante(cuadrante)
    let Fin = get_XY_cuadrante(cuadrante + off * 2)

    return { Xini: Ini.X, Yini: Ini.Y, Xfin: Fin.X, Yfin: Fin.Y };
}

function get_XY_cuadrante(n) {
    switch (n) {
        case 0:
            var x = 1
            var y = 1
            break;
        case 1:
            var x = -1
            var y = 1
            break;
        case 2:
            var x = -1
            var y = -1
            break;
        case 3:
            var x = 1
            var y = -1
            break;
        default:
            break;
    }

    const half_width = width / 2
    const half_height = height / 2
    // return { X: 400 + x * 400 + x * Math.floor(Math.random() * 150) + x * 50, Y: 200 + y * 200 + y * Math.floor(Math.random() * 150) + y * 50 }
    return { X: half_width + x * half_width + x * Math.random() * image_size, Y: half_height + y * half_height + y * Math.floor(Math.random() * image_size) }
}

function detect_colision(plane1, plane2) {

    // source: https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection

    if (plane1.index >= points || plane2.index >= points) {
        return false
    }

    const position1 = plane1.trail[plane1.index]
    const position2 = plane2.trail[plane2.index]

    if (position1.X >= width || position2.X >= width) {
        return false
    }

    if (position1.Y >= height || position2.Y >= height) {
        return false
    }

    if (position1.X < position2.X + image_size - tolerance &&
        position1.X + image_size - tolerance > position2.X &&
        position1.Y < position2.Y + image_size - tolerance &&
        image_size + position1.Y - tolerance > position2.Y) {

        return true
    }
    return false
}

function rotate(plane) {
    const vector = { X: plane.targetX - plane.X, Y: plane.Y - plane.targetY }

    const radians = Math.atan2(vector.X, vector.Y)
    const deg = Math.floor(radians * (180 / Math.PI) + 45)

    document.getElementById("airplane_" + plane.id).style.transform = "rotate(" + deg + "deg)"
}

function setNewDestination(plane_index) {
    const rand = Math.random();
    if (rand < 0.25)
        var cuadrante = 0
    else if (rand >= 0.25 && rand < 0.5)
        var cuadrante = 1
    else if (rand >= 0.5 && rand < 0.75)
        var cuadrante = 2
    else
        var cuadrante = 3

    const destination = get_XY_cuadrante(cuadrante)

    var plane = planes[plane_index]
    plane.targetX = destination.X
    plane.targetY = destination.Y

    plane.X = plane.trail[plane.index].X
    plane.Y = plane.trail[plane.index].Y

    var index_copy = plane.index
    plane.index = 0
    plane.slash_index = 0

    deleteAllSlash(plane)
    setPlaneTrail(plane, points - index_copy)
}

function clickAirplane(plane_index) {
    if (stop_game)
        return

    var plane = planes[plane_index]

    if (plane.index >= points) {
        return
    }

    var planeImg = document.getElementById("airplane_" + plane.id)

    const deg = planeImg.style.transform.split("rotate(")[1].split("deg)")[0]

    planeImg.style.transform = "";

    if (randomTurn)
        degrees = Math.random() * 360

    // if(clockwise){
    planeImg.style.transform = "rotate(" + String(parseFloat(deg) + degrees) + "deg)"

    const x_change_copy = plane.x_change

    var x_change = x_change_copy * Math.cos(degrees * Math.PI / 180) - plane.y_change * Math.sin(degrees * Math.PI / 180)
    var y_change = x_change_copy * Math.sin(degrees * Math.PI / 180) + plane.y_change * Math.cos(degrees * Math.PI / 180)
    // }
    // else{
    //     planeImg.style.transform = "rotate(" + String(parseFloat(deg) - 90.) + "deg)"

    //     const y_change_copy = plane.y_change
    //     var y_change = - plane.x_change
    //     var x_change = y_change_copy
    // }

    plane.x_change = x_change;
    plane.y_change = y_change;

    plane.X = plane.trail[plane.index].X
    plane.Y = plane.trail[plane.index].Y

    plane.trail = [];

    plane.index = 0
    plane.slash_index = 0

    let X = plane.X;
    let Y = plane.Y;

    var oldPoint = { X: plane.X, Y: plane.Y }

    for (let i = 0; i < points; i++) {
        var point = {
            X: X + i * x_change + points / 50 * Math.sin(i / 10) * sinuosity,
            Y: Y + i * y_change + points / 50 * Math.sin(i / 10) * sinuosity
        }

        if ((point.X > width + image_size || point.X < 0 - image_size) && (point.Y > height + image_size || point.Y < 0 - image_size)) {
            plane.trail.push(oldPoint)
        }
        else {
            plane.trail.push(point)
            oldPoint = point
        }
    }
}

function newAirplaneImg(index) {
    var airplaneImg = document.createElement("img")
    airplaneImg.src = "assets/" + planeImgSrc
    airplaneImg.id = "airplane_plane" + index
    // classes
    airplaneImg.classList.add("airplane")
    planeClasses.forEach((someClass) => airplaneImg.classList.add(someClass))

    airplaneImg.style.visibility = "hidden"
    airplaneImg.style.width = image_size + "px"
    airplaneImg.style.height = image_size + "px"
    airplaneImg.onclick = () => clickAirplane(index - 1)
    return airplaneImg
}

function safety_distance(newPlane) {
    for (let index = 0; index < planes.length; index++) {
        const plane = planes[index];
        if (Math.sqrt(Math.pow(plane.X - newPlane.X, 2) + Math.pow(plane.Y - newPlane.Y, 2)) < image_size * 2) {
            return false
        }
    }
    return true
}

function createAirplanes(n_airplanes) {
    return new Promise((res, rej) => {
        var container = document.getElementById("container")

        for (let index = 1; index <= n_airplanes; index++) {
            var intentos = 0;
            do {
                let coords = get_randomXY();

                var plane = new_plane(
                    "plane" + index,
                    coords.Xini, coords.Yini, coords.Xfin, coords.Yfin,
                    d_step = 50, d_min = 3, d_max = 5, d_speed = 1
                )

                intentos += 1

                if (intentos > 20) {
                    console.log("unable to append plane");
                    res("ok")
                    return
                }

            } while (!safety_distance(plane));

            setPlaneTrail(plane, points)
            planes.push(plane)
            container.appendChild(newAirplaneImg(index));
        }
        res("ok")
    })
}

function allAirplanesClear() {
    return planes.filter((plane) => plane.finished).length == planes.length
}

function showLoserDialog() {
    var external_container = document.getElementById("container")
    external_container.innerHTML = "<div id='loser-container'></div>"

    var container = document.getElementById("loser-container")

    var record = document.createElement("div")
    record.id = "record-text"
    record.innerText = "High score: " + window.localStorage.getItem("record")
    container.appendChild(record)

    var retryBtn = document.createElement("img")
    retryBtn.src = "assets/retry.png"
    retryBtn.classList += "retry-btn"

    retryBtn.onmouseover = () => {
        retryBtn.style.width = "118px";
        retryBtn.style.height = "118px";
    }
    retryBtn.onmouseout = () => {
        retryBtn.style.width = "128px";
        retryBtn.style.height = "128px"
    }

    retryBtn.onclick = () => {
        container.innerHTML = ""
        resetGame()
    }

    container.appendChild(retryBtn)
}

function setNewRecord() {
    window.localStorage.setItem("record", level)
}

function newGame(n = 2) {
    select_objects()
    createAirplanes(n).then(() => {
        // console.log("airplanes created check");
        n = planes.length

        for (let i = 0; i < n - 1; i++) {
            var crash = Math.floor(Math.random() * (i))
            // console.log("crashing", crash, i + 1);
            set_colision(planes[crash], planes[i + 1])
        }

        planes.forEach((plane) => rotate(plane))
        console.log(level, planes);
        console.log("config", getConfig())

        setTimeout(() => move_planes(planes), 500)
    })
}

function nextLevel() {
    level += 1
    enemies += 1

    console.log("next", level);

    var container = document.querySelector("#container")
    container.innerHTML = ""

    stop_game = false;

    planes = []

    newGame(enemies)
}

function endGame() {
    setNewRecord()
    setTimeout(() => showLoserDialog(), 5000)
}

function resetGame() {
    level = 1
    enemies = 2
    image_size = 100;

    points = 800;
    delay = 30;

    spawn = 1

    stop_game = false;
    planes = []

    planeClasses = []

    document.body.style.background = "#1aa0e4"

    tolerance = 5

    planeImgSrc = "airport.svg"

    sinuosity = 0

    degrees = 90
    randomTurn = false
    blurry = false

    document.querySelector('*').style.filter = ""

    reset_objs()

    newGame(enemies)
}

function startTuto(){

}

function endTuto(){
    var container = document.querySelector("#container")
    container.innerHTML = ""

    planes = []

    newGame()
}

function getConfig() {
    return {
        enemies: enemies,
        delay: delay,
        degrees: degrees,
        image_size: image_size,
        spawn: spawn,
        points: points,
        tolerance: tolerance,
        planeImgSrc: planeImgSrc,
        sinuosity: sinuosity,
        randomTurn: randomTurn,
        blurry: blurry
    }
}

function getWidth() {
    xWidth = null;
    if (window.screen != null)
        xWidth = window.screen.availWidth;

    if (window.innerWidth != null)
        xWidth = window.innerWidth;

    if (document.body != null)
        xWidth = document.body.clientWidth;

    console.log("width", window.screen.availWidth, window.innerWidth, document.body.clientWidth);

    return xWidth;
}
function getHeight() {
    xHeight = null;
    console.log(window.screen.availHeight, document.body.clientHeight, window.innerHeight);
    if (window.screen != null)
        xHeight = window.screen.availHeight;

    if (document.body != null)
        xHeight = document.body.clientHeight;

    if (window.innerHeight != null)
        xHeight = window.innerHeight;

    return xHeight;
}
function windowResize(ev) {
    var width = getWidth()
    var height = getHeight()

    resizeClouds(height)
}
function prefetchImgs() {
    var img = new Image();
    img.src = 'assets/retry.png';
    let airplane_prefetch = new Image()
    airplane_prefetch.src = "assets/airport.svg"
    let explotion_prefetch = new Image()
    explotion_prefetch.src = "assets/explotion.gif"
    let papeplane_prefetch = new Image()
    papeplane_prefetch.src = "assets/paper-plane.png"
}