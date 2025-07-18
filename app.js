// Exemplo de imóveis iniciais
{
  title: "Apartamento T2",
  location: "Lisboa",
  price: "950€/mês",
  amenities: ["Estacionamento", "Perto de escolas", "Transportes públicos"]
}

// Mensagem se não houver resultados
listingsEl.innerHTML = "<li>Nenhum imóvel encontrado.</li>";

// Validação do formulário
alert("Por favor, preencha todos os campos obrigatórios.");

// Campos do imóvel
<p><strong>Localidade:</strong> ${location}</p>
<p><strong>Preço:</strong> ${price}</p>
<p><strong>Comodidades:</strong> ${amenities.join(", ")}</p>
