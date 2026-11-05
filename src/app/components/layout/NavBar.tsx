

// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import {
//   Stethoscope,
//   Menu,
//   X,
//   ArrowRight,
//   LogOut,
//   LayoutDashboard,
//   Home,
//   Loader2,
// } from "lucide-react";

// import { authClient } from "@/lib/auth-client";

// import {
//   Avatar,
//   AvatarFallback,
//   AvatarImage,
// } from "@/components/ui/avatar";

// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";

// import { Button } from "@/components/ui/button";

// const navLinks = [
//   { label: "Home", href: "/", icon: Home },
//   { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
// ];

// export default function Navbar() {
//   const router = useRouter();
//   const pathname = usePathname();

//   const { data: session, isPending } = authClient.useSession();
//   const user = session?.user;

//   const [mounted, setMounted] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const [isSigningOut, setIsSigningOut] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   const closeMobileMenu = () => {
//     setIsMobileMenuOpen(false);
//   };

//   const isActive = (href: string) => {
//     if (href === "/") {
//       return pathname === "/";
//     }

//     return pathname.startsWith(href);
//   };

//   const handleSignOut = async () => {
//     if (isSigningOut) return;

//     setIsSigningOut(true);

//     try {
//       await authClient.signOut();

//       setIsProfileOpen(false);
//       setIsMobileMenuOpen(false);

//       router.replace("/");
//       router.refresh();
//     } catch (error) {
//       console.error("Sign out failed:", error);
//     } finally {
//       setIsSigningOut(false);
//     }
//   };

//   const isAuthLoading = !mounted || isPending;

//   const AuthLoading = () => (
//     <div className="h-10 w-10 animate-pulse rounded-full bg-slate-100" />
//   );

//   return (
//     <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md">
//       <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
//         {/* Logo */}
//         <Link
//           href="/"
//           onClick={closeMobileMenu}
//           className="flex items-center gap-3"
//         >
//           <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-600/20">
//             <Stethoscope size={22} />
//           </div>

//           <div>
//             <h1 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
//               Doctor<span className="text-blue-600">Tracker</span>
//             </h1>

//             <p className="hidden text-[11px] font-medium tracking-wide text-slate-500 sm:block">
//               Healthcare Management
//             </p>
//           </div>
//         </Link>

//         {/* Desktop Navigation */}
//         <div className="hidden items-center gap-8 md:flex">
//           {navLinks.map((link) => {
//             const Icon = link.icon;

//             return (
//               <Link
//                 key={link.href}
//                 href={link.href}
//                 className={`relative flex items-center gap-2 py-2 text-sm font-semibold transition-colors ${
//                   isActive(link.href)
//                     ? "text-blue-600"
//                     : "text-slate-600 hover:text-blue-600"
//                 }`}
//               >
//                 <Icon size={16} />
//                 {link.label}

//                 {isActive(link.href) && (
//                   <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-blue-600" />
//                 )}
//               </Link>
//             );
//           })}
//         </div>

//         {/* Desktop Authentication */}
//         <div className="hidden items-center gap-3 md:flex">
//           {isAuthLoading ? (
//             <AuthLoading />
//           ) : user ? (
//             <Popover open={isProfileOpen} onOpenChange={setIsProfileOpen}>
//               <PopoverTrigger
//                 render={
//                   <button
//                     type="button"
//                     aria-label="Open profile menu"
//                     className="flex items-center gap-3 rounded-full border border-slate-200 bg-white p-1.5 pr-3 transition hover:border-blue-200 hover:bg-blue-50"
//                   />
//                 }
//               >
//                 <Avatar className="h-9 w-9">
//                   <AvatarImage
//                     src={user.image || ""}
//                     alt={user.name || "User"}
//                     referrerPolicy="no-referrer"
//                   />

//                   <AvatarFallback className="bg-blue-100 font-semibold text-blue-700">
//                     {user.name?.charAt(0)?.toUpperCase() || "U"}
//                   </AvatarFallback>
//                 </Avatar>

//                 <div className="max-w-32 text-left">
//                   <p className="truncate text-sm font-semibold text-slate-800">
//                     {user.name || "My Account"}
//                   </p>

//                   <p className="text-xs text-slate-500">My Profile</p>
//                 </div>
//               </PopoverTrigger>

//               <PopoverContent
//                 align="end"
//                 className="w-72 rounded-2xl border border-slate-200 p-2 shadow-xl"
//               >
//                 {/* Profile Information */}
//                 <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
//                   <Avatar className="h-11 w-11">
//                     <AvatarImage
//                       src={user.image || ""}
//                       alt={user.name || "User"}
//                       referrerPolicy="no-referrer"
//                     />

//                     <AvatarFallback className="bg-blue-100 font-semibold text-blue-700">
//                       {user.name?.charAt(0)?.toUpperCase() || "U"}
//                     </AvatarFallback>
//                   </Avatar>

//                   <div className="min-w-0 flex-1">
//                     <p className="truncate text-sm font-semibold text-slate-900">
//                       {user.name || "User"}
//                     </p>

