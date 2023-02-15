import { useEffect, useState } from 'react';
import Prato from '../Prato';
import estilos from './Restaurante.module.scss';
import IPlate from 'interfaces/IPrato';
import IRestaurant from 'interfaces/IRestaurant';
import { APIRestaurantPlatesWeb } from 'controllers/v1-users/apiRestaurantPlatesWeb';

interface RestauranteProps {
  restaurante: IRestaurant
}

const Restaurante = ({ restaurante }: RestauranteProps) => {

  const [ pratos, setPratos ] = useState<IPlate[]>([]);

  //API
  const restaurantsAPI = new APIRestaurantPlatesWeb;

  // faz a requisição a API para obter os dados
  useEffect(() => {
    restaurantsAPI.getRestaurantPlates(restaurante.id, {}, (res) => setPratos(res));
  }, []);

  return (
    <section className={estilos.Restaurante}>
      <div className={estilos.Titulo}>
        <h2>{restaurante.nome}</h2>
      </div>
      <div>
        {pratos.map(item => <Prato prato={item} key={item.id} />)}
      </div>
    </section>)
  ;
};

export default Restaurante;