# unstop_assignment

# Database Structure

# Seats

| Id  | Seat_number | is_avalable |
| --- | ----------- | ----------- |
| 1   | 1           | true        |
| 2   | 2           | true        |
| 3   | 3           | true        |
| 4   | 4           | true        |
| 5   | 5           | true        |
| 6   | 6           | true        |
| 7   | 7           | true        |
| 8   | 8           | true        |
| 9   | 9           | true        |

till 80

CREATE TABLE seats (
id SERIAL PRIMARY KEY,
seat_number SERIAL,
is_available BOOLEAN DEFAULT true
);
