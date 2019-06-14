const container = document.querySelector('.col-8');


fetch('http://localhost:3000/comidas')
    .then(response => {
        return response.json();
    })
    .then(data => {
        data.forEach(adicionaComida => {
            console.log(adicionaComida);
            const grandeBox = document.createElement('div');
            grandeBox.setAttribute('class', 'media mb-4');

            const imagem = document.createElement('img');
            imagem.setAttribute('class', 'mr-3 img-thumbnail');
            imagem.setAttribute('alt', adicionaComida.nome);
            imagem.setAttribute('width', '200px');
            imagem.setAttribute('src', adicionaComida.imagem)

            const box = document.createElement('div');
            
            const descricao = document.createElement('div');
            descricao.textContent = adicionaComida.descricao;
            
            const titulo = document.createElement('div');
            titulo.setAttribute('class', 'media-body');
            titulo.innerHTML = `<strong>${adicionaComida.nome}</strong>
            `
            const botao = document.createElement('button');
            botao.setAttribute('data-id',adicionaComida._id);
            botao.setAttribute('class','btn btn-info');
            botao.textContent = ("Remover"); 
            
            botao.addEventListener('click', () => {
                
                const cardFilho = botao.parentElement;
                const cardPai = cardFilho.parentElement;
                
                fetch('http://localhost:3000/comidas/' + adicionaComida._id,{
                    
                    method: "DELETE",
                    headers:{
                        'Accept': 'application/json', 'Conten-Type': 'application/json'
                    }
                })
                    .then(()=>{
                        cardPai.removeChild(cardFilho)
                        
                    })
                    .catch((erro)=>{
                        console.log(erro)
                        
                    })               
                })
        
                grandeBox.appendChild(botao);
                grandeBox.appendChild(imagem);
                box.appendChild(titulo);
                box.appendChild(descricao);
                grandeBox.appendChild(box)
                container.appendChild(grandeBox);
        });
    })
    .catch(erro => {
        console.log("Deu erro!!!", erro)
    })


const botao = document.querySelector('#criar_comida_button')
botao.addEventListener("click", criarComida)

function criarComida() {
    console.log('Clicou no forms :)')
    const nome = document.querySelector("#nome_input").value
    const descricao = document.querySelector("#descricao_input").value
    const imagem = 'https://picsum.photos/200/200'
    const comida = {
        nome, descricao, imagem
    }
    fetch(
        'http://localhost:3000/comidas',
        {
            method: 'POST',
            titulo: JSON.stringify(comida),
            headers: {
                'Content-Type': 'application/json'
            }
        }
    ).then(response => console.log("criou!"));
    window.location.reload()
}
