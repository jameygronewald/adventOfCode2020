def create_list_from_expense_report():
    expense_list = []
    with open(f"input.txt") as f:
        line = f.readline()
        while line:
            expense_list.append(int(line))
            line = f.readline()
    return expense_list

def find_product(expense_list):
    expenses_to_multiply = []
    for x in expense_list:
        try:
            index_to_multiply = expense_list.index(2020 - x)
            expenses_to_multiply.append(expense_list[index_to_multiply])
            if len(expenses_to_multiply) == 2:
                return print(expenses_to_multiply[0] * expenses_to_multiply[1])
        except ValueError:
            continue

if __name__ == "__main__":              
    find_product(create_list_from_expense_report())
