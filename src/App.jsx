import { useState, useEffect } from "react"
import Header from "./components/Header"
import Guitar from "./components/Guitar"
import Footer from "./components/Footer"

import { db } from "./data/db"

function App() {

  const initialCart = () => {
    // Obtiene lo que hay de localStorage en la variable cart 
    const localStorageCart = localStorage.getItem('cart');
    // Retorna el arreglo de elementos en caso de existir información o en caso contrario un arreglo vacío 
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }

  // Si es un archivo local
  const [data] = useState(db);
  const [cart, setCart] = useState(initialCart);

  const MAX_ITEM = 5;
  const MIN_ITEM = 1;

  useEffect( () => {
    // Sincroniza el localStorage cada que cart cambie 
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  function addToCart(item){
    const itemExists = cart.findIndex( guitar => guitar.id === item.id )
    if(itemExists >= 0) {
      // Límita agregar hasta 5 elementos 
      if(cart[itemExists].quantity >= MAX_ITEM) return
      const updatedCart = [...cart];
      updatedCart[itemExists].quantity++;
      setCart(updatedCart);
    } else {
      // console.log('No existe, agregando');
      item.quantity = 1;
      setCart([...cart, item])
    }
    
  }

  function removeFromCart(id) {
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
  }

  function decreaseQuantity(id){
    // Crea y recorre un nuevo arreglo 
    const updatedCart = cart.map( item => {
      // Si el id es igual al que se pasa como parámetro decrementa la cantidad (límite de 1)
      if(item.id === id && item.quantity > MIN_ITEM) {
       // Retorna la copia del elemento y la cantidad incrementad en 1 
        return {
          // Regresa una copia del elemento 
          ...item,
          // Regresa la cantidad actualizada
          quantity: item.quantity - 1
        }
      }
      // Regresa el elemento (con los datos actualizados)
      return item
    })
    // Agrega el valor 
    setCart(updatedCart)
  }

  function increaseQuantity(id){
    // Crea y recorre un nuevo arreglo 
    const updatedCart = cart.map( item => {
      // Si el id es igual al que se pasa como parámetro incrementa la cantidad (límite de 5)
      if(item.id === id && item.quantity < MAX_ITEM) {
        // Retorna la copia del elemento y la cantidad incrementad en 1 
        return {
          // Regresa una copia del elemento 
          ...item,
          // Regresa la cantidad actualizada
          quantity: item.quantity + 1
        }
      }
      // Regresa los ítems que no fueron modificados 
      return item
    })
    // Agrega el valor 
    setCart(updatedCart)
  }

  function clearCart(){
    // Limpia los elementos del carrito (No asigna nada al arreglo)
    setCart([]);
  }

  // console.log(data);

  return (
    <>
      <Header 
        cart={cart}
        removeFromCart={removeFromCart}
        decreaseQuantity={decreaseQuantity}
        increaseQuantity={increaseQuantity}
        clearCart={clearCart}
      />

      <main className="container-xl mt-5">
          <h2 className="text-center">Nuestra Colección</h2>

          <div className="row mt-5">
              {data.map( (guitar) => 
                (
                  <Guitar
                    // id={elemento.id}
                    // name={elemento.name}
                    // image={elemento.image}
                    // description={elemento.description}
                    // price={elemento.price}
                    key={guitar.id}
                    guitar={guitar}
                    setCart={setCart}
                    addToCart={addToCart}
                  />
                )
              )} 
          </div>
      </main>

      <Footer />
    </>
  )
}

export default App
