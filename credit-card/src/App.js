import React, { useState } from 'react';
import './index.css';
import bgDesktop from './images/backgroundimage.png';
import bgCardFront from './images/bg-card-front.png';
import bgCardBack from './images/bg-card-back.png';
import logo from './images/card-logo.svg';
import tick from './images/icon-complete.svg';

function App() {
  const [confirmed, setConfirmed] = useState(false);
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [cvc, setCvc] = useState('');
  const [nameError, setNameError] = useState('');
  const [cardNumberError, setCardNumberError] = useState('');
  const [monthError, setMonthError] = useState('');
  const [yearError, setYearError] = useState('');
  const [cvcError, setCvcError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation logic
    let hasError = false;

    if (!name) {
      setNameError('Cardholder Name is required');
      hasError = true;
    } else {
      setNameError('');
    }

    if (!cardNumber) {
      setCardNumberError('Card Number is required');
      hasError = true;
    } else if (cardNumber.replace(/\s/g, '').length !== 16) {
      setCardNumberError('Card Number must be 16 digits');
      hasError = true;
    } else {
      setCardNumberError('');
    }

    if (!month) {
      setMonthError('Month is required');
      hasError = true;
    } else if (month.length !== 2 || isNaN(month)) {
      setMonthError('Invalid Month');
      hasError = true;
    } else {
      setMonthError('');
    }

    if (!year) {
      setYearError('Year is required');
      hasError = true;
    } else if (year.length !== 2 || isNaN(year)) {
      setYearError('Invalid Year');
      hasError = true;
    } else {
      setYearError('');
    }

    if (!cvc) {
      setCvcError('CVC is required');
      hasError = true;
    } else if (cvc.length !== 3 || isNaN(cvc)) {
      setCvcError('Invalid CVC');
      hasError = true;
    } else {
      setCvcError('');
    }

    if (!hasError) {
      setConfirmed(true);
    }
  };

  return (
    <section className="container">
      <div className="background-image">
        <img src={bgDesktop} alt="Background" />
      </div>

      <div className="content">
        <div className="cards">
          <article className="front-card" style={{ backgroundImage: `url(${bgCardFront})` }}>
            <img className="Logo" src={logo} alt="" />

            <div>
              <h3 className="Card-Deatils">{confirmed ? cardNumber : '0000 0000 0000 0000'}</h3>
              <ul className="Personal-info">
                <li>{confirmed ? name : 'HarshXMuski'}</li>
                <li>{confirmed ? `${month}/${year}` : '00/00'}</li>
              </ul>
            </div>
          </article>
          <article className="back-card" style={{ backgroundImage: `url(${bgCardBack})` }}>
            <p className="CVC">{confirmed ? cvc : '000'}</p>
          </article>
        </div>

        {!confirmed && (
          <form className="FormDetails" onSubmit={handleSubmit}>
            <div className="grid_1">
              <label htmlFor="card_name">Cardholder Name</label>
              <input
                type="text"
                placeholder="e.g. Jane Appleseed"
                id="card_name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              {nameError && <p className="error">{nameError}</p>}
            </div>
            <div className="grid_2">
  <label htmlFor="card_number">Card Number</label>
  <input
    type="text"
    minLength="19"
    maxLength="19"
    placeholder="e.g. 1234 5678 9123 0000"
    id="card_number"
    value={cardNumber}
    onChange={(e) => {
      const formattedValue = e.target.value
        .replace(/\D/g, "")
        .replace(/(\d{4})/g, "$1 ") 
        .trim(); 

      if (formattedValue.length <= 19) {
        setCardNumber(formattedValue);
      }
    }}
    onBlur={() => {
      
      setCardNumber(cardNumber.replace(/\s/g, ""));
    }}
    onFocus={() => {
     
      setCardNumber(cardNumber.replace(/\D/g, "").replace(/(\d{4})/g, "$1 "));
    }}
    required
  />
  {cardNumberError && <p className="error">{cardNumberError}</p>}
</div>


            <div className="card_information">
              <div id="card_date">
                <label htmlFor="card_date">Exp. Date (MM/YY)</label>
                <div className="two_inp">
                  <div>
                    <input
                      type="number"
                      placeholder="MM"
                      minLength="2"
                      maxLength="2"
                      id="card_month"
                      value={month}
                      onChange={(e) => setMonth(e.target.value)}
                      required
                    />
                    {monthError && <p className="error">{monthError}</p>}
                  </div>
                  <div>
                    <input
                      type="number"
                      minLength="2"
                      maxLength="2"
                      placeholder="YY"
                      id="card_year"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      required
                    />
                    {yearError && <p className="error">{yearError}</p>}
                  </div>
                </div>
              </div>
              <div className="grid_4">
                <label htmlFor="card_cvc">CVC</label>
                <input
                  type="number"
                  maxLength="3"
                  placeholder="e.g. 123"
                  id="card_cvc"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value)}
                  required
                />
                {cvcError && <p className="error">{cvcError}</p>}
              </div>
            </div>
            <button className="btn" type="submit">
              Confirm
            </button>
          </form>
        )}

        {confirmed && <ThankYou setConfirmed={setConfirmed} />}
      </div>
    </section>
  );
}

function ThankYou({ setConfirmed }) {
  return (
    <>
      <div className="ThankYouPage">
        <img src={tick} alt="" className="ThankYou-Image" />
        <h1 className="ThankYouText">Thank You!</h1>
        <p className="Text">We've added your card details</p>
        <button className="btn" onClick={() => setConfirmed(false)}>
          Continue
        </button>
      </div>
    </>
  );
}

export default App;
