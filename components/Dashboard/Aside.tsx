import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
	AddHome as AddHomeIcon,
	FormatListNumberedRtl as FormatListNumberedRtlIcon,
	SpeakerNotes as SpeakerNotesIcon,
	AttachMoney as AttachMoneyIcon,
	IntegrationInstructionsSharp,
	Logout,
} from '@mui/icons-material';
import { auth } from '@/lib/firebase';
import { User } from 'firebase/auth';

interface NavigationItem {
	href: string;
	label: string;
	icon: JSX.Element;
}

interface UserProps {
	user: User | null;
}

const navigationItems: NavigationItem[] = [
	{
		href: '/',
		label: 'Dashboard',
		icon: <AddHomeIcon />,
	},
	{
		href: 'todos',
		label: 'Todos',
		icon: <FormatListNumberedRtlIcon />,
	},
	{
		href: 'diary',
		label: 'Diary',
		icon: <SpeakerNotesIcon />,
	},
	{
		href: 'expenses',
		label: 'Expenses',
		icon: <AttachMoneyIcon />,
	},
	{
		href: 'expenses',
		label: 'Expenses',
		icon: <AttachMoneyIcon />,
	},
	{
		href: 'docs',
		label: 'Docs',
		icon: <IntegrationInstructionsSharp />,
	},
];

const Navigation = () => {
	return (
		<ul className="space-y-2 tracking-wide mt-8">
			{navigationItems.map((item) => (
				<li key={item.href}>
					<Link href={item.href}>
						<a className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
							{item.icon}
							<span className="group-hover:text-gray-700">
								{item.label}
							</span>
						</a>
					</Link>
				</li>
			))}
		</ul>
	);
};

const skeletonProfile = (
	<div className="mt-8 text-center">
		<div className="w-10 h-10 m-auto rounded-full bg-gray-300 animate-pulse"></div>
		<div className="w-20 h-5 mt-4 bg-gray-300 animate-pulse"></div>
		<div className="w-12 h-4 mt-2 bg-gray-300 animate-pulse"></div>
	</div>
);

const skeletonNavigationItems = (
	<ul className="space-y-2 tracking-wide mt-8">
		{[1, 2, 3, 4, 5].map((index) => (
			<li key={index}>
				<div className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group bg-gray-200 animate-pulse">
					<div className="w-6 h-6 bg-gray-300"></div>
					<div className="w-16 h-4 bg-gray-300"></div>
				</div>
			</li>
		))}
	</ul>
);

const UserProfile = ({ user }: UserProps) => {
	return (
		<div className="mt-8 text-center">
			<Image
				width={100}
				height={100}
				src={
					user?.photoURL ||
					'https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp'
				}
				alt={user?.displayName || 'Unknown User'}
				className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
			/>
			<h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
				{user?.displayName || 'Unknown User'}
			</h5>
			<span className="hidden text-gray-400 lg:block">Admin</span>
		</div>
	);
};

export default function Aside({ user }: UserProps): JSX.Element {
	const router = useRouter();

	const handleLogout = () => {
		auth.signOut();
		router.push('/login'); // Replace '/login' with the desired page path
	};

	return (
		<aside className="ml-[-100%] z-10 pb-3 px-6 w-full flex flex-col justify-between h-full border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%]">
			<div>
				<div className="-mx-6 px-6 py-4">
					<a
						className="flex justify-between w-full align-middle"
						href="#"
						title="home"
					></a>
				</div>
				{user ? (
					<>
						<div className="mt-8 text-center">
							<Image
								width={100}
								height={100}
								src={
									user.photoURL ||
									'https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp'
								}
								alt={user.displayName || 'Unknown User'}
								className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
							/>
							<h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
								{user.displayName || 'Unknown User'}
							</h5>
							<span className="hidden text-gray-400 lg:block">
								Admin
							</span>
						</div>
						<ul className="space-y-2 tracking-wide mt-8">
							{navigationItems.map((item) => (
								<li key={item.href}>
									<a
										href={item.href}
										className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"
									>
										{item.icon}
										<span className="group-hover:text-gray-700">
											{item.label}
										</span>
									</a>
								</li>
							))}
						</ul>
					</>
				) : (
					<>
						{skeletonProfile}
						{skeletonNavigationItems}
					</>
				)}
			</div>
			<div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
				<button
					className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"
					onClick={handleLogout}
				>
					<Logout />
					<span className="group-hover:text-gray-700">Logout</span>
				</button>
			</div>
		</aside>
	);
}
