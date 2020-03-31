// App Components
import { ContractFactory } from './contract-factory';

// Contract Data
import RentMyTentData from './contracts/RentMyTent';

const RentMyTent = ContractFactory.create({name: RentMyTentData.contractName, abi: RentMyTentData.abi});

export {
    RentMyTent,
}
