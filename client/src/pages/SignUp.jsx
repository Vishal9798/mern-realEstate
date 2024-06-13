import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'  //`useNavigate` is a hook that allows you to navigate to a different route in your application.(signIN page here)


export default function SignUp() {
  const [formData, setFormData] = useState({})  //initializing the form data
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,  //saving the form data
      [e.target.id]: e.target.value
    });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // const res = await fetch('/api/auth/signup', formData);  // we need to create proxy here as our web and db server add is differnt(3000,5173) proxy added to vite.config.js
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success == false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in'); // after clicking signup button we will navigate to sign-in page

    } catch (error) {
      setLoading(false);
      setError(error.message);

    }

  };

  //console.log(formData)
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-bold my-7'>Sign Up</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input type='text' placeholder='username' className='border p-3 rounded-lg' id='username' onChange={handleChange} />
        <input type='email' placeholder='email' className='border p-3 rounded-lg' id='email' onChange={handleChange} />
        <input type='password' placeholder='password' className='border p-3 rounded-lg' id='password' onChange={handleChange} />
        <button disabled={loading} className='bg-green-500 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80'>
          {loading ? 'Loading...' : 'Sign Up'}</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Already have an account?</p>
        <Link to={"/sign-in"}>
          <span className='text-blue-700'>Sign in</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-3'>{error}</p>}
    </div>
  )
}

