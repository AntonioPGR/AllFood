import { Box, Paper } from '@mui/material';
import { AppBarAdm } from 'componentes/appBarAdm';
import { Outlet } from 'react-router-dom';

export function BaseAdmPage(){

  return (
    <>
      <AppBarAdm name='Administração' />

      {/* Listagem de restaurantes */}
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingX: '30px'
      }}>
        <Paper elevation={2} sx={{
          width: 'lg',
          minWidth: '80%',
          height: '100%'
        }}>
          <Outlet />
        </Paper>
      </Box>
    </>
  );

}