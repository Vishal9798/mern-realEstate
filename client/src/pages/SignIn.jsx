import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'  //`useNavigate` is a hook that allows you to navigate to a different route in your application.(signIN page here)
import { useDispatch} from 'react-redux'
import { useSelector } from 'react-redux'
import { signInStart , signInSuccess , signInFailure } from '../redux/user/userSlice'
import OAuth from '../componenets/OAuth'


export default function SignIn() {
  const [formData, setFormData] = useState({})  //initializing the form data
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(false);
  const { loading , error} = useSelector((state) => state.user); // using redux golbal state instead of above two lines
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,  //saving the form data
      [e.target.id]: e.target.value
    });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // setLoading(true);
      dispatch(signInStart()); // using redux instead of setLoading(true)(aboveone)
      // const res = await fetch('/api/auth/signup', formData);  // we need to create proxy here as our web and db server add is differnt(3000,5173) proxy added to vite.config.js
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success == false) {
        // setError(data.message);
        // setLoading(false);
        dispatch(signInFailure(data.message)); // using redux instead of setError(data.message) and setLoading(false) (aboveone)
        return;
      }
      // setLoading(false);
      // setError(null);
      dispatch(signInSuccess(data)); // using redux instead of setError(null) and setLoading(false) (aboveone)
      navigate('/'); // after clicking signup button we will navigate to sign-in page

    } catch (error) {
      // setLoading(false);
      // setError(error.message);
      dispatch(signInFailure(error.message)); // using redux instead of setError(error.message) and setLoading(false) (aboveone)

    }

  };

  //console.log(formData)
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-bold my-7'>Sign In</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input type='email' placeholder='email' className='border p-3 rounded-lg' id='email' onChange={handleChange} />
        <input type='password' placeholder='password' className='border p-3 rounded-lg' id='password' onChange={handleChange} />
        <button disabled={loading} className='bg-green-500 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80'>
          {loading ? 'Loading...' : 'Sign In'}</button>
          <OAuth/>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Dont have an account?</p>
        <Link to={"/sign-up"}>
          <span className='text-blue-700'>Sign up</span>
        </Link>
        
      </div>
      {error && <p className='text-red-500 mt-3'>{error}</p>}
    </div>
  )
}

