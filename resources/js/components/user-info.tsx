import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import { type User } from '@/types';

export function UserInfo({ user, showEmail = false }: { user?: User; showEmail?: boolean }) {
    const getInitials = useInitials();

    if (!user) {
        return <div className="text-sm text-muted-foreground">User not found</div>;
    }

    return (
        <>
            <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                <AvatarImage src={user.avatar ?? ''} alt={user.first_name ?? 'User'} />
                <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                    {getInitials(user.first_name ?? 'U')}
                </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.first_name ?? 'Unknown User'}</span>
                {showEmail && <span className="text-muted-foreground truncate text-xs">{user.email ?? 'No Email'}</span>}
            </div>
        </>
    );
}
