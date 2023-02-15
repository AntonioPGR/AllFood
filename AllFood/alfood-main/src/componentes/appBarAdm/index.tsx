import { AppBar, Toolbar, Typography } from '@mui/material';
import { DropDownMenu } from 'componentes/dropDownMenu';

interface IAppBar{
  name: string
}
export function AppBarAdm({name}:IAppBar){
  return (
    <AppBar position='static' sx={{display:'flex', flexDirection:'row', alignItems: 'center', justifyContent: 'center'}}>
      <Typography variant='h6' sx={{ml:3}}>
        {name}
      </Typography>
      <Toolbar sx={{display:'flex', flexDirection:'row', flexGrow:1,}}>
        <DropDownMenu label='Restaurantes' links={[{label: 'Lista', url: '/administracao/restaurantes'}, {label: 'Novo', url:'/administracao/restaurantes/restaurante'}]} />
        <DropDownMenu label='Pratos' links={[{label: 'Lista', url: '/administracao/pratos'}, {label: 'Novo', url:'/administracao/pratos/prato'}]} />
      </Toolbar>  
    </AppBar>
  );
}