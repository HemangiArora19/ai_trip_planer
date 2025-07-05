// import React, { useEffect, useState } from "react";
// import { Button } from "../ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
// } from "@/components/ui/dialog";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { googleLogout } from "@react-oauth/google";
// import { useGoogleLogin } from "@react-oauth/google";
// import axios from "axios";
// import { FcGoogle } from "react-icons/fc";
// function Header() {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const [openDialog, setOpenDialog] = useState(false);
//     const [loading, setLoading] = useState(false);
//   const login = useGoogleLogin({
//     onSuccess: (codeResp) => GetUserProfile(codeResp),
//     onError: (error) => console.log(error),
//   });
//   useEffect(() => {
//     if (user) {
//       console.log(user);
//     }
//   }, []);
//   const GetUserProfile = (tokenInfo) => {
//     axios
//       .get(
//         `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
//         {
//           headers: {
//             Authorization: `Bearer ${tokenInfo?.access_token}`,
//             Accept: "application/json",
//           },
//         }
//       )
//       .then((resp) => {
//         localStorage.setItem("user", JSON.stringify(resp.data));
//         setOpenDialog(false);
//         // Retry after login
//       })
//       .catch((error) => {
//         console.error("Google user fetch error:", error);
//         toast("Google Sign-In failed.");
//       });
//   };

//   return (
//     <div className="p-2 shadow-sm flex justify-between items-center px-5">
//       <img src="/logo.svg" alt="App Logo" className="h-8" />
//       {user ? (
//         <div className="flex items-center gap-3">
//           <a href="/create-trip">
//           <Button variant="outline" className="rounded-full">
//             + Create Trip
//           </Button>
//           </a>
//           <a href="/my-trips">
//           <Button variant="outline" className="rounded-full">
//             My Trips
//           </Button>
//               </a>
//           <Popover>
//             <PopoverTrigger>
//               <img
//                 src={user?.picture}
//                 className="h-[35px] w-[35px] rounded-full"
//                 alt="User Profile"
//               />
//             </PopoverTrigger>
//             <PopoverContent>
//               <h2
//                 className="cursor-pointer"
//                 onClick={() => {
//                   googleLogout();
//                   localStorage.clear();
//                   window.location.reload();
//                 }}
//               >
//                 Logout
//               </h2>
//             </PopoverContent>
//           </Popover>
//         </div>
//       ) : (
//         <Button className="cursor-pointer" onClick={() => setOpenDialog(true)}>

//           Sign in
//         </Button>
//       )}

//       <Dialog open={openDialog}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogDescription>
//               <img src="./logo.svg" alt="App Logo" />
//               <h2 className="font-bold text-lg mt-7">Sign In with Google</h2>
//               <p>Sign in app with Google Authentication securely</p>
//               <Button
//                 disabled={loading}
//                 className="w-full mt-5 cursor-pointer gap-5 flex items-center"
//                 onClick={login}
//               >
//                 <FcGoogle className="h-7 w-7" />
//                 Sign In with Google
//               </Button>
//             </DialogDescription>
//           </DialogHeader>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }

// export default Header;



import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { Menu, X } from "lucide-react";

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: "application/json",
        },
      })
      .then((resp) => {
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Google user fetch error:", error);
      });
  };

  return (
    <div className="p-4 shadow-md flex justify-between items-center px-5 sticky top-0 bg-white z-50">
      {/* Logo */}
      <img src="/logo.svg" alt="Logo" className="h-8" />

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-4">
        {user ? (
          <>
            <a href="/create-trip">
              <Button variant="outline" className="rounded-full">+ Create Trip</Button>
            </a>
            <a href="/my-trips">
              <Button variant="outline" className="rounded-full">My Trips</Button>
            </a>
            <Popover>
              <PopoverTrigger>
                <img src={user?.picture} className="h-9 w-9 rounded-full cursor-pointer" />
              </PopoverTrigger>
              <PopoverContent>
                <h2 className="cursor-pointer" onClick={() => {
                  googleLogout();
                  localStorage.clear();
                  window.location.reload();
                }}>Logout</h2>
              </PopoverContent>
            </Popover>
          </>
        ) : (
          <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
        )}
      </div>

      {/* Hamburger Icon for Mobile */}
      <div className="md:hidden">
        <Menu onClick={() => setMenuOpen(true)} className="w-6 h-6 cursor-pointer" />
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-white z-50 shadow-lg transform transition-transform duration-300 ease-in-out ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex justify-between items-center p-4 border-b">
          <img src="/logo.svg" className="h-6" />
          <X className="cursor-pointer" onClick={() => setMenuOpen(false)} />
        </div>
        <div className="flex flex-col gap-4 p-4">
          {user ? (
            <>
              <a href="/create-trip">
                <Button variant="outline" className="w-full">+ Create Trip</Button>
              </a>
              <a href="/my-trips">
                <Button variant="outline" className="w-full">My Trips</Button>
              </a>
              <Button
                className="w-full bg-red-500 hover:bg-red-600"
                onClick={() => {
                  googleLogout();
                  localStorage.clear();
                  window.location.reload();
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <Button className="w-full" onClick={() => {
              setOpenDialog(true);
              setMenuOpen(false);
            }}>
              Sign In
            </Button>
          )}
        </div>
      </div>

      {/* Google Sign In Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" alt="App Logo" />
              <h2 className="font-bold text-lg mt-7">Sign In with Google</h2>
              <p>Sign in securely with Google Authentication</p>
              <Button
                disabled={loading}
                className="w-full mt-5 gap-5 flex items-center"
                onClick={login}
              >
                <FcGoogle className="h-7 w-7" />
                Sign In with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;


