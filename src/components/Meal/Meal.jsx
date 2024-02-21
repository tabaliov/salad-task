import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { createServer } from "miragejs"
import "./Meal.css"

createServer({
  routes() {
    this.get("/api/salad", () => [
      { id: "1", name: "Greens", price: 1.00 },
      { id: "2", name: "Kale", price: 2.00 },
      { id: "3", name: "Arugula", price: 0.50 },
      { id: "4", name: "Grilled Chicken", price: 3.50 },
      { id: "5", name: "Tofu", price: 2.40 },
      { id: "6", name: "Salmon", price: 6.00 },
    ])
  },
})

export default function Meal({ type }) {
  let [order, setOrder] = useState([])
  const total = order.reduce((a,v) =>  a = a + (v.count * v.price) , 0 ).toFixed(2);

  useEffect(() => {
    fetch(`/api/${type}`)
      .then((response) => response.json())
      .then((json) => setOrder(json.map(ingredient => {
         return { ...ingredient, count: 0 }
      })))
  }, [])

  function incrementCount(index) {
    setOrder([
      ...order.slice(0, index),
      {
        ...order[index],
        count: order[index].count += 1
      },
      ...order.slice(index + 1)
    ])
  }

  function decrementCount(index) {
    setOrder([
      ...order.slice(0, index),
      {
        ...order[index],
        count: order[index].count -= 1
      },
      ...order.slice(index + 1)
    ])
  }

  return (
    <>
      <div className="meal">
        <div className="order">
          <h3>order</h3>
          <ul>
            {order.map((ingredient, index) => (
              <li key={ingredient.id}>
                {ingredient.name}: ${ingredient.price}
                <button onClick={() => {
                  incrementCount(index);
                }} className="add">Add </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="order">
          <h3>Order</h3>
          <ul>
            {order.map((ingredient, index) => (
              (ingredient.count > 0 &&
                <li key={ingredient.id}>
                  {ingredient.name}: ${ingredient.price}
                  <div className="counters">
                    <button onClick={() => {
                      decrementCount(index);
                    }} className="remove">- </button>
                    {ingredient.count}
                    <button onClick={() => {
                      incrementCount(index);
                    }} className="remove">+ </button>
                  </div>
                </li>
              )
            ))}
          </ul>

        </div>
      </div>

      <div className="total">
        <h1>Total: ${total}</h1>
      </div>
      {total > 0 &&
        <Link to={"/checkout"} state={{order, total}}><button>Proceed to Checkout</button></Link>
      }
    </>
  );
};
