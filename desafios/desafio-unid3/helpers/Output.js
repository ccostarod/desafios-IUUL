class Output {
    write(data) { // Imprime sem pular linha
        process.stdout.write(data);
    }

    writeLine(data) {
        process.Output.write(`${data}\n`)
    }
}
export default Output;