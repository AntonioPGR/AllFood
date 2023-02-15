import { Button, Link, Menu, MenuItem } from '@mui/material';
import { ILink } from 'interfaces/ILink';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

interface IDropDownInfo{
  label: string,
  links: ILink[]
}

// get from https://mui.com/pt/material-ui/react-menu/
export function DropDownMenu({label, links}:IDropDownInfo) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{color:'white'}}
      >
        { label }
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {
          links.map((value, index) => {
            return ( 
              <Link key={index} component={RouterLink} to={value.url}>
                <MenuItem onClick={handleClose}>
                  { value.label }
                </MenuItem>
              </Link>
            );
          })
        }
      </Menu>
    </div>
  );
}