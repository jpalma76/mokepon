const sectionSeleccioanAtaque = document.getElementById("seleccionar-ataque") 
const sectionReiniciar = document.getElementById("reiniciar")
const botonMascotaJugador = document.getElementById("boton-mascota")
const botonFuego = document.getElementById('boton-fuego')
const botonAgua = document.getElementById('boton-agua')
const botonTierra = document.getElementById('boton-tierra')
const botonReiniciar = document.getElementById("reiniciar")
const contenedorTarjetas = document.getElementById("contenedorTarjetas"); 

let mokepones = []
let ataqueJugador
let ataqueEnemigo
let opcionDeMokepones
let vidasJugador = 3
let vidasEnemigo = 3

class Mokepon {
  constructor(nombre, foto, vida) {
    this.nombre = nombre
    this.foto = foto
    this.vida = vida
    this.ataques = []
  }
}

// Objetos
let hipodoge = new Mokepon('Hipodoge', './asset/mokepons_mokepon_hipodoge_attack.webp', 5)
let capipepo = new Mokepon('Capipepo', './asset/mokepons_mokepon_capipepo_attack.webp', 5)
let ratigueya = new Mokepon('Ratigueya', './asset/mokepons_mokepon_ratigueya_attack.webp', 5)

// Objeto literal
hipodoge.ataques.push(
  {nombre: "Agua 💧", id: 'boton-agua'},
  {nombre: "Agua 💧", id: 'boton-agua'},
  {nombre: "Agua 💧", id: 'boton-agua'},
  {nombre: "Fuego 🔥", id: 'boton-fuego'},
  {nombre: "Tierra 🪨", id: 'boton-tierra'} 
)

capipepo.ataques.push(
  {nombre: "Tierra 🪨", id: 'boton-tierra'}, 
  {nombre: "Tierra 🪨", id: 'boton-tierra'}, 
  {nombre: "Tierra 🪨", id: 'boton-tierra'}, 
  {nombre: "Agua 💧", id: 'boton-agua'},
  {nombre: "Fuego 🔥", id: 'boton-fuego'}
)

ratigueya.ataques.push(
  {nombre: "Fuego 🔥", id: 'boton-fuego'},
  {nombre: "Fuego 🔥", id: 'boton-fuego'},
  {nombre: "Fuego 🔥", id: 'boton-fuego'},
  {nombre: "Agua 💧", id: 'boton-agua'},
  {nombre: "Tierra 🪨", id: 'boton-tierra'} 
)

mokepones.push(hipodoge,capipepo,ratigueya);

function iniciarJuego() {
    
    sectionSeleccioanAtaque.style.display = 'none'
    sectionReiniciar.style.display = 'none'
    
    mokepones.forEach((mokepon) => {

        opcionDeMokepones = `
        <div>
            <input type="radio" name="mascota" id=${mokepon.nombre}>
            <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
                <img src="./asset/mokepons_mokepon_${mokepon.nombre}_attack.webp" alt=${Mokepon.nombre}>
            </label>
        </div>
        `
    contenedorTarjetas.innerHTML += opcionDeMokepones

  })

  botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador)

  botonFuego.addEventListener("click", ataqueFuego)
  botonAgua.addEventListener("click", ataqueAgua)
  botonTierra.addEventListener("click", ataqueTierra)

  botonReiniciar.addEventListener("click", reiniciarJuego)
}

function seleccionarMascotaJugador() {

  let sectionMascota = document.getElementById("seleccionar-mascota")
  sectionMascota.style.display = 'none'

  let sectionSeleccioanAtaque = document.getElementById("seleccionar-ataque") 
  sectionSeleccioanAtaque.style.display = 'flex'

  let inputHipodogue = document.getElementById('Hipodoge')
  let inputCapipepo = document.getElementById('Capipepo')
  let inputRatigueya = document.getElementById('Ratigueya')

  let spanMascotaJugador = document.getElementById('mascota-jugador')

  if(inputHipodogue.checked) {
    spanMascotaJugador.innerHTML = 'Hipodogue'
  } else if (inputCapipepo.checked) {
    spanMascotaJugador.innerHTML = 'Capipepo'
  } else if(inputRatigueya.checked) {
    spanMascotaJugador.innerHTML = 'Ratigueya'
  } else {
    alert('Selecciona una mascota!!!');
  }
  seleccionarMascotaEnemigo()
}

