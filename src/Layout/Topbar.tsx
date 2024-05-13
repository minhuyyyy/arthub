import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import MoreIcon from '@mui/icons-material/MoreVert';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar, Grid, Typography } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import CustomButton from '../components/Link';
import useAuth from '../hooks/useAuth';
import { Roles } from '../types/user';
import Sidebar from './Sidebar';
import { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { Wallet } from '@mui/icons-material';
import useDebounce from '../hooks/useDebounce';
const drawerWidth = 240;
interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: '20px',
    backgroundColor: '#e1e1e1',
    // marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '30%',
    [theme.breakpoints.up('lg')]: {
        marginLeft: theme.spacing(3),
        width: '30%',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export default function Topbar({ children }: { children: JSX.Element }) {
    const API_URL = import.meta.env.VITE_API_URL;
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
        useState<null | HTMLElement>(null);
    const [profile, setProfile] = useState({});
    const { logout, isAuthenticated, userInfo } = useAuth();
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const navigate = useNavigate();
    const [balance, setBalance] = useState(0);
    const DebounceInput = () => {
        const [searchStr, setSearchStr] = useState<string>('');
        useDebounce(
            () => {
                if (searchStr) {
                    navigate(`/search/${searchStr}`);
                }
            },
            [searchStr],
            1000
        );
        const handleSearch = (
            e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => {
            setSearchStr(e.target.value);
        };
        return (
            <>
                <StyledInputBase
                    onChange={(e) => handleSearch(e)}
                    placeholder="Search for artworks"
                />
            </>
        );
    };
    useEffect(() => {
        const getAvatar = async () => {
            await axios.get(`${API_URL}/profile/${userInfo.id}`).then((res) => {
                if (res.status === 200) {
                    setProfile(res.data);
                }
            });
        };

        const getBalance = async () => {
            await axios.get(`${API_URL}/balance/${userInfo.id}`).then((res) => {
                if (res.status === 200) {
                    setBalance(res.data.balance);
                }
            });
        };
        if (userInfo.id) {
            getAvatar();
            getBalance();
        }
    }, [userInfo]);
    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem
                onClick={() => {
                    navigate(`/profile/${userInfo.id}`);
                    handleMenuClose();
                }}
            >
                Profile
            </MenuItem>
            <MenuItem
                onClick={() => {
                    navigate('/profile/change-password');
                    handleMenuClose();
                }}
            >
                Change Password
            </MenuItem>
            <MenuItem
                onClick={() => {
                    logout();
                    handleMenuClose();
                }}
            >
                Logout
            </MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton size="large" color="inherit">
                    <Wallet />
                </IconButton>
                <p>Wallet</p>
            </MenuItem>
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <NotificationsIcon />
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                open={open}
                position="fixed"
                sx={{ backgroundColor: 'white', color: 'black' }}
            >
                <Toolbar>
                    {isAuthenticated ? (
                        // &&
                        // (userInfo.role === Roles.admin ||
                        //     userInfo.role === Roles.user)
                        <>
                            {/* <Grid
                                container
                                spacing={1}>
                                <Grid
                                    item
                                    display={'inline'}
                                    xs={8}
                                    md={8}
                                    lg={8}> */}
                            {userInfo.role === Roles.admin ? (
                                <IconButton
                                    onClick={() => setOpen(!open)}
                                    size="large"
                                    edge="start"
                                    color="inherit"
                                    aria-label="open drawer"
                                    sx={{
                                        mr: 2,
                                        ...(open && {
                                            display: 'none',
                                        }),
                                    }}
                                >
                                    <MenuIcon />
                                </IconButton>
                            ) : (
                                <>
                                    {/* <Box alignContent={'start'}> */}
                                    <Link to={'/'}>
                                        <Typography
                                            display={'inline'}
                                            noWrap
                                            variant="h5"
                                            mr={2}
                                        >
                                            Arthub
                                        </Typography>
                                    </Link>

                                    <CustomButton
                                        main={true}
                                        destination="/upload-artwork"
                                    >
                                        Upload artwork
                                    </CustomButton>
                                    {/* </Box> */}
                                </>
                            )}
                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <DebounceInput />
                            </Search>
                            <Box sx={{ flexGrow: 1 }} />
                            <Box
                                sx={{
                                    display: {
                                        xs: 'none',
                                        md: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    },
                                }}
                            >
                                {userInfo.role !== Roles.admin && (
                                    <>
                                        <div>
                                            {/* <Typography
                                        variant="body2"
                                        display="inline"
                                        textAlign={'center'}
                                    > */}
                                            Balance:
                                            <strong>{`${balance.toLocaleString(
                                                'vi-VN',
                                                {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                }
                                            )}`}</strong>
                                            {/* </Typography> */}
                                        </div>
                                        <IconButton
                                            onClick={() => navigate('/balance')}
                                            size="large"
                                            aria-label="show 4 new mails"
                                            color="inherit"
                                        >
                                            <Wallet />
                                        </IconButton>
                                    </>
                                )}
                                <IconButton
                                    size="large"
                                    aria-label="show 17 new notifications"
                                    color="inherit"
                                >
                                    <NotificationsIcon />
                                </IconButton>
                                <Box>
                                    <Typography
                                        variant="body2"
                                        display="inline"
                                    >
                                        {`Hi `}
                                        <strong>
                                            {/* {user.fullName} */}
                                            {profile.fullName}
                                        </strong>
                                    </Typography>
                                    <IconButton
                                        size="large"
                                        edge="end"
                                        aria-label="account of current user"
                                        aria-controls={menuId}
                                        aria-haspopup="true"
                                        onClick={handleProfileMenuOpen}
                                        color="inherit"
                                    >
                                        <Avatar
                                            // src={user.avatar}
                                            alt={`${userInfo.firstName} ${userInfo.lastName}`}
                                            src={profile.avatar}
                                        />
                                    </IconButton>
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    display: { xs: 'flex', md: 'none' },
                                }}
                            >
                                <IconButton
                                    size="large"
                                    aria-label="show more"
                                    aria-controls={mobileMenuId}
                                    aria-haspopup="true"
                                    onClick={handleMobileMenuOpen}
                                    color="inherit"
                                >
                                    <MoreIcon />
                                </IconButton>
                            </Box>
                        </>
                    ) : (
                        <>
                            <Grid container>
                                <Grid
                                    item
                                    sm={4}
                                    md={3}
                                    lg={8}
                                    textAlign="start"
                                >
                                    <Box>
                                        <Typography noWrap variant="h5">
                                            Arthub
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item sm={8} md={9} lg={4} textAlign="end">
                                    <Box>
                                        <CustomButton
                                            main
                                            destination="/session/signin"
                                        >
                                            Log in
                                        </CustomButton>
                                        <CustomButton
                                            main={true}
                                            destination="/session/signup"
                                        >
                                            Sign up
                                        </CustomButton>
                                    </Box>
                                </Grid>
                            </Grid>
                        </>
                    )}
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
            <Sidebar open={open} setOpen={setOpen} children={children} />
        </Box>
    );
}
