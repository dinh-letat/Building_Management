import React from 'react'

const HeaderToogle = ({ toggleSidebar }) => {
    return (
        <header className="header">
            <button className="menu-btn" onClick={toggleSidebar}>
                &#9776; {/* Ký tự menu */}
            </button>
        </header>
    )
}

export default HeaderToogle
