// app.js

document.getElementById('paymentForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const cardNumber = document.getElementById('cardNumber').value;
    const expiryDate = document.getElementById('expiryDate').value;
    const cvv = document.getElementById('cvv').value;
    const amount = document.getElementById('amount').value;
    const messageDiv = document.getElementById('message');

    try {
        const response = await processPayment({ cardNumber, expiryDate, cvv, amount });
        if (response.success) {
            messageDiv.textContent = 'Pagamento realizado com sucesso!';
        } else {
            messageDiv.textContent = 'Falha no pagamento: ' + response.message;
        }
    } catch (error) {
        messageDiv.textContent = 'Erro ao processar pagamento: ' + error.message;
    }
});

async function processPayment(paymentDetails) {
    // Simulação de chamada a uma API de pagamento
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (paymentDetails.cardNumber && paymentDetails.expiryDate && paymentDetails.cvv && paymentDetails.amount) {
                resolve({ success: true });
            } else {
                reject({ success: false, message: 'Dados de pagamento inválidos' });
            }
        }, 1000);
    });
}

module.exports = { processPayment };
