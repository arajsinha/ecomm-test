import React from 'react'

const HappyStrip = () => {
  return (
    <>
        <div className='stripContainer'>
            <div className="row">
                <div className="strip col-md-4">
                    <div className="mainicon">
                        <img src='https://cdn-icons-png.flaticon.com/512/3110/3110076.png'></img>
                    </div>
                    <div className="icontext"><p>Custom Mattress</p></div>
                </div>
                <div className="strip col-md-4">
                    <div className="mainicon">
                        <img src='https://cdn-icons-png.flaticon.com/512/709/709790.png'></img>
                    </div>
                    <div className="icontext"><p>Prompt Delivery</p></div>
                </div>
                <div className="strip col-md-4">
                    <div className="mainicon">
                        <img src='https://cdn-icons-png.flaticon.com/512/1212/1212158.png'></img>
                    </div>
                    <div className="icontext"><p>Assured Quality</p></div>
                </div>
            </div>
        </div>
    </>
  )
}

export default HappyStrip