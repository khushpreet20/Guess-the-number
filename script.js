let random = parseInt(Math.random()*100 + 1);
    // console.log(random);
    const submit = document.querySelector('button')
    // console.log(submit);
    let canPlay = true;
    let numofplays = 0;
    let prevGuesses = document.querySelector('.prvguesses');
    let userInput = document.querySelector('input')
    if(canPlay){
        submit.addEventListener('click', function(e){
            // console.log(e.target.value);
            e.target.value = userInput.value;
            let guess = userInput.value ;
            userInput.value = '';
            numofplays += 1 ;
            isvalid(guess)
        })
    }
    function isvalid(guess){
        // console.log(numofplays);
        const attempts = document.querySelector('#attempts');
        if(numofplays === 10){
            attempts.innerText = `Remaining Attempts: ${0}`;
            endgame();
        }
        prevGuesses.innerHTML += `${guess} `;
        if(guess == '' || isNaN(guess) || guess < 1 || guess > 100){
            const message = document.querySelector('#message');
            message.innerText = 'Please enter a valid number.'
            attempts.innerText =  `Remaining Attempts: ${10-numofplays}`;
        }else{
            attempts.innerText = `Remaining Attempts: ${10-numofplays}`;
            check(guess);
        }
    }
    function check(guess){
        const message = document.querySelector('#message');
        if(guess < random){
            message.innerText = 'Number is too low. !'
        }
        else if(guess > random){
            message.innerText = "Number is too high. !"
        }
        else if(guess == random){
            message.style.color = 'green';
            message.innerText = 'Correct Guess. !!'
            endgame();
        }
    }
    function endgame(){
        canPlay = false;
        userInput.setAttribute('disabled', '');
        let restartbutton = document.createElement("button");
        let resBox = document.querySelector('.resBox');
        if(numofplays === 10){
            // let span = document.createElement('span')
            // span.innerText = `Number was: ${random}`
            // resBox.appendChild(span);  Here i was trying to print the random number when user fails to guess it.
            restartbutton.innerText = 'Try Again.'
        }else{
            restartbutton.innerText = 'Start New Game'
        }
        restartbutton.classList.add('button');
        resBox.appendChild(restartbutton);
        newgame(restartbutton);
    }
    function newgame(restartbutton){
        restartbutton.addEventListener('click', function(e){
            canPlay = true;
            numofplays = 0;
            prevGuesses.innerHTML = ''
            userInput.removeAttribute('disabled');
            document.querySelector('.resBox').removeChild(restartbutton);
            const message = document.querySelector('#message');
            message.innerText = ''
            message.style.color = 'red';
            const attempts = document.querySelector('#attempts');
            attempts.innerText = `Remaining Attempts: ${10}`
            random = parseInt(Math.random()*100 + 1);
        })
    }