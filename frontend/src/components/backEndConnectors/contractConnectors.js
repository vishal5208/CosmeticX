import { requestAccount } from "./commonConnectors";
const contracts = require("../../constants/contracts.json");
const { ethers } = require("ethers");

const contractAddr = contracts.Zighed_abderraouf_project[1];
const contractAbi = contracts.Zighed_abderraouf_project[0];

const addCosmetics = async ({ brand, item, itemCount }) => {
	console.log(brand, item, itemCount);
	try {
		if (typeof window.ethereum !== "undefined") {
			await requestAccount();
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			console.log(signer);
			const contract = new ethers.Contract(contractAddr, contractAbi, signer);

			const tx = await contract.addCosmetics(brand, item, itemCount);
			const receipt = await tx.wait(1);
			const { args } = receipt.events.find(
				(event) => event.event === "CosmeticsAdded"
			);
			const batchId = args.batchId;
			return {
				success: true,
				msg: "Cosmetic batch added successfully",
				batchId: batchId,
			};
		} else {
			return {
				success: false,
				msg: "Please connect your wallet!",
			};
		}
	} catch (error) {
		return {
			success: false,
			msg: error.message,
		};
	}
};

const getCosmetics = async (batchId) => {
	try {
		if (typeof window.ethereum !== "undefined") {
			await requestAccount();
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const contract = new ethers.Contract(contractAddr, contractAbi, provider);

			const result = await contract.getCosmetics(batchId);
			const [
				brand,
				item,
				manufacturer,
				distributor,
				retailer,
				state,
				itemCountBN,
				hasOwnerApproval,
			] = result;

			const itemCount = itemCountBN.toNumber();

			return {
				success: true,
				msg: "Cosmetic details fetched successfully",
				cosmetics: {
					brand,
					item,
					manufacturer,
					distributor,
					retailer,
					state,
					itemCount,
					hasOwnerApproval,
				},
			};
		} else {
			return {
				success: false,
				msg: "Please connect your wallet!",
			};
		}
	} catch (error) {
		return {
			success: false,
			msg: error.message,
		};
	}
};

const giveApprovalToBatch = async (batchId) => {
	try {
		if (typeof window.ethereum !== "undefined") {
			await requestAccount();
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			const contract = new ethers.Contract(contractAddr, contractAbi, signer);

			const transaction = await contract.giveApprovalToBatch(batchId);
			await transaction.wait();

			return {
				success: true,
				msg: "Approval granted successfully",
			};
		} else {
			return {
				success: false,
				msg: "Please connect your wallet!",
			};
		}
	} catch (error) {
		return {
			success: false,
			msg: error.message,
		};
	}
};

const assignDistributor = async (distributorAddress, batchId) => {
	try {
		if (typeof window.ethereum !== "undefined") {
			await requestAccount();
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			const contract = new ethers.Contract(contractAddr, contractAbi, signer);

			const transaction = await contract.assignDistributor(
				distributorAddress,
				batchId
			);
			await transaction.wait();

			return {
				success: true,
				msg: "Distributor assigned successfully",
			};
		} else {
			return {
				success: false,
				msg: "Please connect your wallet!",
			};
		}
	} catch (error) {
		return {
			success: false,
			msg: error.message,
		};
	}
};

const assignRetailer = async (ratailerAddress, batchId) => {
	try {
		if (typeof window.ethereum !== "undefined") {
			await requestAccount();
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			const contract = new ethers.Contract(contractAddr, contractAbi, signer);

			const transaction = await contract.assignRetailer(
				ratailerAddress,
				batchId
			);
			await transaction.wait();

			return {
				success: true,
				msg: "Distributor assigned successfully",
			};
		} else {
			return {
				success: false,
				msg: "Please connect your wallet!",
			};
		}
	} catch (error) {
		return {
			success: false,
			msg: error.message,
		};
	}
};

const markReadyToPurchase = async (batchId) => {
	try {
		if (typeof window.ethereum !== "undefined") {
			await requestAccount();
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			const contract = new ethers.Contract(contractAddr, contractAbi, signer);

			const transaction = await contract.markReadyToPurchase(batchId);
			await transaction.wait();

			return {
				success: true,
				msg: "Now the batch items are ready for purchase!!",
			};
		} else {
			return {
				success: false,
				msg: "Please connect your wallet!",
			};
		}
	} catch (error) {
		return {
			success: false,
			msg: error.message,
		};
	}
};

const sellItem = async (batchId, itemId, consumer) => {
	try {
		if (typeof window.ethereum !== "undefined") {
			await requestAccount();
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			const contract = new ethers.Contract(contractAddr, contractAbi, signer);

			const transaction = await contract.sellItem(batchId, itemId, consumer);
			await transaction.wait();

			return {
				success: true,
				msg: "Item sold successfully!",
			};
		} else {
			return {
				success: false,
				msg: "Please connect your wallet!",
			};
		}
	} catch (error) {
		return {
			success: false,
			msg: error.message,
		};
	}
};

const getCosmeticItemDetails = async (batchId, itemId) => {
	try {
		if (typeof window.ethereum !== "undefined") {
			await requestAccount();
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const contract = new ethers.Contract(contractAddr, contractAbi, provider);

			const result = await contract.getCosmeticItemDetails(batchId, itemId);
			const [_itemId, _batchId, itemSold, consumer] = result;

			return {
				success: true,
				msg: "Cosmetic item details fetched successfully",
				cosmetics: {
					_itemId,
					_batchId,
					itemSold,
					consumer,
				},
			};
		} else {
			return {
				success: false,
				msg: "Please connect your wallet!",
			};
		}
	} catch (error) {
		return {
			success: false,
			msg: error.message,
		};
	}
};

export {
	addCosmetics,
	getCosmetics,
	giveApprovalToBatch,
	assignDistributor,
	assignRetailer,
	markReadyToPurchase,
	sellItem,
	getCosmeticItemDetails,
};
