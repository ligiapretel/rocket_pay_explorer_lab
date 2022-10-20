import "./css/index.css"
import IMask from "imask";

//Selecionando o path do primeiro elemento g que está na index. Ref. da estrutura:
{/* <div class="cc-bg">
    <svg>
        <g>
            <g>
                <path/> //Este path está sendo selecionado
            </g>
            <g>
                <path/>
            </g>
        </g>
    </svg>
</div> */}
const ccBgColor01 = document.querySelector(".cc-bg svg > g g:nth-child(1) path");

//Selecionando o path do segundo elemento g que está na index.
const ccBgColor02 = document.querySelector(".cc-bg svg > g g:nth-child(2) path");

//Selecionando a logo da bandeira
const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img");

//Criando função que vai pegar a bandeira do cartão
function setCardFlag(flag){
    
    //Criando estrutura de dados para as cores
    const colors = {
        "visa":["#2D57F2","#436D99"],
        "mastercard":["#C69347","#DF6F29"],
        "elo":["#F22D2D","#CBBA24"],
        "default":["black","gray"]
    }
    
    //Modificando o atributo fill, mas agora vou modificar de acordo com a bandeira do cartão que vier pelo parâmetro da função
    // ccBgColor01.setAttribute("fill","green");
    // colors[flag][0] é como se estivesse fazendo colors.visa[0], mas como virá pelo parâmetro da função, como um dado variável, uso []
    ccBgColor01.setAttribute("fill",colors[flag][0]);
    ccBgColor02.setAttribute("fill",colors[flag][1]);
    ccLogo.setAttribute("src",`cc-${flag}.svg`);

}

//Tornando a função global, para ser acessada de qualquer lugar da aplicação, dessa forma consigo acessar no console do navegador assim:
// window.setCardFlag("visa")
globalThis.setCardFlag = setCardFlag;

//Security code
const securityCode = document.querySelector("#security-code");
const securityCodePattern = {
    mask: "0000",
}
const securityCodeMasked = IMask(securityCode,securityCodePattern);

const expirationDate = document.querySelector("#expiration-date");
const expirationDatePattern = {
    mask: "MM{/}YY",
    blocks: {
        YY:{
            mask: IMask.MaskedRange,
            from: String(new Date().getFullYear()).slice(2),
            to: String(new Date().getFullYear()+10).slice(2),
        },
        MM:{
            mask: IMask.MaskedRange,
            from: 1,
            to: 12,
        },
    },
}
const expirationDateMasked = IMask(expirationDate,expirationDatePattern);

const cardNumber = document.querySelector("#card-number");
const cardNumberPattern = {
    mask: [
        {
            mask: "0000 0000 0000 0000",
            regex: /^4\d{0,15}/,
            cardFlag: "visa",
        },
        {
            mask: "0000 0000 0000 0000",
            regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
            cardFlag: "mastercard",
        },
        {
            mask: "0000 0000 0000 0000",
            cardFlag: "default",
        },
    ],
    dispatch: function(appended, dynamicMasked){
        const number = (dynamicMasked.value + appended).replace(/\D/g,"");
        const foundMask = dynamicMasked.compiledMasks.find(function(item){
            return number.match(item.regex);
        })
        console.log(foundMask);
        return foundMask;
    },
}

const cardNumberMasked = IMask(cardNumber,cardNumberPattern);

// Selecionando o botão de adicionar cartão
const addButton = document.querySelector("#add-card");
//"Observando" quando botão tiver o evento de clique. Quando ocorrer o clique, dispare uma função anônima
addButton.addEventListener("click",()=>{
    alert("Cartão cadastrado");
}) 

//Para que a página não carregue no envio do form, seleciono o form e fico observando quando ele tiver o evento submit. Quando acontecer, eu peço para ele não fazer o padrão do evento, que seria recarregar a página
document.querySelector("form").addEventListener("submit",(event)=>{
    event.preventDefault();
})

// Selecionando o input do nome do titular
const cardHolder = document.querySelector("#card-holder");

//Observando quando o campo tiver o evento input (entrada de texto). Quando tiver, eu vou selecionar o atributo value da div cc-holder (que exibe o nome no cartão) e vou alterar para o que está sendo digitado
cardHolder.addEventListener("input",()=>{
    const ccHolder = document.querySelector(".cc-holder .value");

    // Para modificar o value da div cc-holder, faço um if ternário checando se o value é igual a zero. Caso sim, vou exibir um nome padrão
    ccHolder.innerText = cardHolder.value.length === 0 ? "FULANO DA SILVA" : cardHolder.value;
});