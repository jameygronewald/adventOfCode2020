seat_ids = []

def create_list_of_seat_codes():
    seat_codes = []
    with open(f"day5/input.txt") as f:
        line = f.readline()
        while line:
            seat_codes.append(line.strip('\n'))
            line = f.readline()
    return seat_codes

def find_highest_seat_id(seats):
    highest = 0
    for seat in seats:

        row = 128
        row_subtractor = row / 2
        row_code = seat[0:7]
        for x in range(len(row_code)):
            if row_code[x] == 'F':
                row -= row_subtractor
            row_subtractor /= 2

        column = 8
        column_subtractor = column / 2
        column_code = seat[7:10]
        for x in range(len(column_code)):
            if column_code[x] == 'L':
                column -= column_subtractor
            column_subtractor /= 2

        this_seat = int((row - 1) * 8 + (column - 1))
        if this_seat > highest:
            highest = this_seat

        seat_ids.append(this_seat)
        
    return highest

seat_codes = create_list_of_seat_codes()

highest_seat_id = find_highest_seat_id(seat_codes)

# print(seat_ids)
# print(highest_seat_id)
