import { backend } from "declarations/backend";

const CRYPTO_PAIRS = [
    'bitcoin/usd',
    'ethereum/usd',
    'dogecoin/usd',
    'cardano/usd',
    'solana/usd',
    'polkadot/usd',
    'ripple/usd'
];

async function getRandomPairRate() {
    const randomPair = CRYPTO_PAIRS[Math.floor(Math.random() * CRYPTO_PAIRS.length)];
    const [base, quote] = randomPair.split('/');
    
    try {
        const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${base}&vs_currencies=${quote}`);
        const data = await response.json();
        const rate = data[base][quote];
        return { pair: randomPair, rate: rate.toString() };
    } catch (error) {
        console.error('Error fetching rate:', error);
        return null;
    }
}

async function updateDisplay() {
    const loading = document.getElementById('loading');
    const rateDisplay = document.getElementById('rateDisplay');
    
    loading.classList.remove('d-none');
    rateDisplay.classList.add('opacity-50');

    try {
        const rateData = await getRandomPairRate();
        if (rateData) {
            await backend.updateExchangeRate(rateData.pair, rateData.rate);
            const [pair, rate, timestamp] = await backend.getCurrentRate();
            
            document.getElementById('pairDisplay').textContent = pair.toUpperCase();
            document.getElementById('rateValue').textContent = `${parseFloat(rate).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD'
            })}`;
            document.getElementById('lastUpdate').textContent = `Last updated: ${new Date(Number(timestamp) / 1000000).toLocaleString()}`;
        }
    } catch (error) {
        console.error('Error updating display:', error);
    } finally {
        loading.classList.add('d-none');
        rateDisplay.classList.remove('opacity-50');
    }
}

// Initial update
updateDisplay();

// Update every 30 seconds
setInterval(updateDisplay, 30000);
