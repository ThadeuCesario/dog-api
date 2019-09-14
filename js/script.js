/*Ancoras*/
const adicionarAttrA = () => {
    try {
        document.getElementById("details-a").setAttribute("open", "");
    } catch (e) {
        window.location.href = "index.html#options"
        adicionarAttrA();
    }
}
const adicionarAttrB = function () {
    try {
        document.getElementById("details-b").setAttribute("open", "");
    } catch (e) {
        window.location.href = "index.html/#options"
        adicionarAttrA();
    }
}
const adicionarAttrC = function () {
    try {
        document.getElementById("details-c").setAttribute("open", "");
    } catch (e) {
        window.location.href = "index.html/#options"
        adicionarAttrA();
    }
}

const toggleMenu = function(){
    var subMenu = document.getElementById("sub-menu");
    if(subMenu.classList.contains("disabled")){
        subMenu.classList.remove("disabled");
    }else{
        subMenu.classList.add("disabled");
    }
}


/*Alert*/
var close = document.getElementsByClassName("closebtn");
var i;

for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
        var div = this.parentElement;
        div.style.opacity = "0";
        setTimeout(function () { div.style.display = "none"; }, 600);
    }
}

const socialNetwork = () => {
    alert("Desculpe, ainda não temos redes sociais");
}

/* 
 * Consumindo API via FetchAPI e populando o select. 
 */
const elementBody = document.querySelectorAll('body')[0];
if (elementBody.classList.contains("adote")) {
    let dropdown = document.getElementById("dog-dropdown");

    let defaultOption = document.createElement("option");
    defaultOption.text = "Selecione a raça";
    defaultOption.value = "none";

    dropdown.add(defaultOption);
    dropdown.selectedIndex = 0;

    const url = "https://dog.ceo/api/breeds/list/all";

    fetch(url)
        .then(
            resp => {
                if (resp.status !== 200) {
                    console.error(`Erro na resposta da API: ${resp.status}`);
                    return;
                }

                resp.json().then(
                    function (data) {
                        const regexSimbolsOne = /\[\"|"|]/g;
                        var arrayAuxiliador = [];
                        var subRacaJson = 0;
                        var countServer = 0;
                        let option;
                        let suboption;

                        for (let i = 0; i < Object.keys(data.message).length; i++) {

                            option = document.createElement('option');
                            option.text = Object.keys(data.message)[i];
                            option.value = option.text;

                            if (Object.values(data.message)[i].length > 0) {
                                var subRacaJson = JSON.stringify(Object.values(data.message)[i]);
                                var arrayAuxiliador = subRacaJson.split(",");
                                for (let j = 0; j < arrayAuxiliador.length; j++) {
                                    suboption = document.createElement('option');
                                    suboption.text = (Object.keys(data.message)[i] + ' - ' + ((arrayAuxiliador[j].toString()).replace(regexSimbolsOne, "")));
                                    suboption.value = suboption.text;
                                    dropdown.add(suboption);
                                }

                            }
                            else {
                                dropdown.add(option);
                            }
                        }
                    }
                );

            }
        )
        .catch(function (errorEvent) {
            console.error(`Erro no FetchAPI = ${errorEvent}`);
        });
}
/*
 * Registrando os dados e armazenando em localstorage
 */
const registrarDados = () => {
    limparDados();
    const regexSimbolsTwo = / - /g;
    const regexValidadeName = /[1-9]|'|"|!|@|#|\$|%|¨|&|\*|\(|\)|_|~|-|\+|=|{|\[|\]|}|:|;|<|>|\(|\)|\´|\`|\º|\£|\¢|\³|\²|\¹|\°|\?|\!/g;
    let racaCachorro = document.getElementById("dog-dropdown").value.trim();
    let nomeCachorro = document.getElementById("value-name").value.trim();
    let corDaFonte = document.getElementById("color-name").value.trim();
    let tipoDaFonte = document.getElementById("font-type").value.trim();
    let nomeUsuario = document.getElementById("name-user").value.trim();
    let foneUsuario = document.getElementById("phone-user").value.trim();

    let registroHora = Date.call();

    if (nomeCachorro === "" || nomeUsuario === "" || foneUsuario === "" || racaCachorro === "none" || corDaFonte === "none" || tipoDaFonte === "none") {
        alert("Dados inválidos - Preencha todos os campos");
        return;
    }
    else if (nomeCachorro.match(regexValidadeName) !== null) {
        alert("Nome do cachorro inválido!")
        return;
    }
    else if (nomeUsuario.match(regexValidadeName) !== null) {
        alert("Nome do usuário inválido!")
        return;
    }
    else {
        racaCachorro = racaCachorro.toLocaleLowerCase();
        racaCachorro = racaCachorro.replace(regexSimbolsTwo, "/");
        const urlImg = `https://dog.ceo/api/breed/${racaCachorro}/images/random`;

        localStorage.setItem("UrlImagem", urlImg);
        localStorage.setItem("RacaCachoro", racaCachorro);
        localStorage.setItem("NomeCachorro", nomeCachorro);
        localStorage.setItem("CorFonte", corDaFonte);
        localStorage.setItem("TipoFonte", tipoDaFonte);
        localStorage.setItem("RegistroHora", registroHora);
        //alert("Dados registrados com sucesso!");
    }

}

