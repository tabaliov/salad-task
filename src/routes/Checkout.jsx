import Checkout from "../components/Checkout";
import { useLocation } from 'react-router-dom';

export default function CheckoutPage() {
  let { state } = useLocation();
  return (
    <Checkout order={state.order} total={state.total}/>
  );
}
