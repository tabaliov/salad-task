import { Link } from "react-router-dom";
import quickluxLogo from '../assets/logo.png'

export default function Root() {
  return (
    <>
      <img src={quickluxLogo} alt="logo" />
      <Link to={`salad`}><button>Order Salad</button></Link>
    </>
  );
}
