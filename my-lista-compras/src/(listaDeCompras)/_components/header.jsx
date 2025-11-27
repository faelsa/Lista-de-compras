import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
  return (
    <div className="flex flex-col items-center justify-start">
      <div className="flex flex-col gap-2 justify-start items-center">
        <div className="w-10 h-10 bg-amber-700 rounded-md text-center flex justify-center items-center">
          <FontAwesomeIcon icon={faShoppingCart} className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-amber-700">Lista de Compras</h1>
        <p className="text-sm text-neutral-500">Facilite sua ida ao supermercado!</p>
      </div>
    </div>
  )
}