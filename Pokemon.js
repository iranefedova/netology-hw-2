class Pokemon {
  constructor (name, level) {
    this.name = name;
    this.level = level;
  }

  show () {
    console.log(`Имя: ${this.name}, Уровень: ${this.level}`);
  }
}

class PokemonList extends Array {
  add (name, level) {
    this.push(new Pokemon(name, level));
  }
  show () {
    for (let i of this) {
      i.show();
    }
    console.log("Количество покемонов: " + this.length);
    console.log("-----");
  }

  max () {
    let m = this[0];
    for (let i of this) {
      if (i.level > m.level) {
        m = i;
      }
    }
    return m;
  }
}

module.exports = {
  Pokemon,
  PokemonList
}