function seleccionarMascotaEnemigo() {
  let mascotaAleatorio = aleatorio(1, 3)
  let spanMascotaEnemigo = document.getElementById('mascota-enemigo')

  if(mascotaAleatorio == 1) {
    spanMascotaEnemigo.innerHTML = 'Hipodogue'
  } else if(mascotaAleatorio == 2) {
    spanMascotaEnemigo.innerHTML = 'Capipepo'
  } else {
    spanMascotaEnemigo.innerHTML = 'Ratigueya'
  }
}

function ataqueFuego() {
  ataqueJugador = 'FUEGO'
  ataqueAleatorioEnemigo()
}

function ataqueAgua() {
  ataqueJugador = 'AGUA'
  ataqueAleatorioEnemigo()
}

function ataqueTierra() {
  ataqueJugador = 'TIERRA'
  ataqueAleatorioEnemigo()
}

function ataqueAleatorioEnemigo() {
  let ataqueAleatorio = aleatorio(1, 3)

  if(ataqueAleatorio == 1) {
  ataqueEnemigo = 'FUEGO'
  } else if(ataqueAleatorio == 2) {
    ataqueEnemigo = 'AGUA'
  } else {
    ataqueEnemigo = 'TIERRA'
  }
  combate()
}

/* 
1 fuego
2 agua
3 tierra

fuego > Tierra
tierra > agua
agua > fuego
*/

function combate() {

  
  let spanVidasJugador = document.getElementById("vidas-jugador")
  let spanVidasEnemigo = document.getElementById("vidas-enemigo")

  if(ataqueJugador == ataqueEnemigo) {
    crearMensaje('EMPATASTE')
  } else if((ataqueJugador == 'FUEGO' && ataqueEnemigo == 'TIERRA') || (ataqueJugador == 'AGUA' && ataqueEnemigo == 'FUEGO') || (ataqueJugador == 'TIERRA' && ataqueEnemigo == 'AGUA')) {
    crearMensaje('GANASTE')
    vidasEnemigo--
    spanVidasEnemigo.innerHTML = vidasEnemigo
  } else {
    crearMensaje('PERDISTE')
    vidasJugador--
    spanVidasJugador.innerHTML = vidasJugador
  }
  revisarVidas()

}

function revisarVidas() {
  if(vidasEnemigo == 0) {
    crearMensajeFinal('FELICITACIONES, ganaste 🎉')
    let sectionReiniciar = document.getElementById("reiniciar")
    sectionReiniciar.style.display = 'flex'
  } else if(vidasJugador == 0) {
    crearMensajeFinal('Lástima, perdiste 💀')
    let sectionReiniciar = document.getElementById("reiniciar")
    sectionReiniciar.style.display = 'flex'
  }
}

function crearMensaje(resultado) {
  let sectionMensajes = document.getElementById('resultado')
  let ataquesDelugador = document.getElementById('ataques-del-jugador')
  let ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')


  let nuevoAtaqueDelJugador = document.createElement('p')
  let nuevoAtaqueDelEnemigo = document.createElement('p')

  sectionMensajes.innerHTML = resultado
  nuevoAtaqueDelJugador.innerHTML = ataqueJugador
  nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo

  ataquesDelugador.appendChild(nuevoAtaqueDelJugador)
  ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal(resultadoFinal) {
  let sectionMensajes = document.getElementById('resultado')

  sectionMensajes.innerHTML = resultadoFinal

  let botonFuego = document.getElementById('boton-fuego')
  botonFuego.disabled = true

  let botonAgua = document.getElementById('boton-agua')
  botonAgua.disabled = true

  let botonTierra = document.getElementById('boton-tierra')
  botonTierra.disabled = true
}

function reiniciarJuego() {
  location.reload()
}

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min )
}

window.addEventListener("load", iniciarJuego)