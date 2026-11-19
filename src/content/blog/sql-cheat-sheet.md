---
title: SQL Cheat Sheet
description: From SELECT to JOINs in seven lessons, plus an English-to-SQL translator for reading questions and the commands you'll reach for most.
date: 2026-11-19
tags: [sql, databases, cheatsheet]
---

<p class="no-print">📄 <strong>Prefer it offline?</strong> <a href="/pdfs/sql-cheat-sheet.pdf" download>Download this cheat sheet as a PDF</a>.</p>

## Basics

A database stores data in **tables**.

| Term | What it means |
|---|---|
| **Column** | One kind of information. Every column has a type: number (`INT`, `DECIMAL`), text (`VARCHAR`) or date (`DATETIME`) |
| **Row** | One record, like one employee or one payment |
| **Primary key** | The column that identifies each row. Never empty |
| **Foreign key** | A column that points to a primary key in another table, e.g. `employees.dept_id` points to `departments.dept_id` |
| **NULL** | No value, or unknown. It's **not** zero and **not** an empty string |
| **SQL** | The language used to ask a database questions |

---

## The seven lessons

### 1. SELECT: pick the columns

`SELECT` says which columns you want. `FROM` says which table. `*` means all columns.

- `AS` renames a column in the result (an alias). You can also do math on columns.
- `LIMIT` keeps the result as short as you want.

```sql
SELECT employee_name AS name,
       salary,
       salary * 12 AS yearly_salary
FROM employees
LIMIT 3;
```

`DISTINCT` removes duplicate rows from the result:

```sql
SELECT DISTINCT job FROM employees;
```

### 2. WHERE: pick the rows

Keeps only the **rows** that match a condition. It goes after `FROM`.

| Operator | Meaning | Example |
|---|---|---|
| `=` | Equal | `job = 'CLERK'` |
| `<>` or `!=` | Not equal | `job <> 'CLERK'` |
| `>` `<` `>=` `<=` | Greater / less than | `salary >= 3000` |
| `BETWEEN a AND b` | From a to b, both included | `salary BETWEEN 100 AND 200` |
| `IN (...)` | Matches any value inside the parentheses | `job IN ('IT', 'SALES')` |
| `LIKE` | Text patterns: `%` = any characters, `_` = exactly one | `employee_name LIKE 'S%'` |
| `IS NULL` / `IS NOT NULL` | Empty / not empty | `manager_id IS NULL` |
| `AND`, `OR`, `NOT` | Combine conditions | `dept_id = 30 AND salary > 15000` |

```sql
SELECT employee_name, salary
FROM employees
WHERE salary > 2500;

-- or match a list of values
SELECT employee_name, job
FROM employees
WHERE job IN ('ANALYST', 'PRESIDENT');
```

> [!tip] Quotes
> Text values go in **single quotes** (`'Mexico'`). Numbers don't need any.

### 3. ORDER BY & LIMIT: sort and cut

- `ORDER BY` sorts the result: `ASC` smallest first (the default), `DESC` biggest first.
- `LIMIT n` keeps only n rows.
- `OFFSET n` skips n rows first.

```sql
SELECT employee_name, salary
FROM employees
ORDER BY salary DESC
LIMIT 5;
```

### 4. Aggregate functions: one answer from many rows

They squash many rows into one value.

| Function | Returns |
|---|---|
| `COUNT(*)` | Number of rows |
| `COUNT(column)` | Number of rows where that column is **not** NULL |
| `SUM()` | Total |
| `AVG()` | Average |
| `MIN()`, `MAX()` | Smallest, largest |

```sql
SELECT COUNT(*)    AS employees,
       SUM(salary) AS total,
       AVG(salary) AS average,
       MIN(salary) AS lowest,
       MAX(salary) AS highest
FROM employees;
```

### 5. GROUP BY & HAVING

Used with aggregate functions (`COUNT`, `SUM`, `AVG`, `MIN`, `MAX`) to summarise data.

1. `GROUP BY` summarises rows into groups.
2. `HAVING` filters those groups.

```sql
SELECT job, COUNT(*) AS people
FROM employees
WHERE salary > 1000
GROUP BY job
HAVING COUNT(*) >= 2
ORDER BY job;
```

> [!important] WHERE vs HAVING
> `WHERE` filters **rows before** grouping. `HAVING` filters **groups after** grouping.

