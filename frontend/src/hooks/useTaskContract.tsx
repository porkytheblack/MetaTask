import { ethers } from 'ethers'
import { isUndefined } from 'lodash'
import React, { useEffect, useState } from 'react'
import {atomWithStorage} from "jotai/utils"
import { useAtom } from 'jotai'
import { useNavigate } from 'react-router'
import {TaskContractAddress} from "../config.js"
import TaskContractAbi from "../contract/TaskContract.json"
declare global {
  interface Window {
    ethereum?: ethers.providers.ExternalProvider
  }
}

export const isLoggedInAtom = atomWithStorage<boolean>("is_logged_in", false)
export const ethAccountAtom = atomWithStorage<string>("eth_account", "")

function useTaskContract() {
  const [isRinkeby, setIsRinkeby] = useState<boolean>(true)
  const [isMetaMask, setIsMetaMask] = useState<boolean>(true)
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom)
  const [ethAccount, setEthAccount] = useAtom(ethAccountAtom)
  const [loading, setLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)

  const navigate = useNavigate()

  useEffect(()=>{
    if(isError){
      setLoading(false)
    } 
  
  }, [isError])

  const connectWallet = async () =>{
    setLoading(true)
    try {

      const {ethereum} = window
      if(!ethereum) {
        throw new Error('No ethereum provider found')
      }
      if(isUndefined(ethereum.request)) {
        throw new Error('Ethereum requests object is undefined')
      }
      if(ethereum.isMetaMask){
        setIsMetaMask(true)
        ethereum?.request({
          method: 'eth_chainId'
        }).then((chainId)=>{
          if(chainId === "0x4"){
            setIsRinkeby(true)
            if(!isUndefined(ethereum.request)){
              ethereum?.request({
                method: 'eth_requestAccounts'
              }).then((accounts)=>{
                console.log(accounts)
                setLoading(false)
                setIsLoggedIn(true)
                setEthAccount(accounts[0])

              }).catch((e)=>{
                console.log(e)
                setIsError(true)
                throw new Error(e)
              })
            }else{
              throw new Error('Ethereum requests object is undefined')
            }
          }else{
            setIsError(false)
            setIsRinkeby(false)
          }
        }).catch((e)=>{
          setIsError(true)
          console.log(e)
        })
      }else{
        setIsError(true)
        setIsMetaMask(false)
      }
      
    }catch(e){
      console.log(e)
      setIsError(true)
      return e;
    }
  }

  const addTask = async (name: string, description: string) =>{
    console.log("adding new task")
    return new Promise((res, rej)=>{
      setLoading(true)
      try {
        const {ethereum} = window
        if(!ethereum) return navigate("/")
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer  = provider.getSigner()
        const TaskContract = new ethers.Contract(
          TaskContractAddress,
          TaskContractAbi.abi,
          signer
        )

        TaskContract.addTask(
          name,
          description,
          {
            gasLimit: ethers.utils.parseUnits("1000000", "wei")
          }
        ).then((_d: any)=>{
          res(_d)
          setLoading(false)

          console.log(_d)
        }).catch((e: any)=>{
          console.log(e)
          rej(e)
        })


      } catch (e) {
        console.log(e)
      } 
    })
    
  }

  const fetchTasks = async () => {
    return new Promise((res, rej)=>{
      const {ethereum} = window 
      if(!ethereum) return navigate("/")
      const provider = new ethers.providers.Web3Provider(ethereum)
      const signer = provider.getSigner()
      console.log(signer)
      console.log("---------------------")
      console.log(TaskContractAbi.abi)
      console.log("---------------------")
      console.log(TaskContractAddress)
      console.log("---------------------")
      const TaskContract  = new ethers.Contract(
        TaskContractAddress,
        TaskContractAbi.abi,
        signer
      )

      TaskContract.getTasks().then((tasks: any)=>{
        console.log(tasks)
        res(tasks)
      }).catch((e: any)=>{
        rej(e)
      })
    }) 
  }

  return (
    {
      connectWallet,
      isRinkeby,
      isMetaMask,
      isError,
      loading,
      isLoggedIn,
      ethAccount,
      addTask,
      fetchTasks
    }
  )
}

export default useTaskContract