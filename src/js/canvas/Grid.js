
import React from 'react';
import { Layouts } from '../actions'
import GridPlane from './GridPlane'
import ReactTransitionGroup from 'react-addons-transition-group'

const Grid = ({layout, sizeZ, sizeT, theZ, theT, sizeX, sizeY, planeManager}) => {

    console.log('Grid render', sizeZ, sizeT);

    return(
    <div style={{ position: 'absolute', top: 50, left: 0, right: 0, bottom: 0, overflow: 'hidden' }} >
        <ReactTransitionGroup
            component="div"
            style={{ left: '50%', top: '50%', position: 'absolute' }} >

            {layout != Layouts.GRID_LAYOUT ? <span/> : Array(sizeZ).fill(0).map((i, z) => {
                return Array(sizeT).fill(0).map(
                            (o, t) => (
                                <GridPlane
                                    planeManager={planeManager}
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
        </ReactTransitionGroup>
    </div>
    )
}

export default Grid
