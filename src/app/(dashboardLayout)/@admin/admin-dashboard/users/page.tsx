import { Mail, MapPin, Phone, ShieldCheck } from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { adminService } from "@/services/admin.service";

export default async function AdminUsersPage() {
    const { data, error } = await adminService.getAllUsers();

    const users = data ?? [];
    console.log(data)

    return (
        <main className="container mx-auto max-w-6xl px-4 py-8">
            {/* Header */}
            <div className="mb-8 flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10">
                    <ShieldCheck className="size-6 text-primary" />
                </div>

                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Users</h1>
                    <p className="text-muted-foreground">
                        Manage customers and providers.
                    </p>
                </div>
            </div>

            {/* Error */}
            {error && (
                <div className="mb-6 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                    {error.message}
                </div>
            )}

            {/* Users Card */}
            <Card>
                <CardHeader>
                    <CardTitle>All Users</CardTitle>

                    <p className="text-sm text-muted-foreground">
                        {users.length} user{users.length !== 1 ? "s" : ""} found
                    </p>
                </CardHeader>

                <CardContent>
                    {users.length === 0 ? (
                        <div className="flex min-h-[250px] items-center justify-center">
                            <p className="text-muted-foreground">No users found.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {users.map((user) => (
                                <div
                                    key={user.id}
                                    className="rounded-xl border p-4 transition-colors hover:bg-muted/30"
                                >
                                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                                        {/* User Info */}
                                        <div className="flex min-w-0 items-start gap-4">
                                            {/* Avatar */}
                                            <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted">
                                                {user.image ? (
                                                    <img
                                                        src={user.image}
                                                        alt={user.name}
                                                        className="size-full object-cover"
                                                    />
                                                ) : (
                                                    <span className="text-lg font-semibold">
                                                        {user.name?.charAt(0).toUpperCase() || "U"}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Details */}
                                            <div className="min-w-0">
                                                <h2 className="font-semibold">{user.name}</h2>

                                                <div className="mt-2 space-y-1.5">
                                                    {/* Email */}
                                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                        <Mail className="size-4 shrink-0" />
                                                        <span className="truncate">{user.email}</span>
                                                    </div>

                                                    {/* Phone */}
                                                    {user.phone && (
                                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                            <Phone className="size-4 shrink-0" />
                                                            <span>{user.phone}</span>
                                                        </div>
                                                    )}

                                                    {/* Address */}
                                                    {user.address && (
                                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                            <MapPin className="size-4 shrink-0" />
                                                            <span>{user.address}</span>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Role & Status */}
                                                <div className="mt-3 flex flex-wrap gap-2">
                                                    <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
                                                        {user.role}
                                                    </span>

                                                    <span
                                                        className={`rounded-full px-3 py-1 text-xs font-medium ${user.status === "ACTIVE"
                                                            ? "bg-green-500/10 text-green-600"
                                                            : "bg-red-500/10 text-red-600"
                                                            }`}
                                                    >
                                                        {user.status}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Admin Badge */}
                                        {user.role === "ADMIN" && (
                                            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                                <ShieldCheck className="size-4" />
                                                <span>Admin</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </main>
    );
}