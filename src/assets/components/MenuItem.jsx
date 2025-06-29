// FICHIER : src/components/MenuItem.jsx
import AnimatedButton from "./AnimatedButton";

export default function MenuItem({ item, onQtyChange, onAdd }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md flex justify-between items-center">
      <div>
        <h2 className="text-lg font-semibold">{item.name}</h2>
        <p className="text-sm text-gray-600">{item.ingredients}</p>
        <p className="font-bold mt-1">{item.price} DA</p>
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="number"
          min="1"
          value={item.qty}
          onChange={(e) => onQtyChange(parseInt(e.target.value))}
          className="w-16 border rounded-lg text-center"
        />
        <AnimatedButton onClick={onAdd}>Ajouter</AnimatedButton>
      </div>
    </div>
  );
}