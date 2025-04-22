import { Avatar } from "~/components/Avatar";

export function Profile() { 
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-red-400">
        <Avatar>
            <img src="https://example.com/avatar.jpg" alt="Avatar" />
        </Avatar>
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="mt-4">This is the profile page.</p>
        </div>
    );
}