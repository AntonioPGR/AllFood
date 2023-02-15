// EXTERNAL
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';

// INTERFACES
import { IPaginacao } from 'interfaces/IPaginacao';
import IRestaurant from 'interfaces/IRestaurant';

// STYLE
import style from './ListaRestaurantes.module.scss';

// CLASSES
import { APIRestaurantWeb } from 'controllers/v1-users/apiRestaurantWeb';

// COMPONENTS
import Restaurante from './Restaurante';

const ListaRestaurantes = () => {

  // RESTAURANTES -----
  // Armazena os restaurantes obtidos
  const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
  // armazena o numero da próxima pagina
  const [nextPageN, setNextPageN] = useState<number | undefined>();
  //armazena o numero da pagina anterios
  const [prevPageN, setPrevPageN] = useState<number | undefined>();

  // API -----
  // variavel de controle a API
  const restaurantsAPI = new APIRestaurantWeb();
  
  const onGetRestaurants = (res:IPaginacao<IRestaurant>) => {
    // Adiciona os restaurantes a variavel correspondente
    setRestaurants(res.results);
    // Próxima Pagina
    if(res.next){
      const nextParams = new URL(res.next);
      const pgNumber = Number(nextParams.searchParams.get('page'));
      setNextPageN(pgNumber);
    } else {
      setNextPageN(undefined);
    }
    // Pagina anterior
    if(res.previous){
      const previousParams = new URL(res.previous);
      const pgNumber = Number(previousParams.searchParams.get('page'));
      setPrevPageN(pgNumber);
    } else {
      setPrevPageN(undefined);
    }

    window.scrollTo({top:400, behavior:'smooth'});
  }; 
  
  // Obtem os restaurantes ao carregar a pagina
  useEffect(() => {
    // Chama a api para receber os restaurantes, e manipula as informações na função de callback
    restaurantsAPI.getRestaurants({}, onGetRestaurants);
  }, []);

  const changePage = (res:'prev' | 'next') => {
    const pgNumber = res === 'prev'? prevPageN : nextPageN;
    if(pgNumber !== 0){
      restaurantsAPI.getRestaurants({page:pgNumber}, onGetRestaurants);
    } else {
      restaurantsAPI.getRestaurants({}, onGetRestaurants);
    }
  };

  return (
    <section className={style.ListaRestaurantes}>
      <h1>Os restaurantes mais <em>bacanas</em>!</h1>
      {restaurants?.map(item => <Restaurante restaurante={item} key={item.id} />)}
      {
        prevPageN !== undefined && <Button sx={{mt:1, mr: 1}} variant="text" onClick={() => changePage('prev')}> Página anterior </Button>
      }
      {
        nextPageN !== undefined && <Button sx={{mt:1}} variant="text" onClick={() => changePage('next')}> Próxima página </Button>
      }
    </section>
  );

};

export default ListaRestaurantes;