import { ConnectWallet, ChainId, embeddedWallet, smartWallet, useAddress, useConnect, useEmbeddedWallet } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import { NextPage } from "next";
import { ACCOUNT_FACTORY_ADDRESS } from "../constants/addresses";
import React, { useState } from 'react';


const embeddedWalletConfig = embeddedWallet({});
const smartWalletConfig = smartWallet(embeddedWalletConfig, {
  factoryAddress: ACCOUNT_FACTORY_ADDRESS,
  gasless: true, 
});

const Home: NextPage = () => {
  const address = useAddress();
  const { connect, sendVerificationEmail } = useEmbeddedWallet();

  const [emailInput, setEmailInput] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  const preLogin = async (email: string) => {
    await sendVerificationEmail({ email });
  };

  const handleLogin = async (email: string, verificationCode: string) => {
    await connect({
      strategy: "email_verification",
      email,
      verificationCode,
    });
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {address ? (
          // If address is present, show the ConnectWallet button
          <ConnectWallet className={styles.web3Button}/> 
        ) : (
          // Otherwise, show the login form
          <div className={styles.centeredContainer}>
            <div className={styles.centeredCard}>
            <h1 className={styles.title}>Login</h1>
              <p>Enter your email to receive a verification code.</p>
              
              {/* Email input field */}
              <input
    className={styles.inputField}
    type="email"
    placeholder="Enter your email"
    value={emailInput}
    onChange={(e) => setEmailInput(e.target.value)}
/>
              
              {/* Send Verification Email button */}
              <button className={styles.button} onClick={() => preLogin(emailInput)}>
                Send Verification Email 
              </button>
              
              <p>Enter the verification code you received.</p>
              
              {/* Verification code input field */}
              <input
    className={styles.inputField}
    type="text"
    placeholder="Enter verification code"
    value={verificationCode}
    onChange={(e) => setVerificationCode(e.target.value)}
/>
              
              {/* Login button */}
              <button className={styles.button} onClick={() => handleLogin(emailInput, verificationCode)}>
                Login 
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;