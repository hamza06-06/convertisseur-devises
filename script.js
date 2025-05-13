const fromSelect = document.getElementById('from');
const toSelect = document.getElementById('to');
const amountInput = document.getElementById('amount');
const resultDisplay = document.getElementById('result');


const API_KEY = 'af4fe5629f3a1593c0cc722e'; 
const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;

let rates = {};


fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    rates = data.conversion_rates;
    const currencies = Object.keys(rates);

    currencies.forEach(devise => {
      const option1 = document.createElement('option');
      option1.value = devise;
      option1.textContent = devise;

      const option2 = option1.cloneNode(true);

      fromSelect.appendChild(option1);
      toSelect.appendChild(option2);
    });



    fromSelect.value = 'MAD';
    toSelect.value = 'EUR';
  })
  .catch(error => {
    console.error('Erreur de chargement des devises :', error);
  });



function convertir() {
  const from = fromSelect.value;
  const to = toSelect.value;
  const montant = parseFloat(amountInput.value);

  if (isNaN(montant)) {
    resultDisplay.textContent = "Conversion : 0.00";
    return;
  }

  const tauxFrom = rates[from];
  const tauxTo = rates[to];
  const tauxConversion = tauxTo / tauxFrom;

  const resultat = montant * tauxConversion;
  resultDisplay.textContent = `Conversion : ${resultat.toFixed(2)} ${to}`;
}


amountInput.addEventListener('input', convertir);
fromSelect.addEventListener('change', convertir);
toSelect.addEventListener('change', convertir);
