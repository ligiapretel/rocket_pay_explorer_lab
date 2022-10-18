import "./css/index.css"

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
        "default":["black","gray"]
    }
    
    //Modificando o atributo fill, mas agora vou modificar de acordo com a bandeira do cartão que vier pelo parâmetro da função
    // ccBgColor01.setAttribute("fill","green");
    // colors[flag][0] é como se estivesse fazendo colors.visa[0], mas como virá pelo parâmetro da função, como um dado variável, uso []
    ccBgColor01.setAttribute("fill",colors[flag][0]);
    ccBgColor02.setAttribute("fill",colors[flag][1]);
    ccLogo.setAttribute("src",`cc-${flag}.svg`);

}

//Testando a função
setCardFlag("mastercard");