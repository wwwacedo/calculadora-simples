class SimpleCalculator {
    constructor() {
        const pResult = document.getElementById("result");
        const firstNumber = document.getElementById("firstNumber");
        const secondNumber = document.getElementById("secondNumber");

        const doesInputsExists = () => (firstNumber.value && secondNumber.value) ? true : false;

        const getInputs = () => [Number(firstNumber.value), Number(secondNumber.value)];

        const displayParagrath = (first, second, operator, result) => {
            pResult.innerHTML = `<h2>${first < 0 ? `(${first})` : `${first}`} `
                + `${operator} ${second < 0 ? `(${second})` : `${second}`} `
                + `= ${result < 0 ? `(${result})` : `${result}`}</h2>`;
        };

        const fieldCleaner = (e) => {
            e.preventDefault();
            firstNumber.value = "";
            secondNumber.value = "";
            pResult.innerHTML = "";
        };

        const add = (first, second) => ['+', first + second];
        const subtract = (first, second) => ['-', first - second];
        const multiply = (first, second) => ['x', first * second];
        const divide = (first, second) => {
            if(first === 0 && second === 0) return ['/', 'Indefinido'];
            else if (second === 0) return ['/', 'Infinito'];
            else return ['/', first / second];
        };

        const clickButtons = () => {
            document.addEventListener('click', e => {

                const el = e.target;

                if (el.classList.contains('cleaner')) fieldCleaner(e);

                if (doesInputsExists()) {
                    e.preventDefault();
                    let [operator, result] = ['', ''];
                    const [first, second] = getInputs();
                    if (el.classList.contains('plus'))
                        [operator, result] = add(first, second);
                    if (el.classList.contains('minus'))
                        [operator, result] = subtract(first, second);
                    if (el.classList.contains('xmark'))
                        [operator, result] = multiply(first, second);
                    if (el.classList.contains('divide'))
                        [operator, result] = divide(first, second);
                    // console.log(first, second, operator, result);
                    if (operator)
                        displayParagrath(first, second, operator, result);
                }
            });
        };

        const changeInputs = () => {
            document.addEventListener('change', e => {
                const el = e.target;
                if (el.classList.contains('form-control'))
                    pResult.innerHTML = "";
            });
        };
        
        //Public
        this.start = () => {
            clickButtons();
            changeInputs();
        };
    }
}

const calculator = new SimpleCalculator();
calculator.start();
