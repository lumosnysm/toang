import ReactOnRails from 'react-on-rails';

import HelloWorld from '../../../client/components/HelloWorld';
import MapContainer from '../../../client/components/MapContainer';
// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  HelloWorld, MapContainer
});
