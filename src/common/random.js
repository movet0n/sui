export async function convertSuiToMist(amount) {
    const convertedAmount = amount * 10 ** 9;

    return convertedAmount;
}

// convertSuiToMist(50000000)

export async function getRandomSuiValueBetween(from, to) {
    const value = (Math.random() * (to - from) + from).toFixed(5);

    return value;
}

// getRandomSuiValueBetween(0.01, 0.1)