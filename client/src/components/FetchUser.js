import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";

export default function FetchUser(props) {
  console.log(props);
  const [loaded, setLoaded] = useState(false);
  const { authenticated, setUser } = useContext(AuthContext);

  useEffect(async () => {
    if (!authenticated) {
      await checkLocalToken();
    }
    setLoaded(true);
  }, []);

  async function checkLocalToken() {
    if (localStorage.getItem("access-token")) {
      try {
        const res = await axios.get("/api/auth/validate_token");
        setUser(res.data.data);
      } catch (e) {
        console.log(e);
      }
    }
  }

  return loaded ? props.children : null;
}
