import { useState } from "react";
import Menu from "../components/menu";

export default function Home() {
  const [cart, setCart] = useState([]);
  const [showSummary, setShowSummary] = useState(false);

  // Campos de endereço
  const [cep, setCep] = useState("");
  const [rua, setRua] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  const buscarEndereco = async () => {
    if (cep.length === 8) {
      try {
        const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await res.json();
        if (!data.erro) {
          setRua(data.logradouro || "");
          setBairro(data.bairro || "");
          setCidade(data.localidade || "");
        }
      } catch (err) {
        console.error("Erro ao buscar CEP", err);
      }
    }
  };

  const sendToWhatsApp = () => {
    const endereco = `${rua}, ${numero} - ${bairro}, ${cidade} - CEP: ${cep} ${
      complemento ? `(${complemento})` : ""
    }`;
    const message = cart
      .map((item) => `🍽️ ${item.name} - R$${item.price.toFixed(2)}`)
      .join("%0A");

    const totalText = `💰 Total: R$${total.toFixed(2)}`;
    const addressText = `📍 Endereço: ${endereco}`;

    const fullMessage = `Olá! Quero fazer um pedido:%0A${message}%0A${totalText}%0A${addressText}`;
    const url = `https://wa.me/5583998580321?text=${fullMessage}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Hero */}
      <section className="relative w-full h-[30vh] md:h-[40vh]">
        <img
          src="/hero strog.png"
          alt="Foto do Restaurante"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-center p-4">
          <h1 className="text-3xl md:text-5xl font-bold drop-shadow-lg">
            Strog & Co
          </h1>
          <p className="mt-2 text-lg md:text-xl">O melhor strog da cidade!</p>
        </div>
      </section>

      {/* Cabeçalho */}
      <header className="sticky top-0 bg-white shadow-md p-4 flex justify-between items-center z-10">
        <h1 className="text-xl font-semibold text-blue-600">Cardápio</h1>
        <button
          onClick={() => setShowSummary(true)}
          className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          🛒 Carrinho ({cart.length})
          <span className="hidden sm:inline"> - R${total.toFixed(2)}</span>
        </button>
      </header>

      {/* Lista de produtos */}
      <Menu addToCart={addToCart} />

      {/* Modal resumo do pedido */}
      {showSummary && (
        <div className="fixed inset-0 text-gray-600 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4">Resumo do Pedido</h2>
            <ul className="max-h-40 overflow-y-auto mb-4 text-gray-800">
              {cart.map((item, index) => (
                <li key={index} className="flex justify-between border-b py-2">
                  <span>{item.name}</span>
                  <span>R${item.price.toFixed(2)}</span>
                </li>
              ))}
            </ul>

            {/* Campos de endereço */}
            <div className="space-y-2 mb-4">
              <input
                type="text"
                placeholder="CEP"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                onBlur={buscarEndereco}
                className="w-full border px-3 py-2 rounded placeholder-gray-500"
              />
              <input
                type="text"
                placeholder="Rua"
                value={rua}
                onChange={(e) => setRua(e.target.value)}
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="text"
                placeholder="Bairro"
                value={bairro}
                onChange={(e) => setBairro(e.target.value)}
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="text"
                placeholder="Cidade"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="text"
                placeholder="Número"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="text"
                placeholder="Complemento"
                value={complemento}
                onChange={(e) => setComplemento(e.target.value)}
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            <p className="font-bold text-lg mb-6 text-gray-800">
              Total: R${total.toFixed(2)}
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowSummary(false)}
                className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 transition"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  sendToWhatsApp();
                  setShowSummary(false);
                }}
                className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 transition"
              >
                Confirmar e Enviar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
