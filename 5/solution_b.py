from solution_a import seat_ids

seat_ids.sort()

for seat in seat_ids:
    if seat + 1 not in seat_ids:
        my_seat = seat + 1
        break

print(my_seat)