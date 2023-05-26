import { auth, googleAuthProvider } from '@/lib/firebase';
import { useState } from 'react';
import Image from 'next/image';
import 'firebase/auth';

export default function SignInButton() {
	const user = null;
	const username = null;

	return (
		<main>
			{user ? (
				!username ? (
					<UsernameForm />
				) : (
					<SignOutButton />
				)
			) : (
				<SignInBtn />
			)}
		</main>
	);
}

function SignInBtn() {
	const [error, setError] = useState(null);

	const signInWithGoogle = async () => {
		try {
			await auth.signInWithPopup(googleAuthProvider);
		} catch (error: any) {
			setError(error.message);
		}
	};

	return (
		<>
			{error && <p>{error}</p>}
			<button className="btn-google" onClick={signInWithGoogle}>
				<Image alt="Sign in with google" fill src={'/google.png'} />{' '}
				Sign in with Google
			</button>
		</>
	);
}

function SignOutButton() {
	return <button onClick={() => auth.signOut()}>Sign Out</button>;
}

function UsernameForm() {
	return null;
}
