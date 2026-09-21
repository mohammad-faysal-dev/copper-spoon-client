import { ApplicationShell1 } from "@/components/application-shell1";


export default function Home({ user, admin }: {
    user: React.ReactNode;
    admin: React.ReactNode;
}) {
    return (
        <div>
            <ApplicationShell1></ApplicationShell1>
        </div>
    )
}