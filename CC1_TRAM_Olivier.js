"use strict";

// Sélection des éléments HTML
const $startBtn = document.getElementById("start-btn");
const $guessBtn = document.getElementById("guess-btn");
const $cowBtn = document.getElementById("cow-btn");
const $output = document.getElementById("output");
const $numUsr = document.getElementById("num-usr");
const $maxUsr = document.getElementById("max-usr");
const $body = document.body;

// Variables pour le jeu de devinette
let secretNumber = 0;
let nbGuesses = 0;
let maxGuesses = 0;

// Variables pour l'ajout de vaches
let cowImage = null;
let isPlacingCow = false;

// Fonction pour lancer le jeu de devinette
function launchGame(_evt) {
  secretNumber = Math.floor(Math.random() * $maxUsr.value) + 1; // Nombre à deviner
  maxGuesses = Math.ceil(Math.log($maxUsr.value)) + 1; // Nombre d'essais maximum
  nbGuesses = 0; // Initialise le nombre d'essais à 0
  $startBtn.disabled = true; // Désactive le bouton de démarrage du jeu
  $guessBtn.disabled = false; // Active le bouton de vérification
  $output.innerHTML = `À vous de deviner le nombre entre 1 et ${$maxUsr.value} | Tentatives restantes : ${maxGuesses}<br>`;
}
  // Fonction pour vérifier le nombre saisi par l'utilisateur
  $guessBtn.addEventListener("click", function () {
    const $userGuess = parseInt($numUsr.value); // Récupère la valeur entré par l'utilisateur
    if (isNaN($userGuess)) { // Vérifie si l'entrée n'est pas un nombre
      $output.innerHTML += `Tentative #${nbGuesses + 1}: Vous n'avez pas entré de nombre.<br>`;
      return; 
    }
    nbGuesses++; 
    if ($userGuess === secretNumber) { // Si le nombre saisi est égal au nombre secret affiche un message de victoire
      $output.innerHTML += `Tentative #${nbGuesses}: Bravo ! Vous avez trouvé le nombre ${$userGuess}.<br>`;
      $startBtn.disabled = false; // Réactive le bouton de démarrage du jeu
      $guessBtn.disabled = true; // Désactive le bouton de vérification
    } else if ($userGuess < secretNumber) { // Si le nombre saisi est plus petit que le nombre secret 
      $output.innerHTML += `Tentative #${nbGuesses}: ${$userGuess} - Trop bas. Essayez encore. | Tentatives restantes : ${maxGuesses - nbGuesses}<br>`;
    } else { // Sinon, le nombre saisi est trop élevé
      $output.innerHTML += `Tentative #${nbGuesses}: ${$userGuess} - Trop haut. Essayez encore. | Tentatives restantes : ${maxGuesses - nbGuesses}<br>`;
    }
    if (nbGuesses >= maxGuesses) { // Si le nombre d'essais atteint le nombre maximum d'essais affiche un message de défaite
      $output.innerHTML += `Désolé, vous avez atteint la limite de tentatives (${maxGuesses}). Le nombre secret était ${secretNumber}.<br>`;
      $startBtn.disabled = false; // Réactive le bouton de démarrage du jeu
      $guessBtn.disabled = true; // Désactive le bouton de vérification
    }
  });
$startBtn.addEventListener("click", launchGame);

// Fonction pour faire tourner la vache
function rotateCow(cow) {
  const randomRotation = Math.floor(Math.random() * 360); // Angle de rotation aléatoire entre 0 et 359 degrés
  cow.style.transform = `rotate(${randomRotation}deg)`;
}
// Fonction pour ajouter une vache à l'écran
function addCow(evt) {
  if (isPlacingCow) {
    cowImage = document.createElement("img");
    cowImage.src = "https://upload.wikimedia.org/wikipedia/commons/3/30/Cowicon.svg";
    cowImage.classList.add("cow");
    cowImage.style.position = "absolute";
    cowImage.style.left = `${evt.pageX}px`; // Utilise pageX pour les coordonnées de la page
    cowImage.style.top = `${evt.pageY}px`; // Utilise pageY pour les coordonnées de la page
    rotateCow(cowImage); // Fait tourner la vache aléatoirement
    $body.appendChild(cowImage);
  }
}
// Fonction pour activer/désactiver l'ajout de vaches
function toggleCow(_evt) {
  isPlacingCow = !isPlacingCow;
  if (isPlacingCow) {
    document.onmousedown = addCow;
  } else {
    document.onmousedown = null;
  }
}
$cowBtn.addEventListener("click", toggleCow);

