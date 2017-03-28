'use strict';
const Pokemon = require('./Pokemon').Pokemon;
const PokemonList = require('./Pokemon').PokemonList;
const FOLDER_COUNT = 10;
const fs = require('fs');

// сколько прятать
const wat = (a, b) => a > b ? b : a;

// вернуть целое случайное число в диапазоне (границы - включительно)
function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// вернуть массив случайных уникальных чисел - номера папок, куда прятать покемонов
function getUniqueRnd(min, max, size) {
  let tmp = new Array();
  for (let i=0; i<size; i++) {
    let a = Math.floor(Math.random() * (max - min + 1)) + min;
    while (tmp.indexOf(a) != -1) {
      a = Math.floor(Math.random() * (max - min + 1)) + min;
    }
    tmp.push(a);
  }
  return tmp;
}

// формат имени папок
const pad = (str, max) => {
    str = str.toString();
    return str.length < max ? pad("0" + str, max) : str;
}

function hide(path, pok_list) {
  let for_hide = new Array();
  let a = wat(3, pok_list.length);
  for (let i=1; i <= a; i++) {
    for_hide.push(pok_list[getRandomInRange(1, a)-1]);
  }
  hide_folders(path).then (response => {
      hide_pokemons(path, for_hide);
    })
    console.log('Я спрятал');
    return for_hide;
}

function hide_folders(path) {
  return new Promise (function(resolve, reject) {
    for (let i = 1; i <= FOLDER_COUNT; i++) {
      fs.mkdir(path + '/' + pad(i,2), err => {
        if (err) throw err;
        console.log(`Папка ${pad(i,2)} создана`);
      });
    }
    resolve('OK');
  });
}

function hide_pokemons(path, for_hide) {
  let tmp = getUniqueRnd(1, FOLDER_COUNT, for_hide.length);
  for (let i = 0; i < for_hide.length; i++) {
    let text = for_hide[i].name + '|' + for_hide[i].level;
    fs.writeFile(path + '/' + pad(tmp[i],2) + '/pokemon.txt', text, err => {
      if (err) throw err;
      console.log('Файл сохранен. Где же он?');
    })
  }
}


function seek(path, callback) {
  let found = new PokemonList();
  let a = 0;
    for (let i = 1; i <= FOLDER_COUNT; i++) {
      seek_pokemons(path, i).then (response => {
          if (response != null) {
            found.push(response);
          }
          a++;
          if (a == FOLDER_COUNT) callback(found);
        })
    }
}

function seek_pokemons(path, i) {
  return new Promise(function(resolve, reject) {
      fs.readdir(path + '/' + pad(i,2), (err, files) => {
        if (err) throw err;
        if (files.length > 0) {
          files.forEach(file => {
            fs.readFile(path + '/' + pad(i, 2) + '/' + file, 'utf8', function (err, data) {
              if (err) reject(err);
              let arr = data.split('|');
              let p = new Pokemon(arr[0], arr[1]);
              resolve(p);
            });
          });
        } else {
          resolve(null);
        }
      })
  });
}


module.exports = {
  hide,
  seek
}