/* 
 * Excluindo os dados do LocalStorage
 */
const limparDados = () => {
    localStorage.clear();
}
const limparDadosFinal = () => {
    localStorage.clear();
    window.location.href="adote.html";
}
/* 
 * Alterando a imagem
 */
const alterarImagemRaca = () => {

    let loadRegistroHora = localStorage.getItem("RegistroHora");
    if (loadRegistroHora !== null) {
        let loadImgCachorro = localStorage.getItem("UrlImagem");
        let loadRaca = localStorage.getItem("RacaCachoro");
        let loadNome = localStorage.getItem("NomeCachorro");
        const regexSimbolsThree = /\[|"|,| /g;
        fetch(loadImgCachorro)
            .then(
                respImg => {
                    if (respImg.status !== 200) {
                        console.error(`Erro na resposta da API: ${respImg.status}`);
                        return;
                    }
                    respImg.json().then(
                        function (dataImg) {
                            let urlImageDog = Object.values(dataImg.message).toString();
                            urlImageDog = urlImageDog.replace(regexSimbolsThree, "");
                            document.getElementById("img-insert-new").setAttribute("src", urlImageDog);
                            document.getElementById("img-insert").setAttribute("alt", loadRaca);
                        }

                    )
                }
            )
            .catch(function (errorEvent) {
                console.error(`Erro no FetchAPI = ${errorEvent}`);
            });

    } else {
        alert("Preencha primeiramente o formulario.");
    }
}

/*
 * Monitorando preload 
 */
window.addEventListener("load", function () {
    const regexSimbolsThree = /\[|"|,| /g;
    let loadRaca = localStorage.getItem("RacaCachoro");
    let loadNome = localStorage.getItem("NomeCachorro");
    let loadCorFonte = localStorage.getItem("CorFonte");
    let loadTipoFonte = localStorage.getItem("TipoFonte");
    let loadRegistroHora = localStorage.getItem("RegistroHora");
    let loadImgCachorro = localStorage.getItem("UrlImagem");
    let loadLastImgCachrro = localStorage.getItem("urlImageDog");

    if (elementBody.classList.contains("adote")) {
        if (loadRegistroHora !== null) {

            var currentElement = document.getElementById("name-insert");
            currentElement.innerHTML = (
                "Nome: " + loadNome + "<br/>" + "Raça: " + loadRaca
            );
            currentElement.classList.add(loadTipoFonte.toLocaleLowerCase());
            currentElement.classList.add(loadCorFonte.toLocaleLowerCase());
            document.getElementById("border-image").classList.add(`borda-${loadCorFonte.toLocaleLowerCase()}`);
            this.document.getElementById("adote-form-1").style.display = "none";
            this.document.getElementById("adote-section-1").style.display = "none";
            this.document.getElementById("new-dog-image").style.display = "block";
            this.document.getElementById("btn-clear-two").style.display = "block";
            if (loadLastImgCachrro !== null) {
                document.getElementById("img-insert").setAttribute("src", loadLastImgCachrro);
            }
            else {
                fetch(loadImgCachorro)
                    .then(
                        respImg => {
                            if (respImg.status !== 200) {
                                console.error(`Erro na resposta da API: ${respImg.status}`);
                                return;
                            }
                            respImg.json().then(
                                function (dataImg) {
                                    let urlImageDog = Object.values(dataImg.message).toString();
                                    urlImageDog = urlImageDog.replace(regexSimbolsThree, "");
                                    localStorage.setItem("urlImageDog", urlImageDog);
                                    document.getElementById("img-insert").setAttribute("src", urlImageDog);
                                    document.getElementById("img-insert").setAttribute("alt", loadNome + ": " + loadRaca);
                                }

                            )
                        }
                    )
                    .catch(function (errorEvent) {
                        console.error(`Erro no FetchAPI = ${errorEvent}`);
                    });
            }
            document.getElementById("alert-sucess").style.display = "block";
        }
    }
});