//                     <p className="truncate text-xs text-slate-500">
//                       {user.email}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Profile Menu Actions */}
//                 <div className="mt-2 space-y-1">
//                   <Link
//                     href="/dashboard"
//                     onClick={() => setIsProfileOpen(false)}
//                     className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
//                   >
//                     <LayoutDashboard size={17} />
//                     Dashboard
//                   </Link>

//                   <Button
//                     type="button"
//                     variant="ghost"
//                     onClick={handleSignOut}
//                     disabled={isSigningOut}
//                     className="flex w-full justify-start gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 hover:text-red-700"
//                   >
//                     {isSigningOut ? (
//                       <Loader2 size={17} className="animate-spin" />
//                     ) : (
//                       <LogOut size={17} />
//                     )}

//                     {isSigningOut ? "Signing out..." : "Sign out"}
//                   </Button>
//                 </div>
//               </PopoverContent>
//             </Popover>
//           ) : (
//             <>
//               <Link
//                 href="/sign-in"
//                 className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-blue-600"
//               >
//                 Login
//               </Link>

//               <Link
//                 href="/sign-up"
//                 className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700"
//               >
//                 Sign Up
//                 <ArrowRight size={16} />
//               </Link>
//             </>
//           )}
//         </div>

//         {/* Mobile Menu Button */}
//         <button
//           type="button"
//           aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
//           aria-expanded={isMobileMenuOpen}
//           onClick={() => setIsMobileMenuOpen((prev) => !prev)}
//           className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-100 md:hidden"
//         >
//           {isMobileMenuOpen ? <X size={21} /> : <Menu size={21} />}
//         </button>
//       </nav>

//       {/* Mobile Navigation */}
//       {isMobileMenuOpen && (
//         <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
//           <div className="mx-auto flex max-w-7xl flex-col gap-2">
//             {/* Mobile Navigation Links */}
//             {navLinks.map((link) => {
//               const Icon = link.icon;

//               return (
//                 <Link
//                   key={link.href}
//                   href={link.href}
//                   onClick={closeMobileMenu}
//                   className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
//                     isActive(link.href)
//                       ? "bg-blue-50 text-blue-600"
//                       : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
//                   }`}
//                 >
//                   <Icon size={18} />
//                   {link.label}
//                 </Link>
//               );
//             })}

//             <div className="my-2 border-t border-slate-100" />

//             {/* Mobile Authentication */}
//             {isAuthLoading ? (
//               <div className="h-10 animate-pulse rounded-xl bg-slate-100" />
//             ) : user ? (
//               <>
//                 {/* Mobile User Profile */}
//                 <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
//                   <Avatar className="h-11 w-11">
//                     <AvatarImage
//                       src={user.image || ""}
//                       alt={user.name || "User"}
//                       referrerPolicy="no-referrer"
//                     />

//                     <AvatarFallback className="bg-blue-100 font-semibold text-blue-700">
//                       {user.name?.charAt(0)?.toUpperCase() || "U"}
//                     </AvatarFallback>
//                   </Avatar>

//                   <div className="min-w-0 flex-1">
//                     <p className="truncate text-sm font-semibold text-slate-900">
//                       {user.name || "User"}
//                     </p>

//                     <p className="truncate text-xs text-slate-500">
//                       {user.email}
//                     </p>
//                   </div>
//                 </div>

//                 <Link
//                   href="/dashboard"
//                   onClick={closeMobileMenu}
//                   className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
//                 >
//                   <LayoutDashboard size={18} />
//                   Dashboard
//                 </Link>

//                 <Button
//                   type="button"
//                   variant="destructive"
//                   onClick={handleSignOut}
//                   disabled={isSigningOut}
//                   className="mt-2 w-full justify-center gap-2 rounded-xl"
//                 >
//                   {isSigningOut ? (
//                     <Loader2 size={17} className="animate-spin" />
//                   ) : (
//                     <LogOut size={17} />
//                   )}

//                   {isSigningOut ? "Signing out..." : "Sign out"}
//                 </Button>
//               </>
//             ) : (
//               <>
//                 <Link
//                   href="/sign-in"
//                   onClick={closeMobileMenu}
//                   className="flex items-center justify-center rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
//                 >
//                   Login
//                 </Link>

