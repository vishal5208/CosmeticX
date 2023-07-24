const hre = require("hardhat");
const contracts = require("../../frontend/src/constants/contracts.json");
console.log(contracts.Zighed_abderraouf_project[1]);

const zighed_abderraouf_project_addr = contracts.Zighed_abderraouf_project[1];

async function verifyContracts(contractInfo) {
	for (const info of contractInfo) {
		console.log(info);
		await hre.run("verify:verify", {
			address: info.address,
			constructorArguments: info.args || [],
		});
	}
}

const contractsToVerify = [
	{
		address: zighed_abderraouf_project_addr,
		args: [],
	},
];

verifyContracts(contractsToVerify);
