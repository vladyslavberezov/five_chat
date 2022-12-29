import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import * as React from "react";
import {
    Typography,
    Box,
    Container,
    Button,
    CssBaseline,
    Avatar,
    TextField,
} from 'src/components/atoms/'
import {useRouter} from "next/router";
import {ChangeEvent, FormEvent, useState} from "react";
import {AuthDAO, UsersDAO} from "../../../api/DAO";
import Copyright from 'src/Copyright'

export default function SignUpTemplate() {
    let router = useRouter();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        lastName: '',
        nickname: '',
        firstName: '',
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {value, name} = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    };

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await UsersDAO.signUp({
            email: formData.email,
            password: formData.password,
            lastName: formData.lastName,
            firstName: formData.firstName,
            nickname: formData.nickname,
        });
        if (!res) return

        const login = await AuthDAO.login({
            userCreds: formData.email,
            password: formData.password,
        });

        if (login?.data?.accessToken) {
            await router.push('/')
        } else {
            console.log('wrong username or password')
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                <Box component="form" onSubmit={onSubmit} noValidate sx={{mt: 1}}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="firstName"
                        label="First Name"
                        onChange={handleInputChange}
                        value={formData.firstName}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="lastName"
                        label="Last Name"
                        onChange={handleInputChange}
                        value={formData.lastName}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="nickname"
                        label="Nick Name"
                        onChange={handleInputChange}
                        value={formData.nickname}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={handleInputChange}
                        value={formData.email}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        onChange={handleInputChange}
                        value={formData.password}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Sign Up
                    </Button>
                </Box>
            </Box>
            <Copyright/>
        </Container>
    )
}