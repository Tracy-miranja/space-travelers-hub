import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../redux/store';
import Mission from '../components/mission';

it('renders Mission name and decription ', () => {
  const tree = renderer
    .create(
      <React.StrictMode>
        <Provider store={store}>
          <Router>
            <Mission />
          </Router>
        </Provider>
      </React.StrictMode>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
