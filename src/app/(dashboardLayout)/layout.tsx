import { ApplicationShell1 } from "@/components/layout/application-shell1";

export default async function DashboardLayout({
    children,
    admin,
    customer,
    provider,
}: {
    children: React.ReactNode;
    admin: React.ReactNode;
    customer: React.ReactNode;
    provider: React.ReactNode;
}) {
    // TODO: Replace with real role check from Better Auth
    const role: string = "customer";

    return (
        <ApplicationShell1>
            {role === "admin" && admin}
            {role === "customer" && customer}
            {role === "provider" && provider} {/* Make sure the role matches your logic */}
            {children}
        </ApplicationShell1>
    );
}