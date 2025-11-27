import Header from "./_components/header.jsx"
import ItemsQuantidades from "./_components/itemsQuantidades.jsx"

export default function App() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-neutral-300 py-12">
      <div className="w-[480px] max-w-[90vw] bg-white rounded-md p-6 flex flex-col gap-8">
        <Header />
        <ItemsQuantidades />
      </div>
    </div>
  )
}