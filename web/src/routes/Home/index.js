import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import HomeMain from '../../components/HomeMain';
import Contact from '../../pages/Contact';
import Homepage from '../../pages/Home';
import About from '../../pages/About';

function Home() {
  return (
    <HomeMain>
      <Route
        render={({ location }) => (
          <TransitionGroup>
            <CSSTransition timeout={400} classNames="home-fade" key={location.key}>
              <Switch location={location}>
                <Route exact path="/" component={Homepage} />
                <Route exact path="/about" component={About} />
                <Route exact path="/contact" component={Contact} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
    </HomeMain>
  );
}

export default Home;
