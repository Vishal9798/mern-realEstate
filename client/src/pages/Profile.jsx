import { useSelector } from 'react-redux'
import { useRef, useState, useEffect } from 'react' //for changing the image
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { app } from '../firebase';
import { uploadBytesResumable } from 'firebase/storage';
import {
  deleteUserSuccess,
  deleteUserStart,
  updateUserStart,
  updateUserFailure,
  updateUserSuccess,
  deleteUserFailure,
  signOutUserSuccess,
  signOutUserStart,
  signOutUserFailure
} from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';



function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector(state => state.user)
  const [file, setFile] = useState(undefined)
  const [filePerc, setFilePerc] = useState(0)
  const [fileUploadError, setFileUploadError] = useState(false)
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]); // [state , setState]
  const dispatch = useDispatch();
  //console.log(formData);
  // console.log(filePerc)
  // console.log(file)

  // firebase storage
  // allow read;
  // allow write: if
  // request.resource.size < 2 * 1024 * 1024 && 
  // request.resource.contentType.matches('image/.*')

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file); // method to upload file to firebase storage



    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
        //console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        setFileUploadError(true)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL }));


      }


    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success == false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));

    }
  }

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));


    } catch (error) {
      dispatch(deleteUserFailure(error.message));

    }
  }
  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout'); //get request
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  }

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }
      setUserListings(data);

    } catch (error) {
      setShowListingsError(true);
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-bold text-center my-5'>PROFILE</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
        <input onChange={(e) => setFile(e.target.files[0])}
          type='file' ref={fileRef} hidden accept='image/*' />
        <img onClick={() => fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt="profile" className='rounded-full h-24 object-cover cursor-pointer self-center ' />
        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>

        <input onChange={handleChange} id='username' type='text' placeholder='username' className='border p-2 rounded-lg' defaultValue={currentUser.username} />
        <input onChange={handleChange} id='email' type='email' placeholder='email' className='border p-2 rounded-lg' defaultValue={currentUser.email} />
        <input onChange={handleChange} id='password' type='password' placeholder='password' className='border p-2 rounded-lg' />
        <button disabled={loading} className='bg-green-500 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-70'>{loading ? 'Loading...' : 'Update'}</button>
        <Link className='bg-green-500 text-white p-3 rounded-lg uppercase text-center hover:opacity-90 disabled:opacity-70' to={"/create-listing"}>Create Listing
        </Link>

      </form>
      <div className='flex justify-between mt-2'>
        <span onClick={handleDeleteUser} className='text-red-500 cursor-pointer'>Delete Account</span>
        <span onClick={handleSignOut} className='text-red-500 cursor-pointer'>Sign out</span>
      </div>
      <p className='text-red-700 mt-5'>{error ? error : ''}</p>
      <p className='text-green-700 mt-5'>{updateSuccess ? 'User is updated Successfully!' : ''}</p>
      <button onClick={handleShowListings} className='text-green-700 w-full' >Show Listings</button>
      <p className='text-red-700 mt-5'>{showListingsError ? 'Error showing Listings' : ''}</p>

      {userListings && userListings.length > 0 &&
        <div className='flex flex-col gap-4'>
          <h1 className='text-center mt-7 text-2xl font-bold'>
          Your Listings
          </h1>
          {userListings.map((listing) => (
            <div key={listing._id} className='gap-3 border rounded-lg p-3 flex justify-between items-center'>
              <Link to={`/listing/${listing._id}`} className='text-green-700'>
                <img className='h-16 w-16 object-contain' src={listing.imageUrls[0]} alt='listing cover' />
              </Link>

              <Link className='text-slate-700 font-semibold flex-1 hover:underline truncate' to={`/listing/${listing._id}`} >
                <p >
                  {listing.name}
                </p>
              </Link>

              <div className='flex flex-col item-center'>
                <button className='text-red-700 uppercase' >Delete</button>
                <button className='text-green-700 uppercase' >Edit</button>
              </div>


            </div>
          ))}
        </div>}


    </div>
  );
}

export default Profile