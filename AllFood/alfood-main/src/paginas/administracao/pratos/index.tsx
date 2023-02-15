import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button} from '@mui/material';
import { APIPlatesAdm } from 'controllers/v2-adm/apiPlatesAdm';
import IPlate from 'interfaces/IPrato';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SyncAltIcon from '@mui/icons-material/SyncAlt';

export default function AdministracaoPratos(){

  // API
  const PlatesAPI = new APIPlatesAdm();

  const [plates, setPlates] = useState<IPlate[]>([]);

  const getPlates = () => {
    PlatesAPI.getPlates((res) => setPlates(res));
  };

  useEffect(() => {
    getPlates();
  }, []);

  const onDeletePlate = (id:number) => {
    PlatesAPI.deletePlate(id, () => getPlates());
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead >
          <TableRow>
            <TableCell> Nome </TableCell>
            <TableCell> Tag </TableCell>
            <TableCell> Imagem </TableCell>
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
                    { item.tag }
                  </TableCell>
                  <TableCell>
                    { 
                      item.imagem? <a href={item.imagem} target='_Blank' rel='noreferrer'> Ver Imagem </a> : 'Imagem não definida'
                    }
                  </TableCell>
                  <TableCell>
                    <Link to={`./prato/${item.id}`}>
                      <SyncAltIcon />
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Button type='button' onClick={() => onDeletePlate(item.id)}>
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