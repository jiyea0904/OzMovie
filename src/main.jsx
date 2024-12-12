import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from'react-redux'
import store from './redux_modules/store';
import { BrowserRouter } from'react-router-dom'
import { SupabaseProvider } from './hooks/useSupabaseAuth.jsx';
import { AuthProvider } from './hooks/useAuthContext.jsx';

createRoot(document.getElementById('root')).render(
  <Provider store = {store}>
    <BrowserRouter>
      <SupabaseProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </SupabaseProvider>
    </BrowserRouter>
  </Provider>
)
