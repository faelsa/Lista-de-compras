import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faCheck } from '@fortawesome/free-solid-svg-icons';
import "../../index.css"
import { useState, useEffect } from 'react';

export default function ItemsQuantidades() {
    const [item, setItem] = useState("");
    const [quantidade, setQuantidade] = useState(0);

    const [listaItens, setListaItens] = useState(() => {
        const saved = localStorage.getItem("listaItens");
        return saved ? JSON.parse(saved) : [];
    });

    const [itensComprados, setItensComprados] = useState(() => {
        const saved = localStorage.getItem("itensComprados");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("listaItens", JSON.stringify(listaItens));
    }, [listaItens]);

    useEffect(() => {
        localStorage.setItem("itensComprados", JSON.stringify(itensComprados));
    }, [itensComprados]);

    // 2. FUNÇÃO: Alterna o estado de seleção.
    const handleClick = (id) => {
        setListaItens(prevItens => prevItens.map(item =>
            item.id === id ? { ...item, selecionado: !item.selecionado } : item
        ));
    };

    const handleAddItem = (e) => {
        e.preventDefault();
        if (item.trim() !== '' && quantidade > 0) {
            const novoItem = {
                id: Date.now(),
                nome: item,
                qtd: Number(quantidade),
                selecionado: false
            }
            setListaItens([...listaItens, novoItem]);

            setItem("");
            setQuantidade(0);
        } else {
            alert('Preencha o item e a quantidade!')
        }
    }

    const handleDeleteItem = (id) => {
        setListaItens(prevItens => prevItens.filter(item => item.id !== id));
    }

    const handleComprados = (id) => {
        const itemParaMover = listaItens.find(item => item.id === id);
        if (itemParaMover) {
            setItensComprados(prev => [...prev, { ...itemParaMover, selecionado: false }]);
            setListaItens(prev => prev.filter(item => item.id !== id));
        }
    }

    const handleRestaurarItem = (id) => {
        const itemParaRestaurar = itensComprados.find(item => item.id === id);
        if (itemParaRestaurar) {
            setListaItens(prev => [...prev, itemParaRestaurar]);
            setItensComprados(prev => prev.filter(item => item.id !== id));
        }
    }

    const handleDeleteComprado = (id) => {
        setItensComprados(prev => prev.filter(item => item.id !== id));
    }

    return (
        <div className="flex flex-col justify-center items-center gap-7">
            <section className="flex flex-row gap-2 justify-center items-end">
                <div className="rounded-md flex flex-col justify-center items-start">
                    <h1 className="text-sm text-neutral-500">Item</h1>
                    <input value={item} onChange={(e) => setItem(e.target.value)} className="border border-neutral-300 w-48 h-9 rounded-md p-2" type="text" />
                </div>

                <div className="rounded-md flex flex-row justify-center items-center gap-2">
                    <div className="flex flex-col justify-start items-start">
                        <h1 className="text-sm text-neutral-500">Quantidade</h1>
                        <input value={quantidade} onChange={(e) => setQuantidade(Number(e.target.value))} className="border border-neutral-300 w-20 h-9 rounded-md p-2 no-spinners" type="number" />
                    </div>

                    <button
                        onClick={handleAddItem}
                        className="w-10 h-9 bg-amber-700 hover:bg-amber-800 transition rounded-md text-center flex justify-center items-center mt-4"
                    >
                        <FontAwesomeIcon icon={faPlus} className="w-5 h-5 text-white" />
                    </button>
                </div>
            </section>
            <div className="flex flex-col justify-center items-start gap-2">
                {listaItens.map((item) => (
                    <div key={item.id} className="flex flex-row justify-center items-center gap-4">
                        <div onClick={() => handleComprados(item.id)} className="flex text-center">
                            <FontAwesomeIcon icon={faCheck} className="w-6 h-6 text-green-700 cursor-pointer hover:text-green-800 transition" />
                        </div>
                        <div
                            className={`p-4 rounded-md shadow-md w-10 h-10 transition-all duration-300 cursor-pointer ${item.selecionado ? 'bg-amber-700 hover:opacity-90' : 'bg-neutral-100 hover:bg-neutral-200'}`}
                            onClick={() => handleClick(item.id)}
                        />
                        <div className='flex flex-col gap-1'>
                            <p className="text-sm text-neutral-500">{item.nome}</p>
                            <p className="text-sm text-neutral-500 leading-2">{item.qtd}</p>
                        </div>
                        {item.selecionado && (
                            <div onClick={() => handleDeleteItem(item.id)} className="flex text-center items-center gap-2">
                                <FontAwesomeIcon icon={faTrash} className="w-5 h-5 cursor-pointer text-red-800 hover:text-red-900 transition" />
                            </div>
                        )}
                    </div>
                ))}

                {itensComprados.length > 0 && (
                    <div className="flex flex-col justify-center items-start gap-2 mt-4">
                        <h1 className="text-lg font-bold text-neutral-700">Items Comprados</h1>
                        <div className="flex flex-col gap-2">
                            {itensComprados.map((item) => (
                                <div key={item.id} className="flex flex-row justify-center items-center gap-4 opacity-60">
                                    <div onClick={() => handleRestaurarItem(item.id)} className="flex text-center">
                                        <FontAwesomeIcon icon={faCheck} className="w-6 h-6 text-neutral-400 cursor-pointer hover:text-green-700 transition" />
                                    </div>
                                    <div
                                        className={`p-4 rounded-md shadow-md w-10 h-10 bg-green-100`}
                                    />
                                    <div className='flex flex-col gap-1'>
                                        <p className="text-sm text-neutral-500 line-through">{item.nome}</p>
                                        <p className="text-sm text-neutral-500 leading-2">{item.qtd}</p>
                                    </div>
                                    <div onClick={() => handleDeleteComprado(item.id)} className="flex text-center items-center gap-2">
                                        <FontAwesomeIcon icon={faTrash} className="w-5 h-5 cursor-pointer text-red-800 hover:text-red-900 transition" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}