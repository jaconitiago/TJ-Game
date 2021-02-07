const jogador = document.querySelector('.jogador');
const planoDeFundo = document.querySelector('.planoDeFundo');

let estaPulando = false;
let posicaoJogador = 0;

function pressionar(event){
    //Captura a ação de pressionar o botão espaço.
    if(event.keyCode === 32){
        if(!estaPulando){
            pular(); //Executa a função de pular.
        }
    }
}

function pular(){
    //Função para ação de pular.
    estaPulando = true;

    let intervaloDeSubida = setInterval(()=> {
        if(posicaoJogador>=150){
            clearInterval(intervaloDeSubida); //Para de subir.

            let intervaloDeDescida = setInterval(()=>{
                if(posicaoJogador<=0){
                    estaPulando= false;
                    clearInterval(intervaloDeDescida); //Para de descer.
                }else{
                    //Descendo
                    posicaoJogador-= 20;
                    jogador.style.bottom = posicaoJogador + 'px';
                }
            }, 20);
        }else{
            //Subindo
            posicaoJogador+= 20;
            jogador.style.bottom = posicaoJogador + 'px';
        }
    }, 20);
}

function criarZumbis(){
    const zumbi = document.createElement('div');
    let zumbiPosicao = 1000;
    let randomTime = Math.random()*6000;

    zumbi.classList.add('zumbi');
    zumbi.style.left = 1000+ 'px';
    planoDeFundo.appendChild(zumbi);

    let intervaloDaEsquerda = setInterval(()=>{

        if(zumbiPosicao < -50){
            clearInterval(intervaloDaEsquerda);
            planoDeFundo.removeChild(zumbi);
        }else if (zumbiPosicao > 0 && zumbiPosicao < 50 &&  posicaoJogador < 60){
            clearInterval(intervaloDaEsquerda);
            document.body.innerHTML = '<h1 class= "fimDeJogo">Fim de jogo...</h1>';
        }else{
            zumbiPosicao-= 5;
            zumbi.style.left = zumbiPosicao + 'px';
        }

    }, 20);

    setTimeout(criarZumbis, randomTime);
}
criarZumbis();
document.addEventListener('keyup', pressionar);