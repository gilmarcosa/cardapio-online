import { useState } from "react";
import Menu from "../components/Menu";
import SummaryModal from "../components/SummaryModal";
import { useMemo } from "react"; // Remova essa linha se você não estiver usando, pois estava no código anterior.

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

  // Aqui você pode usar useMemo, como sugerido antes, para otimizar o cálculo do total
  // const total = useMemo(() => cart.reduce((acc, item) => acc + item.price, 0), [cart]);
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

  // DECLARAÇÃO DA FUNÇÃO MOVIDA PARA AQUI, ANTES DE SER USADA
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
      {/* ... todo o seu Hero e Cabeçalho ... */}
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
        <SummaryModal
          cart={cart}
          total={total}
          removeFromCart={removeFromCart}
          setShowSummary={setShowSummary}
          cep={cep}
          setCep={setCep}
          rua={rua}
          setRua={setRua}
          bairro={bairro}
          setBairro={setBairro}
          cidade={cidade}
          setCidade={setCidade}
          numero={numero}
          setNumero={setNumero}
          complemento={complemento}
          setComplemento={setComplemento}
          buscarEndereco={buscarEndereco}
          sendToWhatsApp={sendToWhatsApp}
        />
      )}
    </div>
  );
}
