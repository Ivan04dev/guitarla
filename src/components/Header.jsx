// useMemo es un Hook de React que te permite guardar en caché el resultado de un cálculo entre renderizados.
import { useMemo } from "react"

const Header = ({cart, removeFromCart, decreaseQuantity, increaseQuantity, clearCart}) => {

    // State derivado
    // Verifica si hay elementos en el carrito
    const isEmpty = useMemo( () =>  cart.length === 0, [cart] )
    // Calcula el total a pagar 
    const cartTotal = useMemo( () => cart.reduce( (total, item) => total + (item.quantity * item.price), 0), [cart] )

    return (
        <>
            <header className="py-5 header">
                <div className="container-xl">
                    <div className="row justify-content-center justify-content-md-between">
                        <div className="col-8 col-md-3">
                            <a href="index.html">
                                <img className="img-fluid" src="/img/logo.svg" alt="imagen logo" />
                            </a>
                        </div>
                        <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
                            <div 
                                className="carrito"
                            >
                                <img className="img-fluid" src="/img/carrito.png" alt="imagen carrito" />

                                <div id="carrito" className="bg-white p-3">
                                { isEmpty ? (
                                    <p className="text-center">El carrito está vacío</p>
                                ) : (
                                    <>
                                        <table className="w-100 table">
                                            <thead>
                                                <tr>
                                                    <th>Imagen</th>
                                                    <th>Nombre</th>
                                                    <th>Precio</th>
                                                    <th>Cantidad</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cart.map(guitar => {
                                                    const { id, name, image, price, quantity } = guitar;
                                                    return (
                                                        <tr key={id}>
                                                            <td>
                                                                <img className="img-fluid" src={`/img/${image}.jpg`} alt="imagen guitarra" />
                                                            </td>
                                                            <td>{name}</td>
                                                            <td className="fw-bold">
                                                                ${price}
                                                            </td>
                                                            <td className="flex align-items-start gap-4">
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-dark"
                                                                    onClick={() => decreaseQuantity(guitar.id)}
                                                                >
                                                                    -
                                                                </button>
                                                                {quantity}
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-dark"
                                                                    onClick={() => increaseQuantity(guitar.id)}
                                                                >
                                                                    +
                                                                </button>
                                                            </td>
                                                            <td>
                                                                <button
                                                                    className="btn btn-danger"
                                                                    type="button"
                                                                    onClick={() => removeFromCart(guitar.id)}
                                                                >
                                                                    X
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>

                                        <p className="text-end">Total a pagar: <span className="fw-bold">${ cartTotal }</span></p>
                                        <button 
                                            className="btn btn-dark w-100 mt-3 p-2"
                                            onClick={clearCart}
                                        >
                                            Vaciar Carrito
                                        </button>
                                    </>
                                )}

                                    
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header