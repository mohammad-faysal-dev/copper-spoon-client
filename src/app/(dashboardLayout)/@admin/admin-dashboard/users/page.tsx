import { Mail, MapPin, Phone, ShieldCheck, Users, Ban, CheckCircle2 } from "lucide-react";
import { adminService } from "@/services/admin.service";

export default async function AdminUsersPage() {
    const { data, error } = await adminService.getAllUsers();
    const users = data ?? [];

    return (
        <main className="min-h-screen bg-background pb-14">
            {/* Header */}
            <div className="relative overflow-hidden mx-4 mt-4 mb-8 rounded-3xl bg-[#0f0f13] shadow-lg">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,_#6d28d9_0%,_transparent_60%)]" />
                <div className="relative px-6 py-10 sm:px-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div className="flex items-center gap-5">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 shadow-xl border border-purple-400/20">
                            <Users className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-white mb-1">User Directory</h1>
                            <p className="text-white/50 text-sm font-medium">Manage all customer and provider accounts</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-6xl">
                {error && (
                    <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-4 text-sm text-red-500 font-medium">
                        {error.message}
                    </div>
                )}

                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-foreground tracking-tight px-1">Registered Users</h2>
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground bg-muted px-3 py-1.5 rounded-lg border border-border/50 shadow-sm">
                        Total {users.length}
                    </span>
                </div>

                {users.length === 0 ? (
                    <div className="flex min-h-[300px] flex-col items-center justify-center rounded-3xl border border-dashed border-border/50 text-center">
                        <Users className="h-12 w-12 text-muted-foreground/30 mb-4" />
                        <p className="text-muted-foreground font-medium">No users found in the system.</p>
                    </div>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
                        {users.map((user) => (
                            <div key={user.id} className="relative group flex flex-col sm:flex-row gap-5 rounded-[24px] border border-border/60 bg-card p-5 transition-all hover:bg-muted/20 hover:border-purple-500/30 hover:shadow-lg overflow-hidden">

                                {/* Avatar */}
                                <div className="shrink-0 flex items-center justify-center">
                                    <div className="relative flex h-[88px] w-[88px] items-center justify-center overflow-hidden rounded-[20px] bg-gradient-to-br from-muted to-muted shadow-inner border border-border/50">
                                        {user.image ? (
                                            <img src={user.image} alt={user.name} className="size-full object-cover" />
                                        ) : (
                                            <span className="text-2xl font-black text-muted-foreground/50 uppercase">
                                                {user.name?.charAt(0) || "U"}
                                            </span>
                                        )}
                                        {user.role === "ADMIN" && (
                                            <div className="absolute inset-x-0 bottom-0 py-0.5 bg-purple-600/90 text-[9px] font-bold text-white text-center uppercase tracking-widest backdrop-blur-sm">
                                                Admin
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0 flex flex-col">
                                    <div className="flex items-start justify-between gap-2 mb-2">
                                        <div className="truncate">
                                            <h2 className="text-lg font-bold text-foreground truncate">{user.name}</h2>
                                            <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground truncate">
                                                <Mail className="h-3.5 w-3.5 shrink-0" />
                                                <span className="truncate">{user.email}</span>
                                            </div>
                                        </div>

                                        <div className="shrink-0 flex flex-col items-end gap-1.5">
                                            <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${user.role === "ADMIN" ? "bg-purple-500/10 text-purple-600 border-purple-500/20" :
                                                    user.role === "PROVIDER" ? "bg-amber-500/10 text-amber-600 border-amber-500/20" :
                                                        "bg-blue-500/10 text-blue-600 border-blue-500/20"
                                                }`}>
                                                {user.role}
                                            </span>
                                            <span className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${user.status === "ACTIVE" ? "text-emerald-600 bg-emerald-500/10" : "text-red-600 bg-red-500/10"
                                                }`}>
                                                {user.status === "ACTIVE" ? <CheckCircle2 className="h-3 w-3" /> : <Ban className="h-3 w-3" />}
                                                {user.status}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Additional Contact details */}
                                    <div className="mt-auto pt-3 border-t border-border/40 grid grid-cols-2 gap-2 text-xs text-muted-foreground/80 font-medium">
                                        {user.phone ? (
                                            <div className="flex items-center gap-1.5">
                                                <Phone className="h-3.5 w-3.5 shrink-0 text-foreground/40" />
                                                <span className="truncate">{user.phone}</span>
                                            </div>
                                        ) : <div />}
                                        {user.address ? (
                                            <div className="flex items-center gap-1.5">
                                                <MapPin className="h-3.5 w-3.5 shrink-0 text-foreground/40" />
                                                <span className="truncate">{user.address}</span>
                                            </div>
                                        ) : <div />}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}