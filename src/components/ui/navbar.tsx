import { UserButton, currentUser } from "@clerk/nextjs";
import type { User } from "@clerk/nextjs/api";
import { LogIn } from "lucide-react";
import { ModeToggle } from "./theme-toggle";

const NavBar = async () => {
    const user: User | null = await currentUser();
    return (
        <div className="navbar bg-gray-200 dark:bg-base-300 sticky top-0 z-50">
            <div className="flex-1">
                <a className="btn btn-ghost normal-case text-xl">vicegale</a>
            </div>
            <div className="flex-none mr-4">
                <ModeToggle />
                {user ? <UserButton afterSignOutUrl="/" /> : <button className="btn btn-circle btn-outline"><LogIn /></button>}
            </div>
        </div>
    );
};

export default NavBar;
