import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import { APIRestaurantAdm } from 'controllers/v2-adm/apiRestaurantAdm';
import IRestaurant from 'interfaces/IRestaurant';

export default function AdministracaoRestaurantes(){
  // API
  const RestaurantsAPI = new APIRestaurantAdm();

  const [plates, setPlates] = useState<IRestaurant[]>([]);

  const getRestaurants = () => {
    RestaurantsAPI.getRestaurants((res) => setPlates(res));
  };

  useEffect(() => {
    getRestaurants();
  }, []);

  const onDeleteRestaurant = (id:number) => {
    RestaurantsAPI.deleteRestaurant(id, () => getRestaurants());
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell> Nome </TableCell>
            <TableCell> Editar </TableCell>
            <TableCell> Excluir </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            plates.map((item, index) => {
              return (
                <TableRow key={index} >
                  <TableCell>
                    { item.nome }
                  </TableCell>
                  <TableCell>
                    <Link to={`./restaurante/${item.id}`}>
                      <SyncAltIcon />
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Button type='button' onClick={() => onDeleteRestaurant(item.id)}>
                      <DeleteForeverIcon />
                    </Button>
                  </TableCell>  
                </TableRow>
              );
            })
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}