import axios from 'axios'
const URL_API = process.env.URL_API

export default function PayButton ({ cartItems }) {
  // const user = useSelector((state) => state.auth);
  // <console.log("🚀 ~ PayButton ~ user:", user)
  console.log('🚀 ~ process.env.REST_URLXDEWDEDE:', process.env.URL_API)

  const handleCheckout = () => {
    axios
      .post('http://localhost:4000/api/stripe/create-checkout-session', { // 2do parámetro
        cartItems,
        userId: '662f1b66049935b3783df60e'
      })
      .then((response) => {
        console.log('🚀 ~ .then ~ response:', response)
        if (response.data.url) {
          window.location.href = response.data.url
        }
      })
      .catch((err) => console.log(err.message))
  }

  return (
    <>
      <button onClick={() => handleCheckout()}>CHECK OUT PAY BUTTON</button>
    </>
  )
};
