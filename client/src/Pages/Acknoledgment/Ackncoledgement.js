import React from 'react';
import './Acknoloedgement.css'

const Acknoledgemnt = () =>{
    return(
        <div className='AcknoledgemntPageWrapper'>
            <div className='Acknoledgemnt-Container'>
                <div className='Acknoledgemnt-Details'>

                  PAYMENT SUCCESSFULL        
                

                </div>
                <div className='ContinueShoppingButton'
                onClick={()=>{
                    window.location.replace('/Shop');
                }}
                >
                    Continue Shopping
                </div>
                 </div>
        </div>
    )
}
export default Acknoledgemnt;