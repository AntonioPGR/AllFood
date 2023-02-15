import { BaseAdmPage } from 'componentes/baseAdmPage';
import AdministracaoPratos from 'paginas/administracao/pratos';
import { PlatesConfig } from 'paginas/administracao/pratos/pratosConfig';
import AdministracaoRestaurantes from 'paginas/administracao/restaurantes';
import { RestauranteConfig } from 'paginas/administracao/restaurantes/restauranteConfig';
import { Routes, Route } from 'react-router-dom';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';

function App() {

  return (
    <Routes>

      {/* Pagina inicial */}
      <Route path="/" element={<Home />} />

      {/* Lista de restaurantes e seus pratos */}
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />

      {/* Parte administrativa */}
      <Route path="/administracao" element={<BaseAdmPage />}>

        {/* restaurantes */}
        <Route path='restaurantes'>

          {/* Listagem de restaurantes */}
          <Route index element={<AdministracaoRestaurantes />} />

          {/* Controle de restaurantes */}
          <Route path='restaurante'>
            <Route index element={<RestauranteConfig />} />
            <Route path=':id' element={<RestauranteConfig />} />
          </Route>
        </Route>

        {/* pratos */}
        <Route path='pratos'>
          {/* Listagem de pratos */}
          <Route index element={<AdministracaoPratos />} />

          {/* Controle de pratos */}
          <Route path='prato'>
            <Route index element={<PlatesConfig />} />
            <Route path=':id' element={<PlatesConfig />} />
          </Route>
        </Route>
      </Route >

      <Route path='*' element={<p> Página não encontrada </p>} />
    </Routes>
  );
}

export default App;
