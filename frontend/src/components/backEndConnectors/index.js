import {
	getEthAddress,
	checkNetwork,
	requestAccount,
	isConnected,
	getUserWalletAddress,
} from "./commonConnectors";

import {
	addCosmetics,
	getCosmetics,
	giveApprovalToBatch,
	assignDistributor,
	assignRetailer,
	markReadyToPurchase,
	sellItem,
	getCosmeticItemDetails,
} from "./contractConnectors";

export {
	getEthAddress,
	checkNetwork,
	requestAccount,
	isConnected,
	getUserWalletAddress,
	addCosmetics,
	getCosmetics,
	giveApprovalToBatch,
	assignDistributor,
	assignRetailer,
	markReadyToPurchase,
	sellItem,
	getCosmeticItemDetails,
};
