const selectSeat = document.getElementById('selected-seat');
const totalBooked = document.getElementById('total-booked');
const availableSeat = document.getElementById('available-seat');
const totalPricex = document.getElementById('total-price');
const couponField = document.getElementById('coupon-field');
const couponBtn = document.getElementById('coupon-btn');
const defaultText = document.getElementById('default-text');
const grandTotal = document.getElementById('grand-total');
const phoneNumber = document.getElementById('phone-number');
const nextButton = document.getElementById('nextButton');

let selectedSeat = [];
let totalPrice = 0;

function handleSelectSeat(event){

    const value = event.innerText;
    if(selectedSeat.includes(value)){
        alert('Seat Already Booked')
    }else if(selectedSeat.length < 4){
        event.classList.add('bg-primary')
        event.classList.add('text-white')

        selectedSeat.push(event.innerText);
        totalBooked.innerText = selectedSeat.length;

        const availableSeatValue = parseInt(availableSeat.innerText);
        const newAvailableSeat = availableSeatValue - 1;
        availableSeat.innerText = newAvailableSeat;

        // removed default text
        defaultText.classList.add('hidden');

        selectSeat.innerHTML += `
            <li class="text-base text-normal flex justify-between">
                <span>${event.innerText}</span>
                <span>Economy</span>
                <span>350</span>
            </li>    
        `
        // update total price
        totalPrice += 350;
        totalPricex.innerText = totalPrice.toFixed(2);

        // active coupon code
        if(selectedSeat.length > 3){
            couponField.removeAttribute('disabled');
            couponBtn.removeAttribute('disabled');
        }
    }else{
        return alert('Maximum Seat Booked');
    }  
}

// coupon field
document.getElementById('coupon-btn').addEventListener('click', function(){
    const couponInput = couponField.value;
    let couponSave = 0;

    if(couponInput != 'NEW50' && couponInput != 'Couple 20'){
        alert('Your Coupon is not valid');
    }
    if(couponInput === 'NEW50'){
        couponSave = totalPrice * .15;
    }else if(couponField === 'Couple 20'){
        couponSave = totalPrice * .20;
    }

    const showCouponPrice = document.getElementById('show-coupon-price');
    showCouponPrice.innerHTML = `
        <p>Discount</p>
        <P>
            <span>- BDT: </span>
            <span>${couponSave.toFixed(2)}</span>
        </p>
    `
    const grandTotalValue = totalPrice - couponSave;
    grandTotal.innerText = grandTotalValue.toFixed(2);
})

phoneNumber.addEventListener('input', function(event){
    const inputValue = event.target.value
    if(inputValue.length >= 11){
        nextButton.removeAttribute('disabled');
    }
})

document.getElementById('btn-continue').addEventListener('click', function(){
    window.location.reload()
})