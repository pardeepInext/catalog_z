import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
const Header = () => {
    const [menus] = useState([
        {
            name: 'Photos',
            link: '/',
            navClass: 'nav-link-1',
        },
        {
            name: 'Videos',
            link: '/videos',
            navClass: 'nav-link-2',
        },
        {
            name: 'About',
            link: '/about',
            navClass: 'nav-link-3',
        },
        {
            name: 'Contact',
            link: '/contact',
            navClass: 'nav-link-4',
        },
    ]);

    const Navigation = () => menus.map((menu, key) => {
        return (
            <li className="nav-item" key={key}><NavLink to={menu.link} className={`nav-link ${menu.navClass}`} activeClassName="active" exact>{menu.name}</NavLink></li>
        );
    })


    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <Link className="navbar-brand" to={'/'}>
                    <i className="fas fa-film mr-2"></i>
                 Catalog-Z
               </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <i className="fas fa-bars"></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto mb-2 mb-lg-0" style={{ marginLeft: 'auto' }}>
                        <Navigation />
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;