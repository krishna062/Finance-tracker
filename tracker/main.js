//item controller function
const ItemCtrl = (function(){
  //constructing item
    const Item = function(id, description, amount){
        this.id = id;
        this.description = description;
        this.amount = amount;
    }

    //data structure
    const data = {
        items: []}
    //public methods
    return {
        logData: function(){
            return data;
        },
        addMoney: function(description, amount){

        //crate random id
        let ID= ItemCtrl.createID();
        //create new item
        newMoney = new Item(ID, description, amount);
        //add new item to data structure(array)
        data.items.push(newMoney);

        return newMoney;
        },
        createID: function(){
            //create random id number between 0 and 10000
        const idNum= Math.floor(Math.random()*10000);
        return idNum;
        }
    }
})();

// UI controller function
const UICtrl = (function(){
    const UISelectors = {
        incomeBtn:'#add__income',
        expenseBtn:'#add__expense',
        date:'#date',
        description:'#description',
        amount:'#amount',
        income:'#income',
        balance:'#balance',
        expense:'#expense',
        incomeList:'#income__container',
        expenseList:'#expense__container',
        incomeItem:'.income__amount',
        expenseItem:'.expense__amount',
        itemsContainer:'.item__container'
    }
    //public methods
    return {
            //return ui selectors
            getSelectors: function(){
                return UISelectors;
            },
            getDateInput: function(){
                return {
                    dateInput: document.querySelector(UISelectors.date).value
                }
            },
            getDescriptionInput: function(){
                return {
                    descriptionInput: document.querySelector(UISelectors.description).value
                }
    },
    getValueInput: function(){
        return {
            valueInput: document.querySelector(UISelectors.amount).value
        }
    },
    getIncomeItem: function(item){
        //create new div
        const div = document.createElement('div');
        //add class
        div.classList='item income'
        //add id
        div.id=`item-${item.id}`
        //add html
        div.innerHTML=`
        
                    <h4>${item.description}</h4>
                    <div class="item__income">
                        <p class="symbol">₹ </p>
                        <span class="income__amount">${item.amount}</span>
                     </div>
                     <i class='far fa-trash-alt'></i>

        `;
        //insert income into the list
        document.querySelector(UISelectors.incomeList).insertAdjacentElement('beforeend', div);

    },
    clearInputs: function(){
        document.querySelector(UISelectors.date).value=''
        document.querySelector(UISelectors.description).value=''
        document.querySelector(UISelectors.amount).value=''
    },
    updateEarned
    : function(){
        //all income elements
        const allIncome = document.querySelectorAll(UISelectors.incomeItem);
        //array with all income
        const incomeCount=[...allIncome].map(item=>item.innerHTML);
}}
})();


//app controller function
const App = (function(){
//load event listeners
const loadEventListeners = function(){
    //get ui selectors
    const UISelectors = UICtrl.getSelectors();
    //add new item event
    document.querySelector(UISelectors.incomeBtn).addEventListener('click', addIncome);
}

//add new income
const addIncome = function(){
    //get description input and amount input
    const date= UICtrl.getDateInput();
    const description = UICtrl.getDescriptionInput();
    const amount = UICtrl.getValueInput();
    //if inputs are not empty
    if(description.descriptionInput !== '' && amount.valueInput !== ''){
        //add new item
        const newMoney=ItemCtrl.addMoney(description.descriptionInput, amount.valueInput);
    // console.log(description,amount)
    //adding item to the list
        UICtrl.getIncomeItem(newMoney);
        //clear input
        UICtrl.clearInputs();

        //update earning
        UICtrl.updateEarned();


    //check data
    const checkData = ItemCtrl.logData();
    console.log(checkData);
}}
    //init function
    return {
        init: function(){
            loadEventListeners();
        }
    }

})(ItemCtrl, UICtrl);


