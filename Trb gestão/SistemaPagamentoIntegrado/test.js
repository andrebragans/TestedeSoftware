/**
 * @jest-environment jsdom
 */

const { processPayment } = require('../public/app');

describe('Sistema de Pagamento Integrado', () => {
    let form, cardNumber, expiryDate, cvv, amount, messageDiv;

    beforeEach(() => {
        document.body.innerHTML = `
            <form id="paymentForm">
                <input type="text" id="cardNumber" placeholder="Número do Cartão" required>
                <input type="text" id="expiryDate" placeholder="Data de Validade (MM/AA)" required>
                <input type="text" id="cvv" placeholder="CVV" required>
                <input type="text" id="amount" placeholder="Valor" required>
                <button type="submit">Pagar</button>
            </form>
            <div id="message"></div>
        `;

        form = document.getElementById('paymentForm');
        cardNumber = document.getElementById('cardNumber');
        expiryDate = document.getElementById('expiryDate');
        cvv = document.getElementById('cvv');
        amount = document.getElementById('amount');
        messageDiv = document.getElementById('message');
    });

    test('processPayment resolves with success', async () => {
        const paymentDetails = {
            cardNumber: '1234123412341234',
            expiryDate: '12/23',
            cvv: '123',
            amount: '100.00',
        };

        const response = await processPayment(paymentDetails);
        expect(response.success).toBe(true);
    });

    test('processPayment rejects with failure', async () => {
        const paymentDetails = {
            cardNumber: '',
            expiryDate: '12/23',
            cvv: '123',
            amount: '100.00',
        };

        await expect(processPayment(paymentDetails)).rejects.toEqual({
            success: false,
            message: 'Dados de pagamento inválidos',
        });
    });

    test('form submission shows success message', async () => {
        cardNumber.value = '1234123412341234';
        expiryDate.value = '12/23';
        cvv.value = '123';
        amount.value = '100.00';

        const submitEvent = new Event('submit');
        await form.dispatchEvent(submitEvent);

        // Process the pending promises to allow the processPayment to resolve
        await new Promise(process.nextTick);
        expect(messageDiv.textContent).toBe('Pagamento realizado com sucesso!');
    });

    test('form submission shows failure message', async () => {
        cardNumber.value = '';
        expiryDate.value = '12/23';
        cvv.value = '123';
        amount.value = '100.00';

        const submitEvent = new Event('submit');
        await form.dispatchEvent(submitEvent);

        // Process the pending promises to allow the processPayment to reject
        await new Promise(process.nextTick);
        expect(messageDiv.textContent).toBe('Erro ao processar pagamento: Dados de pagamento inválidos');
    });
});
