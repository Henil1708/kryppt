import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractAbi, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
    
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress,contractAbi,signer)

    return transactionContract; 
}

export const TransactionProvider = ({ children }) => {
    const [formData, setFormData] = useState({
        addressTo: "",
        amount: "",
        keyword: "",
        message: ""
    });
    const [loading, setLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));
    const [currentAccount, setCurrentAccount] = useState("");
    const [transactions, setTransactions] = useState([]);

    const getAllTransactions = async () => {
        try {
            if (!ethereum) return alert("Please install metamask");
            const transactionContract = getEthereumContract();
            const avaiableTransactions = await transactionContract.getAllTransactions();

            const structuredTransactions = avaiableTransactions.map((item) => ({
                addressTo: item.receiver,
                addressFrom: item.sender,
                timestamp: new Date(item.timestamp.toNumber() * 1000).toLocaleString(),
                message: item.message,
                keyword: item.keyword,
                amount: parseInt(item.amount._hex)/(10**18)
            }));
            setTransactions(structuredTransactions);
            console.log(structuredTransactions)
        } catch (error) {
            
        }
    }

    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) return alert("Please install metamask");

            const accounts = await ethereum.request({
                method: 'eth_accounts'
            });
            if (accounts.length) {
                setCurrentAccount(accounts[0]);

                getAllTransactions();
            } else {
                console.log("No accounts found !")
            }
            console.log(accounts);

        } catch (error) {
            console.log(error)
        }

    }

    const sendTransaction =async () => {
        try {
            if (!ethereum) return alert("Please install metamask");            
            
            const { addressTo, keyword, message, amount } = formData;
            const transactionContract = getEthereumContract();
            const parsedValue = ethers.utils.parseEther(amount);

            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: '0x5208',
                    value: parsedValue._hex
                }]
            });

            const transactionHash = await transactionContract.addToBlockChain(addressTo,parsedValue, message,  keyword);
            setLoading(true);

            console.log(`Loading :-${transactionHash.hash}`);
            await transactionHash.wait();
            setLoading(false);

            console.log(`Success :-${transactionHash.hash}`);

            const transactionCount = await transactionContract.getTransactionCount();
            setTransactionCount(transactionCount.toNumber());

            setFormData({
                addressTo: "",
                amount: "",
                keyword: "",
                message: ""
            });

        } catch (error) {
            console.log(error)
        }
    }

    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install metamask");
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

            setCurrentAccount(accounts[0]);

        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object.");
        }
    }
    const checkIfTransactionExits =async () => {
        try {
            const transactionContract = getEthereumContract();
            const transactionCount = await transactionContract.getTransactionCount();
            localStorage.setItem('transactionCount', transactionCount);
        } catch (error) {
           console.log(error);
           throw new Error("No ethereum object.");
        }
    }
    const handleChange = (e) => {
        let newData = {...formData}    ;

        newData[e.target.name] = e.target.value;

        setFormData(newData);
        console.log(formData)
    }
    

    useEffect(() => {
        checkIfWalletIsConnected();
        checkIfTransactionExits();
    }, []);

    return (
        <TransactionContext.Provider value={{connectWallet,currentAccount,handleChange, formData,sendTransaction, loading,transactions}}>
            {children}
        </TransactionContext.Provider> 
    )    
}