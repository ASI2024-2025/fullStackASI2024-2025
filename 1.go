package main

import "fmt"

type Employee struct {
    Name   string
    Salary float64
}

func (e *Employee) increaseSalary(percentage float64) {
    e.Salary += e.Salary * percentage / 100
}

func main() {
    emp := &Employee{Name: "John", Salary: 5000} // Gunakan pointer agar perubahan diterapkan
    emp.increaseSalary(10) // ini harusnya jadi 20 persen
    fmt.Println(emp.Salary) 
}


