import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import DnsIcon from '@mui/icons-material/Dns';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import BookIcon from '@mui/icons-material/Book';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import BarChartIcon from '@mui/icons-material/BarChart';
import LoginIcon from '@mui/icons-material/Login';
import LoginPage from '../Authorization/LoginPage';
import { IProps } from '../../interfaces';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
	width: drawerWidth,
	background: '#172B4C',
	color: 'white',
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: 'hidden',
	width: `calc(${theme.spacing(7)} + 1px)`,
	background: '#172B4C',
	color: 'white',
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	whiteSpace: 'nowrap',
	boxSizing: 'border-box',
	cursor: 'pointer',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: 'nowrap',
	boxSizing: 'border-box',

	...(open && {
		...openedMixin(theme),
		'& .MuiDrawer-paper': openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		'& .MuiDrawer-paper': closedMixin(theme),
	}),
}));

export default function Navbar({ userData }: IProps) {
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);
	const [showSignIn, setShowSignIn] = React.useState(false);

	const handleDrawerOpen = () => {
		setOpen(false);
	};

	const handleDrawerClose = () => {
		setOpen(true);
	};

	const renderSwitch = (param: any) => {
		switch (param) {
			case 'Main':
				return <DnsIcon style={{ color: 'white' }} />;
			case 'Textbook':
				return <MenuBookIcon style={{ color: 'white' }} />;
			case 'Dictionary':
				return <BookIcon style={{ color: 'white' }} />;
			case 'Games':
				return <SportsEsportsIcon style={{ color: 'white' }} />;
			case 'Statistics':
				return <BarChartIcon style={{ color: 'white' }} />;
			default:
				return <DnsIcon style={{ color: 'white' }} />;
		}
	};

	return (
		<>
			<LoginPage show={showSignIn} handleClose={setShowSignIn} />
			<Box sx={{ display: 'flex', overflow: 'hidden' }}>
				<CssBaseline />
				<Drawer variant='permanent' open={open}>
					<div
						className='navContainer'
						style={{
							height: '90vh',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
							overflow: 'hidden',
						}}
					>
						<div className='navBox'>
							<DrawerHeader
								onClick={open ? handleDrawerOpen : handleDrawerClose}
							>
								<IconButton color='inherit' aria-label='open drawer'>
									{open ? <CloseIcon /> : <MenuIcon />}
								</IconButton>
								{theme.direction === 'rtl' ? (
									<CloseIcon />
								) : (
									<h3 style={{ opacity: open ? 1 : 0 }}>RS Lang</h3>
								)}
							</DrawerHeader>
							<Divider />
							<List>
								{['Main', 'Textbook', 'Games', 'Statistics', 'Dictionary'].map(
									(text, index) => (
										<Link to={text.toLowerCase()}>
											<ListItem
												key={text}
												disablePadding
												sx={{ display: 'block' }}
											>
												<ListItemButton
													sx={{
														minHeight: 48,
														justifyContent: open ? 'initial' : 'center',
														px: 2.5,
													}}
												>
													<ListItemIcon
														sx={{
															minWidth: 0,
															mr: open ? 3 : 'auto',
															justifyContent: 'center',
														}}
													>
														{renderSwitch(text)}
													</ListItemIcon>
													<ListItemText
														primary={text}
														sx={{
															opacity: open ? 1 : 0,
															textDecoration: 'none',
															color: 'white',
														}}
													/>
												</ListItemButton>
											</ListItem>
										</Link>
									)
								)}
							</List>
							<Divider />
						</div>
						<div className='navLog'>
							<List>
								<ListItem key='login' disablePadding sx={{ display: 'block' }}>
									<ListItemButton
										sx={{
											minHeight: 48,
											justifyContent: open ? 'initial' : 'center',
											px: 2.5,
										}}
										onClick={() => setShowSignIn(true)}
									>
										<ListItemIcon
											sx={{
												minWidth: 0,
												mr: open ? 3 : 'auto',
												justifyContent: 'center',
											}}
										>
											<LoginIcon style={{ color: 'white' }} />
										</ListItemIcon>
										<ListItemText
											primary='Sign in'
											sx={{
												opacity: open ? 1 : 0,
												textDecoration: 'none',
												color: 'white',
											}}
										/>
									</ListItemButton>
								</ListItem>
							</List>
						</div>
					</div>
				</Drawer>
			</Box>
		</>
	);
}
