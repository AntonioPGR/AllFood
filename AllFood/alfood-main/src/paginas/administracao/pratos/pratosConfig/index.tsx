// EXTERNAL
import { Box, Alert, AlertTitle, TextField, Button, FormControl, Select, SelectChangeEvent, MenuItem, InputLabel, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// INTERFACES
import { IAlert } from 'interfaces/IAlert';

// CLASS
import { APIPlatesAdm } from 'controllers/v2-adm/apiPlatesAdm';
import IRestaurant from 'interfaces/IRestaurant';
import { APIRestaurantAdm } from 'controllers/v2-adm/apiRestaurantAdm';
import { APITagsAdm } from 'controllers/v2-adm/apiTagsAdm';
import { ITag } from 'interfaces/ITag';
import axios from 'axios';

export function PlatesConfig(){

  // Navegação
  const navigate = useNavigate();
  const navUrl = '/administracao/pratos'; 
  // id 
  const params = useParams();
  const id = params.id; 
  // tipo do formulário
  const formType = id !== undefined? 'EDITAR' : 'CRIAR';
  // info message
  const [infoMessage, setInfoMessage] = useState<IAlert | undefined>(undefined);
  // APIs
  const platesAPI = new APIPlatesAdm();
  const restaurantsAPI = new APIRestaurantAdm();
  const tagsApi = new APITagsAdm();

  // PRATO
  const [name, setName] = useState('');
  const [tag, setTag] = useState<string>();
  const [tagList, setTagList] = useState<ITag[]>([]);
  const [description, setDescription] = useState<string>('');
  const [restaurant, setRestaurant] = useState<number>();
  const [restaurantList, setRestaurantList] = useState<IRestaurant[]>([]);
  const [image, setImage] = useState<File | null>(null);

  // controla o submit do formulário
  const handleSubmit = (ev:React.FormEvent<HTMLFormElement>) => {

    ev.preventDefault();

    if(!name || !description || !restaurant || !tag){
      setInfoMessage({
        title: 'Preencha todos os campos corretamente!',
        text: 'Os campos "Nome", "Descrição" e "Restaurante" são obrigatórios, preencha todos corretamente!',
        type: 'error'
      });
      return;
    }

    const formData = new FormData();

    formData.append('nome', name);
    formData.append('descricao', description);
    formData.append('restaurante', String(restaurant));
    formData.append('tag', tag);

    if(image){
      formData.append('imagem', image);
    }

    axios.request({
      url: 'http://localhost:8000/api/v2/pratos/',
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: formData
    })
      .then(() => navigate(navUrl))
      .catch((e) => { throw new Error(e); });

  };

  // HANDLES
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputChange = (ev:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string | number>,  changeFunction:React.Dispatch<React.SetStateAction<any>>) => {
    changeFunction(ev.target.value);
  };

  const handleImageInput = (ev:React.ChangeEvent<HTMLInputElement>) => {
    if(ev.target.files?.length){
      setImage(ev.target.files[0]);
    } else {
      setImage(null);
    }
  };
  
  // EXTRA FUNCTIONS THAT SHOULD BE IN A CLASS
  const captalize = (s:string) => {
    const lowedString = s.toLowerCase();
    const slicedString = lowedString.slice(1);
    const firstLetter = lowedString[0].toUpperCase();
    
    return firstLetter + slicedString;
  };

  // DADOS ANTERIORES
  // pega as informações previas do restaurante
  const getPrevData = () => {
    platesAPI.getPlate(Number(id), (res) => {
      const {descricao, nome, restaurante, tag} = res;

      setDescription(descricao);
      setName(nome);
      setRestaurant(restaurante);
      setTag(tag);
    });
  };
  
  // AO INICIAR
  // pega os restaurantes e tags disponiveis para os restaurantes
  useEffect(() => {
    // Pega as tags dos pratos
    tagsApi.getTags((res) => setTagList(res.tags));

    // Pega os pratos disponiveis
    restaurantsAPI.getRestaurants((res) => setRestaurantList(res));
  }, []);

  // PREV DATA
  // caso o id seja alterado, busca os dados salvos
  useEffect(() => {
    if(id){
      getPrevData();
    }
  }, []);

  // RENDERING
  return(
    <Box component='main' sx={{p:2}} style={{
      padding: '30px'
    }} >
      <Typography component='h1' variant='h6' sx={{ mb: 1.3 }}>
        {captalize(formType)} prato
      </Typography>
      {
        infoMessage !== undefined? (
          <Alert sx={{ mb: 1.3 }} severity={infoMessage.type} >
            <AlertTitle> { infoMessage.title } </AlertTitle>
            { infoMessage.text }
          </Alert>
        ) : ''
      }
      <Box component='form' onSubmit={(ev:React.FormEvent<HTMLFormElement>) => handleSubmit(ev)} >
        {/* id */}
        {
          id && (
            <TextField sx={{ mb: 1.3 }}  fullWidth label='ID' disabled value={id} />
          )
        }
        {/* name */}
        <TextField sx={{ mb: 1.3 }} required fullWidth autoComplete='off' label="Nome do prato" value={name} onChange={(ev) => handleInputChange(ev, setName)} />
        {/* description */}
        <TextField sx={{ mb: 1.3 }} required  fullWidth autoComplete='off' label="Descrição" value={description} onChange={(ev) => handleInputChange(ev, setDescription)} />
        {/* tags */}
        <FormControl sx={{ mb: 1.3 }}  fullWidth>
          <InputLabel id="demo-simple-select-label">Tipo de prato</InputLabel>
          <Select
            required
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={tag? tag : ''}
            onChange={(ev) => handleInputChange(ev, setTag)}
            label="Tipo de prato"
          >
            {
              tagList.map((value, index) => {
                return (
                  <MenuItem value={value.value} key={index}>
                    {value.value}
                  </MenuItem>
                );
              })
            }
          </Select>
        </FormControl>
        {/* Restaurants */}
        <FormControl sx={{ mb: 1.3 }} required  fullWidth>
          <InputLabel id="demo-simple-select-label">Restaurante</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={restaurant? restaurant : ''}
            label="Restaurante"
            onChange={(ev) => handleInputChange(ev, setRestaurant)}
          >
            {
              restaurantList.map((value, index) => {
                return (
                  <MenuItem value={value.id} key={index}>
                    {value.nome}
                  </MenuItem>
                );
              })
            }
          </Select>
        </FormControl>
        {/*Imagem */}
        <Box  sx={{ mb: 1.3 }} >
          <input type="file" onChange={ev => handleImageInput(ev)} />
        </Box>
        <Button fullWidth type='submit' variant="contained" color="success">
          {formType}
        </Button>
      </Box>
    </Box>
  );
}