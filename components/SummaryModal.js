import React from "react";

export default function SummaryModal({
  cart,
  total,
  removeFromCart,
  setShowSummary,
  cep,
  setCep,
  rua,
  setRua,
  bairro,
  setBairro,
  cidade,
  setCidade,
  numero,
  setNumero,
  complemento,
  setComplemento,
  buscarEndereco,
  sendToWhatsApp,
}) {
  const isAddressValid = rua && numero && bairro && cidade;

  return (
    <div className="fixed inset-0 text-gray-600 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h2 className="text-xl font-bold mb-4">Resumo do Pedido</h2>
        <ul className="max-h-40 overflow-y-auto mb-4 text-gray-800">
          {cart.map((item, index) => (
            <li key={index} className="flex justify-between border-b py-2">
              <span>{item.name}</span>
              <span>R${item.price.toFixed(2)}</span>
              <button
                onClick={() => removeFromCart(index)}
                className="text-red-500 hover:text-red-700 font-bold ml-4"
              >
                X
              </button>
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
            onClick={sendToWhatsApp}
            disabled={!isAddressValid}
            className={`px-4 py-2 rounded ${
              !isAddressValid
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 text-white hover:bg-green-600"
            } transition`}
          >
            Confirmar e Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
