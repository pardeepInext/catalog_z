import React, { useEffect, useState } from 'react'
import {
    Switch, Route, useLocation,
} from 'react-router-dom';
import {
    TransitionGroup,
    CSSTransition
} from "react-transition-group";

/* views  */
import Videos from '../views/Videos';
import Contact from '../views/Contact';
import Photos from '../views/Photos';
import About from '../views/About';
import Photo from '../views/Photo';
/* component imports */
import Header from '../components/Header';
import Footer from '../components/Footer';
const App = () => {
    let location = useLocation();
    let currentKey = location.pathname.split("/")[1] || "/";
    useEffect(() => {
        document.title = "Catalog-Z";
        window.scrollTo(0, 0);
    }, [location])

    return (
        <>
            <div id="infinter-scroll">
                <Header />
                <TransitionGroup>
                    <CSSTransition
                        key={currentKey}
                        classNames="fade"
                        timeout={300}
                    >
                        <Switch location={location}>
                            <Route exact path="/" component={Photos} />
                            <Route exact path="/photo/:id" component={Photo} />
                            <Route exact path="/about" component={About} />
                            <Route exact path="/contact" component={Contact} />
                            <Route />
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
            </div>
            <Footer />
        </>
    )
}

export default App
