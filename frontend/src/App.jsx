import {
	Wallet,
	AddCosmeticsForm,
	CosmeticDetails,
	GiveApprovalForm,
	AssignRoles,
	MarkReadyToPurchaseForm,
	SellItem,
	ItemDetails,
} from "./components";
import { useState } from "react";

function App() {
	const [batchId, setBatchId] = useState("");
	const handleBatchIdChange = (event) => {
		setBatchId(event.target.value);
	};
	const handleFormSubmit = (event) => {
		event.preventDefault();
	};
	return (
		<div className="mb-7 bg-slate-50">
			<Wallet />
			<AddCosmeticsForm />
			<div className="flex flex-col items-center justify-center">
				<div className="p-8 rounded-lg shadow-md bg-gray-100 w-2/3">
					<p className="font-bold text-2xl mb-5 text-center">
						Fetch Cosmetics Details
					</p>
					<form
						className="my-4 flex flex-col items-center justify-center"
						onSubmit={handleFormSubmit}
					>
						<input
							className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 mb-4 focus:ring-blue-500 w-full"
							type="text"
							value={batchId}
							onChange={handleBatchIdChange}
							placeholder="Enter Batch ID"
						/>
						<button
							className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-2 self-start"
							type="submit"
						>
							Fetch Data
						</button>
					</form>
					{batchId && <CosmeticDetails batchId={batchId} />}
				</div>
			</div>

			<GiveApprovalForm />
			<AssignRoles />
			<MarkReadyToPurchaseForm />
			<SellItem />
			<ItemDetails />
		</div>
	);
}

export default App;
