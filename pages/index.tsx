import { ConnectWallet, ChainId, embeddedWallet, smartWallet, useAddress, useConnect } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import { NextPage } from "next";
import { ACCOUNT_FACTORY_ADDRESS } from "../constants/addresses";
import React, { useState } from 'react';

// Embedded Wallet Configuration
const embeddedWalletConfig = embeddedWallet({});


const smartWalletConfig = smartWallet(embeddedWalletConfig, {
  factoryAddress: ACCOUNT_FACTORY_ADDRESS,
  gasless: true, 
});

const Home: NextPage = () => {
  const address = useAddress();
  const connect = useConnect();

  const [emailInput, setEmailInput] = useState("");
  const [personalWalletAddress, setPersonalWalletAddress] = useState<string | undefined>("undefined");
  const [smartWalletAddress, setSmartWalletAddress] = useState<string | undefined>("undefined");

  const handleLogin = async () => {
    try {
      const personalWallet = await connect(embeddedWalletConfig, {
        chainId: 420,
        loginType: "ui_email_otp",
        email: emailInput,
      });
  
      const personalWalletAddress = await personalWallet.getAddress();
      setPersonalWalletAddress(personalWalletAddress);
  
      const smartWalletInstance = await connect(smartWalletConfig, {
        personalWallet: personalWallet,
        chainId: 420,
      });
  
      const smartWalletAddressVal = await smartWalletInstance.getAddress();
      setSmartWalletAddress(smartWalletAddressVal);
      setEmailInput("");
  
    } catch (error) {
      console.error(error);
    }
  };  

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {address ? (

        <>
            <ConnectWallet/> 
        </>
        ) : (
          <div className={styles.centeredContainer}>
            <div className={styles.centeredCard}>
              <h1>Login</h1>
              <p>Enter your email to login.</p>
              <input
                type="email"
                placeholder="Enter your email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
              />
              <button onClick={handleLogin}> Login </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;
