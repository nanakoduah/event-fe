import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Events from './components/events/list';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/events/new" element={<div>new event here</div>} />
        <Route path="/events/:id/edit" element={<div>edit event here</div>} />
        <Route path="/events/:id/view" element={<div>View event here</div>} />
        <Route path="/me" element={<div>Me components here</div>} />
        <Route path="/" element={<Events />} />
      </Routes>
    </Router>
  );
}

export default App;
