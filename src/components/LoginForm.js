"use client";

import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { loginSuccess } from '@/redux/slices/authSlice';
import { useDispatch } from "react-redux";

const LoginForm = () => {

    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');


    const router = useRouter();

    const loginSchema = z.object({
        email: z.string().email('Invalid email address!'),
        password: z.string().min(1, 'Password is required!'),
    });


    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form fields using Zod
        const result = loginSchema.safeParse({ email, password });

        if (!result.success) {
            setError(result.error.errors[0].message);
            return;
        }

        try {
            const response = await fetch('https://devapi.propsoft.ai/api/interview/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok && data.status_code === "1") {

                document.cookie = `authToken=${data.access_token}; path=/;`;
                
                dispatch(loginSuccess({
                    email: data.user_data.email,
                    // token: data.access_token,
                    userData: data.user_data,
                }));

                router.push('/');
                
            } else {
                setError(data.status_message || 'Failed to log in');
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mt-10 space-y-5">
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        type="email"
                        placeholder="Email"
                        id="email"
                        name="email"
                        className="h-12 mt-1"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                        type="password"
                        placeholder="Password"
                        id="password"
                        name="password"
                        className="h-12 mt-1"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="pt-6">
                    <Button type="submit" size={"lg"}>Sign in</Button>
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        </form>
    );
};

export default LoginForm;
