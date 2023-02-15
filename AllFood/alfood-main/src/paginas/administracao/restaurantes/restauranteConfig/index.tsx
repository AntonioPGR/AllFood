// EXTERNAL
import { Box, Alert, AlertTitle, TextField, Button, Typography } from '@mui/material';
import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// INTERFACES
import { IAlert } from 'interfaces/IAlert';
import { APIRestaurantAdm } from 'controllers/v2-adm/apiRestaurantAdm';
import { IRestaurantsCreate } from 'interfaces/IRestaurant';


// CLASS
export function RestauranteConfig(){  

  // Navegação
  const navigate = useNavigate();
  // nome do restaurante
  const [name, setName] = useState<string>('');
  // id do restaurante
  const params = useParams();
  const id = params.id; 
  // tipo do formulário
  const formType = id !== undefined? 'EDITAR' : 'CRIAR';
  // info message
  const [infoMessage, setInfoMessage] = useState<IAlert | undefined>(undefined);
  // API
  const restaurantsApi = new APIRestaurantAdm();

  // GET BEFORE DATA FUNCTIONS
  const handleNameChange = (ev:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setName(ev.target.value);
  };

  // pega as informações previas do restaurante
  const getPrevName = () => {
    restaurantsApi.getRestaurant(Number(id), (res) => setName(res.nome));
  };

  // SUBMIT FORM FUNCTIONS
  const editarRestaurante = () => {
    
    const data :IRestaurantsCreate = {
      nome: name
    };

    restaurantsApi.updateRestaurant(Number(id), data, () => navigate('/administracao/restaurantes/'));

  };

  const novoRestaurante = () => {
    if(!name){
      setInfoMessage({
        text: 'O campo nome não pode estar vazio na criação de um restaurante',
        title: 'Campo nome inválido',
        type: 'error'
      });
      return;
    }

    const data : IRestaurantsCreate = {
      nome: name
    };

    restaurantsApi.createRestaurant(data, () => navigate('/administracao/restaurantes/'));

  };

  const handleSubmit = (ev:FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if(formType==='CRIAR'){
      novoRestaurante();
    } else if(formType==='EDITAR'){
      editarRestaurante();
    }

  };

  // EXTRA FUNCTIONS THAT SHOULD BE IN A CLASS
  const captalize = (s:string):string => {

    const lowedString = s.toLowerCase();
    const slicedString = lowedString.slice(1);
    const firstLetter = lowedString[0].toUpperCase();

    return firstLetter + slicedString;

  };

  useEffect(() => {
    if(id){
      getPrevName();
    }
  }, [id]);

  return(
    <Box component='main' sx={{padding: '30px'}}>
      <Typography component='h1' variant='h6' sx={{ mb: 1.3 }}>
        {captalize(formType)}  Restaurante
      </Typography>
      <Box component='form' onSubmit={(ev:FormEvent<HTMLFormElement>) => handleSubmit(ev)} >
        {
          infoMessage !== undefined? (
            <Alert sx={{ mb: 1.3 }} severity={infoMessage.type} >
              <AlertTitle> { infoMessage.title } </AlertTitle>
              { infoMessage.text }
            </Alert>
          ) : ''
        }
        {
          id && (
            <TextField sx={{ mb: 1.3 }} fullWidth label='ID' disabled value={id} />
          )
        }
        <TextField required sx={{ mb: 1.3 }} fullWidth autoComplete='off' label="Nome do restaurante" value={name} onChange={(ev) => handleNameChange(ev)} />
        <Button fullWidth type='submit' variant="contained" color="success">
          {formType}
        </Button>
      </Box>
    </Box>
  );

}