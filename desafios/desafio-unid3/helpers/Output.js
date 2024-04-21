import Table from "cli-table3";

class Output {
    write(data) { // Imprime sem pular linha
        process.stdout.write(data);
    }

    writeLine(data) {
        process.stdout.write(`${data}\n`)
    }

    writeTable(headers, rows) {
        const table = new Table({
            head: headers,
            chars: { 'mid': '', 'left-mid': '', 'mid-mid': '', 'right-mid': '' }
        });

        rows.forEach((row) => table.push(row));
        this.writeLine(table.toString());
    }
}
export default Output;