//                 <Link
//                   href="/sign-up"
//                   onClick={closeMobileMenu}
//                   className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
//                 >
//                   Sign Up
//                   <ArrowRight size={16} />
//                 </Link>
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Stethoscope,
  Menu,
  X,
  ArrowRight,
  LogOut,
  LayoutDashboard,
  Home,
  Loader2,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", href: "/", icon: Home },
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };

  const handleSignOut = async () => {
    if (isSigningOut) return;

    setIsSigningOut(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        throw new Error(error.message || "Sign out failed.");
      }

      setIsProfileOpen(false);
      setIsMobileMenuOpen(false);

      router.replace("/");
      router.refresh();
    } catch (error) {
      console.error("Sign out failed:", error);
    } finally {
      setIsSigningOut(false);
    }
  };

  const isAuthLoading = !mounted || isPending;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          onClick={closeMobileMenu}
          className="flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-600/20">
            <Stethoscope size={22} />
          </div>

          <div>
            <h1 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
              Doctor<span className="text-blue-600">Tracker</span>
            </h1>

            <p className="hidden text-[11px] font-medium tracking-wide text-slate-500 sm:block">
              Healthcare Management
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const Icon = link.icon;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative flex items-center gap-2 py-2 text-sm font-semibold transition-colors ${
                  isActive(link.href)
                    ? "text-blue-600"
                    : "text-slate-600 hover:text-blue-600"
                }`}
              >
                <Icon size={16} />
                {link.label}

                {isActive(link.href) && (
                  <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-blue-600" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Desktop Authentication */}
        <div className="hidden items-center gap-3 md:flex">
          {isAuthLoading ? (
            <div className="h-10 w-10 animate-pulse rounded-full bg-slate-100" />
          ) : user ? (
            <Popover
              open={isProfileOpen}
              onOpenChange={setIsProfileOpen}
            >
              <PopoverTrigger
                render={
                  <button
                    type="button"
                    aria-label="Open profile menu"
                    className="flex items-center gap-3 rounded-full border border-slate-200 bg-white p-1.5 pr-3 transition hover:border-blue-200 hover:bg-blue-50"
                  />
                }
              >
                <Avatar className="h-9 w-9">
                  <AvatarImage
                    src={user.image || ""}
                    alt={user.name || "User"}
                    referrerPolicy="no-referrer"
                  />

                  <AvatarFallback className="bg-blue-100 font-semibold text-blue-700">
                    {user.name?.charAt(0)?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>

                <div className="max-w-32 text-left">
                  <p className="truncate text-sm font-semibold text-slate-800">
                    {user.name || "My Account"}
                  </p>

                  <p className="text-xs text-slate-500">My Profile</p>
                </div>
              </PopoverTrigger>

              <PopoverContent
                align="end"
                className="w-72 rounded-2xl border border-slate-200 p-2 shadow-xl"
              >
                {/* Profile Information */}
                <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                  <Avatar className="h-11 w-11">
                    <AvatarImage
                      src={user.image || ""}
                      alt={user.name || "User"}
                      referrerPolicy="no-referrer"
                    />

                    <AvatarFallback className="bg-blue-100 font-semibold text-blue-700">
                      {user.name?.charAt(0)?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-900">
                      {user.name || "User"}
                    </p>

                    <p className="truncate text-xs text-slate-500">
                      {user.email}
                    </p>
                  </div>
                </div>

                {/* Profile Menu Actions */}
                <div className="mt-2 space-y-1">
                  <Link
                    href="/dashboard"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
                  >
                    <LayoutDashboard size={17} />
                    Dashboard
                  </Link>

                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleSignOut}
                    disabled={isSigningOut}
                    className="flex w-full justify-start gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 hover:text-red-700"
                  >
                    {isSigningOut ? (
                      <Loader2 size={17} className="animate-spin" />
                    ) : (
                      <LogOut size={17} />
                    )}

                    {isSigningOut ? "Signing out..." : "Sign out"}
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-blue-600"
              >
                Login
              </Link>

              <Link
                href="/sign-up"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700"
              >
                Sign Up
                <ArrowRight size={16} />
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-100 md:hidden"
        >
          {isMobileMenuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            {/* Mobile Navigation Links */}
            {navLinks.map((link) => {
              const Icon = link.icon;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    isActive(link.href)
                      ? "bg-blue-50 text-blue-600"
                      : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                  }`}
                >
                  <Icon size={18} />
                  {link.label}
                </Link>
              );
            })}

            <div className="my-2 border-t border-slate-100" />

            {/* Mobile Authentication */}
            {isAuthLoading ? (
              <div className="h-10 animate-pulse rounded-xl bg-slate-100" />
            ) : user ? (
              <>
                {/* Mobile User Profile */}
                <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                  <Avatar className="h-11 w-11">
                    <AvatarImage
                      src={user.image || ""}
                      alt={user.name || "User"}
                      referrerPolicy="no-referrer"
                    />

                    <AvatarFallback className="bg-blue-100 font-semibold text-blue-700">
                      {user.name?.charAt(0)?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-900">
                      {user.name || "User"}
                    </p>

                    <p className="truncate text-xs text-slate-500">
                      {user.email}
                    </p>
                  </div>
                </div>

                <Link
                  href="/dashboard"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
                >
                  <LayoutDashboard size={18} />
                  Dashboard
                </Link>

                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleSignOut}
                  disabled={isSigningOut}
                  className="mt-2 w-full justify-center gap-2 rounded-xl"
                >
                  {isSigningOut ? (
                    <Loader2 size={17} className="animate-spin" />
                  ) : (
                    <LogOut size={17} />
                  )}

                  {isSigningOut ? "Signing out..." : "Sign out"}
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-center rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Login
                </Link>

                <Link
                  href="/sign-up"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Sign Up
                  <ArrowRight size={16} />
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
