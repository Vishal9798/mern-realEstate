import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';

function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false);
  const params = useParams();
  useEffect(() => {
    const fetchListing = async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/listing/get/${params.listingId}`)
        const data = await res.json()
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);

      } catch (error) {
        setError(true);
        setLoading(false);
      }

    }
    fetchListing();
  }, [params.listingId])
  return (
    <main>
      {loading && <p className='text-center my-7 text-2xl' > Loading...</p>}
      {error && <p className='text-center my-7 text-2xl' >Something went Wrong</p>}
      {listing && !loading && !error && (
        <div>
          <Swiper navigation >
            {listing.imageUrls.map((url) => (
               <SwiperSlide key={url}>
              <div className='h-[300px]' 
              style={{ background: `url(${url}) center no-repeat` , backgroundSize: 'cover', }}>

              </div>


            </SwiperSlide>
            ))}

          </Swiper>
        </div>
      )}
    </main>
  )
}

export default Listing;