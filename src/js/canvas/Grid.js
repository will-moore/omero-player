
import React from 'react';

const Grid = ({sizeZ, sizeT, theZ, theT, sizeX, sizeY}) => (

    <div style={{ position: 'absolute', top: 50, left: 0, right: 0, bottom: 0 }} >
        <div style={{ left: '50%', top: '50%', position: 'absolute', border: 'solid red 1px' }} >

            {Array(sizeZ).fill(0).map((i, z) => {
                return Array(sizeT).fill(0).map((o, t) => (
                    <div
                        key={z * sizeT + t}
                        style={{ width: sizeX, height: sizeY, position: 'absolute',
                            left: t * sizeX - 256, top: z * sizeY - 256,
                            border: 'solid black 1px',
                            transform: 'perspective(500px) translateZ(-200px)'}}
                    >


                    {(z * sizeT + t) + "Z:" + z + " T:" + t}

                    </div>
                ))
            }
            )}
        </div>
    </div>
)

export default Grid
