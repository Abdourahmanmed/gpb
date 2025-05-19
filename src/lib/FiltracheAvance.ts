export function FilterByDateResilier(row: any, columnId: string, filterValue: any) {
    const value = row.getValue(columnId);
    const date = new Date(value);

    if (filterValue.type === "day") {
        return value === filterValue.value; // Format exact (YYYY-MM-DD)
    }

    if (filterValue.type === "month") {
        return String(date.getMonth() + 1).padStart(2, "0") === filterValue.value;
    }

    if (filterValue.type === "year") {
        return date.getFullYear().toString() === filterValue.value;
    }

    return true;
}
