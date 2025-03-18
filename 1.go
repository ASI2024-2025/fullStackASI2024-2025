
func main() {
    emp := &Employee{Name: "John", Salary: 5000}
    emp.increaseSalary(10)
    fmt.Println(emp.Salary) // Output: 5500
}