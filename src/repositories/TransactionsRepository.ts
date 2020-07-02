import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    let income = 0;
    let outcome = 0;
    let total = 0;

    this.transactions.map(item => {
      if(item.type === "income"){
        income += item.value;
        total += item.value;
      }else{
        outcome += item.value;
        total -= item.value;
      }
    })

    const balance = {income,outcome,total}

    return balance;
  }

  public create(title: string, value: number, type: 'income' | 'outcome' ): Transaction {
    const transaction = new Transaction({
      title: title,
      value: value,
      type: type
    });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
