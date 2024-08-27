import { useCookies } from "react-cookie";
import style from "./LoginModal.module.css";
import { useEffect, useState } from "react";

const LoginModal = ({ setIsOpen }: { setIsOpen: () => void }) => {
  const [_, setCookie] = useCookies(["user"]);
  const [externalPopup, setExternalPopup] = useState<{ proccess: boolean; extWindow: Window | null }>({ proccess: false, extWindow: null });
  const [reqToken, setReqToken] = useState<string>("");

  const connectClick = (request_token: string) => {
    const width = 500;
    const height = 400;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2.5;
    const url = `https://www.themoviedb.org/auth/access?request_token=${request_token}`;
    const popup = window.open(url, "", `toolbar=0,scrollbars=1,status=1,resizable=0,location=1,menuBar=0,width=${width},height=${height},top=${top},left=${left},popup`);

    if (popup) {
      setExternalPopup({ proccess: true, extWindow: popup });
      setReqToken(request_token);
    } else {
      console.error("Popup blocked or failed to open");
    }
  };

  useEffect(() => {
    if (externalPopup.extWindow) {
      setTimeout(() => {
        createAccessToken(reqToken);
        setExternalPopup({ proccess: false, extWindow: null });
        externalPopup.extWindow?.close();
      }, 10000);
    }
  }, [externalPopup.proccess]);

  const loginAction = async () => {
    try {
      const res = await fetch("https://api.themoviedb.org/4/auth/request_token", {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
        },
      });

      const data = await res.json();
      connectClick(data?.request_token);
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "An unknown error occurred");
    }
  };

  const createAccessToken = async (request_token: string) => {
    try {
      const res = await fetch("https://api.themoviedb.org/4/auth/access_token", {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({ request_token: request_token }),
      });

      const data = await res.json();
      setCookie("user", data);
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "An unknown error occurred");
    }
  };

  return (
    <>
      <div className={style.darkBG} onClick={() => setIsOpen()} />
      <div className={style.centered}>
        <div className={style.modal} onClick={() => loginAction()}>
          <img
            src="https://scontent.fcgk38-1.fna.fbcdn.net/v/t39.30808-6/300370141_445684364259165_8893097931255509122_n.png?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFXULJtZ2EGIPecQkHjdM5eX4ZA2ofKz4FfhkDah8rPgdopyO4hfB3DyPBGwXdTpvyiAUllKUPz10mvFCj1j729&_nc_ohc=v_iZjer9FEkQ7kNvgFLHNIB&_nc_zt=23&_nc_ht=scontent.fcgk38-1.fna&oh=00_AYBhSlEI7X3YYQzaIESJ4i5Am9kCQ7pqxj68LqQnv9JO-w&oe=66D3A04F"
            className={style.image}
            alt="Login Modal"
          />
          <p className={style.title}>Login with TMDB</p>
        </div>
      </div>
    </>
  );
};

export default LoginModal;
