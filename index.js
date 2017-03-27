const hide = require('./hidenseek').hide;
const seek = require('./hidenseek').seek;
const Pokemon = require('./Pokemon').Pokemon;
const PokemonList = require('./Pokemon').PokemonList;

let lost = new PokemonList(new Pokemon("Charmander", 1), new Pokemon("Blastoise", 4), new Pokemon("Metapod", 3));

console.log(hide('./field', lost));
console.log('Я спрятал');

let found = seek('./field');
console.log('Я нашёл');
console.log(found);
