const link = 'https://restcountries.com/v3/all';
const countrys = [];

const countryContainer = document.getElementById("countries-list");

function country(name,flag,capt,popu,carsd){
    this.nombre=name;
    this.bandera=flag;
    this.capital=capt;
    this.poblacion=popu;
    this.carretera=carsd;
}

const getCountrys = async () => {
  try {
    const response = await fetch(link);
    if (!response.ok) {
      throw new Error(response.status);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const countryMaker = (countryes, cntryid) => {
    const nombre = countryes[cntryid].name.official;
    const bandera = countryes[cntryid].flags[1];
    let capital = "Don't have one"
    if(countryes[cntryid].capital)capital = countryes[cntryid].capital[0];
    const poblacion = countryes[cntryid].population;
    const carretera = countryes[cntryid].car.side;

    return new country(nombre,bandera,capital,poblacion,carretera);
};

const countryPusher = (data) => {
  for(let id in data){
    let pais = countryMaker(data,id)
    countrys.push(pais);
  }
}

const countrySorter = (paises) => {
  //esta monada no es mia es de MDN, obviando la magia que hara el sort
  //entiendo bastante bien lo que hace...
  paises.sort((a, b) => {
    const nameA = a.nombre.toUpperCase();
    const nameB = b.nombre.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
}

const render = () => {
  countryContainer.innerHTML='';

  countrys.forEach((country) => {
    let addCountry = document.createElement("li");
    addCountry.innerHTML=(
        `<div class="country hide">
        <img src="${country.bandera}"/>
        <p> <strong>${country.nombre}</strong></p>
        <p>Capital : ${country.capital}</p>
        <p>Poblacion : ${country.poblacion}</p>
        <p>Lado de la carretera : ${country.carretera}</p>
        <button class="hideinfo">Cerrar</button>
        </div>`
    );
  countryContainer.appendChild(addCountry);
  });
}


getCountrys().then((data) => {
    countryPusher (data);
    countrySorter (countrys);
    render();

    let countrydomdiv = document.querySelectorAll(".country");
    let hideinfoButton = document.querySelectorAll(".hideinfo");

    for(let cty in countrydomdiv){
      if(cty<countrydomdiv.length){
        countrydomdiv[cty].addEventListener("click", (element) =>{
          if(!hideinfoButton[cty].contains(element.target)){
            countrydomdiv[cty].classList.remove("hide");
          }
        });
      }
    }

    for(let but in hideinfoButton){
      if(but<hideinfoButton.length){
        hideinfoButton[but].addEventListener("click", () =>{
          hideinfoButton[but].closest(".country").classList.add("hide");
        });
      }
    }
});

