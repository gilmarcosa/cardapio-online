import { products } from "../data/products";

export default function Menu({ addToCart }) {
  return (
    <div className="p-4">
      {/* Indicador de horário */}
      <div className="text-center mb-4 text-sm">
        <p className="text-gray-600 font-semibold">
          ⏰ Horário de funcionamento: 11h às 15h
        </p>
      </div>

      <main className="p-4 pb-20">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex items-start gap-4 border-b border-gray-300 py-4"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-24 h-24 object-cover rounded"
            />
            <div className="flex flex-col flex-1 justify-between">
              <div>
                <h2 className="text-sm font-semibold text-gray-800">
                  {product.name}
                </h2>
                <p className="text-gray-600 text-xs mt-1 mb-1">
                  {product.description}
                </p>
                <p className="text-blue-600 text-sm font-medium">
                  R${product.price.toFixed(2)}
                </p>
              </div>
              <button
                onClick={() => addToCart(product)}
                className="mt-2 bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition text-sm w-max"
              >
                ➕ Adicionar
              </button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
