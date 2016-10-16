
import React from 'react';
import GridPlane from './GridPlane'
import ReactTransitionGroup from 'react-addons-transition-group'

const Grid = ({sizeZ, sizeT, theZ, theT, sizeX, sizeY}) => (

    <ReactTransitionGroup
            component="div"
            style={{ position: 'absolute', top: 50, left: 0, right: 0, bottom: 0 }} >
        <div style={{ left: '50%', top: '50%', position: 'absolute', border: 'solid red 1px' }} >

            {Array(sizeZ).fill(0).map((i, z) => {
                return Array(sizeT).fill(0).map(
                            (o, t) => (
                                <GridPlane
                                    sizeX={sizeX}
                                    sizeY={sizeY}
                                    theT={theT}
                                    theZ={theZ}
                                    Tindex={t}
                                    Zindex={z}
                                    key={z * sizeT + t}
                                ></GridPlane>
                            )
                )
            }
            )}
        </div>
    </ReactTransitionGroup>
)

export default Grid
