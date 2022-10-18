import "./css/index.css"

//Fazendo a seleção do path do primeiro elemento g que está na index. Ref. da estrutura:
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

//Fazendo a seleção do path do segundo elemento g que está na index.
const ccBgColor02 = document.querySelector(".cc-bg svg > g g:nth-child(2) path");

//Modificando o atributo fill
ccBgColor01.setAttribute("fill","green");
ccBgColor02.setAttribute("fill","blue");


//Criando estrutura de dados para as cores
const colors = {
    "visa":["#2D57F2","#436D99"],
    "mastercard":["#C69347","#DF6F29"],
    "default":["black","gray"]
}
