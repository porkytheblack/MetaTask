import { Button, Flex, Spinner, Text } from '@chakra-ui/react'
import React from 'react'
import { FlexColCenterCenter } from '../../utils/FlexConfigs'
import { 
    ReactComponent as MetaMask
} from "../../assets/metamask.svg";
import useTaskContract from '../../hooks/useTaskContract';
import { ArrowRightIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router';

function Login() {
    const navigate = useNavigate()
    const {
        connectWallet,
        loading,
        isError,
        isMetaMask,
        isRinkeby,
    } = useTaskContract()
  return (
        <Flex {
            ...FlexColCenterCenter
        } w="100%" h="100vh" bg="blue.300"  >
            <Text fontSize="xl" mb="20px" fontWeight="semibold" >
                MetaTask
            </Text>
            {isError && <Text fontSize="lg" mb="20px" fontWeight="semibold" color="red.500" >
                An error occured.
            </Text>}
            {
                !isRinkeby && <Text fontSize="lg" mb="20px" fontWeight="semibold"  color="red.500" >
                    Please connect tot the Rinkeby test network.
                </Text>
            }
            {
                !isMetaMask && <Text fontSize="lg" as={Button} mb="20px" fontWeight="semibold"  color="red.500" >
                    Please install MetaMask.
                </Text>
            }
            <Button rightIcon={
                loading ? <Spinner/> : <ArrowRightIcon/>
            } onClick={()=>{
                connectWallet().then((d)=>{
                    console.log(d)
                    navigate('/tasks')
                }).catch((e)=>[
                    console.log(e)
                ])
            }} p="20px" leftIcon={
                <MetaMask height={40} width={40} />
            } >
                 <Text fontSize={"lg"} fontWeight="semibold" >
                    Login with MetaMask
                 </Text>
            </Button>
        </Flex>
  )
}

export default Login