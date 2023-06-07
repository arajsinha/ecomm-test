import Link from 'next/link'
import React from 'react'
import { urlFor } from '../lib/client'

const HeroBanner = ({heroBanner}) => {
  return (
    <div className='hero-banner-container'>
        <div>
            {/* <p style={{color: "black", fontSize: "30px"}}>{heroBanner.product}</p> */}
            {/* <h3>{heroBanner.midText}</h3> */}
            {/* <h1>{heroBanner.largeText1}</h1> */}
            <h1>{heroBanner.product}</h1>
            {/* <img src={urlFor(heroBanner.image)} alt="" srcset="" className='hero-banner-image' /> */}

            <div>
                {/* <Link href={`/product/${heroBanner.product}`}>
                    <button type='button'>{heroBanner.buttonText}</button>
                </Link> */}
                {/* <div className='desc'>
                    <h5>Description</h5>
                    <p>{heroBanner.desc}</p>
                </div> */}
            </div>
        </div>
    </div>
  )
}

export default HeroBanner