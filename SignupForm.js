import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { auth } from '../../firebase';
import { setUser } from '../../features/auth/authSlice';
import {
  Box, Input, Button, VStack, Heading, useToast
} from '@chakra-ui/react';

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const toast = useToast();

  const handleSignup = async () => {
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      dispatch(setUser(userCred.user));
    } catch (err) {
      toast({ title: 'Signup failed', description: err.message, status: 'error' });
    }
  };

  return (
    <Box p={4} maxW="md" mx="auto">
      <Heading mb={4}>Sign Up</Heading>
      <VStack spacing={3}>
        <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button onClick={handleSignup} colorScheme="green">Sign Up</Button>
      </VStack>
    </Box>
  );
};

export default SignupForm;
