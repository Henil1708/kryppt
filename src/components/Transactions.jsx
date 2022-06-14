import React, {useContext} from 'react'
import { TransactionContext } from "../context/TransactionsContext"
import useFetch from '../hooks/useFetch';
import dummyData from "../utils/dummy";
import { shortenAddress } from '../utils/shortenAddress';


const TransactionCard = ({addressTo,addressFrom,timestamp, message,keyword,amount,url }) => {
  const gifUrl = useFetch({ keyword });
  return (
    <div className='bg-[#181918] m-4 flex flex-1 
      2xl:min-w-[450px] 
      2xl:max-w-[500px] 
      sm:min-w-[270px] 
      sm:max-w-[300px]
      flex-col p-3 rounded-md hover:shadow-2xl  h-full
    '>
      <div className="flex flex-col items-center w-full mt-3">
        <div className="w-full mb-6 p-2">
          <a href={"https://goerli.etherscan.io/address/" + addressFrom} rel="noopner noreferrer" target={'_blank'}>
            <p className='text-white text-base '>From: { shortenAddress(addressFrom)}</p>
          </a>
          <a href={"https://goerli.etherscan.io/address/" + addressTo} rel="noopner noreferrer" target={'_blank'}>
            <p className='text-white text-base '>To: { shortenAddress(addressTo)}</p>
          </a>
          <p className='text-white text-base '>Amount: {amount} ETH</p>
          {message && (
            <>
              <br />
              <p className='text-white text-base '>Message: { message}</p>
            </>
          )}
        </div>
            <img src={gifUrl || url} alt="gifs" className="w-full h-64  2xl:h-96 rounded-md shadow-lg object-cover " />
          <div className = 'bg-black p-3 px-5 w-max rounded-3xl border-4 border-[#181918] -mt-5 shadow-2xl' >
            <p className='text-[#37c7da] font-bold '>
              {timestamp}
            </p>
          </div>
      </div>
    </div>
  )
}
const Transactions = () => {
  const {
    currentAccount,
    connectWallet,
    transactions
  } = useContext(TransactionContext);
  return (
    <div className='flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions '>
      <div className='flex flex-col md:p-12 py-12 px-4 '>
        {
          currentAccount ? (
          <h3 className='text-white text-3xl text-center my-2'>Latest Transactions</h3>
          
          ) : (
              <div className='blue-glassmorphism p-5 border-blue-300  shadow-xl shadow-red-600/80 border-4 px-10'>
          <h3 className='text-white text-3xl text-center my-2 '>Connect your account to see the latest transactions.</h3>
                {!currentAccount && <button className='flex w-fit px-7 mx-auto flex-row justify-center items-center my-5 text-white bg-[#2952e3] cursor-pointer p-3 rounded-full hover:bg-[#2546bd]' type='button' onClick={connectWallet}>
            <p className='text-base font-semibold'>
              Connect Wallet
            </p>
          </button>}
              </div>  
          )
        }
        <div className='flex flex-wrap justify-center items-start mt-10'>
          {
            transactions.reverse().map((transaction, index) => {
              return <TransactionCard key={index} {...transaction} />
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Transactions