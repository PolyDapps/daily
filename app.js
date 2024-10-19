// Initialize Thirdweb client
const client = window.Thirdweb.createThirdwebClient({
    clientId: "aa83552f8db8c2d86a9c06a13e113b0e"
});

// Contract address and chain setup
const contractAddress = "0x0d7A25d695952E8815f6aE99c210Dee687528679";
const chainId = 137; // Polygon

async function invest() {
    const amount = document.getElementById('amount').value;

    // Ensure the amount is valid and convert to ethers
    const value = client.utils.parseEther(amount);
    console.log(`Investing ${amount} POL`);

    const referrer = document.getElementById('referrer').value || "0x0000000000000000000000000000000000000000"; // No referrer

    try {
        const tx = await client.call(contractAddress, "invest", [referrer], { value });
        console.log("Transaction successful:", tx);
        // Update UI or state after investment if needed
        alert("Investment successful!");
    } catch (error) {
        console.error("Transaction failed:", error);
        alert("Investment failed. Please check console for details.");
    }
}

async function confirmWithdrawal() {
    try {
        const tx = await client.call(contractAddress, "withdraw", []);
        console.log("Withdrawal successful:", tx);
        alert("Withdrawal successful!");
        // Update UI or state after withdrawal if needed
    } catch (error) {
        console.error("Withdrawal failed:", error);
        alert("Withdrawal failed. Please check console for details.");
    }
}

async function updateUserInfo() {
    const userAddress = await client.getAddress(); // Assuming you have the user's address

    // Fetch user info from contract
    const totalDeposits = await client.call(contractAddress, "getUserTotalDeposits", [userAddress]);
    const totalWithdrawn = await client.call(contractAddress, "getUserTotalWithdrawn", [userAddress]);
    const availableBalance = await client.call(contractAddress, "getUserAvailable", [userAddress]);

    // Update the UI with user info
    document.getElementById('totalDeposits').innerText = client.utils.formatEther(totalDeposits);
    document.getElementById('totalWithdrawn').innerText = client.utils.formatEther(totalWithdrawn);
    document.getElementById('availableBalance').innerText = client.utils.formatEther(availableBalance);
}

function validateForm() {
    invest();
    return false; // Prevent form submission
}

// Call this function on page load or user action to update user info
updateUserInfo();
