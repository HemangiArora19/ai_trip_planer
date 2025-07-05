import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout } from "@react-oauth/google";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(false);
  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });
  useEffect(() => {
    if (user) {
      console.log(user);
    }
  }, []);
  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((resp) => {
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
        // Retry after login
      })
      .catch((error) => {
        console.error("Google user fetch error:", error);
        toast("Google Sign-In failed.");
      });
  };

  return (
    <div className="p-2 shadow-sm flex justify-between items-center px-5">
      <img src="/logo.svg" alt="App Logo" className="h-8" />
      {user ? (
        <div className="flex items-center gap-3">
          <a href="/create-trip">
          <Button variant="outline" className="rounded-full">
            + Create Trip
          </Button>
          </a>
          <a href="/my-trips">
          <Button variant="outline" className="rounded-full">
            My Trips
          </Button>
              </a>
          <Popover>
            <PopoverTrigger>
              <img
                src={user?.picture}
                className="h-[35px] w-[35px] rounded-full"
                alt="User Profile"
              />
            </PopoverTrigger>
            <PopoverContent>
              <h2
                className="cursor-pointer"
                onClick={() => {
                  googleLogout();
                  localStorage.clear();
                  window.location.reload();
                }}
              >
                Logout
              </h2>
            </PopoverContent>
          </Popover>
        </div>
      ) : (
        <Button className="cursor-pointer" onClick={() => setOpenDialog(true)}>

          Sign in
        </Button>
      )}

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="./logo.svg" alt="App Logo" />
              <h2 className="font-bold text-lg mt-7">Sign In with Google</h2>
              <p>Sign in app with Google Authentication securely</p>
              <Button
                disabled={loading}
                className="w-full mt-5 cursor-pointer gap-5 flex items-center"
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
