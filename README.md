# বাংলাকোড

বাংলাকোড is a programming language that uses Bangla syntax. It's designed to make programming more accessible and easier to learn for Bangla speakers.

## Features

- Bangla syntax
- Mimics C syntax and structure

## Getting Started

To start using বাংলাকোড, follow these steps:

1.  Write your code in Bangla using the specified syntax.
2.  Use the online interpreter to run your code.

## Syntax

### Basic Structure

A basic বাংলাকোড program starts with the `#অন্তর্ভুক্ত <স্তদিও.হ>` directive (similar to C's `#include <stdio.h>`) and the `পূর্ণ প্রধান()` function (similar to C's `int main()`).

### Variables

Declare variables using `পূর্ণ` for integers (like `int`), `দশমিক` for floating-point numbers (like `float`), and `সুতা` for strings (like `char*`).

Example:
```c
পূর্ণ ক = ১০; // int a = 10;
দশমিক খ = ৩.৫; // float b = 3.5;
সুতা নাম = "বাংলা কোড"; // char* name = "Bangla Code";
```

### Functions

Use predefined functions for basic operations:

-   `যোগ(ক, খ)`: Addition (like `a + b`)
-   `বিয়োগ(ক, খ)`: Subtraction (like `a - b`)
-   `গুণ(ক, খ)`: Multiplication (like `a * b`)
-   `ভাগ(ক, গ)`: Division (like `a / c`)
-   `বর্গমূল(ক)`: Square root (like `sqrt(a)`)

### Output

Use the `ছাপাওফ()` function to display output (similar to C's `printf()`). You can print strings or variables.

Example:
```c
ছাপাওফ("গণনা শুরু!\\n"); // printf("Calculation started!\\n");
ছাপাওফ(ক); // printf(a);
```

## Example Code
```c
#অন্তর্ভুক্ত <স্তদিও.হ>

পূর্ণ প্রধান() {
    সুতা নাম = "বাংলা কোড";
    ছাপাওফ("স্বাগতম ");
    ছাপাওফ(নাম);
    ছাপাওফ("!\\n");
    ছাপাওফ("গণনা শুরু!\\n");
    পূর্ণ ক = ১০;
    পূর্ণ খ = ৫;
    দশমিক গ = ৩.৫;
    পূর্ণ ঘ = যোগ(ক, খ);
    ছাপাওফ("যোগ: ");
    ছাপাওফ(ঘ);
    ছাপাওফ("\\n");
    পূর্ণ ঙ = বিয়োগ(ক, খ);
    ছাপাওফ("বিয়োগ: ");
    ছাপাওফ(ঙ);
    ছাপাওফ("\\n");
    দশমিক চ = গুণ(গ, খ);
    ছাপাওফ("গুণ: ");
    ছাপাওফ(চ);
    ছাপাওফ("\\n");
    দশমিক ছ = ভাগ(ক, গ);
    ছাপাওফ("ভাগ: ");
    ছাপাওফ(ছ);
    ছাপাওফ("\\n");
    দশমিক জ = বর্গমূল(ক);
    ছাপাওফ("বর্গমূল: ");
    ছাপাওফ(জ);
    ছাপাওফ("\\n");
    ফেরত ০;
}
```

## Contributing

Feel free to contribute to বাংলাকোড by submitting issues and pull requests.
