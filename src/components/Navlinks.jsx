import Link from 'next/link'
import React from 'react'

const Navlinks = () => {
    return (
        <>
            <li>
                <Link href={'/tasks'}> Tasks </Link>
            </li>
            {/* <li>
                <details>
                    <summary>Main</summary>
                    <ul className="p-2">
                        <li><a>Submenu 1</a></li>
                        <li><a>Submenu 2</a></li>
                    </ul>
                </details>
            </li> */}


        </>
    )
}

export default Navlinks
