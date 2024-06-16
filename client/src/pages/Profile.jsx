// import React from 'react'
 import { useSelector } from 'react-redux'

// export default function Profile() {
//   const { CurrentUser } = useSelector((state) => state.user)

//   return (
//     <div>
//       <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
//       <form className='flex flex-col'>
//         <img src={CurrentUser.avatar} alt="profile" className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'/>
//       </form>
//     </div>
//   )
// }




function Profile() {
  const { currentUser } = useSelector(state => state.user)
  return (
    <div className='p-3 max-w-lg mx-auto'>
    <h1 className='text-3xl font-bold text-center my-5'>PROFILE</h1>
    <form className='flex flex-col gap-3'>
       <img src={currentUser.avatar} alt="profile" className='rounded-full h-24 object-cover cursor-pointer self-center '/>
        <input id='username' type='text' placeholder='username' className='border p-2 rounded-lg' value={currentUser.name} />
        <input id='email' type='email' placeholder='email' className='border p-2 rounded-lg' value={currentUser.name} />
        <input id='password' type='text' placeholder='password' className='border p-2 rounded-lg' value={currentUser.name} />
      <button className='bg-green-500 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-70'>Update</button>
    </form>
    <div className='flex justify-between mt-2'>
      <span className='text-red-500 cursor-pointer'>Delete Account</span>
      <span className='text-red-500 cursor-pointer'>Sign out</span>

    </div>
    
    </div>
  )
}

export default Profile