import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { app_url, base_path } from "../App";
import Loader from "./loader/Loader";

const Invite = () => {
  const [loader, setLoader] = useState(true);
  const [message, setMessage] = useState("");
  const { token } = useParams();
  useEffect(() => {
    result();
  }, []);

  const result = async () => {
    // setLoader(true);
    await axios
      .post(`${base_path}verify-invite`, { token: token })
      .then((resp) => {
        if (resp.data.result === "success") {
          setTimeout(() => {
            setMessage(resp.data.msg);
            setLoader(false);
          }, 2000);
        } else {
          setMessage("Some Error Occured. Please Try Again.");
        }
      })
      .catch((err) => {
        setLoader(false);
        setMessage(err.response.data.msg);
      });
  };

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <div className="main grid h-screen place-items-center bg-[#dddfff]">
            <div className="content">
              <h3 className="font-black text-lg mb-6">{message}</h3>
              <div className="text-center">
                <a
                  href={`${app_url}`}
                  className="p-3 bg-green-600 rounded-lg hover:bg-green-700 text-white"
                >
                  Go To Login
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Invite;
