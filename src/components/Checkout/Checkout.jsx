import { useState } from "react"
import { useNavigate } from "react-router-dom";
import "./Checkout.css";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

export default function Checkout({ order, total }) {
  const navigate = useNavigate();
  let [open, setOpen] = useState(false);
  let [name, setName] = useState("")
  let [phone, setPhone] = useState("")
  let [email, setEmail] = useState("")
  let [adress, setAdress] = useState("")
  let [notes, setNotes] = useState("")


  function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    setName(formData.get("name"))
    setPhone(formData.get("phone"))
    setEmail(formData.get("email"))
    setAdress(formData.get("adress"))
    setNotes(formData.get("notes"))
    setOpen(true)
  }

  function onCloseModal() {
    navigate("/");
  }

  return (
    <div className="checkout">
      <div className="order">
        <h3>Order</h3>
        <ul>
          {order.map((ingredient, index) => (
            (ingredient.count > 0 &&
              <li key={ingredient.id}>
                {ingredient.name}: {ingredient.count} x ${ingredient.price}
              </li>
            )
          ))}
        </ul>
        <div className="total">
          <h1>Total: ${total}</h1>
        </div>
      </div>

      <div className="checkout-form">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label htmlFor="name">Name: </label>
            <input type="text" name="name" id="name" required />
          </div>
           <div className="form-row">
            <label htmlFor="phone">Phone: </label>
            <input type="text" name="phone" id="phone" required />
          </div>
          <div className="form-row">
            <label htmlFor="email">Email: </label>
            <input type="email" name="email" id="email" required />
          </div>
           <div className="form-row">
            <label htmlFor="adress">Adress: </label>
            <input type="adress" name="adress" id="adress" />
          </div>
          <div className="form-row">
            <label htmlFor="notes">Notes: </label>
            <textarea  type="textarea" name="notes" id="notes" />
          </div>
          <div className="form-row">
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>

      <Modal open={open} onClose={onCloseModal} center>
        <div className="modal-content">
          <h1>Thank you</h1>
          <h2>Delivery is on its way</h2>
          <p>Name: {name}</p>
          <p>Phone: {phone}</p>
          <p>Email: {email}</p>
          {adress.length > 0 && (
            <p>Adress: {adress}</p>
          )}
           {notes.length > 0 && (
            <p>Notes: {notes}</p>
          )}
          <button onClick={() => {
            onCloseModal();
          }} className="remove">Close</button>
        </div>
      </Modal>
    </div>
  );
};
