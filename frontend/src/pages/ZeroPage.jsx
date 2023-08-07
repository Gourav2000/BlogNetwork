import React from 'react'
import { Link } from "react-router-dom";

const ZeroPage = () => {
    return (
        <div className="zeroPage">
            <Link className="link" to={`/home`}>
                <button>Home</button>
            </Link>
            <Link className="link" to={`/microstructure`}>
                <button>Microstructure</button>
              </Link>
        </div>

    )
}

export default ZeroPage