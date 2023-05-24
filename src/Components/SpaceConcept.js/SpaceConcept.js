import React from 'react';
import "./SpaceConcept.css";


const SpaceConcept = () => {
  return (
    <>
    <div className='space'>
        <div className="row spacey">
           
            <div className="col-md-4">
            <div className="card" style={{ width: '18rem' }}>
        <img className="space1" src="./space2.jpg" alt="Card image cap" />
        <div className="card-body">
          <h5 className="card-title txt1">What is space?</h5>
          <p className="card-text txt" >
          The concept of space refers to the vast and seemingly infinite expanse that exists beyond Earth's atmosphere, encompassing all matter and energy. It is a way for cosmic exploration and holds countless mysteries yet to be discovered.
          </p>
        </div>
      </div>
            </div>
            <div className="col-md-4">
            <div className="card" style={{ width: '18rem' }}>
        <img className="space1" src="./space.jpg" alt="Card image cap" />
        <div className="card-body">
          <h5 className="card-title txt1"> What does space consist of?</h5>
          <p className="card-text txt">
          Space primarily consists of a vacuum, meaning it lacks air and other matter. However, it contains objects such as planets, stars, galaxies, comets, and other astronomical phenomena distributed.
          </p>
        </div>
      </div>
    </div>
    <div className="col-md-4">
    <div className="card" style={{ width: '18rem' }}>
        <img className="space1" src="./space2.jpg" alt="Card image cap" />
        <div className="card-body">
          <h5 className="card-title txt1">Key characteristics of space?</h5>
          <p className='card-text txt'>
          Key characteristics include its three-dimensional nature, its vastness, the absence of significant atmospheric pressure, and the presence of celestial bodies and phenomena dispersed across its expanse.
          </p>
        </div>
      </div>
    </div>
            </div>

        </div>

       <div className="charOfSpace">
       <div className="row">
                <div className="col4">
                <div className="card" style={{ width: '18rem' }}>
                    <img className="space1" src="./space2.jpg" alt="Card image cap" />
                    <div className="card-body">
                    <h5 className="card-title txt1">What is space?</h5>
                    <p className="card-text txt" >
                    The concept of space refers to the vast and seemingly infinite expanse that exists beyond Earth's atmosphere, encompassing all matter and energy. It is a way for cosmic exploration and holds countless mysteries yet to be discovered.
                    </p>
                    </div>
                </div>
                </div>
            </div>
       </div>
    
   


    </>
    
   
  );
};


export default SpaceConcept;