### 6. JOIN: combine tables

A join combines rows from two or more tables based on a related column, matched with `ON`. The table after `FROM` is the **left** table; the one after `JOIN` is the **right** table.

| Join | Returns | Remember it as |
|---|---|---|
| `(INNER) JOIN` | Only rows with **matching values in both** tables | Intersection: only matches |
| `LEFT (OUTER) JOIN` | **All rows from the left** table, plus whatever matches from the right | Left side rules |
| `RIGHT (OUTER) JOIN` | **All rows from the right** table, plus whatever matches from the left | Right side rules |
| `FULL (OUTER) JOIN` | **All rows** from both tables, matched where possible | Everybody gets invited |

**Practice:** using `customers` and `orders`, show each customer's name and their total number of orders. It must list **all customers**, even one with 0 orders.

```sql
SELECT c.name, COUNT(o.order_id) AS total_orders
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.name;
```

`LEFT JOIN` keeps customers with no orders, and `COUNT(o.order_id)` gives them `0` because it only counts non-NULL values.

### 7. Subqueries: a query inside a query

A subquery is a `SELECT` in brackets. The inner query runs first, and its answer is used by the outer query. Use one when you need a value you don't know yet.

```sql
-- employees who earn more than the average
SELECT employee_name, salary
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);
```

---

## Reading a question: the English-to-SQL translator

| When the question says… | Use |
|---|---|
| "Show me" | `SELECT` |
| "From the table" | `FROM` |
| "Where", "only when", "specific", "match" | `WHERE` |
| "For each", "per" | `GROUP BY` |
| "Combine" | `JOIN` |
| "Sorted by" | `ORDER BY` |
| "Top", "first", "only X" | `LIMIT` |

**Four questions to ask before writing a query**

1. **Where does the data live?** (`FROM` & `JOIN`) Is it in one table, or do I need to pull from another? If so: `FROM table1 JOIN table2 ON …`
2. **Do I need to filter the raw rows first?** (`WHERE`)
3. **Am I grouping items to summarise them?** (`GROUP BY`) Does the question say "per department" or "total salary"? Then use aggregate functions.
4. **Do I need to filter those summaries?** (`HAVING`)

---

## The most important SQL commands

| Command | What it does | Syntax |
|---|---|---|
| `SELECT` | Extracts data from a table | `SELECT column1, column2 FROM table_name;` |
| `SELECT DISTINCT` | Extracts unique values | `SELECT DISTINCT column1 FROM table_name;` |
| `WHERE` | Filters records to those that meet a condition | `SELECT * FROM Customers WHERE Country = 'Mexico';` |
| `UPDATE` | Modifies existing data in a table | `UPDATE table_name SET column1 = value1, column2 = value2 WHERE condition;` |
| `DELETE` | Deletes existing data from a table | `DELETE FROM table_name WHERE condition;` |
| `INSERT INTO` | Inserts a new record into a table | `INSERT INTO table_name VALUES (value1, value2, value3);` |
| `CREATE DATABASE` | Creates a new database | `CREATE DATABASE database_name;` |
| `ALTER DATABASE` | Modifies a database | |
| `CREATE TABLE` | Creates a new table | see below |
| `ALTER TABLE` | Modifies a table | |
| `DROP TABLE` | Deletes a table completely | `DROP TABLE table_name;` |
| `CREATE INDEX` | Creates an index (search key) | |
| `DROP INDEX` | Deletes an index | |

```sql
CREATE TABLE table_name (
    column1 datatype constraint,
    column2 datatype constraint,
    column3 datatype constraint
);
```

> [!danger] Always check the WHERE on UPDATE and DELETE
> Without a `WHERE` clause, `UPDATE` and `DELETE` change **every row** in the table.

**Notes**

- `NOT NULL` means the column cannot be empty.
- `VARCHAR(30)` is variable-length text with a maximum of 30 characters.

> [!summary] Gotchas
> - `NULL` is not `0` and not `''`. Test it with `IS NULL`, never `= NULL`.
> - `COUNT(*)` counts every row; `COUNT(column)` skips NULLs.
> - `WHERE` filters rows, `HAVING` filters groups.
> - Sort descending with `DESC`, not `DEC`.
> - Multiply with `*`, and alias with `AS`: `sal * 12 AS annual_salary`, not `salary x 12 ANNUAL SALARY`.
