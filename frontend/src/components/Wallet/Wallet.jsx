import { useState, useEffect } from "react";
import { useConnectWallet } from "./useConnectWallet";

export function Wallet() {
	const { account, requestAccount, connectStatus } = useConnectWallet();

	const [isLoading, setIsLoading] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");

	useEffect(() => {
		if (connectStatus === "disconnected") {
			setErrorMsg("");
		}
	}, [connectStatus]);

	const handleConnectWallet = async () => {
		setIsLoading(true);
		setErrorMsg("");

		const result = await requestAccount();

		setIsLoading(false);

		if (!result.success) {
			setErrorMsg(result.msg);
		}
	};

	useEffect(() => {
		if (connectStatus === "disconnected") {
			setErrorMsg("");
		}
	}, [connectStatus]);

	return (
		<div className="flex justify-between items-center bg-white mb-2 pb-6 px-36">
			<h1 className="text-4xl font-bold pl-5 pt-5">CosmeticX</h1>
			{connectStatus === "disconnected" && (
				<div className="flex gap-4 bg-lightblue font-bold p-2 rounded-lg justify-center items-center">
					<span className="flex justify-center items-center pt-3">
						Connect Wallet
					</span>
					{isLoading && (
						<span className="h-3 w-3 self-center text-red-500">Loading...</span>
					)}
					{errorMsg && <span className="text-red-500">{errorMsg}</span>}
					{!isLoading && !errorMsg && (
						<button
							className="bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium uppercase px-4 py-2 mt-3 mr-2"
							onClick={handleConnectWallet}
						>
							Connect
						</button>
					)}
				</div>
			)}

			{connectStatus === "connecting" && (
				<div className="text-center">Connecting...</div>
			)}

			{connectStatus === "connected" && (
				<div className="flex items-center justify-between gap-4 text-green-600 font-medium text-uppercase border-2 border-green-600 rounded-md px-4 py-2 mt-3 mr-2">
					<div>
						{account ? `${account.slice(0, 5)}...${account.slice(-4)}` : ""}
					</div>
					<div>Connected</div>
				</div>
			)}
		</div>
	);
}
