const fetchPokemon = async () => {
    const pokeNameInput = document.getElementById("pokeName");
    let pokeName = pokeNameInput.value;
    pokeName = pokeName.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
    const data = await fetch(url).then((res) => {
        if (res.status != "200") {
            console.log(res);
            pokeImage("./img/pokeSad.gif")
            const pokeIdName = document.getElementById("pokemon-id-name");
            pokeIdName.textContent = "Pokemon Not Found";
        }
        else {
            return res.json();
        }
    })

    if (data) {
        let pokeImg = data.sprites.other.dream_world.front_default;
        pokeImage(pokeImg);

        let pokeId = data.id;
        let pokeName = data.name;
        pokeData(pokeId, pokeName);

        let pokeHeight = data.height;
        let pokeWeight = data.weight;
        pokeBody(pokeHeight, pokeWeight);

        let pokeTypes = data.types.map(item => (item.type.name));
        let pokeAbilities = data.abilities.map(item => (item.ability.name));

        pokeTypeAbility(pokeTypes, pokeAbilities);
    }
}

const pokeImage = (url) => {
    const pokePhoto = document.getElementById("pokeImg");
    pokePhoto.src = url;
}

const pokeData = (pokeId, pokeName) => {
    const pokeIdName = document.getElementById("pokemon-id-name");
    pokeIdName.textContent = "#0" + pokeId.toString() + "-" + pokeName.toUpperCase();
}

const pokeBody = (pokeHeight, pokeWeight) => {
    const pokemonHeight = document.getElementById("pokemon-height");
    const pokemonWeight = document.getElementById("pokemon-weight");
    pokemonHeight.textContent = "Altura: " + (pokeHeight / 10).toString() + " M";
    pokemonWeight.textContent = "Peso: " + (pokeWeight / 10).toString() + " Kg";
}

const pokeTypeAbility = (pokeTypes, pokeAbilities) => {
    const pokemonTypes = [...(document.getElementsByClassName("pokemon-type"))];
    const pokemonAbilities = [...(document.getElementsByClassName("pokemon-ability"))];
    const colores = ["#ead151", "#88c357", "#1d8eca", "#0bcdff", "#4075da"];

    pokemonTypes.forEach((element, index) => {
        if (index < pokeTypes.length) {
            element.textContent = pokeTypes[index];
            element.style.backgroundColor = colores[4];
        } else {
            element.textContent = "";
            element.style.background = "none";
        }
    })

    pokemonAbilities.forEach((element, index) => {
        if (index < pokeAbilities.length) {
            element.textContent = pokeAbilities[index];
            element.style.backgroundColor = colores[index];
        } else {
            element.textContent = "";
            element.style.background = "none";
        }
    })
}